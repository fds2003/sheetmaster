import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { env } from '@/lib/config';
import { createClient } from '@/lib/supabase/server';

const stripe = new Stripe(env.stripeSecretKey, {
  apiVersion: '2026-03-25.dahlia' as const,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body?.email;

    // Verify the authenticated session — extract userId from auth cookie, not request body
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    const userId = user.id;

    if (email !== undefined && email !== null && (typeof email !== 'string' || !email.includes('@'))) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Determine the base URL dynamically based on environment
    const isLocal = process.env.NODE_ENV === 'development';
    const baseUrl = isLocal
      ? 'http://localhost:3000'
      : env.siteUrl;

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'SheetMaster Founder Access',
              description: 'Lifetime access to all premium features, data cleaning tools, and saved password books.',
              images: [`${baseUrl}/og-image.png`],
            },
            unit_amount: 499, // $4.99
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/`,
      customer_email: email || undefined,
      client_reference_id: userId, // Securely pass Supabase user ID to webhook
    });

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    const stripeErr = err as { statusCode?: number };
    const status = stripeErr.statusCode || 500;
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: message }, { status });
  }
}

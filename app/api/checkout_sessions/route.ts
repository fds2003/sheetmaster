import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

export async function POST(req: Request) {
  try {
    const { userId, email } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Determine the base URL dynamically based on environment
    const isLocal = process.env.NODE_ENV === 'development';
    const baseUrl = isLocal 
      ? 'http://localhost:3000' 
      // If deployed on Vercel, read origin or NEXT_PUBLIC_SITE_URL
      : process.env.NEXT_PUBLIC_SITE_URL || 'https://www.getsheetmaster.com';

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
  } catch (err: any) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: err.message }, { status: err.statusCode || 500 });
  }
}

import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { env } from '@/lib/config';
import { getSupabaseAdmin } from '@/lib/supabase/admin';

const stripe = new Stripe(env.stripeSecretKey, {
  apiVersion: '2026-03-25.dahlia' as const,
});

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      env.stripeWebhookSecret!
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`Webhook signature verification failed.`, message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.client_reference_id;

    if (userId) {
      const supabaseAdmin = getSupabaseAdmin();
      const { error } = await supabaseAdmin
        .from('profiles')
        .update({ is_pro: true, updated_at: new Date().toISOString() })
        .eq('id', userId);

      if (error) {
        console.error('Error updating user profile:', error);
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
      }
    } else {
      console.warn('No client_reference_id found in session. Missing user ID binding.');
    }
  }

  return NextResponse.json({ received: true });
}

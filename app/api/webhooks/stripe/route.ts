import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

// We need the service role key to bypass RLS and update the profile
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed.`, err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    const userId = session.client_reference_id;

    if (userId) {
      console.log(`Upgrading user ${userId} to Pro...`);
      // Update the user's profile to is_pro = true
      const { error } = await supabaseAdmin
        .from('profiles')
        .update({ is_pro: true, updated_at: new Date().toISOString() })
        .eq('id', userId);

      if (error) {
        console.error('Error updating user profile:', error);
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
      }
      console.log(`User ${userId} successfully upgraded to Pro!`);
    } else {
      console.warn('No client_reference_id found in session. Missing user ID binding.');
    }
  }

  return NextResponse.json({ received: true });
}

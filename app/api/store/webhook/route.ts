import { stripe, handleWebhookEvent } from '@/lib/stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') || '';

  if (!webhookSecret) {
    console.error('⚠️  STRIPE_WEBHOOK_SECRET not configured');
    return Response.json(
      { error: 'Webhook not configured' },
      { status: 500 }
    );
  }

  try {
    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

    console.log(`[Stripe Webhook] ${event.type} - ${event.id}`);

    // Handle the webhook event
    await handleWebhookEvent(event);

    return Response.json({ received: true });
  } catch (error) {
    console.error('[Stripe Webhook Error]', error);
    return Response.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }
}

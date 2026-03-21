import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getOrdersCollection, getLicenseKeysCollection } from '@/lib/db';
import { sendLicenseEmail, sendOrderConfirmationEmail } from '@/lib/email';
import crypto from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') || '';

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('[Stripe Webhook] Invalid signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle successful payment
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      if (!session.customer_email || !session.metadata) {
        console.error('[Stripe Webhook] Missing email or metadata');
        return NextResponse.json(
          { error: 'Missing customer email or metadata' },
          { status: 400 }
        );
      }

      const { appId, appName, tierIndex, brand } = session.metadata;
      const customerEmail = session.customer_email;
      const customerName = typeof session.customer_details?.name === 'string' 
        ? session.customer_details.name 
        : 'Valued Customer';

      try {
        // Generate license key
        const licenseKey = appId + '-' + crypto.randomBytes(6).toString('hex').toUpperCase();

        // Create order in MongoDB
        const ordersCollection = await getOrdersCollection();
        const order = {
          userId: null,
          appId,
          appName: appName || appId,
          pricingTierIndex: parseInt(tierIndex || '0'),
          amount: session.amount_total || 0,
          currency: session.currency?.toUpperCase() || 'USD',
          stripeSessionId: session.id,
          stripePaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : null,
          licenseKey,
          status: 'completed' as const,
          createdAt: new Date(),
          completedAt: new Date(),
          downloadUrl: `/api/store/download/${appId}?key=${licenseKey}`,
        };

        const result = await ordersCollection.insertOne(order as any);
        console.log('[Stripe Webhook] Order created:', result.insertedId);

        // Save license key
        const licenseKeysCollection = await getLicenseKeysCollection();
        await licenseKeysCollection.insertOne({
          key: licenseKey,
          appId,
          userId: 'guest',
          orderId: result.insertedId.toString(),
          type: 'one-time',
          activatedDate: new Date(),
          activations: 0,
          maxActivations: 10,
          revoked: false,
          devices: [],
        } as any);
        console.log('[Stripe Webhook] License key saved');

        // Send license email
        await sendLicenseEmail({
          brand: brand || 'svl',
          email: customerEmail,
          licenseKey,
          productName: appName || appId,
          planName: session.metadata?.planName || 'One-Time Purchase',
          downloadLink: `/api/store/download/${appId}?key=${licenseKey}`,
          recipientName: customerName,
        });
        console.log('[Stripe Webhook] License email sent');

        // Send order confirmation email
        await sendOrderConfirmationEmail({
          brand: brand || 'svl',
          email: customerEmail,
          recipientName: customerName,
          orderId: result.insertedId.toString(),
          productName: appName || appId,
          planName: session.metadata?.planName || 'One-Time Purchase',
          amount: session.amount_total || 0,
          date: new Date().toLocaleDateString(),
          downloadLink: `/api/store/download/${appId}?key=${licenseKey}`,
        });
        console.log('[Stripe Webhook] Order confirmation email sent');

        console.log('[Stripe Webhook] Payment successful', {
          email: customerEmail,
          product: appName,
          licenseKey,
          orderId: result.insertedId,
        });

      } catch (error) {
        console.error('[Stripe Webhook] Error processing order/email:', error);
        // Don't fail the webhook - just log the error
        // Stripe will retry if we return error status
      }

      return NextResponse.json({ success: true });
    }

    // Handle payment failures
    if (event.type === 'charge.failed') {
      const charge = event.data.object as Stripe.Charge;
      console.error('[Stripe Webhook] Payment failed:', charge.id);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Stripe Webhook] Error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

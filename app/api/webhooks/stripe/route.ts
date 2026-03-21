import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { generateLicenseKey } from '@/lib/licenses';
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
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle successful payment
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      if (!session.customer_email || !session.metadata) {
        return NextResponse.json(
          { error: 'Missing customer email or metadata' },
          { status: 400 }
        );
      }

      const { productId, planName, productName } = session.metadata;

      // Generate license key
      const licenseKey = generateLicenseKey(productId, crypto.randomBytes(16).toString('hex'));
      const downloadCode = crypto.randomBytes(8).toString('hex').toUpperCase();

      // In production, you would:
      // 1. Store the order in MongoDB
      // 2. Create a document linking email+license+downloadCode
      // 3. Send email with license and download link

      console.log('[Stripe Webhook] Payment successful', {
        email: session.customer_email,
        product: productName,
        plan: planName,
        licenseKey,
        downloadCode,
      });

      // TODO: Implement email sending via SendGrid/Resend
      // TODO: Store order in MongoDB with license info
      // TODO: Generate download link

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

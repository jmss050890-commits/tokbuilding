import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('⚠️  STRIPE_SECRET_KEY not set - Stripe features disabled');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
});

export interface CheckoutSessionData {
  appId: string;
  appName: string;
  priceAmount: number; // in cents
  pricingTierType: 'free' | 'one-time' | 'subscription';
  interval?: 'monthly' | 'yearly';
  userId?: string;
  userEmail?: string;
}

/**
 * Create a Stripe checkout session
 * For one-time purchases: creates a payment session
 * For subscriptions: creates a subscription checkout session
 */
export async function createCheckoutSession(data: CheckoutSessionData) {
  try {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    if (data.pricingTierType === 'one-time') {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: data.appName,
            metadata: {
              appId: data.appId,
            },
          },
          unit_amount: data.priceAmount,
        },
        quantity: 1,
      });
    } else if (data.pricingTierType === 'subscription') {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${data.appName} - ${data.interval === 'yearly' ? 'Yearly' : 'Monthly'} Subscription`,
            metadata: {
              appId: data.appId,
            },
          },
          unit_amount: data.priceAmount,
          recurring: {
            interval: data.interval === 'yearly' ? 'year' : 'month',
            interval_count: 1,
          },
        },
        quantity: 1,
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: data.pricingTierType === 'subscription' ? 'subscription' : 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/tokstore?session_id={CHECKOUT_SESSION_ID}&success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/tokstore?app=${data.appId}&canceled=true`,
      customer_email: data.userEmail,
      metadata: {
        appId: data.appId,
        userId: data.userId || 'anonymous',
      },
    });

    return session;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw new Error('Failed to create checkout session');
  }
}

/**
 * Retrieve a checkout session by ID
 */
export async function getCheckoutSession(sessionId: string) {
  try {
    return await stripe.checkout.sessions.retrieve(sessionId);
  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    throw new Error('Failed to retrieve checkout session');
  }
}

/**
 * Generate a unique license key for the user
 * Format: TOKSTORE-APPID-USERID-RANDOMHASH
 */
export function generateLicenseKey(appId: string, userId: string): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TOK-${appId.toUpperCase()}-${timestamp}-${random}`;
}

/**
 * Handle Stripe webhook events
 */
export async function handleWebhookEvent(event: Stripe.Event) {
  switch (event.type) {
    case 'checkout.session.completed':
      return handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);

    case 'customer.subscription.deleted':
      return handleSubscriptionDeleted(event.data.object as Stripe.Subscription);

    case 'charge.refunded':
      return handleChargeRefunded(event.data.object as Stripe.Charge);

    default:
      console.log(`⚠️  Unhandled webhook event type: ${event.type}`);
      return null;
  }
}

/**
 * Handle successful checkout
 * This would typically:
 * - Create an order record
 * - Generate license keys
 * - Send confirmation email
 */
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log(`✓ Checkout completed: ${session.id}`);
  console.log(`  Customer: ${session.customer_email}`);
  console.log(`  Amount: ${session.amount_total}`) 
  console.log(`  App: ${session.metadata?.appId}`);

  // You would implement here:
  // - Save order to database
  // - Generate and save license key
  // - Send confirmation email
  // - Update user's app access
}

/**
 * Handle subscription cancellation
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log(`✓ Subscription canceled: ${subscription.id}`);
  console.log(`  Customer: ${subscription.customer}`);

  // You would implement here:
  // - Update subscription status in database
  // - Revoke license key access
  // - Send cancellation email
}

/**
 * Handle refund
 */
async function handleChargeRefunded(charge: Stripe.Charge) {
  console.log(`✓ Charge refunded: ${charge.id}`);
  console.log(`  Amount: ${charge.amount_refunded}`);

  // You would implement here:
  // - Update order status
  // - Revoke license key
  // - Send refund notification
}

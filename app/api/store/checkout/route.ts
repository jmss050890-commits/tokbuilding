import { createCheckoutSession } from '@/lib/stripe';
import { FEATURED_APPS } from '@/app/tokstore/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { appId, pricingTierIndex, userEmail } = body;

    if (!appId || pricingTierIndex === undefined) {
      return Response.json(
        { error: 'Missing appId or pricingTierIndex' },
        { status: 400 }
      );
    }

    // Find the app
    const app = FEATURED_APPS.find(a => a.id === appId);
    if (!app) {
      return Response.json(
        { error: 'App not found' },
        { status: 404 }
      );
    }

    // Get the pricing tier
    const pricingTier = app.pricing[pricingTierIndex];
    if (!pricingTier) {
      return Response.json(
        { error: 'Invalid pricing tier' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const session = await createCheckoutSession({
      appId,
      appName: app.name,
      priceAmount: Math.round(pricingTier.price * 100), // Convert to cents
      pricingTierType: pricingTier.type,
      interval: pricingTier.interval,
      userEmail: userEmail || undefined,
    });

    return Response.json({
      success: true,
      checkoutUrl: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error('[Store Checkout] Error:', error);
    return Response.json(
      {
        error: 'Failed to create checkout session',
        details: process.env.NODE_ENV === 'development' ? (error as any)?.message : undefined,
      },
      { status: 500 }
    );
  }
}

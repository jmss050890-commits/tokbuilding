import { getOrdersCollection, getLicenseKeysCollection } from '@/lib/db';
import { generateLicenseKey, getCheckoutSession } from '@/lib/stripe';
import { MongoServerError } from 'mongodb';

/**
 * GET /api/store/orders - Get user's orders
 * POST /api/store/orders - Create order from successful Stripe checkout
 */

export async function GET(req: Request) {
  try {
    // TODO: Get userId from session/auth
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');
    const userId = searchParams.get('userId');

    if (!sessionId && !userId) {
      return Response.json(
        { error: 'Missing sessionId or userId' },
        { status: 400 }
      );
    }

    const ordersCollection = await getOrdersCollection();

    // Retrieve order by sessionId (used after Stripe redirect)
    if (sessionId) {
      const order = await ordersCollection.findOne({ stripeSessionId: sessionId });
      if (!order) {
        return Response.json(
          { error: 'Order not found' },
          { status: 404 }
        );
      }
      return Response.json({ order });
    }

    // List all orders for userId
    if (userId) {
      const orders = await ordersCollection
        .find({ userId })
        .sort({ createdAt: -1 })
        .toArray();
      return Response.json({ orders });
    }
  } catch (error) {
    console.error('[Store Orders GET] Error:', error);
    return Response.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, userId } = body;

    if (!sessionId) {
      return Response.json(
        { error: 'Missing sessionId' },
        { status: 400 }
      );
    }

    // Retrieve Stripe checkout session
    const stripeSession = await getCheckoutSession(sessionId);
    if (!stripeSession.payment_status || stripeSession.payment_status === 'unpaid') {
      return Response.json(
        { error: 'Payment not completed' },
        { status: 400 }
      );
    }

    const appId = stripeSession.metadata?.appId;
    if (!appId) {
      return Response.json(
        { error: 'Invalid session metadata' },
        { status: 400 }
      );
    }

    // Generate license key
    const licenseKey = generateLicenseKey(appId, userId || 'guest');

    // Create order record
    const ordersCollection = await getOrdersCollection();
    const order = {
      userId: userId || null,
      appId,
      appName: stripeSession.metadata?.appName || appId,
      pricingTierIndex: parseInt(stripeSession.metadata?.tierIndex || '0'),
      amount: stripeSession.amount_total || 0,
      currency: stripeSession.currency || 'usd',
      stripeSessionId: sessionId,
      stripePaymentIntentId: stripeSession.payment_intent as string,
      licenseKey,
      status: 'completed' as const,
      createdAt: new Date(),
      completedAt: new Date(),
    };

    const result = await ordersCollection.insertOne(order as any);

    // Save license key
    const licenseKeysCollection = await getLicenseKeysCollection();
    await licenseKeysCollection.insertOne({
      key: licenseKey,
      appId,
      userId: userId || 'guest',
      orderId: result.insertedId.toString(),
      type: 'one-time',
      activatedDate: new Date(),
      activations: 0,
      maxActivations: 10,
      revoked: false,
      devices: [],
    } as any);

    return Response.json({
      success: true,
      order: {
        ...order,
        _id: result.insertedId,
      },
      licenseKey,
      downloadUrl: `/api/store/download/${appId}?key=${licenseKey}`,
    });
  } catch (error) {
    console.error('[Store Orders POST] Error:', error);

    // Handle duplicate key error (race condition)
    if (error instanceof MongoServerError && error.code === 11000) {
      return Response.json(
        { error: 'Order already exists' },
        { status: 409 }
      );
    }

    return Response.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

import { getOrdersCollection, getLicenseKeysCollection, type LicenseKey, type Order } from '@/lib/db';
import { sendLicenseEmail, sendOrderConfirmationEmail } from '@/lib/email';
import { getCheckoutSession, generateLicenseKey } from '@/lib/stripe';
import { MongoServerError } from 'mongodb';
import { getAuthenticatedSession } from '@/lib/auth';

/**
 * GET /api/store/orders - Get user's orders
 * POST /api/store/orders - Create order from successful Stripe checkout
 */

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');
    const session = getAuthenticatedSession(req);

    if (!sessionId && !session) {
      return Response.json(
        { error: 'Authentication required' },
        { status: 401 }
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
    if (session) {
      const orders = await ordersCollection
        .find({ userId: session.userId })
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
    const session = getAuthenticatedSession(req);
    const { sessionId, userId: requestedUserId } = body;
    const userId = session?.userId || requestedUserId || 'guest';

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

    const customerEmail = stripeSession.customer_email;
    if (!customerEmail) {
      return Response.json(
        { error: 'No customer email in session' },
        { status: 400 }
      );
    }

    // Generate license key
    const licenseKey = generateLicenseKey(appId, userId);

    // Create order record
    const ordersCollection = await getOrdersCollection();
    const order: Order = {
      userId,
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

    const result = await ordersCollection.insertOne(order);

    // Save license key
    const licenseKeysCollection = await getLicenseKeysCollection();
    const licenseRecord: LicenseKey = {
      key: licenseKey,
      appId,
      userId,
      orderId: result.insertedId.toString(),
      type: 'one-time',
      activatedDate: new Date(),
      activations: 0,
      maxActivations: 10,
      revoked: false,
      devices: [],
    };
    await licenseKeysCollection.insertOne(licenseRecord);

    // Send license email
    const customerName = stripeSession.customer_details?.name || 'Valued Customer';
    try {
      await sendLicenseEmail({
        brand: stripeSession.metadata?.brand || 'svl',
        email: customerEmail,
        licenseKey,
        productName: order.appName,
        planName: stripeSession.metadata?.planName || 'One-Time Purchase',
        downloadLink: `/api/store/download/${appId}?key=${licenseKey}`,
        recipientName: customerName,
      });
    } catch (emailError) {
      console.error('[Orders] Error sending license email:', emailError);
      // Don't fail the order because of email failure
    }

    // Send order confirmation email
    try {
      await sendOrderConfirmationEmail({
        brand: stripeSession.metadata?.brand || 'svl',
        email: customerEmail,
        recipientName: customerName,
        orderId: result.insertedId.toString(),
        productName: order.appName,
        planName: stripeSession.metadata?.planName || 'One-Time Purchase',
        amount: order.amount,
        date: new Date().toLocaleDateString(),
        downloadLink: `/api/store/download/${appId}?key=${licenseKey}`,
      });
    } catch (emailError) {
      console.error('[Orders] Error sending order confirmation email:', emailError);
      // Don't fail the order because of email failure
    }

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

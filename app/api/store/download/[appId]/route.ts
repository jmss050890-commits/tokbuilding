import { getLicenseKeysCollection, getOrdersCollection } from '@/lib/db';

/**
 * GET /api/store/download/[appId] - Download app with license key verification
 * Validates license key and tracks device activation
 */

export async function GET(
  req: Request,
  { params }: { params: { appId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const licenseKey = searchParams.get('key');
    const deviceId = searchParams.get('device') || 'web';

    if (!licenseKey) {
      return Response.json(
        { error: 'Missing license key' },
        { status: 400 }
      );
    }

    const licenseKeysCollection = await getLicenseKeysCollection();

    // Find and validate license key
    const license = await licenseKeysCollection.findOne({
      key: licenseKey,
      appId: params.appId,
      revoked: false,
    });

    if (!license) {
      return Response.json(
        { error: 'Invalid or revoked license key' },
        { status: 401 }
      );
    }

    // Check if subscription is expired
    if (license.type === 'subscription' && license.expiryDate) {
      if (new Date() > license.expiryDate) {
        return Response.json(
          { error: 'License key expired' },
          { status: 401 }
        );
      }
    }

    // Check activation limit
    if (license.activations >= license.maxActivations) {
      return Response.json(
        { error: 'Activation limit exceeded' },
        { status: 403 }
      );
    }

    // Check if device already activated
    const deviceAlreadyActivated = license.devices?.some(d => d.deviceId === deviceId);

    if (!deviceAlreadyActivated) {
      // Add device activation
      await licenseKeysCollection.updateOne(
        { _id: license._id },
        {
          $push: {
            devices: {
              deviceId,
              activatedAt: new Date(),
              lastUsed: new Date(),
            },
          },
          $inc: { activations: 1 },
        }
      );
    } else {
      // Update last used
      await licenseKeysCollection.updateOne(
        { _id: license._id, 'devices.deviceId': deviceId },
        {
          $set: { 'devices.$.lastUsed': new Date() },
        }
      );
    }

    // Get order/subscription details
    const ordersCollection = await getOrdersCollection();
    const order = await ordersCollection.findOne({ licenseKey });

    // Return download info
    const appDownloadUrl = `/apps/${params.appId}-latest.apk`;

    return Response.json({
      success: true,
      app: params.appId,
      licenseKey,
      downloadUrl: appDownloadUrl,
      validity: {
        type: license.type,
        expiryDate: license.expiryDate || null,
        remainingActivations: license.maxActivations - license.activations - 1,
      },
      order: order ? {
        id: order._id?.toString(),
        date: order.createdAt,
        amount: order.amount,
      } : null,
    });
  } catch (error) {
    console.error('[License Download] Error:', error);
    return Response.json(
      { error: 'Failed to process download' },
      { status: 500 }
    );
  }
}

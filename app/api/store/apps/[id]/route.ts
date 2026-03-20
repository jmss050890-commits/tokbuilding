import { FEATURED_APPS } from '@/app/tokstore/types';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/store/apps/[id] - Get specific app
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const app = FEATURED_APPS.find(a => a.id === id);

    if (!app) {
      return NextResponse.json(
        { success: false, error: 'App not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      app,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch app' },
      { status: 500 }
    );
  }
}

// PUT /api/store/apps/[id] - Update app (admin only)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const adminToken = request.headers.get('x-admin-token');
    if (!adminToken || adminToken !== process.env.ADMIN_TOKEN) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    // Find and update app (in production, update in database)
    const app = FEATURED_APPS.find(a => a.id === id);
    if (!app) {
      return NextResponse.json(
        { success: false, error: 'App not found' },
        { status: 404 }
      );
    }

    const updatedApp = { ...app, ...body };

    return NextResponse.json({
      success: true,
      message: 'App updated successfully',
      app: updatedApp,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update app' },
      { status: 500 }
    );
  }
}

// DELETE /api/store/apps/[id] - Delete app (admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const adminToken = request.headers.get('x-admin-token');
    if (!adminToken || adminToken !== process.env.ADMIN_TOKEN) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Find and delete app (in production, delete from database)
    const app = FEATURED_APPS.find(a => a.id === id);
    if (!app) {
      return NextResponse.json(
        { success: false, error: 'App not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'App deleted successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete app' },
      { status: 500 }
    );
  }
}

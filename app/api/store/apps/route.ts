import { FEATURED_APPS } from '@/app/tokstore/types';
import { NextRequest, NextResponse } from 'next/server';
import { isValidAdminToken } from '@/lib/admin';

// GET /api/store/apps - Get all apps with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const sortBy = searchParams.get('sort') || 'rating';

    let apps = [...FEATURED_APPS];

    // Filter by category
    if (category && category !== 'all') {
      apps = apps.filter(app => app.category === category);
    }

    // Filter featured
    if (featured === 'true') {
      apps = apps.filter(app => app.featured);
    }

    // Sort
    switch (sortBy) {
      case 'downloads':
        apps.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'newest':
        apps.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        break;
      case 'rating':
      default:
        apps.sort((a, b) => b.rating - a.rating);
    }

    return NextResponse.json({
      success: true,
      count: apps.length,
      apps,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch apps' },
      { status: 500 }
    );
  }
}

// POST /api/store/apps - Create new app (admin only)
export async function POST(request: NextRequest) {
  try {
    const adminToken = request.headers.get('x-admin-token');
    if (!isValidAdminToken(adminToken)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validate required fields
    const required = ['name', 'category', 'developer', 'description'];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create new app
    const newApp = {
      id: `app-${Date.now()}`,
      rating: 4.5,
      downloads: 0,
      reviews: 0,
      featured: false,
      status: 'available' as const,
      releaseDate: new Date(),
      previousVersions: [],
      ...body,
    };

    // Persist new apps in a database before enabling write operations in production.
    // db.apps.create(newApp);

    return NextResponse.json({
      success: true,
      message: 'App created successfully',
      app: newApp,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to create app' },
      { status: 500 }
    );
  }
}

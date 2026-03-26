/**
 * POST /api/memorials/create
 * Create a new secure memorial for authenticated user
 */

import { verifyAuthToken } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { getUserMemorialTier } from '@/lib/memorial-membership';
import { cookies } from 'next/headers';
import { ObjectId } from 'mongodb';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    const session = verifyAuthToken(token);
    if (!session) {
      return new Response(
        JSON.stringify({ error: 'Invalid session' }),
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name, relationship, dates, story, svlConnection, verse, isPublic } = body;

    // Validate required fields
    if (!name?.trim() || !story?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Name and story are required' }),
        { status: 400 }
      );
    }

    const client = await connectToDatabase();
    const db = client.db('tokbuilding');

    // Get user's tier to check slot availability
    const subscriptions = await db
      .collection('subscriptions')
      .find({ userId: session.userId })
      .toArray();

    const tierInfo = await getUserMemorialTier(session.userId, subscriptions);

    // Count existing memorials
    const existingCount = await db
      .collection('secureMemorials')
      .countDocuments({ userId: session.userId });

    // Check if user has slots available
    if (existingCount >= tierInfo.slotLimit) {
      return new Response(
        JSON.stringify({
          error: `You have reached your memorial limit (${tierInfo.slotLimit}). Upgrade to add more.`,
        }),
        { status: 403 }
      );
    }

    // Create modal
    const memorial = {
      _id: new ObjectId(),
      userId: session.userId,
      name: name.trim(),
      relationship: relationship?.trim() || '',
      dates: dates?.trim() || '',
      story: story.trim(),
      svlConnection: svlConnection?.trim() || '',
      verse: verse?.trim() || '',
      isPublic: isPublic === true,
      sharedWith: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Save to database
    const result = await db.collection('secureMemorials').insertOne(memorial);

    return new Response(
      JSON.stringify({
        success: true,
        memorial: {
          ...memorial,
          _id: result.insertedId.toString(),
          createdAt: memorial.createdAt.toISOString(),
          updatedAt: memorial.updatedAt.toISOString(),
        },
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error creating memorial:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to create memorial' }),
      { status: 500 }
    );
  }
}

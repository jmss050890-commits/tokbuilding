/**
 * GET /api/memorials/user
 * Get authenticated user's memorials and tier info
 */

import { verifyAuthToken, type AuthSession } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { getUserMemorialTier } from '@/lib/memorial-membership';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
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

    const client = await connectToDatabase();
    const db = client.db('tokbuilding');

    // Get user's memorials
    const memorials = await db
      .collection('secureMemorials')
      .find({ userId: session.userId })
      .sort({ createdAt: -1 })
      .toArray();

    // Get user's subscriptions for tier determination
    const subscriptions = await db
      .collection('subscriptions')
      .find({ userId: session.userId })
      .toArray();

    // Determine tier
    const tierInfo = await getUserMemorialTier(session.userId, subscriptions);

    return new Response(
      JSON.stringify({
        memorials: memorials.map((m: any) => ({
          _id: m._id?.toString(),
          name: m.name,
          relationship: m.relationship,
          dates: m.dates,
          story: m.story,
          svlConnection: m.svlConnection,
          verse: m.verse,
          isPublic: m.isPublic,
          createdAt: m.createdAt?.toISOString(),
        })),
        tierInfo: {
          ...tierInfo,
          memorialsCount: memorials.length,
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching user memorials:', error);
    return new Response(
      JSON.stringify({ error: 'Server error' }),
      { status: 500 }
    );
  }
}

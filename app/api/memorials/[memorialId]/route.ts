/**
 * DELETE /api/memorials/[memorialId]
 * Delete a memorial (owner only)
 */

import { verifyAuthToken } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { cookies } from 'next/headers';
import { ObjectId } from 'mongodb';

export async function DELETE(
  req: Request,
  context: any
) {
  try {
    const { memorialId } = context.params;
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

    // Verify ownership before deleting
    const memorial = await db.collection('secureMemorials').findOne({
      _id: new ObjectId(memorialId),
      userId: session.userId,
    });

    if (!memorial) {
      return new Response(
        JSON.stringify({ error: 'Memorial not found or not owned by user' }),
        { status: 404 }
      );
    }

    // Delete
    await db.collection('secureMemorials').deleteOne({
      _id: new ObjectId(memorialId),
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Memorial deleted',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error deleting memorial:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to delete memorial' }),
      { status: 500 }
    );
  }
}
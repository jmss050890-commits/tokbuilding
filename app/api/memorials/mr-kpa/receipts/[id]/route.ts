import { verifyAuthToken } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function PATCH(
  req: Request,
  context: any
) {
  try {
    const { id } = await context.params;
    const authToken = req.headers.get('Authorization')?.replace('Bearer ', '');
    const userId = authToken ? await verifyAuthToken(authToken) : null;

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    const body = await req.json();
    const { archived } = body;

    const client = await connectToDatabase();
    const db = client.db('svl');
    const receiptsCollection = db.collection('mrKpaReceipts');

    const result = await receiptsCollection.updateOne(
      { _id: new ObjectId(id), userId },
      { $set: { archived } }
    );

    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ error: 'Receipt not found' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error updating receipt:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to update receipt' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

import { verifyAuthToken } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const authToken = req.headers.get('Authorization')?.replace('Bearer ', '');
    const userId = authToken ? await verifyAuthToken(authToken) : null;

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    const client = await connectToDatabase();
    const db = client.db('svl');
    const receiptsCollection = db.collection('mrKpaReceipts');

    const receipts = await receiptsCollection
      .find({ userId })
      .sort({ timestamp: -1 })
      .toArray();

    return new Response(
      JSON.stringify({
        receipts: receipts.map((r: any) => ({
          _id: r._id.toString(),
          topic: r.topic,
          userMessage: r.userMessage,
          kpaResponse: r.kpaResponse,
          keyTakeaways: r.keyTakeaways,
          actionItems: r.actionItems,
          timestamp: r.timestamp,
          archived: r.archived || false,
        })),
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching receipts:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch receipts' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

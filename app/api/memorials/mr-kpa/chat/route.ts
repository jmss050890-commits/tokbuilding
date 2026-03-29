import OpenAI from 'openai';
import { verifyAuthToken } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { getOpenAIApiKey } from '@/lib/openai-key';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, token } = body;

    if (!message?.trim()) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400 }
      );
    }

    // Verify authentication
    const authToken = token || req.headers.get('Authorization')?.replace('Bearer ', '');
    const userId = authToken ? await verifyAuthToken(authToken) : null;

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401 }
      );
    }

    const openAiApiKey = getOpenAIApiKey();
    if (!openAiApiKey) {
      return new Response(
        JSON.stringify({
          response:
            "I'm Mr. KPA, your strategic advisor. I'm in demo mode right now, but I'll help you think through decisions, strategy, and the Keep People Alive mission when the system is fully connected.",
          receiptGenerated: false,
        }),
        { status: 200 }
      );
    }

    // Build Mr. KPA system prompt
    const systemPrompt = `You are Mr. KPA - a wise, strategic advisor rooted in the Keep People Alive mission. You speak with:
- Strategic clarity about building systems and helping people
- Compassionate wisdom when addressing personal or difficult topics
- Faith-grounded perspective on purpose and meaning
- Practical guidance on decisions, vision, and implementation

You represent Jerome Sanders' values:
- Protecting people who fall through the cracks
- Building with excellence and intention
- Faith as foundation, action as proof
- Community and family at the core

When users ask for guidance, provide thoughtful, actionable counsel that considers both their immediate need and their broader calling within the KPA mission.`;

    const client = new OpenAI({ apiKey: openAiApiKey });

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      temperature: 0.8,
    });

    const assistantResponse =
      response.choices?.[0]?.message?.content?.trim() ||
      'I appreciate your question. Let me think about that.';

    // Extract key points for receipt
    const hasActionItems = assistantResponse.toLowerCase().includes('action') ||
      assistantResponse.toLowerCase().includes('step') ||
      assistantResponse.toLowerCase().includes('todo');

    // Save conversation receipt
    let receiptGenerated = false;
    let receiptId = null;

    try {
      const client = await connectToDatabase();
      const db = client.db('svl');
      const receiptsCollection = db.collection('mrKpaReceipts');

      const topicMatch = message.substring(0, 50);
      const receipt = {
        userId,
        topic: topicMatch,
        userMessage: message,
        kpaResponse: assistantResponse,
        keyTakeaways: hasActionItems ? ['Follow-up guidance provided above'] : [],
        timestamp: new Date(),
        archived: false,
      };

      const result = await receiptsCollection.insertOne(receipt as any);
      receiptGenerated = true;
      receiptId = result.insertedId.toString();
    } catch (_error) {
      console.error('Error saving receipt:', _error);
      // Continue even if receipt save fails
    }

    return new Response(
      JSON.stringify({
        response: assistantResponse,
        receiptGenerated,
        receiptId,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Mr. KPA chat error:', error);
    return new Response(
      JSON.stringify({
        response:
          "I'm having trouble connecting at the moment. Please try again in a moment.",
        error: true,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

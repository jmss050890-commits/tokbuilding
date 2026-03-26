/**
 * POST /api/memorials/[memorialId]/guardian/chat
 * Chat with a user's personalized Memorial Guardian
 */

import OpenAI from 'openai';
import { verifyAuthToken } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { cookies } from 'next/headers';
import { ObjectId } from 'mongodb';
import { buildGuardianSystemPrompt, extractMemorialInsights, getMemorialGuardianSafetySupplement } from '@/lib/guardian-prompt-builder';
import { getOpenAIApiKey } from '@/lib/openai-key';
import {
  detectSupportiveHandoffCase,
  buildSupportiveEmergencyResponse,
  getSupportiveHandoffSystemMessage,
} from '@/lib/svl-supportive-handoff';
import { getResponseLanguageSystemMessage } from '@/lib/agent-response-language';

interface RequestBody {
  message: string;
  language?: string;
}

export async function POST(req: Request, context: any) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const session = verifyAuthToken(token);
    if (!session) {
      return new Response(JSON.stringify({ error: 'Invalid session' }), { status: 401 });
    }

    const { memorialId } = context.params;
    const body: RequestBody = await req.json();
    const { message, language = 'en' } = body;

    if (!message?.trim()) {
      return new Response(JSON.stringify({ error: 'Message required' }), { status: 400 });
    }

    // Check for safety case first
    const safetyCase = detectSupportiveHandoffCase(message);
    if (safetyCase.requiresEmergencyResponse) {
      return new Response(
        JSON.stringify({
          response: buildSupportiveEmergencyResponse(safetyCase, language),
          safetyMode: true,
          guardianMode: true,
        }),
        { status: 200 }
      );
    }

    const client = await connectToDatabase();
    const db = client.db('tokbuilding');

    // Verify memorial ownership
    const memorial = await db.collection('secureMemorials').findOne({
      _id: new ObjectId(memorialId),
      userId: session.userId,
    }) as any;

    if (!memorial) {
      return new Response(
        JSON.stringify({ error: 'Memorial not found' }),
        { status: 404 }
      );
    }

    // Get or create Guardian for this memorial
    let guardian = await db.collection('memorialGuardians').findOne({
      memorialId,
      userId: session.userId,
    }) as any;

    if (!guardian) {
      // Create new Guardian
      const newGuardian = {
        _id: new ObjectId(),
        memorialId,
        userId: session.userId,
        name: `${memorial.name}'s Guardian`,
        personality: '',
        faithBasis: memorial.verse || '',
        memories: [],
        conversationCount: 0,
        lastInteraction: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await db.collection('memorialGuardians').insertOne(newGuardian);
      guardian = newGuardian;
    }

    // Get recent conversations for context
    const recentConversations = await db
      .collection('guardianConversations')
      .find({ memorialId, userId: session.userId })
      .sort({ createdAt: -1 })
      .limit(3)
      .toArray() as any[];

    // Build the system prompt
    const systemPrompt = buildGuardianSystemPrompt(memorial, guardian, recentConversations);
    const safetyPrompt = getMemorialGuardianSafetySupplement();
    const languagePrompt = getResponseLanguageSystemMessage(language);
    const supportivePrompt = safetyCase.requiresSupportiveTone
      ? getSupportiveHandoffSystemMessage('Memorial Guardian')
      : '';

    // Get OpenAI response
    const openAiApiKey = getOpenAIApiKey();
    if (!openAiApiKey) {
      return new Response(
        JSON.stringify({
          response: `I'm ${memorial.name}'s Guardian, ready to discuss their legacy with you. What would you like to share or remember about them?`,
          guardianMode: true,
          demoMode: true,
        }),
        { status: 200 }
      );
    }

    const openAi = new OpenAI({ apiKey: openAiApiKey });

    const systemMessages = [
      { role: 'system' as const, content: systemPrompt },
      { role: 'system' as const, content: safetyPrompt },
      ...(languagePrompt ? [{ role: 'system' as const, content: languagePrompt }] : []),
      ...(supportivePrompt ? [{ role: 'system' as const, content: supportivePrompt }] : []),
    ];

    const completion = await openAi.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        ...systemMessages,
        { role: 'user', content: message },
      ],
      temperature: 0.8, // Slightly more personal
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content?.trim() || 
      `I'm here to remember ${memorial.name} with you. Please share more.`;

    // Extract insights from user's message
    const insights = extractMemorialInsights(message, memorial.story);

    // Save conversation
    const conversationId = new ObjectId();
    await db.collection('guardianConversations').insertOne({
      _id: conversationId,
      memorialId,
      userId: session.userId,
      guardianId: guardian._id,
      messages: [
        {
          role: 'user',
          content: message,
          timestamp: new Date(),
        },
        {
          role: 'assistant',
          content: response,
          timestamp: new Date(),
        },
      ],
      memoryExtractions: insights,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Update Guardian's interaction count and memory
    const updateData: any = {
      conversationCount: (guardian.conversationCount || 0) + 1,
      lastInteraction: new Date(),
      updatedAt: new Date(),
    };

    if (insights.length > 0) {
      const existingMemories = guardian.memories || [];
      const newMemories = insights
        .map((i) => `${i.key}: ${i.content}`)
        .filter((m) => !existingMemories.includes(m));

      updateData.memories = [...existingMemories, ...newMemories].slice(0, 10);
    }

    await db.collection('memorialGuardians').updateOne(
      { _id: guardian._id },
      { $set: updateData }
    );

    return new Response(
      JSON.stringify({
        response,
        guardianMode: true,
        guardianName: guardian.name,
        memorialName: memorial.name,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Guardian chat error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process Guardian message' }),
      { status: 500 }
    );
  }
}

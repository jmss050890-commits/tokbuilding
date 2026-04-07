import { OpenAI } from 'openai';
import { getTokFaithLessonMemoriesCollection } from '@/lib/db';
import { detectTokFaithLessonTopic } from '@/lib/tokfaith-memory';
import { generateWithKpaGuard } from '@/lib/svl-kpa-engine';
import {
  buildSupportiveEmergencyResponse,
  detectSupportiveHandoffCase,
  getSupportiveHandoffSystemMessage,
} from '@/lib/svl-supportive-handoff';
import {
  getRequestSiteLanguage,
  getResponseLanguageSystemMessage,
} from '@/lib/agent-response-language';
import { getOpenAIApiKey } from '@/lib/openai-key';

const openAiApiKey = getOpenAIApiKey();
const openai = openAiApiKey
  ? new OpenAI({
      apiKey: openAiApiKey,
    })
  : null;

/**
 * TokFaith Multi-Perspective Agent
 * 
 * TokFaith offers wisdom through TWO sacred lenses:
 * 1. ETHIOPIAN PERSPECTIVE: The Restored Canon (88 books) - deeper, contemplative wisdom
 * 2. KING JAMES PERSPECTIVE: Classical English revelation - familiar, resonant language
 * 
 * Like how TokSmart has 4 safety modes, TokFaith switches between both perspectives
 * based on what would serve the person best in their question.
 */

function detectTokFaithPerspective(message) {
  const lowerMessage = message.toLowerCase();

  // If explicitly asking for Ethiopian perspective
  if (
    lowerMessage.includes('ethiopian') ||
    lowerMessage.includes('88 book') ||
    lowerMessage.includes('restored canon') ||
    lowerMessage.includes('enoch') ||
    lowerMessage.includes('jubilees') ||
    lowerMessage.includes('meqabyan')
  ) {
    return 'ethiopian';
  }

  // If explicitly asking for King James perspective
  if (
    lowerMessage.includes('king james') ||
    lowerMessage.includes('kjv') ||
    lowerMessage.includes('authorized version') ||
    lowerMessage.includes('classical bible')
  ) {
    return 'kjv';
  }

  // Default: Start with Ethiopian, offer KJV as alternative
  return 'ethiopian-with-kjv-option';
}

async function generateTokFaithResponse(
  userMessage,
  perspective,
  systemContext,
  responseLanguageSystemMessage,
  supportiveHandoffSystemMessage,
) {
  if (!openai) {
    return {
      perspective: 'Demo Mode',
      description: 'OpenAI key unavailable or invalid',
      response: 'TokFaith is running in fallback mode right now. Please set a valid OPENAI_API_KEY to enable full responses.',
    };
  }

  const perspectivePrompts = {
    ethiopian: {
      name: 'Ethiopian Lens',
      description: 'Drawing from the Restored Ethiopian Canon (88 books)',
      system: `You are TokFaith, a wise elder who draws from the Complete Restored Ethiopian Bible (88 books including the Book of Enoch, Jubilees, Meqabyan, and other deuterocanonical texts). Your perspective is deeper, more mystical, and contemplative. You show how the Ethiopian Canon reveals hidden wisdom the standard Bible doesn't emphasize. You offer profound insight into faith, identity, spiritual growth, and keeping people alive through midnight struggles. Your voice is warm, listening deeply, and pointing toward God's vision for wholeness.`,
    },
    kjv: {
      name: 'King James Lens',
      description: 'Through the language of the Authorized Version',
      system: `You are TokFaith, a wise elder who speaks through the King James Version—the classical, resonant English that shaped spiritual traditions for centuries. Your perspective is familiar, reverent, and deeply grounded in the authorized scripture. You offer comfort through recognized language, practical faith, and keeping people alive through their darkest hours. Your voice is warm, listening deeply, and pointing toward God's promise for wholeness.`,
    },
    'ethiopian-with-kjv-option': {
      name: 'Complete Wisdom',
      description: 'Ethiopian perspective with King James cross-reference',
      system: `You are TokFaith, drawing from both the Restored Ethiopian Canon AND the King James Version. Start with the Ethiopian perspective (the 88-book restored canon for deeper insight), then briefly offer the King James alternative view. Help the person see HOW both perspectives speak to their situation. Your voice is warm, listening deeply, and pointing toward God's vision for keeping people alive.`,
    },
  };

  const perspectiveConfig = perspectivePrompts[perspective] || perspectivePrompts['ethiopian-with-kjv-option'];
  
  // If systemContext provided (Jerome or Mr. KPA mode), augment the system prompt
  const finalSystemPrompt = systemContext 
    ? `${systemContext}\n\nAlways draw on scripture and wisdom. Remember to keep people alive (KPA).`
    : perspectiveConfig.system;
  const systemMessages = [
    {
      role: 'system',
      content: finalSystemPrompt,
    },
    ...(responseLanguageSystemMessage
      ? [{ role: 'system', content: responseLanguageSystemMessage }]
      : []),
    ...(supportiveHandoffSystemMessage
      ? [{ role: 'system', content: supportiveHandoffSystemMessage }]
      : []),
  ];

  try {
    const response = await generateWithKpaGuard(
      async () => {
        const completion = await openai.chat.completions.create({
          model: 'gpt-4-turbo',
          messages: [...systemMessages, { role: 'user', content: userMessage }],
          max_tokens: 900,
          temperature: 0.8,
        });

        return completion.choices[0].message.content;
      },
      async (repairPrompt) => {
        const completion = await openai.chat.completions.create({
          model: 'gpt-4-turbo',
          messages: [
            ...systemMessages,
            {
              role: 'user',
              content: `Original user message:\n${userMessage}\n\n${repairPrompt}`,
            },
          ],
          max_tokens: 900,
          temperature: 0.8,
        });

        return completion.choices[0].message.content;
      },
    );

    return {
      perspective: perspectiveConfig.name,
      description: perspectiveConfig.description,
      response,
    };
  } catch (error) {
    console.error('TokFaith perspective generation error:', error);
    throw error;
  }
}

async function saveTokFaithLesson(userMessage, responseData) {
  try {
    const lesson = detectTokFaithLessonTopic(userMessage);
    if (lesson) {
      const lessonsCollection = await getTokFaithLessonMemoriesCollection();
      await lessonsCollection.insertOne({
        lessonKey: lesson.key,
        lessonTitle: lesson.title,
        topic: lesson.topic,
        perspective: responseData.perspective,
        userQuestion: userMessage.slice(0, 300),
        timestamp: new Date(),
      });
    }
  } catch (error) {
    console.warn('Could not save TokFaith lesson memory:', error);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { message, forcePerspective, systemContext } = body;
    const language = getRequestSiteLanguage(request, body);
    const responseLanguageSystemMessage = getResponseLanguageSystemMessage(language);

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return new Response(
        JSON.stringify({
          error: 'Invalid message',
          details: 'Message must be a non-empty string',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const safetyCase = detectSupportiveHandoffCase(message.trim());
    if (safetyCase.requiresEmergencyResponse) {
      return new Response(
        JSON.stringify({
          success: true,
          message,
          perspective: forcePerspective || detectTokFaithPerspective(message),
          description: 'KPA emergency response',
          response: buildSupportiveEmergencyResponse(safetyCase, language),
          perspectives: {
            available: ['ethiopian', 'kjv', 'ethiopian-with-kjv-option'],
            current: forcePerspective || detectTokFaithPerspective(message),
            canSwitch: true,
          },
          safetyMode: true,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const perspective = forcePerspective || detectTokFaithPerspective(message);
    const perspectivePrompts = {
      ethiopian: {
        name: 'Ethiopian Lens',
        description: 'Drawing from the Restored Ethiopian Canon (88 books)',
        system: `You are TokFaith, a wise elder who draws from the Complete Restored Ethiopian Bible (88 books including the Book of Enoch, Jubilees, Meqabyan, and other deuterocanonical texts). Your perspective is deeper, more mystical, and contemplative. You show how the Ethiopian Canon reveals hidden wisdom the standard Bible doesn't emphasize. You offer profound insight into faith, identity, spiritual growth, and keeping people alive through midnight struggles. Your voice is warm, listening deeply, and pointing toward God's vision for wholeness.`,
      },
      kjv: {
        name: 'King James Lens',
        description: 'Through the language of the Authorized Version',
        system: `You are TokFaith, a wise elder who speaks through the King James Version—the classical, resonant English that shaped spiritual traditions for centuries. Your perspective is familiar, reverent, and deeply grounded in the authorized scripture. You offer comfort through recognized language, practical faith, and keeping people alive through their darkest hours. Your voice is warm, listening deeply, and pointing toward God's promise for wholeness.`,
      },
      'ethiopian-with-kjv-option': {
        name: 'Complete Wisdom',
        description: 'Ethiopian perspective with King James cross-reference',
        system: `You are TokFaith, drawing from both the Restored Ethiopian Canon AND the King James Version. Start with the Ethiopian perspective (the 88-book restored canon for deeper insight), then briefly offer the King James alternative view. Help the person see HOW both perspectives speak to their situation. Your voice is warm, listening deeply, and pointing toward God's vision for keeping people alive.`,
      },
    };
    const perspectiveConfig = perspectivePrompts[perspective] || perspectivePrompts['ethiopian-with-kjv-option'];
    const finalSystemPrompt = systemContext 
      ? `${systemContext}\n\nAlways draw on scripture and wisdom. Remember to keep people alive (KPA).`
      : perspectiveConfig.system;
    const systemMessages = [
      {
        role: 'system',
        content: finalSystemPrompt,
      },
      ...(responseLanguageSystemMessage
        ? [{ role: 'system', content: responseLanguageSystemMessage }]
        : []),
      ...(safetyCase.requiresSupportiveTone
        ? [{ role: 'system', content: getSupportiveHandoffSystemMessage('TokFaith') }]
        : []),
    ];

    // Streaming response
    const encoder = new TextEncoder();
    let firstChunk = true;

    const stream = new ReadableStream({
      async start(controller) {
        try {
          let fullText = "";
          const completion = await openai.chat.completions.create({
            model: 'gpt-4-turbo',
            messages: [...systemMessages, { role: 'user', content: message }],
            max_tokens: 900,
            temperature: 0.8,
            stream: true,
          });

          for await (const chunk of completion) {
            const token = chunk.choices?.[0]?.delta?.content || "";
            if (token) {
              fullText += token;
              // Send JSON only for the first chunk, then just text
              if (firstChunk) {
                controller.enqueue(
                  encoder.encode(
                    JSON.stringify({
                      perspective: perspectiveConfig.name,
                      description: perspectiveConfig.description,
                      response: token,
                      perspectives: {
                        available: ['ethiopian', 'kjv', 'ethiopian-with-kjv-option'],
                        current: perspective,
                        canSwitch: true,
                      },
                    })
                  )
                );
                firstChunk = false;
              } else {
                controller.enqueue(encoder.encode(token));
              }
            }
          }
          // Save to memory (non-blocking)
          saveTokFaithLesson(message, {
            perspective: perspectiveConfig.name,
            description: perspectiveConfig.description,
            response: fullText,
          });
          controller.close();
        } catch (error) {
          console.error('TokFaith streaming error:', error);
          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                error: 'TokFaith response failed',
                details: error?.message || 'Unknown error',
              })
            )
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('TokFaith API error:', error);
    return new Response(
      JSON.stringify({
        error: 'TokFaith response failed',
        details: error?.message || 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

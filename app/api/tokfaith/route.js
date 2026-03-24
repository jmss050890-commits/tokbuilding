import { OpenAI } from 'openai';
import { getTokFaithLessonMemoriesCollection } from '@/lib/db';
import { detectTokFaithLessonTopic } from '@/lib/tokfaith-memory';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-demo-mode',
});

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

async function generateTokFaithResponse(userMessage, perspective, systemContext) {
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

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: finalSystemPrompt,
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
      max_tokens: 900,
      temperature: 0.8,
    });

    return {
      perspective: perspectiveConfig.name,
      description: perspectiveConfig.description,
      response: response.choices[0].message.content,
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
    const { message, forcePerspective, systemContext } = await request.json();

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return new Response(
        JSON.stringify({
          error: 'Invalid message',
          details: 'Message must be a non-empty string',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const perspective = forcePerspective || detectTokFaithPerspective(message);
    const responseData = await generateTokFaithResponse(message, perspective, systemContext);

    // Save to memory (non-blocking)
    await saveTokFaithLesson(message, responseData);

    return new Response(
      JSON.stringify({
        success: true,
        message: message,
        perspective: responseData.perspective,
        description: responseData.description,
        response: responseData.response,
        perspectives: {
          available: ['ethiopian', 'kjv', 'ethiopian-with-kjv-option'],
          current: perspective,
          canSwitch: true,
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
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

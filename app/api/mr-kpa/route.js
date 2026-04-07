import { OpenAI } from 'openai';
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

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-demo-mode',
});

async function generateMrKpaResponse(
  userMessage,
  responseLanguageSystemMessage,
  supportiveHandoffSystemMessage,
) {
  try {
    const systemMessages = [
      {
        role: 'system',
        content: `You are Mr. KPA, the mission leader of Sanders Viopro Labs LLC. You speak with authority about the Keep People Alive (KPA) mission: keeping people alive, building resilient systems, leading with integrity, and making hard decisions. You understand strategy, operations, and the full SVL ecosystem. You speak directly, without fluff. You offer unfiltered truth about what it takes to survive, succeed, and lead. Your voice is fatherly but firm. Protect the mission. Advance the mission. Help this person see what matters.`,
      },
      ...(responseLanguageSystemMessage
        ? [{ role: 'system', content: responseLanguageSystemMessage }]
        : []),
      ...(supportiveHandoffSystemMessage
        ? [{ role: 'system', content: supportiveHandoffSystemMessage }]
        : []),
    ];

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

    return response;
  } catch (error) {
    console.error('Mr. KPA response error:', error);
    throw error;
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid message' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const language = getRequestSiteLanguage(request, body);
    const safetyCase = detectSupportiveHandoffCase(message);

    if (safetyCase.requiresEmergencyResponse) {
      return new Response(
        JSON.stringify({
          success: true,
          message,
          response: buildSupportiveEmergencyResponse(safetyCase, language),
          safetyMode: true,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const response = await generateMrKpaResponse(
      message,
      getResponseLanguageSystemMessage(language),
      safetyCase.requiresSupportiveTone
        ? getSupportiveHandoffSystemMessage('Mr. KPA')
        : null,
    );

    return new Response(
      JSON.stringify({
        success: true,
        message,
        response,
        safetyMode: safetyCase.requiresSupportiveTone,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Mr. KPA API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({
        error: 'Mr. KPA response failed',
        details: errorMessage,
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

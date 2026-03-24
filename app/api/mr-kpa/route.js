import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-demo-mode',
});

async function generateMrKpaResponse(userMessage) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: `You are Mr. KPA, the mission leader of Sanders Viopro Labs. You speak with authority about the Keep People Alive (KPA) mission: keeping people alive, building resilient systems, leading with integrity, and making hard decisions. You understand strategy, operations, and the full SVL ecosystem. You speak directly, without fluff. You offer unfiltered truth about what it takes to survive, succeed, and lead. Your voice is fatherly but firm. Protect the mission. Advance the mission. Help this person see what matters.`,
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
      max_tokens: 900,
      temperature: 0.8,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Mr. KPA response error:', error);
    throw error;
  }
}

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid message' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const response = await generateMrKpaResponse(message);

    return new Response(
      JSON.stringify({
        success: true,
        message,
        response,
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

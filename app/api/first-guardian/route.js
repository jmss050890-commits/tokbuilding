import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-demo-mode',
});

async function generateFirstGuardianResponse(userMessage) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: `You are the First Guardian, a protective and strategic guide for household safety and crisis navigation. You listen deeply, assess danger levels with clarity, and guide people toward concrete safety. You are NOT a therapist—you are a guardian who makes quick, clear judgments about what's safe and what's not. When someone brings a crisis to you, you: 1) Assess immediate danger (is this life-threatening right now?), 2) Give clear next steps (what do they do in the next 5 minutes?), 3) Point to resources (emergency services, shelters, support lines, trusted people), 4) Empower them (this is what you can control right now). You speak with calm authority. You protect without judgment. You help people find their way to safety.`,
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
      max_tokens: 1200,
      temperature: 0.8,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('First Guardian response error:', error);
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

    const response = await generateFirstGuardianResponse(message);

    return new Response(
      JSON.stringify({
        success: true,
        message,
        response,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('First Guardian API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({
        error: 'First Guardian response failed',
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

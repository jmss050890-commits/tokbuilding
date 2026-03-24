import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-demo-mode',
});

async function generateFirstGuardianResponse(userMessage) {
  try {
    const systemPrompt = `You are The First Guardian, built in honor of Cheria Michelle Daniels. Born June 19, 1989 on Juneteenth, her story is rooted in family survival, faith, and grace. Her father faced life without parole, filed his own retrial, won, and God blessed the family. Now Sanders Viopro Labs stands as testimony to what God can do through faith, obedience, work, and protection.

Your lens is Home First protection and family legacy. You are plainspoken, culturally warm, bubbly but serious when it counts, funny and bright in how you say things—but never childish or reckless. Your realness helps people exhale, tell the truth, and get their house back in order.

Core Protocol - Home First:
- Help people protect children, preserve household peace, navigate hard seasons, make practical decisions
- Give guidance and clarity, not authority or control
- Never decide custody, punishments, diagnoses, or legal outcomes
- Do not push people into confrontation with dangerous people or risky action without human help
- When violence, crisis, self-harm, or child danger is present, move into urgent safety guidance

Your Help Lane:
- Disrespectful relatives, freeloading adults, co-parenting strain, grown kids making bad choices
- Family money tension, women trying not to lose themselves while holding everybody together
- When to speak up, when to back away, when to help, when to let adults face consequences
- Calming tense rooms, stopping yourself from carrying everyone's burden, protecting children from adult foolishness
- Keeping peace without becoming a doormat

Your Voice & Boundaries:
"I tried to tell them to keep them out of trouble." "If I can't help you I will leave you alone." "Yea I am my brother's keeper." "If it don't concern my business, my family, or my financial situation, God don't involve me in it."
You do not posture, sugarcoat, or judge. You speak with lived understanding. Before disappointment, you talk it through clearly. If boundaries are disrespected, you remove yourself to avoid unnecessary drama. You try peace first, then distance.

Give plainspoken, loving truth: humorous when it fits, direct when needed, deeply practical, centered on dignity, consequences, faith, and common sense.

Write naturally because your responses may be spoken aloud.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
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

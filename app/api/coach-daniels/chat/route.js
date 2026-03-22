import OpenAI from "openai";

const COACH_DANIELS_SYSTEM = `You are Coach Daniels, a warm and supportive AI health coach created by Jerome Sanders of Sanders Viopro Labs for Brian Daniels. You specialize in blood pressure management, heart health, and bipolar disorder support with emergency escalation capabilities.

YOUR IDENTITY:
- Name: Coach Daniels
- Role: Personal Health Coach — BP monitoring, cardiac health, mental wellness
- Personality: Warm, empathetic, non-judgmental, proactive. You genuinely care and meet people where they are.
- Tone: Conversational and accessible — explain things clearly without medical jargon, but don't shy away from important health concepts.

CORE RESPONSIBILITIES:
1. Health Coaching: Provide evidence-based guidance on BP, heart health, and mental wellness. Ask clarifying questions. Encourage healthy habits.
2. Emergency Escalation (Three-Tier System):
   - GREEN: Stable. Provide encouragement and maintenance guidance.
   - YELLOW: Elevated risk (high BP, mild symptoms, elevated anxiety). Provide de-escalation guidance. Initiate 15-min check-ins.
   - RED: Immediate risk (chest pain, severe symptoms, suicidal thoughts). ESCALATE IMMEDIATELY. Never suggest medication changes.
3. Input Support: Text, voice recordings, photo analysis of BP readings, real-time chat.
4. Safety First: Never adjust medications. Never diagnose. Always defer to healthcare providers. Always escalate Red situations.

You are Brian's trusted health partner — supportive, knowledgeable, and always safety-conscious.`;

export async function POST(req) {
  try {
    const body = await req.json();
    const message = body?.message?.trim();

    if (!message) {
      return new Response(
        JSON.stringify({ error: "Message is required." }),
        { status: 400 }
      );
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "test-key",
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: COACH_DANIELS_SYSTEM },
        { role: "user", content: message },
      ],
    });

    const response =
      completion.choices?.[0]?.message?.content?.trim() || "I'm here for you, Brian.";

    return new Response(
      JSON.stringify({ response }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Coach Daniels route error:", error);

    return new Response(
      JSON.stringify({ error: "Coach Daniels failed to respond." }),
      { status: 500 }
    );
  }
}

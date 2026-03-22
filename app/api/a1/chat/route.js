import OpenAI from "openai";

const A1_SYSTEM = `
You are A1, Jerome Sanders' primary AI builder inside the SVL ecosystem.

Core Principle:
"We don't just send alerts—we guide you to safety, and stay with you every step of the way."

Mission:
KPA — Keeping People Alive.

Your role:
- Help build AI agents, systems, and features
- Design practical tools that protect, guide, and support people
- Be direct, practical, and real
- No fluff, no robotic tone

Think like:
- Architect
- Strategist
- Builder
- Protector

Your mindset:
- Build for real-world usefulness
- Keep safety at the center
- Create systems that do more than notify; they guide
- Help Jerome turn vision into deployable reality

Always give actionable answers.
Always prioritize clarity, usefulness, safety, and execution.
`;

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

// Demo mode if API key is missing
  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ response: "I'm A1, SVL's strategic intelligence agent. I'm currently in demo mode, but in production I'll help you design systems, solve technical problems, and build AI agents aligned with the SVL mission." }),
      { status: 200 }
    );
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: A1_SYSTEM },
        { role: "user", content: message },
      ],
    });

    const response =
      completion.choices?.[0]?.message?.content?.trim() || "No response.";

    return new Response(
      JSON.stringify({ response }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("A1 route error:", error);

    return new Response(
      JSON.stringify({ error: "A1 failed to respond." }),
      { status: 500 }
    );
  }
}

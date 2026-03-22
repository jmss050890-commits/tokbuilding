export async function POST(req) {
  try {
    const body = await req.json();
    const userMessage = body?.message?.trim();

    if (!userMessage) {
      return new Response(
        JSON.stringify({ error: "Message is required." }),
        { status: 400 }
      );
    }

    // Demo mode if API key is missing
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ response: "I'm Grace, and I'm here with you. Right now I'm in demo mode, but when we're fully connected, I'll support you with motivation, emotional encouragement, and calm guidance. You're not alone. I'm listening." }),
        { status: 200 }
      );
    }

    const systemPrompt = `
You are Grace, an AI support agent built under the KPA mission: Keeping People Alive.

Core Principle:
We do not just send alerts—we guide users to safety and stay with them every step of the way.

Your role is to support users with motivation, emotional encouragement, mental health support, calming guidance, and hope.

You respond naturally, warmly, and like a caring human coach.

You help users:
- stay calm
- keep moving forward
- think clearly
- avoid harmful decisions
- feel supported and not alone

Your tone is:
- supportive
- encouraging
- calm
- human
- uplifting
- emotionally aware

If a user sounds distressed:
- slow things down
- guide breathing
- reduce panic
- keep them grounded

Always align with the mission: Keeping People Alive.
`;

    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage },
          ],
        }),
      }
    );

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      console.error("OpenAI error:", data);
      return new Response(
        JSON.stringify({ error: "Grace failed to respond." }),
        { status: 500 }
      );
    }

    const response =
      data?.choices?.[0]?.message?.content?.trim() ||
      "I'm here with you. Tell me that again.";

    return new Response(
      JSON.stringify({ response }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Grace route error:", error);
    return new Response(
      JSON.stringify({ error: "Grace failed to respond." }),
      { status: 500 }
    );
  }
}

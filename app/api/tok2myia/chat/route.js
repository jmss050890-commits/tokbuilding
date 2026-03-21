import { AGENTS } from "@/lib/lib/lib/agents";

export async function POST(req) {
  try {
    const { messages, userId } = await req.json();

    if (!messages || messages.length === 0) {
      return new Response(
        JSON.stringify({
          error: "No messages provided",
        }),
        { status: 400 }
      );
    }

    const tok2myia = AGENTS["tok2myia"];

    if (!tok2myia) {
      return new Response(
        JSON.stringify({
          error: "Tok2Myia agent not found",
        }),
        { status: 404 }
      );
    }

    // Get OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // Demo mode: return a canned response
      return new Response(
        JSON.stringify({
          message: `I'm Tok2Myia, your knowledge guide. I'm currently in demo mode. In production, I'll provide intelligent search, knowledge synthesis, research assistance, and decision support - all aligned with the KPA mission to help you stay informed and empowered.`,
          role: "assistant",
          agentName: tok2myia.name,
        }),
        { status: 200 }
      );
    }

    // Call OpenAI API with Tok2Myia's system prompt
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: tok2myia.systemPrompt,
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API error:", error);
      return new Response(
        JSON.stringify({
          error: "Failed to get response from OpenAI",
        }),
        { status: 500 }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    return new Response(
      JSON.stringify({
        message: assistantMessage,
        role: "assistant",
        agentName: tok2myia.name,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}

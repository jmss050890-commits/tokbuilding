import { OpenAI } from "openai";
import { AGENTS } from "@/lib/lib/lib/agents";

export async function POST(req) {
  try {
    const { message, userId } = await req.json();

    if (!message || message.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Message cannot be empty" }),
        { status: 400 }
      );
    }

    // Get Mr. KPA agent config
    const mrKpaAgent = AGENTS["mr-kpa"];
    if (!mrKpaAgent) {
      return new Response(
        JSON.stringify({ error: "Mr. KPA agent not found" }),
        { status: 404 }
      );
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || "test-key",
    });

    // Build messages for API (system prompt + user message)
    const messages = [
      {
        role: "system",
        content: mrKpaAgent.systemPrompt,
      },
      {
        role: "user",
        content: message,
      },
    ];

    // Call OpenAI API
    let responseText;
    
    if (process.env.OPENAI_API_KEY) {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: messages,
        max_tokens: 1024,
        temperature: 0.9,
      });
      responseText = response.choices[0].message.content;
    } else {
      // Demo mode: generate response based on message
      responseText = generateDemoResponse(message, mrKpaAgent.name);
    }

    return new Response(
      JSON.stringify({
        success: true,
        agentName: mrKpaAgent.name,
        response: responseText,
        userId,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Mr. KPA Chat Error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to get response from Mr. KPA",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}

// Demo mode response generator for development
function generateDemoResponse(userMessage, agentName) {
  const lowerMessage = userMessage.toLowerCase();

  if (
    lowerMessage.includes("kpa") ||
    lowerMessage.includes("mission") ||
    lowerMessage.includes("keep")
  ) {
    return `The KPA mission — Keep People Alive — is everything we do at Sanders Viopro Labs. It's not about profit. It's about building systems where people protect each other, where communities thrive, where every tool we create serves one purpose: to keep someone alive. That's what drives us. That's what I built this for.`;
  }

  if (
    lowerMessage.includes("help") ||
    lowerMessage.includes("how can i")
  ) {
    return `Here's what matters: Find one person in your circle who needs protection or support. Use the tools we've built — whether that's Grace for mindset, TokHealth for wellness, or TokThru for safety. Then teach them. Help them help someone else. That's how movements start. That's how we Keep People Alive together.`;
  }

  if (
    lowerMessage.includes("vision") ||
    lowerMessage.includes("svl") ||
    lowerMessage.includes("sanders")
  ) {
    return `Sanders Viopro Labs exists to build a world where families are protected, where people take care of each other, where technology serves life instead of replacing it. We're not chasing trends. We're building systems. Seven agents, each one serving a real human need. TokStore funds the mission. Every piece connects. This is verified, authentic, and mission-first.`;
  }

  if (lowerMessage.includes("why")) {
    return `Because I've seen what happens when people are left alone. I've watched communities fall apart when there's no framework for care. So I'm building that framework. One agent at a time. One community at a time. Every product, every system, every decision comes back to this: Will it Keep People Alive? If the answer is no, we don't build it.`;
  }

  return `I appreciate the question. Here's what I know: the world needs people who care more about keeping each other alive than about getting rich. That's what we're building at Sanders Viopro Labs. That's the verified mission. What part of this resonates with you?`;
}

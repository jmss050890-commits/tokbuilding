import { OpenAI } from "openai";
import { AGENTS } from "@/lib/lib/lib/agents";
import { getOpenAIApiKey } from "@/lib/openai-key";
import { generateWithKpaGuard } from "@/lib/svl-kpa-engine";
import {
  buildSupportiveEmergencyResponse,
  detectSupportiveHandoffCase,
  getSupportiveHandoffSystemMessage,
} from "@/lib/svl-supportive-handoff";
import {
  getRequestSiteLanguage,
  getResponseLanguageSystemMessage,
} from "@/lib/agent-response-language";

export async function POST(req) {
  let message = "";
  let userId;
  let safetyMode = false;
  try {
    const body = await req.json();
    message = body?.message;
    userId = body?.userId;
    const language = getRequestSiteLanguage(req, body);
    const responseLanguageSystemMessage = getResponseLanguageSystemMessage(language);

    if (!message || message.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Message cannot be empty" }),
        { status: 400 }
      );
    }

    const safetyCase = detectSupportiveHandoffCase(message);
    safetyMode = safetyCase.requiresSupportiveTone;
    if (safetyCase.requiresEmergencyResponse) {
      return new Response(
        JSON.stringify({
          success: true,
          agentName: "Mr. KPA",
          response: buildSupportiveEmergencyResponse(safetyCase, language),
          userId,
          safetyMode: true,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const mrKpaAgent = AGENTS["mr-kpa"];
    if (!mrKpaAgent) {
      return new Response(
        JSON.stringify({ error: "Mr. KPA agent not found" }),
        { status: 404 }
      );
    }

    const openAiApiKey = getOpenAIApiKey();
    const openai = new OpenAI({
      apiKey: openAiApiKey || "test-key",
    });

    const messages = [
      {
        role: "system",
        content: mrKpaAgent.systemPrompt,
      },
      ...(responseLanguageSystemMessage
        ? [{ role: "system", content: responseLanguageSystemMessage }]
        : []),
      ...(safetyCase.requiresSupportiveTone
        ? [{ role: "system", content: getSupportiveHandoffSystemMessage("Mr. KPA") }]
        : []),
      {
        role: "user",
        content: message,
      },
    ];

    let responseText;

    if (openAiApiKey) {
      responseText = await generateWithKpaGuard(
        async () => {
          const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages,
            max_tokens: 1024,
            temperature: 0.9,
          });

          return (
            response.choices?.[0]?.message?.content?.trim() ||
            "I hear you. Let me answer that in a way that serves the mission clearly."
          );
        },
        async (repairPrompt) => {
          const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              ...messages.slice(0, -1),
              {
                role: "user",
                content: `Original user message:\n${message}\n\n${repairPrompt}`,
              },
            ],
            max_tokens: 1024,
            temperature: 0.9,
          });

          return (
            response.choices?.[0]?.message?.content?.trim() ||
            "I hear you. Let me answer that in a way that serves the mission clearly."
          );
        }
      );
    } else {
      responseText = generateDemoResponse(message);
    }

    return new Response(
      JSON.stringify({
        success: true,
        agentName: mrKpaAgent.name,
        response: responseText,
        userId,
        safetyMode,
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
        success: true,
        agentName: "Mr. KPA",
        response: generateDemoResponse(message || "What is TokBuilding?"),
        userId,
        safetyMode,
        fallbackMode: true,
        details:
          process.env.NODE_ENV === "development" ? error?.message : undefined,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}

function generateDemoResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();

  if (
    lowerMessage.includes("talk to me like jerome") ||
    lowerMessage.includes("mr. kpa word") ||
    lowerMessage.includes("word for today")
  ) {
    return "Here it is plain: stop waiting for a perfect day to become a serious person. A lot of people keep calling it destiny when really it is delayed discipline. God is not confused about what He put in you, so stop moving like your purpose needs permission from fear. Tighten up what you already know to do, and let today's obedience start talking louder than today's mood.";
  }

  if (
    lowerMessage.includes("fatherly") ||
    lowerMessage.includes("father") ||
    lowerMessage.includes("dad advice")
  ) {
    return "Let me talk to you straight. You do not have to prove your worth by bleeding for everybody in the room. A real covering is not loud all the time. It is consistent. It is responsible. It is present. If you say you love people, then build habits strong enough to protect what you claim matters.";
  }

  if (
    lowerMessage.includes("big brother") ||
    lowerMessage.includes("discipline") ||
    lowerMessage.includes("tighten up")
  ) {
    return "Big-brother truth? Half the battle is not mystery. It is repetition. Go to sleep on time. Tell the truth faster. Stop calling your lack of structure a personality trait. Respect the assignment on your life enough to give it a schedule, not just a speech.";
  }

  if (
    lowerMessage.includes("purpose") ||
    lowerMessage.includes("calling") ||
    lowerMessage.includes("next move")
  ) {
    return "Purpose is not just what sounds deep. Purpose is what you can stay faithful to when the applause is gone, the money is late, and the pressure is real. Your next move should not be built around what impresses people. It should be built around what keeps the mission alive and gives your life honest direction.";
  }

  if (
    lowerMessage.includes("pressure") ||
    lowerMessage.includes("heavy") ||
    lowerMessage.includes("stress") ||
    lowerMessage.includes("overwhelmed")
  ) {
    return "Pressure will either expose your foundation or force you to build one. Slow down. Name what is real. Cut what is extra. Keep God first. Then handle the next necessary move instead of trying to solve your whole life in one emotional sitting. Sometimes strength looks like order, not intensity.";
  }

  if (
    lowerMessage.includes("faith") ||
    lowerMessage.includes("god") ||
    lowerMessage.includes("wisdom")
  ) {
    return "Faith is not hiding from the work. Faith is having the courage to do the work without losing your soul in it. Keep God first, keep your heart clean, and keep your habits honest. Wisdom without discipline stays a quote. Faith with obedience starts building something real.";
  }

  if (
    lowerMessage.includes("tokbuilding") ||
    lowerMessage.includes("build")
  ) {
    return "TokBuilding helps people build something for themselves. It turns ideas into AI agents, prompts, and useful business tools that can actually move somebody forward. In the SVL system, TokBuilding is the builder lane, TokSEO helps people find what gets built, the agent hub helps people understand how to use it, and sandersvioprolabsllc.com ties the whole mission together. If you're ready to see the builder side directly, go to TokBuilding. If you want the full map first, start at sandersvioprolabsllc.com.";
  }

  if (
    lowerMessage.includes("meeting") ||
    lowerMessage.includes("agenda") ||
    lowerMessage.includes("alignment") ||
    lowerMessage.includes("research")
  ) {
    return "Daily AI Agent Team Meeting, 8:00 AM Central. Objective: keep every SVL agent aligned with KPA, today's risks, and the newest trusted research. Agenda: 1. Mission alignment. 2. Safety and escalation review. 3. Current research watchpoints. 4. Agent-by-agent updates. 5. Assignments, owners, and tomorrow's follow-up. If you want, I can turn that into a tighter briefing for today's session right now.";
  }

  if (
    lowerMessage.includes("kpa") ||
    lowerMessage.includes("mission") ||
    lowerMessage.includes("keep")
  ) {
    return "The KPA mission - Keep People Alive - is everything we do at Sanders Viopro Labs LLC. It's not about profit. It's about building systems where people protect each other, where communities thrive, and where every tool we create serves one purpose: to keep someone alive.";
  }

  if (
    lowerMessage.includes("help") ||
    lowerMessage.includes("how can i")
  ) {
    return "Here's what matters: find one person in your circle who needs protection or support. Use the tools we've built, then teach them. Help them help someone else. That's how movements start. That's how we Keep People Alive together. Mission is not just what you believe. Mission is what you keep doing when it gets inconvenient.";
  }

  if (
    lowerMessage.includes("vision") ||
    lowerMessage.includes("svl") ||
    lowerMessage.includes("sanders")
  ) {
    return "Sanders Viopro Labs LLC exists to build a world where families are protected, where people take care of each other, and where technology serves life instead of replacing it. We are not chasing trends. We are building systems.";
  }

  if (lowerMessage.includes("why")) {
    return "Because I've seen what happens when people are left alone. So I'm building a framework for care. One agent at a time. One community at a time. Every decision comes back to this: Will it Keep People Alive?";
  }

  return "I appreciate the question. Here's what I know: the world needs people who care more about keeping each other alive than about getting rich, performing, or looking important. That's what we're building at Sanders Viopro Labs LLC. If you want, bring me the situation plain and I'll give you the realest next-step read I can.";
}


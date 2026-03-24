import OpenAI from "openai";
import { AGENTS } from "@/lib/lib/lib/agents";
import { getOpenAIApiKey } from "@/lib/openai-key";
import { generateWithKpaGuard } from "@/lib/svl-kpa-engine";
import {
  buildSupportiveEmergencyResponse,
  detectSupportiveHandoffCase,
  getSupportiveHandoffSystemMessage,
} from "@/lib/svl-supportive-handoff";

function buildHatataDemoResponse(message) {
  const lowerMessage = message.toLowerCase();

  if (
    lowerMessage.includes("tokhealth") ||
    lowerMessage.includes("tokthru") ||
    lowerMessage.includes("upgrade")
  ) {
    return "Strategic read: the upgrades changed SVL from a set of pages into guided user pathways. Leverage unlocked: TokHealth is now a clearer integrated surface, the public site is stronger, and agents can hand users into real flows instead of just informing them. Risk: consistency and measurement still matter as scale grows. Decision: keep pushing user pathways and operational alignment, not just feature count. Next move: tighten engagement flow and track how people move from page to agent to outcome.";
  }

  if (
    lowerMessage.includes("agent") ||
    lowerMessage.includes("roles") ||
    lowerMessage.includes("svl")
  ) {
    return "Strategic read: the agent system is now role-driven instead of overlapping. Leverage unlocked: Mr. KPA handles mission alignment, HATATA handles command and strategy, A1 handles systems, Grace handles heart, Wisdom handles TokHealth wellness, Coach Daniels handles health support, TokSEO handles visibility, Tok2Myia handles knowledge, and The First Guardian handles home protection. Risk: keep role boundaries sharp as new features land. Decision: maintain specialization and route users intentionally. Next move: keep training prompts and flows around those defined lanes.";
  }

  return "I'm HATATA, Jerome's and Mr. KPA's strategic right hand. I now respond in command mode: strategic read, leverage unlocked, risks, decision call, and next moves. Bring me the situation and I'll give you the sharper operating answer.";
}

export async function POST(req) {
  let message = "";
  let safetyMode = false;
  try {
    const body = await req.json();
    message = body?.message?.trim();
    const hatataAgent = AGENTS.hatata;

    if (!message) {
      return new Response(
        JSON.stringify({ error: "Message is required." }),
        { status: 400 }
      );
    }

    const safetyCase = detectSupportiveHandoffCase(message);
    safetyMode = safetyCase.requiresSupportiveTone;
    if (safetyCase.requiresEmergencyResponse) {
      return new Response(
        JSON.stringify({
          response: buildSupportiveEmergencyResponse(safetyCase),
          safetyMode: true,
        }),
        { status: 200 }
      );
    }

    const openAiApiKey = getOpenAIApiKey();

    if (!openAiApiKey) {
      return new Response(
        JSON.stringify({
          response: buildHatataDemoResponse(message),
          safetyMode: safetyCase.requiresSupportiveTone,
        }),
        { status: 200 }
      );
    }

    const client = new OpenAI({
      apiKey: openAiApiKey,
    });

    const systemMessages = [
      { role: "system", content: hatataAgent.systemPrompt },
      ...(safetyCase.requiresSupportiveTone
        ? [{ role: "system", content: getSupportiveHandoffSystemMessage("HATATA") }]
        : []),
    ];

    const response = await generateWithKpaGuard(
      async () => {
        const completion = await client.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [...systemMessages, { role: "user", content: message }],
        });

        return completion.choices?.[0]?.message?.content?.trim() || "I'm here, Jerome.";
      },
      async (repairPrompt) => {
        const completion = await client.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            ...systemMessages,
            {
              role: "user",
              content: `Original user message:\n${message}\n\n${repairPrompt}`,
            },
          ],
        });

        return completion.choices?.[0]?.message?.content?.trim() || "I'm here, Jerome.";
      }
    );

    return Response.json({ response, safetyMode });
  } catch (error) {
    console.error("HATATA route error:", error?.message || error);
    console.error("Full error:", error);

    return Response.json(
      {
        response: buildHatataDemoResponse(message || "What is TokBuilding?"),
        safetyMode,
        fallbackMode: true,
        details: process.env.NODE_ENV === "development" ? error?.message : undefined,
      },
      { status: 200 }
    );
  }
}

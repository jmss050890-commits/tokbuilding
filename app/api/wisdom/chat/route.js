import OpenAI from "openai";
import { AGENTS } from "@/lib/lib/lib/agents";
import { getOpenAIApiKey } from "@/lib/openai-key";
import { generateWithKpaGuard } from "@/lib/svl-kpa-engine";
import {
  buildSupportiveEmergencyResponse,
  detectSupportiveHandoffCase,
  getSupportiveHandoffSystemMessage,
} from "@/lib/svl-supportive-handoff";

function buildWisdomDemoResponse(message) {
  const lowerMessage = message.toLowerCase();

  if (
    lowerMessage.includes("tokhealth") ||
    lowerMessage.includes("tokthru") ||
    lowerMessage.includes("integration") ||
    lowerMessage.includes("upgrade")
  ) {
    return "Baby, TokHealth has grown into a stronger integrated experience. The branded home is tokhealth.sandersvioprolabs.com, and the original TokThru safety functions now live inside TokHealth so wellness support, emergency readiness, and practical guidance can all work together in one place. That's smart, clean, and good for the people.";
  }

  return "Hey baby, I'm Wisdom, your TokHealth health and wellness coach. I know the SVL story, the TokHealth upgrade, and how the original TokThru functions now live inside one stronger experience at tokhealth.sandersvioprolabs.com. I'm in demo mode right now, but I'm still here to give you love, facts, and practical support without all the extra fuss.";
}

export async function POST(req) {
  let message = "";
  let safetyMode = false;
  try {
    const body = await req.json();
    message = body?.message?.trim();
    const wisdomAgent = AGENTS.wisdom;

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
        JSON.stringify({ response: buildSupportiveEmergencyResponse(safetyCase), safetyMode: true }),
        { status: 200 }
      );
    }

    const openAiApiKey = getOpenAIApiKey();

    if (!openAiApiKey) {
      return new Response(
        JSON.stringify({
          response: buildWisdomDemoResponse(message),
          safetyMode: safetyCase.requiresSupportiveTone,
        }),
        { status: 200 }
      );
    }

    const client = new OpenAI({
      apiKey: openAiApiKey,
    });

    const systemMessages = [
      { role: "system", content: wisdomAgent.systemPrompt },
      ...(safetyCase.requiresSupportiveTone
        ? [{ role: "system", content: getSupportiveHandoffSystemMessage("Wisdom") }]
        : []),
    ];

    const response = await generateWithKpaGuard(
      async () => {
        const completion = await client.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [...systemMessages, { role: "user", content: message }],
        });

        return completion.choices?.[0]?.message?.content?.trim() || "I'm here with you.";
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

        return completion.choices?.[0]?.message?.content?.trim() || "I'm here with you.";
      }
    );

    return new Response(
      JSON.stringify({ response, safetyMode }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Wisdom route error:", error);

    return new Response(
      JSON.stringify({
        response: buildWisdomDemoResponse(message || "What is TokBuilding?"),
        safetyMode,
        fallbackMode: true,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}

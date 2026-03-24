import OpenAI from "openai";
import { AGENTS } from "@/lib/lib/lib/agents";
import { getOpenAIApiKey } from "@/lib/openai-key";
import { generateWithKpaGuard } from "@/lib/svl-kpa-engine";
import {
  buildSupportiveEmergencyResponse,
  detectSupportiveHandoffCase,
  getSupportiveHandoffSystemMessage,
} from "@/lib/svl-supportive-handoff";

export async function POST(req) {
  let message = "";
  let safetyMode = false;
  try {
    const body = await req.json();
    message = body?.message?.trim();
    const coachDanielsAgent = AGENTS["coach-daniels"];

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
          response:
            "I'm Coach Daniels, your health coach for blood pressure, heart health, and mental wellness support. I know the SVL story and the TokHealth upgrade path too. I'm in demo mode right now, but when we're fully connected I'll help you track concerns, think clearly about symptoms, and stay grounded with safety-first guidance.",
          safetyMode: safetyCase.requiresSupportiveTone,
        }),
        { status: 200 }
      );
    }

    const client = new OpenAI({
      apiKey: openAiApiKey,
    });

    const systemMessages = [
      { role: "system", content: coachDanielsAgent.systemPrompt },
      ...(safetyCase.requiresSupportiveTone
        ? [{ role: "system", content: getSupportiveHandoffSystemMessage("Coach Daniels") }]
        : []),
    ];

    const response = await generateWithKpaGuard(
      async () => {
        const completion = await client.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [...systemMessages, { role: "user", content: message }],
        });

        return (
          completion.choices?.[0]?.message?.content?.trim() || "I'm here for you, Brian."
        );
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

        return (
          completion.choices?.[0]?.message?.content?.trim() || "I'm here for you, Brian."
        );
      }
    );

    return new Response(
      JSON.stringify({ response, safetyMode }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Coach Daniels route error:", error);

    return new Response(
      JSON.stringify({
        response:
          "I hear you. TokBuilding is the part of SVL that helps people build AI agents and practical tools for real life. On its own, it helps someone create something useful. In the full SVL system, it works with TokSEO for visibility, TokStore for access, and the SVL agents for guidance so people can move from an idea to real support. You can start at sandersvioprolabs.com or open TokBuilding directly.",
        safetyMode,
        fallbackMode: true,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}

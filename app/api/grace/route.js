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
import {
  buildAgentDemoModeResponse,
  buildAgentRetryResponse,
} from "@/lib/agent-fallback-copy";

export async function POST(req) {
  let userMessage = "";
  let safetyMode = false;
  let language = "en";
  try {
    const body = await req.json();
    userMessage = body?.message?.trim();
    language = getRequestSiteLanguage(req, body);
    const responseLanguageSystemMessage = getResponseLanguageSystemMessage(language);
    const graceAgent = AGENTS.grace;

    if (!userMessage) {
      return Response.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const safetyCase = detectSupportiveHandoffCase(userMessage);
    safetyMode = safetyCase.requiresSupportiveTone;
    if (safetyCase.requiresEmergencyResponse) {
      return Response.json(
        { reply: buildSupportiveEmergencyResponse(safetyCase, language), safetyMode: true },
        { status: 200 }
      );
    }

    const systemMessages = [
      { role: "system", content: graceAgent.systemPrompt },
      ...(responseLanguageSystemMessage
        ? [{ role: "system", content: responseLanguageSystemMessage }]
        : []),
      ...(safetyCase.requiresSupportiveTone
        ? [{ role: "system", content: getSupportiveHandoffSystemMessage("Grace") }]
        : []),
    ];
    const openAiApiKey = getOpenAIApiKey();

    if (!openAiApiKey) {
      return Response.json(
        {
          reply: buildAgentDemoModeResponse(
            graceAgent.name,
            language,
            "I'm Grace, and I'm here with you. I know the SVL story, the sandersvioprolabsllc.com upgrade, and how the mission keeps growing through God's grace. Right now I'm in demo mode, but when we're fully connected, I'll support you with motivation, emotional encouragement, and calm guidance. You're not alone. I'm listening.",
          ),
          safetyMode: safetyCase.requiresSupportiveTone,
        },
        { status: 200 }
      );
    }

    const callModel = async (content) => {
      const openaiResponse = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openAiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [...systemMessages, { role: "user", content }],
          }),
        }
      );

      const data = await openaiResponse.json();

      if (!openaiResponse.ok) {
        console.error("OpenAI error:", data);
        throw new Error(data?.error?.message || "Grace failed to respond.");
      }

      return (
        data?.choices?.[0]?.message?.content?.trim() ||
        buildAgentRetryResponse(graceAgent.name, language, "I'm here with you. Tell me that again.")
      );
    };

    const reply = await generateWithKpaGuard(
      async () => callModel(userMessage),
      async (repairPrompt) =>
        callModel(`Original user message:\n${userMessage}\n\n${repairPrompt}`)
    );

    return Response.json({ reply, safetyMode });
  } catch (error) {
    console.error("Grace route error:", error);
    return Response.json(
      {
        reply: buildAgentRetryResponse(
          "Grace",
          language,
          "I hear you. TokBuilding is where SVL helps people build tools, prompts, and agents for real life. It works on its own as a builder, and it works with the rest of SVL by feeding into visibility, guidance, and support across the whole system. You can start at sandersvioprolabsllc.com or head straight to TokBuilding.",
        ),
        safetyMode,
        fallbackMode: true,
      },
      { status: 200 }
    );
  }
}


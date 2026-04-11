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
  let language = "en";
  let safetyMode = false;

  try {
    const body = await req.json();
    userMessage = body?.message?.trim();
    language = getRequestSiteLanguage(req, body);
    const responseLanguageSystemMessage = getResponseLanguageSystemMessage(language);
    const hydroAgent = AGENTS["portable-hydroponic-plant"];

    if (!userMessage) {
      return new Response(
        JSON.stringify({ error: "Message is required." }),
        { status: 400 }
      );
    }

    const safetyCase = detectSupportiveHandoffCase(userMessage);
    safetyMode = safetyCase.requiresSupportiveTone;
    if (safetyCase.requiresEmergencyResponse) {
      return new Response(
        JSON.stringify({
          response: buildSupportiveEmergencyResponse(safetyCase, language),
          safetyMode: true,
        }),
        { status: 200 }
      );
    }

    const openAiApiKey = getOpenAIApiKey();

    if (!openAiApiKey) {
      return new Response(
        JSON.stringify({
          response: buildAgentDemoModeResponse(
            hydroAgent.name,
            language,
            "Let me break that down. I can still help you plan a portable hydroponic grow in demo mode. Start simple: a lightproof reservoir, net cups, an air pump or circulation plan, balanced nutrients, clean water, and an easy first crop like lettuce or basil. If you tell me your space, budget, and the food you want to grow, I'll turn that into a step-by-step build plan."
          ),
          safetyMode,
        }),
        { status: 200 }
      );
    }

    const systemMessages = [
      { role: "system", content: hydroAgent.systemPrompt },
      ...(responseLanguageSystemMessage
        ? [{ role: "system", content: responseLanguageSystemMessage }]
        : []),
      ...(safetyCase.requiresSupportiveTone
        ? [{ role: "system", content: getSupportiveHandoffSystemMessage(hydroAgent.name) }]
        : []),
    ];

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
        console.error("Portable hydroponic route OpenAI error:", data);
        throw new Error("Portable hydroponic plant route failed to respond.");
      }

      return (
        data?.choices?.[0]?.message?.content?.trim() ||
        buildAgentRetryResponse(
          hydroAgent.name,
          language,
          "I hear you. Ask me that one more way and I'll help you turn it into a clear hydroponic next step."
        )
      );
    };

    const response = await generateWithKpaGuard(
      async () => callModel(userMessage),
      async (repairPrompt) =>
        callModel(`Original user message:\n${userMessage}\n\n${repairPrompt}`)
    );

    return new Response(
      JSON.stringify({ response, safetyMode }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Portable hydroponic route error:", error);

    return new Response(
      JSON.stringify({
        response: buildAgentRetryResponse(
          "SVL Portable Hydroponic Plant",
          language,
          "I hear you. A good portable hydroponic build starts with one honest goal, one easy crop, and one clean routine. Tell me what plant you want to grow, what kind of space you have, and whether you're using lights or sunlight, and I'll map the next steps plainly."
        ),
        safetyMode,
        fallbackMode: true,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}

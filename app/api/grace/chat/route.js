<<<<<<< HEAD
﻿import { AGENTS } from "@/lib/lib/lib/agents";
=======
import { AGENTS } from "@/lib/lib/lib/agents";
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
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
  try {
    const body = await req.json();
    userMessage = body?.message?.trim();
    const language = getRequestSiteLanguage(req, body);
    const responseLanguageSystemMessage = getResponseLanguageSystemMessage(language);
    const graceAgent = AGENTS.grace;

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
            graceAgent.name,
            language,
<<<<<<< HEAD
            "I'm Grace, and I'm here with you. I know the SVL story, the sandersvioprolabsllc.com upgrade, and how the mission keeps growing through God's grace. Right now I'm in demo mode, but when we're fully connected, I'll support you with motivation, emotional encouragement, and calm guidance. You're not alone. I'm listening.",
=======
            "I'm Grace, and I'm here with you. I know the SVL story, the sandersvioprolabs.com upgrade, and how the mission keeps growing through God's grace. Right now I'm in demo mode, but when we're fully connected, I'll support you with motivation, emotional encouragement, and calm guidance. You're not alone. I'm listening.",
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
          ),
          safetyMode: safetyCase.requiresSupportiveTone,
        }),
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
        throw new Error("Grace failed to respond.");
      }

      return (
        data?.choices?.[0]?.message?.content?.trim() ||
        buildAgentRetryResponse(graceAgent.name, language, "I'm here with you. Tell me that again.")
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
    console.error("Grace route error:", error);
    return new Response(
      JSON.stringify({
        response: buildAgentRetryResponse(
          "Grace",
          language,
<<<<<<< HEAD
          "I hear you. TokBuilding is the part of SVL that helps people build something real for themselves. It gives people a way to turn ideas into agents, prompts, and useful tools, and the rest of SVL helps those tools get seen, supported, and connected to people who need them. You can start at sandersvioprolabsllc.com or go straight to TokBuilding from there.",
=======
          "I hear you. TokBuilding is the part of SVL that helps people build something real for themselves. It gives people a way to turn ideas into agents, prompts, and useful tools, and the rest of SVL helps those tools get seen, supported, and connected to people who need them. You can start at sandersvioprolabs.com or go straight to TokBuilding from there.",
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
        ),
        safetyMode,
        fallbackMode: true,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}


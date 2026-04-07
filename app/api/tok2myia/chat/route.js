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
  let agentName = "Tok2Myia";
  let safetyMode = false;
  try {
    const body = await req.json();
    userMessage = body?.message?.trim();
    const language = getRequestSiteLanguage(req, body);
    const responseLanguageSystemMessage = getResponseLanguageSystemMessage(language);

    if (!userMessage) {
      return new Response(
        JSON.stringify({
          error: "Message is required",
        }),
        { status: 400 }
      );
    }

    const safetyCase = detectSupportiveHandoffCase(userMessage);
    safetyMode = safetyCase.requiresSupportiveTone;
    if (safetyCase.requiresEmergencyResponse) {
      return new Response(
        JSON.stringify({
          response: buildSupportiveEmergencyResponse(safetyCase, language),
          role: "assistant",
          agentName: "Tok2Myia",
          safetyMode: true,
        }),
        { status: 200 }
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

    const apiKey = getOpenAIApiKey();
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          response: buildAgentDemoModeResponse(
            tok2myia.name,
            language,
            "I'm Tok2Myia, your knowledge guide. I know the SVL story, the sandersvioprolabsllc.com upgrade, and the TokHealth plus TokThru integration too. I'm currently in demo mode. In production, I'll provide intelligent search, knowledge synthesis, research assistance, and decision support - all aligned with the KPA mission to help you stay informed and empowered.",
          ),
          role: "assistant",
          agentName: tok2myia.name,
          safetyMode,
        }),
        { status: 200 }
      );
    }
    agentName = tok2myia.name;

    const systemMessages = [
      {
        role: "system",
        content: tok2myia.systemPrompt,
      },
      ...(responseLanguageSystemMessage
        ? [{ role: "system", content: responseLanguageSystemMessage }]
        : []),
      ...(safetyCase.requiresSupportiveTone
        ? [{ role: "system", content: getSupportiveHandoffSystemMessage("Tok2Myia") }]
        : []),
    ];

    const callModel = async (content) => {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [...systemMessages, { role: "user", content }],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("OpenAI API error:", error);
        throw new Error("Failed to get response from OpenAI");
      }

      const data = await response.json();
      return (
        data?.choices?.[0]?.message?.content?.trim() ||
        buildAgentRetryResponse(tok2myia.name, language, "Oh! I want to help with that. Can you ask me one more time?")
      );
    };

    const assistantMessage = await generateWithKpaGuard(
      async () => callModel(userMessage),
      async (repairPrompt) =>
        callModel(`Original user message:\n${userMessage}\n\n${repairPrompt}`)
    );

    return new Response(
      JSON.stringify({
        response: assistantMessage,
        role: "assistant",
        agentName: tok2myia.name,
        safetyMode,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({
        response: buildAgentRetryResponse(
          agentName,
          language,
          "Oh, let's break that down simply. TokBuilding is SVL's builder space. It helps people make AI agents, prompts, and useful tools for real life. Then other parts of SVL help those tools get seen, supported, and connected to the right people. You can start at sandersvioprolabsllc.com if you want the whole map, or go straight to TokBuilding if you want the builder part.",
        ),
        role: "assistant",
        agentName,
        safetyMode,
        fallbackMode: true,
        details:
          process.env.NODE_ENV === "development" ? error?.message : undefined,
      }),
      { status: 200 }
    );
  }
}


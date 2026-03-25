import OpenAI from "openai";
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
import {
  detectMastermindLessonTrigger,
  findLessonById,
  formatLessonTeaching,
  getAvailableLessonsSummary,
} from "@/lib/outskill-mastermind-lessons";

export async function POST(req) {
  let message = "";
  let safetyMode = false;
  try {
    const body = await req.json();
    message = body?.message?.trim();
    const language = getRequestSiteLanguage(req, body);
    const responseLanguageSystemMessage = getResponseLanguageSystemMessage(language);
    const a1Agent = AGENTS["a1"];

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
          response: buildSupportiveEmergencyResponse(safetyCase, language),
          safetyMode: true,
        }),
        { status: 200 }
      );
    }

    // Check if user is asking for an OutSkill Mastermind lesson
    const lessonTrigger = detectMastermindLessonTrigger(message);
    if (lessonTrigger.triggered) {
      // If specific lesson requested, serve it
      if (lessonTrigger.suggestedLessonIds.length > 0) {
        const lessonId = lessonTrigger.suggestedLessonIds[0]; // Get first match
        const lesson = findLessonById(lessonId);

        if (lesson) {
          return new Response(
            JSON.stringify({
              response: formatLessonTeaching(lesson),
              isMastermindLesson: true,
              lessonId: lesson.id,
              lessonTitle: lesson.title,
              safetyMode: false,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );
        }
      }

      // If no specific lesson matched, offer the full lesson library
      return new Response(
        JSON.stringify({
          response: getAvailableLessonsSummary(),
          isMastermindLessonLibrary: true,
          safetyMode: false,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    const openAiApiKey = getOpenAIApiKey();

    if (!openAiApiKey) {
      return new Response(
        JSON.stringify({
          response: buildAgentDemoModeResponse(
            a1Agent.name,
            language,
            "I'm A1, SVL's strategic intelligence agent. I know the SVL story, the sandersvioprolabs.com upgrade, and the TokHealth plus TokThru integration. I'm currently in demo mode, but in production I'll help you turn that vision into systems, products, and deployable reality.",
          ),
          safetyMode: safetyCase.requiresSupportiveTone,
        }),
        { status: 200 }
      );
    }

    const client = new OpenAI({
      apiKey: openAiApiKey,
    });

    const systemMessages = [
      { role: "system", content: a1Agent.systemPrompt },
      ...(responseLanguageSystemMessage
        ? [{ role: "system", content: responseLanguageSystemMessage }]
        : []),
      ...(safetyCase.requiresSupportiveTone
        ? [{ role: "system", content: getSupportiveHandoffSystemMessage("A1") }]
        : []),
    ];

    const response = await generateWithKpaGuard(
      async () => {
        const completion = await client.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [...systemMessages, { role: "user", content: message }],
        });

        return completion.choices?.[0]?.message?.content?.trim() || buildAgentRetryResponse(a1Agent.name, language, "No response.");
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

        return completion.choices?.[0]?.message?.content?.trim() || buildAgentRetryResponse(a1Agent.name, language, "No response.");
      }
    );

    return new Response(
      JSON.stringify({ response, safetyMode }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("A1 route error:", error);

    return new Response(
      JSON.stringify({
        response: buildAgentRetryResponse(
          "A1",
          language,
          "That's a good question. TokBuilding is SVL's builder lane. It helps people turn ideas into AI agents, prompts, and real tools they can actually use. In the bigger system, TokBuilding helps create what TokSEO helps people find and what the SVL agent hub helps people understand and use. You can start at sandersvioprolabs.com or go straight to TokBuilding to see that lane in action.",
        ),
        safetyMode,
        fallbackMode: true,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}

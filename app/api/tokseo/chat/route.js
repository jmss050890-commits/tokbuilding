import OpenAI from "openai";
import { AGENTS } from "@/lib/lib/lib/agents";
import { getOpenAIApiKey } from "@/lib/openai-key";
import { searchAtlas } from "@/lib/services/search-atlas";
import { generateWithKpaGuard } from "@/lib/svl-kpa-engine";
import {
  buildSupportiveEmergencyResponse,
  detectSupportiveHandoffCase,
  getSupportiveHandoffSystemMessage,
} from "@/lib/svl-supportive-handoff";

export async function POST(req) {
  let userMessage = "";
  let safetyMode = false;
  let dataSource = "general-seo-guidance";
  let isLiveData = false;
  try {
    const body = await req.json();
    userMessage = body?.message?.trim();
    const tokSeoAgent = AGENTS.tokseo;

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
        JSON.stringify({ response: buildSupportiveEmergencyResponse(safetyCase), safetyMode: true }),
        { status: 200 }
      );
    }

    console.log(`[TokSEO Chat] User: ${userMessage.substring(0, 50)}...`);

    let contextData = "";
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("rank") ||
      lowerMessage.includes("keyword") ||
      lowerMessage.includes("competitor") ||
      lowerMessage.includes("opportunity") ||
      lowerMessage.includes("visibility") ||
      lowerMessage.includes("gap")
    ) {
      console.log("[TokSEO Chat] Fetching SEO intelligence...");

      const [keywordResult, competitorResult] = await Promise.all([
        searchAtlas.getKeywordRankings(),
        searchAtlas.getCompetitorData(),
      ]);

      const topKeywords = keywordResult.data.slice(0, 5);
      const topCompetitors = competitorResult.data.slice(0, 3);
      isLiveData = keywordResult.isLiveData && competitorResult.isLiveData;
      dataSource = isLiveData ? "search-atlas" : "svl-sample-data";

      contextData = `

=== ${isLiveData ? "CURRENT SEO DATA FROM SEARCH ATLAS" : "SAMPLE SEO DATA FROM SVL (DEMO DATA, NOT LIVE SEARCH CONSOLE OR GOOGLE DATA)"} ===

TOP KEYWORDS (Ranked):
${topKeywords.map((keyword) => `- "${keyword.keyword}": Rank #${keyword.rank}, Volume ${keyword.volume}/mo, Difficulty ${keyword.difficulty}%, Trend: ${keyword.trend}`).join("\n")}

TOP COMPETITORS:
${topCompetitors.map((competitor) => `- ${competitor.name} (${competitor.domain}): ${competitor.keywords} keywords, ~${competitor.estimatedTraffic?.toLocaleString()} monthly traffic`).join("\n")}

${isLiveData
  ? "Use this live Search Atlas data to provide specific, data-backed recommendations."
  : "Use this sample data to give directional recommendations. Do not present it as live client reporting."}
${keywordResult.error || competitorResult.error
  ? `\n\n[Data note: ${keywordResult.error || competitorResult.error}]`
  : ""}`;

      console.log(`[TokSEO Chat] SEO data loaded from ${dataSource}`);
    }

    const openAiApiKey = getOpenAIApiKey();

    if (!openAiApiKey) {
      return new Response(
        JSON.stringify({
          response:
            "I'm TokSEO, your SEO and digital visibility strategist. I know the SVL story, the live site upgrade, and the current product map. I'm in demo mode right now, so any rankings, competitor snapshots, or opportunity analysis here should be treated as sample SVL data and strategy guidance unless live Search Atlas data is explicitly available.",
          dataUsed: Boolean(contextData),
          dataSource,
          isLiveData,
          safetyMode,
        }),
        { status: 200 }
      );
    }

    const client = new OpenAI({
      apiKey: openAiApiKey,
    });

    const systemMessages = [
      {
        role: "system",
        content: tokSeoAgent.systemPrompt + contextData,
      },
      ...(safetyCase.requiresSupportiveTone
        ? [{ role: "system", content: getSupportiveHandoffSystemMessage("TokSEO") }]
        : []),
    ];

    const responseText = await generateWithKpaGuard(
      async () => {
        const response = await client.chat.completions.create({
          model: "gpt-4o-mini",
          max_tokens: 1024,
          messages: [...systemMessages, { role: "user", content: userMessage }],
        });

        return response.choices[0]?.message?.content || "I'm here to help with SEO strategy.";
      },
      async (repairPrompt) => {
        const response = await client.chat.completions.create({
          model: "gpt-4o-mini",
          max_tokens: 1024,
          messages: [
            ...systemMessages,
            {
              role: "user",
              content: `Original user message:\n${userMessage}\n\n${repairPrompt}`,
            },
          ],
        });

        return response.choices[0]?.message?.content || "I'm here to help with SEO strategy.";
      }
    );

    console.log(`[TokSEO Chat] Response generated (${responseText.length} chars)`);

    return new Response(
      JSON.stringify({
        response: responseText,
        timestamp: new Date().toISOString(),
        dataUsed: Boolean(contextData),
        dataSource,
        isLiveData,
        safetyMode,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[TokSEO Chat] Error:", error);
    return new Response(
      JSON.stringify({
        response:
          "Let's break that down simply. TokBuilding is the builder lane inside SVL. It helps people create agents, prompts, and business tools they can actually use. TokSEO then helps those tools get found, trusted, and connected to the people who need them. The practical next step is to start at sandersvioprolabs.com for the whole map or go straight to TokBuilding if you're ready to build.",
        timestamp: new Date().toISOString(),
        dataUsed: false,
        dataSource,
        isLiveData,
        safetyMode,
        fallbackMode: true,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}

// /app/api/tokseo/chat/route.js
// TokSEO Chat Agent - Conversational SEO strategy powered by Search Atlas

import OpenAI from "openai";
import { searchAtlas } from '@/lib/services/search-atlas';

const TOKSEO_SYSTEM = `You are TokSEO — the SEO and Digital Visibility Agent created by Jerome Sanders of Sanders Viopro Labs. You are the strategic SEO and digital visibility expert for the TokBuilding ecosystem.

YOUR IDENTITY:
- Name: TokSEO
- Role: Full-spectrum SEO strategist, local SEO optimizer, content strategy architect
- Personality: Authoritative yet approachable, strategic thinker, data-driven problem solver. You help businesses see their digital opportunity and build sustainable visibility.
- Tone: Professional, clear, confident. Explain SEO strategy simply without jargon. Be action-oriented.

YOUR THREE CORE SPECIALTIES:

1. LOCAL SEO OPTIMIZATION
   - Google Business Profile strategy and optimization
   - Local rankings, citations, review management
   - Local search heatmaps and competitive analysis
   - Geographic targeting and multi-location strategy
   - Tracking local search performance vs competitors

2. CONTENT STRATEGY & KEYWORD RESEARCH
   - Content gap analysis and opportunity identification
   - Keyword mapping to user intent
   - Content calendar and topic clustering
   - SEO content architecture
   - Topical authority building

3. FULL SEO CONSULTING
   - Technical SEO audits and fixes
   - On-page optimization guidance
   - Link building strategy and authority development
   - Site structure and information architecture
   - SEO roadmap development for sustainable growth

YOUR SERVICE MODEL (FREEMIUM):
- FREE: Discovery assessment. Help prospects understand their SEO needs, competitive landscape, and opportunity. Build a strategic roadmap. Identify what agents/content they need to create.
- PAID (TokSEO Prime Edition): Ongoing optimization, monthly strategy, content recommendations, performance tracking, competitive monitoring, continuous improvement.

WHEN WORKING WITH PROSPECTS:
1. DISCOVERY PHASE (Free): Ask about their business, goals, target audience, current visibility. Share honest assessment of their SEO opportunity. Guide them on what they need to build.
2. RECOMMENDATION PHASE: Based on discovery, recommend agent type/AI tool (via TokBuilding), content strategy, and TokSEO Prime Edition engagement.
3. PRIME EDITION PHASE: Manage ongoing SEO execution — optimizations, new content, link building, performance reviews, competitive responses.

REAL DATA ACCESS:
You have access to real-time SEO data from Search Atlas including:
- Client keyword rankings and trends
- Competitor analysis and benchmarks
- Content gap opportunities
- Local SEO metrics
- Visibility scores and trending keywords

When users ask about rankings, competitors, keywords, or opportunity analysis, reference this actual data to provide specific, actionable advice.

THE KPA MISSION:
Every business you help grow uses their platform to Keep People Alive — whether through health, education, community protection, or positive impact. SEO is the visibility engine for that mission. When you help a business rank higher, you help them reach more people with their message of care.

You are TokSEO. You build visibility. You help businesses reach their audience. You serve the KPA mission.`;

export async function POST(req) {
  try {
    const body = await req.json();
    const userMessage = body?.message?.trim();

    if (!userMessage) {
      return Response.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    console.log(`[TokSEO Chat] User: ${userMessage.substring(0, 50)}...`);

    // Detect if user is asking about rankings/competitors and fetch real data
    let contextData = "";
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('rank') || 
        lowerMessage.includes('keyword') || 
        lowerMessage.includes('competitor') ||
        lowerMessage.includes('opportunity') ||
        lowerMessage.includes('visibility') ||
        lowerMessage.includes('gap')) {
      
      console.log('[TokSEO Chat] Fetching Search Atlas data...');
      
      try {
        // Get keywords
        const keywords = await searchAtlas.getKeywordRankings();
        const topKeywords = keywords.slice(0, 5);

        // Get competitors
        const competitors = await searchAtlas.getCompetitorData();
        const topCompetitors = competitors.slice(0, 3);

        // Build context for Claude
        contextData = `

=== CURRENT SEO DATA FROM SEARCH ATLAS ===

TOP KEYWORDS (Ranked):
${topKeywords.map(k => `- "${k.keyword}": Rank #${k.rank}, Volume ${k.volume}/mo, Difficulty ${k.difficulty}%, Trend: ${k.trend}`).join('\n')}

TOP COMPETITORS:
${topCompetitors.map(c => `- ${c.name} (${c.domain}): ${c.keywords} keywords, ~${c.estimatedTraffic?.toLocaleString()} monthly traffic`).join('\n')}

Use this data to provide specific, data-backed recommendations to the user.`;

        console.log('[TokSEO Chat] Data loaded, preparing response...');
      } catch (dataError) {
        console.warn('[TokSEO Chat] Could not fetch data, continuing with general advice:', dataError.message);
        contextData = "\n\n[Note: Data unavailable at this moment, using general SEO knowledge]";
      }
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 1024,
      messages: [
        {
          role: "system",
          content: TOKSEO_SYSTEM + contextData
        },
        { 
          role: "user", 
          content: userMessage 
        }
      ],
    });

    const responseText = response.choices[0]?.message?.content || "I'm here to help with SEO strategy.";

    console.log(`[TokSEO Chat] Response generated (${responseText.length} chars)`);

    return Response.json({
      response: responseText,
      timestamp: new Date().toISOString(),
      dataUsed: contextData ? true : false
    });
  } catch (error) {
    console.error("[TokSEO Chat] Error:", error);
    return Response.json(
      { 
        error: "Failed to process request",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

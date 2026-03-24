// /app/api/tokseo/data/route.js
// TokSEO Data Endpoint - Search Atlas when configured, sample SVL data as fallback

import { searchAtlas } from "@/lib/services/search-atlas";

function getErrorMessage(error) {
  return error instanceof Error ? error.message : "Unknown error";
}

/**
 * GET /api/tokseo/data?type=keywords|competitors|gaps|analysis
 * Returns live Search Atlas data when configured, otherwise sample SVL data
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const dataType = searchParams.get("type") || "keywords";
    const domain = searchParams.get("domain");
    const useCase = searchParams.get("useCase") || "health";

    console.log(`[TokSEO API] Request: type=${dataType}, domain=${domain}`);

    let result;

    switch (dataType) {
      case "keywords":
        result = await searchAtlas.getKeywordRankings();
        break;
      case "competitors":
        result = await searchAtlas.getCompetitorData();
        break;
      case "gaps":
        result = await searchAtlas.getContentGaps();
        break;
      case "analysis":
        if (!domain) {
          return Response.json(
            { error: "domain parameter required for analysis" },
            { status: 400 }
          );
        }
        result = await searchAtlas.analyzeDomain(domain, useCase);
        break;
      default:
        return Response.json(
          { error: `Unknown data type: ${dataType}` },
          { status: 400 }
        );
    }

    return Response.json({
      success: !result.error,
      dataType,
      data: result.data,
      error: result.error || null,
      dataSource: result.dataSource,
      isLiveData: result.isLiveData,
      timestamp: new Date().toISOString(),
      cacheControl: "max-age=86400",
    });
  } catch (error) {
    console.error("[TokSEO API] Route error:", error);
    return Response.json(
      {
        success: false,
        error: getErrorMessage(error),
        dataType: "error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/tokseo/data
 * Allows TokSEO to request multiple data types at once
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const { types, domain, useCase } = body;

    if (!types || !Array.isArray(types)) {
      return Response.json(
        { error: "types array is required" },
        { status: 400 }
      );
    }

    const results = {};
    const meta = [];

    for (const type of types) {
      try {
        switch (type) {
          case "keywords":
            results.keywords = await searchAtlas.getKeywordRankings();
            meta.push(results.keywords);
            break;
          case "competitors":
            results.competitors = await searchAtlas.getCompetitorData();
            meta.push(results.competitors);
            break;
          case "gaps":
            results.gaps = await searchAtlas.getContentGaps();
            meta.push(results.gaps);
            break;
          case "analysis":
            if (domain) {
              results.analysis = await searchAtlas.analyzeDomain(domain, useCase);
              meta.push(results.analysis);
            }
            break;
          default:
            results[type] = { error: `Unknown data type: ${type}` };
        }
      } catch (error) {
        results[type] = { error: getErrorMessage(error) };
      }
    }

    const allLive = meta.length > 0 && meta.every((entry) => entry.isLiveData);

    return Response.json({
      success: true,
      data: results,
      dataSource: allLive ? "search-atlas" : "svl-sample-data",
      isLiveData: allLive,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[TokSEO API] Route error:", error);
    return Response.json(
      { error: getErrorMessage(error) },
      { status: 500 }
    );
  }
}

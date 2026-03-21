// /app/api/tokseo/data/route.js
// TokSEO Data Endpoint - Real-time Search Atlas integration

import { searchAtlas } from '@/lib/services/search-atlas';

/**
 * GET /api/tokseo/data?type=keywords|competitors|gaps|analysis
 * Returns real-time SEO data from Search Atlas
 * Used by TokSEO chat and dashboard
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const dataType = searchParams.get('type') || 'keywords';
    const domain = searchParams.get('domain'); // for analysis endpoint
    const useCase = searchParams.get('useCase') || 'health'; // for analysis endpoint

    console.log(`[TokSEO API] Request: type=${dataType}, domain=${domain}`);

    let data;
    let error = null;

    try {
      switch (dataType) {
        case 'keywords':
          data = await searchAtlas.getKeywordRankings();
          break;

        case 'competitors':
          data = await searchAtlas.getCompetitorData();
          break;

        case 'gaps':
          data = await searchAtlas.getContentGaps();
          break;

        case 'analysis':
          if (!domain) {
            return Response.json(
              { error: 'domain parameter required for analysis' },
              { status: 400 }
            );
          }
          data = await searchAtlas.analyzeDomain(domain, useCase);
          break;

        default:
          return Response.json(
            { error: `Unknown data type: ${dataType}` },
            { status: 400 }
          );
      }
    } catch (apiError) {
      console.error(`[TokSEO API] Search Atlas error:`, apiError);
      error = apiError.message;
      // Return fallback data or error response
      data = null;
    }

    return Response.json({
      success: !error,
      dataType,
      data,
      error,
      timestamp: new Date().toISOString(),
      cacheControl: 'max-age=86400' // 24 hour cache
    });
  } catch (error) {
    console.error('[TokSEO API] Route error:', error);
    return Response.json(
      { 
        success: false,
        error: error.message,
        dataType: 'error'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/tokseo/data (future endpoint for bulk operations)
 * Allows TokSEO to request multiple data types at once
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const { types, domain, useCase } = body;

    if (!types || !Array.isArray(types)) {
      return Response.json(
        { error: 'types array is required' },
        { status: 400 }
      );
    }

    const results = {};

    for (const type of types) {
      try {
        switch (type) {
          case 'keywords':
            results.keywords = await searchAtlas.getKeywordRankings();
            break;
          case 'competitors':
            results.competitors = await searchAtlas.getCompetitorData();
            break;
          case 'gaps':
            results.gaps = await searchAtlas.getContentGaps();
            break;
          case 'analysis':
            if (domain) {
              results.analysis = await searchAtlas.analyzeDomain(domain, useCase);
            }
            break;
        }
      } catch (e) {
        results[type] = { error: e.message };
      }
    }

    return Response.json({
      success: true,
      data: results,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('[TokSEO API] Route error:', error);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

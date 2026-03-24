import { svlSeoData, type AnalysisResult, type CompetitorData, type KeywordData } from '@/lib/services/svl-seo-data';

export type SeoDataSource = 'search-atlas' | 'svl-sample-data';

export type SeoDataResult<T> = {
  data: T;
  dataSource: SeoDataSource;
  isLiveData: boolean;
  error?: string;
};

type ContentGap = Awaited<ReturnType<typeof svlSeoData.getContentGaps>>[number];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getString(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

function getNumber(value: unknown, fallback = 0) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function getStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((entry): entry is string => typeof entry === 'string') : [];
}

class SearchAtlasService {
  private readonly apiKey = process.env.SEARCH_ATLAS_API_KEY;
  private readonly accountId = process.env.SEARCH_ATLAS_ACCOUNT_ID;
  private readonly vaultId = process.env.SEARCH_ATLAS_BRAND_VAULT_ID;
  private readonly baseUrl = process.env.SEARCH_ATLAS_BASE_URL || 'https://api.searchatlas.com';

  private get isConfigured() {
    return Boolean(this.apiKey && this.accountId && this.vaultId);
  }

  private async requestJson(path: string) {
    if (!this.isConfigured) {
      throw new Error('Search Atlas is not configured');
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'TokSEO/1.0',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Search Atlas request failed with status ${response.status}`);
    }

    return response.json() as Promise<unknown>;
  }

  private async withFallback<T>(
    loadLive: () => Promise<T>,
    loadFallback: () => Promise<T>,
  ): Promise<SeoDataResult<T>> {
    if (!this.isConfigured) {
      return {
        data: await loadFallback(),
        dataSource: 'svl-sample-data',
        isLiveData: false,
        error: 'Search Atlas is not configured',
      };
    }

    try {
      return {
        data: await loadLive(),
        dataSource: 'search-atlas',
        isLiveData: true,
      };
    } catch (error) {
      return {
        data: await loadFallback(),
        dataSource: 'svl-sample-data',
        isLiveData: false,
        error: error instanceof Error ? error.message : 'Search Atlas request failed',
      };
    }
  }

  async getKeywordRankings(): Promise<SeoDataResult<KeywordData[]>> {
    return this.withFallback(async () => {
      const payload = await this.requestJson(
        `/api/v1/accounts/${this.accountId}/brand-vaults/${this.vaultId}/keywords`,
      );

      const keywordList = isRecord(payload) && Array.isArray(payload.keywords)
        ? payload.keywords
        : Array.isArray(payload)
          ? payload
          : [];

      return keywordList
        .filter(isRecord)
        .map((entry) => ({
          keyword: getString(entry.keyword || entry.term),
          rank: getNumber(entry.rank_position ?? entry.rank),
          volume: getNumber(entry.monthly_volume ?? entry.volume),
          difficulty: getNumber(entry.keyword_difficulty ?? entry.difficulty),
          change: getNumber(entry.rank_change ?? entry.change),
          trend: getString(entry.trend_direction ?? entry.trend, 'stable'),
        }))
        .filter((entry) => entry.keyword);
    }, () => svlSeoData.getKeywordRankings());
  }

  async getCompetitorData(): Promise<SeoDataResult<CompetitorData[]>> {
    return this.withFallback(async () => {
      const payload = await this.requestJson(
        `/api/v1/accounts/${this.accountId}/brand-vaults/${this.vaultId}/competitors`,
      );

      const competitorList = isRecord(payload) && Array.isArray(payload.competitors)
        ? payload.competitors
        : Array.isArray(payload)
          ? payload
          : [];

      return competitorList
        .filter(isRecord)
        .map((entry) => ({
          name: getString(entry.name || entry.domain, 'Competitor'),
          domain: getString(entry.domain),
          keywords: getNumber(entry.keyword_count ?? entry.keywords),
          topKeywords: getStringArray(entry.top_keywords).slice(0, 3),
          estimatedTraffic: getNumber(entry.estimated_traffic ?? entry.estimatedTraffic),
        }))
        .filter((entry) => entry.domain);
    }, () => svlSeoData.getCompetitorData());
  }

  async getContentGaps(): Promise<SeoDataResult<ContentGap[]>> {
    return this.withFallback(async () => {
      const payload = await this.requestJson(
        `/api/v1/accounts/${this.accountId}/brand-vaults/${this.vaultId}/gaps`,
      );

      const gapList = isRecord(payload) && Array.isArray(payload.gaps)
        ? payload.gaps
        : Array.isArray(payload)
          ? payload
          : [];

      return gapList
        .filter(isRecord)
        .map((entry) => ({
          keyword: getString(entry.keyword || entry.term),
          volume: getNumber(entry.monthly_volume ?? entry.volume),
          opportunity: getString(entry.opportunity_level ?? entry.opportunity, 'unknown'),
        }))
        .filter((entry) => entry.keyword);
    }, () => svlSeoData.getContentGaps());
  }

  async analyzeDomain(domain: string, useCase: string): Promise<SeoDataResult<AnalysisResult>> {
    return this.withFallback(async () => {
      const [keywords, competitors, gaps] = await Promise.all([
        this.getKeywordRankings(),
        this.getCompetitorData(),
        this.getContentGaps(),
      ]);

      const visibility = Math.max(
        0,
        Math.round(
          keywords.data.slice(0, 10).reduce((score, keyword) => score + Math.max(0, 101 - keyword.rank), 0) /
            Math.max(keywords.data.slice(0, 10).length, 1),
        ),
      );

      return {
        domain,
        visibility,
        gap: Math.max(0, 100 - visibility),
        opportunities: gaps.data.slice(0, 3).map((entry) => entry.keyword || `${useCase} seo strategy`),
        competitors: competitors.data.slice(0, 3).map((entry) => entry.domain),
      };
    }, () => svlSeoData.analyzeDomain(domain, useCase));
  }
}

export const searchAtlas = new SearchAtlasService();

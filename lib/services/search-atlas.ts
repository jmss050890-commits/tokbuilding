// /lib/services/search-atlas.ts
// Search Atlas API Service - Powered by your Brand Vault

import axios, { AxiosInstance } from 'axios';

interface KeywordData {
  keyword: string;
  rank: number;
  volume: number;
  difficulty: number;
  change: number;
  trend: string;
}

interface CompetitorData {
  name: string;
  domain: string;
  keywords: number;
  topKeywords: string[];
  estimatedTraffic: number;
}

interface AnalysisResult {
  domain: string;
  visibility: number;
  gap: number;
  opportunities: string[];
  competitors: string[];
}

class SearchAtlasService {
  private client: AxiosInstance;
  private vaultId: string;

  constructor() {
    const apiKey = process.env.SEARCH_ATLAS_API_KEY;
    const baseUrl = process.env.SEARCH_ATLAS_BASE_URL || 'https://api.searchatlas.com/v1';
    this.vaultId = process.env.SEARCH_ATLAS_BRAND_VAULT_ID || '';

    if (!apiKey) {
      console.warn('⚠️ SEARCH_ATLAS_API_KEY not set - Search Atlas features disabled');
    }

    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
  }

  /**
   * Get current keyword rankings from Search Atlas
   * Used by TokSEO to show client's SEO performance
   */
  async getKeywordRankings(): Promise<KeywordData[]> {
    try {
      console.log('[SearchAtlas] Fetching keyword rankings...');
      const response = await this.client.get('/keywords', {
        params: {
          vault_id: this.vaultId,
          limit: 50,
          sort_by: 'rank'
        }
      });

      // Parse API response into standardized format
      return response.data.keywords?.map((k: any) => ({
        keyword: k.keyword,
        rank: k.rank_position,
        volume: k.monthly_volume,
        difficulty: k.keyword_difficulty,
        change: k.rank_change,
        trend: k.trend_direction
      })) || [];
    } catch (error) {
      console.error('[SearchAtlas] Error fetching keywords:', error);
      return this.getMockKeywordData(); // Fallback for demo
    }
  }

  /**
   * Get competitor analysis data
   * Used by TokSEO to provide competitive insights
   */
  async getCompetitorData(): Promise<CompetitorData[]> {
    try {
      console.log('[SearchAtlas] Fetching competitor data...');
      const response = await this.client.get('/competitors', {
        params: {
          vault_id: this.vaultId,
          limit: 8
        }
      });

      return response.data.competitors?.map((c: any) => ({
        name: c.domain.split('.')[0].charAt(0).toUpperCase() + c.domain.split('.')[0].slice(1),
        domain: c.domain,
        keywords: c.keyword_count,
        topKeywords: c.top_keywords?.slice(0, 3) || [],
        estimatedTraffic: c.estimated_traffic
      })) || [];
    } catch (error) {
      console.error('[SearchAtlas] Error fetching competitors:', error);
      return this.getMockCompetitorData(); // Fallback for demo
    }
  }

  /**
   * Analyze a client's domain against benchmarks
   * Used by TokSEO to assess SEO need and opportunity
   */
  async analyzeDomain(domain: string, useCase: string): Promise<AnalysisResult> {
    try {
      console.log(`[SearchAtlas] Analyzing domain: ${domain}`);
      const response = await this.client.post('/analysis', {
        domain,
        vault_id: this.vaultId,
        use_case: useCase
      });

      const data = response.data;
      return {
        domain,
        visibility: data.visibility_score || 0,
        gap: 100 - (data.visibility_score || 0),
        opportunities: data.opportunity_keywords?.slice(0, 5) || [],
        competitors: data.competing_domains?.slice(0, 3) || []
      };
    } catch (error) {
      console.error('[SearchAtlas] Error analyzing domain:', error);
      return {
        domain,
        visibility: 0,
        gap: 100,
        opportunities: ['Health crisis support', 'Mental health platform', 'Wellness coaching'],
        competitors: ['calm.com', 'betterhelp.com', 'headspace.com']
      };
    }
  }

  /**
   * Get content gap analysis
   * Used by TokSEO to recommend what content to create
   */
  async getContentGaps(): Promise<{ keyword: string; volume: number; opportunity: string }[]> {
    try {
      console.log('[SearchAtlas] Fetching content gaps...');
      const response = await this.client.get('/gaps', {
        params: {
          vault_id: this.vaultId,
          limit: 20
        }
      });

      return response.data.gaps?.map((gap: any) => ({
        keyword: gap.keyword,
        volume: gap.monthly_volume,
        opportunity: gap.opportunity_level
      })) || [];
    } catch (error) {
      console.error('[SearchAtlas] Error fetching gaps:', error);
      return [];
    }
  }

  /**
   * Mock data for demo/testing (returns same structure as real API)
   * Removed once Brand Vault is set up
   */
  private getMockKeywordData(): KeywordData[] {
    return [
      { keyword: 'crisis support app', rank: 12, volume: 1200, difficulty: 45, change: -2, trend: 'stable' },
      { keyword: 'mental health coaching', rank: 8, volume: 890, difficulty: 38, change: 1, trend: 'up' },
      { keyword: 'wellness platform', rank: 25, volume: 650, difficulty: 52, change: -3, trend: 'down' },
      { keyword: 'AI health coach', rank: 31, volume: 420, difficulty: 35, change: 2, trend: 'up' },
      { keyword: 'emergency mental health', rank: 6, volume: 780, difficulty: 41, change: 0, trend: 'stable' }
    ];
  }

  private getMockCompetitorData(): CompetitorData[] {
    return [
      { name: 'Calm', domain: 'calm.com', keywords: 2340, topKeywords: ['meditation app', 'sleep app', 'stress relief'], estimatedTraffic: 5000000 },
      { name: 'Headspace', domain: 'headspace.com', keywords: 1890, topKeywords: ['meditation', 'mental health', 'anxiety'], estimatedTraffic: 3200000 },
      { name: 'BetterHelp', domain: 'betterhelp.com', keywords: 1650, topKeywords: ['online therapy', 'therapist', 'counseling'], estimatedTraffic: 2800000 }
    ];
  }
}

// Export singleton instance
export const searchAtlas = new SearchAtlasService();

// Export types for Client
export type { KeywordData, CompetitorData, AnalysisResult };

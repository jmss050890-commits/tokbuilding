export interface KeywordData {
  keyword: string;
  rank: number;
  volume: number;
  difficulty: number;
  change: number;
  trend: string;
}

export interface CompetitorData {
  name: string;
  domain: string;
  keywords: number;
  topKeywords: string[];
  estimatedTraffic: number;
}

export interface AnalysisResult {
  domain: string;
  visibility: number;
  gap: number;
  opportunities: string[];
  competitors: string[];
}

const KEYWORDS: KeywordData[] = [
  { keyword: "crisis support app", rank: 12, volume: 1200, difficulty: 45, change: -2, trend: "stable" },
  { keyword: "mental health coaching", rank: 8, volume: 890, difficulty: 38, change: 1, trend: "up" },
  { keyword: "wellness platform", rank: 25, volume: 650, difficulty: 52, change: -3, trend: "down" },
  { keyword: "ai health coach", rank: 31, volume: 420, difficulty: 35, change: 2, trend: "up" },
  { keyword: "emergency mental health", rank: 6, volume: 780, difficulty: 41, change: 0, trend: "stable" },
];

const COMPETITORS: CompetitorData[] = [
  { name: "Calm", domain: "calm.com", keywords: 2340, topKeywords: ["meditation app", "sleep app", "stress relief"], estimatedTraffic: 5000000 },
  { name: "Headspace", domain: "headspace.com", keywords: 1890, topKeywords: ["meditation", "mental health", "anxiety"], estimatedTraffic: 3200000 },
  { name: "BetterHelp", domain: "betterhelp.com", keywords: 1650, topKeywords: ["online therapy", "therapist", "counseling"], estimatedTraffic: 2800000 },
];

const CONTENT_GAPS = [
  { keyword: "crisis response plan", volume: 540, opportunity: "high" },
  { keyword: "family safety app", volume: 320, opportunity: "medium" },
  { keyword: "wellness accountability system", volume: 170, opportunity: "high" },
];

class SvlSeoDataService {
  readonly source = "svl-sample-data";
  readonly isLiveData = false;

  async getKeywordRankings() {
    return KEYWORDS;
  }

  async getCompetitorData() {
    return COMPETITORS;
  }

  async getContentGaps() {
    return CONTENT_GAPS;
  }

  async analyzeDomain(domain: string, useCase: string): Promise<AnalysisResult> {
    const normalizedUseCase = useCase || "health";
    return {
      domain,
      visibility: 34,
      gap: 66,
      opportunities: [
        `${normalizedUseCase} seo strategy`,
        `${normalizedUseCase} local visibility`,
        `${normalizedUseCase} content authority`,
      ],
      competitors: COMPETITORS.slice(0, 3).map((competitor) => competitor.domain),
    };
  }
}

export const svlSeoData = new SvlSeoDataService();

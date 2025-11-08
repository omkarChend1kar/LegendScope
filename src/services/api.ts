import axios from 'axios';
import type { AxiosInstance, AxiosError } from 'axios';
import type { 
  Player, 
  Match, 
  PlayerInsights, 
  ProgressData, 
  YearEndSummary,
  ApiResponse,
  PaginatedResponse,
  Region,
  LeagueEntry,
  TimeFrame,
  Tier,
  Rank,
} from '../types';

interface RiotLeagueEntry {
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins?: number;
  losses?: number;
}

const isAxiosError = (error: unknown): error is AxiosError =>
  typeof error === 'object' && error !== null && (error as AxiosError).isAxiosError === true;

const resolveErrorMessage = (error: unknown, fallback: string): string => {
  if (isAxiosError(error)) {
    const statusMessage = (
      error.response?.data as { status?: { message?: string } } | undefined
    )?.status?.message;
    if (typeof statusMessage === 'string' && statusMessage.trim().length > 0) {
      return statusMessage;
    }
    if (typeof error.message === 'string' && error.message.trim().length > 0) {
      return error.message;
    }
  }

  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  if (typeof error === 'string' && error.trim().length > 0) {
    return error;
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === 'string' && message.trim().length > 0) {
      return message;
    }
  }

  return fallback;
};

class RiotAPIService {
  private api: AxiosInstance;
  private apiKey: string;
  private baseUrls: Record<Region, string> = {
    na1: 'https://na1.api.riotgames.com',
    euw1: 'https://euw1.api.riotgames.com',
    eun1: 'https://eun1.api.riotgames.com',
    kr: 'https://kr.api.riotgames.com',
    br1: 'https://br1.api.riotgames.com',
    la1: 'https://la1.api.riotgames.com',
    la2: 'https://la2.api.riotgames.com',
    oc1: 'https://oc1.api.riotgames.com',
    ru: 'https://ru.api.riotgames.com',
    tr1: 'https://tr1.api.riotgames.com',
    jp1: 'https://jp1.api.riotgames.com',
  };

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.api = axios.create({
      timeout: 10000,
      headers: {
        'X-Riot-Token': this.apiKey,
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        console.log(`Making API request to: ${config.url}`);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 429) {
          console.warn('Rate limit exceeded. Please wait before making more requests.');
        }
        return Promise.reject(error);
      }
    );
  }

  private getBaseUrl(region: Region): string {
    return this.baseUrls[region];
  }

  // Player methods
  async getPlayerByName(summonerName: string, region: Region): Promise<ApiResponse<Player>> {
    try {
      const baseUrl = this.getBaseUrl(region);
      const response = await this.api.get(
        `${baseUrl}/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}`
      );

      const player: Player = {
        id: response.data.id,
        summonerName: response.data.name,
        puuid: response.data.puuid,
        profileIconId: response.data.profileIconId,
        summonerLevel: response.data.summonerLevel,
        region,
      };

      return {
        success: true,
        data: player,
        timestamp: Date.now(),
      };
    } catch (error: unknown) {
      return {
        success: false,
        data: {} as Player,
        error: resolveErrorMessage(error, 'Failed to fetch player data'),
        timestamp: Date.now(),
      };
    }
  }

  async getPlayerRank(summonerId: string, region: Region): Promise<ApiResponse<LeagueEntry[]>> {
    try {
      const baseUrl = this.getBaseUrl(region);
      const response = await this.api.get(
        `${baseUrl}/lol/league/v4/entries/by-summoner/${summonerId}`
      );

      return {
        success: true,
        data: (response.data as RiotLeagueEntry[]).map((entry) => ({
          queueType: entry.queueType,
          tier: entry.tier as Tier,
          rank: entry.rank as Rank,
          leaguePoints: entry.leaguePoints,
          wins: entry.wins,
          losses: entry.losses,
        })),
        timestamp: Date.now(),
      };
    } catch (error: unknown) {
      return {
        success: false,
        data: [],
        error: resolveErrorMessage(error, 'Failed to fetch rank data'),
        timestamp: Date.now(),
      };
    }
  }

  // Match methods
  async getMatchHistory(
    puuid: string, 
    region: Region, 
    count = 20, 
    start = 0
  ): Promise<PaginatedResponse<string>> {
    try {
      const regionalUrl = this.getRegionalUrl(region);
      const response = await this.api.get(
        `${regionalUrl}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}`
      );

      return {
        success: true,
        data: response.data,
        pagination: {
          page: Math.floor(start / count) + 1,
          limit: count,
          total: response.data.length,
          hasMore: response.data.length === count,
        },
      };
    } catch (error: unknown) {
      return {
        success: false,
        data: [],
        pagination: {
          page: 1,
          limit: count,
          total: 0,
          hasMore: false,
        },
        error: resolveErrorMessage(error, 'Failed to fetch match history'),
      };
    }
  }

  async getMatchDetails(matchId: string, region: Region): Promise<ApiResponse<Match>> {
    try {
      const regionalUrl = this.getRegionalUrl(region);
      const response = await this.api.get(`${regionalUrl}/lol/match/v5/matches/${matchId}`);

      return {
        success: true,
        data: response.data,
        timestamp: Date.now(),
      };
    } catch (error: unknown) {
      return {
        success: false,
        data: {} as Match,
        error: resolveErrorMessage(error, 'Failed to fetch match details'),
        timestamp: Date.now(),
      };
    }
  }

  private getRegionalUrl(region: Region): string {
    const regionalMapping: Record<Region, string> = {
      na1: 'https://americas.api.riotgames.com',
      br1: 'https://americas.api.riotgames.com',
      la1: 'https://americas.api.riotgames.com',
      la2: 'https://americas.api.riotgames.com',
      oc1: 'https://sea.api.riotgames.com',
      euw1: 'https://europe.api.riotgames.com',
      eun1: 'https://europe.api.riotgames.com',
      tr1: 'https://europe.api.riotgames.com',
      ru: 'https://europe.api.riotgames.com',
      kr: 'https://asia.api.riotgames.com',
      jp1: 'https://asia.api.riotgames.com',
    };
    
    return regionalMapping[region];
  }
}

// Mock Analytics Service (since we don't have access to internal Riot analytics)
class AnalyticsService {
  // This would typically connect to a backend service that analyzes match data
  async generatePlayerInsights(puuid: string, matches: Match[]): Promise<ApiResponse<PlayerInsights>> {
    try {
      const analyzedMatches = matches.length;

      // Mock implementation - in a real app, this would be a sophisticated analysis
      const insights: PlayerInsights = {
        playerId: puuid,
        strengths: [
          {
            category: 'mechanical',
            description: 'Excellent CS per minute in laning phase',
            score: 85,
            evidence: [
              'Averages 7.2 CS/min across last 20 games',
              `Analyzed ${analyzedMatches} recent matches`,
            ],
            trend: 'improving',
          },
          {
            category: 'teamwork',
            description: 'Strong team fighting presence',
            score: 78,
            evidence: ['High kill participation in team fights'],
            trend: 'stable',
          },
        ],
        weaknesses: [
          {
            category: 'strategic',
            description: 'Ward placement could be improved',
            severity: 'medium',
            suggestions: ['Place more wards in enemy jungle', 'Focus on vision control before objectives'],
            trend: 'improving',
          },
        ],
        preferredRoles: [
          {
            role: 'adc',
            preference: 85,
            winRate: 0.62,
            gamesPlayed: 15,
            averagePerformance: 80,
          },
        ],
        championMastery: [],
        playstyle: {
          aggressive: 75,
          supportive: 45,
          strategic: 60,
          mechanical: 80,
          teamFight: 70,
          splitPush: 30,
          vision: 40,
          objective: 65,
        },
        lastUpdated: Date.now(),
      };

      return {
        success: true,
        data: insights,
        timestamp: Date.now(),
      };
    } catch (error: unknown) {
      return {
        success: false,
        data: {} as PlayerInsights,
        error: resolveErrorMessage(error, 'Failed to generate player insights'),
        timestamp: Date.now(),
      };
    }
  }

  async generateProgressData(puuid: string, timeframe: TimeFrame): Promise<ApiResponse<ProgressData>> {
    try {
      // Mock progress data
      const progressData: ProgressData = {
        playerId: puuid,
        timeframe,
        rankProgress: [],
        skillProgress: [],
        championProgress: [],
      };

      return {
        success: true,
        data: progressData,
        timestamp: Date.now(),
      };
    } catch (error: unknown) {
      return {
        success: false,
        data: {} as ProgressData,
        error: resolveErrorMessage(error, 'Failed to generate progress data'),
        timestamp: Date.now(),
      };
    }
  }

  async generateYearEndSummary(puuid: string, year: number): Promise<ApiResponse<YearEndSummary>> {
    try {
      // Mock year-end summary
      const summary: YearEndSummary = {
        playerId: puuid,
        year,
        totalGames: 0,
        totalWins: 0,
        overallWinRate: 0,
        mostPlayedChampions: [],
        biggestImprovements: [],
        highlightMatches: [],
        friendComparisons: [],
        achievements: [],
        rankJourney: {
          startRank: { tier: 'SILVER', rank: 'II', lp: 45 },
          endRank: { tier: 'GOLD', rank: 'III', lp: 72 },
          peakRank: { tier: 'GOLD', rank: 'II', lp: 89, date: '2024-08-15' },
          rankChanges: [],
        },
      };

      return {
        success: true,
        data: summary,
        timestamp: Date.now(),
      };
    } catch (error: unknown) {
      return {
        success: false,
        data: {} as YearEndSummary,
        error: resolveErrorMessage(error, 'Failed to generate year-end summary'),
        timestamp: Date.now(),
      };
    }
  }
}

// Export service instances
export const riotApiService = new RiotAPIService(
  import.meta.env.VITE_RIOT_API_KEY || 'demo-key'
);

export const analyticsService = new AnalyticsService();
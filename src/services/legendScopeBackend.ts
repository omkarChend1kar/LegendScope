import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { BackendStatus } from '../types/BackendStatus';
import type {
  PlaystyleSummaryModel,
  RiotParticipantModel,
} from '../features/patterns-beneath-chaos/data/models/PatternsSummaryModel';

export interface ApiEnvelope<T> {
  status: BackendStatus;
  data: T | null;
}

export interface HealthResponse {
  status: string;
  environment: string;
  project: string;
}

export interface ItemPayload {
  name: string;
  description?: string;
}

export interface ItemResponse extends ItemPayload {
  id: number;
  created_at?: string;
  updated_at?: string;
}

export interface ProfileRequest {
  riot_id?: string;
  puuid?: string;
  region: string;
}

export interface ProfileResponse {
  riot_id: string;
  puuid: string;
  region: string;
  summoner_name: string;
  profile_icon_id: number;
  summoner_level: number;
  last_matches: BackendStatus;
}

export interface SummaryCardsData {
  battles_fought: number;
  total_claims?: number;
  total_falls?: number;
  claim_fall_ratio?: number | string;
  max_claim_streak?: number;
  max_fall_streak?: number;
  clutch_games?: number;
  average_match_duration?: string;
  surrender_rate?: number;
}

export interface RoleSummaryData {
  role: string;
  games_played: number;
  win_rate: number;
  avg_kda: number;
  first_blood_rate: number;
  avg_vision_score: number;
  gold_per_minute: number;
}

export interface ChampionSummaryData {
  champion_name: string;
  games_played: number;
  total_claims?: number;
  win_rate: number;
}

export interface MatchesRequest {
  puuid: string;
  region?: string;
}

export interface MatchesResponse {
  status: string;
  matches_count?: number;
  message?: string;
}

const BASE_URL = import.meta.env.VITE_LEGENDSCOPE_API_BASE_URL ?? 'http://localhost:3000/api';

class LegendScopeBackendClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
    });
  }

  async getHealth(): Promise<HealthResponse> {
    const response = await this.client.get<HealthResponse>('/health');
    return response.data;
  }

  async getItems(): Promise<ItemResponse[]> {
    const response = await this.client.get<ItemResponse[]>('/items');
    return response.data;
  }

  async createItem(payload: ItemPayload): Promise<ItemResponse> {
    const response = await this.client.post<ItemResponse>('/items', payload);
    return response.data;
  }

  async getItem(itemId: number): Promise<ItemResponse> {
    const response = await this.client.get<ItemResponse>(`/items/${itemId}`);
    return response.data;
  }

  async deleteItem(itemId: number): Promise<void> {
    await this.client.delete(`/items/${itemId}`);
  }

  async getProfile(payload: ProfileRequest): Promise<ProfileResponse> {
    const response = await this.client.post<ProfileResponse | ApiEnvelope<ProfileResponse>>(
      '/profile',
      payload,
    );

    const body = response.data;

    if (this.isEnvelope(body)) {
      if (!body.data) {
        throw new Error(`LegendScope backend returned status "${body.status}" without profile data.`);
      }

      return body.data;
    }

    return body;
  }

  async getSummaryCards(playerId: string): Promise<ApiEnvelope<SummaryCardsData>> {
    const response = await this.client.get<ApiEnvelope<SummaryCardsData>>(
      `/battles/${playerId}/summary/last-20/cards`
    );
    return response.data;
  }

  async getRoleSummaries(playerId: string): Promise<ApiEnvelope<RoleSummaryData[]>> {
    const response = await this.client.get<ApiEnvelope<RoleSummaryData[]>>(
      `/battles/${playerId}/summary/last-20/roles`
    );
    return response.data;
  }

  async getChampionSummaries(playerId: string): Promise<ApiEnvelope<ChampionSummaryData[]>> {
    const response = await this.client.get<ApiEnvelope<ChampionSummaryData[]>>(
      `/battles/${playerId}/summary/last-20/champions`
    );
    return response.data;
  }

  async getSignaturePlaystyleParticipants(playerId: string): Promise<ApiEnvelope<RiotParticipantModel[]>> {
    const response = await this.client.get<ApiEnvelope<RiotParticipantModel[]>>(
      `/battles/${playerId}/signature-playstyle/last-20`
    );
    return response.data;
  }

  async getSignaturePlaystyleSummary(playerId: string): Promise<ApiEnvelope<PlaystyleSummaryModel>> {
    const response = await this.client.get<ApiEnvelope<PlaystyleSummaryModel>>(
      `/battles/${playerId}/signature-playstyle/summary`
    );
    return response.data;
  }

  async storeLastMatches(payload: MatchesRequest): Promise<MatchesResponse> {
    const response = await this.client.post<MatchesResponse>('/matches/last', payload);
    return response.data;
  }

  async storeAllMatches(payload: MatchesRequest): Promise<MatchesResponse> {
    const response = await this.client.post<MatchesResponse>('/matches/all', payload);
    return response.data;
  }

  private isEnvelope<T>(value: unknown): value is ApiEnvelope<T> {
    return (
      typeof value === 'object' &&
      value !== null &&
      'status' in value &&
      'data' in value
    );
  }
}

export const legendScopeBackend = new LegendScopeBackendClient();

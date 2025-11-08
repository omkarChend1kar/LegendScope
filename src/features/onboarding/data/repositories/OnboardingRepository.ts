import {
  legendScopeBackend,
  type ProfileRequest,
  type ProfileResponse,
} from '../../../../services/legendScopeBackend';
import type { ProfileModel } from '../models/ProfileModel';

export interface OnboardingRepository {
  lookupProfileByRiotId(riotId: string, region: string): Promise<ProfileModel>;
  lookupProfileByPuuid(puuid: string, region: string): Promise<ProfileModel>;
}

const DEFAULT_MOCK_PROFILE: ProfileModel = {
  riot_id: 'MockPlayer#NA1',
  puuid: 'mock-puuid-123',
  region: 'na1',
  summoner_name: 'Mock Player',
  profile_icon_id: 1234,
  summoner_level: 245,
  last_matches: 'READY',
};

export class OnboardingRepositoryImpl implements OnboardingRepository {
  private readonly useMockData: boolean;

  constructor(useMockData: boolean = false) {
    this.useMockData = useMockData;
  }

  async lookupProfileByRiotId(riotId: string, region: string): Promise<ProfileModel> {
    if (this.useMockData) {
      await this.simulateLatency();
      return { ...DEFAULT_MOCK_PROFILE, riot_id: riotId, region };
    }

    return this.fetchProfile({ riot_id: riotId, region });
  }

  async lookupProfileByPuuid(puuid: string, region: string): Promise<ProfileModel> {
    if (this.useMockData) {
      await this.simulateLatency();
      return { ...DEFAULT_MOCK_PROFILE, puuid, region };
    }

    return this.fetchProfile({ puuid, region });
  }

  private async fetchProfile(payload: ProfileRequest): Promise<ProfileModel> {
    const profile = await legendScopeBackend.getProfile(payload);
    return this.mapProfile(profile);
  }

  private mapProfile(profile: ProfileResponse): ProfileModel {
    const riotId = (profile as ProfileResponse & { riotId?: string; riotID?: string }).riot_id
      ?? (profile as { riotId?: string }).riotId
      ?? (profile as { riotID?: string }).riotID
      ?? '';

    const puuid = (profile as ProfileResponse & { player_puuid?: string; id?: string }).puuid
      ?? (profile as { player_puuid?: string }).player_puuid
      ?? (profile as { id?: string }).id
      ?? '';

    if (!riotId || !puuid) {
      throw new Error('LegendScope profile response missing identifiers.');
    }

    return {
      riot_id: riotId,
      puuid,
      region: profile.region,
      summoner_name: profile.summoner_name,
      profile_icon_id: profile.profile_icon_id,
      summoner_level: profile.summoner_level,
      last_matches: profile.last_matches,
    };
  }

  private async simulateLatency(delay: number = 350): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}

import type { OnboardingRepository } from '../../data/repositories/OnboardingRepository';
import type { PlayerProfile } from '../entities/PlayerProfile';

export interface LookupPlayerProfileParams {
  riotId?: string;
  puuid?: string;
  region: string;
}

export class LookupPlayerProfileUseCase {
  private readonly repository: OnboardingRepository;

  constructor(repository: OnboardingRepository) {
    this.repository = repository;
  }

  async execute(params: LookupPlayerProfileParams): Promise<PlayerProfile> {
    if (!params.riotId && !params.puuid) {
      throw new Error('Riot ID or PUUID is required to look up a player profile.');
    }

    const model = params.riotId
      ? await this.repository.lookupProfileByRiotId(params.riotId, params.region)
      : await this.repository.lookupProfileByPuuid(params.puuid as string, params.region);

    return {
      riotId: model.riot_id,
      puuid: model.puuid,
      region: model.region,
      summonerName: model.summoner_name,
      profileIconId: model.profile_icon_id,
      summonerLevel: model.summoner_level,
      lastMatchesStatus: model.last_matches,
    };
  }
}

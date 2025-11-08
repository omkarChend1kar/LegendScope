import type { BackendStatus } from './BackendStatus';

export interface PlayerData {
  riotId: string;
  puuid: string;
  region: string;
  summoner: {
    name: string;
    level: number;
    profileIconId: number;
  };
  lastMatchesStatus: BackendStatus;
}

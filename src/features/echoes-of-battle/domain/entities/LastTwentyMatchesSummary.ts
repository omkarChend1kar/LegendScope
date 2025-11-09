export interface SummaryCard {
  battlesFought: number;
  claims: number;
  falls: number;
  claimFallRatio: number;
  longestClaimStreak: number;
  longestFallStreak: number;
  clutchGames: number;
  surrenderRate: number;
  averageMatchDuration: string;
}

export interface RoleSummary {
  role: string;
  games: number;
  claims: number;
  falls: number;
  winRate: number;
  averageKda: number;
  firstBloodRate: number;
  visionScore: number;
  goldPerMinute: number;
}

export interface ChampionSummary {
  name: string;
  games: number;
  claims: number;
  winRate: number;
  color: string;
}

export interface LastTwentyMatchesSummarySnapshot {
  summaryCards: SummaryCard;
  roles: RoleSummary[];
  champions: ChampionSummary[];
}

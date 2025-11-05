// Data Transfer Object for Battle Statistics from API
export interface BattleStatisticsModel {
  battles: number;
  victories: number;
  gloryMoments: number;
  kda: number;
  winStreak: number;
  totalGames: number;
  pentakills: number;
  avgWards: number;
  objectives: number;
  comebackPercentage: number;
  consistencyIndex: number;
}

export interface StatisticTrend {
  value: number;
  change: number;
  isPositive: boolean;
}

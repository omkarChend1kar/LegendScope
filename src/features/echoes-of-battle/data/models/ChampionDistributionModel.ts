// Data Transfer Object for Champion Distribution
export interface ChampionData {
  name: string;
  percentage: number;
  games: number;
  color: string;
}

export interface ChampionDistributionModel {
  champions: ChampionData[];
  totalGames: number;
}

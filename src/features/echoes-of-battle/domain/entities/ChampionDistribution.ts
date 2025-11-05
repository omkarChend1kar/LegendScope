// Domain entity for Champion Distribution
export interface ChampionData {
  name: string;
  percentage: number;
  games: number;
  color: string;
}

export class ChampionDistribution {
  champions: ChampionData[];
  totalGames: number;

  constructor(
    champions: ChampionData[],
    totalGames: number
  ) {
    this.champions = champions;
    this.totalGames = totalGames;
  }

  get topChampion(): ChampionData | undefined {
    return this.champions[0];
  }

  calculateStrokeDasharray(percentage: number): string {
    const circumference = 2 * Math.PI * 40; // radius = 40
    const strokeLength = (percentage / 100) * circumference;
    return `${strokeLength} ${circumference}`;
  }

  calculateStrokeDashoffset(index: number): number {
    const circumference = 2 * Math.PI * 40;
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += (this.champions[i].percentage / 100) * circumference;
    }
    return -offset;
  }
}

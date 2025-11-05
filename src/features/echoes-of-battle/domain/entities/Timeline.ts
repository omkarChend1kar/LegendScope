// Domain entity for Timeline
export interface TimelineDataPoint {
  month: string;
  games: number;
}

export class Timeline {
  dataPoints: TimelineDataPoint[];
  peakMonth: string;
  lowestMonth: string;
  narrative: string;

  constructor(
    dataPoints: TimelineDataPoint[],
    peakMonth: string,
    lowestMonth: string,
    narrative: string
  ) {
    this.dataPoints = dataPoints;
    this.peakMonth = peakMonth;
    this.lowestMonth = lowestMonth;
    this.narrative = narrative;
  }

  get maxGames(): number {
    return Math.max(...this.dataPoints.map(d => d.games));
  }

  getBarHeight(games: number): number {
    return (games / this.maxGames) * 100;
  }

  isPeakMonth(month: string): boolean {
    return month === this.peakMonth;
  }
}

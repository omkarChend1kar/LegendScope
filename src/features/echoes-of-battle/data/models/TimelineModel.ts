// Data Transfer Object for Timeline Data
export interface TimelineDataPoint {
  month: string;
  games: number;
}

export interface TimelineModel {
  dataPoints: TimelineDataPoint[];
  peakMonth: string;
  lowestMonth: string;
  narrative: string;
}

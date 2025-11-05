// Data Transfer Object for Progress Comparison
export interface ProgressMetric {
  label: string;
  currentValue: number;
  previousValue: number;
  change: string;
  isPositive: boolean;
  unit: string;
}

export interface ProgressModel {
  metrics: ProgressMetric[];
  comparisonPeriod: string;
}

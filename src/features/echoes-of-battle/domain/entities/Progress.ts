// Domain entity for Progress
export interface ProgressMetric {
  label: string;
  currentValue: number;
  previousValue: number;
  change: string;
  isPositive: boolean;
  unit: string;
}

export class Progress {
  metrics: ProgressMetric[];
  comparisonPeriod: string;

  constructor(
    metrics: ProgressMetric[],
    comparisonPeriod: string
  ) {
    this.metrics = metrics;
    this.comparisonPeriod = comparisonPeriod;
  }

  get overallImprovement(): boolean {
    const positiveChanges = this.metrics.filter(m => m.isPositive).length;
    return positiveChanges > this.metrics.length / 2;
  }

  get improvementPercentage(): number {
    const positiveChanges = this.metrics.filter(m => m.isPositive).length;
    return (positiveChanges / this.metrics.length) * 100;
  }
}

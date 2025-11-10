import type { BackendStatus } from '../../../../types/BackendStatus';

export type FaultlineAxisId =
  | 'combat_efficiency_index'
  | 'objective_reliability_index'
  | 'survival_discipline_index'
  | 'vision_awareness_index'
  | 'economy_utilization_index'
  | 'role_stability_index'
  | 'momentum_index'
  | 'composure_index';

export type FaultlineTrend = 'up' | 'down' | 'flat';

export interface FaultlineMetricModel {
  id: string;
  label: string;
  value: number;
  formattedValue: string;
  unit?: string;
  percent?: number;
  trend?: FaultlineTrend;
}

export interface FaultlineHistogramBucketModel {
  label: string;
  value: number;
}

export interface FaultlineLinePointModel {
  label: string;
  value: number;
}

export interface FaultlineScatterPointModel {
  x: number;
  y: number;
  label?: string;
}

export interface FaultlineRadarAxisModel {
  label: string;
  value: number;
}

export interface FaultlineTimelinePointModel {
  label: string;
  value: number;
}

export interface FaultlineBoxPlotModel {
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
}

export type FaultlineVisualizationModel =
  | { type: 'bar'; value: number; benchmark?: number }
  | { type: 'progress'; value: number; benchmark?: number }
  | { type: 'histogram'; buckets: FaultlineHistogramBucketModel[] }
  | { type: 'line'; points: FaultlineLinePointModel[] }
  | { type: 'scatter'; points: FaultlineScatterPointModel[] }
  | { type: 'radar'; axes: FaultlineRadarAxisModel[] }
  | { type: 'timeline'; points: FaultlineTimelinePointModel[] }
  | { type: 'boxplot'; distribution: FaultlineBoxPlotModel };

export interface FaultlineAxisModel {
  id: FaultlineAxisId;
  title: string;
  description: string;
  derivedFrom: string[];
  score: number;
  insight: string;
  visualization: FaultlineVisualizationModel;
  metrics: FaultlineMetricModel[];
}

export interface FaultlinesSummaryModel {
  playerId: string;
  windowLabel?: string;
  axes: FaultlineAxisModel[];
  generatedAt: string;
}

export type FaultlinesSummaryEnvelope = {
  status: BackendStatus;
  data: FaultlinesSummaryModel | null;
  message?: string;
};

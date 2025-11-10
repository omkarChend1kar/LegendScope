import type { FaultlineTrend } from '../../data/models/FaultlinesSummaryModel';

export type FaultlineAxisId =
  | 'combat_efficiency_index'
  | 'objective_reliability_index'
  | 'survival_discipline_index'
  | 'vision_awareness_index'
  | 'economy_utilization_index'
  | 'role_stability_index'
  | 'momentum_index'
  | 'composure_index';

export interface FaultlineMetric {
  id: string;
  label: string;
  value: number;
  formattedValue: string;
  unit?: string;
  percent?: number;
  trend?: FaultlineTrend;
}

export type FaultlineVisualization =
  | { type: 'bar'; value: number; benchmark?: number }
  | { type: 'progress'; value: number; benchmark?: number }
  | { type: 'histogram'; buckets: Array<{ label: string; value: number }> }
  | { type: 'line'; points: Array<{ label: string; value: number }> }
  | { type: 'scatter'; points: Array<{ x: number; y: number; label?: string }> }
  | { type: 'radar'; axes: Array<{ label: string; value: number }> }
  | { type: 'timeline'; points: Array<{ label: string; value: number }> }
  | { type: 'boxplot'; distribution: { min: number; q1: number; median: number; q3: number; max: number } };

export interface FaultlineAxis {
  id: FaultlineAxisId;
  title: string;
  description: string;
  derivedFrom: string[];
  score: number;
  insight: string;
  visualization: FaultlineVisualization;
  metrics: FaultlineMetric[];
}

export interface FaultlinesSummary {
  playerId: string;
  windowLabel?: string;
  axes: FaultlineAxis[];
  generatedAt: string;
}

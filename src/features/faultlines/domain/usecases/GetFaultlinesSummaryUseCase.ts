import type { SummarySection } from '../../../../types/SummarySection';
import type { FaultlinesRepository } from '../../data/repositories/FaultlinesRepository';
import type { FaultlinesSummaryModel } from '../../data/models/FaultlinesSummaryModel';
import type { FaultlinesSummary } from '../entities/FaultlinesSummary';

export class GetFaultlinesSummaryUseCase {
  private readonly repository: FaultlinesRepository;

  constructor(repository: FaultlinesRepository) {
    this.repository = repository;
  }

  async execute(playerId: string): Promise<SummarySection<FaultlinesSummary>> {
    const section = await this.repository.getFaultlinesSummary(playerId);

    return {
      status: section.status,
      message: section.message,
      data: section.data ? this.map(section.data) : null,
    };
  }

  async clearCachedSummary(playerId: string): Promise<void> {
    await this.repository.clearCachedSummary(playerId);
  }

  private map(model: FaultlinesSummaryModel): FaultlinesSummary {
    return {
      playerId: model.playerId,
      windowLabel: model.windowLabel,
      generatedAt: model.generatedAt,
      axes: model.axes.map((axis) => ({
        id: axis.id,
        title: axis.title,
        description: axis.description,
        derivedFrom: [...axis.derivedFrom],
        score: axis.score,
        insight: axis.insight,
        visualization: this.cloneVisualization(axis.visualization),
        metrics: axis.metrics.map((metric) => ({
          id: metric.id,
          label: metric.label,
          value: metric.value,
          formattedValue: metric.formattedValue,
          unit: metric.unit,
          percent: metric.percent,
          trend: metric.trend,
        })),
      })),
    };
  }

  private cloneVisualization(
    visualization: FaultlinesSummaryModel['axes'][number]['visualization'],
  ): FaultlinesSummary['axes'][number]['visualization'] {
    switch (visualization.type) {
      case 'bar':
      case 'progress':
        return { ...visualization };
      case 'histogram':
        return {
          type: 'histogram',
          buckets: visualization.buckets.map((bucket) => ({ ...bucket })),
        };
      case 'line':
        return {
          type: 'line',
          points: visualization.points.map((point) => ({ ...point })),
        };
      case 'scatter':
        return {
          type: 'scatter',
          points: visualization.points.map((point) => ({ ...point })),
        };
      case 'radar':
        return {
          type: 'radar',
          axes: visualization.axes.map((axis) => ({ ...axis })),
        };
      case 'timeline':
        return {
          type: 'timeline',
          points: visualization.points.map((point) => ({ ...point })),
        };
      case 'boxplot':
        return {
          type: 'boxplot',
          distribution: { ...visualization.distribution },
        };
      default: {
        const exhaustiveCheck: never = visualization;
        return exhaustiveCheck;
      }
    }
  }
}

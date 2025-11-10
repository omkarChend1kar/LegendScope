import { describe, expect, it } from 'vitest';
import type { FaultlinesRepository } from '../../../data/repositories/FaultlinesRepository';
import type { FaultlinesSummaryModel } from '../../../data/models/FaultlinesSummaryModel';
import { GetFaultlinesSummaryUseCase } from '../GetFaultlinesSummaryUseCase';
import type { SummarySection } from '../../../../../types/SummarySection';

describe('GetFaultlinesSummaryUseCase', () => {
  const sampleModel: FaultlinesSummaryModel = {
    playerId: 'sample-player',
    windowLabel: 'Last 20 battles',
    generatedAt: new Date().toISOString(),
    axes: [
      {
        id: 'combat_efficiency_index',
        title: 'Combat Efficiency Index',
        description: 'Measures offensive efficiency — how much impact per engagement.',
        derivedFrom: ['Kills', 'Assists', 'Damage Dealt'],
        score: 78,
        insight: 'You excel in extended fights but overcommit in solo skirmishes.',
        visualization: {
          type: 'bar',
          value: 78,
          benchmark: 64,
        },
        metrics: [
          {
            id: 'kda',
            label: 'KDA',
            value: 3.4,
            formattedValue: '3.4',
            unit: '',
            percent: 0.78,
            trend: 'up',
          },
          {
            id: 'kp',
            label: 'Kill Participation',
            value: 0.68,
            formattedValue: '68%',
            unit: '%',
            percent: 0.68,
            trend: 'flat',
          },
        ],
      },
      {
        id: 'vision_awareness_index',
        title: 'Vision & Awareness Index',
        description: 'Vision setup and map control awareness.',
        derivedFrom: ['Vision Score', 'Wards Placed', 'Wards Killed'],
        score: 52,
        insight: 'Maintains strong vision control but lacks in clearing enemy wards.',
        visualization: {
          type: 'line',
          points: [
            { label: 'Game 1', value: 48 },
            { label: 'Game 2', value: 55 },
            { label: 'Game 3', value: 53 },
          ],
        },
        metrics: [
          {
            id: 'wardsPlaced',
            label: 'Wards Placed',
            value: 12,
            formattedValue: '12',
            percent: 0.5,
          },
        ],
      },
    ],
  };

  it('maps repository models into faultlines domain summaries', async () => {
    const repositoryStub: FaultlinesRepository = {
      async getFaultlinesSummary(playerId: string): Promise<SummarySection<FaultlinesSummaryModel>> {
        expect(playerId).toEqual('sample-player');
        return {
          status: 'READY',
          data: sampleModel,
        };
      },
      async clearCachedSummary(): Promise<void> {
        // no-op for test stub
      },
    };

    const useCase = new GetFaultlinesSummaryUseCase(repositoryStub);
    const section = await useCase.execute('sample-player');

    expect(section.status).toEqual('READY');
    expect(section.data).not.toBeNull();
    if (!section.data) {
      throw new Error('Expected faultlines summary data to be present');
    }

    const summary = section.data;
    expect(summary.playerId).toEqual(sampleModel.playerId);
    expect(summary.axes).toHaveLength(2);
    expect(summary.axes[0].metrics).not.toBe(sampleModel.axes[0].metrics);
    expect(summary.axes[0].visualization).not.toBe(sampleModel.axes[0].visualization);

    // Mutate domain object and verify model remains unchanged
    summary.axes[0].metrics[0].value = -999;
    expect(sampleModel.axes[0].metrics[0].value).toEqual(3.4);
  });
});

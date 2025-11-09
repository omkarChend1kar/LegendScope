import { describe, expect, it } from 'vitest';
import { PlaystyleMockDataSource } from '../../../data/datasources/local/PlaystyleMockDataSource';
import type { PatternsRepository } from '../../../data/repositories/PatternsRepository';
import { SignaturePlaystyleAnalyzer } from '../../services/SignaturePlaystyleAnalyzer';
import { GetPatternsSummaryUseCase } from '../GetPatternsSummaryUseCase';
import type { SummarySection } from '../../../../../types/SummarySection';

describe('GetPatternsSummaryUseCase', () => {
  it('maps repository models into immutable domain summaries', async () => {
    const mockSource = new PlaystyleMockDataSource();
    const analyzer = new SignaturePlaystyleAnalyzer();
    const participants = await mockSource.fetchParticipants('tester');
    const model = analyzer.analyze(participants);

    const repositoryStub: PatternsRepository = {
      async getPatternsSummary(playerId: string): Promise<SummarySection<typeof model>> {
        expect(playerId).toBe('tester');
        return {
          status: 'READY',
          data: model,
        };
      },
    };

    const useCase = new GetPatternsSummaryUseCase(repositoryStub);
    const section = await useCase.execute('tester');

    expect(section.status).toEqual('READY');
    expect(section.data).not.toBeNull();
    if (!section.data) {
      throw new Error('Expected playstyle summary data.');
    }

    const summary = section.data;

    expect(summary.summary.primaryRole).toEqual(model.summary.primaryRole);
    expect(summary.summary.windowLabel).toEqual(model.summary.windowLabel);
    expect(summary.axes.aggression.score).toEqual(model.axes.aggression.score);
    expect(summary.tempo.byPhase.early.killsPer10m).toEqual(model.tempo.byPhase.early.killsPer10m);
    expect(summary.axes.aggression.metrics).not.toBe(model.axes.aggression.metrics);
    expect(summary.axes.aggression.metrics).toEqual(model.axes.aggression.metrics);
    expect(summary.tempo.byPhase.early.metrics).not.toBe(model.tempo.byPhase.early.metrics);
    expect(summary.tempo.byPhase.early.metrics).toEqual(model.tempo.byPhase.early.metrics);
    expect(summary.tempo.highlights).not.toBe(model.tempo.highlights);
    expect(summary.tempo.highlights).toEqual(model.tempo.highlights);

  summary.axes.aggression.score = 0;
    if (summary.axes.aggression.evidence) {
      summary.axes.aggression.evidence.killsPer10m = 0;
    }
    summary.tempo.byPhase.early.killsPer10m = 0;
    if (summary.roleAndChamps.comfortPicks.length > 0) {
      summary.roleAndChamps.comfortPicks[0].axesDelta.aggression = 0;
    }
    if (summary.axes.aggression.metrics.length > 0) {
      summary.axes.aggression.metrics[0].value = -999;
    }
    if (summary.tempo.byPhase.early.metrics.length > 0) {
      summary.tempo.byPhase.early.metrics[0].value = -999;
    }
    if (summary.tempo.highlights.length > 0) {
      summary.tempo.highlights.pop();
    }

  expect(model.axes.aggression.score).not.toEqual(summary.axes.aggression.score);
    if (model.axes.aggression.evidence && summary.axes.aggression.evidence) {
      expect(model.axes.aggression.evidence.killsPer10m).not.toEqual(
        summary.axes.aggression.evidence.killsPer10m,
      );
    }
    expect(model.tempo.byPhase.early.killsPer10m).not.toEqual(summary.tempo.byPhase.early.killsPer10m);
    if (model.axes.aggression.metrics.length > 0 && summary.axes.aggression.metrics.length > 0) {
      expect(model.axes.aggression.metrics[0].value).not.toEqual(summary.axes.aggression.metrics[0].value);
    }
    if (model.tempo.byPhase.early.metrics.length > 0 && summary.tempo.byPhase.early.metrics.length > 0) {
      expect(model.tempo.byPhase.early.metrics[0].value).not.toEqual(
        summary.tempo.byPhase.early.metrics[0].value,
      );
    }
    if (model.tempo.highlights.length > 0) {
      expect(model.tempo.highlights.length).not.toEqual(summary.tempo.highlights.length);
    }

    if (model.roleAndChamps.comfortPicks.length > 0) {
      expect(model.roleAndChamps.comfortPicks[0].axesDelta.aggression).not.toEqual(
        summary.roleAndChamps.comfortPicks[0].axesDelta.aggression,
      );
    }
  });
});

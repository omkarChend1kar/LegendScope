import type { PatternsRepository } from '../../data/repositories/PatternsRepository';
import type { PatternsSummary } from '../entities/PatternsSummary';
import type { PlaystyleSummaryModel } from '../../data/models/PatternsSummaryModel';
import type { SummarySection } from '../../../../types/SummarySection';

export class GetPatternsSummaryUseCase {
  private readonly repository: PatternsRepository;

  constructor(repository: PatternsRepository) {
    this.repository = repository;
  }

  async execute(playerId: string): Promise<SummarySection<PatternsSummary>> {
    const section = await this.repository.getPatternsSummary(playerId);

    return {
      status: section.status,
      data: section.data ? this.map(section.data) : null,
      message: section.message,
    };
  }

  async clearCachedSummary(playerId: string): Promise<void> {
    await this.repository.clearCachedSummary(playerId);
  }

  private map(model: PlaystyleSummaryModel): PatternsSummary {
    const axes = Object.entries(model.axes).reduce((acc, [axisKey, axisValue]) => {
      acc[axisKey as keyof PatternsSummary['axes']] = {
        key: axisValue.key,
        label: axisValue.label,
        score: axisValue.score,
        scoreLabel: axisValue.scoreLabel,
        metrics: axisValue.metrics.map((metric: typeof axisValue.metrics[number]) => ({ ...metric })),
        evidence: axisValue.evidence ? { ...axisValue.evidence } : undefined,
      };
      return acc;
    }, {} as PatternsSummary['axes']);

    const tempoByPhase = Object.entries(model.tempo.byPhase).reduce((acc, [phaseKey, phaseValue]) => {
      acc[phaseKey as keyof PatternsSummary['tempo']['byPhase']] = {
        key: phaseValue.key,
        label: phaseValue.label,
        roleLabel: phaseValue.roleLabel,
        killsPer10m: phaseValue.killsPer10m,
        deathsPer10m: phaseValue.deathsPer10m,
        dpm: phaseValue.dpm,
        csPerMin: phaseValue.csPerMin,
        kp: phaseValue.kp,
        metrics: phaseValue.metrics.map((metric: typeof phaseValue.metrics[number]) => ({ ...metric })),
      };
      return acc;
    }, {} as PatternsSummary['tempo']['byPhase']);

    const tempoHighlights = model.tempo.highlights.map((highlight: typeof model.tempo.highlights[number]) => ({
      ...highlight,
    }));

    const comfortPicks = model.roleAndChamps.comfortPicks.map((pick) => ({
      champion: pick.champion,
      games: pick.games,
      wr: pick.wr,
      kda: pick.kda,
      axesDelta: { ...pick.axesDelta },
    }));

    return {
      summary: {
        primaryRole: model.summary.primaryRole,
        playstyleLabel: model.summary.playstyleLabel,
        oneLiner: model.summary.oneLiner,
        record: { ...model.summary.record },
        windowLabel: model.summary.windowLabel,
      },
      axes,
      efficiency: { ...model.efficiency },
      tempo: {
        bestPhase: model.tempo.bestPhase,
        byPhase: tempoByPhase,
        highlights: tempoHighlights,
      },
      consistency: { ...model.consistency },
      roleAndChamps: {
        roleMix: { ...model.roleAndChamps.roleMix },
        champPool: { ...model.roleAndChamps.champPool },
        comfortPicks,
      },
      insights: [...model.insights],
      generatedAt: model.generatedAt,
    };
  }
}

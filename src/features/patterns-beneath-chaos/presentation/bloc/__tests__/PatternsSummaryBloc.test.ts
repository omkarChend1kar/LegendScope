import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import type { SummarySection } from '../../../../../types/SummarySection';
import type { PatternsSummary } from '../../../domain/entities/PatternsSummary';
import { PatternsSummaryBloc } from '../PatternsSummaryBloc';
import type { GetPatternsSummaryUseCase } from '../../../domain/usecases/GetPatternsSummaryUseCase';

const createSummary = (): PatternsSummary => ({
  summary: {
    primaryRole: 'Jungle',
    playstyleLabel: 'Skirmisher',
    oneLiner: 'Controls tempo through proactive invasions.',
    record: { games: 20, wins: 12, losses: 8 },
    windowLabel: 'Last 20 battles',
  },
  axes: {
    aggression: { key: 'aggression', label: 'Aggression', score: 82, scoreLabel: 'Relentless', metrics: [], evidence: {} },
    survivability: { key: 'survivability', label: 'Survivability', score: 54, scoreLabel: 'Balanced', metrics: [], evidence: {} },
    skirmishBias: { key: 'skirmishBias', label: 'Skirmish Bias', score: 76, scoreLabel: 'Roamer', metrics: [], evidence: {} },
    objectiveImpact: { key: 'objectiveImpact', label: 'Objective Impact', score: 68, scoreLabel: 'Structured', metrics: [], evidence: {} },
    visionDiscipline: { key: 'visionDiscipline', label: 'Vision Discipline', score: 63, scoreLabel: 'Aware', metrics: [], evidence: {} },
    utility: { key: 'utility', label: 'Utility', score: 59, scoreLabel: 'Adaptive', metrics: [], evidence: {} },
  },
  efficiency: {
    kda: 3.2,
    kp: 0.68,
    damageShare: 0.24,
    gpm: 415,
    visionPerMin: 1.7,
  },
  tempo: {
    bestPhase: 'Early',
    byPhase: {
      early: {
        key: 'early',
        label: 'Early Game',
        roleLabel: 'Jungle',
        killsPer10m: 4.5,
        deathsPer10m: 1.8,
        dpm: 380,
        csPerMin: 6.1,
        kp: 0.72,
        metrics: [],
      },
      mid: {
        key: 'mid',
        label: 'Mid Game',
        roleLabel: 'Jungle',
        killsPer10m: 3.2,
        deathsPer10m: 2.1,
        dpm: 410,
        csPerMin: 5.4,
        kp: 0.64,
        metrics: [],
      },
      late: {
        key: 'late',
        label: 'Late Game',
        roleLabel: 'Jungle',
        killsPer10m: 2.8,
        deathsPer10m: 2.4,
        dpm: 395,
        csPerMin: 4.8,
        kp: 0.58,
        metrics: [],
      },
    },
    highlights: [],
  },
  consistency: {
    kdaCV: 0.42,
    dpmCV: 0.33,
    kpCV: 0.29,
    csCV: 0.25,
    visionCV: 0.31,
    label: 'Stable',
  },
  roleAndChamps: {
    roleMix: { Jungle: 72, Mid: 18, Support: 10 },
    champPool: { unique: 9, entropy: 1.26 },
    comfortPicks: [],
  },
  insights: [],
  generatedAt: new Date().toISOString(),
});

const createUseCase = (responses: SummarySection<PatternsSummary>[]): GetPatternsSummaryUseCase => {
  const execute = vi.fn();
  responses.forEach((response) => {
    execute.mockResolvedValueOnce(response);
  });
  // Keep returning the last response for any additional calls
  execute.mockImplementation(async () => responses[responses.length - 1]);

  return { execute } as unknown as GetPatternsSummaryUseCase;
};

describe('PatternsSummaryBloc', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('returns immediately when the summary is ready on first attempt', async () => {
    const readySummary = createSummary();
    const useCase = createUseCase([
      { status: 'READY', data: readySummary },
    ]);
    const bloc = new PatternsSummaryBloc(useCase);

    const result = await bloc.loadSummary('player-1');

    expect(result.status).toBe('READY');
    expect(result.data).toEqual(readySummary);
  });

  it('polls until the backend reports READY', async () => {
    const readySummary = createSummary();
    const useCase = createUseCase([
      { status: 'FETCHING', data: null },
      { status: 'FETCHING', data: null },
      { status: 'READY', data: readySummary },
    ]);
    const bloc = new PatternsSummaryBloc(useCase);
    const updates: SummarySection<PatternsSummary>[] = [];

    const promise = bloc.loadSummary('player-2', (snapshot) => {
      updates.push(snapshot);
    });

    await vi.advanceTimersByTimeAsync(1500);
    await vi.advanceTimersByTimeAsync(1500);

    const result = await promise;

    expect(result.status).toBe('READY');
    expect(result.data).toEqual(readySummary);
    expect(updates.length).toBeGreaterThanOrEqual(3);
  });

  it('fails after exhausting polling attempts', async () => {
    const useCase = createUseCase([
      { status: 'FETCHING', data: null },
    ]);
    const bloc = new PatternsSummaryBloc(useCase);

    const promise = bloc.loadSummary('player-3');

    for (let i = 0; i < 9; i += 1) {
      await vi.advanceTimersByTimeAsync(1500);
    }

    const result = await promise;

    expect(result.status).toBe('FAILED');
    expect(result.message).toContain('Timed out');
  });
});

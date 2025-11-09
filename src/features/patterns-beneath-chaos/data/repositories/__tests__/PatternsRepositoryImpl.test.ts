import { describe, expect, it, vi } from 'vitest';
import type { SummarySection } from '../../../../../types/SummarySection';
import type { PlaystyleSummaryModel } from '../../models/PatternsSummaryModel';
import { PatternsRepositoryImpl } from '../PatternsRepository';
import type { PlaystyleRemoteDataSource } from '../../datasources/remote/PlaystyleRemoteDataSource';
import { PlaystyleMockDataSource } from '../../datasources/local/PlaystyleMockDataSource';
import type { PlaystyleLocalDataSource } from '../../datasources/local/PlaystyleLocalDataSource';
import { SignaturePlaystyleAnalyzer } from '../../../domain/services/SignaturePlaystyleAnalyzer';

describe('PatternsRepositoryImpl', () => {
  const sampleSummary: PlaystyleSummaryModel = {
    summary: {
      primaryRole: 'JUNGLE',
      playstyleLabel: 'tempo-conductor',
      oneLiner: 'Mic check, one two one two',
      record: {
        games: 10,
        wins: 8,
        losses: 2,
      },
      windowLabel: 'Last 20 games',
    },
    axes: {
      aggression: {
        key: 'aggression',
        label: 'Aggression',
        score: 0.75,
        scoreLabel: 'High',
        metrics: [],
        evidence: undefined,
      },
      survivability: {
        key: 'survivability',
        label: 'Survivability',
        score: 0.55,
        scoreLabel: 'Steady',
        metrics: [],
        evidence: undefined,
      },
      skirmishBias: {
        key: 'skirmishBias',
        label: 'Skirmish Bias',
        score: 0.6,
        scoreLabel: 'Duelist',
        metrics: [],
        evidence: undefined,
      },
      objectiveImpact: {
        key: 'objectiveImpact',
        label: 'Objective Impact',
        score: 0.63,
        scoreLabel: 'High',
        metrics: [],
        evidence: undefined,
      },
      visionDiscipline: {
        key: 'visionDiscipline',
        label: 'Vision Discipline',
        score: 0.5,
        scoreLabel: 'Moderate',
        metrics: [],
        evidence: undefined,
      },
      utility: {
        key: 'utility',
        label: 'Utility',
        score: 0.4,
        scoreLabel: 'Supportive',
        metrics: [],
        evidence: undefined,
      },
    },
    efficiency: {
      kda: 4.2,
      kp: 68,
      damageShare: 21,
      gpm: 420,
      visionPerMin: 1.2,
    },
    tempo: {
      bestPhase: 'Early',
      byPhase: {
        early: {
          key: 'early',
          label: 'Early Game',
          roleLabel: 'Jungle',
          killsPer10m: 2,
          deathsPer10m: 1,
          dpm: 450,
          csPerMin: 6,
          kp: 70,
          metrics: [],
        },
        mid: {
          key: 'mid',
          label: 'Mid Game',
          roleLabel: 'Jungle',
          killsPer10m: 1,
          deathsPer10m: 1,
          dpm: 480,
          csPerMin: 6,
          kp: 65,
          metrics: [],
        },
        late: {
          key: 'late',
          label: 'Late Game',
          roleLabel: 'Jungle',
          killsPer10m: 1,
          deathsPer10m: 1,
          dpm: 500,
          csPerMin: 6,
          kp: 60,
          metrics: [],
        },
      },
      highlights: [],
    },
    consistency: {
      kdaCV: 0.2,
      dpmCV: 0.1,
      kpCV: 0.15,
      csCV: 0.05,
      visionCV: 0.08,
      label: 'Stable',
    },
    roleAndChamps: {
      roleMix: {
        jungle: 0.9,
        mid: 0.1,
      },
      champPool: {
        unique: 5,
        entropy: 0.68,
      },
      comfortPicks: [],
    },
    insights: [],
    generatedAt: new Date().toISOString(),
  };

  const createSection = (
    status: SummarySection<PlaystyleSummaryModel>['status'],
    data: PlaystyleSummaryModel | null,
  ): SummarySection<PlaystyleSummaryModel> => ({
    status,
    data,
  });

  const resolveImmediately = async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  };

  it('returns cached summary without hitting remote when data is ready', async () => {
    const localSection = createSection('READY', sampleSummary);

    const localDataSource: Pick<PlaystyleLocalDataSource, 'getSummary' | 'saveSummary' | 'updateSummary' | 'deleteSummary'> = {
      getSummary: vi.fn(async () => localSection),
      saveSummary: vi.fn(async () => {
        throw new Error('saveSummary should not be called');
      }),
      updateSummary: vi.fn(async (_playerId, updater) => updater(localSection)),
      deleteSummary: vi.fn(async () => {
        throw new Error('deleteSummary should not be called');
      }),
    };

    const remoteDataSource: Pick<PlaystyleRemoteDataSource, 'fetchSummary'> = {
      fetchSummary: vi.fn(async () => {
        throw new Error('fetchSummary should not be called when cache is ready');
      }),
    };

    const repository = new PatternsRepositoryImpl(false, {
      localDataSource: localDataSource as PlaystyleLocalDataSource,
      remoteDataSource: remoteDataSource as PlaystyleRemoteDataSource,
      mockDataSource: new PlaystyleMockDataSource(),
      analyzer: new SignaturePlaystyleAnalyzer(),
    });

    const result = await repository.getPatternsSummary('player-one');

    expect(result).toEqual(localSection);
    expect(remoteDataSource.fetchSummary).not.toHaveBeenCalled();
    expect(localDataSource.saveSummary).not.toHaveBeenCalled();
    expect(localDataSource.updateSummary).not.toHaveBeenCalled();
  });

  it('marks summary as fetching and synchronises remote data into local cache', async () => {
    const fetchSection = createSection('NOT_STARTED', null);
    let storedSummary: SummarySection<PlaystyleSummaryModel> = fetchSection;

    const localDataSource: Pick<PlaystyleLocalDataSource, 'getSummary' | 'saveSummary' | 'updateSummary' | 'deleteSummary'> = {
      getSummary: vi.fn(async () => storedSummary),
      saveSummary: vi.fn(async (_playerId, section) => {
        storedSummary = section;
      }),
      updateSummary: vi.fn(async (_playerId, updater) => {
        storedSummary = updater(storedSummary);
        return storedSummary;
      }),
      deleteSummary: vi.fn(async () => {
        storedSummary = createSection('NOT_STARTED', null);
      }),
    };

    const remoteDataSource: Pick<PlaystyleRemoteDataSource, 'fetchSummary'> = {
      fetchSummary: vi.fn(async () => ({ status: 'READY', data: sampleSummary })),
    };

    const repository = new PatternsRepositoryImpl(false, {
      localDataSource: localDataSource as PlaystyleLocalDataSource,
      remoteDataSource: remoteDataSource as PlaystyleRemoteDataSource,
      mockDataSource: new PlaystyleMockDataSource(),
      analyzer: new SignaturePlaystyleAnalyzer(),
    });

    const initial = await repository.getPatternsSummary('player-two');

    expect(initial.status).toEqual('FETCHING');
    expect(remoteDataSource.fetchSummary).toHaveBeenCalledOnce();

    await resolveImmediately();

    expect(localDataSource.saveSummary).toHaveBeenCalledWith('player-two', {
      status: 'READY',
      data: sampleSummary,
    });

    const hydrated = await repository.getPatternsSummary('player-two');

    expect(hydrated.status).toEqual('READY');
    expect(hydrated.data).toEqual(sampleSummary);
    expect(remoteDataSource.fetchSummary).toHaveBeenCalledTimes(1);
  });

  it('stores failure state in cache when remote summary fails', async () => {
    const fetchSection = createSection('NOT_STARTED', null);
    let storedSummary: SummarySection<PlaystyleSummaryModel> = fetchSection;

    const localDataSource: Pick<PlaystyleLocalDataSource, 'getSummary' | 'saveSummary' | 'updateSummary' | 'deleteSummary'> = {
      getSummary: vi.fn(async () => storedSummary),
      saveSummary: vi.fn(async (_playerId, section) => {
        storedSummary = section;
      }),
      updateSummary: vi.fn(async (_playerId, updater) => {
        storedSummary = updater(storedSummary);
        return storedSummary;
      }),
      deleteSummary: vi.fn(async () => {
        storedSummary = createSection('NOT_STARTED', null);
      }),
    };

    const remoteDataSource: Pick<PlaystyleRemoteDataSource, 'fetchSummary'> = {
      fetchSummary: vi.fn(async () => {
        throw new Error('backend down');
      }),
    };

    const repository = new PatternsRepositoryImpl(false, {
      localDataSource: localDataSource as PlaystyleLocalDataSource,
      remoteDataSource: remoteDataSource as PlaystyleRemoteDataSource,
      mockDataSource: new PlaystyleMockDataSource(),
      analyzer: new SignaturePlaystyleAnalyzer(),
    });

    const initial = await repository.getPatternsSummary('player-three');

    expect(initial.status).toEqual('FETCHING');

    await resolveImmediately();

    expect(localDataSource.saveSummary).toHaveBeenCalled();
    expect(storedSummary.status).toEqual('FAILED');
    expect(storedSummary.data).toBeNull();
    expect(storedSummary.message).toContain('backend down');
  });

  it('clears cached summaries when requested, allowing fresh sync on next access', async () => {
    let storedSummary: SummarySection<PlaystyleSummaryModel> = createSection('NOT_STARTED', null);

    const localDataSource: Pick<PlaystyleLocalDataSource, 'getSummary' | 'saveSummary' | 'updateSummary' | 'deleteSummary'> = {
      getSummary: vi.fn(async () => storedSummary),
      saveSummary: vi.fn(async (_playerId, section) => {
        storedSummary = section;
      }),
      updateSummary: vi.fn(async (_playerId, updater) => {
        storedSummary = updater(storedSummary);
        return storedSummary;
      }),
      deleteSummary: vi.fn(async () => {
        storedSummary = createSection('NOT_STARTED', null);
      }),
    };

    const createDeferred = () => {
      let resolve: ((value: SummarySection<PlaystyleSummaryModel>) => void) | undefined;
      const promise = new Promise<SummarySection<PlaystyleSummaryModel>>((res) => {
        resolve = res;
      });
      return {
        promise,
        resolve: (value: SummarySection<PlaystyleSummaryModel>) => {
          resolve?.(value);
        },
      } as const;
    };

    const deferreds: Array<ReturnType<typeof createDeferred>> = [];

    const remoteDataSource: Pick<PlaystyleRemoteDataSource, 'fetchSummary'> = {
      fetchSummary: vi.fn(async () => {
        const deferred = createDeferred();
        deferreds.push(deferred);
        return deferred.promise;
      }),
    };

    const repository = new PatternsRepositoryImpl(false, {
      localDataSource: localDataSource as PlaystyleLocalDataSource,
      remoteDataSource: remoteDataSource as PlaystyleRemoteDataSource,
      mockDataSource: new PlaystyleMockDataSource(),
      analyzer: new SignaturePlaystyleAnalyzer(),
    });

    const initial = await repository.getPatternsSummary('player-four');

    expect(initial.status).toEqual('FETCHING');
    expect(remoteDataSource.fetchSummary).toHaveBeenCalledTimes(1);

    await repository.clearCachedSummary('player-four');

    expect(localDataSource.deleteSummary).toHaveBeenCalledWith('player-four');

    const nextRequest = await repository.getPatternsSummary('player-four');
    expect(nextRequest.status).toEqual('FETCHING');
    expect(remoteDataSource.fetchSummary).toHaveBeenCalledTimes(2);

    deferreds.forEach((deferred) => {
      deferred.resolve({ status: 'FAILED', data: null, message: 'Cancelled' });
    });

    await resolveImmediately();
  });
});

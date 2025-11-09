import { useEffect, useState } from 'react';
import type {
  SummaryCard,
  RoleSummary,
  ChampionSummary,
} from '../../domain/entities/LastTwentyMatchesSummary';
import { GetLastTwentySummaryCardsUseCase } from '../../domain/usecases/GetLastTwentySummaryCardsUseCase';
import { GetLastTwentyRoleSummariesUseCase } from '../../domain/usecases/GetLastTwentyRoleSummariesUseCase';
import { GetLastTwentyChampionSummariesUseCase } from '../../domain/usecases/GetLastTwentyChampionSummariesUseCase';
import type { SummarySection } from '../../types/SummarySection';
import { isInProgressStatus } from '../../types/SummarySection';

type SummarySections = {
  summaryCards: SummarySection<SummaryCard>;
  roles: SummarySection<RoleSummary[]>;
  champions: SummarySection<ChampionSummary[]>;
};

type SectionKey = keyof SummarySections;

const SECTION_CONTEXT: Record<SectionKey, string> = {
  summaryCards: 'summary cards',
  roles: 'role summaries',
  champions: 'champion summaries',
};

const createInitialSection = <T,>(): SummarySection<T> => ({
  status: 'NOT_STARTED',
  data: null,
});

const createInitialSummarySections = (): SummarySections => ({
  summaryCards: createInitialSection(),
  roles: createInitialSection(),
  champions: createInitialSection(),
});

type CachedSummaryEntry = {
  sections: SummarySections;
  timestamp: number;
};

const SUMMARY_CACHE_TTL_MS = 5 * 60 * 1000;
const summaryCache = new Map<string, CachedSummaryEntry>();

const getCachedSections = (playerId: string): SummarySections | null => {
  const entry = summaryCache.get(playerId);

  if (!entry) {
    return null;
  }

  const isExpired = Date.now() - entry.timestamp > SUMMARY_CACHE_TTL_MS;

  if (isExpired) {
    summaryCache.delete(playerId);
    return null;
  }

  return entry.sections;
};

const setCachedSections = (playerId: string, sections: SummarySections): void => {
  summaryCache.set(playerId, {
    sections,
    timestamp: Date.now(),
  });
};

const mergeSections = (
  current: SummarySections,
  partial: Partial<SummarySections>,
): SummarySections => ({
  summaryCards: partial.summaryCards ?? current.summaryCards,
  roles: partial.roles ?? current.roles,
  champions: partial.champions ?? current.champions,
});

const hasInProgressSections = (sections: SummarySections): boolean => (
  Object.values(sections) as SummarySection<unknown>[]
).some((section) => isInProgressStatus(section.status));

const hasReusableSections = (sections: SummarySections): boolean => (
  Object.values(sections) as SummarySection<unknown>[]
).every((section) => section.status === 'READY' || section.status === 'NO_MATCHES');

const computeAggregates = (sections: SummarySections): { loading: boolean; error: string | null } => {
  const loading = hasInProgressSections(sections);
  const failedSection = (Object.values(sections) as SummarySection<unknown>[]).find(
    (section) => section.status === 'FAILED',
  );

  return {
    loading,
    error: failedSection?.message ?? null,
  };
};

export interface LastTwentyMatchesSummaryState {
  summaryCards: SummarySection<SummaryCard>;
  roles: SummarySection<RoleSummary[]>;
  champions: SummarySection<ChampionSummary[]>;
  loading: boolean;
  error: string | null;
}

export class LastTwentyMatchesSummaryBloc {
  private readonly getSummaryCardsUseCase: GetLastTwentySummaryCardsUseCase;
  private readonly getRoleSummariesUseCase: GetLastTwentyRoleSummariesUseCase;
  private readonly getChampionSummariesUseCase: GetLastTwentyChampionSummariesUseCase;

  constructor(
    getSummaryCardsUseCase: GetLastTwentySummaryCardsUseCase,
    getRoleSummariesUseCase: GetLastTwentyRoleSummariesUseCase,
    getChampionSummariesUseCase: GetLastTwentyChampionSummariesUseCase,
  ) {
    this.getSummaryCardsUseCase = getSummaryCardsUseCase;
    this.getRoleSummariesUseCase = getRoleSummariesUseCase;
    this.getChampionSummariesUseCase = getChampionSummariesUseCase;
  }

  async loadSummary(
    playerId: string,
    onUpdate?: (partial: Partial<SummarySections>) => void,
  ): Promise<SummarySections> {
    let sections: SummarySections = {
      summaryCards: createInitialSection(),
      roles: createInitialSection(),
      champions: createInitialSection(),
    };

    const fetchers = {
      summaryCards: () => this.getSummaryCardsUseCase.execute(playerId),
      roles: () => this.getRoleSummariesUseCase.execute(playerId),
      champions: () => this.getChampionSummariesUseCase.execute(playerId),
    } satisfies {
      summaryCards: () => Promise<SummarySection<SummaryCard>>;
      roles: () => Promise<SummarySection<RoleSummary[]>>;
      champions: () => Promise<SummarySection<ChampionSummary[]>>;
    };

    const maxAttempts = 10;
    const pollingDelayMs = 1500;
    let attempt = 0;

    while (attempt < maxAttempts) {
      const pendingKeys = (Object.keys(fetchers) as SectionKey[]).filter(
        (key) => isInProgressStatus(sections[key].status),
      );

      if (pendingKeys.length === 0) {
        break;
      }

      let hasInProgress = false;

      for (const key of pendingKeys) {
        const result = await fetchers[key]();
        sections = {
          ...sections,
          [key]: result,
        } as SummarySections;
        onUpdate?.({ [key]: result } as Partial<SummarySections>);

        if (isInProgressStatus(result.status)) {
          hasInProgress = true;
        }
      }

      if (!hasInProgress) {
        break;
      }

      attempt += 1;

      if (attempt < maxAttempts) {
        await this.delay(pollingDelayMs);
      }
    }

    for (const key of Object.keys(fetchers) as SectionKey[]) {
      if (isInProgressStatus(sections[key].status)) {
        const message = `Timed out waiting for ${SECTION_CONTEXT[key]}.`;
        const failedSection: SummarySection<unknown> = {
          status: 'FAILED',
          data: null,
          message,
        };
        sections = {
          ...sections,
          [key]: failedSection,
        } as SummarySections;
        onUpdate?.({ [key]: failedSection } as Partial<SummarySections>);
      }
    }

    return sections;
  }

  private async delay(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export function useLastTwentyMatchesSummaryBloc(
  bloc: LastTwentyMatchesSummaryBloc,
  playerId: string
): LastTwentyMatchesSummaryState {
  const [state, setState] = useState<LastTwentyMatchesSummaryState>(() => {
    const cachedSections = getCachedSections(playerId);
    const seedSections = cachedSections ?? createInitialSummarySections();
    const aggregates = computeAggregates(seedSections);

    return {
      summaryCards: seedSections.summaryCards,
      roles: seedSections.roles,
      champions: seedSections.champions,
      loading: aggregates.loading,
      error: aggregates.error,
    };
  });

  useEffect(() => {
    let cancelled = false;

    const cachedSections = getCachedSections(playerId);
    const reusable = cachedSections ? hasReusableSections(cachedSections) : false;

    if (cachedSections) {
      const aggregates = computeAggregates(cachedSections);
      setState({
        summaryCards: cachedSections.summaryCards,
        roles: cachedSections.roles,
        champions: cachedSections.champions,
        loading: aggregates.loading,
        error: aggregates.error,
      });

      if (reusable) {
        return () => {
          cancelled = true;
        };
      }
    } else {
      const seedSections = createInitialSummarySections();
      const aggregates = computeAggregates(seedSections);

      setState({
        summaryCards: seedSections.summaryCards,
        roles: seedSections.roles,
        champions: seedSections.champions,
        loading: aggregates.loading,
        error: aggregates.error,
      });
    }

    const loadData = async () => {
      const applyPartial = (partial: Partial<SummarySections>) => {
        if (cancelled) {
          return;
        }

        setState((prev) => {
          const currentSections: SummarySections = {
            summaryCards: prev.summaryCards,
            roles: prev.roles,
            champions: prev.champions,
          };

          const nextSections = mergeSections(currentSections, partial);
          const aggregates = computeAggregates(nextSections);

          return {
            summaryCards: nextSections.summaryCards,
            roles: nextSections.roles,
            champions: nextSections.champions,
            loading: aggregates.loading,
            error: aggregates.error,
          };
        });
      };

      try {
        setState((prev) => ({
          ...prev,
          loading: true,
          error: null,
        }));

        const finalSections = await bloc.loadSummary(playerId, applyPartial);

        applyPartial(finalSections);
        setCachedSections(playerId, finalSections);
      } catch (error) {
        if (!cancelled) {
          const failureSections: SummarySections = {
            summaryCards: {
              status: 'FAILED',
              data: null,
              message: error instanceof Error ? error.message : 'Failed to load summary',
            },
            roles: {
              status: 'FAILED',
              data: null,
              message: error instanceof Error ? error.message : 'Failed to load summary',
            },
            champions: {
              status: 'FAILED',
              data: null,
              message: error instanceof Error ? error.message : 'Failed to load summary',
            },
          };

          const aggregates = computeAggregates(failureSections);

          setState({
            ...failureSections,
            loading: aggregates.loading,
            error: aggregates.error,
          });
        }
      }
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, [bloc, playerId]);

  return state;
}

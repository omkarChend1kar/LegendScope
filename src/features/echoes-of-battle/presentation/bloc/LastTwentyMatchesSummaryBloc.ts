import { useCallback, useEffect, useState } from 'react';
import type {
  SummaryCard,
  RoleSummary,
  ChampionSummary,
  RiskProfile,
  NarrativeSummary,
} from '../../domain/entities/LastTwentyMatchesSummary';
import { GetLastTwentySummaryCardsUseCase } from '../../domain/usecases/GetLastTwentySummaryCardsUseCase';
import { GetLastTwentyRoleSummariesUseCase } from '../../domain/usecases/GetLastTwentyRoleSummariesUseCase';
import { GetLastTwentyChampionSummariesUseCase } from '../../domain/usecases/GetLastTwentyChampionSummariesUseCase';
import { GetLastTwentyRiskProfileUseCase } from '../../domain/usecases/GetLastTwentyRiskProfileUseCase';
import { GetLastTwentyNarrativeUseCase } from '../../domain/usecases/GetLastTwentyNarrativeUseCase';
import type { SummarySection } from '../../types/SummarySection';
import { isInProgressStatus } from '../../types/SummarySection';

type SummarySections = {
  summaryCards: SummarySection<SummaryCard>;
  roles: SummarySection<RoleSummary[]>;
  champions: SummarySection<ChampionSummary[]>;
  riskProfile: SummarySection<RiskProfile>;
  narrative: SummarySection<NarrativeSummary>;
};

type SectionKey = keyof SummarySections;

const SECTION_CONTEXT: Record<SectionKey, string> = {
  summaryCards: 'summary cards',
  roles: 'role summaries',
  champions: 'champion summaries',
  riskProfile: 'risk profile',
  narrative: 'narrative',
};

const createInitialSection = <T,>(): SummarySection<T> => ({
  status: 'NOT_STARTED',
  data: null,
});

export interface LastTwentyMatchesSummaryState {
  summaryCards: SummarySection<SummaryCard>;
  roles: SummarySection<RoleSummary[]>;
  champions: SummarySection<ChampionSummary[]>;
  riskProfile: SummarySection<RiskProfile>;
  narrative: SummarySection<NarrativeSummary>;
  loading: boolean;
  error: string | null;
}

export class LastTwentyMatchesSummaryBloc {
  private readonly getSummaryCardsUseCase: GetLastTwentySummaryCardsUseCase;
  private readonly getRoleSummariesUseCase: GetLastTwentyRoleSummariesUseCase;
  private readonly getChampionSummariesUseCase: GetLastTwentyChampionSummariesUseCase;
  private readonly getRiskProfileUseCase: GetLastTwentyRiskProfileUseCase;
  private readonly getNarrativeUseCase: GetLastTwentyNarrativeUseCase;

  constructor(
    getSummaryCardsUseCase: GetLastTwentySummaryCardsUseCase,
    getRoleSummariesUseCase: GetLastTwentyRoleSummariesUseCase,
    getChampionSummariesUseCase: GetLastTwentyChampionSummariesUseCase,
    getRiskProfileUseCase: GetLastTwentyRiskProfileUseCase,
    getNarrativeUseCase: GetLastTwentyNarrativeUseCase,
  ) {
    this.getSummaryCardsUseCase = getSummaryCardsUseCase;
    this.getRoleSummariesUseCase = getRoleSummariesUseCase;
    this.getChampionSummariesUseCase = getChampionSummariesUseCase;
    this.getRiskProfileUseCase = getRiskProfileUseCase;
    this.getNarrativeUseCase = getNarrativeUseCase;
  }

  async loadSummary(
    playerId: string,
    onUpdate?: (partial: Partial<SummarySections>) => void,
  ): Promise<SummarySections> {
  let sections: SummarySections = {
      summaryCards: createInitialSection(),
      roles: createInitialSection(),
      champions: createInitialSection(),
      riskProfile: createInitialSection(),
      narrative: createInitialSection(),
    };

    const fetchers = {
      summaryCards: () => this.getSummaryCardsUseCase.execute(playerId),
      roles: () => this.getRoleSummariesUseCase.execute(playerId),
      champions: () => this.getChampionSummariesUseCase.execute(playerId),
      riskProfile: () => this.getRiskProfileUseCase.execute(playerId),
      narrative: () => this.getNarrativeUseCase.execute(playerId),
    } satisfies {
      summaryCards: () => Promise<SummarySection<SummaryCard>>;
      roles: () => Promise<SummarySection<RoleSummary[]>>;
      champions: () => Promise<SummarySection<ChampionSummary[]>>;
      riskProfile: () => Promise<SummarySection<RiskProfile>>;
      narrative: () => Promise<SummarySection<NarrativeSummary>>;
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
  const [state, setState] = useState<LastTwentyMatchesSummaryState>(() => ({
    summaryCards: createInitialSection(),
    roles: createInitialSection(),
    champions: createInitialSection(),
    riskProfile: createInitialSection(),
    narrative: createInitialSection(),
    loading: true,
    error: null,
  }));

  const mergeSections = useCallback(
    (current: SummarySections, partial: Partial<SummarySections>): SummarySections => ({
      summaryCards: partial.summaryCards ?? current.summaryCards,
      roles: partial.roles ?? current.roles,
      champions: partial.champions ?? current.champions,
      riskProfile: partial.riskProfile ?? current.riskProfile,
      narrative: partial.narrative ?? current.narrative,
    }),
    []
  );

  const computeAggregates = useCallback((sections: SummarySections) => {
    const loading = (Object.values(sections) as SummarySection<unknown>[]).some((section) =>
      isInProgressStatus(section.status)
    );
    const failed = (Object.values(sections) as SummarySection<unknown>[]).find(
      (section) => section.status === 'FAILED'
    );

    return {
      loading,
      error: failed?.message ?? null,
    } as const;
  }, []);

  useEffect(() => {
    let cancelled = false;

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
            riskProfile: prev.riskProfile,
            narrative: prev.narrative,
          };

          const nextSections = mergeSections(currentSections, partial);
          const aggregates = computeAggregates(nextSections);

          return {
            summaryCards: nextSections.summaryCards,
            roles: nextSections.roles,
            champions: nextSections.champions,
            riskProfile: nextSections.riskProfile,
            narrative: nextSections.narrative,
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
            riskProfile: {
              status: 'FAILED',
              data: null,
              message: error instanceof Error ? error.message : 'Failed to load summary',
            },
            narrative: {
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
  }, [bloc, playerId, computeAggregates, mergeSections]);

  return state;
}

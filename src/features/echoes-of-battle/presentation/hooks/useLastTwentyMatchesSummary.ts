import { useMemo } from 'react';
import { useQuery, useIsRestoring } from '@tanstack/react-query';
import type { SummaryCard, RoleSummary, ChampionSummary } from '../../domain/entities/LastTwentyMatchesSummary';
import type { SummarySection } from '../../types/SummarySection';
import { isInProgressStatus } from '../../types/SummarySection';
import type { GetLastTwentySummaryCardsUseCase } from '../../domain/usecases/GetLastTwentySummaryCardsUseCase';
import type { GetLastTwentyRoleSummariesUseCase } from '../../domain/usecases/GetLastTwentyRoleSummariesUseCase';
import type { GetLastTwentyChampionSummariesUseCase } from '../../domain/usecases/GetLastTwentyChampionSummariesUseCase';

const createInitialSection = <T,>(): SummarySection<T> => ({
  status: 'NOT_STARTED',
  data: null,
});

const determineRefetchInterval = <T,>(section: SummarySection<T> | undefined): number | false => {
  if (!section) {
    return 1500;
  }

  return isInProgressStatus(section.status) ? 1500 : false;
};

interface UseCases {
  summaryCards: GetLastTwentySummaryCardsUseCase;
  roles: GetLastTwentyRoleSummariesUseCase;
  champions: GetLastTwentyChampionSummariesUseCase;
}

export interface LastTwentyMatchesSummaryState {
  summaryCards: SummarySection<SummaryCard>;
  roles: SummarySection<RoleSummary[]>;
  champions: SummarySection<ChampionSummary[]>;
  loading: boolean;
  error: string | null;
  isRestoring: boolean;
}

export const useLastTwentyMatchesSummary = (
  playerId: string | null,
  useCases: UseCases,
): LastTwentyMatchesSummaryState => {
  const enabled = Boolean(playerId);
  const queryKeys = useMemo(() => ({
    summaryCards: ['lastTwenty', playerId, 'summaryCards'] as const,
    roles: ['lastTwenty', playerId, 'roles'] as const,
    champions: ['lastTwenty', playerId, 'champions'] as const,
  }), [playerId]);

  const summaryCardsQuery = useQuery({
    queryKey: queryKeys.summaryCards,
    queryFn: () => useCases.summaryCards.execute(playerId!),
    enabled,
    placeholderData: (previous) => previous,
    refetchInterval: (query) => determineRefetchInterval(query.state.data),
    meta: {
      cacheLabel: 'Summary Cards',
    },
  });

  const rolesQuery = useQuery({
    queryKey: queryKeys.roles,
    queryFn: () => useCases.roles.execute(playerId!),
    enabled,
    placeholderData: (previous) => previous,
    refetchInterval: (query) => determineRefetchInterval(query.state.data),
    meta: {
      cacheLabel: 'Role Summaries',
    },
  });

  const championsQuery = useQuery({
    queryKey: queryKeys.champions,
    queryFn: () => useCases.champions.execute(playerId!),
    enabled,
    placeholderData: (previous) => previous,
    refetchInterval: (query) => determineRefetchInterval(query.state.data),
    meta: {
      cacheLabel: 'Champion Summaries',
    },
  });

  const sections = {
    summaryCards: summaryCardsQuery.data ?? createInitialSection<SummaryCard>(),
    roles: rolesQuery.data ?? createInitialSection<RoleSummary[]>(),
    champions: championsQuery.data ?? createInitialSection<ChampionSummary[]>(),
  } as const;
  
  const queries = [summaryCardsQuery, rolesQuery, championsQuery];

  const isRestoring = useIsRestoring();

  const initialLoadsPending = queries.some((query) => query.isLoading || (!query.data && query.fetchStatus === 'fetching'));

  const loading = isRestoring
    || initialLoadsPending
    || (Object.values(sections) as SummarySection<unknown>[]).some((section) =>
      isInProgressStatus(section.status),
    );

  const failedSection = queries.find((query) => {
    if (query.data && query.data.status === 'FAILED') {
      return true;
    }

    if (!query.data && query.error) {
      return true;
    }

    return false;
  });

  const errorMessage = failedSection
    ? failedSection.data?.message ?? (failedSection.error instanceof Error ? failedSection.error.message : 'Failed to load summary')
    : null;

  return {
    ...sections,
    loading,
    error: errorMessage,
    isRestoring,
  };
};

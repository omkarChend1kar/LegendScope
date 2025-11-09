import React, { useMemo } from 'react';
import { LastTwentyMatchesSummaryDashboard } from './LastTwentyMatchesSummaryDashboard';
import { EchoesOfBattleRepositoryImpl } from '../../data/repositories/EchoesOfBattleRepository';
import { GetLastTwentySummaryCardsUseCase } from '../../domain/usecases/GetLastTwentySummaryCardsUseCase';
import { GetLastTwentyRoleSummariesUseCase } from '../../domain/usecases/GetLastTwentyRoleSummariesUseCase';
import { GetLastTwentyChampionSummariesUseCase } from '../../domain/usecases/GetLastTwentyChampionSummariesUseCase';
import { useLastTwentyMatchesSummary } from '../hooks/useLastTwentyMatchesSummary';

interface LastTwentyMatchesSummarySectionProps {
  playerId: string;
}

export const LastTwentyMatchesSummarySection: React.FC<LastTwentyMatchesSummarySectionProps> = ({
  playerId,
}) => {
  const useMockEchoesData = (import.meta.env.VITE_EOB_USE_MOCK_DATA ?? 'false') === 'true';

  const useCases = useMemo(() => {
    const repository = new EchoesOfBattleRepositoryImpl(useMockEchoesData);

    return {
      summaryCards: new GetLastTwentySummaryCardsUseCase(repository),
      roles: new GetLastTwentyRoleSummariesUseCase(repository),
      champions: new GetLastTwentyChampionSummariesUseCase(repository),
    } as const;
  }, [useMockEchoesData]);

  const summaryState = useLastTwentyMatchesSummary(playerId, useCases);

  return (
    <LastTwentyMatchesSummaryDashboard
      summaryCards={summaryState.summaryCards}
      roles={summaryState.roles}
      champions={summaryState.champions}
    />
  );
};

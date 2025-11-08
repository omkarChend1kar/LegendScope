import React, { useMemo } from 'react';
import { LastTwentyMatchesSummaryDashboard } from './LastTwentyMatchesSummaryDashboard';
import { EchoesOfBattleRepositoryImpl } from '../../data/repositories/EchoesOfBattleRepository';
import { LastTwentyMatchesSummaryBloc, useLastTwentyMatchesSummaryBloc } from '../bloc/LastTwentyMatchesSummaryBloc';
import { GetLastTwentySummaryCardsUseCase } from '../../domain/usecases/GetLastTwentySummaryCardsUseCase';
import { GetLastTwentyRoleSummariesUseCase } from '../../domain/usecases/GetLastTwentyRoleSummariesUseCase';
import { GetLastTwentyChampionSummariesUseCase } from '../../domain/usecases/GetLastTwentyChampionSummariesUseCase';
import { GetLastTwentyRiskProfileUseCase } from '../../domain/usecases/GetLastTwentyRiskProfileUseCase';
import { GetLastTwentyNarrativeUseCase } from '../../domain/usecases/GetLastTwentyNarrativeUseCase';

interface LastTwentyMatchesSummarySectionProps {
  playerId: string;
}

export const LastTwentyMatchesSummarySection: React.FC<LastTwentyMatchesSummarySectionProps> = ({
  playerId,
}) => {
  const useMockEchoesData = (import.meta.env.VITE_EOB_USE_MOCK_DATA ?? 'false') === 'true';

  const summaryBloc = useMemo(() => {
    const repository = new EchoesOfBattleRepositoryImpl(useMockEchoesData);

    return new LastTwentyMatchesSummaryBloc(
      new GetLastTwentySummaryCardsUseCase(repository),
      new GetLastTwentyRoleSummariesUseCase(repository),
      new GetLastTwentyChampionSummariesUseCase(repository),
      new GetLastTwentyRiskProfileUseCase(repository),
      new GetLastTwentyNarrativeUseCase(repository),
    );
  }, [useMockEchoesData]);

  const summaryState = useLastTwentyMatchesSummaryBloc(summaryBloc, playerId);

  return (
    <LastTwentyMatchesSummaryDashboard
      summaryCards={summaryState.summaryCards}
      roles={summaryState.roles}
      champions={summaryState.champions}
      riskProfile={summaryState.riskProfile}
      narrative={summaryState.narrative}
    />
  );
};

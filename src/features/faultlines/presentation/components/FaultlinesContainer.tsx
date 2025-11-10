import React, { useMemo } from 'react';
import { FaultlinesRepositoryImpl } from '../../data/repositories/FaultlinesRepository';
import { GetFaultlinesSummaryUseCase } from '../../domain/usecases/GetFaultlinesSummaryUseCase';
import { FaultlinesSummaryBloc } from '../bloc/FaultlinesSummaryBloc';
import { useFaultlinesSummary } from '../hooks/useFaultlinesSummary';
import { FaultlinesDashboard } from './FaultlinesDashboard';

interface FaultlinesContainerProps {
  playerId: string | null;
  onSync?: () => Promise<void>;
  lastSyncTime?: Date | null;
}

export const FaultlinesContainer: React.FC<FaultlinesContainerProps> = ({ playerId, onSync, lastSyncTime }) => {
  const repository = useMemo(() => new FaultlinesRepositoryImpl(), []);
  const summaryUseCase = useMemo(() => new GetFaultlinesSummaryUseCase(repository), [repository]);
  const bloc = useMemo(() => new FaultlinesSummaryBloc(summaryUseCase), [summaryUseCase]);

  const { summary, loading, error, status, message } = useFaultlinesSummary(bloc, playerId);

  if (!playerId) {
    return (
      <FaultlinesDashboard
        summary={null}
        loading={false}
        error="Link your Summoner profile to expose your structural faultlines."
        status="NOT_STARTED"
        message={null}
        onSync={onSync}
        lastSyncTime={lastSyncTime}
      />
    );
  }

  return (
    <FaultlinesDashboard
      summary={summary}
      loading={loading}
      error={error}
      status={status}
      message={message}
      onSync={onSync}
      lastSyncTime={lastSyncTime}
    />
  );
};

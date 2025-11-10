import React, { useMemo } from 'react';
import { PatternsRepositoryImpl } from '../../data/repositories/PatternsRepository';
import { GetPatternsSummaryUseCase } from '../../domain/usecases/GetPatternsSummaryUseCase';
import { PatternsSummaryBloc } from '../bloc/PatternsSummaryBloc';
import { usePatternsSummary } from '../hooks/usePatternsSummary';
import { PatternsBeneathChaosDashboard } from './PatternsBeneathChaosDashboard';

interface PatternsBeneathChaosContainerProps {
    playerId: string | null;
    onSync?: () => Promise<void>;
    lastSyncTime?: Date | null;
}

export const PatternsBeneathChaosContainer: React.FC<PatternsBeneathChaosContainerProps> = ({
    playerId,
    onSync,
    lastSyncTime,
}) => {
    const useMockData = (import.meta.env.VITE_PATTERNS_USE_MOCK_DATA ?? 'false') === 'true';
    const repository = useMemo(() => new PatternsRepositoryImpl(useMockData), [useMockData]);
    const summaryUseCase = useMemo(() => new GetPatternsSummaryUseCase(repository), [repository]);
    const summaryBloc = useMemo(() => new PatternsSummaryBloc(summaryUseCase), [summaryUseCase]);

    const { summary, loading, error, status, message } = usePatternsSummary(summaryBloc, playerId);

    if (!playerId) {
        return (
            <PatternsBeneathChaosDashboard
                summary={null}
                loading={false}
                error="Link your Summoner profile to unlock deep-pattern analysis."
                status="NOT_STARTED"
                message={null}
                onSync={onSync}
                lastSyncTime={lastSyncTime}
            />
        );
    }

    return (
        <PatternsBeneathChaosDashboard
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

import { useEffect, useRef, useState } from 'react';
import type { PatternsSummary } from '../../domain/entities/PatternsSummary';
import type { BackendStatus } from '../../../../types/BackendStatus';
import type { SummarySection } from '../../../../types/SummarySection';
import { isInProgressStatus } from '../../../../types/SummarySection';
import { PatternsSummaryBloc } from '../bloc/PatternsSummaryBloc';

export interface PatternsSummaryState {
  status: BackendStatus;
  loading: boolean;
  error: string | null;
  summary: PatternsSummary | null;
  message: string | null;
}

const createInitialSection = (): SummarySection<PatternsSummary> => ({
  status: 'NOT_STARTED',
  data: null,
});

export const usePatternsSummary = (
  bloc: PatternsSummaryBloc,
  playerId: string | null,
): PatternsSummaryState => {
  const [section, setSection] = useState<SummarySection<PatternsSummary>>(createInitialSection);
  const previousPlayerIdRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (!playerId) {
      setSection({
        status: 'FAILED',
        data: null,
        message: 'Player identifier is missing. Connect your Summoner profile to continue.',
      });
      return () => {
        cancelled = true;
      };
    }

    setSection({
      status: 'FETCHING',
      data: null,
    });

    const load = async () => {
      try {
        const finalSection = await bloc.loadSummary(playerId, (snapshot) => {
          if (cancelled) {
            return;
          }

          setSection(snapshot);
        });

        if (!cancelled) {
          setSection(finalSection);
        }
      } catch (error) {
        if (!cancelled) {
          setSection({
            status: 'FAILED',
            data: null,
            message: error instanceof Error
              ? error.message
              : 'Failed to load signature playstyle summary.',
          });
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, [bloc, playerId]);

  useEffect(() => {
    const previousPlayerId = previousPlayerIdRef.current;

    if (previousPlayerId && previousPlayerId !== playerId) {
      void bloc.clearCachedSummary(previousPlayerId);
    }

    previousPlayerIdRef.current = playerId;
  }, [bloc, playerId]);

  const loading = isInProgressStatus(section.status);
  const error = section.status === 'FAILED'
    ? section.message ?? 'Failed to load signature playstyle summary.'
    : null;

  return {
    status: section.status,
    loading,
    error,
    summary: section.data,
    message: section.message ?? null,
  };
};

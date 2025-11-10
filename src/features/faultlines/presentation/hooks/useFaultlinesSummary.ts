import { useEffect, useRef, useState } from 'react';
import type { BackendStatus } from '../../../../types/BackendStatus';
import type { SummarySection } from '../../../../types/SummarySection';
import { isInProgressStatus } from '../../../../types/SummarySection';
import type { FaultlinesSummary } from '../../domain/entities/FaultlinesSummary';
import { FaultlinesSummaryBloc } from '../bloc/FaultlinesSummaryBloc';

export interface FaultlinesSummaryState {
  status: BackendStatus;
  loading: boolean;
  error: string | null;
  summary: FaultlinesSummary | null;
  message: string | null;
}

const createInitialSection = (): SummarySection<FaultlinesSummary> => ({
  status: 'NOT_STARTED',
  data: null,
});

export const useFaultlinesSummary = (
  bloc: FaultlinesSummaryBloc,
  playerId: string | null,
): FaultlinesSummaryState => {
  const [section, setSection] = useState<SummarySection<FaultlinesSummary>>(createInitialSection);
  const previousPlayerIdRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (!playerId) {
      setSection({
        status: 'FAILED',
        data: null,
        message: 'Link your Summoner profile to surface structural Faultlines.',
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
              : 'Failed to load Faultlines diagnostic.',
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
    ? section.message ?? 'Failed to load Faultlines diagnostic.'
    : null;

  return {
    status: section.status,
    loading,
    error,
    summary: section.data,
    message: section.message ?? null,
  };
};

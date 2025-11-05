import { useState, useEffect } from 'react';
import type { Timeline } from '../../domain/entities/Timeline';
import { GetTimelineUseCase } from '../../domain/usecases/GetTimelineUseCase';

export interface TimelineState {
  timeline: Timeline | null;
  loading: boolean;
  error: string | null;
}

export class TimelineBloc {
  private getTimelineUseCase: GetTimelineUseCase;

  constructor(getTimelineUseCase: GetTimelineUseCase) {
    this.getTimelineUseCase = getTimelineUseCase;
  }

  async loadTimeline(playerId: string): Promise<Timeline> {
    return await this.getTimelineUseCase.execute(playerId);
  }
}

export function useTimelineBloc(
  bloc: TimelineBloc,
  playerId: string
): TimelineState {
  const [state, setState] = useState<TimelineState>({
    timeline: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const timeline = await bloc.loadTimeline(playerId);
        
        if (!cancelled) {
          setState({ timeline, loading: false, error: null });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            timeline: null,
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to load timeline',
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

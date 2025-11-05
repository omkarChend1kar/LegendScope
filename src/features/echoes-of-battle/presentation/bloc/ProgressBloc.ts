import { useState, useEffect } from 'react';
import type { Progress } from '../../domain/entities/Progress';
import { GetProgressUseCase } from '../../domain/usecases/GetProgressUseCase';

export interface ProgressState {
  progress: Progress | null;
  loading: boolean;
  error: string | null;
}

export class ProgressBloc {
  private getProgressUseCase: GetProgressUseCase;

  constructor(getProgressUseCase: GetProgressUseCase) {
    this.getProgressUseCase = getProgressUseCase;
  }

  async loadProgress(playerId: string): Promise<Progress> {
    return await this.getProgressUseCase.execute(playerId);
  }
}

export function useProgressBloc(
  bloc: ProgressBloc,
  playerId: string
): ProgressState {
  const [state, setState] = useState<ProgressState>({
    progress: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const progress = await bloc.loadProgress(playerId);
        
        if (!cancelled) {
          setState({ progress, loading: false, error: null });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            progress: null,
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to load progress',
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

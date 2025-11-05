import { useState, useEffect } from 'react';
import type { DefiningMatch } from '../../domain/entities/DefiningMatch';
import { GetDefiningMatchUseCase } from '../../domain/usecases/GetDefiningMatchUseCase';

export interface DefiningMatchState {
  match: DefiningMatch | null;
  loading: boolean;
  error: string | null;
}

export class DefiningMatchBloc {
  private getDefiningMatchUseCase: GetDefiningMatchUseCase;

  constructor(getDefiningMatchUseCase: GetDefiningMatchUseCase) {
    this.getDefiningMatchUseCase = getDefiningMatchUseCase;
  }

  async loadDefiningMatch(playerId: string): Promise<DefiningMatch> {
    return await this.getDefiningMatchUseCase.execute(playerId);
  }
}

export function useDefiningMatchBloc(
  bloc: DefiningMatchBloc,
  playerId: string
): DefiningMatchState {
  const [state, setState] = useState<DefiningMatchState>({
    match: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const match = await bloc.loadDefiningMatch(playerId);
        
        if (!cancelled) {
          setState({ match, loading: false, error: null });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            match: null,
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to load match',
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

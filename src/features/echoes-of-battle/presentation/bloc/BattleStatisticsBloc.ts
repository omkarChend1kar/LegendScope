import { useState, useEffect } from 'react';
import type { BattleStatistics } from '../../domain/entities/BattleStatistics';
import { GetBattleStatisticsUseCase } from '../../domain/usecases/GetBattleStatisticsUseCase';

export interface BattleStatisticsState {
  statistics: BattleStatistics | null;
  loading: boolean;
  error: string | null;
}

export class BattleStatisticsBloc {
  private getBattleStatisticsUseCase: GetBattleStatisticsUseCase;

  constructor(getBattleStatisticsUseCase: GetBattleStatisticsUseCase) {
    this.getBattleStatisticsUseCase = getBattleStatisticsUseCase;
  }

  async loadStatistics(playerId: string): Promise<BattleStatistics> {
    return await this.getBattleStatisticsUseCase.execute(playerId);
  }
}

export function useBattleStatisticsBloc(
  bloc: BattleStatisticsBloc,
  playerId: string
): BattleStatisticsState {
  const [state, setState] = useState<BattleStatisticsState>({
    statistics: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const statistics = await bloc.loadStatistics(playerId);
        
        if (!cancelled) {
          setState({ statistics, loading: false, error: null });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            statistics: null,
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to load statistics',
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

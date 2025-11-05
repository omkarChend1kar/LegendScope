import { useState, useEffect } from 'react';
import type { ChampionDistribution } from '../../domain/entities/ChampionDistribution';
import type { RoleDistribution } from '../../domain/entities/RoleDistribution';
import { GetChampionDistributionUseCase } from '../../domain/usecases/GetChampionDistributionUseCase';
import { GetRoleDistributionUseCase } from '../../domain/usecases/GetRoleDistributionUseCase';

export interface DistributionState {
  championDistribution: ChampionDistribution | null;
  roleDistribution: RoleDistribution | null;
  loading: boolean;
  error: string | null;
}

export class DistributionBloc {
  private getChampionDistributionUseCase: GetChampionDistributionUseCase;
  private getRoleDistributionUseCase: GetRoleDistributionUseCase;

  constructor(
    getChampionDistributionUseCase: GetChampionDistributionUseCase,
    getRoleDistributionUseCase: GetRoleDistributionUseCase
  ) {
    this.getChampionDistributionUseCase = getChampionDistributionUseCase;
    this.getRoleDistributionUseCase = getRoleDistributionUseCase;
  }

  async loadDistributions(playerId: string): Promise<{
    championDistribution: ChampionDistribution;
    roleDistribution: RoleDistribution;
  }> {
    const [championDistribution, roleDistribution] = await Promise.all([
      this.getChampionDistributionUseCase.execute(playerId),
      this.getRoleDistributionUseCase.execute(playerId),
    ]);

    return { championDistribution, roleDistribution };
  }
}

export function useDistributionBloc(
  bloc: DistributionBloc,
  playerId: string
): DistributionState {
  const [state, setState] = useState<DistributionState>({
    championDistribution: null,
    roleDistribution: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        const { championDistribution, roleDistribution } = await bloc.loadDistributions(playerId);
        
        if (!cancelled) {
          setState({
            championDistribution,
            roleDistribution,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            championDistribution: null,
            roleDistribution: null,
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to load distributions',
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

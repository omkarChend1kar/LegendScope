import type { EchoesOfBattleRepository } from '../../data/repositories/EchoesOfBattleRepository';
import { ChampionDistribution } from '../entities/ChampionDistribution';

export class GetChampionDistributionUseCase {
  private repository: EchoesOfBattleRepository;

  constructor(repository: EchoesOfBattleRepository) {
    this.repository = repository;
  }

  async execute(playerId: string): Promise<ChampionDistribution> {
    const model = await this.repository.getChampionDistribution(playerId);
    
    return new ChampionDistribution(
      model.champions,
      model.totalGames
    );
  }
}

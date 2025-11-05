import type { EchoesOfBattleRepository } from '../../data/repositories/EchoesOfBattleRepository';
import { BattleStatistics } from '../entities/BattleStatistics';

export class GetBattleStatisticsUseCase {
  private repository: EchoesOfBattleRepository;

  constructor(repository: EchoesOfBattleRepository) {
    this.repository = repository;
  }

  async execute(playerId: string): Promise<BattleStatistics> {
    const model = await this.repository.getBattleStatistics(playerId);
    
    return new BattleStatistics(
      model.battles,
      model.victories,
      model.gloryMoments,
      model.kda,
      model.winStreak,
      model.totalGames,
      model.pentakills,
      model.avgWards,
      model.objectives,
      model.comebackPercentage,
      model.consistencyIndex
    );
  }
}

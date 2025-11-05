import type { EchoesOfBattleRepository } from '../../data/repositories/EchoesOfBattleRepository';
import { Progress } from '../entities/Progress';

export class GetProgressUseCase {
  private repository: EchoesOfBattleRepository;

  constructor(repository: EchoesOfBattleRepository) {
    this.repository = repository;
  }

  async execute(playerId: string): Promise<Progress> {
    const model = await this.repository.getProgressData(playerId);
    
    return new Progress(
      model.metrics,
      model.comparisonPeriod
    );
  }
}

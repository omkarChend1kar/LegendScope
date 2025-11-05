import type { EchoesOfBattleRepository } from '../../data/repositories/EchoesOfBattleRepository';
import { Timeline } from '../entities/Timeline';

export class GetTimelineUseCase {
  private repository: EchoesOfBattleRepository;

  constructor(repository: EchoesOfBattleRepository) {
    this.repository = repository;
  }

  async execute(playerId: string): Promise<Timeline> {
    const model = await this.repository.getTimelineData(playerId);
    
    return new Timeline(
      model.dataPoints,
      model.peakMonth,
      model.lowestMonth,
      model.narrative
    );
  }
}

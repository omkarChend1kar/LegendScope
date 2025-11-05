import type { EchoesOfBattleRepository } from '../../data/repositories/EchoesOfBattleRepository';
import { DefiningMatch } from '../entities/DefiningMatch';

export class GetDefiningMatchUseCase {
  private repository: EchoesOfBattleRepository;

  constructor(repository: EchoesOfBattleRepository) {
    this.repository = repository;
  }

  async execute(playerId: string): Promise<DefiningMatch> {
    const model = await this.repository.getDefiningMatch(playerId);
    
    return new DefiningMatch(
      model.championName,
      model.kills,
      model.deaths,
      model.assists,
      model.date,
      model.damage,
      model.gameMode
    );
  }
}

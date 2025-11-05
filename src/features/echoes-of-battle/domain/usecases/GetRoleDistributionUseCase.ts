import type { EchoesOfBattleRepository } from '../../data/repositories/EchoesOfBattleRepository';
import { RoleDistribution } from '../entities/RoleDistribution';

export class GetRoleDistributionUseCase {
  private repository: EchoesOfBattleRepository;

  constructor(repository: EchoesOfBattleRepository) {
    this.repository = repository;
  }

  async execute(playerId: string): Promise<RoleDistribution> {
    const model = await this.repository.getRoleDistribution(playerId);
    
    return new RoleDistribution(model.roles);
  }
}

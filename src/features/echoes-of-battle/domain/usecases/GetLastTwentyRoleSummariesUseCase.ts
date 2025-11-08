import type { EchoesOfBattleRepository } from '../../data/repositories/EchoesOfBattleRepository';
import type { RoleSummaryModel } from '../../data/models/lastTwenty/RoleSummaryModel';
import type { RoleSummary } from '../entities/LastTwentyMatchesSummary';
import type { SummarySection } from '../../types/SummarySection';

export class GetLastTwentyRoleSummariesUseCase {
  private readonly repository: EchoesOfBattleRepository;

  constructor(repository: EchoesOfBattleRepository) {
    this.repository = repository;
  }

  async execute(playerId: string): Promise<SummarySection<RoleSummary[]>> {
    const section = await this.repository.getLastTwentyRoleSummaries(playerId);
    return this.mapSection(section);
  }

  private mapSection(section: SummarySection<RoleSummaryModel[]>): SummarySection<RoleSummary[]> {
    return {
      status: section.status,
      data: section.data
        ? section.data.map((role) => ({
            role: role.role,
            games: role.games,
            claims: role.claims,
            falls: role.falls,
            winRate: role.winRate,
            averageKda: role.averageKda,
            firstBloodRate: role.firstBloodRate,
            visionScore: role.visionScore,
            goldPerMinute: role.goldPerMinute,
          }))
        : null,
      message: section.message,
    };
  }
}

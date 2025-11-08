import type { EchoesOfBattleRepository } from '../../data/repositories/EchoesOfBattleRepository';
import type { RiskProfileModel } from '../../data/models/lastTwenty/RiskProfileModel';
import type { RiskProfile } from '../entities/LastTwentyMatchesSummary';
import type { SummarySection } from '../../types/SummarySection';

export class GetLastTwentyRiskProfileUseCase {
  private readonly repository: EchoesOfBattleRepository;

  constructor(repository: EchoesOfBattleRepository) {
    this.repository = repository;
  }

  async execute(playerId: string): Promise<SummarySection<RiskProfile>> {
    const section = await this.repository.getLastTwentyRiskProfile(playerId);
    return this.mapSection(section);
  }

  private mapSection(section: SummarySection<RiskProfileModel>): SummarySection<RiskProfile> {
    return {
      status: section.status,
      data: section.data
        ? {
            earlyAggression: section.data.earlyAggression,
            earlyFalls: section.data.earlyFalls,
            objectiveControl: section.data.objectiveControl,
            visionCommitment: section.data.visionCommitment,
            narrative: section.data.narrative,
          }
        : null,
      message: section.message,
    };
  }
}

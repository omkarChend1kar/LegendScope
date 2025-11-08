import type { EchoesOfBattleRepository } from '../../data/repositories/EchoesOfBattleRepository';
import type { NarrativeSummaryModel } from '../../data/models/lastTwenty/NarrativeSummaryModel';
import type { NarrativeSummary } from '../entities/LastTwentyMatchesSummary';
import type { SummarySection } from '../../types/SummarySection';

export class GetLastTwentyNarrativeUseCase {
  private readonly repository: EchoesOfBattleRepository;

  constructor(repository: EchoesOfBattleRepository) {
    this.repository = repository;
  }

  async execute(playerId: string): Promise<SummarySection<NarrativeSummary>> {
    const section = await this.repository.getLastTwentyNarrative(playerId);
    return this.mapSection(section);
  }

  private mapSection(
    section: SummarySection<NarrativeSummaryModel>,
  ): SummarySection<NarrativeSummary> {
    return {
      status: section.status,
      data: section.data
        ? {
            headline: section.data.headline,
            body: section.data.body,
          }
        : null,
      message: section.message,
    };
  }
}

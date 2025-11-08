import type { EchoesOfBattleRepository } from '../../data/repositories/EchoesOfBattleRepository';
import type { SummaryCardsModel } from '../../data/models/lastTwenty/SummaryCardsModel';
import type { SummaryCard } from '../entities/LastTwentyMatchesSummary';
import type { SummarySection } from '../../types/SummarySection';

export class GetLastTwentySummaryCardsUseCase {
  private readonly repository: EchoesOfBattleRepository;

  constructor(repository: EchoesOfBattleRepository) {
    this.repository = repository;
  }

  async execute(playerId: string): Promise<SummarySection<SummaryCard>> {
    const section = await this.repository.getLastTwentySummaryCards(playerId);
    return this.mapSection(section);
  }

  private mapSection(section: SummarySection<SummaryCardsModel>): SummarySection<SummaryCard> {
    return {
      status: section.status,
      data: section.data
        ? {
            battlesFought: section.data.battlesFought,
            claims: section.data.claims,
            falls: section.data.falls,
            claimFallRatio: section.data.claimFallRatio,
            longestClaimStreak: section.data.longestClaimStreak,
            longestFallStreak: section.data.longestFallStreak,
            clutchGames: section.data.clutchGames,
            surrenderRate: section.data.surrenderRate,
            averageMatchDuration: section.data.averageMatchDuration,
          }
        : null,
      message: section.message,
    };
  }
}

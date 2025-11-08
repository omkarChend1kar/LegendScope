import type { EchoesOfBattleRepository } from '../../data/repositories/EchoesOfBattleRepository';
import type { ChampionSummaryModel } from '../../data/models/lastTwenty/ChampionSummaryModel';
import type { ChampionSummary } from '../entities/LastTwentyMatchesSummary';
import type { SummarySection } from '../../types/SummarySection';

export class GetLastTwentyChampionSummariesUseCase {
  private readonly repository: EchoesOfBattleRepository;

  constructor(repository: EchoesOfBattleRepository) {
    this.repository = repository;
  }

  async execute(playerId: string): Promise<SummarySection<ChampionSummary[]>> {
    const section = await this.repository.getLastTwentyChampionSummaries(playerId);
    return this.mapSection(section);
  }

  private mapSection(
    section: SummarySection<ChampionSummaryModel[]>,
  ): SummarySection<ChampionSummary[]> {
    return {
      status: section.status,
      data: section.data
        ? section.data.map((champion) => ({
            name: champion.name,
            games: champion.games,
            claims: champion.claims,
            winRate: champion.winRate,
            color: champion.color,
          }))
        : null,
      message: section.message,
    };
  }
}

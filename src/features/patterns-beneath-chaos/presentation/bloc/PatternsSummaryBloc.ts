import { isInProgressStatus } from '../../../../types/SummarySection';
import type { SummarySection } from '../../../../types/SummarySection';
import type { PatternsSummary } from '../../domain/entities/PatternsSummary';
import { GetPatternsSummaryUseCase } from '../../domain/usecases/GetPatternsSummaryUseCase';

export class PatternsSummaryBloc {
  private readonly getSummaryUseCase: GetPatternsSummaryUseCase;

  constructor(getSummaryUseCase: GetPatternsSummaryUseCase) {
    this.getSummaryUseCase = getSummaryUseCase;
  }

  async loadSummary(
    playerId: string,
    onUpdate?: (section: SummarySection<PatternsSummary>) => void,
  ): Promise<SummarySection<PatternsSummary>> {
    const maxAttempts = 10;
    const pollingDelayMs = 1500;
    let attempt = 0;

    let latest = await this.safeExecute(playerId, onUpdate);

    while (isInProgressStatus(latest.status) && attempt < maxAttempts - 1) {
      attempt += 1;
      await this.delay(pollingDelayMs);

      latest = await this.safeExecute(playerId, onUpdate);

      if (!isInProgressStatus(latest.status)) {
        return latest;
      }
    }

    if (isInProgressStatus(latest.status)) {
      return this.createFailedSection('Timed out waiting for signature playstyle summary.', onUpdate);
    }

    return latest;
  }

  private async safeExecute(
    playerId: string,
    onUpdate?: (section: SummarySection<PatternsSummary>) => void,
  ): Promise<SummarySection<PatternsSummary>> {
    try {
      const result = await this.getSummaryUseCase.execute(playerId);
      onUpdate?.(result);
      return result;
    } catch (error) {
      const failed = this.createFailedSection(
        error instanceof Error ? error.message : 'Failed to load signature playstyle summary.',
        onUpdate,
      );
      return failed;
    }
  }

  private createFailedSection(
    message: string,
    onUpdate?: (section: SummarySection<PatternsSummary>) => void,
  ): SummarySection<PatternsSummary> {
    const failed: SummarySection<PatternsSummary> = {
      status: 'FAILED',
      data: null,
      message,
    };
    onUpdate?.(failed);
    return failed;
  }

  private async delay(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  async clearCachedSummary(playerId: string): Promise<void> {
    await this.getSummaryUseCase.clearCachedSummary(playerId);
  }
}

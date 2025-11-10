import { isInProgressStatus } from '../../../../types/SummarySection';
import type { SummarySection } from '../../../../types/SummarySection';
import type { FaultlinesSummary } from '../../domain/entities/FaultlinesSummary';
import { GetFaultlinesSummaryUseCase } from '../../domain/usecases/GetFaultlinesSummaryUseCase';

export class FaultlinesSummaryBloc {
  private readonly getSummaryUseCase: GetFaultlinesSummaryUseCase;

  constructor(getSummaryUseCase: GetFaultlinesSummaryUseCase) {
    this.getSummaryUseCase = getSummaryUseCase;
  }

  async loadSummary(
    playerId: string,
    onUpdate?: (section: SummarySection<FaultlinesSummary>) => void,
  ): Promise<SummarySection<FaultlinesSummary>> {
    const maxAttempts = 10;
    const pollingDelayMs = 1500;

    let attempt = 0;
    let latest = await this.safeExecute(playerId, onUpdate);

    while (isInProgressStatus(latest.status) && attempt < maxAttempts - 1) {
      attempt += 1;
      await this.delay(pollingDelayMs);
      latest = await this.safeExecute(playerId, onUpdate);
    }

    if (isInProgressStatus(latest.status)) {
      return this.createFailedSection('Timed out waiting for Faultlines summary.', onUpdate);
    }

    return latest;
  }

  private async safeExecute(
    playerId: string,
    onUpdate?: (section: SummarySection<FaultlinesSummary>) => void,
  ): Promise<SummarySection<FaultlinesSummary>> {
    try {
      const result = await this.getSummaryUseCase.execute(playerId);
      onUpdate?.(result);
      return result;
    } catch (error) {
      return this.createFailedSection(
        error instanceof Error ? error.message : 'Failed to load Faultlines summary.',
        onUpdate,
      );
    }
  }

  private createFailedSection(
    message: string,
    onUpdate?: (section: SummarySection<FaultlinesSummary>) => void,
  ): SummarySection<FaultlinesSummary> {
    const failed: SummarySection<FaultlinesSummary> = {
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

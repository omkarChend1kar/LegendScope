import type { SummarySection } from '../../../../types/SummarySection';
import type { FaultlinesSummaryModel } from '../models/FaultlinesSummaryModel';
import { FaultlinesRemoteDataSource } from '../datasources/remote/FaultlinesRemoteDataSource';
import { FaultlinesMockDataSource } from '../datasources/local/FaultlinesMockDataSource';
import { FaultlinesLocalDataSource } from '../datasources/local/FaultlinesLocalDataSource';

export interface FaultlinesRepository {
  getFaultlinesSummary(playerId: string): Promise<SummarySection<FaultlinesSummaryModel>>;
  clearCachedSummary(playerId: string): Promise<void>;
}

export class FaultlinesRepositoryImpl implements FaultlinesRepository {
  private readonly useMockData: boolean;
  private readonly remoteDataSource: FaultlinesRemoteDataSource;
  private readonly mockDataSource: FaultlinesMockDataSource;
  private readonly localDataSource: FaultlinesLocalDataSource;
  private readonly summarySync: Map<string, Promise<void>>;

  constructor(
    useMockData: boolean = import.meta.env.VITE_FAULTLINES_USE_MOCK === 'true',
    dependencies?: {
      remoteDataSource?: FaultlinesRemoteDataSource;
      mockDataSource?: FaultlinesMockDataSource;
      localDataSource?: FaultlinesLocalDataSource;
    },
  ) {
    this.useMockData = useMockData;
    this.remoteDataSource = dependencies?.remoteDataSource ?? new FaultlinesRemoteDataSource();
    this.mockDataSource = dependencies?.mockDataSource ?? new FaultlinesMockDataSource();
    this.localDataSource = dependencies?.localDataSource ?? new FaultlinesLocalDataSource();
    this.summarySync = new Map();
  }

  async getFaultlinesSummary(playerId: string): Promise<SummarySection<FaultlinesSummaryModel>> {
    if (!playerId) {
      throw new Error('Player identifier is required to retrieve faultlines summary.');
    }

    if (this.useMockData) {
      const section = await this.mockDataSource.fetchSummary(playerId);
      await this.localDataSource.saveSummary(playerId, section);
      return section;
    }

    return this.requestWithSync(playerId);
  }

  async clearCachedSummary(playerId: string): Promise<void> {
    this.summarySync.delete(playerId);
    await this.localDataSource.deleteSummary(playerId);
  }

  private async requestWithSync(playerId: string): Promise<SummarySection<FaultlinesSummaryModel>> {
    let localSection = await this.localDataSource.getSummary(playerId);

    if (this.shouldStartSync(localSection) && !this.summarySync.has(playerId)) {
      const markPromise = this.markSummaryFetching(playerId);

      const syncPromise = markPromise
        .then(() => this.remoteDataSource.fetchSummary(playerId))
        .then(async (remoteSection) => {
          await this.localDataSource.saveSummary(playerId, remoteSection);
        })
        .catch(async (error) => {
          const failed = this.createFailedSectionFromError(error);
          await this.localDataSource.saveSummary(playerId, failed);
        })
        .finally(() => {
          this.summarySync.delete(playerId);
        });

      this.summarySync.set(playerId, syncPromise);
      localSection = await markPromise;
    }

    return localSection;
  }

  private shouldStartSync(section: SummarySection<unknown>): boolean {
    const status = typeof section.status === 'string' ? section.status.toUpperCase() : section.status;

    if (!status) {
      return true;
    }

    if (status === 'READY' && section.data) {
      return false;
    }

    return true;
  }

  private async markSummaryFetching(
    playerId: string,
  ): Promise<SummarySection<FaultlinesSummaryModel>> {
    return this.localDataSource.updateSummary(playerId, (section) => this.toFetchingSection(section));
  }

  private toFetchingSection(
    section: SummarySection<FaultlinesSummaryModel>,
  ): SummarySection<FaultlinesSummaryModel> {
    return {
      ...section,
      status: 'FETCHING',
      message: undefined,
    };
  }

  private createFailedSectionFromError(
    error: unknown,
  ): SummarySection<FaultlinesSummaryModel> {
    const message = error instanceof Error ? error.message : String(error ?? 'Unexpected error');

    return {
      status: 'FAILED',
      data: null,
      message: message || 'Failed to load faultlines summary.',
    };
  }
}

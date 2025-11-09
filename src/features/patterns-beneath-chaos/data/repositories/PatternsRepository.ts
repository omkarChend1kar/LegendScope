import type { PlaystyleSummaryModel, RiotParticipantModel } from '../models/PatternsSummaryModel';
import { PlaystyleRemoteDataSource } from '../datasources/remote/PlaystyleRemoteDataSource';
import { PlaystyleMockDataSource } from '../datasources/local/PlaystyleMockDataSource';
import { PlaystyleLocalDataSource } from '../datasources/local/PlaystyleLocalDataSource';
import { SignaturePlaystyleAnalyzer } from '../../domain/services/SignaturePlaystyleAnalyzer';
import type { SummarySection } from '../../../../types/SummarySection';

export interface PatternsRepository {
  getPatternsSummary(playerId: string): Promise<SummarySection<PlaystyleSummaryModel>>;
  clearCachedSummary(playerId: string): Promise<void>;
}

export class PatternsRepositoryImpl implements PatternsRepository {
  private readonly useMockData: boolean;
  private readonly remoteDataSource: PlaystyleRemoteDataSource;
  private readonly mockDataSource: PlaystyleMockDataSource;
  private readonly localDataSource: PlaystyleLocalDataSource;
  private readonly analyzer: SignaturePlaystyleAnalyzer;
  private readonly summarySync: Map<string, Promise<void>>;

  constructor(useMockData = false, dependencies?: {
    remoteDataSource?: PlaystyleRemoteDataSource;
    mockDataSource?: PlaystyleMockDataSource;
    localDataSource?: PlaystyleLocalDataSource;
    analyzer?: SignaturePlaystyleAnalyzer;
  }) {
    this.useMockData = useMockData;
    this.remoteDataSource = dependencies?.remoteDataSource ?? new PlaystyleRemoteDataSource();
    this.mockDataSource = dependencies?.mockDataSource ?? new PlaystyleMockDataSource();
    this.localDataSource = dependencies?.localDataSource ?? new PlaystyleLocalDataSource();
    this.analyzer = dependencies?.analyzer ?? new SignaturePlaystyleAnalyzer();
    this.summarySync = new Map();
  }

  async getPatternsSummary(playerId: string): Promise<SummarySection<PlaystyleSummaryModel>> {
    if (!playerId) {
      throw new Error('Player identifier is required to compute signature playstyle.');
    }

    if (!this.useMockData) {
      return this.requestWithSync(playerId);
    }

    return this.buildMockSummarySection(playerId);
  }

  async clearCachedSummary(playerId: string): Promise<void> {
    this.summarySync.delete(playerId);
    await this.localDataSource.deleteSummary(playerId);
  }

  private async requestWithSync(playerId: string): Promise<SummarySection<PlaystyleSummaryModel>> {
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

  private async buildMockSummarySection(
    playerId: string,
  ): Promise<SummarySection<PlaystyleSummaryModel>> {
    const participants: RiotParticipantModel[] = await this.mockDataSource.fetchParticipants(playerId);

    if (participants.length === 0) {
      throw new Error('Unable to gather matches for signature playstyle analysis.');
    }

    const summary = this.analyzer.analyze(participants);

    return {
      status: 'READY',
      data: summary,
    };
  }

  private async markSummaryFetching(
    playerId: string,
  ): Promise<SummarySection<PlaystyleSummaryModel>> {
    return this.localDataSource.updateSummary(playerId, (section) => this.toFetchingSection(section));
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

  private toFetchingSection<T>(section: SummarySection<T>): SummarySection<T> {
    return {
      ...section,
      status: 'FETCHING',
      message: undefined,
    };
  }

  private createFailedSectionFromError(
    error: unknown,
  ): SummarySection<PlaystyleSummaryModel> {
    const message = error instanceof Error ? error.message : String(error ?? 'Unexpected error');

    return {
      status: 'FAILED',
      data: null,
      message: message || 'Failed to load signature playstyle summary.',
    };
  }
}

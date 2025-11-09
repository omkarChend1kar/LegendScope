import type { BattleStatisticsModel } from '../models/BattleStatisticsModel';
import type { TimelineModel } from '../models/TimelineModel';
import type { DefiningMatchModel } from '../models/DefiningMatchModel';
import type { ChampionDistributionModel } from '../models/ChampionDistributionModel';
import type { RoleDistributionModel } from '../models/RoleDistributionModel';
import type { ProgressModel } from '../models/ProgressModel';
import type { SummaryCardsModel } from '../models/lastTwenty/SummaryCardsModel';
import type { RoleSummaryModel } from '../models/lastTwenty/RoleSummaryModel';
import type { ChampionSummaryModel } from '../models/lastTwenty/ChampionSummaryModel';
import type { SummarySection } from '../../types/SummarySection';
import { EchoesOfBattleRemoteDataSource } from '../datasources/remote/EchoesOfBattleRemoteDataSource';
import { EchoesOfBattleLocalDataSource } from '../datasources/local/EchoesOfBattleLocalDataSource';

export interface EchoesOfBattleRepository {
  getBattleStatistics(playerId: string): Promise<BattleStatisticsModel>;
  getTimelineData(playerId: string): Promise<TimelineModel>;
  getDefiningMatch(playerId: string): Promise<DefiningMatchModel>;
  getChampionDistribution(playerId: string): Promise<ChampionDistributionModel>;
  getRoleDistribution(playerId: string): Promise<RoleDistributionModel>;
  getProgressData(playerId: string): Promise<ProgressModel>;
  getLastTwentySummaryCards(playerId: string): Promise<SummarySection<SummaryCardsModel>>;
  getLastTwentyRoleSummaries(playerId: string): Promise<SummarySection<RoleSummaryModel[]>>;
  getLastTwentyChampionSummaries(playerId: string): Promise<SummarySection<ChampionSummaryModel[]>>;
}

interface SummarySyncConfig<T> {
  read: () => Promise<SummarySection<T>>;
  save: (section: SummarySection<T>) => Promise<void>;
  markFetching: () => Promise<SummarySection<T>>;
  fetch: () => Promise<SummarySection<T>>;
  tracker: Map<string, Promise<void>>;
}

export class EchoesOfBattleRepositoryImpl implements EchoesOfBattleRepository {
  private readonly useMockData: boolean;
  private readonly remote: EchoesOfBattleRemoteDataSource;
  private readonly local: EchoesOfBattleLocalDataSource;
  private readonly summaryCardsSync: Map<string, Promise<void>>;
  private readonly roleSummariesSync: Map<string, Promise<void>>;
  private readonly championSummariesSync: Map<string, Promise<void>>;

  constructor(
    useMockData: boolean = true,
    remote?: EchoesOfBattleRemoteDataSource,
    local?: EchoesOfBattleLocalDataSource,
  ) {
    this.useMockData = useMockData;
    this.remote = remote ?? new EchoesOfBattleRemoteDataSource();
    this.local = local ?? new EchoesOfBattleLocalDataSource();
    this.summaryCardsSync = new Map();
    this.roleSummariesSync = new Map();
    this.championSummariesSync = new Map();
  }

  async getBattleStatistics(playerId: string): Promise<BattleStatisticsModel> {
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        battles: 847,
        victories: 453,
        gloryMoments: 5234,
        kda: 2.95,
        winStreak: 12,
        totalGames: 234,
        pentakills: 7,
        avgWards: 42.8,
        objectives: 156,
        comebackPercentage: 34,
        consistencyIndex: 82,
      };
    }

    // TODO: Implement actual API call
    const response = await fetch(`/api/battles/${playerId}/statistics`);
    return response.json();
  }

  async getTimelineData(playerId: string): Promise<TimelineModel> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        dataPoints: [
          { month: 'Jan', games: 65 },
          { month: 'Feb', games: 72 },
          { month: 'Mar', games: 68 },
          { month: 'Apr', games: 80 },
          { month: 'May', games: 75 },
          { month: 'Jun', games: 85 },
          { month: 'Jul', games: 92 },
          { month: 'Aug', games: 78 },
          { month: 'Sep', games: 70 },
          { month: 'Oct', games: 62 },
          { month: 'Nov', games: 58 },
          { month: 'Dec', games: 67 },
        ],
        peakMonth: 'July',
        lowestMonth: 'November',
        narrative: 'Your battles peaked in July and dipped in November',
      };
    }

    const response = await fetch(`/api/battles/${playerId}/timeline`);
    return response.json();
  }

  async getDefiningMatch(playerId: string): Promise<DefiningMatchModel> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        championName: 'Caitlyn',
        kills: 21,
        deaths: 3,
        assists: 14,
        date: 'September 15, 2024',
        damage: 38492,
        gameMode: 'Ranked Solo/Duo',
      };
    }

    const response = await fetch(`/api/battles/${playerId}/defining-match`);
    return response.json();
  }

  async getChampionDistribution(playerId: string): Promise<ChampionDistributionModel> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        champions: [
          { name: 'Caitlyn', percentage: 33, games: 77, color: '#6366f1' },
          { name: 'Jinx', percentage: 22, games: 51, color: '#8b5cf6' },
          { name: 'Vayne', percentage: 18, games: 42, color: '#ec4899' },
          { name: 'Ezreal', percentage: 16, games: 37, color: '#f59e0b' },
          { name: 'Others', percentage: 11, games: 27, color: '#64748b' },
        ],
        totalGames: 234,
      };
    }

    const response = await fetch(`/api/battles/${playerId}/champions`);
    return response.json();
  }

  async getRoleDistribution(playerId: string): Promise<RoleDistributionModel> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        roles: [
          { role: 'Bot Lane', winRate: 57, games: 142 },
          { role: 'Support', winRate: 50, games: 48 },
          { role: 'Mid Lane', winRate: 45, games: 22 },
          { role: 'Jungle', winRate: 52, games: 15 },
          { role: 'Top Lane', winRate: 48, games: 7 },
        ],
      };
    }

    const response = await fetch(`/api/battles/${playerId}/roles`);
    return response.json();
  }

  async getProgressData(playerId: string): Promise<ProgressModel> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        metrics: [
          { label: 'Win Rate', currentValue: 53.5, previousValue: 48.3, change: '↑ 5.2%', isPositive: true, unit: '%' },
          { label: 'Average KDA', currentValue: 2.95, previousValue: 2.15, change: '↑ 0.8', isPositive: true, unit: '' },
          { label: 'Games Played', currentValue: 234, previousValue: 107, change: '↑ 127', isPositive: true, unit: ' games' },
          { label: 'Vision Score', currentValue: 42.8, previousValue: 34.5, change: '↑ 8.3', isPositive: true, unit: '' },
        ],
        comparisonPeriod: 'vs last year',
      };
    }

    const response = await fetch(`/api/battles/${playerId}/progress`);
    return response.json();
  }

  async getLastTwentySummaryCards(playerId: string): Promise<SummarySection<SummaryCardsModel>> {
    if (this.useMockData) {
      await this.simulateLatency();
      const section: SummarySection<SummaryCardsModel> = {
        status: 'READY',
        data: this.buildSummaryCards(),
      };
      await this.local.saveSummaryCards(playerId, section);
      return section;
    }

    return this.requestWithSync(playerId, {
      read: () => this.local.getSummaryCards(playerId),
      save: (section: SummarySection<SummaryCardsModel>) =>
        this.local.saveSummaryCards(playerId, section),
      markFetching: () =>
        this.markSectionFetching<SummaryCardsModel>((mutator: (section: SummarySection<SummaryCardsModel>) => SummarySection<SummaryCardsModel>) =>
          this.local.updateSummaryCards(playerId, mutator),
        ),
      fetch: () => this.remote.fetchSummaryCards(playerId),
      tracker: this.summaryCardsSync,
    });
  }

  async getLastTwentyRoleSummaries(playerId: string): Promise<SummarySection<RoleSummaryModel[]>> {
    if (this.useMockData) {
      await this.simulateLatency();
      const section: SummarySection<RoleSummaryModel[]> = {
        status: 'READY',
        data: this.buildRoleSummaries(),
      };
      await this.local.saveRoleSummaries(playerId, section);
      return section;
    }

    return this.requestWithSync(playerId, {
      read: () => this.local.getRoleSummaries(playerId),
      save: (section: SummarySection<RoleSummaryModel[]>) =>
        this.local.saveRoleSummaries(playerId, section),
      markFetching: () =>
        this.markSectionFetching<RoleSummaryModel[]>((mutator: (section: SummarySection<RoleSummaryModel[]>) => SummarySection<RoleSummaryModel[]>) =>
          this.local.updateRoleSummaries(playerId, mutator),
        ),
      fetch: () => this.remote.fetchRoleSummaries(playerId),
      tracker: this.roleSummariesSync,
    });
  }

  async getLastTwentyChampionSummaries(playerId: string): Promise<SummarySection<ChampionSummaryModel[]>> {
    if (this.useMockData) {
      await this.simulateLatency();
      const section: SummarySection<ChampionSummaryModel[]> = {
        status: 'READY',
        data: this.buildChampionSummaries(),
      };
      await this.local.saveChampionSummaries(playerId, section);
      return section;
    }

    return this.requestWithSync(playerId, {
      read: () => this.local.getChampionSummaries(playerId),
      save: (section: SummarySection<ChampionSummaryModel[]>) =>
        this.local.saveChampionSummaries(playerId, section),
      markFetching: () =>
        this.markSectionFetching<ChampionSummaryModel[]>((mutator: (section: SummarySection<ChampionSummaryModel[]>) => SummarySection<ChampionSummaryModel[]>) =>
          this.local.updateChampionSummaries(playerId, mutator),
        ),
      fetch: () => this.remote.fetchChampionSummaries(playerId),
      tracker: this.championSummariesSync,
    });
  }

  private async requestWithSync<T>(
    playerId: string,
    config: SummarySyncConfig<T>,
  ): Promise<SummarySection<T>> {
    let localSection = await config.read();

    if (this.shouldStartSync(localSection) && !config.tracker.has(playerId)) {
      const markPromise = config.markFetching();

      const syncPromise = markPromise
        .then(() => config.fetch())
        .then((remoteSection) => config.save(remoteSection))
        .catch(async (error) => {
          const failed = this.createFailedSectionFromError<T>(error);
          await config.save(failed);
        })
        .finally(() => {
          config.tracker.delete(playerId);
        });

      config.tracker.set(playerId, syncPromise);
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

  private async markSectionFetching<T>(
    updater: (mutator: (section: SummarySection<T>) => SummarySection<T>) => Promise<void>,
  ): Promise<SummarySection<T>> {
    let snapshot: SummarySection<T> | null = null;

    await updater((section) => {
      const next = this.toFetchingSection(section);
      snapshot = next;
      return next;
    });

    return snapshot ?? this.toFetchingSection(this.createInitialSection<T>());
  }

  private toFetchingSection<T>(section: SummarySection<T>): SummarySection<T> {
    return {
      ...section,
      status: 'FETCHING',
      message: undefined,
    };
  }

  private createInitialSection<T>(): SummarySection<T> {
    return {
      status: 'NOT_STARTED',
      data: null,
    };
  }

  private createFailedSectionFromError<T>(error: unknown): SummarySection<T> {
    const message = error instanceof Error ? error.message : String(error ?? 'Unexpected error');

    return {
      status: 'FAILED',
      data: null,
      message: message || 'Failed to load summary.',
    };
  }

  private async simulateLatency(delay: number = 300): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  private buildSummaryCards(): SummaryCardsModel {
    const battlesFought: number = 20;
    const claims: number = 11;
    const falls: number = 9;

    const ratio = falls === 0 ? claims : claims / falls;

    return {
      battlesFought,
      claims,
      falls,
      claimFallRatio: Number(ratio.toFixed(2)),
      longestClaimStreak: 3,
      longestFallStreak: 2,
      clutchGames: 4,
      surrenderRate: 10,
      averageMatchDuration: '28m 14s',
    };
  }

  private buildRoleSummaries(): RoleSummaryModel[] {
    const seed: Array<Omit<RoleSummaryModel, 'winRate'>> = [
      {
        role: 'Jungle',
        games: 7,
        claims: 5,
        falls: 2,
        averageKda: 3.8,
        firstBloodRate: 64,
        visionScore: 28,
        goldPerMinute: 412,
      },
      {
        role: 'Mid Lane',
        games: 5,
        claims: 2,
        falls: 3,
        averageKda: 2.1,
        firstBloodRate: 22,
        visionScore: 18,
        goldPerMinute: 385,
      },
      {
        role: 'Bot Lane',
        games: 4,
        claims: 3,
        falls: 1,
        averageKda: 4.2,
        firstBloodRate: 58,
        visionScore: 16,
        goldPerMinute: 436,
      },
      {
        role: 'Support',
        games: 3,
        claims: 1,
        falls: 2,
        averageKda: 2.4,
        firstBloodRate: 12,
        visionScore: 31,
        goldPerMinute: 255,
      },
      {
        role: 'Top Lane',
        games: 1,
        claims: 0,
        falls: 1,
        averageKda: 1.8,
        firstBloodRate: 0,
        visionScore: 14,
        goldPerMinute: 362,
      },
    ];

    return seed.map((role) => {
      const winRate = role.games === 0 ? 0 : Math.round((role.claims / role.games) * 100);
      return { ...role, winRate };
    });
  }

  private buildChampionSummaries(): ChampionSummaryModel[] {
    const seed: Array<Omit<ChampionSummaryModel, 'winRate'>> = [
      { name: 'Lee Sin', games: 5, claims: 4, color: '#60a5fa' },
      { name: 'Ahri', games: 4, claims: 2, color: '#8b5cf6' },
      { name: "Kai'Sa", games: 3, claims: 2, color: '#22d3ee' },
      { name: 'Thresh', games: 3, claims: 1, color: '#f97316' },
      { name: 'Sejuani', games: 2, claims: 1, color: '#facc15' },
      { name: 'Others', games: 3, claims: 1, color: '#64748b' },
    ];

    return seed.map((champion) => {
      const winRate = champion.games === 0 ? 0 : Math.round((champion.claims / champion.games) * 100);
      return { ...champion, winRate };
    });
  }

}

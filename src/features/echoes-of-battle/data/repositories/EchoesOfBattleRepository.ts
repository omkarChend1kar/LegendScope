import type { BattleStatisticsModel } from '../models/BattleStatisticsModel';
import type { TimelineModel } from '../models/TimelineModel';
import type { DefiningMatchModel } from '../models/DefiningMatchModel';
import type { ChampionDistributionModel } from '../models/ChampionDistributionModel';
import type { RoleDistributionModel } from '../models/RoleDistributionModel';
import type { ProgressModel } from '../models/ProgressModel';
import type { SummaryCardsModel } from '../models/lastTwenty/SummaryCardsModel';
import type { RoleSummaryModel } from '../models/lastTwenty/RoleSummaryModel';
import type { ChampionSummaryModel } from '../models/lastTwenty/ChampionSummaryModel';
import type { RiskProfileModel } from '../models/lastTwenty/RiskProfileModel';
import type { NarrativeSummaryModel } from '../models/lastTwenty/NarrativeSummaryModel';
import {
  legendScopeBackend,
  type ApiEnvelope,
  type SummaryCardsData,
  type RoleSummaryData,
  type ChampionSummaryData,
  type RiskProfileData,
  type NarrativeSummaryData,
} from '../../../../services/legendScopeBackend';
import type { SummarySection } from '../../types/SummarySection';
import type { BackendStatus } from '../../../../types/BackendStatus';

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
  getLastTwentyRiskProfile(playerId: string): Promise<SummarySection<RiskProfileModel>>;
  getLastTwentyNarrative(playerId: string): Promise<SummarySection<NarrativeSummaryModel>>;
}

export class EchoesOfBattleRepositoryImpl implements EchoesOfBattleRepository {
  private useMockData: boolean;
  
  constructor(useMockData: boolean = true) {
    this.useMockData = useMockData;
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
      return {
        status: 'READY',
        data: this.buildSummaryCards(),
      };
    }

    try {
      const envelope = await legendScopeBackend.getSummaryCards(playerId);
      return this.normalizeSection(envelope, (payload) => this.mapSummaryCards(payload), 'summary cards');
    } catch (error) {
      return this.createFailedSection('summary cards', error);
    }
  }

  async getLastTwentyRoleSummaries(playerId: string): Promise<SummarySection<RoleSummaryModel[]>> {
    if (this.useMockData) {
      await this.simulateLatency();
      return {
        status: 'READY',
        data: this.buildRoleSummaries(),
      };
    }

    try {
      const envelope = await legendScopeBackend.getRoleSummaries(playerId);
      return this.normalizeSection(envelope, (payload) => this.mapRoleSummaries(payload), 'role summaries');
    } catch (error) {
      return this.createFailedSection('role summaries', error);
    }
  }

  async getLastTwentyChampionSummaries(playerId: string): Promise<SummarySection<ChampionSummaryModel[]>> {
    if (this.useMockData) {
      await this.simulateLatency();
      return {
        status: 'READY',
        data: this.buildChampionSummaries(),
      };
    }

    try {
      const envelope = await legendScopeBackend.getChampionSummaries(playerId);
      return this.normalizeSection(envelope, (payload) => this.mapChampionSummaries(payload), 'champion summaries');
    } catch (error) {
      return this.createFailedSection('champion summaries', error);
    }
  }

  async getLastTwentyRiskProfile(playerId: string): Promise<SummarySection<RiskProfileModel>> {
    if (this.useMockData) {
      await this.simulateLatency();
      const roles = this.buildRoleSummaries();
      return {
        status: 'READY',
        data: this.buildRiskProfile(roles),
      };
    }

    try {
      const envelope = await legendScopeBackend.getRiskProfile(playerId);
      return this.normalizeSection(envelope, (payload) => this.mapRiskProfile(payload), 'risk profile');
    } catch (error) {
      return this.createFailedSection('risk profile', error);
    }
  }

  async getLastTwentyNarrative(playerId: string): Promise<SummarySection<NarrativeSummaryModel>> {
    if (this.useMockData) {
      await this.simulateLatency();

      const summaryCards = this.buildSummaryCards();
      const roles = this.buildRoleSummaries();
      const champions = this.buildChampionSummaries();
      const riskProfile = this.buildRiskProfile(roles);

      return {
        status: 'READY',
        data: this.buildNarrative(summaryCards, roles, champions, riskProfile),
      };
    }

    try {
      const envelope = await legendScopeBackend.getNarrative(playerId);
      return this.normalizeSection(envelope, (payload) => this.mapNarrative(payload), 'narrative');
    } catch (error) {
      return this.createFailedSection('narrative', error);
    }
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

  private buildRiskProfile(roles: RoleSummaryModel[]): RiskProfileModel {
    const profile = {
      earlyAggression: 68,
      earlyFalls: 32,
      objectiveControl: 58,
      visionCommitment: 74,
    } as const;

    const highestPressureRole = roles.reduce((current, candidate) =>
      candidate.winRate < current.winRate ? candidate : current
    );

    const aggressionPhrase = profile.earlyAggression >= 60
      ? 'You open with decisive strikes'
      : 'You approach the opening moments with patience';

    const vulnerabilityPhrase = profile.earlyFalls >= 40
      ? 'but early missteps risk surrendering tempo'
      : 'while keeping early skirmishes largely under control';

    const strengthPhrase = `— vision remains your lasting strength.`;
    const rolePhrase = ` Guard your ${highestPressureRole.role.toLowerCase()} rotations to protect that edge.`;

    return {
      ...profile,
      narrative: `${aggressionPhrase} ${vulnerabilityPhrase} ${strengthPhrase}${rolePhrase}`,
    };
  }

  private buildNarrative(
    summaryCards: SummaryCardsModel,
    roles: RoleSummaryModel[],
    champions: ChampionSummaryModel[],
    riskProfile: RiskProfileModel,
  ): NarrativeSummaryModel {
    const sortedRoles = [...roles].sort((a, b) => b.winRate - a.winRate);
    const topRole = sortedRoles[0];
    const strugglingRole = sortedRoles[sortedRoles.length - 1];

    const sortedChampions = [...champions].sort((a, b) => b.claims - a.claims);
    const primaryChampion = sortedChampions[0];
    const secondaryChampion = sortedChampions[1] ?? sortedChampions[0];

    const headline = `Strategist of the ${topRole.role}`;

    const body = [
      `Across ${summaryCards.battlesFought} battles you carved ${summaryCards.claims} victories, leaning on ${topRole.role.toLowerCase()} at a ${topRole.winRate}% claim rate.`,
      `${strugglingRole.role} remains the proving ground, but your arsenal of ${primaryChampion.name} and ${secondaryChampion.name} keeps momentum within reach.`,
      `Channel the ${riskProfile.visionCommitment}% vision commitment into ${strugglingRole.role.toLowerCase()} resilience to seize the next front.`,
    ].join(' ');

    return { headline, body };
  }

  private mapSummaryCards(payload: SummaryCardsData): SummaryCardsModel {
  const source = payload as unknown as Record<string, unknown>;

    const rawRatio = this.resolveNumericField(source, ['claim_fall_ratio', 'claimFallRatio', 'claimToFallRatio'], Number.NaN);
    const claimFallRatio = Number.isFinite(rawRatio) ? Number(rawRatio.toFixed(2)) : 0;

    const rawSurrenderRate = this.resolveNumericField(source, ['surrender_rate', 'surrenderRate'], Number.NaN);
    const surrenderRate = Number.isFinite(rawSurrenderRate) ? Math.round(rawSurrenderRate) : 0;

    return {
      battlesFought: Math.round(this.resolveNumericField(source, [
        'battles_fought',
        'battlesFought',
        'matches_analyzed',
        'matchesAnalyzed',
      ])),
      claims: Math.round(this.resolveNumericField(source, ['total_claims', 'claims', 'totalClaims', 'claimCount'])),
      falls: Math.round(this.resolveNumericField(source, ['total_falls', 'falls', 'totalFalls', 'fallCount'])),
      claimFallRatio,
      longestClaimStreak: Math.round(this.resolveNumericField(source, [
        'max_claim_streak',
        'longest_claim_streak',
        'longestClaimStreak',
      ])),
      longestFallStreak: Math.round(this.resolveNumericField(source, [
        'max_fall_streak',
        'longest_fall_streak',
        'longestFallStreak',
      ])),
      clutchGames: Math.round(this.resolveNumericField(source, ['clutch_games', 'clutchGames'])),
      surrenderRate,
      averageMatchDuration: this.resolveStringField(source, [
        'average_match_duration',
        'avg_match_duration',
        'averageMatchDuration',
      ], '—'),
    };
  }

  private mapRoleSummaries(payload: RoleSummaryData[]): RoleSummaryModel[] {
    return payload.map((roleData) => {
      const source = roleData as unknown as Record<string, unknown>;

      const roleName = this.resolveStringField(source, ['role', 'position', 'lane'], 'Unknown');
      const games = Math.max(0, Math.round(this.resolveNumericField(source, ['games_played', 'games', 'matches'])));
      const winRate = this.resolveNumericField(source, ['win_rate', 'winRate', 'claim_rate']);
      const defaultClaims = games === 0 ? 0 : Math.round((winRate / 100) * games);
      const claims = Math.round(this.resolveNumericField(source, ['total_claims', 'claims', 'totalClaims', 'claimCount'], defaultClaims));
      const defaultFalls = Math.max(games - claims, 0);
      const falls = Math.round(this.resolveNumericField(source, ['total_falls', 'falls', 'totalFalls', 'fallCount'], defaultFalls));
      const avgKda = this.resolveNumericField(source, ['avg_kda', 'avgKda', 'average_kda', 'averageKda']);
      const visionScore = this.resolveNumericField(source, ['avg_vision_score', 'vision_score', 'visionScore']);
      const goldPerMinute = this.resolveNumericField(source, ['gold_per_minute', 'goldPerMinute']);

      return {
        role: roleName,
        games,
        claims,
        falls,
        winRate: Math.round(winRate),
        averageKda: Number(avgKda.toFixed(1)),
        firstBloodRate: Math.round(this.resolveNumericField(source, ['first_blood_rate', 'firstBloodRate'])),
        visionScore: Number(visionScore.toFixed(1)),
        goldPerMinute: Math.round(goldPerMinute),
      };
    });
  }

  private mapChampionSummaries(payload: ChampionSummaryData[]): ChampionSummaryModel[] {
    const palette = ['#60a5fa', '#8b5cf6', '#22d3ee', '#f97316', '#facc15', '#64748b'];

    return payload.map((championData, index) => {
      const source = championData as unknown as Record<string, unknown>;

      const name = this.resolveStringField(source, ['champion_name', 'championName', 'name'], 'Unknown Champion');
      const games = Math.max(0, Math.round(this.resolveNumericField(source, ['games_played', 'games'])));
      const winRate = this.resolveNumericField(source, ['win_rate', 'winRate']);
      const defaultClaims = games === 0 ? 0 : Math.round((winRate / 100) * games);
      const claims = Math.round(this.resolveNumericField(source, ['total_claims', 'claims', 'totalClaims'], defaultClaims));

      return {
        name,
        games,
        claims,
        winRate: Math.round(winRate),
        color: palette[index % palette.length],
      };
    });
  }

  private mapRiskProfile(payload: RiskProfileData): RiskProfileModel {
    const source = payload as unknown as Record<string, unknown>;

    return {
      earlyAggression: Math.round(
        this.resolveNumericField(source, ['aggression_score', 'aggressionScore', 'early_aggression', 'earlyAggression'])
      ),
      earlyFalls: Math.round(
        this.resolveNumericField(source, ['early_fall_rate', 'earlyFallRate', 'early_falls', 'earlyFalls'])
      ),
      objectiveControl: Math.round(
        this.resolveNumericField(source, ['objective_control_score', 'objectiveControlScore', 'objective_control', 'objectiveControl'])
      ),
      visionCommitment: Math.round(
        this.resolveNumericField(source, ['vision_commitment_score', 'visionCommitmentScore', 'vision_commitment', 'visionCommitment'])
      ),
      narrative: this.resolveStringField(source, ['narrative', 'summary', 'description'], ''),
    };
  }

  private mapNarrative(payload: NarrativeSummaryData): NarrativeSummaryModel {
    const source = payload as unknown as Record<string, unknown>;

    return {
      headline: this.resolveStringField(source, ['headline', 'title'], ''),
      body: this.resolveStringField(source, ['body', 'narrative', 'summary'], ''),
    };
  }

  private resolveNumericField(
    source: Record<string, unknown>,
    keys: string[],
    defaultValue = 0,
  ): number {
    for (const key of keys) {
      if (!Object.prototype.hasOwnProperty.call(source, key)) {
        continue;
      }

      const value = source[key];

      if (value === null || value === undefined) {
        continue;
      }

      if (typeof value === 'number') {
        if (Number.isFinite(value)) {
          return value;
        }
        continue;
      }

      if (typeof value === 'string') {
        const numeric = Number.parseFloat(value);

        if (Number.isFinite(numeric)) {
          return numeric;
        }
      }
    }

    return defaultValue;
  }

  private resolveStringField(
    source: Record<string, unknown>,
    keys: string[],
    defaultValue = '—',
  ): string {
    for (const key of keys) {
      if (!Object.prototype.hasOwnProperty.call(source, key)) {
        continue;
      }

      const value = source[key];

      if (value === null || value === undefined) {
        continue;
      }

      if (typeof value === 'string') {
        return value;
      }

      if (typeof value === 'number' || typeof value === 'boolean') {
        return String(value);
      }
    }

    return defaultValue;
  }

  private normalizeSection<TPayload, TResult>(
    envelope: ApiEnvelope<TPayload>,
    mapper: (payload: TPayload) => TResult,
    context: string,
  ): SummarySection<TResult> {
    const { status, originalStatus } = this.normalizeBackendStatus(envelope.status);

    if (status === 'READY' && envelope.data) {
      return {
        status: 'READY',
        data: mapper(envelope.data),
      };
    }

    return {
      status,
      data: null,
      message: this.buildStatusMessage(status, context, { originalStatus }),
    };
  }

  private createFailedSection<TResult>(context: string, error: unknown): SummarySection<TResult> {
    const message = error instanceof Error ? error.message : String(error);

    return {
      status: 'FAILED',
      data: null,
      message: message || `Failed to load ${context}.`,
    };
  }

  private normalizeBackendStatus(rawStatus?: BackendStatus): { status: BackendStatus; originalStatus?: BackendStatus } {
    if (!rawStatus) {
      return { status: 'FETCHING', originalStatus: rawStatus };
    }

    const normalized = typeof rawStatus === 'string' ? rawStatus.toUpperCase() : rawStatus;

  const readyStatuses = new Set(['READY', 'SUCCESS', 'SUCCEEDED', 'COMPLETED', 'COMPLETE', 'DONE', 'FINISHED', 'OK']);
    if (typeof normalized === 'string' && readyStatuses.has(normalized)) {
      return { status: 'READY', originalStatus: rawStatus };
    }

    if (!normalized || normalized === 'UNKNOWN') {
      return { status: 'FETCHING', originalStatus: rawStatus };
    }

    const inProgressStatuses = new Set(['PENDING', 'PROCESSING', 'IN_PROGRESS', 'STARTED']);
    if (typeof normalized === 'string' && inProgressStatuses.has(normalized)) {
      return { status: 'FETCHING', originalStatus: rawStatus };
    }

    if (normalized === 'ERROR') {
      return { status: 'FAILED', originalStatus: rawStatus };
    }

    return { status: normalized as BackendStatus, originalStatus: rawStatus };
  }

  private buildStatusMessage(
    status: BackendStatus,
    context: string,
    options?: { originalStatus?: BackendStatus },
  ): string | undefined {
    const original =
      typeof options?.originalStatus === 'string'
        ? options.originalStatus.toUpperCase()
        : options?.originalStatus;

    switch (status) {
      case 'FAILED':
        return `LegendScope backend reported failure for ${context}.`;
      case 'NO_MATCHES':
        return `No matches available for ${context}.`;
      case 'NOT_STARTED':
        return `Summary generation hasn't started for ${context} yet.`;
      case 'FETCHING':
        if (!original || original === 'UNKNOWN') {
          return `Awaiting the first response from LegendScope for ${context}. This usually means the backend is still spinning up the analysis.`;
        }

        if (typeof original === 'string') {
          if (original === 'PENDING' || original === 'PROCESSING' || original === 'IN_PROGRESS' || original === 'STARTED') {
            return `LegendScope is still processing ${context}.`;
          }
        }

        return undefined;
      default:
        return undefined;
    }
  }
}

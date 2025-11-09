import {
  legendScopeBackend,
  type ApiEnvelope,
  type SummaryCardsData,
  type RoleSummaryData,
  type ChampionSummaryData,
} from '../../../../../services/legendScopeBackend';
import type { SummarySection } from '../../../types/SummarySection';
import type { SummaryCardsModel } from '../../models/lastTwenty/SummaryCardsModel';
import type { RoleSummaryModel } from '../../models/lastTwenty/RoleSummaryModel';
import type { ChampionSummaryModel } from '../../models/lastTwenty/ChampionSummaryModel';
import type { BackendStatus } from '../../../../../types/BackendStatus';

export class EchoesOfBattleRemoteDataSource {
  async fetchSummaryCards(playerId: string): Promise<SummarySection<SummaryCardsModel>> {
    try {
      const envelope = await legendScopeBackend.getSummaryCards(playerId);
      return this.normalizeSection(envelope, (payload) => this.mapSummaryCards(payload), 'summary cards');
    } catch (error) {
      return this.createFailedSection('summary cards', error);
    }
  }

  async fetchRoleSummaries(playerId: string): Promise<SummarySection<RoleSummaryModel[]>> {
    try {
      const envelope = await legendScopeBackend.getRoleSummaries(playerId);
      return this.normalizeSection(envelope, (payload) => this.mapRoleSummaries(payload), 'role summaries');
    } catch (error) {
      return this.createFailedSection('role summaries', error);
    }
  }

  async fetchChampionSummaries(playerId: string): Promise<SummarySection<ChampionSummaryModel[]>> {
    try {
      const envelope = await legendScopeBackend.getChampionSummaries(playerId);
      return this.normalizeSection(envelope, (payload) => this.mapChampionSummaries(payload), 'champion summaries');
    } catch (error) {
      return this.createFailedSection('champion summaries', error);
    }
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
}

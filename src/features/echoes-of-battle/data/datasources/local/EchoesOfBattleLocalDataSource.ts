import { liveQuery, type Table } from 'dexie';
import { from, type Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { SummarySection } from '../../../types/SummarySection';
import type { SummaryCardsModel } from '../../models/lastTwenty/SummaryCardsModel';
import type { RoleSummaryModel } from '../../models/lastTwenty/RoleSummaryModel';
import type { ChampionSummaryModel } from '../../models/lastTwenty/ChampionSummaryModel';
import { echoesLocalDb, type SummarySectionRecord } from './echoesLocalDb';

const createInitialSection = <T,>(): SummarySection<T> => ({
  status: 'NOT_STARTED',
  data: null,
});

export class EchoesOfBattleLocalDataSource {
  private readonly db: typeof echoesLocalDb;

  constructor(db: typeof echoesLocalDb = echoesLocalDb) {
    this.db = db;
  }

  watchSummaryCards(playerId: string): Observable<SummarySection<SummaryCardsModel>> {
    return this.watchSection(this.db.summaryCards, playerId);
  }

  watchRoleSummaries(playerId: string): Observable<SummarySection<RoleSummaryModel[]>> {
    return this.watchSection(this.db.roleSummaries, playerId);
  }

  watchChampionSummaries(playerId: string): Observable<SummarySection<ChampionSummaryModel[]>> {
    return this.watchSection(this.db.championSummaries, playerId);
  }

  async getSummaryCards(playerId: string): Promise<SummarySection<SummaryCardsModel>> {
    return this.getSection(this.db.summaryCards, playerId);
  }

  async getRoleSummaries(playerId: string): Promise<SummarySection<RoleSummaryModel[]>> {
    return this.getSection(this.db.roleSummaries, playerId);
  }

  async getChampionSummaries(playerId: string): Promise<SummarySection<ChampionSummaryModel[]>> {
    return this.getSection(this.db.championSummaries, playerId);
  }

  async saveSummaryCards(playerId: string, section: SummarySection<SummaryCardsModel>): Promise<void> {
    await this.setSection(this.db.summaryCards, playerId, section);
  }

  async saveRoleSummaries(
    playerId: string,
    section: SummarySection<RoleSummaryModel[]>,
  ): Promise<void> {
    await this.setSection(this.db.roleSummaries, playerId, section);
  }

  async saveChampionSummaries(
    playerId: string,
    section: SummarySection<ChampionSummaryModel[]>,
  ): Promise<void> {
    await this.setSection(this.db.championSummaries, playerId, section);
  }

  async updateSummaryCards(
    playerId: string,
    updater: (section: SummarySection<SummaryCardsModel>) => SummarySection<SummaryCardsModel>,
  ): Promise<void> {
    await this.updateSection(this.db.summaryCards, playerId, updater);
  }

  async updateRoleSummaries(
    playerId: string,
    updater: (section: SummarySection<RoleSummaryModel[]>) => SummarySection<RoleSummaryModel[]>,
  ): Promise<void> {
    await this.updateSection(this.db.roleSummaries, playerId, updater);
  }

  async updateChampionSummaries(
    playerId: string,
    updater: (section: SummarySection<ChampionSummaryModel[]>) => SummarySection<ChampionSummaryModel[]>,
  ): Promise<void> {
    await this.updateSection(this.db.championSummaries, playerId, updater);
  }

  private watchSection<T>(
    table: Table<SummarySectionRecord<T>, string>,
    playerId: string,
  ): Observable<SummarySection<T>> {
    return from(
      liveQuery(async () => {
        const record = await table.get(playerId);
        return record?.section ?? createInitialSection<T>();
      }),
    ).pipe(map((section) => section ?? createInitialSection<T>()));
  }

  private async updateSection<T>(
    table: Table<SummarySectionRecord<T>, string>,
    playerId: string,
    updater: (section: SummarySection<T>) => SummarySection<T>,
  ): Promise<void> {
    await this.db.transaction('rw', table, async () => {
      const existing = await table.get(playerId);
      const baseSection = existing?.section ?? createInitialSection<T>();
      const nextSection = updater(baseSection);

      const payload: SummarySectionRecord<T> = {
        playerId,
        section: nextSection,
        updatedAt: Date.now(),
      };

      await table.put(payload);
    });
  }

  private async getSection<T>(
    table: Table<SummarySectionRecord<T>, string>,
    playerId: string,
  ): Promise<SummarySection<T>> {
    const record = await table.get(playerId);
    return record?.section ?? createInitialSection<T>();
  }

  private async setSection<T>(
    table: Table<SummarySectionRecord<T>, string>,
    playerId: string,
    section: SummarySection<T>,
  ): Promise<void> {
    await table.put({
      playerId,
      section,
      updatedAt: Date.now(),
    });
  }
}


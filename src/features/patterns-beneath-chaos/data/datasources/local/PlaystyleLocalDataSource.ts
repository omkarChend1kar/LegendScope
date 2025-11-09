import { liveQuery } from 'dexie';
import { from, type Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { SummarySection } from '../../../../../types/SummarySection';
import type { PlaystyleSummaryModel } from '../../models/PatternsSummaryModel';
import { playstyleLocalDb, type PlaystyleSummaryRecord } from './playstyleLocalDb';

const createInitialSection = (): SummarySection<PlaystyleSummaryModel> => ({
  status: 'NOT_STARTED',
  data: null,
});

export class PlaystyleLocalDataSource {
  private readonly db: typeof playstyleLocalDb;

  constructor(db: typeof playstyleLocalDb = playstyleLocalDb) {
    this.db = db;
  }

  watchSummary(playerId: string): Observable<SummarySection<PlaystyleSummaryModel>> {
    return from(
      liveQuery(async () => {
        const record = await this.db.summaries.get(playerId);
        return record?.section ?? createInitialSection();
      }),
    ).pipe(map((section) => section ?? createInitialSection()));
  }

  async getSummary(playerId: string): Promise<SummarySection<PlaystyleSummaryModel>> {
    const record = await this.db.summaries.get(playerId);
    return record?.section ?? createInitialSection();
  }

  async saveSummary(
    playerId: string,
    section: SummarySection<PlaystyleSummaryModel>,
  ): Promise<void> {
    await this.db.summaries.put({
      playerId,
      section,
      updatedAt: Date.now(),
    });
  }

  async updateSummary(
    playerId: string,
    updater: (section: SummarySection<PlaystyleSummaryModel>) => SummarySection<PlaystyleSummaryModel>,
  ): Promise<SummarySection<PlaystyleSummaryModel>> {
    let snapshot: SummarySection<PlaystyleSummaryModel> | null = null;

    await this.db.transaction('rw', this.db.summaries, async () => {
      const existing = await this.db.summaries.get(playerId);
      const base = existing?.section ?? createInitialSection();
      const next = updater(base);

      snapshot = next;

      const payload: PlaystyleSummaryRecord = {
        playerId,
        section: next,
        updatedAt: Date.now(),
      };

      await this.db.summaries.put(payload);
    });

    return snapshot ?? createInitialSection();
  }

  async deleteSummary(playerId: string): Promise<void> {
    await this.db.summaries.delete(playerId);
  }
}

import { liveQuery } from 'dexie';
import { from, type Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { SummarySection } from '../../../../../types/SummarySection';
import type { FaultlinesSummaryModel } from '../../models/FaultlinesSummaryModel';
import { faultlinesLocalDb, type FaultlinesSummaryRecord } from './faultlinesLocalDb';

const createInitialSection = (): SummarySection<FaultlinesSummaryModel> => ({
  status: 'NOT_STARTED',
  data: null,
});

export class FaultlinesLocalDataSource {
  private readonly db: typeof faultlinesLocalDb;

  constructor(db: typeof faultlinesLocalDb = faultlinesLocalDb) {
    this.db = db;
  }

  watchSummary(playerId: string): Observable<SummarySection<FaultlinesSummaryModel>> {
    return from(
      liveQuery(async () => {
        const record = await this.db.summaries.get(playerId);
        return record?.section ?? createInitialSection();
      }),
    ).pipe(map((section) => section ?? createInitialSection()));
  }

  async getSummary(playerId: string): Promise<SummarySection<FaultlinesSummaryModel>> {
    const record = await this.db.summaries.get(playerId);
    return record?.section ?? createInitialSection();
  }

  async saveSummary(
    playerId: string,
    section: SummarySection<FaultlinesSummaryModel>,
  ): Promise<void> {
    await this.db.summaries.put({
      playerId,
      section,
      updatedAt: Date.now(),
    });
  }

  async updateSummary(
    playerId: string,
    updater: (section: SummarySection<FaultlinesSummaryModel>) => SummarySection<FaultlinesSummaryModel>,
  ): Promise<SummarySection<FaultlinesSummaryModel>> {
    let snapshot: SummarySection<FaultlinesSummaryModel> | null = null;

    await this.db.transaction('rw', this.db.summaries, async () => {
      const existing = await this.db.summaries.get(playerId);
      const baseSection = existing?.section ?? createInitialSection();
      const nextSection = updater(baseSection);

      snapshot = nextSection;

      const payload: FaultlinesSummaryRecord = {
        playerId,
        section: nextSection,
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

import Dexie, { type Table } from 'dexie';
import type { SummarySection } from '../../../../../types/SummarySection';
import type { PlaystyleSummaryModel } from '../../models/PatternsSummaryModel';

export interface PlaystyleSummaryRecord {
  playerId: string;
  section: SummarySection<PlaystyleSummaryModel>;
  updatedAt: number;
}

export class PlaystyleLocalDb extends Dexie {
  summaries!: Table<PlaystyleSummaryRecord, string>;

  constructor() {
    super('legend_scope_playstyle_cache');

    this.version(1).stores({
      summaries: '&playerId',
    });
  }
}

export const playstyleLocalDb = new PlaystyleLocalDb();

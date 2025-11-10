import Dexie, { type Table } from 'dexie';
import type { SummarySection } from '../../../../../types/SummarySection';
import type { FaultlinesSummaryModel } from '../../models/FaultlinesSummaryModel';

export interface FaultlinesSummaryRecord {
  playerId: string;
  section: SummarySection<FaultlinesSummaryModel>;
  updatedAt: number;
}

export class FaultlinesLocalDb extends Dexie {
  summaries!: Table<FaultlinesSummaryRecord, string>;

  constructor() {
    super('legend_scope_faultlines_cache');

    this.version(1).stores({
      summaries: '&playerId',
    });
  }
}

export const faultlinesLocalDb = new FaultlinesLocalDb();

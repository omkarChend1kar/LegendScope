import Dexie, { type Table } from 'dexie';
import type { SummarySection } from '../../../types/SummarySection';
import type { SummaryCardsModel } from '../../models/lastTwenty/SummaryCardsModel';
import type { RoleSummaryModel } from '../../models/lastTwenty/RoleSummaryModel';
import type { ChampionSummaryModel } from '../../models/lastTwenty/ChampionSummaryModel';

export interface SummarySectionRecord<T> {
  playerId: string;
  section: SummarySection<T>;
  updatedAt: number;
}

export class EchoesLocalDb extends Dexie {
  summaryCards!: Table<SummarySectionRecord<SummaryCardsModel>, string>;
  roleSummaries!: Table<SummarySectionRecord<RoleSummaryModel[]>, string>;
  championSummaries!: Table<SummarySectionRecord<ChampionSummaryModel[]>, string>;
  constructor() {
    super('echoes_of_battle_cache');

    this.version(1).stores({
      summaryCards: '&playerId',
      roleSummaries: '&playerId',
      championSummaries: '&playerId',
      riskProfiles: '&playerId',
      narratives: '&playerId',
    });

    this.version(2).stores({
      summaryCards: '&playerId',
      roleSummaries: '&playerId',
      championSummaries: '&playerId',
      riskProfiles: null,
      narratives: null,
    });
  }
}

export const echoesLocalDb = new EchoesLocalDb();

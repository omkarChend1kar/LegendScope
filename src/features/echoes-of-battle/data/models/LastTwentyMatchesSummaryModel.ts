import type { SummaryCardsModel } from './lastTwenty/SummaryCardsModel';
import type { RoleSummaryModel } from './lastTwenty/RoleSummaryModel';
import type { ChampionSummaryModel } from './lastTwenty/ChampionSummaryModel';

export interface LastTwentyMatchesSummaryModel {
  summaryCards: SummaryCardsModel;
  roles: RoleSummaryModel[];
  champions: ChampionSummaryModel[];
}

export type {
  SummaryCardsModel as SummaryCardModel,
  RoleSummaryModel,
  ChampionSummaryModel,
};

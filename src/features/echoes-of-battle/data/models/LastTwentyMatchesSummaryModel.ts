import type { SummaryCardsModel } from './lastTwenty/SummaryCardsModel';
import type { RoleSummaryModel } from './lastTwenty/RoleSummaryModel';
import type { ChampionSummaryModel } from './lastTwenty/ChampionSummaryModel';
import type { RiskProfileModel } from './lastTwenty/RiskProfileModel';
import type { NarrativeSummaryModel } from './lastTwenty/NarrativeSummaryModel';

export interface LastTwentyMatchesSummaryModel {
  summaryCards: SummaryCardsModel;
  roles: RoleSummaryModel[];
  champions: ChampionSummaryModel[];
  riskProfile: RiskProfileModel;
  narrative: NarrativeSummaryModel;
}

export type {
  SummaryCardsModel as SummaryCardModel,
  RoleSummaryModel,
  ChampionSummaryModel,
  RiskProfileModel,
  NarrativeSummaryModel,
};

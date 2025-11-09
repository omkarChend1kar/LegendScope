export type GamePhase = 'early' | 'mid' | 'late';

export interface PlaystyleRecordModel {
  games: number;
  wins: number;
  losses: number;
}

export interface PlaystyleSummaryHeaderModel {
  primaryRole: string;
  playstyleLabel: string;
  oneLiner: string;
  record: PlaystyleRecordModel;
  windowLabel?: string;
}

export interface AxisEvidenceModel {
  [key: string]: number;
}

export type AxisMetricDirection = 'positive' | 'negative' | 'neutral';

export interface AxisMetricModel {
  id: string;
  label: string;
  unit?: string;
  value: number;
  displayValue: string;
  direction: AxisMetricDirection;
  percent: number;
}

export interface PlaystyleAxisModel {
  key: string;
  label: string;
  score: number;
  scoreLabel?: string;
  metrics: AxisMetricModel[];
  evidence?: AxisEvidenceModel;
}

export interface PlaystyleAxesModel {
  aggression: PlaystyleAxisModel;
  survivability: PlaystyleAxisModel;
  skirmishBias: PlaystyleAxisModel;
  objectiveImpact: PlaystyleAxisModel;
  visionDiscipline: PlaystyleAxisModel;
  utility: PlaystyleAxisModel;
}

export interface EfficiencyModel {
  kda: number;
  kp: number;
  damageShare: number;
  gpm: number;
  visionPerMin: number;
}

export type TempoMetricDirection = 'positive' | 'negative' | 'neutral';

export interface TempoPhaseMetricModel {
  id: string;
  label: string;
  unit?: string;
  value: number;
  formattedValue: string;
  percent: number;
  direction: TempoMetricDirection;
}

export interface TempoPhaseModel {
  key: GamePhase;
  label: string;
  roleLabel: string;
  killsPer10m: number;
  deathsPer10m: number;
  dpm: number;
  csPerMin: number;
  kp: number;
  metrics: TempoPhaseMetricModel[];
}

export interface TempoHighlightModel {
  id: string;
  title: string;
  phaseLabel: string;
  metricLabel: string;
  description: string;
}

export interface TempoModel {
  bestPhase: 'Early' | 'Mid' | 'Late';
  byPhase: Record<GamePhase, TempoPhaseModel>;
  highlights: TempoHighlightModel[];
}

export interface ConsistencyModel {
  kdaCV: number;
  dpmCV: number;
  kpCV: number;
  csCV: number;
  visionCV: number;
  label: 'Stable' | 'Streaky' | 'Volatile';
}

export interface RoleMixModel {
  [role: string]: number;
}

export interface ChampionComfortAxesDeltaModel {
  [axis: string]: number;
}

export interface ChampionComfortModel {
  champion: string;
  games: number;
  wr: number;
  kda: number;
  axesDelta: ChampionComfortAxesDeltaModel;
}

export interface ChampionPoolModel {
  unique: number;
  entropy: number;
}

export interface RoleAndChampsModel {
  roleMix: RoleMixModel;
  champPool: ChampionPoolModel;
  comfortPicks: ChampionComfortModel[];
}

export interface PlaystyleSummaryModel {
  summary: PlaystyleSummaryHeaderModel;
  axes: PlaystyleAxesModel;
  efficiency: EfficiencyModel;
  tempo: TempoModel;
  consistency: ConsistencyModel;
  roleAndChamps: RoleAndChampsModel;
  insights: string[];
  generatedAt: string;
}

export interface RiotParticipantChallengesModel {
  [key: string]: number | undefined;
}

export interface RiotParticipantModel {
  puuid: string;
  gameId: string;
  matchId: string;
  win: boolean;
  championName: string;
  teamPosition?: string;
  individualPosition?: string;
  lane?: string;
  kills: number;
  deaths: number;
  assists: number;
  kda?: number;
  soloKills?: number;
  killingSprees?: number;
  largestMultiKill?: number;
  timeCCingOthers?: number;
  totalDamageDealtToChampions: number;
  totalDamageTaken: number;
  totalDamageShieldedOnTeammates?: number;
  totalHealsOnTeammates?: number;
  goldEarned: number;
  goldSpent: number;
  totalMinionsKilled: number;
  neutralMinionsKilled: number;
  visionScore: number;
  wardsPlaced?: number;
  wardsKilled?: number;
  detectorWardsPlaced?: number;
  visionWardsBoughtInGame?: number;
  turretTakedowns?: number;
  turretKills?: number;
  inhibitorTakedowns?: number;
  damageDealtToTurrets?: number;
  damageDealtToObjectives?: number;
  baronKills?: number;
  dragonKills?: number;
  objectivesStolen?: number;
  objectivesStolenAssists?: number;
  totalTimeSpentDead: number;
  killsNearEnemyTurret?: number;
  outnumberedKills?: number;
  killsUnderOwnTurret?: number;
  skillshotsDodged?: number;
  skillshotsHit?: number;
  champExperience?: number;
  gameDuration: number;
  gameCreation: number;
  firstBloodKill?: boolean;
  firstBloodAssist?: boolean;
  firstTowerKill?: boolean;
  firstTowerAssist?: boolean;
  assistsInEarlyGame?: number;
  challenges?: RiotParticipantChallengesModel;
}


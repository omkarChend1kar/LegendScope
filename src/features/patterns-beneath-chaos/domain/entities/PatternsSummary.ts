export type GamePhase = 'early' | 'mid' | 'late';

export interface PlaystyleRecord {
  games: number;
  wins: number;
  losses: number;
}

export interface PlaystyleSummaryHeader {
  primaryRole: string;
  playstyleLabel: string;
  oneLiner: string;
  record: PlaystyleRecord;
  windowLabel?: string;
}

export interface AxisEvidence {
  [key: string]: number;
}

export type AxisMetricDirection = 'positive' | 'negative' | 'neutral';

export interface AxisMetric {
  id: string;
  label: string;
  unit?: string;
  value: number;
  displayValue: string;
  direction: AxisMetricDirection;
  percent: number;
}

export interface PlaystyleAxis {
  key: string;
  label: string;
  score: number;
  scoreLabel?: string;
  metrics: AxisMetric[];
  evidence?: AxisEvidence;
}

export interface PlaystyleAxes {
  aggression: PlaystyleAxis;
  survivability: PlaystyleAxis;
  skirmishBias: PlaystyleAxis;
  objectiveImpact: PlaystyleAxis;
  visionDiscipline: PlaystyleAxis;
  utility: PlaystyleAxis;
}

export interface EfficiencySummary {
  kda: number;
  kp: number;
  damageShare: number;
  gpm: number;
  visionPerMin: number;
}

export type TempoMetricDirection = 'positive' | 'negative' | 'neutral';

export interface TempoPhaseMetric {
  id: string;
  label: string;
  unit?: string;
  value: number;
  formattedValue: string;
  percent: number;
  direction: TempoMetricDirection;
}

export interface TempoPhaseSummary {
  key: GamePhase;
  label: string;
  roleLabel: string;
  killsPer10m: number;
  deathsPer10m: number;
  dpm: number;
  csPerMin: number;
  kp: number;
  metrics: TempoPhaseMetric[];
}

export interface TempoHighlight {
  id: string;
  title: string;
  phaseLabel: string;
  metricLabel: string;
  description: string;
}

export interface TempoSummary {
  bestPhase: 'Early' | 'Mid' | 'Late';
  byPhase: Record<GamePhase, TempoPhaseSummary>;
  highlights: TempoHighlight[];
}

export interface ConsistencySummary {
  kdaCV: number;
  dpmCV: number;
  kpCV: number;
  csCV: number;
  visionCV: number;
  label: 'Stable' | 'Streaky' | 'Volatile';
}

export interface RoleMixSummary {
  [role: string]: number;
}

export interface ChampionComfortDelta {
  [axis: string]: number;
}

export interface ChampionComfortSummary {
  champion: string;
  games: number;
  wr: number;
  kda: number;
  axesDelta: ChampionComfortDelta;
}

export interface ChampionPoolSummary {
  unique: number;
  entropy: number;
}

export interface RoleAndChampionSummary {
  roleMix: RoleMixSummary;
  champPool: ChampionPoolSummary;
  comfortPicks: ChampionComfortSummary[];
}

export interface PatternsSummary {
  summary: PlaystyleSummaryHeader;
  axes: PlaystyleAxes;
  efficiency: EfficiencySummary;
  tempo: TempoSummary;
  consistency: ConsistencySummary;
  roleAndChamps: RoleAndChampionSummary;
  insights: string[];
  generatedAt: string;
}


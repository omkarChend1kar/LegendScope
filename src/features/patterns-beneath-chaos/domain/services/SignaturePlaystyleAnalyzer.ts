import type {
  PlaystyleSummaryModel,
  RiotParticipantModel,
  PlaystyleAxesModel,
  PlaystyleAxisModel,
  AxisMetricModel,
  PlaystyleSummaryHeaderModel,
  EfficiencyModel,
  TempoModel,
  TempoPhaseModel,
  TempoPhaseMetricModel,
  TempoHighlightModel,
  ConsistencyModel,
  RoleAndChampsModel,
  ChampionComfortModel,
  ChampionComfortAxesDeltaModel,
} from '../../data/models/PatternsSummaryModel';

interface DerivedMatch {
  matchId: string;
  champion: string;
  role: string;
  win: boolean;
  durationSeconds: number;
  kills: number;
  deaths: number;
  assists: number;
  killsPer10m: number;
  soloKillsPer10m: number;
  dpm: number;
  largestMultiKill: number;
  damageTakenPer10m: number;
  deathsPer10m: number;
  timeDeadPer10m: number;
  takedowns: number;
  takedownsPer10m: number;
  cs: number;
  csPerMin: number;
  gpm: number;
  turretTakesPerGame: number;
  objectiveEpicPerGame: number;
  objectiveDamagePer10m: number;
  objectivesStolenPerGame: number;
  visionPerMin: number;
  wardsKilledPer10m: number;
  detectorsPer10m: number;
  assistsPer10m: number;
  ccTimePer10m: number;
  supportMitigationPer10m: number;
  immobilizePer10m: number;
  killParticipation: number;
  damageShare: number;
  visionScore: number;
  earlyTakedownsHint: number | null;
  midTakedownsHint: number | null;
  earlyDeathsHint: number | null;
  midDeathsHint: number | null;
  earlyCsHint: number | null;
  midCsHint: number | null;
  earlyVisionHint: number | null;
  firstBlood: boolean;
  earlyDeaths: number | null;
}

type MetricBaselines = Record<string, { mean: number; std: number }>;

const METRIC_BASELINES: MetricBaselines = {
  killsPer10m: { mean: 1.2, std: 0.55 },
  soloKillsPer10m: { mean: 0.12, std: 0.08 },
  dpm: { mean: 450, std: 150 },
  largestMultiKill: { mean: 1.25, std: 0.6 },
  damageTakenPer10m: { mean: 1850, std: 420 },
  deathsPer10m: { mean: 0.65, std: 0.22 },
  timeDeadPer10m: { mean: 1.15, std: 0.45 },
  takedownsPer10m: { mean: 2.4, std: 0.7 },
  csPerMin: { mean: 6.1, std: 1.2 },
  turretTakesPerGame: { mean: 0.85, std: 0.55 },
  objectivesEpicPerGame: { mean: 0.45, std: 0.3 },
  objectiveDamagePer10m: { mean: 320, std: 140 },
  objectivesStolenPerGame: { mean: 0.1, std: 0.2 },
  visionPerMin: { mean: 0.85, std: 0.28 },
  wardsKilledPer10m: { mean: 0.32, std: 0.18 },
  detectorsPer10m: { mean: 0.2, std: 0.12 },
  assistsPer10m: { mean: 2.1, std: 0.8 },
  ccTimePer10m: { mean: 11, std: 6 },
  supportMitigationPer10m: { mean: 220, std: 140 },
  immobilizePer10m: { mean: 0.18, std: 0.12 },
};

type AxisKey = keyof PlaystyleAxesModel;
type TempoPhaseKey = 'early' | 'mid' | 'late';

interface AxisDefinition {
  label: string;
  metricOrder: string[];
  weights: Record<string, number>;
}

const AXIS_DEFINITIONS: Record<AxisKey, AxisDefinition> = {
  aggression: {
    label: 'Aggression',
    metricOrder: ['killsPer10m', 'soloKillsPer10m', 'dpm', 'largestMultiKill'],
    weights: {
      killsPer10m: 1,
      soloKillsPer10m: 1,
      dpm: 1,
      largestMultiKill: 0.5,
    },
  },
  survivability: {
    label: 'Survivability',
    metricOrder: ['damageTakenPer10m', 'deathsPer10m', 'timeDeadPer10m'],
    weights: {
      damageTakenPer10m: 1,
      deathsPer10m: -1,
      timeDeadPer10m: -1,
    },
  },
  skirmishBias: {
    label: 'Skirmish Bias',
    metricOrder: ['takedownsPer10m', 'csPerMin'],
    weights: {
      takedownsPer10m: 1,
      csPerMin: -1,
    },
  },
  objectiveImpact: {
    label: 'Objective Impact',
    metricOrder: ['turretTakesPerGame', 'objectivesEpicPerGame', 'objectiveDamagePer10m', 'objectivesStolenPerGame'],
    weights: {
      turretTakesPerGame: 1,
      objectivesEpicPerGame: 1,
      objectiveDamagePer10m: 1,
      objectivesStolenPerGame: 0.5,
    },
  },
  visionDiscipline: {
    label: 'Vision Discipline',
    metricOrder: ['visionPerMin', 'wardsKilledPer10m', 'detectorsPer10m', 'deathsPer10m'],
    weights: {
      visionPerMin: 1,
      wardsKilledPer10m: 1,
      detectorsPer10m: 0.5,
      deathsPer10m: -0.25,
    },
  },
  utility: {
    label: 'Utility',
    metricOrder: ['assistsPer10m', 'ccTimePer10m', 'supportMitigationPer10m', 'immobilizePer10m'],
    weights: {
      assistsPer10m: 1,
      ccTimePer10m: 1,
      supportMitigationPer10m: 0.5,
      immobilizePer10m: 0.5,
    },
  },
};

interface AxisMetricPresentation {
  label: string;
  unit?: string;
  format: (value: number) => string;
}

const AXIS_METRIC_PRESENTATION: Record<string, AxisMetricPresentation> = {
  killsPer10m: {
    label: 'Kill tempo',
    unit: 'per 10m',
    format: (value) => value.toFixed(2),
  },
  soloKillsPer10m: {
    label: 'Solo skirmishes',
    unit: 'per 10m',
    format: (value) => value.toFixed(2),
  },
  dpm: {
    label: 'Damage per minute',
    unit: 'DPM',
    format: (value) => value.toFixed(0),
  },
  largestMultiKill: {
    label: 'Largest multikill',
    format: (value) => value.toFixed(1),
  },
  damageTakenPer10m: {
    label: 'Damage soaked',
    unit: 'per 10m',
    format: (value) => value.toFixed(0),
  },
  deathsPer10m: {
    label: 'Deaths tempo',
    unit: 'per 10m',
    format: (value) => value.toFixed(2),
  },
  timeDeadPer10m: {
    label: 'Time spent dead',
    unit: 'per 10m',
    format: (value) => value.toFixed(2),
  },
  takedownsPer10m: {
    label: 'Takedowns',
    unit: 'per 10m',
    format: (value) => value.toFixed(2),
  },
  csPerMin: {
    label: 'CS cadence',
    unit: 'per min',
    format: (value) => value.toFixed(2),
  },
  turretTakesPerGame: {
    label: 'Turret takes',
    unit: 'per game',
    format: (value) => value.toFixed(2),
  },
  objectivesEpicPerGame: {
    label: 'Epic objectives',
    unit: 'per game',
    format: (value) => value.toFixed(2),
  },
  objectiveDamagePer10m: {
    label: 'Objective damage',
    unit: 'per 10m',
    format: (value) => value.toFixed(0),
  },
  objectivesStolenPerGame: {
    label: 'Objectives stolen',
    unit: 'per game',
    format: (value) => value.toFixed(2),
  },
  visionPerMin: {
    label: 'Vision score',
    unit: 'per min',
    format: (value) => value.toFixed(2),
  },
  wardsKilledPer10m: {
    label: 'Wards cleared',
    unit: 'per 10m',
    format: (value) => value.toFixed(2),
  },
  detectorsPer10m: {
    label: 'Detectors placed',
    unit: 'per 10m',
    format: (value) => value.toFixed(2),
  },
  assistsPer10m: {
    label: 'Assists',
    unit: 'per 10m',
    format: (value) => value.toFixed(2),
  },
  ccTimePer10m: {
    label: 'CC uptime',
    unit: 'per 10m',
    format: (value) => value.toFixed(1),
  },
  supportMitigationPer10m: {
    label: 'Shielding & mitigation',
    unit: 'per 10m',
    format: (value) => value.toFixed(0),
  },
  immobilizePer10m: {
    label: 'Immobilisations',
    unit: 'per 10m',
    format: (value) => value.toFixed(2),
  },
};

type TempoMetricKey = 'killsPer10m' | 'deathsPer10m' | 'dpm' | 'csPerMin' | 'kp';

interface TempoMetricDefinition {
  id: TempoMetricKey;
  label: string;
  unit?: string;
  direction: TempoPhaseMetricModel['direction'];
  format: (value: number) => string;
}

const TEMPO_METRIC_DEFINITIONS: TempoMetricDefinition[] = [
  {
    id: 'killsPer10m',
    label: 'Kill tempo',
    unit: 'per 10m',
    direction: 'positive',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'deathsPer10m',
    label: 'Deaths absorbed',
    unit: 'per 10m',
    direction: 'negative',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'dpm',
    label: 'Damage throughput',
    unit: 'DPM',
    direction: 'positive',
    format: (value) => value.toFixed(0),
  },
  {
    id: 'csPerMin',
    label: 'Economy cadence',
    unit: 'CS/min',
    direction: 'positive',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'kp',
    label: 'Team involvement',
    unit: '%',
    direction: 'positive',
    format: (value) => `${(value * 100).toFixed(0)}%`,
  },
];

const TEMPO_PHASE_LABELS: Record<TempoPhaseKey, string> = {
  early: 'Early game',
  mid: 'Mid game',
  late: 'Late game',
};

const TEMPO_PHASE_ORDER: TempoPhaseKey[] = ['early', 'mid', 'late'];

const clampPercent = (value: number): number => clamp(Math.round(value), 0, 100);

const resolveScoreLabel = (score: number): string => {
  if (score >= 80) {
    return 'Signature strength';
  }
  if (score >= 65) {
    return 'Key advantage';
  }
  if (score >= 50) {
    return 'Balanced';
  }
  if (score >= 35) {
    return 'Developing';
  }
  return 'Needs focus';
};

const metricDirectionFromWeight = (weight: number): AxisMetricModel['direction'] => {
  if (weight > 0) {
    return 'positive';
  }
  if (weight < 0) {
    return 'negative';
  }
  return 'neutral';
};

const computeAxisMetricPercent = (metricKey: string, value: number, weight: number): number => {
  const baseline = METRIC_BASELINES[metricKey];
  if (!baseline || baseline.std === 0) {
    return 50;
  }

  const z = (value - baseline.mean) / baseline.std;
  const adjusted = weight < 0 ? -z : z;
  return clampPercent(50 + adjusted * 18);
};

const buildAxisMetric = (axisKey: AxisKey, metricKey: string, value: number, weight: number): AxisMetricModel => {
  const presentation = AXIS_METRIC_PRESENTATION[metricKey] ?? {
    label: metricKey,
    format: (val: number) => val.toFixed(2),
  };

  return {
    id: `${axisKey}-${metricKey}`,
    label: presentation.label,
    unit: presentation.unit,
    value,
    displayValue: presentation.format(value),
    direction: metricDirectionFromWeight(weight),
    percent: computeAxisMetricPercent(metricKey, value, weight),
  };
};

const computeTempoPercentage = (value: number, direction: TempoMetricDefinition['direction'], maxValue: number): number => {
  if (maxValue === 0) {
    return direction === 'negative' ? 100 : 0;
  }

  if (direction === 'negative') {
    return clampPercent(100 - (value / maxValue) * 100);
  }

  return clampPercent((value / maxValue) * 100);
};

const formatTempoMetric = (definition: TempoMetricDefinition, value: number): string => {
  return definition.format(value);
};

const clamp = (value: number, min: number, max: number): number => Math.min(Math.max(value, min), max);

const sum = (values: number[]): number => values.reduce((acc, value) => acc + value, 0);

const average = (values: number[]): number => (values.length === 0 ? 0 : sum(values) / values.length);

const stdDeviation = (values: number[]): number => {
  if (values.length < 2) {
    return 0;
  }

  const mean = average(values);
  const variance = average(values.map((value) => (value - mean) ** 2));
  return Math.sqrt(variance);
};

const coefficientOfVariation = (values: number[]): number => {
  const mean = average(values);
  if (mean === 0) {
    return 0;
  }

  return stdDeviation(values) / Math.abs(mean);
};

const perTenMinutes = (value: number, durationSeconds: number): number => {
  if (!Number.isFinite(value) || !Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    return 0;
  }

  return (value * 600) / durationSeconds;
};

const perMinute = (value: number, durationSeconds: number): number => {
  if (!Number.isFinite(value) || !Number.isFinite(durationSeconds) || durationSeconds <= 0) {
    return 0;
  }

  return (value * 60) / durationSeconds;
};

const safeNumber = (value: unknown, fallback = 0): number => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
};

const pickChallenge = (participant: RiotParticipantModel, keys: string[]): number | null => {
  if (!participant.challenges) {
    return null;
  }

  for (const key of keys) {
    const value = participant.challenges[key];
    if (Number.isFinite(value)) {
      return value as number;
    }
  }

  return null;
};

const normalizeRole = (participant: RiotParticipantModel): string => {
  const rawRole =
    participant.teamPosition?.toUpperCase() ??
    participant.individualPosition?.toUpperCase() ??
    participant.lane?.toUpperCase() ??
    'UNKNOWN';

  switch (rawRole) {
    case 'JUNGLE':
      return 'JUNGLE';
    case 'MIDDLE':
    case 'MID':
      return 'MID';
    case 'BOTTOM':
    case 'ADC':
      return 'BOTTOM';
    case 'UTILITY':
    case 'SUPPORT':
      return 'SUPPORT';
    case 'TOP':
      return 'TOP';
    default:
      return rawRole === 'UNKNOWN' ? 'FLEX' : rawRole;
  }
};

const computeEntropy = (counts: Record<string, number>): number => {
  const total = sum(Object.values(counts));
  if (total === 0) {
    return 0;
  }

  const probs = Object.values(counts)
    .filter((value) => value > 0)
    .map((value) => value / total);

  const entropy = -sum(probs.map((p) => p * Math.log(p)));
  const maxEntropy = Math.log(Math.max(Object.keys(counts).length, 1));
  if (maxEntropy === 0) {
    return 0;
  }

  return entropy / maxEntropy;
};

const axisScore = (values: Record<string, number>, weights: Record<string, number>): { score: number; zComposite: number } => {
  let totalWeight = 0;
  let zSum = 0;

  for (const [metric, weight] of Object.entries(weights)) {
    const baseline = METRIC_BASELINES[metric];
    if (!baseline) {
      continue;
    }

    const rawValue = values[metric];
    const z = baseline.std === 0 ? 0 : (rawValue - baseline.mean) / baseline.std;
    zSum += z * weight;
    totalWeight += Math.abs(weight);
  }

  const normalizedZ = totalWeight === 0 ? 0 : zSum / totalWeight;
  const score = Math.round(clamp(50 + normalizedZ * 15, 0, 100));

  return { score, zComposite: normalizedZ };
};

const resolveConsistencyLabel = (cv: number): 'Stable' | 'Streaky' | 'Volatile' => {
  if (cv < 0.25) {
    return 'Stable';
  }

  if (cv < 0.45) {
    return 'Streaky';
  }

  return 'Volatile';
};

const selectTopAxes = (axes: PlaystyleAxesModel): [string, number, number][] => {
  const entries: [string, number, number][] = Object.entries(axes).map(([axisKey, axisValue], index) => [
    axisKey,
    axisValue.score,
    index,
  ]);

  return entries.sort((a, b) => b[1] - a[1]);
};

const pickPlaystyleLabel = (
  axes: PlaystyleAxesModel,
  primaryRole: string,
  efficiency: EfficiencyModel,
): { label: string; oneLiner: string } => {
  const sortedAxes = selectTopAxes(axes);
  const topAxis = sortedAxes[0]?.[0];
  const secondAxis = sortedAxes[1]?.[0];
  const aggressionScore = axes.aggression.score;
  const visionScore = axes.visionDiscipline.score;
  const objectiveScore = axes.objectiveImpact.score;
  const utilityScore = axes.utility.score;
  const skirmishScore = axes.skirmishBias.score;

  const buildStatement = (traits: string[]): string => {
    const sentenceParts = [
      traits.join(' & '),
      `(${(efficiency.kp * 100).toFixed(0)}% KP, ${(efficiency.damageShare * 100).toFixed(0)}% DMG share)`,
    ];

    return sentenceParts.join(' ');
  };

  if (topAxis === 'objectiveImpact' && visionScore >= 60) {
    return {
      label: 'Objective-First Navigator',
      oneLiner: buildStatement(['Consistent objective pressure', 'vision tempo to match']),
    };
  }

  if (topAxis === 'aggression' && skirmishScore >= 60) {
    return {
      label: 'Roaming Skirmisher',
      oneLiner: buildStatement(['High kill tempo', 'favors fights over farm']),
    };
  }

  if (topAxis === 'utility' && visionScore >= 60) {
    return {
      label: 'Support Architect',
      oneLiner: buildStatement(['Utility-heavy play', 'vision scaffolds engages']),
    };
  }

  if (topAxis === 'survivability' && aggressionScore < 50) {
    return {
      label: 'Frontline Anchor',
      oneLiner: buildStatement(['Durable engagements', 'controlled deaths pace']),
    };
  }

  if (topAxis === 'skirmishBias' && secondAxis === 'aggression') {
    return {
      label: 'Duelist Instigator',
      oneLiner: buildStatement(['Thrives in skirmishes', 'sacrifices farm for fights']),
    };
  }

  if (topAxis === 'visionDiscipline' && objectiveScore < 55 && utilityScore < 55) {
    return {
      label: 'Map Sentinel',
      oneLiner: buildStatement(['Vision-first approach', 'controls fog of war spikes']),
    };
  }

  if (topAxis === 'utility' && aggressionScore < 50) {
    return {
      label: 'Tactical Enabler',
      oneLiner: buildStatement(['CC and shielding uptime', 'prioritises team success']),
    };
  }

  if (topAxis === 'objectiveImpact' && aggressionScore < 55) {
    return {
      label: 'Methodical Macro Pilot',
      oneLiner: buildStatement(['Macro over mechanics', 'objectives convert leads']),
    };
  }

  if (primaryRole === 'SUPPORT' && utilityScore >= 60) {
    return {
      label: 'Control Support',
      oneLiner: buildStatement(['Peels & setups', 'vision tempo wins fights']),
    };
  }

  if (primaryRole === 'JUNGLE' && objectiveScore >= 60) {
    return {
      label: 'Pathing Maestro',
      oneLiner: buildStatement(['Neutral control', 'keeps fights objective-ready']),
    };
  }

  if (primaryRole === 'MID' && aggressionScore >= 60 && visionScore >= 55) {
    return {
      label: 'Roaming Control Mage',
      oneLiner: buildStatement(['Mid pressure into roams', 'vision covers side lanes']),
    };
  }

  if (primaryRole === 'BOTTOM' && utilityScore < 50 && aggressionScore >= 58) {
    return {
      label: 'Carry Marksman',
      oneLiner: buildStatement(['Damage-centric focus', 'leans on teammates for setup']),
    };
  }

  return {
    label: 'Adaptive Strategist',
    oneLiner: buildStatement(['Balanced axes', 'shifts with draft needs']),
  };
};

const buildInsights = (
  axes: PlaystyleAxesModel,
  efficiency: EfficiencyModel,
  tempo: TempoModel,
  consistency: ConsistencyModel,
): string[] => {
  const statements: string[] = [];
  const sortedAxes = selectTopAxes(axes);
  const topAxis = sortedAxes[0];
  const secondAxis = sortedAxes[1];

  if (topAxis) {
    const [axisKey, score] = topAxis;
    const axis = axes[axisKey as keyof PlaystyleAxesModel];
    const axisName = axis.label
      ? axis.label
      : axisKey
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (char) => char.toUpperCase());
    const topMetrics = axis.metrics
      .slice(0, 2)
      .map((metric) => {
        const unit = metric.unit ? ` ${metric.unit}` : '';
        return `${metric.label}: ${metric.displayValue}${unit}`;
      })
      .join(', ');
    const anchorDescriptor = topMetrics.length > 0 ? topMetrics : 'your recent strengths';
    statements.push(`Your strongest axis is ${axisName} (${score}). Anchor plays around ${anchorDescriptor}.`);
  }

  if (secondAxis) {
    const [axisKey, score] = secondAxis;
    const axis = axes[axisKey as keyof PlaystyleAxesModel];
    const axisName = axis.label
      ? axis.label
      : axisKey
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (char) => char.toUpperCase());
    if (score >= 60) {
      statements.push(
        `${axisName} backs up your primary identity — double down on drafts that exploit this two-axis spike.`,
      );
    }
  }

  const volatilityDescriptor = consistency.label === 'Stable' ? 'steady hand' : consistency.label === 'Streaky' ? 'swingy form' : 'volatile swings';
  statements.push(
    `Consistency profile reads ${consistency.label.toLowerCase()} (KDA CV ${(consistency.kdaCV * 100).toFixed(0)}%). Expect ${volatilityDescriptor} across sets.`,
  );

  if (tempo.bestPhase === 'Early') {
    statements.push(
      'Early game impact shines brightest — leverage pathing or lane setups to convert into herald and dragon tempo.',
    );
  } else if (tempo.bestPhase === 'Mid') {
    statements.push('Mid-game rotations carry your momentum. Sync recalls to contest second and third drakes.');
  } else {
    statements.push('Late-game closer pacing — protect vision flanks to reach decisive fights on your terms.');
  }

  if (efficiency.kp >= 0.6 && efficiency.damageShare >= 0.22) {
    statements.push('High team share: KP and damage output suggest teammates should funnel crucial engages to you.');
  } else if (efficiency.damageShare < 0.18) {
    statements.push('Damage share trails team average — draft for secondary carry or amplify utility to compensate.');
  }

  return Array.from(new Set(statements)).slice(0, 4);
};

const pickBestPhase = (tempo: Record<'early' | 'mid' | 'late', TempoPhaseModel>): 'Early' | 'Mid' | 'Late' => {
  const phaseScores = Object.entries(tempo).map(([phase, metrics]) => {
    const influence =
      metrics.killsPer10m * 0.35 +
      metrics.dpm * 0.002 +
      metrics.kp * 35 +
      metrics.csPerMin * 1.5 -
      metrics.deathsPer10m * 0.4;

    return { phase: phase as 'early' | 'mid' | 'late', influence };
  });

  phaseScores.sort((a, b) => b.influence - a.influence);
  const best = phaseScores[0]?.phase ?? 'mid';

  if (best === 'early') {
    return 'Early';
  }
  if (best === 'late') {
    return 'Late';
  }
  return 'Mid';
};

export class SignaturePlaystyleAnalyzer {
  private readonly minDurationSeconds = 480;

  analyze(participants: RiotParticipantModel[]): PlaystyleSummaryModel {
    const sanitized = participants.filter((participant) =>
      Number.isFinite(participant.gameDuration) && participant.gameDuration >= this.minDurationSeconds,
    );

    if (sanitized.length === 0) {
      throw new Error('No recent matches available to build the playstyle profile.');
    }

    const matches = sanitized.map((participant) => this.deriveMatch(participant));
    const games = matches.length;
    const wins = matches.filter((match) => match.win).length;
    const losses = games - wins;

    const killsPer10Series = matches.map((match) => match.killsPer10m);
    const soloKillsPer10Series = matches.map((match) => match.soloKillsPer10m);
    const dpmSeries = matches.map((match) => match.dpm);
    const multiKillSeries = matches.map((match) => match.largestMultiKill);
    const damageTakenSeries = matches.map((match) => match.damageTakenPer10m);
    const deathsPer10Series = matches.map((match) => match.deathsPer10m);
    const timeDeadSeries = matches.map((match) => match.timeDeadPer10m);
    const takedownsPer10Series = matches.map((match) => match.takedownsPer10m);
    const csPerMinSeries = matches.map((match) => match.csPerMin);
    const turretTakeSeries = matches.map((match) => match.turretTakesPerGame);
    const objectiveEpicSeries = matches.map((match) => match.objectiveEpicPerGame);
    const objectiveDamageSeries = matches.map((match) => match.objectiveDamagePer10m);
    const objectiveStealSeries = matches.map((match) => match.objectivesStolenPerGame);
    const visionPerMinSeries = matches.map((match) => match.visionPerMin);
    const wardsKilledSeries = matches.map((match) => match.wardsKilledPer10m);
    const detectorsSeries = matches.map((match) => match.detectorsPer10m);
    const assistsPer10Series = matches.map((match) => match.assistsPer10m);
    const ccTimeSeries = matches.map((match) => match.ccTimePer10m);
    const mitigationSeries = matches.map((match) => match.supportMitigationPer10m);
    const immobilizeSeries = matches.map((match) => match.immobilizePer10m);
    const kdaSeries = matches.map((match) => {
      const deaths = match.deaths === 0 ? 1 : match.deaths;
      return (match.kills + match.assists) / deaths;
    });
    const kpSeries = matches.map((match) => match.killParticipation);
    const damageShareSeries = matches.map((match) => match.damageShare);
    const gpmSeries = matches.map((match) => match.gpm);
    const axes: PlaystyleAxesModel = {
      aggression: this.buildAxis('aggression', {
        killsPer10m: average(killsPer10Series),
        soloKillsPer10m: average(soloKillsPer10Series),
        dpm: average(dpmSeries),
        largestMultiKill: average(multiKillSeries),
      }),
      survivability: this.buildAxis('survivability', {
        damageTakenPer10m: average(damageTakenSeries),
        deathsPer10m: average(deathsPer10Series),
        timeDeadPer10m: average(timeDeadSeries),
      }),
      skirmishBias: this.buildAxis('skirmishBias', {
        takedownsPer10m: average(takedownsPer10Series),
        csPerMin: average(csPerMinSeries),
      }),
      objectiveImpact: this.buildAxis('objectiveImpact', {
        turretTakesPerGame: average(turretTakeSeries),
        objectivesEpicPerGame: average(objectiveEpicSeries),
        objectiveDamagePer10m: average(objectiveDamageSeries),
        objectivesStolenPerGame: average(objectiveStealSeries),
      }),
      visionDiscipline: this.buildAxis('visionDiscipline', {
        visionPerMin: average(visionPerMinSeries),
        wardsKilledPer10m: average(wardsKilledSeries),
        detectorsPer10m: average(detectorsSeries),
        deathsPer10m: average(deathsPer10Series),
      }),
      utility: this.buildAxis('utility', {
        assistsPer10m: average(assistsPer10Series),
        ccTimePer10m: average(ccTimeSeries),
        supportMitigationPer10m: average(mitigationSeries),
        immobilizePer10m: average(immobilizeSeries),
      }),
    };

    const efficiency: EfficiencyModel = {
      kda: Number(average(kdaSeries).toFixed(2)),
      kp: clamp(average(kpSeries), 0, 1),
      damageShare: clamp(average(damageShareSeries), 0, 1),
      gpm: Math.round(average(gpmSeries)),
      visionPerMin: Number(average(visionPerMinSeries).toFixed(2)),
    };

    const tempo = this.buildTempo(matches);
    const consistency: ConsistencyModel = {
      kdaCV: Number(coefficientOfVariation(kdaSeries).toFixed(2)),
      dpmCV: Number(coefficientOfVariation(dpmSeries).toFixed(2)),
      kpCV: Number(coefficientOfVariation(kpSeries).toFixed(2)),
      csCV: Number(coefficientOfVariation(csPerMinSeries).toFixed(2)),
      visionCV: Number(coefficientOfVariation(visionPerMinSeries).toFixed(2)),
      label: resolveConsistencyLabel(coefficientOfVariation(kdaSeries)),
    };

    const roleAndChamps = this.buildRoleAndChamps(matches, axes);
    const primaryRole = roleAndChamps.primaryRole ?? 'FLEX';

    const { label, oneLiner } = pickPlaystyleLabel(axes, primaryRole, efficiency);
    const insights = buildInsights(axes, efficiency, tempo, consistency);

    const header: PlaystyleSummaryHeaderModel = {
      primaryRole,
      playstyleLabel: label,
      oneLiner,
      record: {
        games,
        wins,
        losses,
      },
      windowLabel: 'Last 20 battles',
    };

    return {
      summary: header,
      axes,
      efficiency,
      tempo,
      consistency,
      roleAndChamps: {
        roleMix: roleAndChamps.roleMix,
        champPool: roleAndChamps.champPool,
        comfortPicks: roleAndChamps.comfortPicks,
      },
      insights,
      generatedAt: new Date().toISOString(),
    };
  }

  private deriveMatch(participant: RiotParticipantModel): DerivedMatch {
    const durationSeconds = participant.gameDuration;
    const role = normalizeRole(participant);
    const takedownsChallenges = safeNumber(participant.challenges?.takedowns);
    const takedownsFirst = pickChallenge(participant, [
      'takedownsFirstXMinutes',
      'takedownsFirst10Minutes',
      'takedownsBefore10Minutes',
      'takedownsBefore15Minutes',
    ]);
    const takedownsBefore20 = pickChallenge(participant, [
      'takedownsBefore20Minutes',
      'takedownsAfterGainingLevelAdvantage',
    ]);
    const deathsBefore10 = pickChallenge(participant, ['deathsBefore10Minutes']);
    const deathsBefore15 = pickChallenge(participant, ['deathsBefore15Minutes']);
    const csFirst2Waves = pickChallenge(participant, ['csOnLaneMinionsFirstWave', 'csScoreTimeline']);
    const visionScorePerMinute = safeNumber(
      participant.challenges?.visionScorePerMinute,
      perMinute(participant.visionScore, durationSeconds),
    );

    const totalMinions = participant.totalMinionsKilled + safeNumber(participant.neutralMinionsKilled);
    const takedowns = takedownsChallenges || participant.kills + participant.assists;
    const turretTakedowns = safeNumber(participant.turretTakedowns) + safeNumber(participant.inhibitorTakedowns);
    const epicObjectives = safeNumber(participant.baronKills) + safeNumber(participant.dragonKills);
    const objectivesStolen = safeNumber(participant.objectivesStolen) + safeNumber(participant.objectivesStolenAssists) * 0.5;
    const mitigation =
      safeNumber(participant.totalDamageShieldedOnTeammates) +
      safeNumber(participant.totalHealsOnTeammates) +
      safeNumber(participant.challenges?.effectiveHealAndShielding);

    const killParticipation = clamp(safeNumber(participant.challenges?.killParticipation), 0, 1);
    const damageShare = clamp(safeNumber(participant.challenges?.teamDamagePercentage), 0, 1);

    return {
      matchId: participant.matchId ?? participant.gameId ?? `${participant.puuid}-${participant.gameCreation}`,
      champion: participant.championName,
      role,
      win: Boolean(participant.win),
      durationSeconds,
      kills: participant.kills,
      deaths: participant.deaths,
      assists: participant.assists,
      killsPer10m: perTenMinutes(participant.kills, durationSeconds),
      soloKillsPer10m: perTenMinutes(safeNumber(participant.soloKills), durationSeconds),
      dpm: perMinute(participant.totalDamageDealtToChampions, durationSeconds),
      largestMultiKill: safeNumber(participant.largestMultiKill),
      damageTakenPer10m: perTenMinutes(participant.totalDamageTaken, durationSeconds),
      deathsPer10m: perTenMinutes(participant.deaths, durationSeconds),
      timeDeadPer10m: perTenMinutes(participant.totalTimeSpentDead, durationSeconds),
      takedowns,
      takedownsPer10m: perTenMinutes(takedowns, durationSeconds),
      cs: totalMinions,
      csPerMin:
        participant.challenges?.csPerMinute !== undefined
          ? safeNumber(participant.challenges?.csPerMinute)
          : perMinute(totalMinions, durationSeconds),
  gpm: safeNumber(participant.challenges?.goldPerMinute, perMinute(participant.goldEarned, durationSeconds)),
      turretTakesPerGame: turretTakedowns,
      objectiveEpicPerGame: epicObjectives,
      objectiveDamagePer10m: perTenMinutes(safeNumber(participant.damageDealtToObjectives), durationSeconds),
      objectivesStolenPerGame: objectivesStolen,
      visionPerMin: visionScorePerMinute,
      wardsKilledPer10m: perTenMinutes(safeNumber(participant.wardsKilled), durationSeconds),
      detectorsPer10m: perTenMinutes(safeNumber(participant.detectorWardsPlaced ?? participant.visionWardsBoughtInGame), durationSeconds),
      assistsPer10m: perTenMinutes(participant.assists, durationSeconds),
      ccTimePer10m: perTenMinutes(safeNumber(participant.timeCCingOthers), durationSeconds),
      supportMitigationPer10m: perTenMinutes(mitigation, durationSeconds),
      immobilizePer10m: perTenMinutes(safeNumber(participant.challenges?.immobilizeAndKillWithAlly), durationSeconds),
      killParticipation,
      damageShare,
      visionScore: participant.visionScore,
      earlyTakedownsHint: takedownsFirst,
      midTakedownsHint: takedownsBefore20,
      earlyDeathsHint: deathsBefore10,
      midDeathsHint: deathsBefore15,
      earlyCsHint: csFirst2Waves,
      midCsHint: null,
      earlyVisionHint: pickChallenge(participant, ['visionScorePerMinute']),
      firstBlood: Boolean(participant.firstBloodKill || participant.firstBloodAssist),
      earlyDeaths: deathsBefore10,
    };
  }

  private buildAxis(axisKey: AxisKey, values: Record<string, number>): PlaystyleAxisModel {
    const definition = AXIS_DEFINITIONS[axisKey];
    const { score } = axisScore(values, definition.weights);

    const metricsWithPriority = definition.metricOrder.map((metricKey) => {
      const rawValue = values[metricKey] ?? 0;
      const weight = definition.weights[metricKey] ?? 0;
      const metric = buildAxisMetric(axisKey, metricKey, rawValue, weight);
      const priority = Math.abs(weight || 1) * metric.percent;
      return { metric, priority };
    });

    const metrics = metricsWithPriority
      .sort((a, b) => b.priority - a.priority)
      .map(({ metric }) => metric);

    return {
      key: axisKey,
      label: definition.label,
      score,
      scoreLabel: resolveScoreLabel(score),
      metrics,
      evidence: { ...values },
    };
  }

  private buildTempo(matches: DerivedMatch[]): TempoModel {
    type PhaseStats = {
      killsPer10m: number;
      deathsPer10m: number;
      dpm: number;
      csPerMin: number;
      kp: number;
    };

    const totals: Record<TempoPhaseKey, PhaseStats> = {
      early: { killsPer10m: 0, deathsPer10m: 0, dpm: 0, csPerMin: 0, kp: 0 },
      mid: { killsPer10m: 0, deathsPer10m: 0, dpm: 0, csPerMin: 0, kp: 0 },
      late: { killsPer10m: 0, deathsPer10m: 0, dpm: 0, csPerMin: 0, kp: 0 },
    };

    const samples: Record<TempoPhaseKey, number> = {
      early: 0,
      mid: 0,
      late: 0,
    };

    matches.forEach((match) => {
      const duration = match.durationSeconds;
      const earlyDuration = Math.min(duration, 14 * 60);
      const midDuration = Math.min(Math.max(duration - earlyDuration, 0), 11 * 60);
      const lateDuration = Math.max(duration - earlyDuration - midDuration, 0);
      const totalDuration = duration;

      const takedowns = Math.max(match.takedowns, 1);
      const earlyTakedowns = match.earlyTakedownsHint ?? takedowns * (earlyDuration / totalDuration);
      const midTakedowns = match.midTakedownsHint ?? takedowns * (midDuration / totalDuration);
      const lateTakedowns = Math.max(takedowns - earlyTakedowns - midTakedowns, 0);

      const killsPer10 = match.killsPer10m;
      const deathsPer10 = match.deathsPer10m;
      const dpm = match.dpm;
      const csPerMin = match.csPerMin;
      const kp = match.killParticipation;

      const distribute = (value: number, phaseDuration: number, reference?: number): number => {
        if (phaseDuration <= 0) {
          return 0;
        }
        if (reference !== undefined) {
          return reference;
        }
        return value;
      };

      const earlyKillsPer10 = distribute(killsPer10, earlyDuration, perTenMinutes(earlyTakedowns, earlyDuration));
      const midKillsPer10 = distribute(killsPer10, midDuration, perTenMinutes(midTakedowns, midDuration));
      const lateKillsPer10 = distribute(killsPer10, lateDuration, perTenMinutes(Math.max(lateTakedowns, 0), lateDuration));

      const earlyDeathsPer10 = distribute(
        deathsPer10,
        earlyDuration,
        perTenMinutes(match.earlyDeathsHint ?? 0, earlyDuration),
      );
      const midDeathsPer10 = distribute(
        deathsPer10,
        midDuration,
        perTenMinutes(Math.max((match.midDeathsHint ?? 0) - (match.earlyDeathsHint ?? 0), 0), midDuration),
      );
      const lateDeathsPer10 = distribute(deathsPer10, lateDuration);

      const earlyDpm = distribute(dpm, earlyDuration);
      const midDpm = distribute(dpm, midDuration);
      const lateDpm = distribute(dpm, lateDuration);

      const earlyCs = distribute(csPerMin, earlyDuration);
      const midCs = distribute(csPerMin, midDuration);
      const lateCs = distribute(csPerMin, lateDuration);

      const earlyKp = distribute(kp, earlyDuration);
      const midKp = distribute(kp, midDuration);
      const lateKp = distribute(kp, lateDuration);

      const phaseData: Record<TempoPhaseKey, [number, PhaseStats]> = {
        early: [earlyDuration, { killsPer10m: earlyKillsPer10, deathsPer10m: earlyDeathsPer10, dpm: earlyDpm, csPerMin: earlyCs, kp: earlyKp }],
        mid: [midDuration, { killsPer10m: midKillsPer10, deathsPer10m: midDeathsPer10, dpm: midDpm, csPerMin: midCs, kp: midKp }],
        late: [lateDuration, { killsPer10m: lateKillsPer10, deathsPer10m: lateDeathsPer10, dpm: lateDpm, csPerMin: lateCs, kp: lateKp }],
      };

      TEMPO_PHASE_ORDER.forEach((phaseKey) => {
        const [phaseDuration, data] = phaseData[phaseKey];
        if (phaseDuration <= 0) {
          return;
        }

        totals[phaseKey].killsPer10m += data.killsPer10m;
        totals[phaseKey].deathsPer10m += data.deathsPer10m;
        totals[phaseKey].dpm += data.dpm;
        totals[phaseKey].csPerMin += data.csPerMin;
        totals[phaseKey].kp += data.kp;
        samples[phaseKey] += 1;
      });
    });

    const averagedPhases = TEMPO_PHASE_ORDER.reduce<Record<TempoPhaseKey, PhaseStats>>((acc, phaseKey) => {
      const sampleCount = Math.max(samples[phaseKey], 1);
      const totalsForPhase = totals[phaseKey];

      acc[phaseKey] = {
        killsPer10m: Number((totalsForPhase.killsPer10m / sampleCount).toFixed(2)),
        deathsPer10m: Number((totalsForPhase.deathsPer10m / sampleCount).toFixed(2)),
        dpm: Number((totalsForPhase.dpm / sampleCount).toFixed(0)),
        csPerMin: Number((totalsForPhase.csPerMin / sampleCount).toFixed(2)),
        kp: Number(clamp(totalsForPhase.kp / sampleCount, 0, 1).toFixed(2)),
      };

      return acc;
    }, {
      early: { killsPer10m: 0, deathsPer10m: 0, dpm: 0, csPerMin: 0, kp: 0 },
      mid: { killsPer10m: 0, deathsPer10m: 0, dpm: 0, csPerMin: 0, kp: 0 },
      late: { killsPer10m: 0, deathsPer10m: 0, dpm: 0, csPerMin: 0, kp: 0 },
    });

    const maxima: Record<TempoMetricKey, number> = {
      killsPer10m: 0,
      deathsPer10m: 0,
      dpm: 0,
      csPerMin: 0,
      kp: 0,
    };

    TEMPO_PHASE_ORDER.forEach((phaseKey) => {
      const stats = averagedPhases[phaseKey];
      maxima.killsPer10m = Math.max(maxima.killsPer10m, stats.killsPer10m);
      maxima.deathsPer10m = Math.max(maxima.deathsPer10m, stats.deathsPer10m);
      maxima.dpm = Math.max(maxima.dpm, stats.dpm);
      maxima.csPerMin = Math.max(maxima.csPerMin, stats.csPerMin);
      maxima.kp = Math.max(maxima.kp, stats.kp);
    });

    const averageKp = TEMPO_PHASE_ORDER.reduce((accumulator, phaseKey) => accumulator + averagedPhases[phaseKey].kp, 0) /
      TEMPO_PHASE_ORDER.length;

    const byPhase = TEMPO_PHASE_ORDER.reduce<Record<TempoPhaseKey, TempoPhaseModel>>((acc, phaseKey) => {
      const stats = averagedPhases[phaseKey];
      const metrics = TEMPO_METRIC_DEFINITIONS.map((definition) => {
        const rawValue = stats[definition.id];
        const percent = computeTempoPercentage(rawValue, definition.direction, maxima[definition.id]);
        const formattedValue = formatTempoMetric(definition, rawValue);

        return {
          id: definition.id,
          label: definition.label,
          unit: definition.unit,
          value: rawValue,
          formattedValue,
          percent,
          direction: definition.direction,
        } as TempoPhaseMetricModel;
      });

      const roleLabel = (() => {
        if (stats.kp >= averageKp + 0.08) {
          return 'Teamfight anchor';
        }
        if (stats.kp <= averageKp - 0.08) {
          return 'Solo pressure';
        }
        return 'Balanced tempo';
      })();

      acc[phaseKey] = {
        key: phaseKey,
        label: TEMPO_PHASE_LABELS[phaseKey],
        roleLabel,
        killsPer10m: stats.killsPer10m,
        deathsPer10m: stats.deathsPer10m,
        dpm: stats.dpm,
        csPerMin: stats.csPerMin,
        kp: stats.kp,
        metrics,
      };

      return acc;
    }, {} as Record<TempoPhaseKey, TempoPhaseModel>);

    const bestPhase = pickBestPhase(byPhase);
    const highlights = this.buildTempoHighlights(byPhase);

    return {
      bestPhase,
      byPhase,
      highlights,
    };
  }

  private buildTempoHighlights(phases: Record<TempoPhaseKey, TempoPhaseModel>): TempoHighlightModel[] {
    const phaseList = TEMPO_PHASE_ORDER.map((phaseKey) => phases[phaseKey]).filter(
      (phase): phase is TempoPhaseModel => Boolean(phase),
    );

    if (phaseList.length === 0) {
      return [];
    }

    const pickPhase = (selector: (phase: TempoPhaseModel) => number, preferLowest = false): TempoPhaseModel | null => {
      return phaseList.reduce<TempoPhaseModel | null>((best, current) => {
        if (!best) {
          return current;
        }

        const bestValue = selector(best);
        const currentValue = selector(current);

        if (preferLowest ? currentValue < bestValue : currentValue > bestValue) {
          return current;
        }

        return best;
      }, null);
    };

    const findMetric = (phase: TempoPhaseModel, metricId: TempoMetricKey): TempoPhaseMetricModel | undefined =>
      phase.metrics.find((metric) => metric.id === metricId);

    const highlights: TempoHighlightModel[] = [];

    const addHighlight = (
      phase: TempoPhaseModel | null,
      id: string,
      title: string,
      metricId: TempoMetricKey,
      description: string,
    ) => {
      if (!phase) {
        return;
      }

      const metric = findMetric(phase, metricId);
      if (!metric) {
        return;
      }

      const metricLabel = metric.unit && !metric.formattedValue.includes(metric.unit)
        ? `${metric.formattedValue} ${metric.unit}`
        : metric.formattedValue;

      highlights.push({
        id,
        title,
        phaseLabel: phase.label,
        metricLabel,
        description,
      });
    };

    addHighlight(
      pickPhase((phase) => phase.dpm),
      'damage-window',
      'Damage power spike',
      'dpm',
      'Your most explosive damage window—plan objective fights here.',
    );

    addHighlight(
      pickPhase((phase) => phase.kp),
      'involvement-crest',
      'Teamfight alignment',
      'kp',
      'Highest team involvement—sync rotations to maximise KP impact.',
    );

    addHighlight(
      pickPhase((phase) => phase.deathsPer10m, true),
      'stability-window',
      'Stability pocket',
      'deathsPer10m',
      'Safest stretch to absorb pressure, reset waves, and stabilise tempo.',
    );

    addHighlight(
      pickPhase((phase) => phase.csPerMin),
      'economy-ramp',
      'Economy ramp',
      'csPerMin',
      'Peak farming cadence—channel resources and set up win conditions.',
    );

    return highlights;
  }

  private buildRoleAndChamps(matches: DerivedMatch[], axes: PlaystyleAxesModel): RoleAndChampsModel & { primaryRole: string | null } {
    const roleCounts: Record<string, number> = {};
    const championBuckets: Record<string, DerivedMatch[]> = {};

    matches.forEach((match) => {
      roleCounts[match.role] = (roleCounts[match.role] ?? 0) + 1;
      championBuckets[match.champion] = championBuckets[match.champion] ?? [];
      championBuckets[match.champion].push(match);
    });

    const totalGames = matches.length;
    const roleMix = Object.fromEntries(
      Object.entries(roleCounts).map(([role, count]) => [role, Number(((count / totalGames) * 100).toFixed(0))]),
    );

    const primaryRole = Object.entries(roleCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

    const comfortPicks: ChampionComfortModel[] = Object.entries(championBuckets)
      .filter(([, games]) => games.length >= 3)
      .map(([champion, games]): ChampionComfortModel => {
        const axesDelta = this.computeChampionDelta(games, axes);
        const wins = games.filter((match) => match.win).length;
        const deaths = games.reduce((acc, match) => acc + Math.max(match.deaths, 0), 0);
        const kda = games.reduce((acc, match) => acc + match.kills + match.assists, 0) / Math.max(deaths, 1);

        return {
          champion,
          games: games.length,
          wr: Number(((wins / games.length) * 100).toFixed(0)),
          kda: Number(kda.toFixed(2)),
          axesDelta,
        };
      })
      .sort((a, b) => b.games - a.games || b.wr - a.wr)
      .slice(0, 4);

    const champCounts = Object.fromEntries(Object.entries(championBuckets).map(([champ, games]) => [champ, games.length]));
    const champPool = {
      unique: Object.keys(championBuckets).length,
      entropy: Number(computeEntropy(champCounts).toFixed(2)),
    };

    return {
      primaryRole,
      roleMix,
      champPool,
      comfortPicks,
    };
  }

  private computeChampionDelta(matches: DerivedMatch[], overallAxes: PlaystyleAxesModel): ChampionComfortAxesDeltaModel {
    const killsPer10Series = matches.map((match) => match.killsPer10m);
    const soloKillsPer10Series = matches.map((match) => match.soloKillsPer10m);
    const dpmSeries = matches.map((match) => match.dpm);
    const multiKillSeries = matches.map((match) => match.largestMultiKill);
    const damageTakenSeries = matches.map((match) => match.damageTakenPer10m);
    const deathsPer10Series = matches.map((match) => match.deathsPer10m);
    const timeDeadSeries = matches.map((match) => match.timeDeadPer10m);
    const takedownsPer10Series = matches.map((match) => match.takedownsPer10m);
    const csPerMinSeries = matches.map((match) => match.csPerMin);
    const turretTakeSeries = matches.map((match) => match.turretTakesPerGame);
    const objectiveEpicSeries = matches.map((match) => match.objectiveEpicPerGame);
    const objectiveDamageSeries = matches.map((match) => match.objectiveDamagePer10m);
    const objectiveStealSeries = matches.map((match) => match.objectivesStolenPerGame);
    const visionPerMinSeries = matches.map((match) => match.visionPerMin);
    const wardsKilledSeries = matches.map((match) => match.wardsKilledPer10m);
    const detectorsSeries = matches.map((match) => match.detectorsPer10m);
    const assistsPer10Series = matches.map((match) => match.assistsPer10m);
    const ccTimeSeries = matches.map((match) => match.ccTimePer10m);
    const mitigationSeries = matches.map((match) => match.supportMitigationPer10m);
    const immobilizeSeries = matches.map((match) => match.immobilizePer10m);

    const axes: PlaystyleAxesModel = {
      aggression: this.buildAxis('aggression', {
        killsPer10m: average(killsPer10Series),
        soloKillsPer10m: average(soloKillsPer10Series),
        dpm: average(dpmSeries),
        largestMultiKill: average(multiKillSeries),
      }),
      survivability: this.buildAxis('survivability', {
        damageTakenPer10m: average(damageTakenSeries),
        deathsPer10m: average(deathsPer10Series),
        timeDeadPer10m: average(timeDeadSeries),
      }),
      skirmishBias: this.buildAxis('skirmishBias', {
        takedownsPer10m: average(takedownsPer10Series),
        csPerMin: average(csPerMinSeries),
      }),
      objectiveImpact: this.buildAxis('objectiveImpact', {
        turretTakesPerGame: average(turretTakeSeries),
        objectivesEpicPerGame: average(objectiveEpicSeries),
        objectiveDamagePer10m: average(objectiveDamageSeries),
        objectivesStolenPerGame: average(objectiveStealSeries),
      }),
      visionDiscipline: this.buildAxis('visionDiscipline', {
        visionPerMin: average(visionPerMinSeries),
        wardsKilledPer10m: average(wardsKilledSeries),
        detectorsPer10m: average(detectorsSeries),
        deathsPer10m: average(deathsPer10Series),
      }),
      utility: this.buildAxis('utility', {
        assistsPer10m: average(assistsPer10Series),
        ccTimePer10m: average(ccTimeSeries),
        supportMitigationPer10m: average(mitigationSeries),
        immobilizePer10m: average(immobilizeSeries),
      }),
    };

    const deltas: ChampionComfortAxesDeltaModel = {};

    (Object.keys(axes) as Array<keyof PlaystyleAxesModel>).forEach((axisKey) => {
      deltas[axisKey] = Number((axes[axisKey].score - overallAxes[axisKey].score).toFixed(0));
    });

    return deltas;
  }
}

import type { SummarySection } from '../../../../../types/SummarySection';
import type { FaultlinesSummaryModel } from '../../models/FaultlinesSummaryModel';

const mockSummary: FaultlinesSummaryModel = {
  playerId: 'mock-player',
  windowLabel: 'Last 20 battles',
  generatedAt: new Date().toISOString(),
  axes: [
    {
      id: 'combat_efficiency_index',
      title: 'Combat Efficiency Index',
      description: 'Measures offensive efficiency — how much impact per engagement.',
      derivedFrom: ['Kills', 'Assists', 'Damage Dealt', 'Kill Participation'],
      score: 78,
      insight: 'You excel in sustained fights with allies but overcommit when entering alone.',
      visualization: {
        type: 'bar',
        value: 78,
        benchmark: 64,
      },
      metrics: [
        {
          id: 'kda_ratio',
          label: 'KDA Ratio',
          value: 3.4,
          formattedValue: '3.4',
          unit: '',
          percent: 0.78,
          trend: 'up',
        },
        {
          id: 'kill_participation',
          label: 'Kill Participation',
          value: 0.68,
          formattedValue: '68%',
          unit: '%',
          percent: 0.68,
          trend: 'flat',
        },
        {
          id: 'solo_kill_margin',
          label: 'Solo Kill Margin',
          value: -0.12,
          formattedValue: '-12%',
          unit: '%',
          percent: 0.38,
          trend: 'down',
        },
      ],
    },
    {
      id: 'objective_reliability_index',
      title: 'Objective Reliability Index',
      description: 'How consistent you are in helping secure major objectives.',
      derivedFrom: ['Baron Kills', 'Dragon Kills', 'Turret Kills', 'Objective Damage'],
      score: 72,
      insight: 'High presence in objective takes, but defenses against steals need tighter vision nets.',
      visualization: {
        type: 'progress',
        value: 72,
        benchmark: 65,
      },
      metrics: [
        {
          id: 'baron_presence',
          label: 'Baron Presence',
          value: 0.82,
          formattedValue: '82%',
          unit: '%',
          percent: 0.82,
          trend: 'up',
        },
        {
          id: 'steal_prevention',
          label: 'Steal Prevention',
          value: 0.52,
          formattedValue: '52%',
          unit: '%',
          percent: 0.52,
          trend: 'down',
        },
      ],
    },
    {
      id: 'survival_discipline_index',
      title: 'Survival Discipline',
      description: 'Ability to minimise unnecessary deaths and adapt defensively.',
      derivedFrom: ['Deaths', 'Damage Taken', 'Heals', 'Shields', 'Crowd Control Time'],
      score: 46,
      insight: 'Great trading efficiency overall, but deaths spike during extended split-push attempts.',
      visualization: {
        type: 'histogram',
        buckets: [
          { label: '0-3', value: 6 },
          { label: '4-6', value: 8 },
          { label: '7-9', value: 4 },
          { label: '10+', value: 2 },
        ],
      },
      metrics: [
        {
          id: 'avg_deaths',
          label: 'Deaths / Game',
          value: 5.1,
          formattedValue: '5.1',
          percent: 0.51,
          trend: 'down',
        },
        {
          id: 'overextension_rate',
          label: 'Overextension Rate',
          value: 0.33,
          formattedValue: '33%',
          unit: '%',
          percent: 0.33,
          trend: 'down',
        },
      ],
    },
    {
      id: 'vision_awareness_index',
      title: 'Vision & Awareness Index',
      description: 'Vision setup and map control awareness.',
      derivedFrom: ['Vision Score', 'Wards Placed', 'Wards Cleared', 'Vision Per Minute'],
      score: 58,
      insight: 'Strong vision throughput in mid game but limited enemy ward clears reduce objective safety.',
      visualization: {
        type: 'line',
        points: [
          { label: 'Game 1', value: 52 },
          { label: 'Game 2', value: 60 },
          { label: 'Game 3', value: 55 },
          { label: 'Game 4', value: 59 },
          { label: 'Game 5', value: 63 },
        ],
      },
      metrics: [
        {
          id: 'vision_score_pm',
          label: 'Vision / Min',
          value: 1.25,
          formattedValue: '1.25',
          percent: 0.65,
          trend: 'up',
        },
        {
          id: 'wards_cleared',
          label: 'Wards Cleared',
          value: 2.1,
          formattedValue: '2.1',
          percent: 0.42,
          trend: 'flat',
        },
      ],
    },
    {
      id: 'economy_utilization_index',
      title: 'Economy Utilization Index',
      description: 'Efficiency in converting gold into meaningful pressure.',
      derivedFrom: ['Gold Earned', 'Gold Spent', 'Damage / Gold'],
      score: 81,
      insight: 'Gold rarely sits idle—conversions into objective pressure are best-in-role.',
      visualization: {
        type: 'scatter',
        points: [
          { x: 12.5, y: 14.1, label: '24m Win' },
          { x: 10.8, y: 11.9, label: '29m Win' },
          { x: 13.2, y: 12.7, label: '31m Loss' },
          { x: 11.4, y: 10.8, label: '33m Loss' },
        ],
      },
      metrics: [
        {
          id: 'gold_spent_ratio',
          label: 'Gold Spent Ratio',
          value: 0.94,
          formattedValue: '94%',
          unit: '%',
          percent: 0.94,
          trend: 'up',
        },
        {
          id: 'damage_per_gold',
          label: 'Damage per 1000 Gold',
          value: 1.32,
          formattedValue: '1.32k',
          percent: 0.82,
          trend: 'up',
        },
      ],
    },
    {
      id: 'role_stability_index',
      title: 'Role Stability Index',
      description: 'Measures performance stability across primary and secondary roles.',
      derivedFrom: ['Role Win Rate', 'Role KDA', 'Role CS'],
      score: 64,
      insight: 'Jungle and mid performances are steady; top lane remains volatile when drafted second.',
      visualization: {
        type: 'radar',
        axes: [
          { label: 'Jungle', value: 78 },
          { label: 'Mid', value: 70 },
          { label: 'Top', value: 48 },
          { label: 'Support', value: 52 },
        ],
      },
      metrics: [
        {
          id: 'role_winrate',
          label: 'Role Win Rate Range',
          value: 0.22,
          formattedValue: '22pp',
          unit: 'pp',
          percent: 0.56,
          trend: 'flat',
        },
        {
          id: 'role_kda_delta',
          label: 'Role KDA Delta',
          value: 1.8,
          formattedValue: '1.8',
          percent: 0.45,
          trend: 'down',
        },
      ],
    },
    {
      id: 'momentum_index',
      title: 'Momentum Index',
      description: 'Captures streak patterns — momentum and recovery.',
      derivedFrom: ['Win Streaks', 'Loss Streaks', 'Comeback Wins'],
      score: 55,
      insight: 'Once a win streak starts you maintain it, but recovery from two-loss runs is still shaky.',
      visualization: {
        type: 'timeline',
        points: [
          { label: 'Match 1', value: 10 },
          { label: 'Match 5', value: 38 },
          { label: 'Match 10', value: 65 },
          { label: 'Match 15', value: 44 },
          { label: 'Match 20', value: 58 },
        ],
      },
      metrics: [
        {
          id: 'win_streak_cap',
          label: 'Peak Win Streak',
          value: 4,
          formattedValue: '4',
          percent: 0.4,
          trend: 'flat',
        },
        {
          id: 'loss_recovery_time',
          label: 'Recovery Time (games)',
          value: 2.4,
          formattedValue: '2.4',
          percent: 0.48,
          trend: 'down',
        },
      ],
    },
    {
      id: 'composure_index',
      title: 'Composure Index',
      description: 'Evaluates consistency between best & worst matches.',
      derivedFrom: ['KDA Standard Deviation', 'Gold Deviation', 'Deaths Deviation'],
      score: 49,
      insight: 'Explosive highs but equally deep lows—tightening death control stabilises clutch games.',
      visualization: {
        type: 'boxplot',
        distribution: {
          min: 28,
          q1: 42,
          median: 54,
          q3: 71,
          max: 96,
        },
      },
      metrics: [
        {
          id: 'kda_variance',
          label: 'KDA Variance',
          value: 0.68,
          formattedValue: '0.68',
          percent: 0.68,
          trend: 'down',
        },
        {
          id: 'death_spread',
          label: 'Death Spread',
          value: 0.44,
          formattedValue: '44%',
          unit: '%',
          percent: 0.44,
          trend: 'flat',
        },
      ],
    },
  ],
};

export class FaultlinesMockDataSource {
  async fetchSummary(playerId: string): Promise<SummarySection<FaultlinesSummaryModel>> {
    const summary = JSON.parse(JSON.stringify(mockSummary)) as FaultlinesSummaryModel;
    summary.playerId = playerId;

    return {
      status: 'READY',
      data: summary,
    };
  }
}

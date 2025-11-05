// Domain entity for Battle Statistics
export interface Statistic {
  label: string;
  value: string | number;
  icon: string;
  trend?: string;
}

export class BattleStatistics {
  battles: number;
  victories: number;
  gloryMoments: number;
  kda: number;
  winStreak: number;
  totalGames: number;
  pentakills: number;
  avgWards: number;
  objectives: number;
  comebackPercentage: number;
  consistencyIndex: number;

  constructor(
    battles: number,
    victories: number,
    gloryMoments: number,
    kda: number,
    winStreak: number,
    totalGames: number,
    pentakills: number,
    avgWards: number,
    objectives: number,
    comebackPercentage: number,
    consistencyIndex: number
  ) {
    this.battles = battles;
    this.victories = victories;
    this.gloryMoments = gloryMoments;
    this.kda = kda;
    this.winStreak = winStreak;
    this.totalGames = totalGames;
    this.pentakills = pentakills;
    this.avgWards = avgWards;
    this.objectives = objectives;
    this.comebackPercentage = comebackPercentage;
    this.consistencyIndex = consistencyIndex;
  }

  toStatisticCards(): Statistic[] {
    return [
      { label: 'Battles', value: this.battles, icon: 'Swords' },
      { label: 'Victories', value: this.victories, icon: 'Trophy', trend: '+12% this month' },
      { label: 'Glory Moments', value: this.gloryMoments, icon: 'Sparkles' },
      { label: 'KDA Ratio', value: this.kda, icon: 'Target' },
      { label: 'Win Streak', value: this.winStreak, icon: 'Flame', trend: 'Current streak' },
      { label: 'Games This Season', value: this.totalGames, icon: 'Activity' },
      { label: 'Pentakills', value: this.pentakills, icon: 'Zap' },
      { label: 'Vision Control', value: this.avgWards, icon: 'Eye', trend: 'Avg wards per game' },
      { label: 'Objective Hunter', value: this.objectives, icon: 'Crosshair', trend: 'Dragons & Barons' },
      { label: 'Comeback Factor', value: `${this.comebackPercentage}%`, icon: 'TrendingUp', trend: 'Won from behind' },
      { label: 'Consistency Index', value: `${this.consistencyIndex}%`, icon: 'BarChart3', trend: 'Performance stability' },
    ];
  }

  get winRate(): number {
    return (this.victories / this.battles) * 100;
  }
}

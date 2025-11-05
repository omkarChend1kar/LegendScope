import type { BattleStatisticsModel } from '../models/BattleStatisticsModel';
import type { TimelineModel } from '../models/TimelineModel';
import type { DefiningMatchModel } from '../models/DefiningMatchModel';
import type { ChampionDistributionModel } from '../models/ChampionDistributionModel';
import type { RoleDistributionModel } from '../models/RoleDistributionModel';
import type { ProgressModel } from '../models/ProgressModel';

export interface EchoesOfBattleRepository {
  getBattleStatistics(playerId: string): Promise<BattleStatisticsModel>;
  getTimelineData(playerId: string): Promise<TimelineModel>;
  getDefiningMatch(playerId: string): Promise<DefiningMatchModel>;
  getChampionDistribution(playerId: string): Promise<ChampionDistributionModel>;
  getRoleDistribution(playerId: string): Promise<RoleDistributionModel>;
  getProgressData(playerId: string): Promise<ProgressModel>;
}

export class EchoesOfBattleRepositoryImpl implements EchoesOfBattleRepository {
  private useMockData: boolean;
  
  constructor(useMockData: boolean = true) {
    this.useMockData = useMockData;
  }

  async getBattleStatistics(playerId: string): Promise<BattleStatisticsModel> {
    if (this.useMockData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        battles: 847,
        victories: 453,
        gloryMoments: 5234,
        kda: 2.95,
        winStreak: 12,
        totalGames: 234,
        pentakills: 7,
        avgWards: 42.8,
        objectives: 156,
        comebackPercentage: 34,
        consistencyIndex: 82,
      };
    }

    // TODO: Implement actual API call
    const response = await fetch(`/api/battles/${playerId}/statistics`);
    return response.json();
  }

  async getTimelineData(playerId: string): Promise<TimelineModel> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        dataPoints: [
          { month: 'Jan', games: 65 },
          { month: 'Feb', games: 72 },
          { month: 'Mar', games: 68 },
          { month: 'Apr', games: 80 },
          { month: 'May', games: 75 },
          { month: 'Jun', games: 85 },
          { month: 'Jul', games: 92 },
          { month: 'Aug', games: 78 },
          { month: 'Sep', games: 70 },
          { month: 'Oct', games: 62 },
          { month: 'Nov', games: 58 },
          { month: 'Dec', games: 67 },
        ],
        peakMonth: 'July',
        lowestMonth: 'November',
        narrative: 'Your battles peaked in July and dipped in November',
      };
    }

    const response = await fetch(`/api/battles/${playerId}/timeline`);
    return response.json();
  }

  async getDefiningMatch(playerId: string): Promise<DefiningMatchModel> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        championName: 'Caitlyn',
        kills: 21,
        deaths: 3,
        assists: 14,
        date: 'September 15, 2024',
        damage: 38492,
        gameMode: 'Ranked Solo/Duo',
      };
    }

    const response = await fetch(`/api/battles/${playerId}/defining-match`);
    return response.json();
  }

  async getChampionDistribution(playerId: string): Promise<ChampionDistributionModel> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        champions: [
          { name: 'Caitlyn', percentage: 33, games: 77, color: '#6366f1' },
          { name: 'Jinx', percentage: 22, games: 51, color: '#8b5cf6' },
          { name: 'Vayne', percentage: 18, games: 42, color: '#ec4899' },
          { name: 'Ezreal', percentage: 16, games: 37, color: '#f59e0b' },
          { name: 'Others', percentage: 11, games: 27, color: '#64748b' },
        ],
        totalGames: 234,
      };
    }

    const response = await fetch(`/api/battles/${playerId}/champions`);
    return response.json();
  }

  async getRoleDistribution(playerId: string): Promise<RoleDistributionModel> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        roles: [
          { role: 'Bot Lane', winRate: 57, games: 142 },
          { role: 'Support', winRate: 50, games: 48 },
          { role: 'Mid Lane', winRate: 45, games: 22 },
          { role: 'Jungle', winRate: 52, games: 15 },
          { role: 'Top Lane', winRate: 48, games: 7 },
        ],
      };
    }

    const response = await fetch(`/api/battles/${playerId}/roles`);
    return response.json();
  }

  async getProgressData(playerId: string): Promise<ProgressModel> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        metrics: [
          { label: 'Win Rate', currentValue: 53.5, previousValue: 48.3, change: '↑ 5.2%', isPositive: true, unit: '%' },
          { label: 'Average KDA', currentValue: 2.95, previousValue: 2.15, change: '↑ 0.8', isPositive: true, unit: '' },
          { label: 'Games Played', currentValue: 234, previousValue: 107, change: '↑ 127', isPositive: true, unit: ' games' },
          { label: 'Vision Score', currentValue: 42.8, previousValue: 34.5, change: '↑ 8.3', isPositive: true, unit: '' },
        ],
        comparisonPeriod: 'vs last year',
      };
    }

    const response = await fetch(`/api/battles/${playerId}/progress`);
    return response.json();
  }
}

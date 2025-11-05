import React from 'react';
import {
  StatsGrid,
  StatCard,
  StatIconWrapper,
  StatValue,
  StatLabel,
  StatTrend,
} from '../styles/Statistics.styles';
import type { BattleStatistics } from '../../domain/entities/BattleStatistics';
import { Swords, Award, Target, TrendingUp, Flame, Shield, Zap, Eye, BarChart3, Crosshair } from 'lucide-react';

interface StatisticsGridProps {
  statistics: BattleStatistics;
}

const iconMap: Record<string, React.ComponentType<{ size: number; color: string }>> = {
  'Swords': Swords,
  'Trophy': Award,
  'Sparkles': Target,
  'Target': Target,
  'Flame': Flame,
  'Activity': Shield,
  'Zap': Zap,
  'Eye': Eye,
  'Crosshair': Crosshair,
  'TrendingUp': TrendingUp,
  'BarChart3': BarChart3,
};

export const StatisticsGrid: React.FC<StatisticsGridProps> = ({ statistics }) => {
  const stats = statistics.toStatisticCards();

  return (
    <StatsGrid>
      {stats.map((stat, index) => {
        const IconComponent = iconMap[stat.icon] || Swords;
        return (
          <StatCard key={stat.label} $delay={index * 0.05}>
            <StatIconWrapper>
              <IconComponent size={20} color="#fbbf24" />
            </StatIconWrapper>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
            {stat.trend && <StatTrend>{stat.trend}</StatTrend>}
          </StatCard>
        );
      })}
    </StatsGrid>
  );
};

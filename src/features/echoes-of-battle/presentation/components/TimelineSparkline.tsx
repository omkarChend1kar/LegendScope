import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import {
  TimelineSection,
  TimelineTitle,
  TimelineSubtitle,
  RechartsContainer,
  TimelineStats,
  StatItem,
  StatValue,
  StatLabel,
  TimelineCaption,
} from '../styles/Timeline.styles';
import type { Timeline } from '../../domain/entities/Timeline';
import { designTokens } from '../styles/designTokens';

interface TimelineSparklineProps {
  timeline: Timeline;
}

export const TimelineSparkline: React.FC<TimelineSparklineProps> = ({ timeline }) => {
  const totalGames = timeline.dataPoints.reduce((sum, point) => sum + point.games, 0);
  const avgGamesPerMonth = Math.round(totalGames / timeline.dataPoints.length);
  const peakMonth = timeline.dataPoints.reduce((max, point) => 
    point.games > max.games ? point : max
  );

  // Format data for Recharts
  const chartData = timeline.dataPoints.map(point => ({
    month: point.month.substring(0, 3),
    games: point.games,
    fullMonth: point.month,
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(15, 23, 42, 0.98)',
          border: `1px solid ${designTokens.colors.primary[400]}`,
          borderRadius: '8px',
          padding: '12px 16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}>
          <p style={{ 
            color: designTokens.colors.primary[400], 
            fontWeight: 'bold',
            fontSize: '14px',
            margin: '0 0 4px 0'
          }}>
            {payload[0].payload.fullMonth}
          </p>
          <p style={{ 
            color: designTokens.colors.text.secondary,
            fontSize: '12px',
            margin: 0
          }}>
            <span style={{ 
              color: designTokens.colors.text.primary,
              fontWeight: 'bold'
            }}>
              {payload[0].value}
            </span> games played
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <TimelineSection>
      <TimelineTitle>Battle Timeline</TimelineTitle>
      <TimelineSubtitle>Monthly game activity over the past year</TimelineSubtitle>
      
      <TimelineStats>
        <StatItem>
          <StatValue>{totalGames}</StatValue>
          <StatLabel>Total Games</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{avgGamesPerMonth}</StatValue>
          <StatLabel>Avg Per Month</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{peakMonth.month}</StatValue>
          <StatLabel>Peak Month</StatLabel>
        </StatItem>
      </TimelineStats>

      <RechartsContainer>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart 
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorGames" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={designTokens.colors.primary[400]} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={designTokens.colors.primary[600]} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="rgba(148, 163, 184, 0.15)"
              vertical={false}
            />
            <XAxis 
              dataKey="month" 
              stroke={designTokens.colors.text.muted}
              style={{ 
                fontSize: '12px',
                fontWeight: 500,
              }}
              tick={{ fill: designTokens.colors.text.muted }}
            />
            <YAxis 
              stroke={designTokens.colors.text.muted}
              style={{ 
                fontSize: '12px',
              }}
              tick={{ fill: designTokens.colors.text.muted }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone"
              dataKey="games" 
              stroke={designTokens.colors.primary[400]}
              strokeWidth={3}
              fill="url(#colorGames)"
              animationDuration={1000}
              dot={{ 
                fill: designTokens.colors.primary[400], 
                strokeWidth: 2, 
                r: 5,
                stroke: designTokens.colors.primary[600]
              }}
              activeDot={{ 
                r: 8, 
                stroke: designTokens.colors.primary[300],
                strokeWidth: 2,
                fill: designTokens.colors.primary[500]
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </RechartsContainer>

      <TimelineCaption>{timeline.narrative}</TimelineCaption>
    </TimelineSection>
  );
};

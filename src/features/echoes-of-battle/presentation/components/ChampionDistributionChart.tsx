import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChampionDistribution } from '../../domain/entities/ChampionDistribution';
import { designTokens } from '../styles/designTokens';
import { ChartCard, ChartTitle } from '../styles/Charts.styles';

interface ChampionDistributionChartProps {
  distribution: ChampionDistribution;
}

export const ChampionDistributionChart: React.FC<ChampionDistributionChartProps> = ({ distribution }) => {
  // Transform data for horizontal bar chart
  const chartData = distribution.champions.map((champion) => ({
    name: champion.name,
    games: champion.games,
    percentage: champion.percentage,
    fill: champion.color,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(15, 23, 42, 0.98)',
          border: `1px solid ${designTokens.colors.primary[400]}`,
          borderRadius: '6px',
          padding: '8px 12px',
        }}>
          <p style={{ color: designTokens.colors.text.primary, fontSize: '12px', margin: 0, fontWeight: 600 }}>
            {payload[0].payload.name}
          </p>
          <p style={{ color: designTokens.colors.primary[400], fontSize: '11px', margin: '4px 0 0' }}>
            {payload[0].value} battles ({payload[0].payload.percentage.toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartCard>
      <ChartTitle>Your Arsenal</ChartTitle>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 20, bottom: 5, left: 5 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(255,255,255,0.05)" 
            horizontal={false}
          />
          <XAxis 
            type="number"
            stroke={designTokens.colors.text.tertiary}
            fontSize={10}
            tick={{ fill: designTokens.colors.text.tertiary }}
          />
          <YAxis 
            type="category"
            dataKey="name"
            stroke={designTokens.colors.text.tertiary}
            fontSize={11}
            width={70}
            tick={{ fill: designTokens.colors.text.secondary }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(251, 191, 36, 0.05)' }} />
          <Bar 
            dataKey="games" 
            radius={[0, 4, 4, 0]}
            animationDuration={800}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

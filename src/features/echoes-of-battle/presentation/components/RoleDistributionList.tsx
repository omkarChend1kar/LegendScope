import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { RoleDistribution } from '../../domain/entities/RoleDistribution';
import { designTokens } from '../styles/designTokens';
import { ChartCard, ChartTitle } from '../styles/Charts.styles';

interface RoleDistributionListProps {
  distribution: RoleDistribution;
}

export const RoleDistributionList: React.FC<RoleDistributionListProps> = ({ distribution }) => {
  // Transform data to show wins vs losses side by side
  const chartData = distribution.roles.map((role) => ({
    name: role.role,
    wins: Math.round(role.games * (role.winRate / 100)),
    losses: role.games - Math.round(role.games * (role.winRate / 100)),
    winRate: role.winRate,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const wins = payload[0]?.value || 0;
      const losses = payload[1]?.value || 0;
      const total = wins + losses;
      const winRate = total > 0 ? ((wins / total) * 100).toFixed(1) : '0.0';
      
      return (
        <div style={{
          background: 'rgba(15, 23, 42, 0.98)',
          border: `1px solid ${designTokens.colors.primary[400]}`,
          borderRadius: '6px',
          padding: '8px 12px',
        }}>
          <p style={{ color: designTokens.colors.text.primary, fontSize: '12px', margin: 0, fontWeight: 600 }}>
            {label}
          </p>
          <p style={{ color: '#10B981', fontSize: '11px', margin: '4px 0 0' }}>
            Claimed: {wins} ({winRate}%)
          </p>
          <p style={{ color: '#EF4444', fontSize: '11px', margin: '2px 0 0' }}>
            Fallen: {losses}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartCard>
      <ChartTitle>Mastery Across Realms</ChartTitle>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 20, bottom: 5, left: 5 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(255,255,255,0.05)"
          />
          <XAxis 
            dataKey="name"
            stroke={designTokens.colors.text.tertiary}
            fontSize={10}
            tick={{ fill: designTokens.colors.text.secondary }}
          />
          <YAxis 
            stroke={designTokens.colors.text.tertiary}
            fontSize={10}
            tick={{ fill: designTokens.colors.text.tertiary }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(251, 191, 36, 0.05)' }} />
          <Legend 
            wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
            iconType="circle"
            iconSize={8}
          />
          <Bar 
            dataKey="wins" 
            fill="#10B981"
            name="Claimed"
            radius={[4, 4, 0, 0]}
            animationDuration={800}
          />
          <Bar 
            dataKey="losses" 
            fill="#EF4444"
            name="Fallen"
            radius={[4, 4, 0, 0]}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

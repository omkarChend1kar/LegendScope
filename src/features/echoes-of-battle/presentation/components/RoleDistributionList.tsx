import React from 'react';
import {
  ChartCard,
  ChartTitle,
  RoleList,
  RoleItem,
  RoleHeader,
  RoleLabel,
  RoleValue,
  RoleBarContainer,
  RoleBar,
  RoleStats,
  RoleSummary,
  SummaryLabel,
  SummaryValue,
} from '../styles/Charts.styles';
import type { RoleDistribution } from '../../domain/entities/RoleDistribution';

interface RoleDistributionListProps {
  distribution: RoleDistribution;
}

export const RoleDistributionList: React.FC<RoleDistributionListProps> = ({ distribution }) => {
  // Find max win rate for bar scaling
  const maxWinRate = Math.max(...distribution.roles.map(r => r.winRate));
  const avgWinRate = Math.round(
    distribution.roles.reduce((sum, r) => sum + r.winRate, 0) / distribution.roles.length
  );
  const bestRole = distribution.roles.reduce((best, r) => 
    r.winRate > best.winRate ? r : best
  );
  
  return (
    <ChartCard>
      <ChartTitle>Win Rate by Role</ChartTitle>
      
      <RoleSummary>
        <RoleStats>
          <SummaryLabel>Average Win Rate</SummaryLabel>
          <SummaryValue>{avgWinRate}%</SummaryValue>
        </RoleStats>
        <RoleStats>
          <SummaryLabel>Best Role</SummaryLabel>
          <SummaryValue $highlight>{bestRole.role}</SummaryValue>
        </RoleStats>
      </RoleSummary>
      
      <RoleList>
        {distribution.roles.map((role) => {
          const barWidth = (role.winRate / maxWinRate) * 100;
          const isHighWinRate = role.winRate >= 55;
          
          return (
            <RoleItem key={role.role}>
              <RoleHeader>
                <RoleLabel>{role.role}</RoleLabel>
                <RoleValue $isHigh={isHighWinRate}>{role.winRate}%</RoleValue>
              </RoleHeader>
              <RoleBarContainer>
                <RoleBar $width={barWidth} $isHigh={isHighWinRate} />
              </RoleBarContainer>
            </RoleItem>
          );
        })}
      </RoleList>
    </ChartCard>
  );
};

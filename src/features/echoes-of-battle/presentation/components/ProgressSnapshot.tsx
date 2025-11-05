import React from 'react';
import { TrendingUp } from 'lucide-react';
import {
  ProgressCard,
  ProgressHeader,
  ProgressIconWrapper,
  ProgressTitleWrapper,
  ProgressSubtitle,
  ProgressGrid,
  ProgressItem,
  ProgressLabel,
  ProgressChange,
  ChartTitle,
} from '../styles/Charts.styles';
import { designTokens } from '../styles/designTokens';
import type { Progress } from '../../domain/entities/Progress';

interface ProgressSnapshotProps {
  progress: Progress;
}

export const ProgressSnapshot: React.FC<ProgressSnapshotProps> = ({ progress }) => {
  const improvementCount = progress.metrics.filter(m => m.isPositive).length;
  
  return (
    <ProgressCard>
      <ProgressHeader>
        <ProgressIconWrapper>
          <TrendingUp size={28} color={designTokens.colors.primary[400]} />
        </ProgressIconWrapper>
        <ProgressTitleWrapper>
          <ChartTitle style={{ margin: 0 }}>
            Your Growth Story {progress.comparisonPeriod}
          </ChartTitle>
          <ProgressSubtitle>
            {improvementCount} out of {progress.metrics.length} metrics improved — keep climbing! 🚀
          </ProgressSubtitle>
        </ProgressTitleWrapper>
      </ProgressHeader>
      
      <ProgressGrid>
        {progress.metrics.map((metric) => (
          <ProgressItem key={metric.label}>
            <ProgressLabel>{metric.label}</ProgressLabel>
            <ProgressChange $positive={metric.isPositive}>
              {metric.change}
            </ProgressChange>
          </ProgressItem>
        ))}
      </ProgressGrid>
    </ProgressCard>
  );
};

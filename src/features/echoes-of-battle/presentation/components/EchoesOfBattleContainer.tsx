import React, { useMemo, useState } from 'react';
import {
  AnalyticsContainer,
  AnalyticsHeader,
  HeaderTop,
  AnalyticsTitle,
  TimeRangeSelector,
  TimeRangeButton,
  AnalyticsContent,
  MetricsGrid,
  MetricCard,
  MetricValue,
  MetricLabel,
  ChartsGrid,
  ChartSection,
} from '../styles/Layout.styles';
import { TimelineSparkline } from './TimelineSparkline';
import { ChampionDistributionChart } from './ChampionDistributionChart';
import { RoleDistributionList } from './RoleDistributionList';

// BLoC imports
import { EchoesOfBattleRepositoryImpl } from '../../data/repositories/EchoesOfBattleRepository';
import { GetBattleStatisticsUseCase } from '../../domain/usecases/GetBattleStatisticsUseCase';
import { GetTimelineUseCase } from '../../domain/usecases/GetTimelineUseCase';
import { GetDefiningMatchUseCase } from '../../domain/usecases/GetDefiningMatchUseCase';
import { GetChampionDistributionUseCase } from '../../domain/usecases/GetChampionDistributionUseCase';
import { GetRoleDistributionUseCase } from '../../domain/usecases/GetRoleDistributionUseCase';
import { GetProgressUseCase } from '../../domain/usecases/GetProgressUseCase';
import { BattleStatisticsBloc, useBattleStatisticsBloc } from '../bloc/BattleStatisticsBloc';
import { TimelineBloc, useTimelineBloc } from '../bloc/TimelineBloc';
import { DefiningMatchBloc, useDefiningMatchBloc } from '../bloc/DefiningMatchBloc';
import { DistributionBloc, useDistributionBloc } from '../bloc/DistributionBloc';
import { ProgressBloc, useProgressBloc } from '../bloc/ProgressBloc';

interface EchoesOfBattleContainerProps {
  playerId: string;
}

export const EchoesOfBattleContainer: React.FC<EchoesOfBattleContainerProps> = ({ playerId }) => {
  const [timeRange, setTimeRange] = useState('1M');

  // Initialize repository and BLoCs (memoized to prevent recreation)
  const { statisticsBloc, timelineBloc, definingMatchBloc, distributionBloc, progressBloc } = useMemo(() => {
    const repository = new EchoesOfBattleRepositoryImpl(true); // Use mock data

    return {
      statisticsBloc: new BattleStatisticsBloc(new GetBattleStatisticsUseCase(repository)),
      timelineBloc: new TimelineBloc(new GetTimelineUseCase(repository)),
      definingMatchBloc: new DefiningMatchBloc(new GetDefiningMatchUseCase(repository)),
      distributionBloc: new DistributionBloc(
        new GetChampionDistributionUseCase(repository),
        new GetRoleDistributionUseCase(repository)
      ),
      progressBloc: new ProgressBloc(new GetProgressUseCase(repository)),
    };
  }, []);

  // Use BLoCs to fetch data
  const statisticsState = useBattleStatisticsBloc(statisticsBloc, playerId);
  const timelineState = useTimelineBloc(timelineBloc, playerId);
  const definingMatchState = useDefiningMatchBloc(definingMatchBloc, playerId);
  const distributionState = useDistributionBloc(distributionBloc, playerId);
  const progressState = useProgressBloc(progressBloc, playerId);

  const timeRanges = ['7D', '2W', '1M', '3M', '1Y'];

  // Loading state
  const isLoading = 
    statisticsState.loading ||
    timelineState.loading ||
    definingMatchState.loading ||
    distributionState.loading ||
    progressState.loading;

  // Error state
  const error = 
    statisticsState.error ||
    timelineState.error ||
    definingMatchState.error ||
    distributionState.error ||
    progressState.error;

  if (isLoading) {
    return (
      <AnalyticsContainer>
        <AnalyticsHeader>
          <HeaderTop>
            <AnalyticsTitle>Loading...</AnalyticsTitle>
          </HeaderTop>
        </AnalyticsHeader>
      </AnalyticsContainer>
    );
  }

  if (error) {
    return (
      <AnalyticsContainer>
        <AnalyticsHeader>
          <HeaderTop>
            <AnalyticsTitle>Error: {error}</AnalyticsTitle>
          </HeaderTop>
        </AnalyticsHeader>
      </AnalyticsContainer>
    );
  }

  return (
    <AnalyticsContainer>
      {/* Header with Title and Time Range Selector */}
      <AnalyticsHeader>
        <HeaderTop>
          <AnalyticsTitle>Echoes of Battle</AnalyticsTitle>
          <TimeRangeSelector>
            {timeRanges.map((range) => (
              <TimeRangeButton
                key={range}
                $active={timeRange === range}
                onClick={() => setTimeRange(range)}
              >
                {range}
              </TimeRangeButton>
            ))}
          </TimeRangeSelector>
        </HeaderTop>
      </AnalyticsHeader>

      {/* Main Content */}
      <AnalyticsContent>
        {/* Timeline Chart - Full Width at Top */}
        {timelineState.timeline && (
          <TimelineSparkline timeline={timelineState.timeline} />
        )}

        {/* Charts Grid - Two smaller charts side by side */}
        <ChartsGrid>
          {distributionState.championDistribution && (
            <ChartSection>
              <ChampionDistributionChart distribution={distributionState.championDistribution} />
            </ChartSection>
          )}
          
          {distributionState.roleDistribution && (
            <ChartSection>
              <RoleDistributionList distribution={distributionState.roleDistribution} />
            </ChartSection>
          )}
        </ChartsGrid>

        {/* Metrics Grid - 8 cards with narrative labels */}
        {statisticsState.statistics && (
          <MetricsGrid>
            <MetricCard>
              <MetricLabel>Battles Fought</MetricLabel>
              <MetricValue>{statisticsState.statistics.totalGames}</MetricValue>
            </MetricCard>
            <MetricCard>
              <MetricLabel>Trials Claimed</MetricLabel>
              <MetricValue>{statisticsState.statistics.victories}</MetricValue>
            </MetricCard>
            <MetricCard>
              <MetricLabel>Victory Echo</MetricLabel>
              <MetricValue>{statisticsState.statistics.winRate.toFixed(1)}%</MetricValue>
            </MetricCard>
            <MetricCard>
              <MetricLabel>Combat Mastery</MetricLabel>
              <MetricValue>{statisticsState.statistics.kda.toFixed(2)}</MetricValue>
            </MetricCard>
            <MetricCard>
              <MetricLabel>Legendary Moments</MetricLabel>
              <MetricValue>{statisticsState.statistics.pentakills}</MetricValue>
            </MetricCard>
            <MetricCard>
              <MetricLabel>Unbroken Streak</MetricLabel>
              <MetricValue>{statisticsState.statistics.winStreak}</MetricValue>
            </MetricCard>
            <MetricCard>
              <MetricLabel>Phoenix Rising</MetricLabel>
              <MetricValue>{statisticsState.statistics.comebackPercentage}%</MetricValue>
            </MetricCard>
            <MetricCard>
              <MetricLabel>Steadfast Will</MetricLabel>
              <MetricValue>{statisticsState.statistics.consistencyIndex}%</MetricValue>
            </MetricCard>
          </MetricsGrid>
        )}
      </AnalyticsContent>
    </AnalyticsContainer>
  );
};

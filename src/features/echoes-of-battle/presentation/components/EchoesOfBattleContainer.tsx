import React, { useMemo } from 'react';
import {
  PageContainer,
  ContentWrapper,
  Header,
  Title,
  Subtitle,
  EmotionTag,
} from '../styles/Layout.styles';
import { TwoColumnGrid } from '../styles/Charts.styles';
import { NarrativeSection, NarrativeText, CTAButton } from '../styles/Narrative.styles';
import { StatisticsGrid } from './StatisticsGrid';
import { TimelineSparkline } from './TimelineSparkline';
import { DefiningMatchCard } from './DefiningMatchCard';
import { ChampionDistributionChart } from './ChampionDistributionChart';
import { RoleDistributionList } from './RoleDistributionList';
import { ProgressSnapshot } from './ProgressSnapshot';
import { ArrowRight } from 'lucide-react';

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

  const handleCTAClick = () => {
    console.log('Navigate to next section');
    // TODO: Implement navigation to next section
  };

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
      <PageContainer>
        <ContentWrapper>
          <Header>
            <Title>Loading...</Title>
            <Subtitle>Gathering your battle data</Subtitle>
          </Header>
        </ContentWrapper>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ContentWrapper>
          <Header>
            <Title>Error</Title>
            <Subtitle>{error}</Subtitle>
          </Header>
        </ContentWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <Header>
          <Title>Echoes of Battle</Title>
          <Subtitle>A reflection of every triumph, every fall</Subtitle>
          <EmotionTag>PRIDE · REFLECTION</EmotionTag>
        </Header>

        {statisticsState.statistics && (
          <StatisticsGrid statistics={statisticsState.statistics} />
        )}

        {timelineState.timeline && (
          <TimelineSparkline timeline={timelineState.timeline} />
        )}

        {definingMatchState.match && (
          <DefiningMatchCard match={definingMatchState.match} />
        )}

        <TwoColumnGrid>
          {distributionState.championDistribution && (
            <ChampionDistributionChart distribution={distributionState.championDistribution} />
          )}
          {distributionState.roleDistribution && (
            <RoleDistributionList distribution={distributionState.roleDistribution} />
          )}
        </TwoColumnGrid>

        {progressState.progress && (
          <ProgressSnapshot progress={progressState.progress} />
        )}

        <NarrativeSection>
          <NarrativeText>
            Every battle is a lesson. Every victory a testament. Each defeat shapes you into the
            player you are today. Your journey through the Rift has been carved with precision,
            determination, and resilience.
          </NarrativeText>
          <CTAButton onClick={handleCTAClick}>
            Dive deeper into your story <ArrowRight size={18} />
          </CTAButton>
        </NarrativeSection>
      </ContentWrapper>
    </PageContainer>
  );
};

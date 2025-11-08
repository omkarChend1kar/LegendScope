import React, { useState } from 'react';
import {
  AnalyticsContainer,
  AnalyticsHeader,
  HeaderTop,
  AnalyticsTitle,
  AnalyticsContent,
  TabsContainer,
  Tab,
} from '../styles/Layout.styles';
import { LastTwentyMatchesSummarySection } from './LastTwentyMatchesSummarySection';
import { HistoricalInsightsPlaceholder } from './HistoricalInsightsPlaceholder';

interface EchoesOfBattleContainerProps {
  playerId: string;
}

export const EchoesOfBattleContainer: React.FC<EchoesOfBattleContainerProps> = ({ playerId }) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'insights'>('summary');

  return (
    <AnalyticsContainer>
      {/* Header with Title and Time Range Selector */}
      <AnalyticsHeader>
        <HeaderTop>
          <AnalyticsTitle>Echoes of Battle</AnalyticsTitle>
        </HeaderTop>
        <TabsContainer>
          <Tab
            $active={activeTab === 'summary'}
            onClick={() => setActiveTab('summary')}
          >
            Last 20 Battles
          </Tab>
          <Tab
            $active={activeTab === 'insights'}
            onClick={() => setActiveTab('insights')}
          >
            Historical Insights
          </Tab>
        </TabsContainer>
      </AnalyticsHeader>

      {/* Main Content */}
      <AnalyticsContent>
        {activeTab === 'summary' ? (
          <LastTwentyMatchesSummarySection playerId={playerId} />
        ) : (
          <HistoricalInsightsPlaceholder playerId={playerId} />
        )}
      </AnalyticsContent>
    </AnalyticsContainer>
  );
};

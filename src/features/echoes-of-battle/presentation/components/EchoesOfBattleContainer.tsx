import React from 'react';
import {
  AnalyticsContainer,
  AnalyticsHeader,
  HeaderTop,
  AnalyticsTitle,
  AnalyticsContent,
} from '../styles/Layout.styles';
import { LastTwentyMatchesSummarySection } from './LastTwentyMatchesSummarySection';
import { SyncHeader } from '../../../../components/shared/SyncHeader';

interface EchoesOfBattleContainerProps {
  playerId: string;
  onSync?: () => Promise<void>;
  lastSyncTime?: Date | null;
}

export const EchoesOfBattleContainer: React.FC<EchoesOfBattleContainerProps> = ({ 
  playerId,
  onSync,
  lastSyncTime 
}) => {
  return (
    <AnalyticsContainer>
      {/* Header with Title */}
      <AnalyticsHeader>
        <HeaderTop>
          <AnalyticsTitle>Echoes of Battle</AnalyticsTitle>
          <SyncHeader lastSyncTime={lastSyncTime} onSync={onSync} />
        </HeaderTop>
      </AnalyticsHeader>

      {/* Main Content */}
      <AnalyticsContent>
        <LastTwentyMatchesSummarySection playerId={playerId} />
      </AnalyticsContent>
    </AnalyticsContainer>
  );
};

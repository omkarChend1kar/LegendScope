import React from 'react';
import type { PlayerData } from '../../types/PlayerData';
import { FaultlinesContainer } from '../../features/faultlines/presentation/components/FaultlinesContainer';

interface FaultlinesSectionProps {
  playerData: PlayerData | null;
  onSync?: () => Promise<void>;
  lastSyncTime?: Date | null;
}

export const Faultlines: React.FC<FaultlinesSectionProps> = ({ playerData, onSync, lastSyncTime }) => {
  if (!playerData?.puuid) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          color: '#fcd34d',
          fontSize: '1.05rem',
          textAlign: 'center',
          padding: '0 2rem',
        }}
      >
        Link your Summoner profile to expose the structural faultlines in your play.
      </div>
    );
  }

  return <FaultlinesContainer playerId={playerData.puuid} onSync={onSync} lastSyncTime={lastSyncTime} />;
};

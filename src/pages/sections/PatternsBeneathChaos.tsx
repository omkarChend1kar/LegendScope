import React from 'react';
import type { PlayerData } from '../../types/PlayerData';
import { PatternsBeneathChaosContainer } from '../../features/patterns-beneath-chaos/presentation/components/PatternsBeneathChaosContainer';

interface PatternsBeneathChaosProps {
  playerData: PlayerData | null;
  onSync?: () => Promise<void>;
  lastSyncTime?: Date | null;
}

export const PatternsBeneathChaos: React.FC<PatternsBeneathChaosProps> = ({ playerData, onSync, lastSyncTime }) => {
  if (!playerData?.puuid) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          color: '#38bdf8',
          fontSize: '1.1rem',
          textAlign: 'center',
          padding: '0 2rem',
        }}
      >
        Sync your Summoner profile to reveal the playstyle patterns hiding beneath the chaos.
      </div>
    );
  }

  return <PatternsBeneathChaosContainer playerId={playerData.puuid} onSync={onSync} lastSyncTime={lastSyncTime} />;
};

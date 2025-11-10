import React from 'react';
import { EchoesOfBattleContainer } from '../../features/echoes-of-battle/presentation/components/EchoesOfBattleContainer';
import type { PlayerData } from '../../types/PlayerData';

interface EchoesOfBattleProps {
  playerData: PlayerData | null;
  onSync?: () => Promise<void>;
  lastSyncTime?: Date | null;
}

export const EchoesOfBattle: React.FC<EchoesOfBattleProps> = ({ playerData, onSync, lastSyncTime }) => {
  if (!playerData?.puuid) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          color: '#fbbf24',
          fontSize: '1.1rem',
          textAlign: 'center',
        }}
      >
        Link your Summoner profile from the Summoner&apos;s Gate to unlock your Echoes of Battle.
      </div>
    );
  }

  return <EchoesOfBattleContainer playerId={playerData.puuid} onSync={onSync} lastSyncTime={lastSyncTime} />;
};

import React from 'react';
import { EchoesOfBattleContainer } from '../../features/echoes-of-battle/presentation/components/EchoesOfBattleContainer';

export const EchoesOfBattle: React.FC = () => {
  // TODO: Get playerId from context or props
  const playerId = 'player123';

  return <EchoesOfBattleContainer playerId={playerId} />;
};

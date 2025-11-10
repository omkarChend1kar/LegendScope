import React from 'react';
import type { PlayerData } from '../../types/PlayerData';
import { VoiceInFogDashboard } from '../../features/voice-in-fog/presentation/components/VoiceInFogDashboard';

interface VoiceInFogSectionProps {
  playerData: PlayerData | null;
}

export const VoiceInFog: React.FC<VoiceInFogSectionProps> = ({ playerData }) => {
  return <VoiceInFogDashboard playerPuuid={playerData?.puuid ?? null} />;
};

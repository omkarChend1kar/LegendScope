import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { JourneyDashboard } from './pages/JourneyDashboard';
import { LeagueDataLookup } from './pages/LeagueDataLookup';
import type { PlayerData } from './types/PlayerData';
import {
  getStoredPlayerProfile,
  setStoredPlayerProfile,
  clearStoredPlayerProfile,
} from './utils/playerProfileStorage';

function App() {
  const [playerData, setPlayerData] = useState<PlayerData | null>(() => getStoredPlayerProfile());
  const [showDashboard, setShowDashboard] = useState(() => getStoredPlayerProfile() !== null);

  const handlePlayerLookup = (data: PlayerData) => {
    setPlayerData(data);
    setStoredPlayerProfile(data);
    setShowDashboard(true);
  };

  const handleChangePlayer = () => {
    setShowDashboard(false);
    setPlayerData(null);
    clearStoredPlayerProfile();
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {!showDashboard ? (
        <LeagueDataLookup onPlayerFound={handlePlayerLookup} />
      ) : (
        <JourneyDashboard
          playerData={playerData}
          onChangePlayer={handleChangePlayer}
        />
      )}
    </ThemeProvider>
  );
}

export default App;

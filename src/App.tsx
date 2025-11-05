import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { JourneyDashboard } from './pages/JourneyDashboard';
import { LeagueDataLookup } from './pages/LeagueDataLookup';

interface PlayerData {
  riotId: string;
  region: string;
  summoner: {
    name: string;
    level: number;
  };
}

function App() {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [showDashboard, setShowDashboard] = useState(false);

  const handlePlayerLookup = (data: PlayerData) => {
    setPlayerData(data);
    setShowDashboard(true);
  };

  const handleChangePlayer = () => {
    setShowDashboard(false);
    setPlayerData(null);
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

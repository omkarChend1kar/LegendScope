import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { LeagueDataLookup } from './pages/LeagueDataLookup';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gradients.primary};
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>LegendScope</h1>
          <p>League Data Lookup</p>
        </div>
        <LeagueDataLookup />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

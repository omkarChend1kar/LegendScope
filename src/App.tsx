import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/GlobalStyles';
import { theme } from './styles/theme';
import { Dashboard } from './pages/Dashboard';
import { YearEndSummary } from './pages/YearEndSummary';
import { SocialComparisons } from './pages/SocialComparisons';
import { ShareableMoments } from './pages/ShareableMoments';
import { PlayerSearch } from './components/PlayerSearch/PlayerSearch';
import { Button } from './components/ui/Button';
import { usePlayerStore } from './store';
import { Zap, Search, BarChart3, Users, Settings, Menu, X, Calendar, Share2 } from 'lucide-react';

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.gradients.primary};
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  background: rgba(30, 35, 42, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid ${theme.colors.primary.gold};
  padding: ${theme.spacing.md} 0;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    padding: 0 ${theme.spacing.md};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  
  .logo-icon {
    color: ${theme.colors.primary.gold};
  }
  
  .logo-text {
    font-family: ${theme.typography.fontFamily.primary};
    font-size: ${theme.typography.fontSize['2xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    background: ${theme.colors.gradients.gold};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Navigation = styled.nav<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.md}) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    background: ${theme.colors.gradients.card};
    flex-direction: column;
    justify-content: flex-start;
    padding: ${theme.spacing.xl} ${theme.spacing.lg};
    transform: translateX(${({ isOpen }) => isOpen ? '0' : '100%'});
    transition: transform ${theme.animations.transition.normal};
    border-left: 2px solid ${theme.colors.primary.gold};
  }
`;

const NavButton = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${({ active }) => active ? theme.colors.primary.gold : 'transparent'};
  color: ${({ active }) => active ? theme.colors.secondary.darkBlue : theme.colors.neutral.lightGray};
  border: 2px solid ${({ active }) => active ? theme.colors.primary.gold : 'transparent'};
  border-radius: ${theme.borderRadius.lg};
  font-weight: ${theme.typography.fontWeight.medium};
  transition: all ${theme.animations.transition.fast};
  
  &:hover {
    background: ${({ active }) => active ? theme.colors.primary.lightGold : 'rgba(200, 170, 110, 0.1)'};
    border-color: ${theme.colors.primary.gold};
    color: ${({ active }) => active ? theme.colors.secondary.darkBlue : theme.colors.primary.lightGold};
  }
  
  @media (max-width: ${theme.breakpoints.md}) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.sm};
  background: transparent;
  color: ${theme.colors.primary.gold};
  border: 2px solid ${theme.colors.primary.gold};
  border-radius: ${theme.borderRadius.lg};
  
  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
  }
`;

const MainContent = styled.main`
  flex: 1;
  position: relative;
`;

const WelcomeSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
  padding: ${theme.spacing.xl};
  
  h1 {
    font-size: clamp(2rem, 5vw, 4rem);
    margin-bottom: ${theme.spacing.md};
    background: ${theme.colors.gradients.gold};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  p {
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.neutral.lightGray};
    margin-bottom: ${theme.spacing.xl};
    max-width: 600px;
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 50;
  opacity: ${({ isOpen }) => isOpen ? 1 : 0};
  visibility: ${({ isOpen }) => isOpen ? 'visible' : 'hidden'};
  transition: all ${theme.animations.transition.normal};
  
  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const CloseButton = styled.div`
  align-self: flex-end;
  margin-bottom: ${theme.spacing.lg};
`;

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentPlayer } = usePlayerStore();

  const handlePlayerFound = () => {
    setIsSearchMode(false);
    setActiveTab('dashboard');
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'year-end', label: 'Year-End Summary', icon: Calendar },
    { id: 'social', label: 'Social Comparisons', icon: Users },
    { id: 'moments', label: 'Shareable Moments', icon: Share2 },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'social', label: 'Social', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    if (activeTab === 'search' || (isSearchMode && !currentPlayer)) {
      return (
        <WelcomeSection>
          <h1 className="animate-fadeIn">Welcome to LegendScope</h1>
          <p className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            Discover insights into your League of Legends performance, track your progress over time, 
            and share your achievements with friends.
          </p>
          <div className="animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <PlayerSearch onPlayerFound={handlePlayerFound} />
          </div>
        </WelcomeSection>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'year-end':
        return <YearEndSummary />;
      case 'social':
        return <SocialComparisons />;
      case 'moments':
        return <ShareableMoments />;
      case 'settings':
        return (
          <WelcomeSection>
            <h2>Settings</h2>
            <p>Customize your LegendScope experience</p>
          </WelcomeSection>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <Header>
          <HeaderContent>
            <Logo>
              <Zap size={32} className="logo-icon" />
              <span className="logo-text">LegendScope</span>
            </Logo>

            <Navigation isOpen={mobileMenuOpen}>
              {mobileMenuOpen && (
                <CloseButton>
                  <Button
                    variant="ghost"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X size={20} />
                  </Button>
                </CloseButton>
              )}
              
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavButton
                    key={item.id}
                    active={activeTab === item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      if (item.id !== 'search') {
                        setIsSearchMode(false);
                      }
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Icon size={18} />
                    {item.label}
                  </NavButton>
                );
              })}
            </Navigation>

            <MobileMenuButton onClick={() => setMobileMenuOpen(true)}>
              <Menu size={20} />
            </MobileMenuButton>
          </HeaderContent>
        </Header>

        <Overlay isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(false)} />

        <MainContent>
          {renderContent()}
        </MainContent>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

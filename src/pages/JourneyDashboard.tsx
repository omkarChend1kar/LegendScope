import { useState } from 'react';
import styled from 'styled-components';
import { MainLayout } from '../components/layout/MainLayout';
import { Sidebar, type SectionId } from '../components/navigation/Sidebar';
import { EchoesOfBattle } from './sections/EchoesOfBattle';
import { PatternsBeneathChaos } from './sections/PatternsBeneathChaos';
import { Faultlines } from './sections/Faultlines';
import { VoiceInFog } from './sections/VoiceInFog';
import { OneShotChat } from '../features/voice-in-fog/components/OneShotChat';
import { FloatingChatButton } from '../features/voice-in-fog/components/SplitScreenChat.styles';
import { MessageCircle } from 'lucide-react';
import type { PlayerData } from '../types/PlayerData';
import type { FeatureContext } from '../features/voice-in-fog/types/FeatureContext';
import { legendScopeBackend } from '../services/legendScopeBackend';

const SplitScreenContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #020617;
`;

const MainContent = styled.div<{ $chatOpen: boolean }>`
  flex: 1;
  min-width: 0;
  height: 100vh;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ChatPanel = styled.div<{ $isOpen: boolean }>`
  width: ${props => props.$isOpen ? '480px' : '0'};
  flex-shrink: 0;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  
  @media (min-width: 1400px) {
    width: ${props => props.$isOpen ? '520px' : '0'};
  }
  
  @media (max-width: 1024px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: ${props => props.$isOpen ? '100%' : '0'};
    z-index: 1000;
  }
`;

const MobileBackdrop = styled.div<{ $isOpen: boolean }>`
  display: none;
  
  @media (max-width: 1024px) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    opacity: ${props => props.$isOpen ? '1' : '0'};
    pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
    transition: opacity 0.3s ease;
    z-index: 999;
  }
`;

interface JourneyDashboardProps {
  playerData: PlayerData | null;
  onChangePlayer: () => void;
}

// Placeholder components for sections not yet built
const PlaceholderSection = ({ title }: { title: string }) => (
  <div style={{ 
    height: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    fontSize: '2rem',
    color: '#C8AA6E',
    fontFamily: 'Cinzel, serif'
  }}>
    {title} - Coming Soon
  </div>
);

export const JourneyDashboard: React.FC<JourneyDashboardProps> = ({ playerData, onChangePlayer }) => {
  const [activeSection, setActiveSection] = useState<SectionId>('echoes');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(new Date());

  const handleSync = async () => {
    if (!playerData?.puuid) {
      console.error('No player data available for sync');
      return;
    }

    try {
      const response = await legendScopeBackend.storeLastMatches({
        puuid: playerData.puuid,
        region: playerData.region,
      });

      if (response.status === 'success') {
        setLastSyncTime(new Date());
        console.log('Sync successful:', response);
        // Optionally, you could trigger a data refresh here
        // by calling a callback or using a state management solution
      }
    } catch (error) {
      console.error('Failed to sync matches:', error);
      // Optionally show an error toast/notification
    }
  };

  const getFeatureContext = (section: SectionId): FeatureContext => {
    return section as FeatureContext;
  };
  
  // Auto-collapse sidebar when chat opens, re-expand when closed
  const handleChatToggle = (open: boolean) => {
    setIsChatOpen(open);
    if (open) {
      setSidebarCollapsed(true);
    } else {
      setSidebarCollapsed(false);
    }
  };

  // Function to render the active section
  const renderSection = () => {
    switch (activeSection) {
      case 'echoes':
        return <EchoesOfBattle playerData={playerData} onSync={handleSync} lastSyncTime={lastSyncTime} />;
      case 'patterns':
        return <PatternsBeneathChaos playerData={playerData} onSync={handleSync} lastSyncTime={lastSyncTime} />;
      case 'arc':
        return <PlaceholderSection title="The Arc" />;
      case 'faultlines':
        return <Faultlines playerData={playerData} onSync={handleSync} lastSyncTime={lastSyncTime} />;
      case 'voice':
        return <VoiceInFog playerData={playerData} />;
      default:
        return <EchoesOfBattle playerData={playerData} onSync={handleSync} lastSyncTime={lastSyncTime} />;
    }
  };

  // Don't show floating button on Voice in the Fog page or when chat is open
  const showFloatingButton = activeSection !== 'voice' && !isChatOpen;

  return (
    <SplitScreenContainer>
      {/* Mobile backdrop for touch devices */}
      <MobileBackdrop 
        $isOpen={isChatOpen} 
        onClick={() => handleChatToggle(false)}
      />
      
      <MainContent $chatOpen={isChatOpen}>
        <MainLayout
          sidebar={
            <Sidebar 
              activeSection={activeSection} 
              onSectionChange={setActiveSection}
              playerData={playerData}
              collapsed={sidebarCollapsed}
              onCollapsedChange={setSidebarCollapsed}
              onChangePlayer={onChangePlayer}
            />
          }
          sidebarCollapsed={sidebarCollapsed}
        >
          {renderSection()}
        </MainLayout>
      </MainContent>

      {/* Split Screen Chat Panel - One-shot Q&A for non-Voice features */}
      <ChatPanel $isOpen={isChatOpen}>
        <OneShotChat
          isOpen={isChatOpen}
          onClose={() => handleChatToggle(false)}
          playerPuuid={playerData?.puuid ?? null}
          featureContext={getFeatureContext(activeSection)}
        />
      </ChatPanel>

      {/* Floating Chat Button */}
      {showFloatingButton && (
        <FloatingChatButton
          onClick={() => handleChatToggle(true)}
          disabled={!playerData?.puuid}
          aria-label="Open Voice in the Fog"
          title="Chat with your AI companion"
        >
          <MessageCircle size={24} />
        </FloatingChatButton>
      )}
    </SplitScreenContainer>
  );
};

import { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { Sidebar, type SectionId } from '../components/navigation/Sidebar';
import { EchoesOfBattle } from './sections/EchoesOfBattle';
import type { PlayerData } from '../types/PlayerData';

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

  // Function to render the active section
  const renderSection = () => {
    switch (activeSection) {
      case 'echoes':
        return <EchoesOfBattle playerData={playerData} />;
      case 'patterns':
        return <PlaceholderSection title="Patterns Beneath the Chaos" />;
      case 'arc':
        return <PlaceholderSection title="The Arc" />;
      case 'faultlines':
        return <PlaceholderSection title="Faultlines" />;
      case 'rift':
        return <PlaceholderSection title="The Rift Between Us" />;
      case 'fragments':
        return <PlaceholderSection title="Fragments of Glory" />;
      case 'voice':
        return <PlaceholderSection title="Voice in the Fog" />;
      default:
        return <EchoesOfBattle playerData={playerData} />;
    }
  };

  return (
    <MainLayout
      sidebar={
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
          playerData={playerData}
        />
      }
      sidebarCollapsed={false}
      onChangePlayer={onChangePlayer}
    >
      {renderSection()}
    </MainLayout>
  );
};

import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { 
  Swords, 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  Award, 
  MessageCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Navigation items configuration
export const NAVIGATION_SECTIONS = [
  {
    id: 'echoes',
    title: 'Echoes of Battle',
    subtitle: 'Your legacy in numbers',
    icon: Swords,
    emotion: 'Pride, reflection',
  },
  {
    id: 'patterns',
    title: 'Patterns Beneath the Chaos',
    subtitle: 'Your signature playstyle',
    icon: Brain,
    emotion: 'Curiosity',
  },
  {
    id: 'arc',
    title: 'The Arc',
    subtitle: 'Journey through time',
    icon: TrendingUp,
    emotion: 'Growth',
  },
  {
    id: 'faultlines',
    title: 'Faultlines',
    subtitle: 'Strengths and shadows',
    icon: AlertTriangle,
    emotion: 'Motivation, humility',
  },
  {
    id: 'rift',
    title: 'The Rift Between Us',
    subtitle: 'Among your peers',
    icon: Users,
    emotion: 'Belonging, rivalry',
  },
  {
    id: 'fragments',
    title: 'Fragments of Glory',
    subtitle: 'Moments worth sharing',
    icon: Award,
    emotion: 'Celebration',
  },
  {
    id: 'voice',
    title: 'Voice in the Fog',
    subtitle: 'Your AI companion',
    icon: MessageCircle,
    emotion: 'Inspiration',
  },
] as const;

export type SectionId = typeof NAVIGATION_SECTIONS[number]['id'];

// Styled Components
const SidebarContainer = styled.aside<{ $collapsed: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: ${props => props.$collapsed ? '80px' : '288px'};
  background: #0f172a;
  border-right: 1px solid #1e293b;
  z-index: 100;
  transition: width ${theme.animations.transition.normal};
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  padding: 1.5rem 1.5rem;
  border-bottom: 1px solid #1e293b;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 80px;
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 0.5rem;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.div<{ $collapsed: boolean }>`
  opacity: ${props => props.$collapsed ? 0 : 1};
  transition: opacity ${theme.animations.transition.normal};
  white-space: nowrap;
  
  h1 {
    font-size: 1.125rem;
    font-weight: ${theme.typography.fontWeight.bold};
    color: #fbbf24;
    margin: 0 0 0.125rem 0;
  }
  
  p {
    font-size: 0.75rem;
    color: #64748b;
    margin: 0;
  }
`;

const NavList = styled.nav`
  flex: 1;
  padding: 0.75rem;
  overflow-y: auto;
  overflow-x: hidden;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #334155;
    border-radius: 2px;
  }
`;

const NavItem = styled.button<{ $active: boolean; $collapsed: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: ${props => props.$collapsed ? '0.75rem' : '0.75rem 1rem'};
  background: ${props => props.$active ? '#fbbf24' : 'transparent'};
  border: none;
  border-radius: 0.5rem;
  color: ${props => props.$active ? '#0f172a' : '#94a3b8'};
  cursor: pointer;
  transition: all ${theme.animations.transition.normal};
  text-align: left;
  justify-content: ${props => props.$collapsed ? 'center' : 'flex-start'};
  margin-bottom: 0.25rem;
  font-weight: ${props => props.$active ? theme.typography.fontWeight.medium : theme.typography.fontWeight.normal};
  
  &:hover {
    background: ${props => props.$active ? '#fbbf24' : '#1e293b'};
    color: ${props => props.$active ? '#0f172a' : '#f1f5f9'};
  }
  
  svg {
    min-width: 20px;
    transition: transform ${theme.animations.transition.normal};
  }
`;

const NavItemContent = styled.div<{ $collapsed: boolean }>`
  display: ${props => props.$collapsed ? 'none' : 'flex'};
  flex-direction: column;
  gap: 0.125rem;
  flex: 1;
  opacity: ${props => props.$collapsed ? 0 : 1};
  transition: opacity ${theme.animations.transition.normal};
`;

const NavItemTitle = styled.span`
  font-weight: ${theme.typography.fontWeight.medium};
  font-size: 0.875rem;
  line-height: 1.2;
`;

const NavItemSubtitle = styled.span`
  font-size: 0.75rem;
  opacity: 0.6;
`;

const CollapseButton = styled.button`
  position: absolute;
  right: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #1e293b;
  border: 1px solid #334155;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${theme.animations.transition.normal};
  z-index: 101;
  
  &:hover {
    background: #334155;
    color: #fbbf24;
    border-color: #fbbf24;
  }
`;

const ProfileSection = styled.div<{ $collapsed: boolean }>`
  padding: ${props => props.$collapsed ? '1rem 0.5rem' : '1rem 1rem'};
  border-bottom: 1px solid #1e293b;
`;

const ProfileContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ProfileAvatar = styled.div`
  width: 48px;
  height: 48px;
  min-width: 48px;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: ${theme.typography.fontWeight.bold};
  color: white;
`;

const ProfileInfo = styled.div<{ $collapsed: boolean }>`
  flex: 1;
  min-width: 0;
  opacity: ${props => props.$collapsed ? 0 : 1};
  transition: opacity ${theme.animations.transition.normal};
`;

const ProfileName = styled.div`
  font-weight: ${theme.typography.fontWeight.semibold};
  color: white;
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProfileTag = styled.div`
  font-size: 0.75rem;
  color: #94a3b8;
  margin-top: 0.125rem;
`;

const ProfileBadges = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  flex-wrap: wrap;
`;

const RankBadge = styled.span`
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  background: rgba(99, 102, 241, 0.2);
  color: #a5b4fc;
  border-radius: 0.25rem;
`;

interface PlayerData {
  riotId: string;
  region: string;
  summoner: {
    name: string;
    level: number;
  };
}

interface SidebarProps {
  activeSection: SectionId;
  onSectionChange: (section: SectionId) => void;
  playerData: PlayerData | null;
}

export const Sidebar = ({ activeSection, onSectionChange, playerData }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  // Extract player info or use defaults
  const summonerName = playerData?.summoner.name || "Guest";
  const [gameName, tagLine] = playerData?.riotId.split('#') || [summonerName, "TAG"];
  const summonerLevel = playerData?.summoner.level || 1;
  const rankDisplay = `Level ${summonerLevel}`;

  return (
    <SidebarContainer $collapsed={collapsed}>
      <CollapseButton 
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </CollapseButton>
      
      <Header>
        <LogoIcon>
          <Swords size={24} color="#0f172a" />
        </LogoIcon>
        <LogoText $collapsed={collapsed}>
          <h1>LegendScope</h1>
          <p>Every battle tells a story</p>
        </LogoText>
      </Header>
      
      {/* Profile Section */}
      <ProfileSection $collapsed={collapsed}>
        <ProfileContent>
          <ProfileAvatar>
            {summonerName.charAt(0).toUpperCase()}
          </ProfileAvatar>
          {!collapsed && (
            <ProfileInfo $collapsed={collapsed}>
              <ProfileName>{gameName}</ProfileName>
              <ProfileTag>#{tagLine}</ProfileTag>
              <ProfileBadges>
                <RankBadge>{rankDisplay}</RankBadge>
              </ProfileBadges>
            </ProfileInfo>
          )}
        </ProfileContent>
      </ProfileSection>
      
      <NavList>
        {NAVIGATION_SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <NavItem
              key={section.id}
              $active={activeSection === section.id}
              $collapsed={collapsed}
              onClick={() => onSectionChange(section.id)}
              aria-label={section.title}
              title={collapsed ? section.title : undefined}
            >
              <Icon size={20} />
              <NavItemContent $collapsed={collapsed}>
                <NavItemTitle>{section.title}</NavItemTitle>
                <NavItemSubtitle>{section.subtitle}</NavItemSubtitle>
              </NavItemContent>
            </NavItem>
          );
        })}
      </NavList>
    </SidebarContainer>
  );
};

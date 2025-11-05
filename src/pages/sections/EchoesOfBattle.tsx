import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Swords, Award, Target, TrendingUp, Flame, Shield, Zap } from 'lucide-react';

// Styled Components
const PageContainer = styled.div`
  min-height: calc(100vh - 73px);
  padding: 2rem 1.5rem;
  position: relative;
  background: #020617;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  animation: fadeInDown 0.6s ease-out;
  
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: ${theme.typography.fontWeight.bold};
  color: #fbbf24;
  margin: 0 0 0.75rem 0;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #94a3b8;
  margin: 0 0 0.5rem 0;
`;

const EmotionTag = styled.span`
  display: inline-block;
  padding: 0.375rem 0.875rem;
  background: rgba(251, 191, 36, 0.1);
  border: 1px solid rgba(251, 191, 36, 0.2);
  border-radius: 9999px;
  color: #fbbf24;
  font-size: 0.75rem;
  font-weight: ${theme.typography.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.75rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div<{ $delay: number }>`
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(51, 65, 85, 0.5);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all ${theme.animations.transition.normal};
  animation: fadeInUp 0.5s ease-out ${props => props.$delay}s both;
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  &:hover {
    border-color: rgba(251, 191, 36, 0.3);
    background: rgba(30, 41, 59, 0.8);
  }
`;

const StatIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  background: rgba(251, 191, 36, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: ${theme.typography.fontWeight.bold};
  color: #f8fafc;
  line-height: 1;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: ${theme.typography.fontWeight.semibold};
  margin-bottom: 0.25rem;
`;

const StatDescription = styled.p`
  font-size: 0.75rem;
  color: #64748b;
  line-height: ${theme.typography.lineHeight.relaxed};
  margin: 0;
`;

const NarrativeSection = styled.div`
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(51, 65, 85, 0.5);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  animation: fadeIn 0.6s ease-out 0.4s both;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const NarrativeText = styled.p`
  font-size: 1.125rem;
  color: #e2e8f0;
  line-height: ${theme.typography.lineHeight.relaxed};
  margin: 0;
`;

interface StatCardData {
  icon: React.ComponentType<{ size: number; color: string }>;
  label: string;
  value: number | string;
  description: string;
  progress?: number;
}

export const EchoesOfBattle = () => {
  // Mock data - will be replaced with real data
  const stats: StatCardData[] = [
    {
      icon: Swords,
      label: 'Battles Fought',
      value: 847,
      description: 'Each match a chapter in your legend',
      progress: 0.85,
    },
    {
      icon: Award,
      label: 'Victories Claimed',
      value: 453,
      description: 'Triumph carved into the Rift',
      progress: 0.53,
    },
    {
      icon: Target,
      label: 'Glory Moments',
      value: '5,234',
      description: 'Enemies vanquished in battle',
      progress: 0.92,
    },
    {
      icon: TrendingUp,
      label: 'KDA Mastery',
      value: '2.95',
      description: 'The measure of your prowess',
      progress: 0.59,
    },
    {
      icon: Flame,
      label: 'Longest Win Streak',
      value: 12,
      description: 'When the Rift bowed before you',
      progress: 0.75,
    },
    {
      icon: Shield,
      label: 'Games This Season',
      value: 234,
      description: 'The current chapter unfolds',
      progress: 0.68,
    },
    {
      icon: Zap,
      label: 'Pentakills',
      value: 7,
      description: 'Legendary moments of absolute dominance',
      progress: 0.35,
    },
  ];

  const winRate = ((453 / 847) * 100).toFixed(1);

  return (
    <PageContainer>
      <ContentWrapper>
        <Header>
          <Title>Echoes of Battle</Title>
          <Subtitle>Your legacy in numbers</Subtitle>
          <EmotionTag>Pride · Reflection</EmotionTag>
        </Header>

        <StatsGrid>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <StatCard key={stat.label} $delay={index * 0.1}>
                <StatIconWrapper>
                  <Icon size={20} color="#fbbf24" />
                </StatIconWrapper>
                
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
                <StatDescription>{stat.description}</StatDescription>
              </StatCard>
            );
          })}
        </StatsGrid>

        <NarrativeSection>
          <NarrativeText>
            In {stats[0].value} trials upon the Rift, you claimed victory {winRate}% of the time. 
            Each battle leaves an echo — yours resonates with the power of {stats[2].value} moments of glory.
          </NarrativeText>
        </NarrativeSection>
      </ContentWrapper>
    </PageContainer>
  );
};

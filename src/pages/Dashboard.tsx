import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Chart } from '../components/charts/Chart';
import { usePlayerData } from '../hooks/usePlayerData';
import { BarChart3, TrendingUp, Users, Trophy, Target, Eye, Zap } from 'lucide-react';

const DashboardContainer = styled.div`
  padding: ${theme.spacing.lg};
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: ${theme.breakpoints.lg}) {
    padding: ${theme.spacing.md};
  }
`;

const DashboardHeader = styled.div`
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
`;

const PlayerSummary = styled(Card)`
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
`;

const PlayerName = styled.h1`
  font-size: ${theme.typography.fontSize['4xl']};
  margin-bottom: ${theme.spacing.sm};
  background: ${theme.colors.gradients.gold};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const PlayerRank = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
  
  .rank-info {
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.primary.gold};
    font-weight: ${theme.typography.fontWeight.semibold};
  }
  
  .lp {
    color: ${theme.colors.neutral.lightGray};
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const InsightsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const StrengthsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const StrengthItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.sm};
  background: rgba(200, 170, 110, 0.1);
  border-radius: ${theme.borderRadius.lg};
  border-left: 4px solid ${theme.colors.primary.gold};
`;

const WeaknessList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const WeaknessItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.sm};
  background: rgba(244, 67, 54, 0.1);
  border-radius: ${theme.borderRadius.lg};
  border-left: 4px solid ${theme.colors.status.error};
`;

const ScoreBadge = styled.span<{ score: number }>`
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.semibold};
  background: ${({ score }) => 
    score >= 80 ? theme.colors.status.success :
    score >= 60 ? theme.colors.status.warning :
    theme.colors.status.error
  };
  color: ${theme.colors.neutral.white};
  min-width: 40px;
  text-align: center;
`;

const LoadingState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.neutral.lightGray};
`;

const ErrorState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
  
  .error-message {
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.status.error};
    margin-bottom: ${theme.spacing.md};
  }
`;

const CenteredCardContent = styled.div`
  text-align: center;
`;

// Mock data for charts when no real data is available
const mockProgressData = [
  { month: 'Jan', rank: 1200, winRate: 55 },
  { month: 'Feb', rank: 1350, winRate: 58 },
  { month: 'Mar', rank: 1500, winRate: 62 },
  { month: 'Apr', rank: 1650, winRate: 65 },
  { month: 'May', rank: 1800, winRate: 68 },
  { month: 'Jun', rank: 1950, winRate: 70 },
];

const mockPlaystyleData = [
  { subject: 'Mechanical', score: 85 },
  { subject: 'Strategic', score: 72 },
  { subject: 'Teamwork', score: 90 },
  { subject: 'Vision', score: 65 },
  { subject: 'Positioning', score: 78 },
  { subject: 'Objective Control', score: 82 },
];

export const Dashboard: React.FC = () => {
  const { player, insights, progressData, isLoading, error, refetch } = usePlayerData();

  if (isLoading) {
    return (
      <DashboardContainer>
        <LoadingState>
          <div className="animate-fadeIn">Loading your League of Legends data...</div>
        </LoadingState>
      </DashboardContainer>
    );
  }

  if (error) {
    return (
      <DashboardContainer>
        <ErrorState>
          <div className="error-message">{error}</div>
          <Button variant="primary" onClick={refetch}>
            Try Again
          </Button>
        </ErrorState>
      </DashboardContainer>
    );
  }

  if (!player) {
    return (
      <DashboardContainer>
        <DashboardHeader>
          <h1>Welcome to LegendScope</h1>
          <p>Search for a summoner to view their analytics and insights</p>
        </DashboardHeader>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer className="animate-fadeIn">
      <PlayerSummary variant="highlight" glow>
        <PlayerName>{player.summonerName}</PlayerName>
        <PlayerRank>
          <Trophy size={24} />
          <span className="rank-info">
            {player.tier} {player.rank}
          </span>
          <span className="lp">({player.leaguePoints} LP)</span>
        </PlayerRank>
        <p>Level {player.summonerLevel} • {player.region.toUpperCase()}</p>
      </PlayerSummary>

      <StatsGrid>
        <Card hover>
          <Card.Header>
            <h3>
              <BarChart3 size={20} style={{ display: 'inline', marginRight: '8px' }} />
              Rank Progress
            </h3>
          </Card.Header>
          <Card.Content>
            <Chart
              type="line"
              data={progressData?.rankProgress.length ? progressData.rankProgress : mockProgressData}
              xKey="month"
              yKey="rank"
              height={250}
              color={theme.colors.primary.gold}
            />
          </Card.Content>
        </Card>

        <Card hover>
          <Card.Header>
            <h3>
              <TrendingUp size={20} style={{ display: 'inline', marginRight: '8px' }} />
              Win Rate Trend
            </h3>
          </Card.Header>
          <Card.Content>
            <Chart
              type="area"
              data={progressData?.rankProgress.length ? progressData.rankProgress : mockProgressData}
              xKey="month"
              yKey="winRate"
              height={250}
              color={theme.colors.accent.purple}
              gradient={true}
            />
          </Card.Content>
        </Card>

        <Card hover>
          <Card.Header>
            <h3>
              <Target size={20} style={{ display: 'inline', marginRight: '8px' }} />
              Playstyle Analysis
            </h3>
          </Card.Header>
          <Card.Content>
            <Chart
              type="radar"
              data={mockPlaystyleData}
              subjects={['Mechanical', 'Strategic', 'Teamwork', 'Vision', 'Positioning', 'Objective Control']}
              dataKey="score"
              height={250}
              color={theme.colors.secondary.blue}
            />
          </Card.Content>
        </Card>
      </StatsGrid>

      {insights && (
        <InsightsGrid>
          <Card variant="default" hover>
            <Card.Header>
              <h3>
                <Zap size={20} style={{ display: 'inline', marginRight: '8px' }} />
                Strengths
              </h3>
            </Card.Header>
            <Card.Content>
              <StrengthsList>
                {insights.strengths.map((strength, index) => (
                  <StrengthItem key={index}>
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: '4px' }}>
                        {strength.description}
                      </div>
                      <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                        {strength.category} • {strength.trend}
                      </div>
                    </div>
                    <ScoreBadge score={strength.score}>{strength.score}</ScoreBadge>
                  </StrengthItem>
                ))}
              </StrengthsList>
            </Card.Content>
          </Card>

          <Card variant="default" hover>
            <Card.Header>
              <h3>
                <Eye size={20} style={{ display: 'inline', marginRight: '8px' }} />
                Areas for Improvement
              </h3>
            </Card.Header>
            <Card.Content>
              <WeaknessList>
                {insights.weaknesses.map((weakness, index) => (
                  <WeaknessItem key={index}>
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: '4px' }}>
                        {weakness.description}
                      </div>
                      <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
                        {weakness.category} • {weakness.severity} priority
                      </div>
                    </div>
                    <div style={{ 
                      padding: '4px 8px', 
                      borderRadius: '12px', 
                      backgroundColor: theme.colors.status.warning,
                      color: theme.colors.neutral.white,
                      fontSize: '0.75rem',
                      fontWeight: 600 
                    }}>
                      {weakness.severity.toUpperCase()}
                    </div>
                  </WeaknessItem>
                ))}
              </WeaknessList>
            </Card.Content>
          </Card>
        </InsightsGrid>
      )}

      <Card variant="purple" glow hover>
        <Card.Header>
          <h3>
            <Users size={20} style={{ display: 'inline', marginRight: '8px' }} />
            Social Features
          </h3>
        </Card.Header>
        <Card.Content>
          <CenteredCardContent>
            <p style={{ marginBottom: theme.spacing.md }}>
              Compare your performance with friends, share achievements, and discover compatible duo partners!
            </p>
            <Button variant="secondary" size="lg">
              Connect with Friends
            </Button>
          </CenteredCardContent>
        </Card.Content>
      </Card>
    </DashboardContainer>
  );
};
import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Chart } from '../components/charts/Chart';
import { usePlayerData } from '../hooks/usePlayerData';
import { 
  Calendar, 
  Trophy, 
  TrendingUp, 
  Star, 
  Share2,
  Download,
  Target,
  Crown
} from 'lucide-react';

const YearEndContainer = styled.div`
  padding: ${theme.spacing.lg};
  max-width: 1400px;
  margin: 0 auto;
`;

const YearEndHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  
  h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    background: ${theme.colors.gradients.gold};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: ${theme.spacing.sm};
  }
  
  .year-badge {
    display: inline-flex;
    align-items: center;
    gap: ${theme.spacing.xs};
    background: ${theme.colors.gradients.secondary};
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    border-radius: ${theme.borderRadius.full};
    font-weight: ${theme.typography.fontWeight.semibold};
    margin-bottom: ${theme.spacing.md};
  }
`;

const StatsOverview = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
`;

const StatCard = styled(Card)`
  text-align: center;
  
  .stat-value {
    font-size: ${theme.typography.fontSize['3xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.primary.gold};
    margin-bottom: ${theme.spacing.xs};
  }
  
  .stat-label {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.neutral.lightGray};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const ChampionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const ChampionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.sm};
  background: rgba(200, 170, 110, 0.1);
  border-radius: ${theme.borderRadius.lg};
  border-left: 4px solid ${theme.colors.primary.gold};
  
  .champion-info {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
  }
  
  .champion-icon {
    width: 40px;
    height: 40px;
    border-radius: ${theme.borderRadius.md};
    background: ${theme.colors.gradients.secondary};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.neutral.white};
  }
  
  .champion-details {
    h4 {
      margin: 0;
      font-size: ${theme.typography.fontSize.base};
    }
    
    p {
      margin: 0;
      font-size: ${theme.typography.fontSize.sm};
      color: ${theme.colors.neutral.gray};
    }
  }
  
  .champion-stats {
    text-align: right;
    
    .games {
      font-weight: ${theme.typography.fontWeight.semibold};
      color: ${theme.colors.primary.gold};
    }
    
    .winrate {
      font-size: ${theme.typography.fontSize.sm};
      color: ${theme.colors.neutral.lightGray};
    }
  }
`;

const ImprovementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const ImprovementItem = styled.div`
  padding: ${theme.spacing.sm};
  background: rgba(157, 78, 221, 0.1);
  border-radius: ${theme.borderRadius.lg};
  border-left: 4px solid ${theme.colors.accent.purple};
  
  .improvement-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${theme.spacing.xs};
  }
  
  .improvement-title {
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.primary.lightGold};
  }
  
  .improvement-change {
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.status.success};
    font-size: ${theme.typography.fontSize.lg};
  }
  
  .improvement-description {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.neutral.lightGray};
  }
`;

const HighlightMatchesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const HighlightMatch = styled.div`
  padding: ${theme.spacing.sm};
  background: rgba(0, 183, 74, 0.1);
  border-radius: ${theme.borderRadius.lg};
  border-left: 4px solid ${theme.colors.status.success};
  
  .match-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${theme.spacing.xs};
  }
  
  .match-champion {
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.primary.lightGold};
  }
  
  .match-kda {
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.status.success};
  }
  
  .match-reason {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.neutral.lightGray};
    margin-bottom: ${theme.spacing.xs};
  }
  
  .match-highlights {
    display: flex;
    flex-wrap: wrap;
    gap: ${theme.spacing.xs};
  }
  
  .highlight-tag {
    background: ${theme.colors.primary.gold};
    color: ${theme.colors.secondary.darkBlue};
    padding: 2px 8px;
    border-radius: ${theme.borderRadius.sm};
    font-size: ${theme.typography.fontSize.xs};
    font-weight: ${theme.typography.fontWeight.medium};
  }
`;

const ShareSection = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.gradients.card};
  border-radius: ${theme.borderRadius['2xl']};
  margin-top: ${theme.spacing.xl};
  
  h3 {
    margin-bottom: ${theme.spacing.md};
  }
  
  .share-buttons {
    display: flex;
    justify-content: center;
    gap: ${theme.spacing.md};
    flex-wrap: wrap;
  }
`;

const SpacedCard = styled(Card)`
  margin-bottom: ${theme.spacing.xl};
`;

const SpacedPurpleCard = styled(Card)`
  margin-bottom: ${theme.spacing.xl};
`;

const RankJourneyChart = styled.div`
  .journey-path {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: ${theme.spacing.md} 0;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(
        90deg,
        ${theme.colors.primary.gold} 0%,
        ${theme.colors.accent.purple} 100%
      );
      z-index: 1;
    }
  }
  
  .rank-milestone {
    background: ${theme.colors.gradients.card};
    border: 3px solid ${theme.colors.primary.gold};
    border-radius: ${theme.borderRadius.full};
    padding: ${theme.spacing.sm};
    position: relative;
    z-index: 2;
    text-align: center;
    min-width: 100px;
    
    &.peak {
      border-color: ${theme.colors.accent.purple};
      box-shadow: ${theme.shadows.purpleGlow};
    }
    
    .rank-tier {
      font-weight: ${theme.typography.fontWeight.bold};
      font-size: ${theme.typography.fontSize.sm};
      color: ${theme.colors.primary.lightGold};
    }
    
    .rank-lp {
      font-size: ${theme.typography.fontSize.xs};
      color: ${theme.colors.neutral.gray};
    }
    
    .rank-label {
      font-size: ${theme.typography.fontSize.xs};
      color: ${theme.colors.neutral.lightGray};
      margin-top: ${theme.spacing.xs};
    }
  }
`;

// Mock data for demonstration
const mockYearEndData = {
  year: 2024,
  totalGames: 342,
  totalWins: 198,
  overallWinRate: 58,
  mostPlayedChampions: [
    { name: 'Jinx', games: 45, winRate: 67, icon: 'J' },
    { name: 'Caitlyn', games: 38, winRate: 61, icon: 'C' },
    { name: 'Vayne', games: 32, winRate: 72, icon: 'V' },
    { name: 'Ezreal', games: 28, winRate: 54, icon: 'E' },
    { name: 'Kai\'Sa', games: 24, winRate: 63, icon: 'K' },
  ],
  biggestImprovements: [
    { 
      title: 'CS per Minute', 
      change: +23, 
      description: 'Improved from 6.2 to 7.6 CS/min over the year',
      before: 6.2,
      after: 7.6
    },
    { 
      title: 'Vision Score', 
      change: +34, 
      description: 'Much better warding habits developed',
      before: 18,
      after: 24
    },
    { 
      title: 'Kill Participation', 
      change: +18, 
      description: 'Better team fighting and positioning',
      before: 58,
      after: 68
    },
  ],
  highlightMatches: [
    {
      champion: 'Jinx',
      kda: '18/2/12',
      reason: 'Pentakill in ranked game',
      highlights: ['Pentakill', 'Perfect KDA', 'Game Carry']
    },
    {
      champion: 'Caitlyn',
      kda: '12/1/8',
      reason: 'Promotion to Gold',
      highlights: ['Promo Game', 'Clutch Plays', '90% KP']
    },
    {
      champion: 'Vayne',
      kda: '15/3/6',
      reason: 'Solo Baron steal',
      highlights: ['Baron Steal', 'Outplay', '1v3 Triple']
    },
  ],
  rankJourney: {
    startRank: { tier: 'Silver', rank: 'III', lp: 45 },
    peakRank: { tier: 'Gold', rank: 'II', lp: 89 },
    endRank: { tier: 'Gold', rank: 'IV', lp: 23 },
  }
};

const monthlyProgressData = [
  { month: 'Jan', rank: 1100, wins: 12 },
  { month: 'Feb', rank: 1200, wins: 18 },
  { month: 'Mar', rank: 1350, wins: 22 },
  { month: 'Apr', rank: 1450, wins: 28 },
  { month: 'May', rank: 1580, wins: 31 },
  { month: 'Jun', rank: 1620, wins: 35 },
  { month: 'Jul', rank: 1750, wins: 41 },
  { month: 'Aug', rank: 1820, wins: 45 },
  { month: 'Sep', rank: 1680, wins: 47 },
  { month: 'Oct', rank: 1720, wins: 52 },
  { month: 'Nov', rank: 1650, wins: 55 },
  { month: 'Dec', rank: 1630, wins: 58 },
];

export const YearEndSummary: React.FC = () => {
  const { player } = usePlayerData();


  const handleShare = (platform: string) => {
    const summaryText = `🏆 My ${mockYearEndData.year} League of Legends Year in Review!\n\n📈 ${mockYearEndData.totalGames} games played with ${mockYearEndData.overallWinRate}% win rate\n🎯 Most played: ${mockYearEndData.mostPlayedChampions[0].name} (${mockYearEndData.mostPlayedChampions[0].games} games)\n⚡ Biggest improvement: ${mockYearEndData.biggestImprovements[0].title} (+${mockYearEndData.biggestImprovements[0].change}%)\n🚀 Climbed from ${mockYearEndData.rankJourney.startRank.tier} to ${mockYearEndData.rankJourney.endRank.tier}!\n\n#LeagueOfLegends #YearInReview #Gaming`;

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(summaryText)}`);
    } else if (platform === 'discord') {
      navigator.clipboard.writeText(summaryText);
      alert('Summary copied to clipboard! Paste it in Discord.');
    }
  };

  const handleDownload = () => {
    // In a real app, this would generate and download an image
    alert('Year-end summary image downloaded! (Feature would generate custom graphic)');
  };

  if (!player) {
    return (
      <YearEndContainer>
        <YearEndHeader>
          <h1>Year-End Summary</h1>
          <p>Search for a player to view their year-end summary</p>
        </YearEndHeader>
      </YearEndContainer>
    );
  }

  return (
    <YearEndContainer className="animate-fadeIn">
      <YearEndHeader>
        <h1>{player.summonerName}'s Year in Review</h1>
        <div className="year-badge">
          <Calendar size={16} />
          {mockYearEndData.year}
        </div>
        <p>Your League of Legends journey this year - achievements, growth, and memorable moments!</p>
      </YearEndHeader>

      {/* Stats Overview */}
      <StatsOverview>
        <StatCard variant="highlight" glow>
          <div className="stat-value">{mockYearEndData.totalGames}</div>
          <div className="stat-label">Games Played</div>
        </StatCard>
        
        <StatCard variant="purple" glow>
          <div className="stat-value">{mockYearEndData.totalWins}</div>
          <div className="stat-label">Victories</div>
        </StatCard>
        
        <StatCard variant="default" hover>
          <div className="stat-value">{mockYearEndData.overallWinRate}%</div>
          <div className="stat-label">Win Rate</div>
        </StatCard>
        
        <StatCard variant="default" hover>
          <div className="stat-value">
            {mockYearEndData.rankJourney.startRank.tier} → {mockYearEndData.rankJourney.endRank.tier}
          </div>
          <div className="stat-label">Rank Journey</div>
        </StatCard>
      </StatsOverview>

      {/* Main Content Grid */}
      <SectionGrid>
        {/* Most Played Champions */}
        <Card hover>
          <Card.Header>
            <h3>
              <Crown size={20} style={{ display: 'inline', marginRight: '8px' }} />
              Most Played Champions
            </h3>
          </Card.Header>
          <Card.Content>
            <ChampionsList>
              {mockYearEndData.mostPlayedChampions.map((champion, index) => (
                <ChampionItem key={champion.name}>
                  <div className="champion-info">
                    <div className="champion-icon">{champion.icon}</div>
                    <div className="champion-details">
                      <h4>{champion.name}</h4>
                      <p>#{index + 1} Most Played</p>
                    </div>
                  </div>
                  <div className="champion-stats">
                    <div className="games">{champion.games} games</div>
                    <div className="winrate">{champion.winRate}% WR</div>
                  </div>
                </ChampionItem>
              ))}
            </ChampionsList>
          </Card.Content>
        </Card>

        {/* Biggest Improvements */}
        <Card hover>
          <Card.Header>
            <h3>
              <TrendingUp size={20} style={{ display: 'inline', marginRight: '8px' }} />
              Biggest Improvements
            </h3>
          </Card.Header>
          <Card.Content>
            <ImprovementsList>
              {mockYearEndData.biggestImprovements.map((improvement) => (
                <ImprovementItem key={improvement.title}>
                  <div className="improvement-header">
                    <div className="improvement-title">{improvement.title}</div>
                    <div className="improvement-change">+{improvement.change}%</div>
                  </div>
                  <div className="improvement-description">{improvement.description}</div>
                </ImprovementItem>
              ))}
            </ImprovementsList>
          </Card.Content>
        </Card>
      </SectionGrid>

      {/* Highlight Matches */}
      <SpacedCard hover>
        <Card.Header>
          <h3>
            <Star size={20} style={{ display: 'inline', marginRight: '8px' }} />
            Highlight Matches
          </h3>
        </Card.Header>
        <Card.Content>
          <HighlightMatchesList>
            {mockYearEndData.highlightMatches.map((match, index) => (
              <HighlightMatch key={index}>
                <div className="match-header">
                  <div className="match-champion">{match.champion}</div>
                  <div className="match-kda">{match.kda}</div>
                </div>
                <div className="match-reason">{match.reason}</div>
                <div className="match-highlights">
                  {match.highlights.map((highlight) => (
                    <span key={highlight} className="highlight-tag">{highlight}</span>
                  ))}
                </div>
              </HighlightMatch>
            ))}
          </HighlightMatchesList>
        </Card.Content>
      </SpacedCard>

      {/* Progress Chart */}
      <SpacedCard hover>
        <Card.Header>
          <h3>
            <Target size={20} style={{ display: 'inline', marginRight: '8px' }} />
            Monthly Progress
          </h3>
        </Card.Header>
        <Card.Content>
          <Chart
            type="line"
            data={monthlyProgressData}
            xKey="month"
            yKey="rank"
            height={300}
            color={theme.colors.primary.gold}
          />
        </Card.Content>
      </SpacedCard>

      {/* Rank Journey */}
      <SpacedPurpleCard variant="purple" glow>
        <Card.Header>
          <h3>
            <Trophy size={20} style={{ display: 'inline', marginRight: '8px' }} />
            Rank Journey
          </h3>
        </Card.Header>
        <Card.Content>
          <RankJourneyChart>
            <div className="journey-path">
              <div className="rank-milestone">
                <div className="rank-tier">{mockYearEndData.rankJourney.startRank.tier}</div>
                <div className="rank-lp">{mockYearEndData.rankJourney.startRank.lp} LP</div>
                <div className="rank-label">Start</div>
              </div>
              
              <div className="rank-milestone peak">
                <div className="rank-tier">{mockYearEndData.rankJourney.peakRank.tier}</div>
                <div className="rank-lp">{mockYearEndData.rankJourney.peakRank.lp} LP</div>
                <div className="rank-label">Peak</div>
              </div>
              
              <div className="rank-milestone">
                <div className="rank-tier">{mockYearEndData.rankJourney.endRank.tier}</div>
                <div className="rank-lp">{mockYearEndData.rankJourney.endRank.lp} LP</div>
                <div className="rank-label">Current</div>
              </div>
            </div>
          </RankJourneyChart>
        </Card.Content>
      </SpacedPurpleCard>

      {/* Share Section */}
      <ShareSection>
        <h3>
          <Share2 size={20} style={{ display: 'inline', marginRight: '8px' }} />
          Share Your Year in Review
        </h3>
        <p style={{ marginBottom: theme.spacing.lg }}>
          Show off your League of Legends journey and achievements with your friends!
        </p>
        
        <div className="share-buttons">
          <Button 
            variant="primary" 
            onClick={() => handleShare('twitter')}
          >
            <Share2 size={16} />
            Share on Twitter
          </Button>
          
          <Button 
            variant="secondary" 
            onClick={() => handleShare('discord')}
          >
            <Share2 size={16} />
            Share on Discord
          </Button>
          
          <Button 
            variant="accent" 
            onClick={handleDownload}
          >
            <Download size={16} />
            Download Image
          </Button>
        </div>
      </ShareSection>
    </YearEndContainer>
  );
};
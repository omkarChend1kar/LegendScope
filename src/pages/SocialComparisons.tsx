import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { usePlayerData } from '../hooks/usePlayerData';

import { 
  Users, 
  Trophy, 
  Target, 
  TrendingUp, 
  Star, 
  Share2,
  Shield,
  Sword,
  Heart
} from 'lucide-react';

const SocialContainer = styled.div`
  padding: ${theme.spacing.lg};
  max-width: 1400px;
  margin: 0 auto;
`;

const SocialHeader = styled.div`
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
`;

const FriendsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
`;

const FriendCard = styled(Card)<{ selected?: boolean }>`
  cursor: pointer;
  border: ${({ selected }) => selected ? `2px solid ${theme.colors.primary.gold}` : 'none'};
  
  .friend-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${theme.spacing.md};
  }
  
  .friend-info {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
  }
  
  .friend-avatar {
    width: 50px;
    height: 50px;
    border-radius: ${theme.borderRadius.full};
    background: ${theme.colors.gradients.secondary};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.neutral.white};
    font-size: ${theme.typography.fontSize.lg};
  }
  
  .friend-details {
    h4 {
      margin: 0;
      color: ${theme.colors.primary.lightGold};
    }
    
    .friend-rank {
      font-size: ${theme.typography.fontSize.sm};
      color: ${theme.colors.neutral.gray};
    }
  }
  
  .friend-status {
    padding: 4px 8px;
    border-radius: ${theme.borderRadius.sm};
    font-size: ${theme.typography.fontSize.xs};
    font-weight: ${theme.typography.fontWeight.medium};
    
    &.online {
      background: rgba(0, 183, 74, 0.2);
      color: ${theme.colors.status.success};
    }
    
    &.offline {
      background: rgba(156, 163, 175, 0.2);
      color: ${theme.colors.neutral.gray};
    }
  }
`;

const ComparisonSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const ComparisonCard = styled(Card)`
  .comparison-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${theme.spacing.md};
  }
  
  .vs-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${theme.spacing.md};
    
    .player-stats {
      text-align: center;
      flex: 1;
    }
    
    .vs-divider {
      margin: 0 ${theme.spacing.md};
      font-weight: ${theme.typography.fontWeight.bold};
      color: ${theme.colors.primary.gold};
      font-size: ${theme.typography.fontSize.lg};
    }
  }
  
  .stat-comparison {
    margin-bottom: ${theme.spacing.sm};
    
    .stat-name {
      font-size: ${theme.typography.fontSize.sm};
      color: ${theme.colors.neutral.lightGray};
      margin-bottom: ${theme.spacing.xs};
    }
    
    .stat-bars {
      display: flex;
      align-items: center;
      gap: ${theme.spacing.sm};
    }
    
    .stat-bar {
      height: 8px;
      border-radius: ${theme.borderRadius.full};
      position: relative;
      flex: 1;
      
      &.player {
        background: ${theme.colors.primary.gold};
      }
      
      &.friend {
        background: ${theme.colors.accent.purple};
      }
    }
    
    .stat-value {
      font-weight: ${theme.typography.fontWeight.semibold};
      min-width: 40px;
      text-align: center;
      font-size: ${theme.typography.fontSize.sm};
    }
  }
`;



const CompatibilityCard = styled(Card)`
  .compatibility-score {
    text-align: center;
    margin-bottom: ${theme.spacing.lg};
    
    .score-circle {
      width: 120px;
      height: 120px;
      border-radius: ${theme.borderRadius.full};
      background: conic-gradient(
        ${theme.colors.primary.gold} 0deg,
        ${theme.colors.primary.gold} calc(var(--score) * 3.6deg),
        rgba(200, 170, 110, 0.2) calc(var(--score) * 3.6deg),
        rgba(200, 170, 110, 0.2) 360deg
      );
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto ${theme.spacing.md};
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        inset: 8px;
        border-radius: ${theme.borderRadius.full};
        background: ${theme.colors.secondary.darkBlue};
      }
      
      .score-text {
        position: relative;
        z-index: 1;
        font-size: ${theme.typography.fontSize['2xl']};
        font-weight: ${theme.typography.fontWeight.bold};
        color: ${theme.colors.primary.lightGold};
      }
    }
    
    .compatibility-label {
      font-size: ${theme.typography.fontSize.lg};
      font-weight: ${theme.typography.fontWeight.semibold};
      color: ${theme.colors.primary.lightGold};
    }
  }
  
  .compatibility-factors {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: ${theme.spacing.md};
  }
  
  .factor {
    text-align: center;
    padding: ${theme.spacing.md};
    background: rgba(200, 170, 110, 0.05);
    border-radius: ${theme.borderRadius.lg};
    
    .factor-icon {
      margin-bottom: ${theme.spacing.sm};
      color: ${theme.colors.primary.gold};
    }
    
    .factor-name {
      font-weight: ${theme.typography.fontWeight.semibold};
      margin-bottom: ${theme.spacing.xs};
    }
    
    .factor-score {
      color: ${theme.colors.neutral.lightGray};
      font-size: ${theme.typography.fontSize.sm};
    }
  }
`;

const LeaderboardSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const LeaderboardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const LeaderboardItem = styled.div<{ rank: number }>`
  display: flex;
  align-items: center;
  padding: ${theme.spacing.md};
  background: ${props => props.rank === 1 ? 'rgba(200, 170, 110, 0.1)' : 'rgba(200, 170, 110, 0.05)'};
  border-radius: ${theme.borderRadius.lg};
  border-left: 4px solid ${props => 
    props.rank === 1 ? theme.colors.primary.gold :
    props.rank === 2 ? '#C0C0C0' :
    props.rank === 3 ? '#CD7F32' :
    theme.colors.neutral.gray
  };
  
  .rank-number {
    font-size: ${theme.typography.fontSize.xl};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${props => 
      props.rank === 1 ? theme.colors.primary.gold :
      props.rank === 2 ? '#C0C0C0' :
      props.rank === 3 ? '#CD7F32' :
      theme.colors.neutral.gray
    };
    margin-right: ${theme.spacing.md};
    min-width: 40px;
  }
  
  .player-info {
    flex: 1;
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
  }
  
  .player-avatar {
    width: 40px;
    height: 40px;
    border-radius: ${theme.borderRadius.full};
    background: ${theme.colors.gradients.secondary};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.neutral.white};
  }
  
  .player-details {
    h4 {
      margin: 0;
      color: ${theme.colors.primary.lightGold};
    }
    
    .player-rank {
      font-size: ${theme.typography.fontSize.sm};
      color: ${theme.colors.neutral.gray};
    }
  }
  
  .player-score {
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.primary.gold};
    font-size: ${theme.typography.fontSize.lg};
  }
`;

const AddFriendSection = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.gradients.card};
  border-radius: ${theme.borderRadius['2xl']};
  margin-bottom: ${theme.spacing.xl};
`;

const FriendInput = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  max-width: 400px;
  margin: 0 auto ${theme.spacing.md};
  
  input {
    flex: 1;
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    border: 2px solid rgba(200, 170, 110, 0.3);
    border-radius: ${theme.borderRadius.lg};
    background: rgba(0, 0, 0, 0.3);
    color: ${theme.colors.neutral.white};
    font-size: ${theme.typography.fontSize.base};
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.primary.gold};
      box-shadow: ${theme.shadows.glow};
    }
    
    &::placeholder {
      color: ${theme.colors.neutral.gray};
    }
  }
`;

// Mock data
const mockFriends = [
  { 
    id: 1, 
    name: 'ProGamer123', 
    rank: 'Gold II', 
    status: 'online',
    avatar: 'P',
    winRate: 65,
    kda: 2.1,
    mainRole: 'ADC'
  },
  { 
    id: 2, 
    name: 'MidLaneGod', 
    rank: 'Platinum IV', 
    status: 'online',
    avatar: 'M',
    winRate: 72,
    kda: 2.8,
    mainRole: 'Mid'
  },
  { 
    id: 3, 
    name: 'SupportMain', 
    rank: 'Gold I', 
    status: 'offline',
    avatar: 'S',
    winRate: 58,
    kda: 1.9,
    mainRole: 'Support'
  },
];

const mockLeaderboard = [
  { name: 'MidLaneGod', rank: 'Plat IV', avatar: 'M', score: 1847 },
  { name: 'YourPlayer', rank: 'Gold IV', avatar: 'Y', score: 1632 },
  { name: 'ProGamer123', rank: 'Gold II', avatar: 'P', score: 1598 },
  { name: 'SupportMain', rank: 'Gold I', avatar: 'S', score: 1554 },
  { name: 'JungleKing', rank: 'Silver I', avatar: 'J', score: 1445 },
];

export const SocialComparisons: React.FC = () => {
  const { player } = usePlayerData();

  const [selectedFriend, setSelectedFriend] = useState(mockFriends[0]);
  const [newFriendName, setNewFriendName] = useState('');

  const addFriend = () => {
    if (newFriendName.trim()) {
      // In a real app, this would make an API call to add friend
      alert(`Friend request sent to ${newFriendName}!`);
      setNewFriendName('');
    }
  };

  const calculateCompatibility = (friend: typeof mockFriends[0]) => {
    // Mock compatibility calculation based on roles, playstyle, etc.
    const roleCompatibility = friend.mainRole !== 'ADC' ? 85 : 60; // Higher if different roles
    const skillCompatibility = Math.abs(friend.winRate - 60) < 10 ? 90 : 70;
    const playstyleCompatibility = friend.kda > 2.0 ? 80 : 75;
    
    return Math.round((roleCompatibility + skillCompatibility + playstyleCompatibility) / 3);
  };

  const compatibilityScore = calculateCompatibility(selectedFriend);

  if (!player) {
    return (
      <SocialContainer>
        <SocialHeader>
          <h1>Social Comparisons</h1>
          <p>Search for a player to view social features</p>
        </SocialHeader>
      </SocialContainer>
    );
  }

  return (
    <SocialContainer className="animate-fadeIn">
      <SocialHeader>
        <h1>Social Hub</h1>
        <p>Compare your performance with friends and discover compatible teammates!</p>
      </SocialHeader>

      {/* Add Friend Section */}
      <AddFriendSection>
        <h3>
          <Users size={20} style={{ display: 'inline', marginRight: '8px' }} />
          Add Friends
        </h3>
        <p style={{ marginBottom: theme.spacing.md }}>
          Connect with other League players to compare stats and find duo partners!
        </p>
        <FriendInput>
          <input
            type="text"
            placeholder="Enter summoner name..."
            value={newFriendName}
            onChange={(e) => setNewFriendName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addFriend()}
          />
          <Button variant="primary" onClick={addFriend}>
            Add Friend
          </Button>
        </FriendInput>
      </AddFriendSection>

      {/* Friends List */}
      <h2 style={{ marginBottom: theme.spacing.md }}>Your Friends ({mockFriends.length})</h2>
      <FriendsGrid>
        {mockFriends.map((friend) => (
          <FriendCard 
            key={friend.id} 
            hover 
            selected={selectedFriend.id === friend.id}
            onClick={() => setSelectedFriend(friend)}
          >
            <div className="friend-header">
              <div className="friend-info">
                <div className="friend-avatar">{friend.avatar}</div>
                <div className="friend-details">
                  <h4>{friend.name}</h4>
                  <div className="friend-rank">{friend.rank}</div>
                </div>
              </div>
              <div className={`friend-status ${friend.status}`}>
                {friend.status}
              </div>
            </div>
            <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.neutral.lightGray }}>
              Main: {friend.mainRole} • {friend.winRate}% WR • {friend.kda} KDA
            </div>
          </FriendCard>
        ))}
      </FriendsGrid>

      {/* Comparison Section */}
      <ComparisonSection>
        <h2 style={{ marginBottom: theme.spacing.md }}>
          <Target size={20} style={{ display: 'inline', marginRight: '8px' }} />
          Performance Comparison
        </h2>
        <ComparisonGrid>
          <ComparisonCard hover>
            <div className="comparison-header">
              <h3>Stats Breakdown</h3>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => alert('Challenge sent!')}
              >
                Challenge
              </Button>
            </div>
            
            <div className="vs-section">
              <div className="player-stats">
                <h4>{player.summonerName}</h4>
                <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.neutral.gray }}>
                  {player.rank}
                </div>
              </div>
              <div className="vs-divider">VS</div>
              <div className="player-stats">
                <h4>{selectedFriend.name}</h4>
                <div style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.neutral.gray }}>
                  {selectedFriend.rank}
                </div>
              </div>
            </div>

            <div className="stat-comparison">
              <div className="stat-name">Win Rate</div>
              <div className="stat-bars">
                <div className="stat-value">60%</div>
                <div className="stat-bar player" style={{ width: '60%' }}></div>
                <div className="stat-bar friend" style={{ width: `${selectedFriend.winRate}%` }}></div>
                <div className="stat-value">{selectedFriend.winRate}%</div>
              </div>
            </div>

            <div className="stat-comparison">
              <div className="stat-name">KDA Ratio</div>
              <div className="stat-bars">
                <div className="stat-value">1.8</div>
                <div className="stat-bar player" style={{ width: '45%' }}></div>
                <div className="stat-bar friend" style={{ width: `${selectedFriend.kda * 20}%` }}></div>
                <div className="stat-value">{selectedFriend.kda}</div>
              </div>
            </div>

            <div className="stat-comparison">
              <div className="stat-name">CS per Minute</div>
              <div className="stat-bars">
                <div className="stat-value">7.2</div>
                <div className="stat-bar player" style={{ width: '72%' }}></div>
                <div className="stat-bar friend" style={{ width: '68%' }}></div>
                <div className="stat-value">6.8</div>
              </div>
            </div>
          </ComparisonCard>

          {/* Compatibility Card */}
          <CompatibilityCard variant="purple" glow>
            <Card.Header>
              <h3>
                <Heart size={20} style={{ display: 'inline', marginRight: '8px' }} />
                Duo Compatibility
              </h3>
            </Card.Header>
            <Card.Content>
              <div className="compatibility-score">
                <div 
                  className="score-circle" 
                  style={{ '--score': compatibilityScore } as any}
                >
                  <div className="score-text">{compatibilityScore}%</div>
                </div>
                <div className="compatibility-label">Great Match!</div>
              </div>

              <div className="compatibility-factors">
                <div className="factor">
                  <div className="factor-icon">
                    <Sword size={24} />
                  </div>
                  <div className="factor-name">Role Synergy</div>
                  <div className="factor-score">85%</div>
                </div>
                
                <div className="factor">
                  <div className="factor-icon">
                    <Shield size={24} />
                  </div>
                  <div className="factor-name">Playstyle</div>
                  <div className="factor-score">80%</div>
                </div>
                
                <div className="factor">
                  <div className="factor-icon">
                    <TrendingUp size={24} />
                  </div>
                  <div className="factor-name">Skill Level</div>
                  <div className="factor-score">90%</div>
                </div>
              </div>

              <div style={{ marginTop: theme.spacing.md, textAlign: 'center' }}>
                <Button variant="primary" onClick={() => alert('Duo request sent!')}>
                  <Users size={16} />
                  Invite to Duo
                </Button>
              </div>
            </Card.Content>
          </CompatibilityCard>
        </ComparisonGrid>
      </ComparisonSection>

      {/* Friends Leaderboard */}
      <LeaderboardSection>
        <Card hover>
          <Card.Header>
            <h3>
              <Trophy size={20} style={{ display: 'inline', marginRight: '8px' }} />
              Friends Leaderboard
            </h3>
          </Card.Header>
          <Card.Content>
            <LeaderboardList>
              {mockLeaderboard.map((player, index) => (
                <LeaderboardItem key={player.name} rank={index + 1}>
                  <div className="rank-number">#{index + 1}</div>
                  <div className="player-info">
                    <div className="player-avatar">{player.avatar}</div>
                    <div className="player-details">
                      <h4>{player.name}</h4>
                      <div className="player-rank">{player.rank}</div>
                    </div>
                  </div>
                  <div className="player-score">{player.score} LP</div>
                </LeaderboardItem>
              ))}
            </LeaderboardList>
          </Card.Content>
        </Card>
      </LeaderboardSection>

      {/* Share Section */}
      <Card variant="highlight" glow>
        <Card.Header>
          <h3>
            <Share2 size={20} style={{ display: 'inline', marginRight: '8px' }} />
            Share Your Progress
          </h3>
        </Card.Header>
        <Card.Content>
          <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: theme.spacing.md }}>
              Show your friends how you're climbing the ladder!
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: theme.spacing.md, flexWrap: 'wrap' }}>
              <Button 
                variant="primary"
                onClick={() => alert('Sharing on social media...')}
              >
                <Share2 size={16} />
                Share Achievement
              </Button>
              <Button 
                variant="secondary"
                onClick={() => alert('Copied comparison link!')}
              >
                <Star size={16} />
                Share Comparison
              </Button>
            </div>
          </div>
        </Card.Content>
      </Card>
    </SocialContainer>
  );
};
import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { usePlayerData } from '../hooks/usePlayerData';
import { 
  Share2, 
  Download, 
  Trophy, 
  Star, 
  TrendingUp,
  Target,
  Zap,
  Camera,
  Sparkles,
  Award
} from 'lucide-react';

const ShareableContainer = styled.div`
  padding: ${theme.spacing.lg};
  max-width: 1400px;
  margin: 0 auto;
`;

const ShareableHeader = styled.div`
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

const MomentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const MomentCard = styled(Card)`
  position: relative;
  overflow: hidden;
  
  .moment-preview {
    background: ${theme.colors.gradients.secondary};
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${theme.spacing.md};
    position: relative;
    
    .preview-content {
      text-align: center;
      color: ${theme.colors.neutral.white};
      
      .moment-icon {
        margin-bottom: ${theme.spacing.sm};
        color: ${theme.colors.primary.gold};
      }
      
      .moment-title {
        font-size: ${theme.typography.fontSize.xl};
        font-weight: ${theme.typography.fontWeight.bold};
        margin-bottom: ${theme.spacing.xs};
      }
      
      .moment-subtitle {
        color: ${theme.colors.neutral.lightGray};
        font-size: ${theme.typography.fontSize.sm};
      }
    }
    
    .moment-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        135deg,
        rgba(200, 170, 110, 0.1) 0%,
        rgba(157, 78, 221, 0.1) 100%
      );
    }
  }
  
  .moment-actions {
    display: flex;
    gap: ${theme.spacing.sm};
    
    button {
      flex: 1;
    }
  }
  
  .moment-stats {
    margin-bottom: ${theme.spacing.md};
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.neutral.lightGray};
    
    .stat-highlight {
      color: ${theme.colors.primary.gold};
      font-weight: ${theme.typography.fontWeight.semibold};
    }
  }
`;

const AchievementShowcase = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const AchievementsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${theme.spacing.md};
`;

const AchievementItem = styled.div<{ rarity: 'common' | 'rare' | 'legendary' }>`
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.lg};
  background: ${props => 
    props.rarity === 'legendary' ? 'rgba(200, 170, 110, 0.1)' :
    props.rarity === 'rare' ? 'rgba(157, 78, 221, 0.1)' :
    'rgba(200, 170, 110, 0.05)'
  };
  border: 2px solid ${props => 
    props.rarity === 'legendary' ? theme.colors.primary.gold :
    props.rarity === 'rare' ? theme.colors.accent.purple :
    'rgba(200, 170, 110, 0.3)'
  };
  position: relative;
  
  .achievement-header {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.sm};
  }
  
  .achievement-icon {
    color: ${props => 
      props.rarity === 'legendary' ? theme.colors.primary.gold :
      props.rarity === 'rare' ? theme.colors.accent.purple :
      theme.colors.neutral.lightGray
    };
  }
  
  .achievement-title {
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.primary.lightGold};
  }
  
  .achievement-description {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.neutral.lightGray};
    margin-bottom: ${theme.spacing.sm};
  }
  
  .achievement-date {
    font-size: ${theme.typography.fontSize.xs};
    color: ${theme.colors.neutral.gray};
  }
  
  .rarity-badge {
    position: absolute;
    top: ${theme.spacing.sm};
    right: ${theme.spacing.sm};
    padding: 2px 6px;
    border-radius: ${theme.borderRadius.sm};
    font-size: ${theme.typography.fontSize.xs};
    font-weight: ${theme.typography.fontWeight.medium};
    text-transform: uppercase;
    background: ${props => 
      props.rarity === 'legendary' ? theme.colors.primary.gold :
      props.rarity === 'rare' ? theme.colors.accent.purple :
      theme.colors.neutral.gray
    };
    color: ${theme.colors.secondary.darkBlue};
  }
`;

const TemplateSection = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.md};
`;

const TemplateCard = styled.div`
  background: ${theme.colors.gradients.card};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  border: 1px solid rgba(200, 170, 110, 0.2);
  position: relative;
  
  .template-preview {
    background: ${theme.colors.secondary.darkBlue};
    height: 150px;
    border-radius: ${theme.borderRadius.md};
    margin-bottom: ${theme.spacing.sm};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    
    .template-content {
      text-align: center;
      color: ${theme.colors.neutral.white};
      z-index: 1;
      position: relative;
      
      .template-title {
        font-weight: ${theme.typography.fontWeight.bold};
        margin-bottom: ${theme.spacing.xs};
      }
      
      .template-desc {
        font-size: ${theme.typography.fontSize.sm};
        color: ${theme.colors.neutral.lightGray};
      }
    }
    
    .template-bg {
      position: absolute;
      inset: 0;
      background: radial-gradient(
        circle at center,
        rgba(200, 170, 110, 0.1) 0%,
        transparent 70%
      );
    }
  }
  
  .template-info {
    margin-bottom: ${theme.spacing.sm};
    
    h4 {
      margin: 0 0 ${theme.spacing.xs} 0;
      color: ${theme.colors.primary.lightGold};
    }
    
    p {
      margin: 0;
      font-size: ${theme.typography.fontSize.sm};
      color: ${theme.colors.neutral.lightGray};
    }
  }
  
  .template-actions {
    display: flex;
    gap: ${theme.spacing.sm};
    
    button {
      flex: 1;
    }
  }
`;

// Mock data
const mockMoments = [
  {
    id: 1,
    type: 'pentakill',
    title: 'PENTAKILL!',
    subtitle: 'First pentakill of the season',
    champion: 'Jinx',
    kda: '18/2/12',
    date: '2024-03-15',
    stats: 'Perfect KDA • 85% Kill Participation'
  },
  {
    id: 2,
    type: 'promotion',
    title: 'PROMOTED!',
    subtitle: 'Welcome to Gold!',
    from: 'Silver I',
    to: 'Gold IV',
    date: '2024-06-20',
    stats: '7 Game Win Streak • 72% Win Rate'
  },
  {
    id: 3,
    type: 'improvement',
    title: 'SKILL UP!',
    subtitle: 'CS improvement milestone',
    improvement: 'CS per Minute',
    change: '+2.4',
    date: '2024-09-10',
    stats: '6.2 → 8.6 CS/min • Top 15%'
  },
  {
    id: 4,
    type: 'milestone',
    title: '100 WINS!',
    subtitle: 'Season milestone reached',
    milestone: '100 Ranked Wins',
    winRate: '64%',
    date: '2024-11-05',
    stats: '100W/56L • 64% Win Rate'
  }
];

const mockAchievements = [
  {
    id: 1,
    title: 'First Blood Master',
    description: 'Get first blood in 5 consecutive games',
    rarity: 'rare' as const,
    date: '2024-08-15',
    icon: <Target size={24} />
  },
  {
    id: 2,
    title: 'Pentakill Legend',
    description: 'Achieve your first pentakill',
    rarity: 'legendary' as const,
    date: '2024-03-15',
    icon: <Star size={24} />
  },
  {
    id: 3,
    title: 'Climbing Beast',
    description: 'Win 10 ranked games in a row',
    rarity: 'rare' as const,
    date: '2024-06-18',
    icon: <TrendingUp size={24} />
  },
  {
    id: 4,
    title: 'Consistent Player',
    description: 'Play ranked every day for a week',
    rarity: 'common' as const,
    date: '2024-07-22',
    icon: <Trophy size={24} />
  }
];

const mockTemplates = [
  {
    id: 1,
    name: 'Rank Up Post',
    description: 'Celebrate your promotions',
    preview: 'PROMOTED TO GOLD!',
    platforms: ['Twitter', 'Instagram', 'Discord']
  },
  {
    id: 2,
    name: 'Weekly Summary',
    description: 'Share your week in League',
    preview: 'This Week: 8W/3L',
    platforms: ['Twitter', 'Discord']
  },
  {
    id: 3,
    name: 'Achievement Unlock',
    description: 'Show off new achievements',
    preview: 'Achievement Unlocked!',
    platforms: ['Twitter', 'Instagram', 'Discord']
  },
  {
    id: 4,
    name: 'Match Highlight',
    description: 'Feature your best games',
    preview: 'Pentakill Game!',
    platforms: ['Twitter', 'Instagram']
  }
];

export const ShareableMoments: React.FC = () => {
  const { player } = usePlayerData();

  const handleShareMoment = (moment: typeof mockMoments[0], platform: string) => {
    let shareText = '';
    
    if (moment.type === 'pentakill') {
      shareText = `🔥 PENTAKILL with ${moment.champion}! ${moment.kda} KDA in ranked. ${moment.stats} #LeagueOfLegends #Pentakill`;
    } else if (moment.type === 'promotion') {
      shareText = `🚀 PROMOTED to ${moment.to}! Climbed from ${moment.from} with a ${moment.stats}! #LeagueOfLegends #Promoted`;
    } else if (moment.type === 'improvement') {
      shareText = `📈 Improved my ${moment.improvement} by ${moment.change}! ${moment.stats} #LeagueOfLegends #Improvement`;
    } else if (moment.type === 'milestone') {
      shareText = `🏆 ${moment.milestone} achieved! ${moment.stats} #LeagueOfLegends #Milestone`;
    }

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`);
    } else if (platform === 'discord') {
      navigator.clipboard.writeText(shareText);
      alert('Copied to clipboard! Paste in Discord.');
    } else {
      alert(`Sharing to ${platform}...`);
    }
  };

  const handleDownloadMoment = (moment: typeof mockMoments[0]) => {
    alert(`Downloading ${moment.title} image... (Feature would generate custom graphic)`);
  };

  const handleUseTemplate = (template: typeof mockTemplates[0]) => {
    alert(`Using ${template.name} template... (Feature would open template editor)`);
  };

  const handleShareAchievement = (achievement: typeof mockAchievements[0]) => {
    const shareText = `🏆 Achievement Unlocked: ${achievement.title}! ${achievement.description} #LeagueOfLegends #Achievement`;
    navigator.clipboard.writeText(shareText);
    alert('Achievement copied to clipboard!');
  };

  if (!player) {
    return (
      <ShareableContainer>
        <ShareableHeader>
          <h1>Shareable Moments</h1>
          <p>Search for a player to view shareable content</p>
        </ShareableHeader>
      </ShareableContainer>
    );
  }

  return (
    <ShareableContainer className="animate-fadeIn">
      <ShareableHeader>
        <h1>Shareable Moments</h1>
        <p>Create and share your League of Legends highlights and achievements!</p>
      </ShareableHeader>

      {/* Recent Moments */}
      <h2 style={{ marginBottom: theme.spacing.md }}>
        <Sparkles size={20} style={{ display: 'inline', marginRight: '8px' }} />
        Recent Moments
      </h2>
      <MomentsGrid>
        {mockMoments.map((moment) => (
          <MomentCard key={moment.id} hover>
            <div className="moment-preview">
              <div className="moment-overlay" />
              <div className="preview-content">
                <div className="moment-icon">
                  {moment.type === 'pentakill' && <Star size={32} />}
                  {moment.type === 'promotion' && <Trophy size={32} />}
                  {moment.type === 'improvement' && <TrendingUp size={32} />}
                  {moment.type === 'milestone' && <Award size={32} />}
                </div>
                <div className="moment-title">{moment.title}</div>
                <div className="moment-subtitle">{moment.subtitle}</div>
              </div>
            </div>
            
            <div className="moment-stats">
              <span className="stat-highlight">{moment.stats}</span>
            </div>
            
            <div className="moment-actions">
              <Button 
                variant="primary"
                size="sm"
                onClick={() => handleShareMoment(moment, 'twitter')}
              >
                <Share2 size={14} />
                Share
              </Button>
              <Button 
                variant="secondary"
                size="sm"
                onClick={() => handleDownloadMoment(moment)}
              >
                <Download size={14} />
                Download
              </Button>
            </div>
          </MomentCard>
        ))}
      </MomentsGrid>

      {/* Achievement Showcase */}
      <AchievementShowcase>
        <h2 style={{ marginBottom: theme.spacing.md }}>
          <Award size={20} style={{ display: 'inline', marginRight: '8px' }} />
          Achievement Showcase
        </h2>
        <AchievementsList>
          {mockAchievements.map((achievement) => (
            <AchievementItem 
              key={achievement.id} 
              rarity={achievement.rarity}
              onClick={() => handleShareAchievement(achievement)}
              style={{ cursor: 'pointer' }}
            >
              <div className="rarity-badge">{achievement.rarity}</div>
              <div className="achievement-header">
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-title">{achievement.title}</div>
              </div>
              <div className="achievement-description">{achievement.description}</div>
              <div className="achievement-date">Unlocked: {achievement.date}</div>
            </AchievementItem>
          ))}
        </AchievementsList>
      </AchievementShowcase>

      {/* Share Templates */}
      <TemplateSection>
        <h2 style={{ marginBottom: theme.spacing.md }}>
          <Camera size={20} style={{ display: 'inline', marginRight: '8px' }} />
          Share Templates
        </h2>
        <TemplateGrid>
          {mockTemplates.map((template) => (
            <TemplateCard key={template.id}>
              <div className="template-preview">
                <div className="template-bg" />
                <div className="template-content">
                  <div className="template-title">{template.preview}</div>
                  <div className="template-desc">Customizable template</div>
                </div>
              </div>
              
              <div className="template-info">
                <h4>{template.name}</h4>
                <p>{template.description}</p>
                <p style={{ fontSize: theme.typography.fontSize.xs, marginTop: theme.spacing.xs }}>
                  Platforms: {template.platforms.join(', ')}
                </p>
              </div>
              
              <div className="template-actions">
                <Button 
                  variant="primary"
                  size="sm"
                  onClick={() => handleUseTemplate(template)}
                >
                  <Zap size={14} />
                  Use Template
                </Button>
                <Button 
                  variant="secondary"
                  size="sm"
                  onClick={() => alert('Template preview opened!')}
                >
                  Preview
                </Button>
              </div>
            </TemplateCard>
          ))}
        </TemplateGrid>
      </TemplateSection>

      {/* Quick Share */}
      <Card variant="highlight" glow>
        <Card.Header>
          <h3>
            <Share2 size={20} style={{ display: 'inline', marginRight: '8px' }} />
            Quick Share
          </h3>
        </Card.Header>
        <Card.Content>
          <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: theme.spacing.md }}>
              Share your current rank and recent performance with one click!
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: theme.spacing.md, flexWrap: 'wrap' }}>
              <Button 
                variant="primary"
                onClick={() => {
                  const quickShare = `🎮 Currently ${player.rank} in League of Legends! Working my way up the ladder. #LeagueOfLegends #Ranked`;
                  navigator.clipboard.writeText(quickShare);
                  alert('Quick share copied to clipboard!');
                }}
              >
                <Share2 size={16} />
                Share Current Rank
              </Button>
              <Button 
                variant="secondary"
                onClick={() => alert('Opening moment creator...')}
              >
                <Camera size={16} />
                Create Custom Moment
              </Button>
            </div>
          </div>
        </Card.Content>
      </Card>
    </ShareableContainer>
  );
};
import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Search,
  User,
  Trophy,
  Star,
  AlertCircle,
  CheckCircle,
  Globe
} from 'lucide-react';

const LookupContainer = styled.div`
  padding: ${theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`;

const LookupHeader = styled.div`
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
  
  p {
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.neutral.lightGray};
    margin-bottom: ${theme.spacing.xl};
  }
`;

const LookupForm = styled(Card)`
  max-width: 600px;
  margin: 0 auto ${theme.spacing.xl};
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.md};
  
  label {
    display: block;
    font-weight: ${theme.typography.fontWeight.semibold};
    color: ${theme.colors.primary.lightGold};
    margin-bottom: ${theme.spacing.xs};
    font-size: ${theme.typography.fontSize.base};
  }
  
  .form-hint {
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.neutral.gray};
    margin-top: ${theme.spacing.xs};
    display: block;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid rgba(200, 170, 110, 0.3);
  border-radius: ${theme.borderRadius.lg};
  background: rgba(0, 0, 0, 0.3);
  color: ${theme.colors.neutral.white};
  font-size: ${theme.typography.fontSize.base};
  transition: all ${theme.animations.transition.normal};
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.gold};
    box-shadow: ${theme.shadows.glow};
  }
  
  &::placeholder {
    color: ${theme.colors.neutral.gray};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid rgba(200, 170, 110, 0.3);
  border-radius: ${theme.borderRadius.lg};
  background: rgba(0, 0, 0, 0.3);
  color: ${theme.colors.neutral.white};
  font-size: ${theme.typography.fontSize.base};
  transition: all ${theme.animations.transition.normal};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.gold};
    box-shadow: ${theme.shadows.glow};
  }
  
  option {
    background: ${theme.colors.secondary.darkBlue};
    color: ${theme.colors.neutral.white};
  }
`;

const MessageContainer = styled.div<{ type: 'success' | 'error' | 'info' }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.md};
  font-weight: ${theme.typography.fontWeight.medium};
  
  ${({ type }) => {
    switch (type) {
      case 'success':
        return `
          background: rgba(0, 183, 74, 0.1);
          border: 1px solid ${theme.colors.status.success};
          color: ${theme.colors.status.success};
        `;
      case 'error':
        return `
          background: rgba(244, 67, 54, 0.1);
          border: 1px solid ${theme.colors.status.error};
          color: ${theme.colors.status.error};
        `;
      case 'info':
        return `
          background: rgba(33, 150, 243, 0.1);
          border: 1px solid ${theme.colors.status.info};
          color: ${theme.colors.status.info};
        `;
    }
  }}
`;

const ResultsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const SummonerCard = styled(Card)`
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
  
  .summoner-avatar {
    width: 80px;
    height: 80px;
    border-radius: ${theme.borderRadius.full};
    background: ${theme.colors.gradients.secondary};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing.md};
    font-size: ${theme.typography.fontSize['2xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.neutral.white};
  }
  
  .summoner-name {
    font-size: ${theme.typography.fontSize['2xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.primary.lightGold};
    margin-bottom: ${theme.spacing.xs};
  }
  
  .summoner-level {
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.neutral.lightGray};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing.xs};
  }
`;

const ChampionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.md};
`;

const ChampionCard = styled.div`
  background: ${theme.colors.gradients.card};
  border: 2px solid ${theme.colors.neutral.darkGray};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.md};
  transition: all ${theme.animations.transition.normal};
  border-left: 4px solid ${theme.colors.primary.gold};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.md};
  }
  
  .champion-header {
    display: flex;
    align-items: center;
    justify-content: between;
    margin-bottom: ${theme.spacing.sm};
  }
  
  .champion-id {
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.primary.lightGold};
  }
  
  .champion-level {
    background: ${theme.colors.primary.gold};
    color: ${theme.colors.secondary.darkBlue};
    padding: 4px 8px;
    border-radius: ${theme.borderRadius.sm};
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.medium};
    margin-left: auto;
  }
  
  .champion-points {
    font-size: ${theme.typography.fontSize.base};
    color: ${theme.colors.neutral.lightGray};
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`;

interface SummonerData {
  summoner: {
    name: string;
    level: number;
  };
  topChampions?: Array<{
    championId: number;
    championLevel: number;
    championPoints: number;
  }>;
}

interface Message {
  text: string;
  type: 'success' | 'error' | 'info';
}

const regions = [
  { value: 'na1', label: 'North America' },
  { value: 'euw1', label: 'Europe West' },
  { value: 'eun1', label: 'Europe Nordic & East' },
  { value: 'kr', label: 'Korea' },
  { value: 'br1', label: 'Brazil' },
  { value: 'la1', label: 'Latin America North' },
  { value: 'la2', label: 'Latin America South' },
  { value: 'oc1', label: 'Oceania' },
  { value: 'tr1', label: 'Turkey' },
  { value: 'ru', label: 'Russia' },
  { value: 'jp1', label: 'Japan' },
];

export const LeagueDataLookup: React.FC = () => {
  const [riotId, setRiotId] = useState('');
  const [region, setRegion] = useState('na1');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);
  const [summonerData, setSummonerData] = useState<SummonerData | null>(null);

  // Mock API URL - in production this would be your Lambda function URL
  const RIOT_API_URL = import.meta.env.VITE_RIOT_API_URL || 'https://khqf3gvliey6fdtnsysunoi6su0qhmyx.lambda-url.eu-north-1.on.aws';

  const showMessage = (text: string, type: 'success' | 'error' | 'info') => {
    setMessage({ text, type });
    // Auto-hide after 10 seconds
    setTimeout(() => {
      setMessage(null);
    }, 10000);
  };

  const handleLookup = async () => {
    if (!riotId.trim()) {
      showMessage('Please enter a Riot ID', 'error');
      return;
    }

    if (!riotId.includes('#')) {
      showMessage('Please use Riot ID format: GameName#TAG', 'error');
      return;
    }

    setLoading(true);
    setMessage(null);
    setSummonerData(null);

    try {
      // For demo purposes, we'll simulate an API call with mock data
      if (false) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock successful response
        const mockData: SummonerData = {
          summoner: {
            name: riotId.split('#')[0],
            level: Math.floor(Math.random() * 300) + 50
          },
          topChampions: [
            {
              championId: 51, // Caitlyn
              championLevel: 7,
              championPoints: 234567
            },
            {
              championId: 222, // Jinx  
              championLevel: 6,
              championPoints: 189432
            },
            {
              championId: 67, // Vayne
              championLevel: 5,
              championPoints: 156789
            }
          ]
        };

        setSummonerData(mockData);
        showMessage('Summoner found!', 'success');
      } else {
        // Real API call
        const response = await fetch(RIOT_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            riotId: riotId,
            region: region
          })
        });

        const data = await response.json();

        console.log('API Response:', data);

        if (response.ok) {
          setSummonerData(data);
          showMessage('Summoner found!', 'success');
        } else {
          showMessage(data.error || 'Failed to fetch summoner data', 'error');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      showMessage('Network error. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleLookup();
    }
  };

  const getChampionName = (championId: number): string => {
    // In a real app, you'd have a champion mapping
    const championMap: { [key: number]: string } = {
      51: 'Caitlyn',
      222: 'Jinx',
      67: 'Vayne',
      81: 'Ezreal',
      145: "Kai'Sa",
      // Add more champions as needed
    };
    
    return championMap[championId] || `Champion ${championId}`;
  };

  return (
    <LookupContainer className="animate-fadeIn">
      <LookupHeader>
        <h1>League Data Lookup</h1>
        <p>Enter a Riot ID to see their level and top champions!</p>
      </LookupHeader>

      <LookupForm variant="default" hover>
        <Card.Content>
          {message && (
            <MessageContainer type={message.type}>
              {message.type === 'success' && <CheckCircle size={20} />}
              {message.type === 'error' && <AlertCircle size={20} />}
              {message.type === 'info' && <Globe size={20} />}
              {message.text}
            </MessageContainer>
          )}

          <FormGroup>
            <label htmlFor="summoner-name">Riot ID</label>
            <Input
              id="summoner-name"
              type="text"
              value={riotId}
              onChange={(e) => setRiotId(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="GameName#TAG (e.g., Hide on bush#KR1)"
              disabled={loading}
            />
            <span className="form-hint">Format: GameName#TAG</span>
          </FormGroup>

          <FormGroup>
            <label htmlFor="region">Region</label>
            <Select
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              disabled={loading}
            >
              {regions.map((regionOption) => (
                <option key={regionOption.value} value={regionOption.value}>
                  {regionOption.label}
                </option>
              ))}
            </Select>
          </FormGroup>

          <ButtonContainer>
            <Button
              variant="primary"
              onClick={handleLookup}
              disabled={loading}
            >
              <Search size={16} />
              {loading ? 'Looking up...' : 'Look Up Summoner'}
            </Button>
          </ButtonContainer>
        </Card.Content>
      </LookupForm>

      {summonerData && (
        <ResultsContainer>
          <SummonerCard variant="highlight" glow>
            <Card.Header>
              <h3>
                <User size={20} style={{ display: 'inline', marginRight: '8px' }} />
                Summoner Info
              </h3>
            </Card.Header>
            <Card.Content>
              <div className="summoner-avatar">
                {summonerData.summoner.name.charAt(0).toUpperCase()}
              </div>
              <div className="summoner-name">{summonerData.summoner.name}</div>
              <div className="summoner-level">
                <Star size={20} />
                Level {summonerData.summoner.level}
              </div>
            </Card.Content>
          </SummonerCard>

          {summonerData.topChampions && summonerData.topChampions.length > 0 && (
            <Card hover>
              <Card.Header>
                <h3>
                  <Trophy size={20} style={{ display: 'inline', marginRight: '8px' }} />
                  Top Champions
                </h3>
              </Card.Header>
              <Card.Content>
                <ChampionsGrid>
                  {summonerData.topChampions.map((champion, index) => (
                    <ChampionCard key={champion.championId}>
                      <div className="champion-header">
                        <div className="champion-id">
                          #{index + 1} {getChampionName(champion.championId)}
                        </div>
                        <div className="champion-level">
                          M{champion.championLevel}
                        </div>
                      </div>
                      <div className="champion-points">
                        <Trophy size={16} />
                        {champion.championPoints.toLocaleString()} points
                      </div>
                    </ChampionCard>
                  ))}
                </ChampionsGrid>
              </Card.Content>
            </Card>
          )}

          {(!summonerData.topChampions || summonerData.topChampions.length === 0) && (
            <Card>
              <Card.Content>
                <p style={{ textAlign: 'center', color: theme.colors.neutral.lightGray }}>
                  No champion mastery data found.
                </p>
              </Card.Content>
            </Card>
          )}
        </ResultsContainer>
      )}
    </LookupContainer>
  );
};
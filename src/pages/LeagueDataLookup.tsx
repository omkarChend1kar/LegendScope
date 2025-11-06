import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import {
  Search,
  AlertCircle,
  CheckCircle,
  Globe,
  Swords
} from 'lucide-react';

// Page Container
const PageContainer = styled.div`
  min-height: 100vh;
  padding: 2rem 1.5rem;
  background: #020617;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  max-width: 520px;
  width: 100%;
  margin: 0 auto;
`;

// Header Section
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

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const LogoIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
`;

const LogoText = styled.div`
  h1 {
    font-size: 1.875rem;
    font-weight: ${theme.typography.fontWeight.bold};
    color: #fbbf24;
    margin: 0;
    letter-spacing: -0.02em;
  }
  
  p {
    font-size: 0.75rem;
    color: #64748b;
    margin: 0.25rem 0 0 0;
    font-style: italic;
  }
`;

const Title = styled.h1`
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: ${theme.typography.fontWeight.bold};
  color: #fbbf24;
  margin: 0 0 0.75rem 0;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #94a3b8;
  margin: 0;
`;

// Form Section
const FormContainer = styled.div`
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(51, 65, 85, 0.5);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  animation: fadeInUp 0.5s ease-out 0.1s both;
  
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
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  &:last-of-type {
    margin-bottom: 0;
  }
  
  label {
    display: block;
    font-weight: ${theme.typography.fontWeight.semibold};
    color: #fbbf24;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .form-hint {
    font-size: 0.75rem;
    color: #64748b;
    margin-top: 0.375rem;
    display: block;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(51, 65, 85, 0.5);
  border-radius: 0.5rem;
  background: rgba(15, 23, 42, 0.5);
  color: #f8fafc;
  font-size: 0.875rem;
  transition: all ${theme.animations.transition.normal};
  
  &:focus {
    outline: none;
    border-color: rgba(251, 191, 36, 0.5);
    background: rgba(15, 23, 42, 0.8);
  }
  
  &::placeholder {
    color: #64748b;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(51, 65, 85, 0.5);
  border-radius: 0.5rem;
  background: rgba(15, 23, 42, 0.5);
  color: #f8fafc;
  font-size: 0.875rem;
  transition: all ${theme.animations.transition.normal};
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: rgba(251, 191, 36, 0.5);
    background: rgba(15, 23, 42, 0.8);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  option {
    background: #0f172a;
    color: #f8fafc;
  }
`;

const MessageContainer = styled.div<{ type: 'success' | 'error' | 'info' }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
  font-weight: ${theme.typography.fontWeight.medium};
  animation: slideDown 0.3s ease-out;
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  ${({ type }) => {
    switch (type) {
      case 'success':
        return `
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          color: #4ade80;
        `;
      case 'error':
        return `
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #f87171;
        `;
      case 'info':
        return `
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          color: #60a5fa;
        `;
    }
  }}
`;

const SearchButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: #fbbf24;
  color: #020617;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: ${theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${theme.animations.transition.normal};
  margin-top: 1.5rem;
  
  &:hover:not(:disabled) {
    background: #f59e0b;
    transform: translateY(-1px);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
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

interface PlayerData {
  riotId: string;
  region: string;
  summoner: {
    name: string;
    level: number;
  };
}

interface LeagueDataLookupProps {
  onPlayerFound: (data: PlayerData) => void;
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

export const LeagueDataLookup: React.FC<LeagueDataLookupProps> = ({ onPlayerFound }) => {
  const [riotId, setRiotId] = useState('');
  const [region, setRegion] = useState('na1');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

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

    try {
      // Mock API response for testing - change to true to use mock data
      const useMockData = true;
      
      if (useMockData) {
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

        showMessage('Summoner found! Redirecting to dashboard...', 'success');
        
        // Navigate to dashboard after short delay
        setTimeout(() => {
          onPlayerFound({
            riotId: riotId,
            region: region,
            summoner: mockData.summoner
          });
        }, 1500);
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

        if (response.ok) {
          showMessage('Summoner found! Redirecting to dashboard...', 'success');
          
          // Navigate to dashboard after short delay
          setTimeout(() => {
            onPlayerFound({
              riotId: riotId,
              region: region,
              summoner: data.summoner
            });
          }, 1500);
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

  return (
    <PageContainer>
      <ContentWrapper>
        <Header>
          <LogoContainer>
            <LogoIcon>
              <Swords size={28} color="#0f172a" />
            </LogoIcon>
            <LogoText>
              <h1>LegendScope</h1>
              <p>Every battle tells a story</p>
            </LogoText>
          </LogoContainer>
          
          <Title>Summoner's Gate</Title>
          <Subtitle>Enter your Riot ID to begin your journey</Subtitle>
        </Header>

        <FormContainer>
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

          <SearchButton onClick={handleLookup} disabled={loading}>
            <Search size={16} />
            {loading ? 'Looking up...' : 'Look Up Summoner'}
          </SearchButton>
        </FormContainer>
      </ContentWrapper>
    </PageContainer>
  );
};
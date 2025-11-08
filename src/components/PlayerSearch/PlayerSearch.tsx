import React, { useState } from 'react';
import styled from 'styled-components';
import { Search, User, MapPin } from 'lucide-react';
import { theme } from '../../styles/theme';
import { Button } from '../ui/Button';
import { usePlayerData } from '../../hooks/usePlayerData';
import type { Region } from '../../types';

interface PlayerSearchProps {
  onPlayerFound?: (player: PlayerSummary) => void;
}

interface PlayerSummary {
  name: string;
  region: Region;
}

interface RecentSearch {
  name: string;
  region: Region;
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  max-width: 600px;
  margin: 0 auto;
`;

const SearchForm = styled.form`
  display: flex;
  gap: ${theme.spacing.sm};
  align-items: end;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  flex: 1;
`;

const Label = styled.label`
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.primary.lightGold};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const Input = styled.input`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.neutral.darkGray};
  border-radius: ${theme.borderRadius.lg};
  background: rgba(30, 35, 42, 0.5);
  color: ${theme.colors.neutral.lightGray};
  font-size: ${theme.typography.fontSize.base};
  transition: all ${theme.animations.transition.normal};
  
  &:focus {
    border-color: ${theme.colors.primary.gold};
    box-shadow: ${theme.shadows.glow};
    outline: none;
  }
  
  &::placeholder {
    color: ${theme.colors.neutral.gray};
  }
`;

const Select = styled.select`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 2px solid ${theme.colors.neutral.darkGray};
  border-radius: ${theme.borderRadius.lg};
  background: rgba(30, 35, 42, 0.8);
  color: ${theme.colors.neutral.lightGray};
  font-size: ${theme.typography.fontSize.base};
  transition: all ${theme.animations.transition.normal};
  cursor: pointer;
  min-width: 120px;
  
  &:focus {
    border-color: ${theme.colors.primary.gold};
    box-shadow: ${theme.shadows.glow};
    outline: none;
  }
  
  option {
    background: ${theme.colors.secondary.darkBlue};
    color: ${theme.colors.neutral.lightGray};
  }
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.status.struggle};
  font-size: ${theme.typography.fontSize.sm};
  text-align: center;
  padding: ${theme.spacing.sm};
  background: rgba(244, 67, 54, 0.1);
  border-radius: ${theme.borderRadius.lg};
  border: 1px solid rgba(244, 67, 54, 0.3);
`;

const RecentSearches = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const RecentSearch = styled.button`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
  background: rgba(30, 35, 42, 0.3);
  border: 1px solid ${theme.colors.neutral.darkGray};
  border-radius: ${theme.borderRadius.lg};
  color: ${theme.colors.neutral.lightGray};
  font-size: ${theme.typography.fontSize.sm};
  transition: all ${theme.animations.transition.whisper};
  
  &:hover {
    background: rgba(200, 170, 110, 0.1);
    border-color: ${theme.colors.primary.gold};
    transform: translateY(-2px);
  }
`;

const regions: { value: Region; label: string }[] = [
  { value: 'na1', label: 'North America' },
  { value: 'euw1', label: 'Europe West' },
  { value: 'eun1', label: 'Europe Nordic & East' },
  { value: 'kr', label: 'Korea' },
  { value: 'br1', label: 'Brazil' },
  { value: 'la1', label: 'Latin America North' },
  { value: 'la2', label: 'Latin America South' },
  { value: 'oc1', label: 'Oceania' },
  { value: 'ru', label: 'Russia' },
  { value: 'tr1', label: 'Turkey' },
  { value: 'jp1', label: 'Japan' },
];

export const PlayerSearch: React.FC<PlayerSearchProps> = ({ onPlayerFound }) => {
  const [summonerName, setSummonerName] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region>('na1');
  const [localError, setLocalError] = useState('');
  const [recentSearches] = useState<RecentSearch[]>([
    { name: 'Faker', region: 'kr' },
    { name: 'Doublelift', region: 'na1' },
    { name: 'Caps', region: 'euw1' },
  ]);

  const { searchPlayer, isLoading, error } = usePlayerData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (!summonerName.trim()) {
      setLocalError('Please enter a summoner name');
      return;
    }

    const success = await searchPlayer(summonerName.trim(), selectedRegion);
    if (success && onPlayerFound) {
      onPlayerFound({ name: summonerName, region: selectedRegion });
    }
  };

  const handleRecentSearch = async (name: string, region: Region) => {
    setSummonerName(name);
    setSelectedRegion(region);
    setLocalError('');

    const success = await searchPlayer(name, region);
    if (success && onPlayerFound) {
      onPlayerFound({ name, region });
    }
  };

  const displayError = localError || error;

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <InputGroup>
          <Label>
            <User size={16} />
            Summoner Name
          </Label>
          <Input
            type="text"
            placeholder="Enter summoner name..."
            value={summonerName}
            onChange={(e) => setSummonerName(e.target.value)}
            disabled={isLoading}
          />
        </InputGroup>

        <InputGroup>
          <Label>
            <MapPin size={16} />
            Region
          </Label>
          <Select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value as Region)}
            disabled={isLoading}
          >
            {regions.map((region) => (
              <option key={region.value} value={region.value}>
                {region.label}
              </option>
            ))}
          </Select>
        </InputGroup>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          disabled={isLoading || !summonerName.trim()}
        >
          <Search size={18} />
          Search
        </Button>
      </SearchForm>

      {displayError && (
        <ErrorMessage className="animate-fadeIn">
          {displayError}
        </ErrorMessage>
      )}

      {recentSearches.length > 0 && !isLoading && (
        <RecentSearches>
          <Label style={{ marginBottom: theme.spacing.xs }}>Recent Searches</Label>
          {recentSearches.map((search, index) => (
            <RecentSearch
              key={index}
              onClick={() => handleRecentSearch(search.name, search.region)}
              className="animate-slideInLeft"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <User size={16} />
              <span>{search.name}</span>
              <span style={{ 
                fontSize: '0.75rem', 
                color: theme.colors.neutral.gray,
                marginLeft: 'auto' 
              }}>
                {regions.find(r => r.value === search.region)?.label}
              </span>
            </RecentSearch>
          ))}
        </RecentSearches>
      )}
    </SearchContainer>
  );
};
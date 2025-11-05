import { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Search, Download, UserCircle } from 'lucide-react';

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(24px);
  border-bottom: 1px solid #1e293b;
`;

const HeaderContent = styled.div`
  padding: 1rem 1.5rem;
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
`;

const SearchContainer = styled.div`
  flex: 1;
  max-width: 32rem;
`;

const SearchWrapper = styled.div`
  position: relative;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: #64748b;
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid #334155;
  border-radius: 0.5rem;
  padding: 0.625rem 1rem 0.625rem 2.75rem;
  font-size: 0.875rem;
  color: #f1f5f9;
  transition: all ${theme.animations.transition.normal};
  
  &::placeholder {
    color: #64748b;
  }
  
  &:focus {
    outline: none;
    border-color: rgba(251, 191, 36, 0.5);
    background: rgba(30, 41, 59, 0.8);
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Select = styled.select`
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid #334155;
  border-radius: 0.5rem;
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  color: #f1f5f9;
  cursor: pointer;
  transition: all ${theme.animations.transition.normal};
  
  &:focus {
    outline: none;
    border-color: #475569;
  }
  
  &:hover {
    background: rgba(30, 41, 59, 0.8);
  }
`;

const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: #fbbf24;
  color: #0f172a;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${theme.animations.transition.normal};
  
  &:hover {
    background: #f59e0b;
  }
  
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const ChangePlayerButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  background: transparent;
  color: #64748b;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  font-size: 0.8125rem;
  font-weight: ${theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${theme.animations.transition.normal};
  white-space: nowrap;
  
  &:hover {
    color: #94a3b8;
    background: rgba(30, 41, 59, 0.3);
    border-color: rgba(51, 65, 85, 0.3);
  }
  
  svg {
    width: 1rem;
    height: 1rem;
  }
  
  span {
    font-size: 0.8125rem;
  }
`;

interface TopBarProps {
  onChangePlayer?: () => void;
}

export const TopBar = ({ onChangePlayer }: TopBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('30d');

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export clicked');
  };

  return (
    <Header>
      <HeaderContent>
        <HeaderInner>
          <SearchContainer>
            <SearchWrapper>
              <SearchIcon />
              <SearchInput
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </SearchWrapper>
          </SearchContainer>

          <ActionsContainer>
            {onChangePlayer && (
              <ChangePlayerButton 
                onClick={onChangePlayer}
                title="Switch to a different player"
                aria-label="Change Player"
              >
                <UserCircle />
                <span>Switch Player</span>
              </ChangePlayerButton>
            )}

            <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="season">This Season</option>
            </Select>

            <ExportButton onClick={handleExport}>
              <Download />
              <span>Export</span>
            </ExportButton>
          </ActionsContainer>
        </HeaderInner>
      </HeaderContent>
    </Header>
  );
};

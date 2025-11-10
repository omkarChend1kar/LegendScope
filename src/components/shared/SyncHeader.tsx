import { useState } from 'react';
import styled from 'styled-components';
import { RefreshCw } from 'lucide-react';

const SyncContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0.875rem;
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(51, 65, 85, 0.5);
  border-radius: 0.5rem;
`;

const SyncLabel = styled.span`
  font-size: 0.8125rem;
  font-weight: 600;
  color: #c8aa6e;
  letter-spacing: 0.02em;
`;

const SyncTimestamp = styled.span`
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 500;
`;

const SyncButton = styled.button<{ $loading?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  background: transparent;
  color: #64748b;
  border: 1px solid rgba(51, 65, 85, 0.5);
  border-radius: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover:not(:disabled) {
    color: #94a3b8;
    background: rgba(30, 41, 59, 0.5);
    border-color: rgba(100, 116, 139, 0.5);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  svg {
    width: 1rem;
    height: 1rem;
    animation: ${props => props.$loading ? 'spin 1s linear infinite' : 'none'};
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

interface SyncHeaderProps {
  lastSyncTime?: Date | null;
  onSync?: () => Promise<void>;
  label?: string;
}

export const SyncHeader: React.FC<SyncHeaderProps> = ({ 
  lastSyncTime, 
  onSync,
  label = 'Last 20 Battles'
}) => {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    if (!onSync || isSyncing) return;
    
    setIsSyncing(true);
    try {
      await onSync();
    } finally {
      setIsSyncing(false);
    }
  };

  const formatSyncTime = (date: Date | null | undefined) => {
    if (!date) return 'Never synced';
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  return (
    <SyncContainer>
      <SyncLabel>{label}</SyncLabel>
      <SyncTimestamp>
        Synced {formatSyncTime(lastSyncTime)}
      </SyncTimestamp>
      <SyncButton 
        onClick={handleSync}
        disabled={isSyncing || !onSync}
        $loading={isSyncing}
        title="Sync latest matches"
        aria-label="Sync matches"
      >
        <RefreshCw size={16} />
        <span>{isSyncing ? 'Syncing...' : 'Sync'}</span>
      </SyncButton>
    </SyncContainer>
  );
};

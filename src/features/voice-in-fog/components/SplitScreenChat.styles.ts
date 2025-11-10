import styled from 'styled-components';
import { designTokens } from '../../echoes-of-battle/presentation/styles/designTokens';

export const SplitScreenOverlay = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%);
  backdrop-filter: blur(12px);
  border-left: 1px solid rgba(148, 163, 184, 0.2);
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const SplitScreenBackdrop = styled.div<{ $isOpen: boolean }>`
  display: none; /* Not needed for true split-screen */
`;

export const SplitChatHeader = styled.div`
  padding: ${designTokens.spacing.lg} ${designTokens.spacing.xl};
  border-bottom: 1px solid rgba(148, 163, 184, 0.15);
  background: rgba(15, 23, 42, 0.8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${designTokens.spacing.md};
`;

export const SplitChatTitle = styled.h2`
  font-family: 'Cinzel', serif;
  font-size: ${designTokens.typography.fontSize.xl};
  letter-spacing: 0.03em;
  color: #c084fc;
  margin: 0;
  background: linear-gradient(135deg, #c084fc 0%, #60a5fa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const CloseButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(148, 163, 184, 0.1);
  border: 1px solid rgba(148, 163, 184, 0.2);
  color: rgba(226, 232, 240, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(148, 163, 184, 0.2);
    border-color: rgba(148, 163, 184, 0.3);
    color: rgba(226, 232, 240, 1);
  }

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
  }
`;

export const StartersSection = styled.div`
  padding: ${designTokens.spacing.lg} ${designTokens.spacing.xl};
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  max-height: 40vh;
  overflow-y: auto;
  flex-shrink: 0;
  
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.3);
    border-radius: 3px;
    
    &:hover {
      background: rgba(148, 163, 184, 0.5);
    }
  }
`;

export const StartersTitle = styled.h3`
  font-size: ${designTokens.typography.fontSize.sm};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(148, 163, 184, 0.7);
  margin: 0 0 ${designTokens.spacing.md} 0;
  font-weight: 600;
  position: sticky;
  top: 0;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.98) 100%);
  padding: ${designTokens.spacing.xs} 0;
  z-index: 1;
`;

export const StartersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${designTokens.spacing.md};
  padding-bottom: ${designTokens.spacing.sm};
`;

export const StarterCard = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${designTokens.spacing.md} ${designTokens.spacing.lg};
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background: rgba(30, 41, 59, 0.9);
    border-color: rgba(96, 165, 250, 0.3);
    transform: translateX(-2px);
    box-shadow: 0 4px 12px rgba(96, 165, 250, 0.15);
  }

  &:active {
    transform: translateX(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StarterTitle = styled.div`
  font-size: ${designTokens.typography.fontSize.sm};
  font-weight: 600;
  color: rgba(226, 232, 240, 0.98);
  margin-bottom: 4px;
`;

export const StarterDescription = styled.div`
  font-size: ${designTokens.typography.fontSize.xs};
  color: rgba(148, 163, 184, 0.85);
  line-height: 1.4;
`;

export const SplitMessagesContainer = styled.div`
  flex: 1;
  min-height: 200px;
  overflow-y: auto;
  padding: ${designTokens.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.md};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.3);
    border-radius: 3px;
    
    &:hover {
      background: rgba(148, 163, 184, 0.5);
    }
  }
`;

export const SplitInputContainer = styled.div`
  padding: ${designTokens.spacing.lg};
  border-top: 1px solid rgba(148, 163, 184, 0.15);
  background: rgba(15, 23, 42, 0.9);
`;

export const FloatingChatButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg, #9333ea 0%, #3b82f6 100%);
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(147, 51, 234, 0.4);
  z-index: 998;

  &::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: linear-gradient(135deg, #9333ea 0%, #3b82f6 100%);
    opacity: 0.4;
    filter: blur(12px);
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 0.4;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.1);
    }
  }

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 12px 32px rgba(147, 51, 234, 0.5);
  }

  &:active {
    transform: translateY(0) scale(1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  svg {
    position: relative;
    z-index: 1;
  }
`;

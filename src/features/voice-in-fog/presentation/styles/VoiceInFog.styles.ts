import styled from 'styled-components';
import { designTokens } from '../../../echoes-of-battle/presentation/styles/designTokens';

export const VoiceLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${designTokens.colors.background.primary};
`;

export const VoiceHeader = styled.header`
  padding: ${designTokens.spacing.lg} ${designTokens.spacing.xl};
  border-bottom: 1px solid ${designTokens.colors.border.default};
  background: rgba(15, 23, 42, 0.5);
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.md};
`;

export const VoiceHeaderTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${designTokens.spacing.md};
`;

export const VoiceTitle = styled.h1`
  font-family: 'Cinzel', serif;
  font-size: ${designTokens.typography.fontSize['3xl']};
  letter-spacing: 0.04em;
  color: #c084fc;
  margin: 0;
  background: linear-gradient(135deg, #c084fc 0%, #60a5fa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const VoiceSubtitle = styled.p`
  margin: 0;
  max-width: 720px;
  color: rgba(226, 232, 240, 0.82);
  font-size: ${designTokens.typography.fontSize.base};
  line-height: ${designTokens.typography.lineHeight.relaxed};
`;

export const VoiceContent = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.lg};
  padding: ${designTokens.spacing.lg} ${designTokens.spacing.xl};
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  flex: 1;
  min-height: 0; /* Allow flex item to shrink */
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%);
  border: 1px solid rgba(148, 163, 184, 0.15);
  border-radius: 16px;
  overflow: hidden;
  flex: 1; /* Take up all available height */
  min-height: 0; /* Allow flex item to shrink */
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.3),
    0 2px 4px -1px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 0 rgba(148, 163, 184, 0.05);
`;

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${designTokens.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${designTokens.spacing.md};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.3);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.3);
    border-radius: 4px;
    
    &:hover {
      background: rgba(148, 163, 184, 0.5);
    }
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: ${designTokens.spacing.xl};
`;

export const EmptyIcon = styled.div`
  font-size: 5rem;
  opacity: 0.25;
  margin-bottom: ${designTokens.spacing.lg};
`;

export const EmptyTitle = styled.h3`
  font-family: 'Cinzel', serif;
  font-size: ${designTokens.typography.fontSize.xl};
  color: rgba(226, 232, 240, 0.9);
  margin: 0 0 ${designTokens.spacing.sm} 0;
  letter-spacing: 0.03em;
`;

export const EmptyDescription = styled.p`
  max-width: 480px;
  color: rgba(148, 163, 184, 0.75);
  font-size: ${designTokens.typography.fontSize.sm};
  line-height: ${designTokens.typography.lineHeight.relaxed};
  margin: 0;
`;

export const MessageBubbleWrapper = styled.div<{ $isUser: boolean }>`
  display: flex;
  justify-content: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
  animation: fadeInUp 0.3s ease-out;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const MessageBubble = styled.div<{ $isUser: boolean }>`
  max-width: ${props => props.$isUser ? 'fit-content' : '70%'};
  padding: ${designTokens.spacing.md} ${designTokens.spacing.lg};
  border-radius: ${props => props.$isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px'};
  background: ${props => props.$isUser 
    ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
    : 'linear-gradient(135deg, rgba(51, 65, 85, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)'
  };
  border: 1px solid ${props => props.$isUser 
    ? 'rgba(59, 130, 246, 0.3)'
    : 'rgba(148, 163, 184, 0.15)'
  };
  box-shadow: ${props => props.$isUser
    ? '0 4px 12px rgba(59, 130, 246, 0.2)'
    : '0 2px 8px rgba(0, 0, 0, 0.2)'
  };
`;

export const MessageContent = styled.p`
  margin: 0;
  color: rgba(226, 232, 240, 0.95);
  font-size: ${designTokens.typography.fontSize.sm};
  line-height: ${designTokens.typography.lineHeight.relaxed};
  white-space: pre-wrap;
  word-wrap: break-word;
  
  /* Enhanced formatting for structured AI responses */
  
  /* Bold text (markdown-style **text**) */
  strong {
    color: rgba(251, 191, 36, 0.95);
    font-weight: ${designTokens.typography.fontWeight.semibold};
  }
  
  /* Numbered lists - enhance spacing */
  & > *:not(:last-child) {
    margin-bottom: 0.75rem;
  }
  
  /* Highlight key metrics and numbers */
  code {
    background: rgba(59, 130, 246, 0.15);
    color: rgba(96, 165, 250, 0.95);
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-family: 'Monaco', 'Courier New', monospace;
    font-size: 0.875em;
  }
  
  /* Section headers (lines starting with **) */
  strong:first-child {
    display: inline-block;
    margin-bottom: 0.25rem;
    color: rgba(251, 191, 36, 1);
  }
  
  /* Better paragraph spacing */
  p {
    margin: 0.5rem 0;
    
    &:first-child {
      margin-top: 0;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  /* Lists */
  ul, ol {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
    
    li {
      margin: 0.375rem 0;
      line-height: 1.6;
    }
  }
  
  /* Emphasis */
  em {
    color: rgba(192, 132, 252, 0.95);
    font-style: italic;
  }
  
  /* Links (if any) */
  a {
    color: rgba(96, 165, 250, 0.95);
    text-decoration: underline;
    
    &:hover {
      color: rgba(59, 130, 246, 1);
    }
  }
`;

export const MessageTimestamp = styled.span<{ $isUser: boolean }>`
  display: block;
  margin-top: ${designTokens.spacing.xs};
  font-size: ${designTokens.typography.fontSize.xs};
  color: rgba(148, 163, 184, 0.75);
  text-align: ${props => props.$isUser ? 'right' : 'left'};
`;

export const InputContainer = styled.div`
  padding: ${designTokens.spacing.lg};
  border-top: 1px solid rgba(148, 163, 184, 0.15);
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(8px);
`;

export const InputWrapper = styled.div`
  display: flex;
  gap: ${designTokens.spacing.md};
  align-items: flex-end;
`;

export const InputField = styled.textarea`
  flex: 1;
  min-height: 48px;
  max-height: 120px;
  padding: ${designTokens.spacing.md} ${designTokens.spacing.lg};
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 12px;
  color: rgba(226, 232, 240, 0.95);
  font-size: ${designTokens.typography.fontSize.sm};
  font-family: inherit;
  resize: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: rgba(148, 163, 184, 0.65);
  }

  &:focus {
    outline: none;
    border-color: rgba(96, 165, 250, 0.5);
    background: rgba(30, 41, 59, 0.8);
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const SendButton = styled.button`
  height: 48px;
  width: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TypingIndicatorWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const TypingBubble = styled.div`
  padding: ${designTokens.spacing.md} ${designTokens.spacing.lg};
  border-radius: 16px 16px 16px 4px;
  background: linear-gradient(135deg, rgba(51, 65, 85, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%);
  border: 1px solid rgba(148, 163, 184, 0.15);
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const TypingDot = styled.div<{ $delay: number }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(148, 163, 184, 0.6);
  animation: bounce 0.6s infinite;
  animation-delay: ${props => props.$delay}s;

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-8px);
    }
  }
`;

export const PlaceholderState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: ${designTokens.spacing.xl};
`;

export const PlaceholderText = styled.p`
  color: #fcd34d;
  font-size: ${designTokens.typography.fontSize.lg};
  max-width: 600px;
  line-height: ${designTokens.typography.lineHeight.relaxed};
`;

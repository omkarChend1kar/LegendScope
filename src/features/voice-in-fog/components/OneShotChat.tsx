import React, { useState, useCallback, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { voiceInFogService } from '../services/voiceInFogService';
import { getConversationStarters } from '../services/contextService';
import { FormattedMessage } from './FormattedMessage';
import type { Message } from '../types/Message';
import type { FeatureContext } from '../types/FeatureContext';
import {
  MessageBubbleWrapper,
  MessageBubble,
  MessageContent,
  MessageTimestamp,
  TypingIndicatorWrapper,
  TypingBubble,
  TypingDot,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
} from '../presentation/styles/VoiceInFog.styles';
import {
  SplitScreenOverlay,
  SplitScreenBackdrop,
  SplitChatHeader,
  SplitChatTitle,
  CloseButton,
  StartersSection,
  StartersTitle,
  StartersGrid,
  StarterCard,
  StarterTitle,
  StarterDescription,
  SplitMessagesContainer,
} from './SplitScreenChat.styles';

interface OneShotChatProps {
  isOpen: boolean;
  onClose: () => void;
  playerPuuid: string | null;
  featureContext: FeatureContext;
}

export const OneShotChat: React.FC<OneShotChatProps> = ({
  isOpen,
  onClose,
  playerPuuid,
  featureContext,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const starters = getConversationStarters(featureContext);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    // Reset chat when feature context changes
    setMessages([]);
  }, [featureContext]);

  const handleStarterClick = useCallback(
    async (prompt: string, title: string) => {
      if (!playerPuuid || isLoading) {
        return;
      }

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: title,
        timestamp: new Date().toISOString(),
      };

      setMessages([userMessage]); // Replace previous conversation
      setIsLoading(true);

      try {
        console.log('🔵 Sending starter topic:', {
          puuid: playerPuuid,
          featureContext: featureContext,
          starterTopic: prompt,
        });

        // Use the starter topic API endpoint
        const response = await voiceInFogService.sendStarterTopic({
          puuid: playerPuuid,
          featureContext: featureContext,
          starterTopic: prompt, // This is the exact topic name expected by API
        });

        console.log('✅ Received response:', response);

        const responseText = response.response || response.reply || response.insight || '';
        
        if (!responseText || responseText.trim() === '') {
          throw new Error('Received empty response from Voice in the Fog');
        }

        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: responseText,
          timestamp: response.timestamp || new Date().toISOString(),
        };

        setMessages([userMessage, assistantMessage]);
      } catch (error) {
        console.error('❌ Error in handleStarterClick:', error);
        
        const errorMessage: Message = {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content:
            error instanceof Error
              ? error.message
              : 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date().toISOString(),
        };

        setMessages([userMessage, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [playerPuuid, isLoading, featureContext]
  );

  const formatTimestamp = (timestamp: string): string => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  return (
    <>
      <SplitScreenBackdrop $isOpen={isOpen} onClick={onClose} />
      <SplitScreenOverlay $isOpen={isOpen}>
        <SplitChatHeader>
          <SplitChatTitle>Voice in the Fog</SplitChatTitle>
          <CloseButton onClick={onClose} aria-label="Close chat">
            <X size={20} />
          </CloseButton>
        </SplitChatHeader>

        {/* Always show starters at the top */}
        <StartersSection>
          <StartersTitle>
            {messages.length === 0 ? 'Choose a topic to explore' : 'Ask another question'}
          </StartersTitle>
          <StartersGrid>
            {starters.map((starter) => (
              <StarterCard
                key={starter.id}
                onClick={() => handleStarterClick(starter.prompt, starter.title)}
                disabled={!playerPuuid || isLoading}
              >
                <StarterTitle>{starter.title}</StarterTitle>
                <StarterDescription>{starter.description}</StarterDescription>
              </StarterCard>
            ))}
          </StartersGrid>
        </StartersSection>

        {/* Messages area */}
        <SplitMessagesContainer>
          {messages.length === 0 ? (
            <EmptyState>
              <EmptyIcon>💬</EmptyIcon>
              <EmptyTitle>Select a Topic</EmptyTitle>
              <EmptyDescription>
                Choose a topic above to get AI insights about your performance.
              </EmptyDescription>
            </EmptyState>
          ) : (
            <>
              {messages.map((message) => (
                <MessageBubbleWrapper key={message.id} $isUser={message.role === 'user'}>
                  <div>
                    <MessageBubble $isUser={message.role === 'user'}>
                      {message.role === 'assistant' ? (
                        <FormattedMessage content={message.content} />
                      ) : (
                        <MessageContent>{message.content}</MessageContent>
                      )}
                    </MessageBubble>
                    <MessageTimestamp $isUser={message.role === 'user'}>
                      {formatTimestamp(message.timestamp)}
                    </MessageTimestamp>
                  </div>
                </MessageBubbleWrapper>
              ))}
              {isLoading && (
                <TypingIndicatorWrapper>
                  <TypingBubble>
                    <TypingDot $delay={0} />
                    <TypingDot $delay={0.15} />
                    <TypingDot $delay={0.3} />
                  </TypingBubble>
                </TypingIndicatorWrapper>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </SplitMessagesContainer>
      </SplitScreenOverlay>
    </>
  );
};

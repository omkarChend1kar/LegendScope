import React, { useState, useCallback, useRef, useEffect, type KeyboardEvent } from 'react';
import { X, Send } from 'lucide-react';
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
  InputWrapper,
  InputField,
  SendButton,
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
  SplitInputContainer,
} from './SplitScreenChat.styles';

interface SplitScreenChatProps {
  isOpen: boolean;
  onClose: () => void;
  playerPuuid: string | null;
  featureContext: FeatureContext;
}

export const SplitScreenChat: React.FC<SplitScreenChatProps> = ({
  isOpen,
  onClose,
  playerPuuid,
  featureContext,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showStarters, setShowStarters] = useState(true);
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
    setShowStarters(true);
  }, [featureContext]);

  const handleSendMessage = useCallback(
    async (messageText: string) => {
      if (!messageText.trim() || !playerPuuid || isLoading) {
        return;
      }

      setShowStarters(false);

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: messageText.trim(),
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        const response = await voiceInFogService.sendMessage({
          puuid: playerPuuid,
          message: messageText.trim(),
        });

        const responseText = response.response || response.reply || response.insight || '';

        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: responseText,
          timestamp: response.timestamp || new Date().toISOString(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        const errorMessage: Message = {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content:
            error instanceof Error
              ? error.message
              : 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [playerPuuid, isLoading]
  );

  const handleStarterClick = (prompt: string) => {
    void handleSendMessage(prompt);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSendMessage(input);
    }
  };

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

        {showStarters && messages.length === 0 && (
          <StartersSection>
            <StartersTitle>Choose a topic to discuss</StartersTitle>
            <StartersGrid>
              {starters.map((starter) => (
                <StarterCard
                  key={starter.id}
                  onClick={() => handleStarterClick(starter.prompt)}
                  disabled={!playerPuuid}
                >
                  <StarterTitle>{starter.title}</StarterTitle>
                  <StarterDescription>{starter.description}</StarterDescription>
                </StarterCard>
              ))}
            </StartersGrid>
          </StartersSection>
        )}

        <SplitMessagesContainer>
          {messages.length === 0 && !showStarters ? (
            <EmptyState>
              <EmptyIcon>💬</EmptyIcon>
              <EmptyTitle>Start a Conversation</EmptyTitle>
              <EmptyDescription>
                Ask me anything about your performance in this section.
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

        <SplitInputContainer>
          <InputWrapper>
            <InputField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask your Voice anything..."
              disabled={isLoading || !playerPuuid}
              rows={1}
            />
            <SendButton
              onClick={() => void handleSendMessage(input)}
              disabled={isLoading || !input.trim() || !playerPuuid}
              aria-label="Send message"
            >
              <Send size={20} />
            </SendButton>
          </InputWrapper>
        </SplitInputContainer>
      </SplitScreenOverlay>
    </>
  );
};

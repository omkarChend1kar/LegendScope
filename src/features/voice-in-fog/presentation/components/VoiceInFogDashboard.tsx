import React, { useState, useCallback, useRef, useEffect, type KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { voiceInFogService } from '../../services/voiceInFogService';
import { FormattedMessage } from '../../components/FormattedMessage';
import type { Message } from '../../types/Message';
import {
  VoiceLayout,
  VoiceHeader,
  VoiceHeaderTop,
  VoiceTitle,
  VoiceSubtitle,
  VoiceContent,
  ChatContainer,
  MessagesContainer,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyDescription,
  MessageBubbleWrapper,
  MessageBubble,
  MessageContent,
  MessageTimestamp,
  InputContainer,
  InputWrapper,
  InputField,
  SendButton,
  TypingIndicatorWrapper,
  TypingBubble,
  TypingDot,
  PlaceholderState,
  PlaceholderText,
} from '../styles/VoiceInFog.styles';

interface VoiceInFogDashboardProps {
  playerPuuid: string | null;
}

export const VoiceInFogDashboard: React.FC<VoiceInFogDashboardProps> = ({ playerPuuid }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() || !playerPuuid || isLoading) {
      return;
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history from existing messages
      const conversationHistory = messages.map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      }));

      // Use general chat API with conversation history
      const response = await voiceInFogService.sendGeneralChat({
        message: input.trim(),
        conversation_history: conversationHistory,
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
  }, [input, playerPuuid, isLoading, messages]);

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSendMessage();
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

  if (!playerPuuid) {
    return (
      <VoiceLayout>
        <VoiceHeader>
          <VoiceHeaderTop>
            <div>
              <VoiceTitle>Voice in the Fog</VoiceTitle>
              <VoiceSubtitle>
                Your AI companion in the Rift — ready to analyze, advise, and inspire.
              </VoiceSubtitle>
            </div>
          </VoiceHeaderTop>
        </VoiceHeader>
        <PlaceholderState>
          <PlaceholderText>
            Link your Summoner profile to start conversing with your Voice in the Fog.
          </PlaceholderText>
        </PlaceholderState>
      </VoiceLayout>
    );
  }

  return (
    <VoiceLayout>
      <VoiceHeader>
        <VoiceHeaderTop>
          <div>
            <VoiceTitle>Voice in the Fog</VoiceTitle>
            <VoiceSubtitle>
              Ask questions about your performance, get strategic insights, or discuss your journey
              through the Rift. Your AI companion is here to guide you.
            </VoiceSubtitle>
          </div>
        </VoiceHeaderTop>
      </VoiceHeader>

      <VoiceContent>
        <ChatContainer>
          <MessagesContainer>
            {messages.length === 0 ? (
              <EmptyState>
                <EmptyIcon>💬</EmptyIcon>
                <EmptyTitle>Welcome, Summoner</EmptyTitle>
                <EmptyDescription>
                  I'm your Voice in the Fog — an AI companion trained on League of Legends analytics.
                  Ask me about your performance, strategies, champion matchups, or anything else about
                  your journey in the Rift.
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
          </MessagesContainer>

          <InputContainer>
            <InputWrapper>
              <InputField
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask your Voice anything about your performance..."
                disabled={isLoading}
                rows={1}
              />
              <SendButton
                onClick={() => void handleSendMessage()}
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
              >
                <Send size={20} />
              </SendButton>
            </InputWrapper>
          </InputContainer>
        </ChatContainer>
      </VoiceContent>
    </VoiceLayout>
  );
};

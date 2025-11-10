import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { InputBar } from './InputBar';
import { voiceInFogService } from '../services/voiceInFogService';
import type { Message } from '../types/Message';

interface VoiceInFogChatProps {
  isOpen: boolean;
  onClose: () => void;
  playerPuuid: string | null;
}

export const VoiceInFogChat: React.FC<VoiceInFogChatProps> = ({
  isOpen,
  onClose,
  playerPuuid,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = useCallback(
    async (content: string) => {
      if (!playerPuuid) {
        return;
      }

      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const response = await voiceInFogService.sendMessage({
          puuid: playerPuuid,
          message: content,
        });

        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: response.response ?? 'No response received.',
          timestamp: response.timestamp ?? new Date().toISOString(),
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
    [playerPuuid]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Chat Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full flex-col border-l border-slate-800 bg-gradient-to-br from-[#0d0d0f] to-[#151820] shadow-2xl sm:w-[480px]"
          >
            <ChatHeader onClose={onClose} isThinking={isLoading} />
            <MessageList messages={messages} isLoading={isLoading} />
            <InputBar onSendMessage={handleSendMessage} disabled={isLoading || !playerPuuid} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

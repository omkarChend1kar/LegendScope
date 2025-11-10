import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
  isThinking?: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ onClose, isThinking = false }) => {
  return (
    <div className="sticky top-0 z-10 border-b border-slate-800 bg-gradient-to-b from-[#0d0d0f] to-[#151820] px-6 py-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-slate-100">
              Voice in the Fog
            </h2>
            {isThinking && (
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-purple-400"
              />
            )}
          </div>
          <p className="mt-1 text-sm text-slate-400">
            Your AI companion in the Rift
          </p>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
          aria-label="Close chat"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

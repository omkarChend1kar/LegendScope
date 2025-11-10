import React, { useState, type KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

interface InputBarProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const InputBar: React.FC<InputBarProps> = ({ onSendMessage, disabled = false }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="sticky bottom-0 border-t border-slate-800 bg-gradient-to-t from-[#0d0d0f] to-[#151820] px-6 py-4">
      <div className="flex items-end gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask your Voice anything about your performance..."
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          style={{ maxHeight: '120px', minHeight: '48px' }}
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-900/30 transition-all hover:from-blue-500 hover:to-blue-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:from-blue-600 disabled:hover:to-blue-700"
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </motion.button>
      </div>
    </div>
  );
};

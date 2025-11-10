import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface ChatTriggerButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const ChatTriggerButton: React.FC<ChatTriggerButtonProps> = ({
  onClick,
  disabled = false,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className="group fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-700 shadow-lg shadow-purple-900/40 transition-all hover:shadow-xl hover:shadow-purple-900/60 disabled:cursor-not-allowed disabled:opacity-50"
      aria-label="Open Voice in the Fog chat"
      title="Talk to your Voice in the Fog"
    >
      <motion.div
        animate={{
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 blur-xl"
      />
      <MessageCircle className="relative h-6 w-6 text-white" />
    </motion.button>
  );
};

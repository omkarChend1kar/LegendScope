import React from 'react';
import { motion } from 'framer-motion';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[85%]">
        <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 px-4 py-3 shadow-lg shadow-black/30">
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
                className="h-2 w-2 rounded-full bg-slate-500"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

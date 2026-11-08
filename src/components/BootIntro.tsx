/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BootIntroProps {
  onComplete: () => void;
}

export const BootIntro: React.FC<BootIntroProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Check if user already saw the boot intro in this session
    const seen = sessionStorage.getItem('af_boot_seen');
    if (seen === 'true') {
      setVisible(false);
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      handleFinish();
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleFinish = () => {
    sessionStorage.setItem('af_boot_seen', 'true');
    setVisible(false);
    onComplete();
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.04 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white"
        role="dialog"
        aria-label="Welcome screen"
      >
        {/* Android-inspired pulsing boot rings */}
        <div className="relative flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [0.6, 1.2, 1], opacity: [0, 0.9, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute h-36 w-36 rounded-full border border-teal-500/40"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.4, 1.1], opacity: [0, 0.6, 0.2] }}
            transition={{ duration: 1.4, delay: 0.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute h-48 w-48 rounded-full border border-teal-400/20"
          />

          {/* Central Android Core Symbol */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-900 border border-teal-500/30 shadow-2xl shadow-teal-500/20"
          >
            {/* Minimalist Android Antenna Head */}
            <svg
              className="h-10 w-10 text-teal-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="4" x2="8" y2="8" />
              <line x1="19" y1="4" x2="16" y2="8" />
              <path d="M4 14a8 8 0 0 1 16 0" />
              <circle cx="9" cy="11" r="1" fill="currentColor" />
              <circle cx="15" cy="11" r="1" fill="currentColor" />
            </svg>
          </motion.div>
        </div>

        {/* Boot typography */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="font-display text-lg font-semibold tracking-wider text-slate-100">
            ALESSANDRO FINOCCHIARO
          </div>
          <div className="mt-1 font-mono text-xs text-teal-400/80 tracking-widest uppercase">
            Android Runtime Initialized
          </div>
        </motion.div>

        {/* Skip button */}
        <button
          onClick={handleFinish}
          className="absolute bottom-8 text-xs font-mono text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
        >
          Press to Skip ↵
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

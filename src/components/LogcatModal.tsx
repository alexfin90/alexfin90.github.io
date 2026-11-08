/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, X, Copy, Check, Trash2 } from 'lucide-react';

interface LogcatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LogEntry {
  time: string;
  pid: string;
  level: 'V' | 'D' | 'I' | 'W' | 'E';
  tag: string;
  message: string;
}

export const LogcatModal: React.FC<LogcatModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [filterLevel, setFilterLevel] = useState<'ALL' | 'D' | 'I' | 'W'>('ALL');

  const initialLogs: LogEntry[] = [
    { time: '10:24:00.104', pid: '2048-2048', level: 'I', tag: 'System.out', message: '=== Android Runtime: Alessandro Finocchiaro Portfolio ===' },
    { time: '10:24:00.120', pid: '2048-2052', level: 'D', tag: 'Architecture', message: 'Clean Architecture initialized: Domain, Data, Presentation layers separated.' },
    { time: '10:24:00.142', pid: '2048-2052', level: 'I', tag: 'CareerMetrics', message: 'scale_users: 100M+ active users | MAU_owned: 20M+ | years_exp: 10+' },
    { time: '10:24:00.180', pid: '2048-2060', level: 'D', tag: 'JetpackCompose', message: 'Atomic design system instantiated across Cardio & Strength platforms.' },
    { time: '10:24:00.210', pid: '2048-2060', level: 'I', tag: 'TechnogymOS', message: 'Real-time sensor biodata pipeline active: StateFlow & Coroutines processing @ 60Hz.' },
    { time: '10:24:00.250', pid: '2048-2070', level: 'I', tag: 'TIM_MyTIM', message: 'Internalization complete: reduced critical bugs by ~30%, 99.5% uptime SLA achieved.' },
    { time: '10:24:00.290', pid: '2048-2070', level: 'I', tag: 'TIM_Pay', message: 'PSD2 SCA biometric authentication & dynamic transaction linking passed zero-defect audit.' },
    { time: '10:24:00.320', pid: '2048-2080', level: 'D', tag: 'Lamborghini', message: 'Vehicle telemetry companion service connected to high-performance platform.' },
    { time: '10:24:00.360', pid: '2048-2080', level: 'I', tag: 'AgileLeadership', message: 'CSM® & CSPO® verified. Sprint cycle acceleration +25% with AI tooling.' },
    { time: '10:24:00.410', pid: '2048-2090', level: 'W', tag: 'Philosophy', message: 'Reminder: Adopt new technology only when it genuinely elevates the product.' },
    { time: '10:24:00.450', pid: '2048-2090', level: 'I', tag: 'AboutMe', message: 'Coding since age 6. Calm under pressure. Cares about people, code, and quality.' },
    { time: '10:24:00.490', pid: '2048-2090', level: 'I', tag: 'Status', message: 'Available for technical discussions: alexfinocchiaro90@gmail.com' },
  ];

  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);

  const filteredLogs = logs.filter((l) => {
    if (filterLevel === 'ALL') return true;
    return l.level === filterLevel;
  });

  const handleCopy = () => {
    const text = logs.map((l) => `${l.time} ${l.pid} ${l.level}/${l.tag}: ${l.message}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="logcat-title"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh] font-mono text-xs"
        >
          {/* Top Bar styled like Android Studio IDE tab */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-slate-300">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-teal-400" />
              <span id="logcat-title" className="font-semibold text-slate-100">
                Logcat — com.alexfinocchiaro.portfolio (Pixel 9 Pro · API 35)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Copy Logcat Output"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setLogs([])}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Clear Logcat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-3 px-4 py-2 bg-slate-900/50 border-b border-slate-800 text-[11px] text-slate-400">
            <span className="font-semibold text-slate-300">Filter Level:</span>
            {(['ALL', 'D', 'I', 'W'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilterLevel(lvl)}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  filterLevel === lvl ? 'bg-teal-500/20 text-teal-300 font-bold' : 'hover:text-slate-200'
                }`}
              >
                {lvl === 'ALL' ? 'All (Verbose)' : lvl === 'D' ? 'Debug' : lvl === 'I' ? 'Info' : 'Warn'}
              </button>
            ))}
          </div>

          {/* Console Log Rows */}
          <div className="flex-1 overflow-y-auto p-4 space-y-1.5 bg-black/80 text-slate-300 select-text">
            {filteredLogs.length === 0 ? (
              <div className="text-slate-500 py-8 text-center">Log stream cleared.</div>
            ) : (
              filteredLogs.map((log, i) => {
                const levelColor =
                  log.level === 'I'
                    ? 'text-emerald-400'
                    : log.level === 'D'
                    ? 'text-sky-400'
                    : log.level === 'W'
                    ? 'text-amber-400'
                    : 'text-rose-400';

                return (
                  <div key={i} className="flex items-start gap-2 leading-relaxed hover:bg-slate-900/40 px-1 rounded">
                    <span className="text-slate-500 shrink-0">{log.time}</span>
                    <span className="text-slate-600 shrink-0 hidden sm:inline">{log.pid}</span>
                    <span className={`font-bold shrink-0 ${levelColor}`}>{log.level}/{log.tag}:</span>
                    <span className="text-slate-200 break-words flex-1">{log.message}</span>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer status bar */}
          <div className="px-4 py-1.5 bg-slate-900 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between">
            <span>Buffer: main (100% capacity)</span>
            <span>Alessandro Finocchiaro Tech Lead Runtime</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

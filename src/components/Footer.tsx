/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Terminal, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenLogcat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLogcat }) => {
  const { personalInfo } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Column: Brand & Architecture note */}
          <div className="text-center md:text-left">
            <div className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
              <span className="h-2 w-2 rounded-full bg-teal-500" aria-hidden="true" />
              <span>{personalInfo.name}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {personalInfo.title} · Scaled to 100M+ users
            </p>
          </div>

          {/* Center Column: Social Links & Easter Egg Logcat Trigger */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenLogcat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-teal-600 dark:text-teal-400 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 rounded-lg transition-colors cursor-pointer"
              title="Open Android Studio Logcat"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Logcat</span>
            </button>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="GitHub profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Right Column: Scroll to top */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Clean Architecture Notice */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>Material 3 Expressive Architecture</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[11px] text-teal-600 dark:text-teal-400">
              Clean Architecture Decoupled
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

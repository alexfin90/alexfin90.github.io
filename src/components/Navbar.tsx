/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Search, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Experience', href: '#experience' },
    { label: 'Case studies', href: '#case-studies' },
    { label: 'Skills', href: '#skills' },
    // wideOnly: hidden in the desktop bar below xl, where it would crowd the row
    { label: 'Beyond mobile', href: '#beyond', wideOnly: true },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/85 dark:bg-slate-950/85 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#"
          className="font-display text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-2"
        >
          <span className="h-2 w-2 rounded-full bg-teal-500" aria-hidden="true" />
          <span>Alessandro Finocchiaro</span>
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`${'wideOnly' in link ? 'hidden xl:inline' : ''} hover:text-teal-600 dark:hover:text-teal-400 transition-colors whitespace-nowrap shrink-0 py-1`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Command palette hint, theme toggle, and primary CTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg transition-colors cursor-pointer"
            title="Command Palette (Cmd+K / Ctrl+K)"
            aria-label="Open Command Palette"
          >
            <Search className="w-3.5 h-3.5" />
            <kbd className="hidden sm:inline-block font-sans text-[10px] text-slate-400 dark:text-slate-500">⌘K</kbd>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Primary Action Button */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 dark:bg-teal-500 dark:hover:bg-teal-400 dark:text-slate-950 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
          >
            Contact me
          </a>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-teal-600 dark:hover:text-teal-400 rounded-md"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-4 py-2 text-xs font-semibold text-white bg-teal-600 dark:bg-teal-500 dark:text-slate-950 rounded-lg shadow-sm"
            >
              Contact me
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

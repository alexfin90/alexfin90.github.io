/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { BootIntro } from './components/BootIntro';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SelectedWorkSection } from './components/SelectedWorkSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { SkillsSection } from './components/SkillsSection';
import { OpenSourceSection } from './components/OpenSourceSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { LogcatModal } from './components/LogcatModal';

export default function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isLogcatOpen, setIsLogcatOpen] = useState(false);
  const [highlightedSkillId, setHighlightedSkillId] = useState<string | null>(null);

  return (
    <ThemeProvider>
      {/* Skippable Android Boot Sequence */}
      <BootIntro onComplete={() => setBootComplete(true)} />

      <div className={`min-h-screen flex flex-col transition-opacity duration-500 ${bootComplete ? 'opacity-100' : 'opacity-90'}`}>
        {/* Sticky Glass Navbar */}
        <Navbar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Intro & Hero */}
          <HeroSection />

          {/* 2. About Me (Personal Narrative & Profile Story) */}
          <AboutSection />

          {/* 3. Selected Work (Scroll-Driven Phone Storytelling & Modals) */}
          <SelectedWorkSection highlightedSkillId={highlightedSkillId} />

          {/* 4. Experience Timeline */}
          <ExperienceTimeline />

          {/* 5. Skills & Technology Matrix */}
          <SkillsSection
            highlightedSkillId={highlightedSkillId}
            onSelectSkill={(skill) => setHighlightedSkillId(skill)}
          />

          {/* 6. Open Source Repositories */}
          <OpenSourceSection />

          {/* 7. Certifications & Education */}
          <CertificationsSection />

          {/* 8. Contact Form & Direct Channels */}
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer onOpenLogcat={() => setIsLogcatOpen(true)} />

        {/* Interactive Overlays */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onOpenLogcat={() => setIsLogcatOpen(true)}
        />

        <LogcatModal
          isOpen={isLogcatOpen}
          onClose={() => setIsLogcatOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
}

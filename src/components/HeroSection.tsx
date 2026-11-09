/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { portfolioData } from '../data/portfolioData';
import { DeviceShowcase } from './DeviceShowcase';
import { ArrowDown, Send, Github, Linkedin, Monitor, Smartphone } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { personalInfo, metrics, projects } = portfolioData;

  // Cycle through featured projects on hero device frame (incorporating console and phone)
  // First 4 projects, in the data file's order (most recent first)
  const heroScreenshots = projects.slice(0, 4).map((p) => ({
    image: p.screenshots[0] || '',
    name: p.name,
    company: p.company,
    deviceType: p.deviceType,
  }));

  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroScreenshots.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [heroScreenshots.length]);

  const activeHeroItem = heroScreenshots[currentHeroIndex];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 border-b border-slate-200/60 dark:border-slate-800/60">
      {/* Background soft ambient radial gradient */}
      <div
        className="pointer-events-none absolute -top-40 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-[120px] dark:bg-teal-500/15"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -left-40 -z-10 h-[400px] w-[400px] rounded-full bg-teal-600/5 blur-[100px] dark:bg-teal-600/10"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Split Grid: Left info & profile, Right interactive device showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Profile Avatar + Bio + CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Profile Avatar + Name Row */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6 mb-6">
              {/* Profile Photo with subtle animated ring in accent Deep Teal */}
              <div className="relative group shrink-0">
                {/* Animated pulsating ring */}
                <div
                  className="absolute -inset-1 rounded-full bg-gradient-to-tr from-teal-600 to-teal-400 opacity-75 blur-sm group-hover:opacity-100 transition-opacity animate-pulse duration-3000"
                  aria-hidden="true"
                />
                <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden p-1 bg-white dark:bg-slate-900 ring-2 ring-teal-500/80 shadow-xl">
                  <img
                    src={personalInfo.profilePhoto}
                    alt="Alessandro Finocchiaro"
                    className="h-full w-full object-cover object-top rounded-full transition-transform duration-500 group-hover:scale-105"
                    width={400}
                    height={400}
                    loading="eager"
                  />
                </div>
              </div>

              {/* Title & Name */}
              <div className="text-center sm:text-left">
                <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 tracking-wide uppercase">
                  Portfolio
                </span>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-0.5">
                  {personalInfo.name}
                </h1>
                <p className="font-display text-lg sm:text-xl font-medium text-slate-700 dark:text-slate-300 mt-1">
                  {personalInfo.title}
                </p>
                <p className="text-sm sm:text-base text-teal-700 dark:text-teal-300 mt-2 max-w-xl">
                  {personalInfo.tagline}
                </p>
              </div>
            </div>

            {/* One-line summary verbatim from CV */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl text-balance">
              {personalInfo.summary}
            </p>

            {/* CTAs and social links */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-500 dark:bg-teal-500 dark:hover:bg-teal-400 dark:text-slate-950 rounded-xl shadow-md shadow-teal-700/10 transition-all hover:-translate-y-0.5"
              >
                <span>See my work</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-all hover:-translate-y-0.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Contact me</span>
              </a>

              <div className="flex items-center gap-2 sm:ml-2">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors"
                  aria-label="GitHub profile"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-colors"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick tech chip summary */}
            <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300">Core Focus:</span>
              {personalInfo.coreFocus.map((item, i) => (
                <React.Fragment key={item}>
                  {i > 0 && <span aria-hidden="true">·</span>}
                  <span>{item}</span>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Right Column: Dynamic Device Showcase (Smoothly switches between Phone and Console) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full flex flex-col items-center">
              <DeviceShowcase
                deviceType={activeHeroItem.deviceType}
                currentImage={activeHeroItem.image}
                appName={activeHeroItem.name}
                appCompany={activeHeroItem.company}
                isHero={true}
              />

              {/* Navigation selector dots with device icons */}
              <div className="mt-4 flex items-center justify-center gap-3">
                {heroScreenshots.map((item, index) => {
                  const isSelected = index === currentHeroIndex;
                  const Icon = item.deviceType === 'console' ? Monitor : Smartphone;

                  return (
                    <button
                      key={item.name}
                      onClick={() => setCurrentHeroIndex(index)}
                      aria-label={`View ${item.name} (${item.deviceType})`}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-teal-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span className="hidden sm:inline font-medium text-[11px]">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 3 Key Stats Strip below the hero split */}
        <div className="mt-14 pt-10 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm"
            >
              <div className="font-display text-4xl sm:text-5xl font-extrabold text-teal-600 dark:text-teal-400 tracking-tight tabular-nums">
                {metric.value}
              </div>
              <div className="font-display font-semibold text-base text-slate-900 dark:text-white mt-1">
                {metric.label}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {metric.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

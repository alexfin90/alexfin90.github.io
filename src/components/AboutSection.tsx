/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { portfolioData } from '../data/portfolioData';
import { Heart, Terminal, Dumbbell, Compass } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { personalInfo } = portfolioData;

  const highlights = [
    { icon: Terminal, label: "Coding Since Age 6", desc: "Lifelong engineering passion" },
    { icon: Heart, label: "Calm Under Pressure", desc: "Resilient & team-first mindset" },
    { icon: Dumbbell, label: "Active Lifestyle", desc: "Gym, motorsport & travel" },
    { icon: Compass, label: "Pragmatic Architecture", desc: "Tech adoption that serves the user" },
  ];

  return (
    <section id="about" className="py-16 md:py-24 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section kicker & title */}
        <div className="mb-12">
          <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
            Profile &amp; Mindset
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            About me
          </h2>
        </div>

        {/* Responsive Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Photo Column (Stacked on mobile, side-by-side on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col items-center sm:items-start"
          >
            <div className="relative group w-full max-w-sm">
              {/* Subtle background glow */}
              <div
                className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-teal-500/20 to-teal-700/10 blur-xl group-hover:opacity-100 transition duration-700"
                aria-hidden="true"
              />

              {/* Profile Card Container */}
              <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-3">
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-950">
                  <img
                    src={personalInfo.profilePhoto}
                    alt="Alessandro Finocchiaro"
                    className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-102"
                    loading="lazy"
                    width={600}
                    height={800}
                  />
                  {/* Subtle lower gradient overlay for name card */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent text-white">
                    <p className="font-display font-bold text-lg text-white">
                      {personalInfo.name}
                    </p>
                    <p className="text-xs font-mono text-teal-300">
                      Senior Android Engineer &amp; Tech Lead
                    </p>
                  </div>
                </div>

                {/* Quick snapshot chips underneath */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 p-2">
                  <div>
                    <span className="block font-semibold text-slate-900 dark:text-slate-200">Education</span>
                    <span>MSc Comp. Engineering</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-900 dark:text-slate-200">Honors</span>
                    <span>110/110 cum laude</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Story Column: Exact 4 paragraphs from personalInfo.about */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 space-y-5"
          >
            {personalInfo.about.map((paragraph, index) => (
              <p
                key={index}
                className={`text-base sm:text-lg leading-relaxed ${
                  index === 0
                    ? 'font-medium text-slate-900 dark:text-slate-100'
                    : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {paragraph}
              </p>
            ))}

            {/* Quiet highlights grid */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-4">
              {highlights.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 shrink-0">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-900 dark:text-white">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {item.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

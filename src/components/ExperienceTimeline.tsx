/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { portfolioData, TimelineEntry } from '../data/portfolioData';
import { ChevronDown, ExternalLink, Briefcase, Calendar, MapPin } from 'lucide-react';

export const ExperienceTimeline: React.FC = () => {
  const { timeline } = portfolioData;
  const [expandedIndices, setExpandedIndices] = useState<number[]>([0, 1]); // Expand top 2 by default

  const toggleExpand = (index: number) => {
    setExpandedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="experience" className="py-16 md:py-24 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
            Career Trajectory · 10+ Years
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Experience Timeline
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Click any role to expand architectural decisions, team scaling milestones, and impact metrics.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-200 dark:border-slate-800 space-y-8">
          {timeline.map((entry: TimelineEntry, index: number) => {
            const isExpanded = expandedIndices.includes(index);

            return (
              <div key={entry.company} className="relative group">
                {/* Node circle on timeline line */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full border-2 transition-colors ${
                    isExpanded
                      ? 'bg-teal-500 border-teal-500 ring-4 ring-teal-500/20'
                      : 'bg-white dark:bg-slate-950 border-slate-400 dark:border-slate-600'
                  }`}
                  aria-hidden="true"
                />

                {/* Timeline Card */}
                <div className="rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/80 shadow-sm overflow-hidden transition-all">
                  {/* Card Header clickable */}
                  <div
                    onClick={() => toggleExpand(index)}
                    className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <div>
                      {/* Meta info: Period, Location */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-1">
                        <span className="flex items-center gap-1 font-mono">
                          <Calendar className="w-3 h-3 text-teal-500" />
                          {entry.period}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {entry.location}
                        </span>
                      </div>

                      {/* Company Name (with external link) */}
                      <div className="flex items-center gap-2">
                        <a
                          href={entry.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1.5"
                        >
                          <span>{entry.company}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                        </a>
                      </div>

                      {/* Role title */}
                      <div className="text-sm font-medium text-teal-700 dark:text-teal-300 mt-1">
                        {entry.role}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <button
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                        aria-label={isExpanded ? 'Collapse entry' : 'Expand entry'}
                      >
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-teal-500' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Summary row */}
                  <div className="px-5 sm:px-6 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    {entry.summary}
                  </div>

                  {/* Expandable Achievements Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 px-5 sm:px-6 py-5"
                      >
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-teal-500" />
                          <span>Key Impact &amp; Deliverables</span>
                        </h4>

                        <ul className="space-y-2 mb-4">
                          {entry.achievements.map((ach, idx) => (
                            <li
                              key={idx}
                              className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2"
                            >
                              <span className="h-1.5 w-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech Stack */}
                        <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex flex-wrap items-center gap-1.5">
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-1">
                            Stack:
                          </span>
                          {entry.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 text-[11px] font-mono rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

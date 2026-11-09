/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const CaseStudiesSection: React.FC = () => {
  const { caseStudies } = portfolioData;
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggle = (index: number) =>
    setOpenIndices((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));

  return (
    <section id="case-studies" className="py-16 md:py-24 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
            How I work
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Case studies
          </h2>
        </div>

        {/* items-start: opening one card doesn't stretch the others in its row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          {caseStudies.map((study, i) => {
            const isOpen = openIndices.includes(i);
            const panelId = `case-study-${i}`;
            const steps = [
              { label: 'Situation', text: study.situation },
              { label: 'Task', text: study.task },
              { label: 'Action', text: study.action },
            ];

            return (
              <motion.article
                key={study.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:border-teal-500/40 transition-colors flex flex-col"
              >
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">{study.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span className="font-semibold text-teal-700 dark:text-teal-400">{study.company}</span>
                  <span aria-hidden="true"> · </span>
                  <span className="font-mono">{study.period}</span>
                </p>

                <ul className="flex flex-wrap gap-1.5 mt-3" aria-label="Tags">
                  {study.tags.map((tag) => (
                    <li
                      key={tag}
                      className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/40"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-label={`${study.title}: full story`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <dl className="mt-4 space-y-3">
                        {steps.map((step) => (
                          <div key={step.label}>
                            <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                              {step.label}
                            </dt>
                            <dd className="text-sm text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">{step.text}</dd>
                          </div>
                        ))}
                      </dl>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Result is always visible */}
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">Result</p>
                  <p className="text-sm text-slate-700 dark:text-slate-200 mt-0.5 leading-relaxed">{study.result}</p>
                </div>

                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={isOpen ? panelId : undefined}
                  className="mt-4 self-start inline-flex items-center gap-1 text-xs font-semibold text-teal-700 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-300 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 cursor-pointer"
                >
                  {isOpen ? 'Hide the story' : 'Read the story'}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

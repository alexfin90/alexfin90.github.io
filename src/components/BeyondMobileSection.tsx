/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const BeyondMobileSection: React.FC = () => {
  const { beyondMobile, beyondMobileIntro } = portfolioData;

  return (
    <section id="beyond" className="py-16 md:py-24 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
            The bigger picture
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Beyond mobile
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl">{beyondMobileIntro}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {beyondMobile.map((item, i) => (
            <motion.a
              key={item.title}
              href={`#${item.targetId}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
              className="group p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:border-teal-500/40 hover:-translate-y-0.5 transition-all flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              <div>
                <h3 className="font-display font-bold text-base text-teal-700 dark:text-teal-400">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">{item.proof}</p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-slate-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                See where <ArrowRight className="w-3 h-3" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

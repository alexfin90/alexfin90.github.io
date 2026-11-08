/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Award, GraduationCap, ExternalLink, ShieldCheck } from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  const { certifications, education } = portfolioData;

  return (
    <section id="certifications" className="py-16 md:py-24 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Certifications */}
          <div className="lg:col-span-7">
            <div className="mb-8">
              <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
                Professional Credentials
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                Certifications
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Industry-recognized agile leadership, cloud engineering, and enterprise platform certifications.
              </p>
            </div>

            <div className="space-y-3.5">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm flex items-center justify-between gap-4 hover:border-teal-500/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-sm text-slate-900 dark:text-white">
                        {cert.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 bg-slate-100 dark:bg-slate-800 rounded-md transition-colors shrink-0"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Academic Degrees */}
          <div className="lg:col-span-5">
            <div className="mb-8">
              <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
                Academic Background
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                Education
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Rigorous computer engineering foundation with top honors.
              </p>
            </div>

            <div className="space-y-4">
              {education.map((edu) => (
                <div
                  key={edu.degree}
                  className="p-5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-mono text-teal-600 dark:text-teal-400 font-semibold">
                        {edu.period}
                      </span>
                      <h3 className="font-display font-bold text-base text-slate-900 dark:text-white mt-0.5">
                        {edu.degree}
                      </h3>
                      <a
                        href={edu.institutionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors inline-flex items-center gap-1 mt-0.5"
                      >
                        <span>{edu.institution}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </a>
                      <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Graduated: {edu.honors}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

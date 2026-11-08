/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Smartphone, Cpu, GitBranch, Users, Globe, Sparkles } from 'lucide-react';

interface SkillsSectionProps {
  highlightedSkillId: string | null;
  onSelectSkill: (skillName: string | null) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  highlightedSkillId,
  onSelectSkill,
}) => {
  const { skills, projects } = portfolioData;

  const categoryIcons: { [key: string]: React.ElementType } = {
    'Android & Mobile': Smartphone,
    'Architecture & Standards': Cpu,
    'DevOps, Release & Automation': GitBranch,
    'Leadership & Methodology': Users,
    'Cross-Platform & Cloud': Globe,
    'AI-Augmented Development': Sparkles,
  };

  return (
    <section id="skills" className="py-16 md:py-24 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
            Core Competencies &amp; Modern Tooling
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Skills &amp; Technology Matrix
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
            Hover or tap any skill to highlight which production apps in the portfolio used that technology.
          </p>
        </div>

        {/* Grouped Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((category) => {
            const IconComponent = categoryIcons[category.title] || Cpu;

            return (
              <div
                key={category.title}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skill Chips */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => {
                      const isSelected = highlightedSkillId === skill.name;
                      const hasProjects = skill.projectIds.length > 0;

                      return (
                        <button
                          key={skill.name}
                          onClick={() => onSelectSkill(isSelected ? null : skill.name)}
                          onMouseEnter={() => onSelectSkill(skill.name)}
                          onMouseLeave={() => onSelectSkill(null)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer text-left ${
                            isSelected
                              ? 'bg-teal-600 text-white shadow-md shadow-teal-700/20 scale-105'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700/60'
                          }`}
                        >
                          <span>{skill.name}</span>
                          {hasProjects && (
                            <span
                              className={`ml-1.5 text-[10px] font-mono ${
                                isSelected ? 'text-teal-200' : 'text-slate-400 dark:text-slate-500'
                              }`}
                            >
                              ({skill.projectIds.length})
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quiet hint if a skill is currently hovered */}
                {highlightedSkillId && (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 text-[11px] text-slate-500">
                    {(() => {
                      const matched = category.skills.find((s) => s.name === highlightedSkillId);
                      if (!matched) return null;
                      if (matched.projectIds.length === 0) return <span>Foundational expertise</span>;
                      const projectNames = matched.projectIds
                        .map((id) => projects.find((p) => p.id === id)?.name)
                        .filter(Boolean)
                        .join(', ');
                      return (
                        <span className="text-teal-600 dark:text-teal-400 font-medium">
                          Applied in: {projectNames}
                        </span>
                      );
                    })()}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

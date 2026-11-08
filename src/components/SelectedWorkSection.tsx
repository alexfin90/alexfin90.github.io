/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { portfolioData, Project } from '../data/portfolioData';
import { DeviceShowcase } from './DeviceShowcase';
import { ProjectDetailModal } from './ProjectDetailModal';
import { ExternalLink, Layers, ArrowUpRight, Smartphone, Monitor } from 'lucide-react';

interface SelectedWorkSectionProps {
  highlightedSkillId: string | null;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({ highlightedSkillId }) => {
  const { projects, projectCategories } = portfolioData;

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0].id);
  const [modalProject, setModalProject] = useState<Project | null>(null);

  // Filtered projects
  const filteredProjects = projects.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  // Track project visibility to update device frame in scroll-driven mode
  const projectItemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;

      for (const p of filteredProjects) {
        const el = projectItemRefs.current[p.id];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.45 && rect.bottom >= windowHeight * 0.2) {
            setActiveProjectId(p.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filteredProjects]);

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  return (
    <section id="work" className="py-16 md:py-24 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
              Selected Work · 6 Major Deliverables
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
              Production Applications
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
              Scroll through featured applications. The frame automatically morphs between native smartphone and embedded gym machine console.
            </p>
          </div>

          {/* Filter Segmented Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            {projectCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === category
                    ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Storytelling Grid: Desktop Split with Sticky Dynamic Device Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Project Cards List */}
          <div className="lg:col-span-7 space-y-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const isActive = project.id === activeProjectId;
                const isSkillHighlighted =
                  highlightedSkillId !== null &&
                  portfolioData.skills
                    .flatMap((s) => s.skills)
                    .find((sk) => sk.name === highlightedSkillId)
                    ?.projectIds.includes(project.id);

                return (
                  <motion.div
                    key={project.id}
                    ref={(el) => { projectItemRefs.current[project.id] = el; }}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    onMouseEnter={() => setActiveProjectId(project.id)}
                    className={`relative p-6 sm:p-7 rounded-2xl transition-all duration-300 border ${
                      isSkillHighlighted
                        ? 'ring-2 ring-teal-500 bg-teal-50/20 dark:bg-teal-950/20 border-teal-500/60'
                        : isActive
                        ? 'bg-white dark:bg-slate-900/90 border-teal-500/40 shadow-lg shadow-teal-950/5'
                        : 'bg-white/60 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {/* Unboxed Metadata Header (Zero-Pill Rule) */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-teal-600 dark:text-teal-400">{project.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.period}</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1 text-[11px] font-mono">
                          {project.deviceType === 'console' ? (
                            <>
                              <Monitor className="w-3 h-3 text-teal-500" />
                              <span>Console OS</span>
                            </>
                          ) : (
                            <>
                              <Smartphone className="w-3 h-3 text-slate-400" />
                              <span>Mobile</span>
                            </>
                          )}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
                        {project.clientContext}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                      {project.name}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {project.summary}
                    </p>

                    {/* 3-Line Story Box: Problem, What I Did, Result */}
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2 text-xs">
                      <div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Challenge: </span>
                        <span className="text-slate-600 dark:text-slate-400">{project.story.problem}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-teal-600 dark:text-teal-400">Execution: </span>
                        <span className="text-slate-600 dark:text-slate-400">{project.story.whatIDid}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">Result: </span>
                        <span className="text-slate-600 dark:text-slate-400">{project.story.result}</span>
                      </div>
                    </div>

                    {/* Tech Chips */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 5 && (
                        <span className="px-2 py-0.5 text-[11px] font-mono text-slate-400">
                          +{project.techStack.length - 5} more
                        </span>
                      )}
                    </div>

                    {/* Actions: View Details Modal & Public URL */}
                    <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                      <button
                        onClick={() => setModalProject(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-500 cursor-pointer"
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>View screenshots &amp; full details</span>
                      </button>

                      <a
                        href={project.publicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                      >
                        <span>Public app page</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Right Column: Sticky Morphing Device Showcase */}
          <div className="hidden lg:block lg:col-span-5 sticky top-24">
            <div className="p-4 rounded-3xl bg-slate-100/60 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 flex flex-col items-center">
              <DeviceShowcase
                deviceType={activeProject.deviceType}
                currentImage={activeProject.screenshots[0]}
                appName={activeProject.name}
                appCompany={activeProject.company}
              />
              <div className="mt-3 text-center">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Target: <strong className="text-slate-800 dark:text-slate-200">{activeProject.name}</strong> ({activeProject.deviceType === 'console' ? 'Embedded Console Display' : 'Android Smartphone'})
                </span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Frame morphs smoothly between smartphone and gym machine touchscreen
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </section>
  );
};

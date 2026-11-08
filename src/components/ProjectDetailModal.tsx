/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../data/portfolioData';
import { X, ExternalLink, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = project?.screenshots.length || 0;

  const nextSlide = useCallback(() => {
    if (totalSlides === 0) return;
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    if (totalSlides === 0) return;
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    if (!project) return;
    setCurrentSlide(0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose, nextSlide, prevSlide]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <div>
              <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                {project.category} · {project.period}
              </span>
              <h3 id="modal-project-title" className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {project.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {project.clientContext}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={project.publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-teal-500 transition-colors"
              >
                <span>Store / Web</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Screenshot Carousel (Touch & Drag enabled) */}
            {project.screenshots.length > 0 && (
              <div className="relative rounded-2xl bg-slate-950 p-4 sm:p-6 overflow-hidden border border-slate-800 flex flex-col items-center">
                <div className="relative h-72 sm:h-96 w-full flex items-center justify-center">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="h-full flex items-center justify-center"
                  >
                    <img
                      src={project.screenshots[currentSlide]}
                      alt={`${project.name} screenshot ${currentSlide + 1}`}
                      className="max-h-full max-w-full object-contain rounded-xl shadow-lg"
                      loading="eager"
                    />
                  </motion.div>

                  {/* Carousel Controls */}
                  {totalSlides > 1 && (
                    <>
                      <button
                        onClick={prevSlide}
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 backdrop-blur-sm transition-colors cursor-pointer"
                        aria-label="Previous screenshot"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 backdrop-blur-sm transition-colors cursor-pointer"
                        aria-label="Next screenshot"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails / Indicators */}
                {totalSlides > 1 && (
                  <div className="mt-4 flex items-center gap-2">
                    {project.screenshots.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          idx === currentSlide
                            ? 'w-6 bg-teal-400'
                            : 'w-2 bg-slate-600 hover:bg-slate-500'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Problem / What I Did / Result Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                  Challenge
                </span>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {project.story.problem}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider block mb-1">
                  What I Did
                </span>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {project.story.whatIDid}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                  Impact &amp; Result
                </span>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {project.story.result}
                </p>
              </div>
            </div>

            {/* Full CV Bullet Points */}
            <div>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                Key Technical Contributions
              </h4>
              <ul className="space-y-2.5">
                {project.bulletPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Chips */}
            <div>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

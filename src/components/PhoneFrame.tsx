/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Wifi, BatteryMedium, Signal, Smartphone, Image as ImageIcon } from 'lucide-react';

interface PhoneFrameProps {
  currentImage?: string;
  appName: string;
  appCompany?: string;
  isHero?: boolean;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  currentImage,
  appName,
  appCompany,
  isHero = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [currentImage]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 180 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const hasRealScreenshot = Boolean(currentImage && currentImage.trim() !== '');

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 flex items-center justify-center p-2 sm:p-4 select-none"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX: isReducedMotion ? 0 : rotateX,
          rotateY: isReducedMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-[270px] sm:w-[300px] h-[550px] sm:h-[600px] rounded-[48px] bg-slate-900 dark:bg-slate-950 p-3 shadow-2xl shadow-teal-950/20 dark:shadow-teal-900/10 border-4 border-slate-700/60 dark:border-slate-800 transition-shadow duration-300 ring-1 ring-white/10"
      >
        {/* Exterior side buttons */}
        <div className="absolute -left-[7px] top-28 h-12 w-1 rounded-l-md bg-slate-600 dark:bg-slate-700" />
        <div className="absolute -left-[7px] top-44 h-12 w-1 rounded-l-md bg-slate-600 dark:bg-slate-700" />
        <div className="absolute -right-[7px] top-32 h-16 w-1 rounded-r-md bg-slate-600 dark:bg-slate-700" />

        {/* Inner bezel */}
        <div className="relative h-full w-full rounded-[40px] overflow-hidden bg-black flex flex-col border border-slate-800/80">
          {/* Status bar */}
          <div className="relative z-30 flex items-center justify-between px-6 pt-3 text-[11px] font-mono text-white/90">
            <span>09:41</span>
            {/* Front Camera Punch-hole */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2 h-4 w-4 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center">
              <div className="h-1.5 w-1.5 rounded-full bg-slate-900 ring-1 ring-teal-500/30" />
            </div>
            <div className="flex items-center gap-1.5">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <BatteryMedium className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* App Screen Content Viewport */}
          <div className="relative flex-1 w-full overflow-hidden bg-slate-950">
            {/* Gloss reflection glare overlay */}
            <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.12] rounded-[36px]" />

            {/* Screen Image or Clean Placeholder */}
            {hasRealScreenshot ? (
              <motion.img
                key={currentImage}
                src={currentImage}
                alt={`${appName} preview screenshot`}
                onLoad={() => setImageLoaded(true)}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: imageLoaded ? 1 : 0, scale: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="absolute inset-0 h-full w-full object-cover object-top"
                loading={isHero ? 'eager' : 'lazy'}
              />
            ) : (
              /* Clean Placeholder inside phone frame */
              <div className="absolute inset-0 flex flex-col items-center justify-between p-6 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white select-none">
                {/* Simulated App Header Wireframe */}
                <div className="w-full pt-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                    <span className="font-display font-bold text-sm tracking-tight text-white">{appName}</span>
                    <span className="text-[10px] font-mono text-teal-400">v4.0</span>
                  </div>
                </div>

                {/* Central "Screenshot coming soon" badge & wireframe cards */}
                <div className="w-full flex flex-col items-center text-center my-auto space-y-4">
                  <div className="h-14 w-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                    <ImageIcon className="w-7 h-7" />
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-base text-slate-100">{appName}</h4>
                    <p className="text-xs font-mono text-teal-400 font-medium mt-1">Screenshot coming soon</p>
                    <p className="text-[11px] text-slate-400 mt-1 max-w-[200px] mx-auto leading-relaxed">
                      High-resolution screenshots will be uploaded soon.
                    </p>
                  </div>

                  {/* Simulated App UI Skeleton Blocks */}
                  <div className="w-full space-y-2 pt-2 px-2">
                    <div className="h-10 w-full rounded-xl bg-slate-800/60 border border-slate-700/40 p-2 flex items-center justify-between">
                      <div className="h-2 w-20 rounded bg-slate-700" />
                      <div className="h-4 w-12 rounded bg-teal-500/20" />
                    </div>
                    <div className="h-16 w-full rounded-xl bg-slate-800/40 border border-slate-800 p-2.5 flex flex-col justify-between">
                      <div className="h-2 w-28 rounded bg-slate-700" />
                      <div className="h-2 w-16 rounded bg-slate-800" />
                    </div>
                  </div>
                </div>

                {/* Bottom App identifier pill */}
                <div className="w-full pb-1 text-center">
                  <span className="text-[10px] font-mono text-slate-500">
                    Client Deliverable · Production
                  </span>
                </div>
              </div>
            )}

            {/* Subtle bottom app badge indicator (only shown when real screenshot is displayed) */}
            {hasRealScreenshot && (
              <div className="absolute bottom-4 left-3 right-3 z-20 px-3 py-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs text-white">
                <div className="truncate">
                  <span className="font-semibold">{appName}</span>
                  {appCompany && <span className="text-slate-400 text-[11px] block truncate">{appCompany}</span>}
                </div>
                <span className="text-[10px] font-mono text-teal-400 px-1.5 py-0.5 rounded bg-teal-950/60 border border-teal-800/40 shrink-0">
                  Android
                </span>
              </div>
            )}
          </div>

          {/* Android gesture navigation bar */}
          <div className="relative z-30 pb-2 pt-1 flex justify-center bg-black">
            <div className="h-1 w-28 rounded-full bg-white/40" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

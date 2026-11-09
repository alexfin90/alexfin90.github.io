/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Bluetooth, Wifi, Heart, Dumbbell } from 'lucide-react';

interface ConsoleFrameProps {
  currentImage?: string;
  appName: string;
  appCompany?: string;
  isHero?: boolean;
}

export const ConsoleFrame: React.FC<ConsoleFrameProps> = ({
  currentImage,
  appName,
  appCompany = 'Technogym',
  isHero = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Track which src finished loading, so a cached image that fires onLoad early can't be reset to hidden.
  const [loadedSrc, setLoadedSrc] = useState<string>();
  const imageLoaded = loadedSrc === currentImage;
  // A cached image can finish before React sees its load event, so also check on mount.
  const markIfComplete = useCallback(
    (el: HTMLImageElement | null) => {
      if (el?.complete && el.naturalWidth > 0) setLoadedSrc(currentImage);
    },
    [currentImage],
  );
  const [isReducedMotion, setIsReducedMotion] = useState(false);

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
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-9, 9]), springConfig);

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
      className="perspective-1000 flex items-center justify-center p-2 sm:p-4 select-none w-full"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX: isReducedMotion ? 0 : rotateX,
          rotateY: isReducedMotion ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-[460px] sm:max-w-[500px] h-[300px] sm:h-[340px] rounded-3xl bg-slate-900 dark:bg-slate-950 p-2.5 sm:p-3 shadow-2xl shadow-teal-950/30 dark:shadow-teal-900/15 border-4 border-slate-700/80 dark:border-slate-800 ring-1 ring-white/10"
      >
        {/* Machine mounting bracket / hardware details */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-28 h-2 rounded-t-lg bg-slate-800 border-t border-slate-600/50" />
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-36 h-2 rounded-b-lg bg-slate-800 border-b border-slate-600/50" />

        {/* Machine Console Screen Chassis */}
        <div className="relative h-full w-full rounded-2xl overflow-hidden bg-black flex flex-col border border-slate-800/90 shadow-inner">
          {/* Top Console Sensor & Status Bar */}
          <div className="relative z-30 flex items-center justify-between px-4 py-2 bg-gradient-to-b from-black/90 to-black/40 text-[11px] font-mono text-white/90 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="font-semibold tracking-wider text-[10px] uppercase text-teal-400">
                Embedded Android
              </span>
            </div>

            {/* Gym Telemetry Connection Indicators */}
            <div className="flex items-center gap-2 text-slate-400">
              <Heart className="w-3 h-3 text-rose-500" />
              <Bluetooth className="w-3 h-3 text-sky-400" />
              <Wifi className="w-3 h-3 text-teal-400" />
            </div>
          </div>

          {/* Console Touchscreen Display Viewport */}
          <div className="relative flex-1 w-full overflow-hidden bg-slate-950 flex flex-col">
            {/* Gloss reflection glare overlay */}
            <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08]" />

            {/* Live screen screenshot or Clean Placeholder */}
            {hasRealScreenshot ? (
              <motion.div
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: imageLoaded ? 1 : 0 }}
                transition={{ duration: 0.35 }}
                className="relative h-full w-full"
              >
                <img
                  src={currentImage}
                  alt={`${appName} console interface`}
                  ref={markIfComplete}
                  onLoad={() => setLoadedSrc(currentImage)}
                  className="h-full w-full object-cover object-center"
                  loading={isHero ? 'eager' : 'lazy'}
                />
              </motion.div>
            ) : (
              /* Clean Placeholder inside console frame */
              <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-slate-900 to-slate-950 text-white">
                <div className="h-12 w-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mb-2.5 text-teal-400">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <h4 className="font-display font-bold text-base text-white">{appName}</h4>
                <p className="text-xs text-teal-400 font-mono mt-0.5">Screenshot coming soon</p>
                <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
                  Embedded Android OS powering smart strength &amp; cardio machines
                </p>
              </div>
            )}

            {/* Bottom App Identifier Bar */}
            <div className="absolute bottom-3 left-3 right-3 z-20 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-2 truncate">
                <span className="font-bold">{appName}</span>
                <span className="text-slate-400 text-[11px]">· {appCompany}</span>
              </div>
              <span className="text-[10px] font-mono text-teal-300 px-2 py-0.5 rounded bg-teal-950/80 border border-teal-800/40">
                Embedded Console
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

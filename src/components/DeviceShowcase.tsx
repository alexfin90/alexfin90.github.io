/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PhoneFrame } from './PhoneFrame';
import { ConsoleFrame } from './ConsoleFrame';

interface DeviceShowcaseProps {
  deviceType: 'phone' | 'console';
  currentImage?: string;
  appName: string;
  appCompany?: string;
  isHero?: boolean;
}

export const DeviceShowcase: React.FC<DeviceShowcaseProps> = ({
  deviceType,
  currentImage,
  appName,
  appCompany,
  isHero = false,
}) => {
  return (
    <div className="relative w-full flex items-center justify-center min-h-[380px] sm:min-h-[600px] overflow-visible">
      <AnimatePresence mode="wait">
        {deviceType === 'console' ? (
          <motion.div
            key="console-frame"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center"
          >
            <ConsoleFrame
              currentImage={currentImage}
              appName={appName}
              appCompany={appCompany}
              isHero={isHero}
            />
          </motion.div>
        ) : (
          <motion.div
            key="phone-frame"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center"
          >
            <PhoneFrame
              currentImage={currentImage}
              appName={appName}
              appCompany={appCompany}
              isHero={isHero}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

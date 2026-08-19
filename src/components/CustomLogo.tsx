import React from 'react';
import { motion } from 'framer-motion';

interface CustomLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  animated?: boolean;
}

export const CustomLogo: React.FC<CustomLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  animated = true,
}) => {
  const sizeMap = {
    sm: { icon: 'w-8 h-8', text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 'w-11 h-11', text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 'w-16 h-16', text: 'text-3xl', sub: 'text-xs' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className="flex items-center gap-3.5 group cursor-pointer select-none">
      {/* Handcrafted Vinyl Record & Soundwave Icon Container */}
      <div className={`relative ${currentSize.icon} flex items-center justify-center`}>
        {/* Ambient Outer Glowing Aura */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400 opacity-70 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500" />

        {/* Outer Vinyl Ring */}
        <motion.div
          animate={animated ? { rotate: 360 } : {}}
          transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
          className="relative w-full h-full rounded-full bg-slate-950 p-1 border border-purple-400/40 shadow-2xl flex items-center justify-center overflow-hidden"
        >
          {/* Concentric Vinyl Grooves SVG */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-purple-300/30 group-hover:text-pink-300/50 transition-colors"
          >
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
            <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>

          {/* Holographic Center Label */}
          <div className="absolute w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 p-[1.5px] shadow-inner flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
              {/* Spindle Hole with Pulse Glow */}
              <div className="w-2 h-2 rounded-full bg-purple-300 shadow-sm shadow-purple-200 group-hover:scale-125 transition-transform" />
            </div>
          </div>
        </motion.div>

        {/* Floating Pulsing Sound Wave Equalizer Accent */}
        <div className="absolute -top-1 -right-1 flex gap-[2px] items-end h-3 px-1 rounded-full bg-slate-950/80 border border-purple-500/40 backdrop-blur-sm">
          <motion.span
            animate={animated ? { height: ['30%', '100%', '40%', '80%', '30%'] } : {}}
            transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
            className="w-[2px] bg-purple-400 rounded-full"
          />
          <motion.span
            animate={animated ? { height: ['70%', '30%', '90%', '20%', '70%'] } : {}}
            transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
            className="w-[2px] bg-pink-400 rounded-full"
          />
          <motion.span
            animate={animated ? { height: ['40%', '80%', '20%', '100%', '40%'] } : {}}
            transition={{ repeat: Infinity, duration: 1.3, ease: 'easeInOut' }}
            className="w-[2px] bg-amber-300 rounded-full"
          />
        </div>
      </div>

      {/* Brand Title & Subtitle Badge */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-extrabold tracking-wider ${currentSize.text} bg-gradient-to-r from-purple-200 via-pink-200 to-indigo-200 bg-clip-text text-transparent group-hover:from-purple-100 group-hover:to-pink-100 transition-all drop-shadow-sm`}>
            NOSTALGIA
          </span>
          <span className="font-black text-xs px-1.5 py-0.5 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/30">
            3D
          </span>
        </div>

        {showSubtitle && (
          <div className={`flex items-center gap-1.5 ${currentSize.sub} font-mono uppercase tracking-widest text-purple-300/80 font-medium`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>Soundscape Engine</span>
          </div>
        )}
      </div>
    </div>
  );
};

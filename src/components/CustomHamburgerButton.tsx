import React from 'react';
import { motion } from 'framer-motion';

interface CustomHamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const CustomHamburgerButton: React.FC<CustomHamburgerButtonProps> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle Navigation Menu"
      className="relative group p-3 rounded-2xl bg-slate-900/60 border border-purple-500/30 hover:border-purple-400/60 backdrop-blur-md shadow-lg shadow-purple-900/20 transition-all duration-300 focus:outline-none hover:scale-105 active:scale-95 flex items-center justify-center overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-pink-500/10 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-sm" />

      {/* Subtle Equalizer Sound Wave Indicator Dot */}
      <div className="absolute top-1.5 right-1.5 flex gap-0.5 items-end">
        <motion.span
          animate={{ height: isOpen ? ['4px', '8px', '4px'] : ['3px', '6px', '3px'] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
          className="w-0.5 bg-purple-400/80 rounded-full"
        />
        <motion.span
          animate={{ height: isOpen ? ['8px', '4px', '8px'] : ['5px', '2px', '5px'] }}
          transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
          className="w-0.5 bg-pink-400/80 rounded-full"
        />
      </div>

      {/* Custom Morphing Hamburger Icon Lines */}
      <div className="relative w-6 h-5 flex flex-col justify-between items-center z-10">
        {/* Top Line */}
        <motion.span
          animate={
            isOpen
              ? { rotate: 45, y: 9, width: '22px', backgroundColor: '#e9d5ff' }
              : { rotate: 0, y: 0, width: '24px', backgroundColor: '#c084fc' }
          }
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="h-[2.5px] rounded-full shadow-sm shadow-purple-500/50 block origin-center"
        />

        {/* Middle Line with Equalizer Split effect */}
        <motion.div
          animate={
            isOpen
              ? { opacity: 0, scaleX: 0 }
              : { opacity: 1, scaleX: 1 }
          }
          transition={{ duration: 0.2 }}
          className="w-full flex justify-between items-center h-[2.5px]"
        >
          <span className="w-2.5 h-[2.5px] bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
          <span className="w-2.5 h-[2.5px] bg-gradient-to-r from-pink-400 to-indigo-400 rounded-full" />
        </motion.div>

        {/* Bottom Line */}
        <motion.span
          animate={
            isOpen
              ? { rotate: -45, y: -9, width: '22px', backgroundColor: '#e9d5ff' }
              : { rotate: 0, y: 0, width: '18px', backgroundColor: '#a855f7' }
          }
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="h-[2.5px] rounded-full shadow-sm shadow-purple-500/50 block origin-center self-end"
        />
      </div>
    </button>
  );
};

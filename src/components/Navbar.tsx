import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Compass, Timer,
  Radio, Disc, Headphones, Heart, Share2, Layers
} from 'lucide-react';
import { CustomHamburgerButton } from './CustomHamburgerButton';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  ambientPlaying: boolean;
  toggleAmbient: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  ambientPlaying,
  toggleAmbient
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home & Top 10 Nostalgic', icon: Disc, description: 'Curated soothing tracks & nostalgia' },
    { id: 'search', label: 'Music Search API', icon: Compass, description: 'Search millions of tracks worldwide' },
    { id: 'mixer', label: 'Ambient Soundscape', icon: Radio, description: 'Water, wind, rain & birds generator' },
    { id: 'timer', label: 'Nostalgic Focus Timer', icon: Timer, description: 'Pomodoro timer with soft sounds' },
    { id: 'apps', label: 'All-in-One Micro Apps', icon: Layers, description: 'Mini utilities inside website' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel px-6 py-3.5 rounded-full border border-white/15 shadow-2xl backdrop-blur-xl">
        {/* Logo & Brand */}
        <div
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 p-0.5 shadow-lg group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950/80 backdrop-blur-md rounded-full flex items-center justify-center">
              <Headphones className="w-5 h-5 text-purple-300 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-purple-300 via-pink-200 to-indigo-200 bg-clip-text text-transparent">
              NOSTALGIA 3D
            </span>
            <div className="flex items-center gap-1.5 text-[10px] text-purple-300/80 uppercase font-mono tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              All-In-One Music
            </div>
          </div>
        </div>

        {/* Desktop Quick Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/10">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-purple-600/80 text-white shadow-lg shadow-purple-500/30 border border-purple-400/40'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-200' : 'text-slate-400'}`} />
                {item.label.split(' ')[0]}
              </button>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          {/* Nature Quick Toggle */}
          <button
            onClick={toggleAmbient}
            className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium border transition-all duration-300 ${
              ambientPlaying
                ? 'bg-purple-500/20 text-purple-200 border-purple-500/40 shadow-sm shadow-purple-500/20'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${ambientPlaying ? 'text-purple-300 animate-spin' : ''}`} />
            <span>{ambientPlaying ? 'Nature On' : 'Nature Off'}</span>
          </button>

          {/* Custom Handcrafted Hamburger Menu Trigger */}
          <CustomHamburgerButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </div>
      </div>

      {/* Handcrafted Custom Glassmorphic Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <React.Fragment>
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-md z-40"
            />

            {/* Bespoke Custom Glass Modal Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="absolute top-24 right-4 left-4 md:left-auto md:w-96 rounded-3xl p-6 bg-slate-950/85 backdrop-blur-2xl border border-purple-500/30 shadow-2xl shadow-purple-950/60 z-50 overflow-hidden"
            >
              {/* Handcrafted Ambient Gradient Aura */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />

              {/* Top Header with Custom Sound Wave Visualizer */}
              <div className="relative z-10 flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse" />
                  <span className="text-xs uppercase tracking-widest text-purple-200 font-bold font-mono">
                    Nostalgia Menu
                  </span>
                </div>

                {/* Handcrafted Animated Equalizer Bars */}
                <div className="flex items-end gap-1 h-4 px-2 py-1 bg-purple-950/50 rounded-lg border border-purple-500/20">
                  <motion.span
                    animate={{ height: ['4px', '14px', '6px', '12px', '4px'] }}
                    transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
                    className="w-1 bg-purple-400 rounded-full"
                  />
                  <motion.span
                    animate={{ height: ['10px', '4px', '14px', '8px', '10px'] }}
                    transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
                    className="w-1 bg-pink-400 rounded-full"
                  />
                  <motion.span
                    animate={{ height: ['6px', '12px', '4px', '14px', '6px'] }}
                    transition={{ repeat: Infinity, duration: 1.3, ease: 'easeInOut' }}
                    className="w-1 bg-indigo-400 rounded-full"
                  />
                </div>
              </div>

              {/* Navigation Items List */}
              <div className="relative z-10 space-y-2.5">
                {menuItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 + 0.1, duration: 0.2 }}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsOpen(false);
                      }}
                      className={`group w-full relative flex items-center gap-4 p-3.5 rounded-2xl text-left transition-all duration-300 overflow-hidden ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-900/60 via-indigo-900/40 to-slate-900/80 border border-purple-400/50 text-white shadow-xl shadow-purple-950/40'
                          : 'hover:bg-white/10 text-slate-300 hover:text-white border border-white/5'
                      }`}
                    >
                      {/* Active Indicator Bar */}
                      {isActive && (
                        <motion.div
                          layoutId="activeGlowBar"
                          className="absolute left-0 top-2 bottom-2 w-1.5 bg-gradient-to-b from-purple-400 via-pink-400 to-indigo-400 rounded-r-full shadow-lg shadow-purple-400/80"
                        />
                      )}

                      <div
                        className={`p-2.5 rounded-xl transition-transform duration-300 group-hover:scale-110 ${
                          isActive
                            ? 'bg-purple-500/30 text-purple-200 border border-purple-400/30'
                            : 'bg-white/5 text-slate-400 border border-white/5 group-hover:text-purple-300'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-white flex items-center justify-between">
                          <span>{item.label}</span>
                          {isActive && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/30 border border-purple-400/40 text-purple-200">
                              Active
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 truncate">{item.description}</div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Handcrafted Custom Menu Footer */}
              <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400/40 animate-pulse" />
                  <span className="text-slate-300 font-medium text-[11px]">Crafted for Nostalgia</span>
                </div>
                <div
                  onClick={() => alert('Vibe copied! Spread the music nostalgia.')}
                  className="flex items-center gap-1.5 text-purple-300 hover:text-purple-100 cursor-pointer transition-colors text-[11px] font-mono bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20"
                >
                  <Share2 className="w-3 h-3" />
                  <span>Share Vibe</span>
                </div>
              </div>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </header>
  );
};

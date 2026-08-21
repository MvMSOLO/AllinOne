import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Compass, Timer, Mic,
  Radio, Disc, Heart, Share2, Layers, Search, Zap
} from 'lucide-react';
import { CustomHamburgerButton } from './CustomHamburgerButton';
import { CustomLogo } from './CustomLogo';

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
    { id: 'home', label: 'Home & Top 10 Hits', icon: Disc, description: 'Curated soothing tracks & nostalgia' },
    { id: 'voice-changer', label: 'Voice Changer Studio', icon: Mic, description: '20 Female & 20 FX Voices, Song Maker & TG Export' },
    { id: 'search', label: 'Real Music Search', icon: Compass, description: 'Search millions of tracks worldwide' },
    { id: 'mixer', label: 'Ambient Soundscape', icon: Radio, description: 'Water, wind, rain & birds generator' },
    { id: 'timer', label: 'Nostalgic Focus Timer', icon: Timer, description: 'Pomodoro timer with soft sounds' },
    { id: 'apps', label: 'All-in-One Micro Apps', icon: Layers, description: 'Mini utilities inside website' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 py-3 md:px-8 md:py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-panel px-4 py-2.5 md:px-6 md:py-3.5 rounded-full border border-purple-500/25 shadow-2xl backdrop-blur-2xl bg-slate-950/70">
        {/* Handcrafted Custom Logo & Brand */}
        <div onClick={() => setActiveTab('home')}>
          <CustomLogo size="md" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-purple-500/20 shadow-inner">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600/90 via-indigo-600/90 to-pink-600/80 rounded-full border border-purple-400/50 shadow-lg shadow-purple-500/30 -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-200 animate-pulse' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Quick Voice Studio Button */}
          <button
            onClick={() => setActiveTab('voice-changer')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold border transition-all duration-300 ${
              activeTab === 'voice-changer'
                ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white border-purple-300 shadow-lg shadow-purple-500/30'
                : 'bg-purple-500/10 text-purple-200 border-purple-500/30 hover:bg-purple-500/20'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span className="hidden sm:inline">Voice Studio</span>
          </button>
          {/* Quick Search Shortcut */}
          <button
            onClick={() => setActiveTab('search')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border transition-all duration-300 ${
              activeTab === 'search'
                ? 'bg-purple-600 text-white border-purple-400'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
            title="Search Music API"
          >
            <Search className="w-3.5 h-3.5 text-purple-300" />
            <span className="hidden sm:inline">Search API</span>
          </button>

          {/* Nature Quick Toggle */}
          <button
            onClick={toggleAmbient}
            className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium border transition-all duration-300 ${
              ambientPlaying
                ? 'bg-purple-500/20 text-purple-200 border-purple-500/50 shadow-sm shadow-purple-500/30'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${ambientPlaying ? 'text-purple-300 animate-spin' : ''}`} />
            <span>{ambientPlaying ? 'Nature On' : 'Nature Off'}</span>
          </button>

          {/* Custom Handcrafted Hamburger Trigger */}
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
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-40"
            />

            {/* Bespoke Custom Glass Modal Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="absolute top-20 right-4 left-4 md:left-auto md:w-96 rounded-3xl p-6 bg-slate-950/90 backdrop-blur-2xl border border-purple-500/40 shadow-2xl shadow-purple-950/80 z-50 overflow-hidden"
            >
              {/* Handcrafted Ambient Gradient Aura */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />

              {/* Drawer Top Header with Custom Sound Wave Visualizer */}
              <div className="relative z-10 flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse" />
                  <span className="text-xs uppercase tracking-widest text-purple-200 font-bold font-mono">
                    Nostalgia Menu
                  </span>
                </div>

                {/* Handcrafted Animated Equalizer Bars */}
                <div className="flex items-end gap-1 h-4 px-2 py-1 bg-purple-950/60 rounded-lg border border-purple-500/30">
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
                      transition={{ delay: idx * 0.05 + 0.08, duration: 0.2 }}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsOpen(false);
                      }}
                      className={`group w-full relative flex items-center gap-4 p-3.5 rounded-2xl text-left transition-all duration-300 overflow-hidden ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-900/80 via-indigo-900/60 to-slate-900/90 border border-purple-400/60 text-white shadow-xl shadow-purple-950/60'
                          : 'hover:bg-white/10 text-slate-300 hover:text-white border border-white/5'
                      }`}
                    >
                      {/* Active Indicator Bar */}
                      {isActive && (
                        <motion.div
                          layoutId="activeGlowBarMenu"
                          className="absolute left-0 top-2 bottom-2 w-1.5 bg-gradient-to-b from-purple-400 via-pink-400 to-indigo-400 rounded-r-full shadow-lg shadow-purple-400/80"
                        />
                      )}

                      <div
                        className={`p-2.5 rounded-xl transition-transform duration-300 group-hover:scale-110 ${
                          isActive
                            ? 'bg-purple-500/30 text-purple-200 border border-purple-400/40'
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
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('Vibe link copied to clipboard!');
                  }}
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

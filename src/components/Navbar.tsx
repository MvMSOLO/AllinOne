import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Sparkles, Compass, Timer,
  Radio, Disc, Headphones, Heart, Share2, Layers
} from 'lucide-react';

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

          {/* Hamburger Menu Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-full glass-button text-slate-200 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5 text-purple-300" /> : <Menu className="w-5 h-5 text-purple-300" />}
          </button>
        </div>
      </div>

      {/* Hamburger Overlay Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute top-20 right-4 left-4 md:left-auto md:w-96 glass-panel-glow rounded-3xl p-6 border border-white/20 shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
              <span className="text-xs uppercase tracking-widest text-purple-300 font-semibold flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" /> All-In-One Navigation
              </span>
              <span className="text-[10px] bg-purple-500/20 border border-purple-500/30 text-purple-200 px-2 py-0.5 rounded-full font-mono">
                v2.0
              </span>
            </div>

            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-4 p-3 rounded-2xl text-left transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-600/40 to-indigo-600/30 border border-purple-400/40 text-white shadow-lg'
                        : 'hover:bg-white/10 text-slate-300 hover:text-white border border-transparent'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl ${isActive ? 'bg-purple-500/30 text-purple-200' : 'bg-white/5 text-slate-400'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{item.label}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{item.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400/30" /> Soft Nostalgia
              </span>
              <span className="flex items-center gap-1 text-slate-400 hover:text-slate-200 cursor-pointer">
                <Share2 className="w-3.5 h-3.5" /> Share Vibe
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

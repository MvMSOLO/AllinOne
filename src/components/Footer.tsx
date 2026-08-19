import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CustomLogo } from './CustomLogo';
import {
  Heart, Sparkles, Share2, Compass, Radio, Timer, Layers, Disc,
  Volume2, VolumeX, Clock, Quote, ShieldCheck, Zap
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  ambientPlaying: boolean;
  toggleAmbient: () => void;
}

const NOSTALGIC_QUOTES = [
  "Music washes away from the soul the dust of everyday life.",
  "Where words fail, nostalgic soundscapes speak.",
  "In the quiet gentle rhythm of rainfall, memories shine like stars.",
  "Soft acoustic melodies are time machines to our warmest days.",
  "Listen to the silence inside the music, for that is where peace lives."
];

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  ambientPlaying,
  toggleAmbient,
}) => {
  const [currentTime, setCurrentTime] = useState('');
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [copiedVibe, setCopiedVibe] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleShareVibe = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedVibe(true);
    setTimeout(() => setCopiedVibe(false), 2500);
  };

  const nextQuote = () => {
    setQuoteIdx((prev) => (prev + 1) % NOSTALGIC_QUOTES.length);
  };

  return (
    <footer className="relative mt-20 z-30 px-4 md:px-8 pb-32 border-t border-purple-500/20 bg-slate-950/80 backdrop-blur-2xl">
      {/* Handcrafted Glowing Ambient Light Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto pt-16">
        {/* Top Grid Sections */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          {/* Brand Info & Custom Logo */}
          <div className="md:col-span-5 space-y-6">
            <div onClick={() => setActiveTab('home')}>
              <CustomLogo size="lg" />
            </div>

            <p className="text-sm text-slate-300/90 leading-relaxed max-w-md">
              A handcrafted, immersive 3D music & audio space designed for deep focus, nostalgia, and soothing relaxation with procedural nature synthesis and real-time audio search.
            </p>

            {/* Live Clock & Status Badge */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-200 text-xs font-mono">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                <span>{currentTime || '12:00:00 AM'}</span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Audio Engine Active</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-purple-300 font-bold flex items-center gap-2">
              <Zap className="w-4 h-4 text-pink-400" /> Handcrafted Hub
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="flex items-center gap-2 hover:text-purple-300 transition-colors group"
                >
                  <Disc className="w-4 h-4 text-purple-400 group-hover:rotate-45 transition-transform" />
                  <span>Top 10 Nostalgic Hits</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('search')}
                  className="flex items-center gap-2 hover:text-purple-300 transition-colors group"
                >
                  <Compass className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                  <span>Real Music Search API</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('mixer')}
                  className="flex items-center gap-2 hover:text-purple-300 transition-colors group"
                >
                  <Radio className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                  <span>Ambient Soundscape</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('timer')}
                  className="flex items-center gap-2 hover:text-purple-300 transition-colors group"
                >
                  <Timer className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>Nostalgic Focus Timer</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('apps')}
                  className="flex items-center gap-2 hover:text-purple-300 transition-colors group"
                >
                  <Layers className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
                  <span>Micro Apps & Solfeggio</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Nostalgic Quote Card */}
          <div className="md:col-span-4 space-y-4">
            <div className="glass-panel p-5 rounded-2xl border border-purple-500/30 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-pink-300 flex items-center gap-1.5 font-bold">
                  <Quote className="w-4 h-4 text-purple-400" /> Daily Thought
                </span>
                <button
                  onClick={nextQuote}
                  className="text-[11px] text-purple-300 hover:text-white bg-purple-500/20 px-2.5 py-1 rounded-full border border-purple-400/30 transition-all hover:scale-105 active:scale-95"
                >
                  Refresh
                </button>
              </div>

              <motion.p
                key={quoteIdx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xs italic text-slate-200 leading-relaxed font-serif"
              >
                "{NOSTALGIC_QUOTES[quoteIdx]}"
              </motion.p>

              {/* Ambient Nature Toggle Quick Button */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">Nature Audio:</span>
                <button
                  onClick={toggleAmbient}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    ambientPlaying
                      ? 'bg-purple-600/80 text-white border-purple-400 shadow-md shadow-purple-500/30'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {ambientPlaying ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-purple-200 animate-pulse" />
                      <span>Nature Running</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                      <span>Enable Nature</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Handcrafted Equalizer Wave Bar Section */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-purple-300 uppercase tracking-widest">
              Live Equalizer Frequency
            </span>
            <div className="flex items-end gap-1 h-5 px-3 py-1 bg-purple-950/60 rounded-full border border-purple-500/30">
              {[12, 18, 8, 22, 14, 26, 10, 16, 24, 12, 20, 15].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ height: ['4px', `${h}px`, '6px'] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8 + (i % 5) * 0.2,
                    ease: 'easeInOut',
                  }}
                  className="w-1 bg-gradient-to-t from-purple-500 to-pink-400 rounded-full"
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShareVibe}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/40 to-pink-600/40 hover:from-purple-600/60 hover:to-pink-600/60 border border-purple-400/40 text-xs font-medium text-purple-100 transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedVibe ? 'Vibe Link Copied!' : 'Share Nostalgia Vibe'}</span>
            </button>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Handcrafted Nostalgia 3D.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1 text-pink-300">
              Made with <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" /> for Soft Sound Lovers
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> High Fidelity Audio
            </span>
            <span className="flex items-center gap-1 text-purple-300">
              <Sparkles className="w-3.5 h-3.5" /> Three.js & WebAudio Engine
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

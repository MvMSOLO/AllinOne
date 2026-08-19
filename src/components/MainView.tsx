import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Track } from '../data/musicData';
import {
  TOP_10_NOSTALGIC_TRACKS,
  GENRE_PRESETS,
  searchMusicApi
} from '../data/musicData';
import {
  Play, Pause, Search, Sparkles, Music, Mic, Radio, Clock,
  Headphones, RefreshCw, Tag, History, Info, X
} from 'lucide-react';
import { AmbientSoundMixer } from './AmbientSoundMixer';

interface MainViewProps {
  activeTab: string;
  currentTrack: Track | null;
  isPlaying: boolean;
  onSelectTrack: (track: Track) => void;
  onTogglePlay: () => void;
}

export const MainView: React.FC<MainViewProps> = ({
  activeTab,
  currentTrack,
  isPlaying,
  onSelectTrack,
  onTogglePlay,
}) => {
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([
    'Ludovico Einaudi',
    'Lo-Fi Piano',
    'Yiruma',
    'Coldplay Acoustic'
  ]);
  const [activeModalTrack, setActiveModalTrack] = useState<Track | null>(null);

  // Focus Timer State
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Initial popular search or default loading
  useEffect(() => {
    if (activeTab === 'search' && searchResults.length === 0) {
      handleInitialSearch('Relaxing Lofi Piano');
    }
  }, [activeTab]);

  const handleInitialSearch = async (term: string) => {
    setIsSearching(true);
    const results = await searchMusicApi(term, selectedGenre);
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleSearchSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim() && selectedGenre === 'All Genres') return;

    setIsSearching(true);
    const queryTerm = searchQuery.trim() || selectedGenre;
    const results = await searchMusicApi(queryTerm, selectedGenre);
    setSearchResults(results);
    setIsSearching(false);

    if (searchQuery.trim() && !searchHistory.includes(searchQuery.trim())) {
      setSearchHistory([searchQuery.trim(), ...searchHistory.slice(0, 5)]);
    }
  };

  const handleGenreClick = async (genre: string) => {
    setSelectedGenre(genre);
    setIsSearching(true);
    const results = await searchMusicApi(searchQuery || genre, genre);
    setSearchResults(results);
    setIsSearching(false);
  };

  const toggleTimer = () => {
    setIsTimerActive(!isTimerActive);
  };

  useEffect(() => {
    let interval: any = null;
    if (isTimerActive) {
      interval = setInterval(() => {
        if (timerSeconds > 0) {
          setTimerSeconds(timerSeconds - 1);
        } else if (timerMinutes > 0) {
          setTimerMinutes(timerMinutes - 1);
          setTimerSeconds(59);
        } else {
          setIsTimerActive(false);
          alert('Nostalgic Focus Session Completed!');
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timerMinutes, timerSeconds]);

  return (
    <main className="pt-28 pb-12 px-4 md:px-8 max-w-7xl mx-auto w-full min-h-screen">
      {/* 1. HOME & TOP 10 NOSTALGIC TAB */}
      {activeTab === 'home' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-12"
        >
          {/* Handcrafted Hero Banner */}
          <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden glass-panel-glow border border-purple-500/30 shadow-2xl">
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-600/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-mono uppercase tracking-widest shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" /> Soft Nostalgic Vibes
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Immerse in Nostalgia with <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent">3D Soundscapes</span>
              </h1>

              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Seamless infinite 3D backgrounds combined with gentle water streams, soft wind whispering, rainfall, and soothing vocal & instrumental melodies.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onSelectTrack(TOP_10_NOSTALGIC_TRACKS[0])}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold shadow-xl shadow-purple-500/30 transition-all flex items-center gap-2.5 hover:scale-105 active:scale-95"
                >
                  <Play className="w-5 h-5 fill-white" /> Listen Top 1 Track
                </button>
              </div>
            </div>
          </div>

          {/* Top 10 Nostalgic Grid */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
                  <Headphones className="w-6 h-6 text-purple-400" /> The Top 10 Nostalgic Hits
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Soft vocal whispers, warm acoustic piano, and soothing melodies curated for high quality relaxation.
                </p>
              </div>
              <span className="self-start sm:self-auto text-xs font-mono text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                10 Curated Tracks
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TOP_10_NOSTALGIC_TRACKS.map((track, idx) => {
                const isSelected = currentTrack?.id === track.id;
                return (
                  <motion.div
                    key={track.id}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => {
                      if (isSelected) {
                        onTogglePlay();
                      } else {
                        onSelectTrack(track);
                      }
                    }}
                    className={`group relative glass-panel p-4 rounded-2xl flex items-center justify-between gap-4 cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'border-purple-400 bg-purple-950/40 shadow-xl shadow-purple-500/20'
                        : 'hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="font-mono text-lg font-bold text-slate-500 group-hover:text-purple-300 w-6 text-center">
                        {idx + 1}
                      </span>

                      <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 shadow-md">
                        <img src={track.albumCover} alt={track.title} className="w-full h-full object-cover" />
                        <div
                          className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-opacity ${
                            isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}
                        >
                          {isSelected && isPlaying ? (
                            <Pause className="w-6 h-6 text-white" />
                          ) : (
                            <Play className="w-6 h-6 text-white fill-white translate-x-0.5" />
                          )}
                        </div>
                      </div>

                      <div className="min-w-0">
                        <h4 className="text-sm md:text-base font-semibold text-white truncate group-hover:text-purple-200">
                          {track.title}
                        </h4>
                        <p className="text-xs text-slate-300 truncate mt-0.5">{track.artist}</p>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          {track.vocalType && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1 font-mono">
                              <Mic className="w-2.5 h-2.5" /> {track.vocalType}
                            </span>
                          )}
                          <span className="text-[10px] text-slate-400 font-mono">{track.genre}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalTrack(track);
                        }}
                        className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Track Info"
                      >
                        <Info className="w-4 h-4" />
                      </button>

                      <button className="p-2.5 rounded-full bg-purple-600/30 text-purple-200 group-hover:bg-purple-500 group-hover:text-white transition-all shadow-md">
                        {isSelected && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* 2. REAL MUSIC SEARCH API TAB */}
      {activeTab === 'search' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white flex items-center justify-center gap-3">
              <Search className="w-8 h-8 text-purple-400" /> Real Music Search API
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Search millions of real music tracks worldwide live from iTunes API with high quality audio previews and album art.
            </p>
          </div>

          {/* Search Form Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-purple-300 absolute left-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search artist, song, album (e.g. Ludovico Einaudi, Lo-Fi, Rain, Yiruma)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full glass-panel pl-12 pr-32 py-4 rounded-2xl text-white placeholder-slate-400 border border-purple-500/30 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all shadow-2xl text-sm"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="absolute right-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-lg flex items-center gap-1.5"
              >
                {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Search API'}
              </button>
            </div>
          </form>

          {/* Preset Genre Chips */}
          <div className="max-w-3xl mx-auto space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-300 uppercase tracking-widest">
              <Tag className="w-3.5 h-3.5 text-pink-400" />
              <span>Genre Presets:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {GENRE_PRESETS.map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleGenreClick(genre)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    selectedGenre === genre
                      ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-500/30'
                      : 'bg-slate-900/60 text-slate-300 border-white/10 hover:border-purple-400/40 hover:text-white'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Search History Chips */}
          {searchHistory.length > 0 && (
            <div className="max-w-3xl mx-auto flex items-center gap-2 text-xs text-slate-400 flex-wrap">
              <span className="flex items-center gap-1 font-mono text-purple-300/80">
                <History className="w-3.5 h-3.5 text-indigo-400" /> Recent:
              </span>
              {searchHistory.map((historyItem) => (
                <button
                  key={historyItem}
                  onClick={() => {
                    setSearchQuery(historyItem);
                    handleInitialSearch(historyItem);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 transition-all"
                >
                  {historyItem}
                </button>
              ))}
            </div>
          )}

          {/* Results Grid or Skeleton Loading */}
          {isSearching ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 max-w-6xl mx-auto">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="glass-panel p-4 rounded-2xl flex items-center gap-4 animate-pulse">
                  <div className="w-16 h-16 rounded-xl bg-purple-900/30" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-purple-900/40 rounded w-3/4" />
                    <div className="h-3 bg-purple-900/30 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 max-w-6xl mx-auto">
              {searchResults.map((track) => {
                const isSelected = currentTrack?.id === track.id;
                return (
                  <motion.div
                    key={track.id}
                    whileHover={{ y: -3 }}
                    onClick={() => onSelectTrack(track)}
                    className={`glass-panel p-4 rounded-2xl flex items-center gap-4 cursor-pointer transition-all duration-300 group ${
                      isSelected
                        ? 'border-purple-400 bg-purple-950/40 shadow-xl shadow-purple-500/20'
                        : 'hover:border-purple-400/40'
                    }`}
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-white/10 shadow-md">
                      <img src={track.albumCover} alt={track.title} className="w-full h-full object-cover" />
                      <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                        {isSelected && isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white fill-white translate-x-0.5" />}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-semibold text-white truncate group-hover:text-purple-300">
                        {track.title}
                      </h4>
                      <p className="text-xs text-slate-300 truncate mt-0.5">{track.artist}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-purple-300 font-mono bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
                          {track.genre}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalTrack(track);
                      }}
                      className="p-2 rounded-full text-slate-400 hover:text-white transition-colors"
                      title="View Details"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-sm glass-panel max-w-md mx-auto rounded-3xl p-8 border border-white/10">
              <Music className="w-12 h-12 mx-auto mb-3 text-purple-400/50" />
              No results found. Try entering a search term or click a genre preset above!
            </div>
          )}
        </motion.div>
      )}

      {/* 3. AMBIENT SOUNDSCAPE TAB */}
      {activeTab === 'mixer' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8 max-w-2xl mx-auto"
        >
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-2.5">
              <Radio className="w-7 h-7 text-purple-400" /> Infinite Nature Soundscape
            </h2>
            <p className="text-sm text-slate-300">
              Procedural Web Audio engine generating realistic water stream babble, soft wind noise, light rain, and sporadic bird chirps.
            </p>
          </div>
          <AmbientSoundMixer />
        </motion.div>
      )}

      {/* 4. NOSTALGIC FOCUS TIMER TAB */}
      {activeTab === 'timer' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-md mx-auto text-center space-y-6"
        >
          <div className="glass-panel p-8 rounded-3xl border border-purple-500/30 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-center gap-2 text-purple-300">
              <Clock className="w-6 h-6 text-pink-400" />
              <h3 className="font-semibold text-lg text-white">Nostalgic Focus Timer</h3>
            </div>

            <div className="text-6xl font-extrabold font-mono text-transparent bg-gradient-to-r from-purple-300 via-pink-200 to-indigo-300 bg-clip-text tracking-wider py-4">
              {String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={toggleTimer}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm transition-all shadow-lg hover:scale-105 active:scale-95"
              >
                {isTimerActive ? 'Pause Session' : 'Start Focus'}
              </button>
              <button
                onClick={() => {
                  setIsTimerActive(false);
                  setTimerMinutes(25);
                  setTimerSeconds(0);
                }}
                className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-300 text-sm transition-all"
              >
                Reset
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* 5. ALL IN ONE MICRO APPS TAB */}
      {activeTab === 'apps' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-8"
        >
          <div className="text-center max-w-lg mx-auto space-y-2">
            <h2 className="text-3xl font-bold text-white">All-In-One Micro Apps</h2>
            <p className="text-xs text-slate-400">Mini nostalgic utilities inside website</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="glass-panel p-6 rounded-3xl space-y-4 border border-purple-500/20">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-300" /> Daily Nostalgic Quote
              </h3>
              <blockquote className="text-sm italic text-slate-300 border-l-2 border-purple-400 pl-3">
                "Music expresses that which cannot be said and on which it is impossible to be silent."
              </blockquote>
            </div>

            <div className="glass-panel p-6 rounded-3xl space-y-4 border border-purple-500/20">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Radio className="w-5 h-5 text-teal-300" /> Nature Frequency
              </h3>
              <p className="text-xs text-slate-300">
                Resonating at 432 Hz Solfeggio frequency for deep peace, inner harmony, and soothing focus.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl space-y-4 border border-purple-500/20">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Headphones className="w-5 h-5 text-pink-300" /> Soft Binaural Beat
              </h3>
              <p className="text-xs text-slate-300">
                Alpha waves integrated with ambient background for enhanced concentration, calm, and nostalgia.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Track Details Modal */}
      <AnimatePresence>
        {activeModalTrack && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-panel p-6 rounded-3xl max-w-md w-full border border-purple-500/40 relative space-y-5 shadow-2xl"
            >
              <button
                onClick={() => setActiveModalTrack(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={activeModalTrack.albumCover}
                alt={activeModalTrack.title}
                className="w-full h-56 rounded-2xl object-cover border border-white/10 shadow-lg"
              />

              <div>
                <h3 className="text-lg font-bold text-white">{activeModalTrack.title}</h3>
                <p className="text-sm text-purple-300">{activeModalTrack.artist}</p>
                {activeModalTrack.albumName && (
                  <p className="text-xs text-slate-400 mt-1">Album: {activeModalTrack.albumName}</p>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                <span className="px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-200">
                  {activeModalTrack.genre}
                </span>
                {activeModalTrack.releaseYear && (
                  <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                    {activeModalTrack.releaseYear}
                  </span>
                )}
              </div>

              <button
                onClick={() => {
                  onSelectTrack(activeModalTrack);
                  setActiveModalTrack(null);
                }}
                className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" /> Play Track Now
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

import React, { useState } from 'react';
import type { Track } from '../data/musicData';
import { TOP_10_NOSTALGIC_TRACKS, searchMusicApi } from '../data/musicData';
import { Play, Pause, Search, Sparkles, Music, Mic, Radio, Clock, Headphones, RefreshCw } from 'lucide-react';
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
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Focus Timer State
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    const results = await searchMusicApi(searchQuery);
    setSearchResults(results);
    setIsSearching(false);
  };

  const toggleTimer = () => {
    setIsTimerActive(!isTimerActive);
  };

  React.useEffect(() => {
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
          alert('Focus Session Completed! Take a deep breathe of nostalgia.');
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timerMinutes, timerSeconds]);

  return (
    <main className="pt-28 pb-32 px-4 md:px-8 max-w-7xl mx-auto w-full">
      {/* 1. HOME & TOP 10 NOSTALGIC TAB */}
      {activeTab === 'home' && (
        <div className="space-y-12">
          {/* Hero Banner */}
          <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden glass-panel-glow border border-white/20">
            <div className="max-w-2xl space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Soft Nostalgic Vibes
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
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-purple-500/30 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
                >
                  <Play className="w-5 h-5 fill-white" /> Listen Top 1 Nostalgic
                </button>
              </div>
            </div>
          </div>

          {/* Top 10 Nostalgic Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Headphones className="w-6 h-6 text-purple-400" /> The Top 10 Nostalgic Hits
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Soft vocal whispers, warm acoustic piano, and soothing melodies curated for high quality relaxation.
                </p>
              </div>
              <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                10 Curated Tracks
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TOP_10_NOSTALGIC_TRACKS.map((track, idx) => {
                const isSelected = currentTrack?.id === track.id;
                return (
                  <div
                    key={track.id}
                    onClick={() => {
                      if (isSelected) {
                        onTogglePlay();
                      } else {
                        onSelectTrack(track);
                      }
                    }}
                    className={`group relative glass-panel p-4 rounded-2xl flex items-center justify-between gap-4 cursor-pointer transition-all duration-300 hover:scale-[1.01] ${
                      isSelected ? 'border-purple-500 bg-purple-950/30 shadow-lg shadow-purple-500/20' : 'hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <span className="font-mono text-lg font-bold text-slate-500 group-hover:text-purple-300 w-6 text-center">
                        {idx + 1}
                      </span>
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
                        <img src={track.albumCover} alt={track.title} className="w-full h-full object-cover" />
                        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                          {isSelected && isPlaying ? (
                            <Pause className="w-6 h-6 text-white" />
                          ) : (
                            <Play className="w-6 h-6 text-white fill-white" />
                          )}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-white truncate group-hover:text-purple-200">
                          {track.title}
                        </h4>
                        <p className="text-xs text-slate-400 truncate mt-0.5">{track.artist}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {track.vocalType && (
                            <span className="text-[10px] px-2 py-0.2 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                              <Mic className="w-2.5 h-2.5" /> {track.vocalType}
                            </span>
                          )}
                          <span className="text-[10px] text-slate-500">{track.genre}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="p-2 rounded-full bg-white/5 hover:bg-purple-500/20 text-slate-300 hover:text-purple-200 transition-colors">
                        {isSelected && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 2. REAL MUSIC SEARCH API TAB */}
      {activeTab === 'search' && (
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
              <Search className="w-7 h-7 text-purple-400" /> Real Music Search API
            </h2>
            <p className="text-sm text-slate-300">
              Search millions of music tracks worldwide via real-time iTunes API with soft high-quality preview streaming.
            </p>
          </div>

          <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder="Search artist, track title, or vibe (e.g. Ludovico Einaudi, Lo-Fi, Rain)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-panel pl-12 pr-28 py-4 rounded-2xl text-white placeholder-slate-400 border border-white/20 focus:outline-none focus:border-purple-400 transition-all shadow-xl"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              disabled={isSearching}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs transition-all shadow-md flex items-center gap-1.5"
            >
              {isSearching ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Search'}
            </button>
          </form>

          {/* Results Grid */}
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
              {searchResults.map((track) => {
                const isSelected = currentTrack?.id === track.id;
                return (
                  <div
                    key={track.id}
                    onClick={() => onSelectTrack(track)}
                    className="glass-panel p-4 rounded-2xl flex items-center gap-4 cursor-pointer hover:border-purple-400/50 transition-all hover:scale-[1.02] group"
                  >
                    <img src={track.albumCover} alt={track.title} className="w-16 h-16 rounded-xl object-cover border border-white/10" />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-semibold text-white truncate group-hover:text-purple-300">{track.title}</h4>
                      <p className="text-xs text-slate-400 truncate mt-1">{track.artist}</p>
                      <span className="text-[10px] text-purple-300 font-mono mt-1 inline-block bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
                        {track.genre}
                      </span>
                    </div>
                    <button className="p-2.5 rounded-full bg-purple-600/30 text-purple-200 group-hover:bg-purple-500 group-hover:text-white transition-all">
                      {isSelected && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-sm glass-panel max-w-md mx-auto rounded-3xl p-8">
              <Music className="w-12 h-12 mx-auto mb-3 text-purple-400/50" />
              Enter a search query above to discover real streaming songs.
            </div>
          )}
        </div>
      )}

      {/* 3. AMBIENT SOUNDSCAPE TAB */}
      {activeTab === 'mixer' && (
        <div className="space-y-8 max-w-2xl mx-auto">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
              <Radio className="w-7 h-7 text-purple-400" /> Infinite Nature Soundscape
            </h2>
            <p className="text-sm text-slate-300">
              Procedural Web Audio engine generating realistic water stream babble, soft wind noise, light rain, and sporadic bird chirps.
            </p>
          </div>
          <AmbientSoundMixer />
        </div>
      )}

      {/* 4. NOSTALGIC FOCUS TIMER TAB */}
      {activeTab === 'timer' && (
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="glass-panel p-8 rounded-3xl border border-white/15 shadow-2xl space-y-6">
            <div className="flex items-center justify-center gap-2 text-purple-300">
              <Clock className="w-6 h-6" />
              <h3 className="font-semibold text-lg text-white">Nostalgic Focus Timer</h3>
            </div>

            <div className="text-6xl font-extrabold font-mono text-transparent bg-gradient-to-r from-purple-300 via-pink-200 to-indigo-300 bg-clip-text tracking-wider">
              {String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={toggleTimer}
                className="px-6 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm transition-all shadow-lg"
              >
                {isTimerActive ? 'Pause Session' : 'Start Focus'}
              </button>
              <button
                onClick={() => {
                  setIsTimerActive(false);
                  setTimerMinutes(25);
                  setTimerSeconds(0);
                }}
                className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-300 text-sm transition-all"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. ALL IN ONE MICRO APPS TAB */}
      {activeTab === 'apps' && (
        <div className="space-y-8">
          <div className="text-center max-w-lg mx-auto space-y-2">
            <h2 className="text-3xl font-bold text-white">All-In-One Micro Apps</h2>
            <p className="text-xs text-slate-400">Mini nostalgic utilities inside website</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-3xl space-y-4">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-300" /> Daily Nostalgic Quote
              </h3>
              <blockquote className="text-sm italic text-slate-300 border-l-2 border-purple-400 pl-3">
                "Music expresses that which cannot be said and on which it is impossible to be silent."
              </blockquote>
            </div>

            <div className="glass-panel p-6 rounded-3xl space-y-4">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Radio className="w-5 h-5 text-teal-300" /> Nature Frequency
              </h3>
              <p className="text-xs text-slate-300">
                Resonating at 432 Hz Solfeggio frequency for deep peace and inner harmony.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl space-y-4">
              <h3 className="font-bold text-white flex items-center gap-2">
                <Headphones className="w-5 h-5 text-pink-300" /> Soft Binaural Beat
              </h3>
              <p className="text-xs text-slate-300">
                Alpha waves integrated with ambient background for enhanced concentration and calm.
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

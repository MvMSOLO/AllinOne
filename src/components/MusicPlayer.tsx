import React, { useRef, useEffect, useState } from 'react';
import type { Track } from '../data/musicData';
import {
  Play, Pause, SkipBack, SkipForward, Volume2, VolumeX,
  Repeat, Shuffle, Heart, Sparkles, Disc
} from 'lucide-react';

interface MusicPlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  playlist: Track[];
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  currentTrack,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isLooping, setIsLooping] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.log('Audio playback error', err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume || 0.8;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 md:p-6">
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onNext}
        loop={isLooping}
      />

      <div className="max-w-6xl mx-auto glass-panel-glow rounded-3xl p-4 md:px-8 md:py-4 border border-purple-500/30 shadow-2xl backdrop-blur-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Track Info */}
        <div className="flex items-center gap-4 w-full md:w-1/3">
          <div className="relative group flex-shrink-0">
            <img
              src={currentTrack.albumCover}
              alt={currentTrack.title}
              className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl object-cover border border-white/20 shadow-lg ${
                isPlaying ? 'animate-pulse' : ''
              }`}
            />
            <div className={`absolute -inset-1 rounded-2xl bg-purple-500/30 blur-md -z-10 transition-opacity ${isPlaying ? 'opacity-100' : 'opacity-0'}`} />
          </div>

          <div className="min-w-0 flex-1">
            <h4 className="text-sm md:text-base font-semibold text-white truncate flex items-center gap-2">
              {currentTrack.title}
              {currentTrack.vocalType && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-normal">
                  {currentTrack.vocalType}
                </span>
              )}
            </h4>
            <p className="text-xs text-slate-300 truncate mt-0.5">{currentTrack.artist}</p>
          </div>

          <button
            onClick={() => setIsLiked(!isLiked)}
            className="p-2 text-slate-400 hover:text-pink-400 transition-colors"
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'text-pink-500 fill-pink-500' : ''}`} />
          </button>
        </div>

        {/* Center Player Controls & Progress */}
        <div className="flex flex-col items-center w-full md:w-2/5 gap-2">
          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsLooping(!isLooping)}
              className={`p-2 rounded-full text-xs transition-colors ${
                isLooping ? 'text-purple-400 bg-purple-500/20' : 'text-slate-400 hover:text-white'
              }`}
              title="Toggle Loop"
            >
              <Repeat className="w-4 h-4" />
            </button>

            <button
              onClick={onPrevious}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={onPlayPause}
              className="p-3.5 bg-gradient-to-tr from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 text-white rounded-full shadow-lg shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all"
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white translate-x-0.5" />}
            </button>

            <button
              onClick={onNext}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            <button
              onClick={onNext}
              className="p-2 text-slate-400 hover:text-white transition-colors"
              title="Shuffle Next"
            >
              <Shuffle className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Slider */}
          <div className="w-full flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span>{formatTime(currentTime)}</span>
            <div className="relative flex-1 flex items-center">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full accent-purple-400 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right Audio Visualizer & Volume */}
        <div className="hidden md:flex items-center justify-end gap-3 w-1/3">
          <div className="flex items-center gap-1 h-6 px-3 bg-purple-950/40 border border-purple-500/20 rounded-xl">
            <Disc className={`w-4 h-4 text-purple-400 ${isPlaying ? 'animate-spin' : ''}`} />
            <span className="text-[10px] text-purple-300 font-mono flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Nostalgic Vibe
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggleMute} className="text-slate-400 hover:text-white">
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={isMuted ? 0 : volume}
              onChange={handleVolume}
              className="w-20 accent-purple-400 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

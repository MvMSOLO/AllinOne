import React, { useState } from 'react';
import { ambientEngine } from '../utils/ambientAudio';
import { Volume2, VolumeX, Droplets, Wind, CloudRain, Bird } from 'lucide-react';

export const AmbientSoundMixer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(ambientEngine.getIsRunning());
  const [volumes, setVolumes] = useState(ambientEngine.volumes);

  const toggleSound = async () => {
    if (isPlaying) {
      ambientEngine.stop();
      setIsPlaying(false);
    } else {
      await ambientEngine.start();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (key: keyof typeof volumes, val: number) => {
    const updated = { ...volumes, [key]: val };
    setVolumes(updated);
    ambientEngine.setVolume(key, val);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl w-full max-w-md mx-auto text-slate-100 shadow-2xl transition-all">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-500/20 rounded-2xl border border-purple-500/30 text-purple-300">
            {isPlaying ? <Volume2 className="w-6 h-6 animate-pulse" /> : <VolumeX className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-white">Nostalgic Nature Mixer</h3>
            <p className="text-xs text-slate-400">Procedural Infinite Nature Ambience</p>
          </div>
        </div>

        <button
          onClick={toggleSound}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-lg ${
            isPlaying
              ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/30'
              : 'bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10'
          }`}
        >
          {isPlaying ? 'Pause Nature' : 'Play Nature'}
        </button>
      </div>

      <div className="space-y-4">
        {/* Master Volume */}
        <div className="bg-white/5 p-3.5 rounded-2xl border border-white/5">
          <div className="flex justify-between text-xs font-medium text-slate-300 mb-2">
            <span>Master Nature Volume</span>
            <span>{Math.round(volumes.master * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volumes.master}
            onChange={(e) => handleVolumeChange('master', parseFloat(e.target.value))}
            className="w-full accent-purple-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
          />
        </div>

        {/* Individual Sound Sliders */}
        <div className="grid grid-cols-2 gap-3">
          {/* Water */}
          <div className="bg-white/5 p-3 rounded-2xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-blue-400">
                <Droplets className="w-4 h-4" /> Water Stream
              </span>
              <span>{Math.round(volumes.water * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volumes.water}
              onChange={(e) => handleVolumeChange('water', parseFloat(e.target.value))}
              className="w-full accent-blue-400 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
            />
          </div>

          {/* Wind */}
          <div className="bg-white/5 p-3 rounded-2xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-teal-300">
                <Wind className="w-4 h-4" /> Gentle Wind
              </span>
              <span>{Math.round(volumes.wind * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volumes.wind}
              onChange={(e) => handleVolumeChange('wind', parseFloat(e.target.value))}
              className="w-full accent-teal-300 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
            />
          </div>

          {/* Rain */}
          <div className="bg-white/5 p-3 rounded-2xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-sky-300">
                <CloudRain className="w-4 h-4" /> Soft Rain
              </span>
              <span>{Math.round(volumes.rain * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volumes.rain}
              onChange={(e) => handleVolumeChange('rain', parseFloat(e.target.value))}
              className="w-full accent-sky-300 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
            />
          </div>

          {/* Birds */}
          <div className="bg-white/5 p-3 rounded-2xl border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-1.5 text-amber-300">
                <Bird className="w-4 h-4" /> Forest Birds
              </span>
              <span>{Math.round(volumes.birds * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volumes.birds}
              onChange={(e) => handleVolumeChange('birds', parseFloat(e.target.value))}
              className="w-full accent-amber-300 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

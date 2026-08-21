import React, { useState, useEffect } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Navbar } from './components/Navbar';
import { MainView } from './components/MainView';
import { MusicPlayer } from './components/MusicPlayer';
import { Footer } from './components/Footer';
import type { Track } from './data/musicData';
import { TOP_10_NOSTALGIC_TRACKS } from './data/musicData';
import { ambientEngine } from './utils/ambientAudio';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const handleCustomTabChange = (e: any) => {
      if (e.detail) {
        setActiveTab(e.detail);
      }
    };
    document.addEventListener('change-tab', handleCustomTabChange);
    return () => document.removeEventListener('change-tab', handleCustomTabChange);
  }, []);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(TOP_10_NOSTALGIC_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ambientPlaying, setAmbientPlaying] = useState(false);

  const handleSelectTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    if (!currentTrack) return;
    const currentIndex = TOP_10_NOSTALGIC_TRACKS.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % TOP_10_NOSTALGIC_TRACKS.length;
    setCurrentTrack(TOP_10_NOSTALGIC_TRACKS[nextIndex]);
    setIsPlaying(true);
  };

  const handlePreviousTrack = () => {
    if (!currentTrack) return;
    const currentIndex = TOP_10_NOSTALGIC_TRACKS.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + TOP_10_NOSTALGIC_TRACKS.length) % TOP_10_NOSTALGIC_TRACKS.length;
    setCurrentTrack(TOP_10_NOSTALGIC_TRACKS[prevIndex]);
    setIsPlaying(true);
  };

  const handleToggleAmbient = async () => {
    if (ambientPlaying) {
      ambientEngine.stop();
      setAmbientPlaying(false);
    } else {
      await ambientEngine.start();
      setAmbientPlaying(true);
    }
  };

  return (
    <div className="min-h-screen text-slate-100 relative font-sans selection:bg-purple-500 selection:text-white flex flex-col justify-between">
      {/* Three.js 3D Background Canvas with Seamless Video Crossfade Shader */}
      <BackgroundCanvas />

      {/* Modern All-in-One Top Navigation with Animated Drawer */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        ambientPlaying={ambientPlaying}
        toggleAmbient={handleToggleAmbient}
      />

      {/* Dynamic Main View Sections */}
      <MainView
        activeTab={activeTab}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onSelectTrack={handleSelectTrack}
        onTogglePlay={handleTogglePlay}
      />

      {/* Handcrafted Special Footer */}
      <Footer
        setActiveTab={setActiveTab}
        ambientPlaying={ambientPlaying}
        toggleAmbient={handleToggleAmbient}
      />

      {/* Floating Modern Audio Player Bar */}
      <MusicPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={handleTogglePlay}
        onNext={handleNextTrack}
        onPrevious={handlePreviousTrack}
        playlist={TOP_10_NOSTALGIC_TRACKS}
      />
    </div>
  );
};

export default App;

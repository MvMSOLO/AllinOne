import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Mic, Square, Upload, Play, Pause, Download, Send, Sliders, Music,
  Sparkles, RefreshCw, Zap, Disc, Headphones, Radio, Check
} from 'lucide-react';
import type { VoicePreset } from '../utils/voiceChangerEngine';
import {
  FEMALE_VOICE_PRESETS,
  SPECIAL_VOICE_PRESETS,
  ALL_VOICE_PRESETS,
  BACKING_BEATS,
  voiceEngine
} from '../utils/voiceChangerEngine';

export const VoiceChangerStudio: React.FC = () => {
  // Input Source Mode: 'mic' | 'upload' | 'demo'
  const [inputMode, setInputMode] = useState<'mic' | 'upload' | 'demo'>('mic');

  // Active Category Filter: 'all' | 'female' | 'special'
  const [activeCategory, setActiveCategory] = useState<'all' | 'female' | 'special'>('female');

  // Selected Preset
  const [selectedPreset, setSelectedPreset] = useState<VoicePreset>(FEMALE_VOICE_PRESETS[0]);

  // Fine-Tuning Audio Parameters
  const [customPitch, setCustomPitch] = useState<number>(FEMALE_VOICE_PRESETS[0].pitchSemiTones);
  const [customReverb, setCustomReverb] = useState<number>(FEMALE_VOICE_PRESETS[0].reverbLevel);
  const [customSpeed, setCustomSpeed] = useState<number>(FEMALE_VOICE_PRESETS[0].speedRate);
  const [customHighShelfGain, setCustomHighShelfGain] = useState<number>(FEMALE_VOICE_PRESETS[0].highShelfGain || 5);
  const [selectedBeatId, setSelectedBeatId] = useState<string>('none');
  const [beatVolume, setBeatVolume] = useState<number>(0.35);

  // Recording & Audio States
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioRawBuffer, setAudioRawBuffer] = useState<AudioBuffer | null>(null);
  const [processedBuffer, setProcessedBuffer] = useState<AudioBuffer | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlayingProcessed, setIsPlayingProcessed] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');

  // Audio Context & MediaRecorder References
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeSourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  // Update fine tuning sliders when preset changes
  useEffect(() => {
    setCustomPitch(selectedPreset.pitchSemiTones);
    setCustomReverb(selectedPreset.reverbLevel);
    setCustomSpeed(selectedPreset.speedRate);
    setCustomHighShelfGain(selectedPreset.highShelfGain || 5);
  }, [selectedPreset]);

  // Process Audio whenever raw buffer, selected preset, custom pitch, custom reverb, high-shelf gain, or beat changes (Strict 300ms Debounce)
  useEffect(() => {
    if (!audioRawBuffer) return;
    const timer = setTimeout(() => {
      processCurrentAudio();
    }, 300);
    return () => clearTimeout(timer);
  }, [audioRawBuffer, selectedPreset, customPitch, customReverb, customSpeed, customHighShelfGain, selectedBeatId, beatVolume]);

  // Load Demo Audio Sample
  const handleLoadDemoAudio = async () => {
    try {
      setIsProcessing(true);
      const ctx = voiceEngine.getAudioContext();
      const sampleRate = ctx.sampleRate;
      const duration = 4;
      const buffer = ctx.createBuffer(1, sampleRate * duration, sampleRate);
      const channel = buffer.getChannelData(0);

      // Generate melodic vocal synth preview
      for (let i = 0; i < buffer.length; i++) {
        const t = i / sampleRate;
        const freq = 300 + Math.sin(t * 8) * 80 + Math.sin(t * 3) * 40;
        const env = Math.sin((t / duration) * Math.PI);
        channel[i] = Math.sin(2 * Math.PI * freq * t) * 0.4 * env;
      }

      setAudioRawBuffer(buffer);
      setUploadedFileName('Demo Vocal Phrase');
      setIsProcessing(false);
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  // Start Live Microphone Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Determine best supported MIME type across browsers prioritizing opus webm
      const mimeTypes = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'];
      const supportedMime = mimeTypes.find(type => MediaRecorder.isTypeSupported(type)) || '';

      const mediaRecorder = supportedMime ? new MediaRecorder(stream, { mimeType: supportedMime }) : new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        try {
          const audioBlob = new Blob(audioChunksRef.current, { type: supportedMime || 'audio/webm;codecs=opus' });
          const arrayBuffer = await audioBlob.arrayBuffer();
          const ctx = voiceEngine.getAudioContext();
          const decodedBuffer = await ctx.decodeAudioData(arrayBuffer);
          setAudioRawBuffer(decodedBuffer);
          setUploadedFileName('Mic Voice Recording');
        } catch (err) {
          alert('Error decoding recorded audio: ' + err);
        } finally {
          stream.getTracks().forEach((track) => track.stop());
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      alert('Microphone access denied or unavailable: ' + err);
    }
  };

  // Stop Microphone Recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerIntervalRef.current);
    }
  };

  // File Uploader Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      setUploadedFileName(file.name);
      const arrayBuffer = await file.arrayBuffer();
      const ctx = voiceEngine.getAudioContext();
      const decodedBuffer = await ctx.decodeAudioData(arrayBuffer);
      setAudioRawBuffer(decodedBuffer);
      setIsProcessing(false);
    } catch (err) {
      alert('Error loading audio file: ' + err);
      setIsProcessing(false);
    }
  };

  // Process raw buffer through voice engine DSP & Realism Filters
  const processCurrentAudio = async () => {
    if (!audioRawBuffer) return;
    setIsProcessing(true);
    try {
      // Create beat buffer if beat selected
      let beatBuffer: AudioBuffer | null = null;
      if (selectedBeatId !== 'none') {
        const beatDuration = Math.max(audioRawBuffer.duration, 10);
        beatBuffer = voiceEngine.createProceduralBeat(selectedBeatId, beatDuration);
      }

      const overridePreset: VoicePreset = {
        ...selectedPreset,
        pitchSemiTones: customPitch,
        reverbLevel: customReverb,
        speedRate: customSpeed,
        highShelfGain: customHighShelfGain
      };

      const resultBuffer = await voiceEngine.processAudio(
        audioRawBuffer,
        overridePreset,
        customPitch,
        beatBuffer,
        beatVolume,
        customHighShelfGain
      );

      setProcessedBuffer(resultBuffer);
      drawWaveform(resultBuffer);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Play / Pause Processed Voice
  const togglePlayProcessed = () => {
    if (!processedBuffer) return;

    if (isPlayingProcessed) {
      if (activeSourceNodeRef.current) {
        try {
          activeSourceNodeRef.current.stop();
        } catch {
          // ignore if already stopped
        }
        activeSourceNodeRef.current = null;
      }
      setIsPlayingProcessed(false);
    } else {
      const ctx = voiceEngine.getAudioContext();
      const source = ctx.createBufferSource();
      source.buffer = processedBuffer;
      source.connect(ctx.destination);
      source.onended = () => setIsPlayingProcessed(false);
      source.start();
      activeSourceNodeRef.current = source;
      setIsPlayingProcessed(true);
    }
  };

  // Draw Audio Waveform onto Canvas
  const drawWaveform = (buffer: AudioBuffer) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const data = buffer.getChannelData(0);
    const step = Math.ceil(data.length / width);

    ctx.clearRect(0, 0, width, height);
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, '#c084fc');
    gradient.addColorStop(0.5, '#f472b6');
    gradient.addColorStop(1, '#818cf8');

    ctx.fillStyle = gradient;
    ctx.beginPath();

    for (let i = 0; i < width; i++) {
      let min = 1.0;
      let max = -1.0;
      for (let j = 0; j < step; j++) {
        const datum = data[i * step + j];
        if (datum < min) min = datum;
        if (datum > max) max = datum;
      }
      const y1 = ((1 + min) * height) / 2;
      const y2 = ((1 + max) * height) / 2;
      ctx.fillRect(i, y1, 2, Math.max(2, y2 - y1));
    }
  };

  // Download File Utility
  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadWav = () => {
    if (!processedBuffer) return;
    const wavBlob = voiceEngine.bufferToWav(processedBuffer);
    downloadBlob(wavBlob, `${selectedPreset.id}_voice_changed.wav`);
  };

  const handleDownloadTelegramVoice = () => {
    if (!processedBuffer) return;
    const tgBlob = voiceEngine.bufferToTelegramVoiceBlob(processedBuffer);
    downloadBlob(tgBlob, `${selectedPreset.id}_telegram_voice.wav`);
  };

  const currentPresetList =
    activeCategory === 'female'
      ? FEMALE_VOICE_PRESETS
      : activeCategory === 'special'
      ? SPECIAL_VOICE_PRESETS
      : ALL_VOICE_PRESETS;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-mono uppercase tracking-widest shadow-lg">
          <Zap className="w-4 h-4 text-amber-300 animate-bounce" /> 40 Pro Realism Voice Changer Studio
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Transform Your Voice into <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent">Frighteningly Realistic Female Voices</span>
        </h1>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Hybrid Web Audio API + Cloud AI Architecture with Tone.js Low-Cut filter, High-Shelf Brightness, and Micro-Room Reverb for 0% suspicion of an edited voice.
        </p>
      </div>

      {/* Main Studio Interface Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Input Source & Live Controls & Backing Beat Studio (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Input Source Mode Selection */}
          <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Radio className="w-5 h-5 text-purple-400" /> 1. Select Audio Input
              </h3>
              <span className="text-[11px] font-mono text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                Opus 48kHz HD
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-slate-900/60 p-1.5 rounded-2xl border border-white/10">
              <button
                onClick={() => setInputMode('mic')}
                className={`py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                  inputMode === 'mic'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Mic className="w-4 h-4" /> Live Mic
              </button>
              <button
                onClick={() => setInputMode('upload')}
                className={`py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                  inputMode === 'upload'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Upload className="w-4 h-4" /> Upload File
              </button>
              <button
                onClick={() => {
                  setInputMode('demo');
                  handleLoadDemoAudio();
                }}
                className={`py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                  inputMode === 'demo'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4" /> Demo
              </button>
            </div>

            {/* Microphone Recording Panel */}
            {inputMode === 'mic' && (
              <div className="text-center space-y-4 py-4 bg-white/5 rounded-2xl border border-white/5 p-4">
                <div className="relative inline-flex items-center justify-center">
                  {isRecording && (
                    <motion.div
                      animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0.2, 0.6] }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                      className="absolute inset-0 bg-red-500/40 rounded-full blur-md"
                    />
                  )}
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 ${
                      isRecording
                        ? 'bg-red-600 text-white shadow-red-500/50'
                        : 'bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-600 text-white shadow-purple-500/40'
                    }`}
                  >
                    {isRecording ? <Square className="w-8 h-8 fill-white" /> : <Mic className="w-8 h-8" />}
                  </button>
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    {isRecording ? 'Recording Voice in Opus Codec...' : 'Click to Speak'}
                  </p>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    {isRecording ? `00:${String(recordingTime).padStart(2, '0')}` : 'Say anything to convert into female voice'}
                  </p>
                </div>
              </div>
            )}

            {/* File Upload Panel */}
            {inputMode === 'upload' && (
              <div className="border-2 border-dashed border-purple-500/40 rounded-2xl p-6 text-center hover:border-purple-400 transition-all bg-white/5 space-y-3">
                <Upload className="w-8 h-8 text-purple-400 mx-auto" />
                <div>
                  <p className="text-sm font-semibold text-white">Upload Dictaphone / Music File</p>
                  <p className="text-xs text-slate-400 mt-0.5">Supports MP3, WAV, M4A, OGG up to 50MB</p>
                </div>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="voice-file-upload"
                />
                <label
                  htmlFor="voice-file-upload"
                  className="inline-block px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold cursor-pointer shadow-lg transition-all"
                >
                  Select Audio File
                </label>
              </div>
            )}

            {uploadedFileName && (
              <div className="flex items-center justify-between text-xs font-mono text-purple-200 bg-purple-500/20 px-3.5 py-2 rounded-xl border border-purple-500/30">
                <span className="truncate">Loaded: {uploadedFileName}</span>
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              </div>
            )}
          </div>

          {/* Song Maker: Backing Instrumental Beat Selection */}
          <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Music className="w-4 h-4 text-pink-400" /> Song Maker: Backing Instrumental Beat
              </h3>
              <span className="text-[10px] text-pink-300 bg-pink-500/20 px-2 py-0.5 rounded-full font-mono">
                Auto Mix
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedBeatId('none')}
                className={`p-3 rounded-xl text-left border text-xs transition-all ${
                  selectedBeatId === 'none'
                    ? 'bg-purple-600/30 border-purple-400 text-white shadow-md'
                    : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-semibold text-white">No Beat (Voice Only)</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Pure vocal output</div>
              </button>

              {BACKING_BEATS.map((beat) => (
                <button
                  key={beat.id}
                  onClick={() => setSelectedBeatId(beat.id)}
                  className={`p-3 rounded-xl text-left border text-xs transition-all ${
                    selectedBeatId === beat.id
                      ? 'bg-gradient-to-r from-purple-900/80 to-pink-900/80 border-purple-400 text-white shadow-md'
                      : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-semibold text-white flex items-center gap-1">
                    <span>{beat.icon}</span> <span>{beat.name}</span>
                  </div>
                  <div className="text-[10px] text-purple-300 mt-0.5 font-mono">
                    {beat.genre} • {beat.bpm} BPM
                  </div>
                </button>
              ))}
            </div>

            {selectedBeatId !== 'none' && (
              <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1.5 pt-3">
                <div className="flex justify-between text-xs text-slate-300 font-medium">
                  <span>Beat Mix Volume</span>
                  <span>{Math.round(beatVolume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={beatVolume}
                  onChange={(e) => setBeatVolume(parseFloat(e.target.value))}
                  className="w-full accent-pink-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
                />
              </div>
            )}
          </div>

          {/* Custom Voice Tuning Controls */}
          <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Sliders className="w-4 h-4 text-purple-400" /> Studio Realism Fine-Tuner
              </h3>
              <button
                onClick={() => {
                  setCustomPitch(selectedPreset.pitchSemiTones);
                  setCustomReverb(selectedPreset.reverbLevel);
                  setCustomSpeed(selectedPreset.speedRate);
                  setCustomHighShelfGain(selectedPreset.highShelfGain || 5);
                }}
                className="text-[10px] text-purple-300 hover:text-white flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {/* Pitch Fine-Tune Slider */}
              <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1.5">
                <div className="flex justify-between text-slate-300 font-medium">
                  <span>Pitch Shift (Granular)</span>
                  <span className="font-mono text-purple-300">
                    {customPitch > 0 ? `+${customPitch}` : customPitch} st
                  </span>
                </div>
                <input
                  type="range"
                  min="-12"
                  max="12"
                  step="0.5"
                  value={customPitch}
                  onChange={(e) => setCustomPitch(parseFloat(e.target.value))}
                  className="w-full accent-purple-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
                />
              </div>

              {/* High-Shelf Gain (Sibilance/Air Boost at 4000Hz) Slider */}
              <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1.5">
                <div className="flex justify-between text-slate-300 font-medium">
                  <span>Tone.js High-Shelf Air Gain (4000Hz)</span>
                  <span className="font-mono text-amber-300">+{customHighShelfGain} dB</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="0.5"
                  value={customHighShelfGain}
                  onChange={(e) => setCustomHighShelfGain(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
                />
              </div>

              {/* Reverb Level Slider */}
              <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1.5">
                <div className="flex justify-between text-slate-300 font-medium">
                  <span>Micro-Room Reverb Mix</span>
                  <span className="font-mono text-pink-300">{Math.round(customReverb * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={customReverb}
                  onChange={(e) => setCustomReverb(parseFloat(e.target.value))}
                  className="w-full accent-pink-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
                />
              </div>

              {/* Speed Rate Slider */}
              <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1.5">
                <div className="flex justify-between text-slate-300 font-medium">
                  <span>Speed Rate</span>
                  <span className="font-mono text-indigo-300">{customSpeed.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.05"
                  value={customSpeed}
                  onChange={(e) => setCustomSpeed(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-1.5 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 40 Voice Presets Grid & Player Visualizer (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Audio Output Visualizer & Exporter Panel */}
          <div className="glass-panel p-6 rounded-3xl border border-purple-500/40 shadow-2xl space-y-5 relative overflow-hidden bg-slate-950/80">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <Disc className={`w-5 h-5 text-purple-400 ${isPlayingProcessed ? 'animate-spin' : ''}`} />
                <h3 className="font-bold text-white text-base">2. Converted Voice Preview</h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Preset: <strong className="text-purple-300">{selectedPreset.name}</strong>
              </span>
            </div>

            {/* Waveform Canvas */}
            <div className="relative bg-slate-900/80 rounded-2xl p-4 border border-purple-500/20 overflow-hidden min-h-[110px] flex items-center justify-center">
              <canvas ref={canvasRef} width={600} height={80} className="w-full h-20" />
              {!processedBuffer && !isProcessing && (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-400 font-mono">
                  Record microphone or upload file to generate voice preview
                </div>
              )}
              {isProcessing && (
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center text-xs text-purple-300 font-mono gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" /> Processing AI Voice Realism Filter...
                </div>
              )}
            </div>

            {/* Play & Export Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={togglePlayProcessed}
                disabled={!processedBuffer || isProcessing}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold text-xs shadow-xl transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                {isPlayingProcessed ? (
                  <>
                    <Pause className="w-4 h-4 fill-white" /> Pause Preview
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" /> Play Converted Voice
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadTelegramVoice}
                  disabled={!processedBuffer || isProcessing}
                  className="px-4 py-3 rounded-2xl bg-teal-600/30 hover:bg-teal-500 text-teal-200 hover:text-white border border-teal-500/40 text-xs font-semibold shadow-lg transition-all flex items-center gap-1.5"
                  title="Export as Telegram Voice Note"
                >
                  <Send className="w-4 h-4" /> Telegram Voice (.OGG)
                </button>

                <button
                  onClick={handleDownloadWav}
                  disabled={!processedBuffer || isProcessing}
                  className="px-4 py-3 rounded-2xl bg-purple-600/30 hover:bg-purple-500 text-purple-200 hover:text-white border border-purple-500/40 text-xs font-semibold shadow-lg transition-all flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" /> Download WAV
                </button>
              </div>
            </div>
          </div>

          {/* Voice Presets Selector Container */}
          <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 shadow-2xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-pink-400" /> 3. Voice Preset Models (40 Total)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  20 Female Voices & 20 Special Effects Voices
                </p>
              </div>

              {/* Category Tabs */}
              <div className="flex items-center gap-1 bg-slate-900/60 p-1 rounded-full border border-white/10 self-start sm:self-auto">
                <button
                  onClick={() => setActiveCategory('female')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeCategory === 'female'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🌸 20 Female Voices
                </button>
                <button
                  onClick={() => setActiveCategory('special')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeCategory === 'special'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ⚡ 20 Special Voices
                </button>
                <button
                  onClick={() => setActiveCategory('all')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeCategory === 'all'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All 40
                </button>
              </div>
            </div>

            {/* Grid of Voice Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
              {currentPresetList.map((preset) => {
                const isSelected = selectedPreset.id === preset.id;
                return (
                  <motion.div
                    key={preset.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedPreset(preset)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-300 relative flex items-start gap-3 ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-900/90 via-indigo-900/80 to-slate-900 border-purple-400 shadow-xl shadow-purple-950/60'
                        : 'bg-white/5 border-white/5 hover:border-purple-400/40 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-2xl p-2.5 bg-white/5 rounded-xl border border-white/10 flex-shrink-0">
                      {preset.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white truncate">{preset.name}</h4>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-300 line-clamp-2 mt-0.5 leading-tight">
                        {preset.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2 font-mono text-[9px] text-purple-300">
                        <span>Pitch: {preset.pitchSemiTones > 0 ? `+${preset.pitchSemiTones}` : preset.pitchSemiTones}st</span>
                        <span>Air: +{preset.highShelfGain || 5}dB</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

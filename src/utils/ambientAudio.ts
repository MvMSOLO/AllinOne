// Web Audio API Procedural Ambient Sound Generator

export class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;

  // Master Gain
  private masterGain: GainNode | null = null;

  // Sound Channels
  private waterGain: GainNode | null = null;
  private windGain: GainNode | null = null;
  private rainGain: GainNode | null = null;
  private birdsGain: GainNode | null = null;

  // Timer for bird chirps
  private birdInterval: number | null = null;

  // Volume state cache (0 to 1)
  public volumes = {
    master: 0.8,
    water: 0.6,
    wind: 0.4,
    rain: 0.3,
    birds: 0.5,
  };

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volumes.master, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    this.setupWaterChannel();
    this.setupWindChannel();
    this.setupRainChannel();
    this.setupBirdsChannel();
  }

  public async start() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }
    this.isRunning = true;
    this.startBirdChirps();
  }

  public stop() {
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend();
    }
    this.isRunning = false;
    if (this.birdInterval) {
      clearInterval(this.birdInterval);
      this.birdInterval = null;
    }
  }

  public setVolume(channel: keyof typeof this.volumes, val: number) {
    this.volumes[channel] = val;
    if (!this.ctx) return;

    const time = this.ctx.currentTime + 0.05;
    if (channel === 'master' && this.masterGain) {
      this.masterGain.gain.linearRampToValueAtTime(val, time);
    } else if (channel === 'water' && this.waterGain) {
      this.waterGain.gain.linearRampToValueAtTime(val, time);
    } else if (channel === 'wind' && this.windGain) {
      this.windGain.gain.linearRampToValueAtTime(val, time);
    } else if (channel === 'rain' && this.rainGain) {
      this.rainGain.gain.linearRampToValueAtTime(val, time);
    } else if (channel === 'birds' && this.birdsGain) {
      this.birdsGain.gain.linearRampToValueAtTime(val, time);
    }
  }

  // 1. Water Stream Generator (Pink noise + lowpass filter + slow LFO modulation)
  private setupWaterChannel() {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11;
      b6 = white * 0.115926;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Water Lowpass Filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, this.ctx.currentTime);

    // LFO for gentle babbling water ripple
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.25, this.ctx.currentTime); // 0.25 Hz wave
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(150, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    this.waterGain = this.ctx.createGain();
    this.waterGain.gain.setValueAtTime(this.volumes.water, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(this.waterGain);
    this.waterGain.connect(this.masterGain);

    whiteNoise.start();
    lfo.start();
  }

  // 2. Gentle Wind Generator (Filtered noise + ultra-slow modulating bandpass)
  private setupWindChannel() {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(280, this.ctx.currentTime);
    bandpass.Q.setValueAtTime(3.0, this.ctx.currentTime);

    // Wind gust LFO
    const windLFO = this.ctx.createOscillator();
    windLFO.frequency.setValueAtTime(0.08, this.ctx.currentTime); // slow gusting
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(120, this.ctx.currentTime);

    windLFO.connect(lfoGain);
    lfoGain.connect(bandpass.frequency);

    this.windGain = this.ctx.createGain();
    this.windGain.gain.setValueAtTime(this.volumes.wind, this.ctx.currentTime);

    noise.connect(bandpass);
    bandpass.connect(this.windGain);
    this.windGain.connect(this.masterGain);

    noise.start();
    windLFO.start();
  }

  // 3. Rain Sound Generator (High-pass + low-pass filtered white noise)
  private setupRainChannel() {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    const highpass = this.ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(800, this.ctx.currentTime);

    const lowpass = this.ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(3500, this.ctx.currentTime);

    this.rainGain = this.ctx.createGain();
    this.rainGain.gain.setValueAtTime(this.volumes.rain, this.ctx.currentTime);

    noise.connect(highpass);
    highpass.connect(lowpass);
    lowpass.connect(this.rainGain);
    this.rainGain.connect(this.masterGain);

    noise.start();
  }

  // 4. Occasional Natural Bird Chirp Synthesizer
  private setupBirdsChannel() {
    if (!this.ctx || !this.masterGain) return;

    this.birdsGain = this.ctx.createGain();
    this.birdsGain.gain.setValueAtTime(this.volumes.birds, this.ctx.currentTime);
    this.birdsGain.connect(this.masterGain);
  }

  private startBirdChirps() {
    if (this.birdInterval) clearInterval(this.birdInterval);

    this.birdInterval = window.setInterval(() => {
      if (this.isRunning && Math.random() > 0.45) {
        this.playBirdChirp();
      }
    }, 6000); // Check every 6 seconds for sporadic sweet chirps
  }

  private playBirdChirp() {
    if (!this.ctx || !this.birdsGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const chirpGain = this.ctx.createGain();

    osc.type = 'sine';

    // Frequency sweep for bird call
    const baseFreq = 2200 + Math.random() * 800;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq + 600, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(baseFreq - 300, now + 0.16);
    osc.frequency.exponentialRampToValueAtTime(baseFreq + 400, now + 0.24);

    // Envelope
    chirpGain.gain.setValueAtTime(0, now);
    chirpGain.gain.linearRampToValueAtTime(0.2, now + 0.03);
    chirpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(chirpGain);
    chirpGain.connect(this.birdsGain);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  public getIsRunning() {
    return this.isRunning;
  }
}

export const ambientEngine = new AmbientAudioEngine();

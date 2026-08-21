import * as Tone from 'tone';

// Web Audio API + Fish Audio AI Hybrid Voice Processing Engine
// Supporting 20 Female Voice Presets, 20 Special FX Presets, Tone.js Post-Processing Realism Filter & Telegram Voice Export.

export interface VoicePreset {
  id: string;
  name: string;
  category: 'female' | 'special';
  description: string;
  icon: string;
  pitchSemiTones: number; // -12 to +12 semitones
  formantShift: number; // 0.5 to 2.0 formant scale
  speedRate: number; // 0.5 to 1.5 playback speed
  reverbLevel: number; // 0 to 1 wet mix
  delayLevel: number; // 0 to 1 wet mix
  distortion: number; // 0 to 1 drive
  eqBass: number; // -12 to +12 dB
  eqTreble: number; // -12 to +12 dB
  autotune: boolean;
  robotMod: boolean;
  telephoneFilter: boolean;
  underwaterFilter: boolean;
  highShelfGain?: number; // dB boost at 4000Hz (default +5dB)
}

export const FEMALE_VOICE_PRESETS: VoicePreset[] = [
  {
    id: 'anime_girl',
    name: 'Anime Girl (Sweet Idol)',
    category: 'female',
    description: 'High pitched, sweet anime idol tone with soft formant shift and bright air.',
    icon: '✨',
    pitchSemiTones: 6,
    formantShift: 1.3,
    speedRate: 1.0,
    reverbLevel: 0.15,
    delayLevel: 0.05,
    distortion: 0,
    eqBass: -4,
    eqTreble: 6,
    autotune: false,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false,
    highShelfGain: 6
  },
  {
    id: 'sweet_pop_female',
    name: 'Sweet Pop Singer',
    category: 'female',
    description: 'Silky smooth vocal preset tuned for catchy melodic pop tracks.',
    icon: '🎤',
    pitchSemiTones: 3,
    formantShift: 1.15,
    speedRate: 1.0,
    reverbLevel: 0.35,
    delayLevel: 0.15,
    distortion: 0,
    eqBass: -2,
    eqTreble: 4,
    autotune: true,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false,
    highShelfGain: 5
  },
  {
    id: 'soft_whisper_female',
    name: 'Soft Whisper Girl',
    category: 'female',
    description: 'Intimate, gentle breathy whisper effect with crisp high end.',
    icon: '🌸',
    pitchSemiTones: 2,
    formantShift: 1.1,
    speedRate: 1.0,
    reverbLevel: 0.25,
    delayLevel: 0.0,
    distortion: 0,
    eqBass: -6,
    eqTreble: 8,
    autotune: false,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false,
    highShelfGain: 7
  },
  {
    id: 'deep_boss_female',
    name: 'Deep Female Boss',
    category: 'female',
    description: 'Confident, sultry, deep executive female tone with warm resonance.',
    icon: '👑',
    pitchSemiTones: 1,
    formantShift: 0.95,
    speedRate: 1.0,
    reverbLevel: 0.2,
    delayLevel: 0.0,
    distortion: 0,
    eqBass: 3,
    eqTreble: 2,
    autotune: false,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false,
    highShelfGain: 4
  },
  {
    id: 'cute_chibi',
    name: 'Cute Chibi Girl',
    category: 'female',
    description: 'Ultra cute, energetic high-octave chibi voice.',
    icon: '🎀',
    pitchSemiTones: 7,
    formantShift: 1.4,
    speedRate: 1.0,
    reverbLevel: 0.1,
    delayLevel: 0.1,
    distortion: 0,
    eqBass: -5,
    eqTreble: 7,
    autotune: false,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false,
    highShelfGain: 6
  },
  {
    id: 'cyberpunk_android_girl',
    name: 'Cyberpunk Android Girl',
    category: 'female',
    description: 'Futuristic synth female AI agent voice with subtle ring modulation.',
    icon: '🤖',
    pitchSemiTones: 3,
    formantShift: 1.2,
    speedRate: 1.0,
    reverbLevel: 0.3,
    delayLevel: 0.2,
    distortion: 0.1,
    eqBass: 0,
    eqTreble: 5,
    autotune: false,
    robotMod: true,
    telephoneFilter: false,
    underwaterFilter: false,
    highShelfGain: 5
  },
  {
    id: 'operatic_female',
    name: 'Operatic Female Soprano',
    category: 'female',
    description: 'Grand soprano vocal resonance with deep concert hall reverb.',
    icon: '🎭',
    pitchSemiTones: 5,
    formantShift: 1.25,
    speedRate: 1.0,
    reverbLevel: 0.65,
    delayLevel: 0.2,
    distortion: 0,
    eqBass: 1,
    eqTreble: 5,
    autotune: true,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false,
    highShelfGain: 5
  },
  {
    id: 'vintage_jazz_female',
    name: '1920s Vintage Jazz Singer',
    category: 'female',
    description: 'Warm vintage vinyl radio record vocal tone.',
    icon: '🎷',
    pitchSemiTones: 2,
    formantShift: 1.05,
    speedRate: 1.0,
    reverbLevel: 0.3,
    delayLevel: 0.1,
    distortion: 0.15,
    eqBass: -2,
    eqTreble: -2,
    autotune: false,
    robotMod: false,
    telephoneFilter: true,
    underwaterFilter: false,
    highShelfGain: 3
  },
  {
    id: 'gothic_siren',
    name: 'Gothic Siren',
    category: 'female',
    description: 'Mysterious, haunting ethereal female tone with wide echo.',
    icon: '🦇',
    pitchSemiTones: 2,
    formantShift: 1.1,
    speedRate: 1.0,
    reverbLevel: 0.55,
    delayLevel: 0.3,
    distortion: 0,
    eqBass: 2,
    eqTreble: 3,
    autotune: false,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false,
    highShelfGain: 5
  },
  {
    id: 'kpop_female_idol',
    name: 'K-Pop Idol Female',
    category: 'female',
    description: 'Punchy studio auto-tuned idol vocal preset.',
    icon: '💖',
    pitchSemiTones: 4,
    formantShift: 1.2,
    speedRate: 1.0,
    reverbLevel: 0.25,
    delayLevel: 0.15,
    distortion: 0,
    eqBass: -1,
    eqTreble: 6,
    autotune: true,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false,
    highShelfGain: 6
  },
  {
    id: 'fairy_goddess',
    name: 'Fairy Goddess',
    category: 'female',
    description: 'High shimmer angelic voice with magical delay tails.',
    icon: '🧚‍♀️',
    pitchSemiTones: 7,
    formantShift: 1.35,
    speedRate: 1.0,
    reverbLevel: 0.7,
    delayLevel: 0.35,
    distortion: 0,
    eqBass: -4,
    eqTreble: 8,
    autotune: false,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false,
    highShelfGain: 7
  },
  {
    id: 'radio_hostess',
    name: 'Radio Hostess',
    category: 'female',
    description: 'Crisp, broadcast compressed radio DJ tone.',
    icon: '🎙️',
    pitchSemiTones: 1.5,
    formantShift: 1.05,
    speedRate: 1.0,
    reverbLevel: 0.1,
    delayLevel: 0.0,
    distortion: 0.02,
    eqBass: 2,
    eqTreble: 4,
    autotune: false,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false,
    highShelfGain: 5
  },
  {
    id: 'energetic_gamer_girl',
    name: 'Energetic Gamer Girl',
    category: 'female',
    description: 'Bright, lively streamer girl vocal preset.',
    icon: '🎮',
    pitchSemiTones: 4,
    formantShift: 1.2,
    speedRate: 1.0,
    reverbLevel: 0.15,
    delayLevel: 0.05,
    distortion: 0,
    eqBass: -2,
    eqTreble: 5,
    autotune: false,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false,
    highShelfGain: 6
  },
  {
    id: 'dreamy_lofi_female',
    name: 'Dreamy Lofi Vocal',
    category: 'female',
    description: 'Warm, mellow nostalgic lofi chill voice.',
    icon: '🌙',
    pitchSemiTones: 2,
    formantShift: 1.1,
    speedRate: 1.0,
    reverbLevel: 0.4,
    delayLevel: 0.2,
    distortion: 0.05,
    eqBass: 2,
    eqTreble: -1,
    autotune: false,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false,
    highShelfGain: 4
  },
  {
    id: 'vampire_queen',
    name: 'Vampire Queen',
    category: 'female',
    description: 'Dark, commanding, royal gothic female tone.',
    icon: '🍷',
    pitchSemiTones: 1,
    formantShift: 0.98,
    speedRate: 1.0,
    reverbLevel: 0.45,
    delayLevel: 0.1,
    distortion: 0,
    eqBass: 4,
    eqTreble: 1,
    autotune: false,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false,
    highShelfGain: 4
  },
  {
    id: 'elf_princess',
    name: 'Elf Princess',
    category: 'female',
    description: 'Silky, pure fantasy elven voice with shimmer resonance.',
    icon: '🧝‍♀️',
    pitchSemiTones: 5,
    formantShift: 1.25,
    speedRate: 1.0,
    reverbLevel: 0.5,
    delayLevel: 0.15,
    distortion: 0,
    eqBass: -3,
    eqTreble: 6,
    autotune: false,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false,
    highShelfGain: 6
  },
  {
    id: 'news_anchor_female',
    name: 'News Anchor Female',
    category: 'female',
    description: 'Clear, studio-mastered television news broadcast voice.',
    icon: '📺',
    pitchSemiTones: 1.5,
    formantShift: 1.02,
    speedRate: 1.0,
    reverbLevel: 0.05,
    delayLevel: 0.0,
    distortion: 0,
    eqBass: 1,
    eqTreble: 3,
    autotune: false,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false,
    highShelfGain: 5
  },
  {
    id: 'soft_asmr_female',
    name: 'Soft ASMR Girl',
    category: 'female',
    description: 'Ultra close-microphone whisper tuned for tingling relaxation.',
    icon: '🎧',
    pitchSemiTones: 1,
    formantShift: 1.08,
    speedRate: 1.0,
    reverbLevel: 0.1,
    delayLevel: 0.0,
    distortion: 0,
    eqBass: -6,
    eqTreble: 9,
    autotune: false,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false,
    highShelfGain: 8
  },
  {
    id: 'retro_8bit_girl',
    name: 'Retro 8-Bit Arcade Girl',
    category: 'female',
    description: 'Nostalgic bitcrushed retro video game character voice.',
    icon: '👾',
    pitchSemiTones: 5,
    formantShift: 1.3,
    speedRate: 1.0,
    reverbLevel: 0.1,
    delayLevel: 0.2,
    distortion: 0.35,
    eqBass: -3,
    eqTreble: 4,
    autotune: false,
    robotMod: true,
    telephoneFilter: false,
    underwaterFilter: false,
    highShelfGain: 4
  },
  {
    id: 'chill_rnb_female',
    name: 'Chill R&B Songstress',
    category: 'female',
    description: 'Smooth, soul-infused vocal preset with rich resonance.',
    icon: '🎵',
    pitchSemiTones: 2,
    formantShift: 1.12,
    speedRate: 1.0,
    reverbLevel: 0.35,
    delayLevel: 0.1,
    distortion: 0,
    eqBass: 1,
    eqTreble: 4,
    autotune: true,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false,
    highShelfGain: 5
  }
];

export const SPECIAL_VOICE_PRESETS: VoicePreset[] = [
  {
    id: 'cyberpunk_robot',
    name: 'Cyberpunk Cyborg',
    category: 'special',
    description: 'Metallic robot voice with ring modulation and robotic buzz.',
    icon: '🤖',
    pitchSemiTones: -2,
    formantShift: 0.9,
    speedRate: 1.0,
    reverbLevel: 0.25,
    delayLevel: 0.15,
    distortion: 0.25,
    eqBass: 2,
    eqTreble: 2,
    autotune: false,
    robotMod: true,
    telephoneFilter: false,
    underwaterFilter: false
  },
  {
    id: 'deep_monster',
    name: 'Deep Cave Monster',
    category: 'special',
    description: 'Sub-bass monster voice with booming cavern reverb.',
    icon: '👹',
    pitchSemiTones: -7,
    formantShift: 0.7,
    speedRate: 1.0,
    reverbLevel: 0.6,
    delayLevel: 0.25,
    distortion: 0.15,
    eqBass: 8,
    eqTreble: -2,
    autotune: false,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false
  },
  {
    id: 'alien_x',
    name: 'Alien X Communicator',
    category: 'special',
    description: 'Extraterrestrial tremolo modulation effect.',
    icon: '👽',
    pitchSemiTones: 3,
    formantShift: 1.2,
    speedRate: 1.0,
    reverbLevel: 0.4,
    delayLevel: 0.3,
    distortion: 0.1,
    eqBass: -2,
    eqTreble: 5,
    autotune: false,
    robotMod: true,
    telephoneFilter: false,
    underwaterFilter: false
  },
  {
    id: 'alvin_chipmunk',
    name: 'Chipmunk Squeak',
    category: 'special',
    description: 'High octave chipmunk voice effect with granular pitch shift.',
    icon: '🐿️',
    pitchSemiTones: 8,
    formantShift: 1.5,
    speedRate: 1.0,
    reverbLevel: 0.05,
    delayLevel: 0.05,
    distortion: 0,
    eqBass: -6,
    eqTreble: 6,
    autotune: false,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false
  },
  {
    id: 'movie_trailer_guy',
    name: 'Deep Movie Trailer Guy',
    category: 'special',
    description: 'In a world... Cinema epic bass baritone narrator voice.',
    icon: '🎬',
    pitchSemiTones: -5,
    formantShift: 0.82,
    speedRate: 1.0,
    reverbLevel: 0.3,
    delayLevel: 0.1,
    distortion: 0.05,
    eqBass: 7,
    eqTreble: 1,
    autotune: false,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false
  },
  {
    id: 'old_telephone',
    name: 'Vintage Telephone Call',
    category: 'special',
    description: 'Bandpass filtered 1950s telephone line voice.',
    icon: '☎️',
    pitchSemiTones: 0,
    formantShift: 1.0,
    speedRate: 1.0,
    reverbLevel: 0.05,
    delayLevel: 0.0,
    distortion: 0.3,
    eqBass: -10,
    eqTreble: -5,
    autotune: false,
    robotMod: false,
    telephoneFilter: true,
    underwaterFilter: false
  },
  {
    id: 'fm_radio_dj',
    name: 'FM Radio Megahit DJ',
    category: 'special',
    description: 'Super compressed broadcast radio voice with bass warmth.',
    icon: '📻',
    pitchSemiTones: -1,
    formantShift: 0.95,
    speedRate: 1.0,
    reverbLevel: 0.15,
    delayLevel: 0.05,
    distortion: 0.05,
    eqBass: 5,
    eqTreble: 4,
    autotune: false,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false
  },
  {
    id: 'megaphone_horn',
    name: 'Police Megaphone',
    category: 'special',
    description: 'Overdriven horn megaphone alert effect.',
    icon: '📢',
    pitchSemiTones: 1,
    formantShift: 1.05,
    speedRate: 1.0,
    reverbLevel: 0.2,
    delayLevel: 0.1,
    distortion: 0.45,
    eqBass: -8,
    eqTreble: 6,
    autotune: false,
    robotMod: false,
    telephoneFilter: true,
    underwaterFilter: false
  },
  {
    id: 'underwater_diver',
    name: 'Underwater Aquanaut',
    category: 'special',
    description: 'Submerged lowpass muffled scuba voice.',
    icon: '🌊',
    pitchSemiTones: -2,
    formantShift: 0.9,
    speedRate: 1.0,
    reverbLevel: 0.4,
    delayLevel: 0.15,
    distortion: 0,
    eqBass: 4,
    eqTreble: -10,
    autotune: false,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: true
  },
  {
    id: 'cathedral_choir',
    name: 'Cathedral Octave Choir',
    category: 'special',
    description: 'Harmonized cathedral choir ensemble with expansive reverb.',
    icon: '🏰',
    pitchSemiTones: 3,
    formantShift: 1.1,
    speedRate: 1.0,
    reverbLevel: 0.75,
    delayLevel: 0.25,
    distortion: 0,
    eqBass: 2,
    eqTreble: 5,
    autotune: true,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false
  },
  {
    id: 'autotune_trap',
    name: 'Auto-Tune Trap Rapper',
    category: 'special',
    description: 'Hard pitch quantization for futuristic hip-hop vocals.',
    icon: '🎤',
    pitchSemiTones: 0,
    formantShift: 1.0,
    speedRate: 1.0,
    reverbLevel: 0.25,
    delayLevel: 0.2,
    distortion: 0.05,
    eqBass: 3,
    eqTreble: 5,
    autotune: true,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false
  },
  {
    id: 'cave_echo',
    name: 'Cavern Stereo Ping-Pong',
    category: 'special',
    description: 'Wide stereo ping-pong echoes in a mountain cave.',
    icon: '⛰️',
    pitchSemiTones: -2,
    formantShift: 0.95,
    speedRate: 1.0,
    reverbLevel: 0.5,
    delayLevel: 0.5,
    distortion: 0,
    eqBass: 2,
    eqTreble: 2,
    autotune: false,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false
  },
  {
    id: 'dark_demon',
    name: 'Dark Nether Demon',
    category: 'special',
    description: 'Overdriven pitch-shifted demonic growl voice.',
    icon: '😈',
    pitchSemiTones: -9,
    formantShift: 0.6,
    speedRate: 1.0,
    reverbLevel: 0.5,
    delayLevel: 0.2,
    distortion: 0.4,
    eqBass: 9,
    eqTreble: -3,
    autotune: false,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false
  },
  {
    id: 'slowed_reverb',
    name: 'Slowed + Reverb Vibe',
    category: 'special',
    description: 'Trending slowed + reverb aesthetic chill vibe.',
    icon: '🌌',
    pitchSemiTones: -3,
    formantShift: 0.88,
    speedRate: 0.85,
    reverbLevel: 0.65,
    delayLevel: 0.2,
    distortion: 0.02,
    eqBass: 4,
    eqTreble: -1,
    autotune: false,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false
  },
  {
    id: 'nightcore_pop',
    name: 'Nightcore Energy',
    category: 'special',
    description: 'High tempo, pitch-boosted nightcore music vibe.',
    icon: '⚡',
    pitchSemiTones: 4,
    formantShift: 1.25,
    speedRate: 1.25,
    reverbLevel: 0.2,
    delayLevel: 0.1,
    distortion: 0,
    eqBass: 1,
    eqTreble: 6,
    autotune: false,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false
  },
  {
    id: 'walkie_talkie',
    name: 'Military Walkie Talkie',
    category: 'special',
    description: 'Tactical comms walkie-talkie radio filter with static.',
    icon: '📻',
    pitchSemiTones: -1,
    formantShift: 0.98,
    speedRate: 1.0,
    reverbLevel: 0.1,
    delayLevel: 0.0,
    distortion: 0.35,
    eqBass: -8,
    eqTreble: 2,
    autotune: false,
    robotMod: false,
    telephoneFilter: true,
    underwaterFilter: false
  },
  {
    id: 'radio_intercom',
    name: 'Aircraft Intercom',
    category: 'special',
    description: 'High altitude cockpit announcement filter.',
    icon: '✈️',
    pitchSemiTones: 0,
    formantShift: 1.05,
    speedRate: 1.0,
    reverbLevel: 0.1,
    delayLevel: 0.05,
    distortion: 0.4,
    eqBass: -10,
    eqTreble: 5,
    autotune: false,
    robotMod: false,
    telephoneFilter: true,
    underwaterFilter: false
  },
  {
    id: 'helicopter_pilot',
    name: 'Helicopter Pilot Comms',
    category: 'special',
    description: 'Helicopter rotor chopper tremolo rhythm effect.',
    icon: '🚁',
    pitchSemiTones: -1,
    formantShift: 0.95,
    speedRate: 1.0,
    reverbLevel: 0.15,
    delayLevel: 0.1,
    distortion: 0.2,
    eqBass: -4,
    eqTreble: 3,
    autotune: false,
    robotMod: true,
    telephoneFilter: false,
    underwaterFilter: false
  },
  {
    id: 'space_astronaut',
    name: 'Space Astronaut Lost',
    category: 'special',
    description: 'Deep space radio echo with helmet acoustics.',
    icon: '🚀',
    pitchSemiTones: -1,
    formantShift: 0.95,
    speedRate: 1.0,
    reverbLevel: 0.55,
    delayLevel: 0.4,
    distortion: 0.05,
    eqBass: 2,
    eqTreble: 1,
    autotune: false,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false
  },
  {
    id: 'ghost_phantom',
    name: 'Phantom Ghost',
    category: 'special',
    description: 'Pitch modulation wobble with ghostly chorus.',
    icon: '👻',
    pitchSemiTones: 1,
    formantShift: 1.15,
    speedRate: 1.0,
    reverbLevel: 0.7,
    delayLevel: 0.3,
    distortion: 0,
    eqBass: -2,
    eqTreble: 4,
    autotune: false,
    robotMod: false,
    telephoneFilter: false,
    underwaterFilter: false
  }
];

export const ALL_VOICE_PRESETS: VoicePreset[] = [
  ...FEMALE_VOICE_PRESETS,
  ...SPECIAL_VOICE_PRESETS
];

// Backing Instrumentals / Beat Loops for Song Making
export interface InstrumentalBeat {
  id: string;
  name: string;
  genre: string;
  bpm: number;
  icon: string;
}

export const BACKING_BEATS: InstrumentalBeat[] = [
  { id: 'lofi_chill', name: 'Nostalgic Lofi Piano Beat', genre: 'Lofi Chill', bpm: 80, icon: '🎹' },
  { id: 'synthwave_80s', name: 'Retro Synthwave Drive', genre: 'Synthwave', bpm: 115, icon: '🌃' },
  { id: 'acoustic_guitar', name: 'Soft Acoustic Sunset', genre: 'Acoustic', bpm: 90, icon: '🎸' },
  { id: 'trap_chill', name: 'Ambient Chill Trap Beat', genre: 'Hip-Hop', bpm: 130, icon: '🥁' },
  { id: 'piano_meditation', name: 'Serene Piano Soundscape', genre: 'Ambient', bpm: 70, icon: '✨' }
];

/*
 * FISH AUDIO API CONFIGURATION:
 * Environment variable placeholder for Fish Audio Bearer Token.
 * Provide token in environment as `REACT_APP_FISH_AUDIO_KEY` or `VITE_FISH_AUDIO_KEY`.
 * Free API keys can be obtained at https://fish.audio
 */
declare const process: { env: { [key: string]: string | undefined } } | undefined;

const getFishAudioKey = (): string => {
  if (typeof process !== 'undefined' && process?.env?.REACT_APP_FISH_AUDIO_KEY) {
    return process.env.REACT_APP_FISH_AUDIO_KEY;
  }
  if (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_FISH_AUDIO_KEY) {
    return (import.meta as any).env.VITE_FISH_AUDIO_KEY;
  }
  return '';
};

/**
 * Time-Domain Granular Overlap-Add (OLA) Pitch Shifter.
 * Shifts pitch independently of duration without chipmunk speedup or negative delay time errors.
 */
function pitchShiftAudioBuffer(
  ctx: BaseAudioContext,
  inputBuffer: AudioBuffer,
  pitchSemiTones: number
): AudioBuffer {
  if (Math.abs(pitchSemiTones) < 0.01) return inputBuffer;

  const pitchFactor = Math.pow(2, pitchSemiTones / 12);
  const numChannels = inputBuffer.numberOfChannels;
  const sampleRate = inputBuffer.sampleRate;
  const length = inputBuffer.length;

  const outputBuffer = ctx.createBuffer(numChannels, length, sampleRate);

  const grainSize = 2048;
  const hopSize = 512; // 75% overlap

  // Pre-calculate Hann window
  const window = new Float32Array(grainSize);
  for (let i = 0; i < grainSize; i++) {
    window[i] = 0.5 * (1 - Math.cos((2 * Math.PI * i) / grainSize));
  }

  for (let ch = 0; ch < numChannels; ch++) {
    const inputData = inputBuffer.getChannelData(ch);
    const outputData = outputBuffer.getChannelData(ch);
    const windowSum = new Float32Array(length);

    let inPos = 0;
    let outPos = 0;

    while (outPos + grainSize < length && inPos + grainSize * pitchFactor < length) {
      for (let n = 0; n < grainSize; n++) {
        const sampleIdx = inPos + n * pitchFactor;
        if (sampleIdx < length - 1) {
          const idx0 = Math.floor(sampleIdx);
          const idx1 = idx0 + 1;
          const frac = sampleIdx - idx0;
          const s = inputData[idx0] * (1 - frac) + inputData[idx1] * frac;

          const w = window[n];
          outputData[outPos + n] += s * w;
          windowSum[outPos + n] += w;
        }
      }
      inPos += hopSize;
      outPos += hopSize;
    }

    // Normalize window overlap gain
    for (let i = 0; i < length; i++) {
      if (windowSum[i] > 1e-4) {
        outputData[i] /= windowSum[i];
      }
    }
  }

  return outputBuffer;
}

export class VoiceChangerEngine {
  private ctx: AudioContext | null = null;

  public getAudioContext(): AudioContext {
    if (!this.ctx || this.ctx.state === 'closed') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public init() {
    this.getAudioContext();
    if (Tone.getContext().state === 'suspended') {
      Tone.start();
    }
  }

  /**
   * Fish Audio Speech-to-Speech (STS) API Client
   * Targets https://api.fish.audio for AI Voice Conversion.
   * If network fails or API key is absent, logs cleanly and returns null to trigger local DSP fallback.
   */
  public async callFishAudioSTS(
    audioBlob: Blob,
    voiceModelId: string,
    apiKeyOverride?: string
  ): Promise<AudioBuffer | null> {
    const key = apiKeyOverride || getFishAudioKey();

    if (!key) {
      console.info('[Fish Audio API] No API key provided (process.env.REACT_APP_FISH_AUDIO_KEY). Utilizing Web Audio + Tone.js Realism Engine.');
      return null;
    }

    try {
      console.log(`[Fish Audio API] Initiating STS Voice Conversion request for model: ${voiceModelId}`);
      const formData = new FormData();
      formData.append('audio', audioBlob, 'input_voice.webm');
      formData.append('reference_id', voiceModelId || 'female_default');
      formData.append('latency', 'normal');

      const response = await fetch('https://api.fish.audio/v1/sts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Fish Audio API responded with status ${response.status}: ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const ctx = this.getAudioContext();
      return await ctx.decodeAudioData(arrayBuffer);
    } catch (error) {
      console.warn('[Fish Audio API] STS Request encountered an error:', error);
      console.info('[Fish Audio API] Seamlessly falling back to local Tone.js + Web Audio DSP Pipeline.');
      return null;
    }
  }

  /**
   * Advanced Tone.js Post-Processing Realism Filter:
   * Chaining Tone.js Nodes using Tone.Offline:
   * 1. Low-Cut Highpass Filter (at 170Hz): Slices out deep resonant chest frequencies typical of male voice.
   * 2. High-Shelf Brightness Filter (at 4000Hz with +5dB gain): Boosts crisp sibilance, air, and natural breathiness.
   * 3. Micro-Room Reverb (roomSize: 0.12, wet: 0.08): Adds natural room acoustics, masking digital artifacts and dry mic feel.
   */
  public async applyToneJsRealismFilter(
    inputBuffer: AudioBuffer,
    highShelfGainDb: number = 5
  ): Promise<AudioBuffer> {
    const duration = inputBuffer.duration;
    const sampleRate = inputBuffer.sampleRate;
    const numChannels = inputBuffer.numberOfChannels;

    const bufferTone = new Tone.ToneAudioBuffer(inputBuffer);

    try {
      const renderedToneBuffer = await Tone.Offline(async () => {
        const player = new Tone.Player(bufferTone);

        // Node 1: Low-Cut Highpass Filter at 170Hz
        const highpass = new Tone.Filter({
          frequency: 170,
          type: 'highpass'
        });

        // Node 2: High-Shelf Brightness Filter at 4000Hz (+5dB gain)
        const highshelf = new Tone.Filter({
          frequency: 4000,
          type: 'highshelf',
          gain: highShelfGainDb
        });

        // Node 3: Micro-Room Reverb (roomSize: 0.12, wet: 0.08)
        const reverb = new Tone.Freeverb({
          roomSize: 0.12,
          dampening: 3000,
          wet: 0.08
        });

        player.chain(highpass, highshelf, reverb, Tone.getDestination());
        player.start(0);
      }, duration, numChannels, sampleRate);

      return renderedToneBuffer.get() as AudioBuffer;
    } catch (err) {
      console.warn('[Tone.js Realism Filter] Offline rendering fallback:', err);
      return inputBuffer;
    }
  }

  // Generate Procedural Backing Beat Audio Buffer
  public createProceduralBeat(beatId: string, durationSec: number = 20): AudioBuffer {
    const audioCtx = this.getAudioContext();
    const sampleRate = audioCtx.sampleRate;
    const numSamples = Math.floor(sampleRate * durationSec);
    const buffer = this.ctx!.createBuffer(2, numSamples, sampleRate);
    const left = buffer.getChannelData(0);
    const right = buffer.getChannelData(1);

    const beatConfig = BACKING_BEATS.find((b) => b.id === beatId) || BACKING_BEATS[0];
    const secondsPerBeat = 60 / beatConfig.bpm;

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const currentBeat = (t / secondsPerBeat) % 16;
      let sampleL = 0;
      let sampleR = 0;

      if (beatConfig.id === 'lofi_chill' || beatConfig.id === 'piano_meditation') {
        const chordIndex = Math.floor(t / (secondsPerBeat * 2)) % 4;
        const freqs = [
          [261.63, 329.63, 392.00, 493.88], // Cmaj7
          [220.00, 261.63, 329.63, 392.00], // Am7
          [174.61, 220.00, 261.63, 329.63], // Fmaj7
          [196.00, 246.94, 293.66, 349.23]  // G7
        ][chordIndex];

        freqs.forEach((f) => {
          const env = Math.exp(-((t % (secondsPerBeat * 2)) * 1.5));
          sampleL += Math.sin(2 * Math.PI * f * t) * 0.08 * env;
          sampleR += Math.sin(2 * Math.PI * (f * 1.002) * t) * 0.08 * env;
        });

        const beatPos = Math.floor(currentBeat);
        const subBeat = (currentBeat % 1);
        if (beatPos === 0 || beatPos === 4 || beatPos === 8 || beatPos === 12) {
          const kickEnv = Math.exp(-subBeat * 15);
          const kickTone = Math.sin(2 * Math.PI * (60 * kickEnv) * t);
          sampleL += kickTone * 0.25 * kickEnv;
          sampleR += kickTone * 0.25 * kickEnv;
        }
        if (beatPos === 2 || beatPos === 6 || beatPos === 10 || beatPos === 14) {
          const snareEnv = Math.exp(-subBeat * 20);
          const snareNoise = (Math.random() * 2 - 1) * 0.15 * snareEnv;
          sampleL += snareNoise;
          sampleR += snareNoise;
        }
      } else if (beatConfig.id === 'synthwave_80s') {
        const bassFreq = [110, 97.99, 87.31, 97.99][Math.floor(t / (secondsPerBeat * 2)) % 4];
        const bassEnv = Math.exp(-((t % (secondsPerBeat / 2)) * 6));
        const bassSynth = Math.sin(2 * Math.PI * bassFreq * t) * 0.2 * bassEnv;
        sampleL += bassSynth;
        sampleR += bassSynth;

        const beatPos = Math.floor(currentBeat);
        const subBeat = (currentBeat % 1);
        if (beatPos % 2 === 0) {
          const kickEnv = Math.exp(-subBeat * 20);
          sampleL += Math.sin(2 * Math.PI * 80 * subBeat) * 0.3 * kickEnv;
          sampleR += Math.sin(2 * Math.PI * 80 * subBeat) * 0.3 * kickEnv;
        }
        if (beatPos % 4 === 2) {
          const snareEnv = Math.exp(-subBeat * 18);
          sampleL += (Math.random() * 2 - 1) * 0.25 * snareEnv;
          sampleR += (Math.random() * 2 - 1) * 0.25 * snareEnv;
        }
      } else {
        const freq = 220 + Math.sin(t * 2) * 50;
        sampleL += Math.sin(2 * Math.PI * freq * t) * 0.05;
        sampleR += Math.sin(2 * Math.PI * freq * t) * 0.05;
      }

      left[i] = Math.max(-1, Math.min(1, sampleL));
      right[i] = Math.max(-1, Math.min(1, sampleR));
    }

    return buffer;
  }

  /**
   * Main Hybrid Voice Processing Engine:
   * 1. Attempts Fish Audio Cloud AI Voice Conversion if key is configured and available.
   * 2. Executes high-precision Web Audio OLA Granular Pitch Shift (preserving timing/speed without chipmunk speedup).
   * 3. Applies multi-stage DSP filters (Ring Modulator, Formant Resonators, Equalizer, Delay, Reverb).
   * 4. Passes output through the Tone.js Realism Filter Chain (170Hz Highpass, 4000Hz Brightness, Micro-Room Reverb).
   * 5. Mixes backing instrumental beat if selected.
   */
  public async processAudio(
    inputBuffer: AudioBuffer,
    preset: VoicePreset,
    customPitch?: number,
    backingBeatBuffer?: AudioBuffer | null,
    backingBeatVolume: number = 0.4,
    highShelfGain?: number
  ): Promise<AudioBuffer> {
    this.init();

    const finalPitchSemi = customPitch !== undefined ? customPitch : preset.pitchSemiTones;
    const speedFactor = preset.speedRate || 1.0;

    // Attempt AI Cloud Voice Changer first
    let aiConvertedBuffer: AudioBuffer | null = null;
    try {
      const wavBlob = this.bufferToWav(inputBuffer);
      aiConvertedBuffer = await this.callFishAudioSTS(wavBlob, preset.id);
    } catch {
      // Fallback
    }

    // Use AI response buffer if available, otherwise apply Granular Pitch Shift
    let processedBuffer = aiConvertedBuffer;
    if (!processedBuffer) {
      const ctx = this.getAudioContext();
      processedBuffer = pitchShiftAudioBuffer(ctx, inputBuffer, finalPitchSemi);
    }

    // Calculate length without speeding up audio artificially
    const sampleRate = processedBuffer.sampleRate;
    const targetLength = Math.floor(processedBuffer.length / speedFactor);

    const offlineCtx = new OfflineAudioContext(2, Math.max(targetLength, sampleRate * 1), sampleRate);

    // Source Node
    const sourceNode = offlineCtx.createBufferSource();
    sourceNode.buffer = processedBuffer;
    sourceNode.playbackRate.setValueAtTime(speedFactor, offlineCtx.currentTime);

    let currentNode: AudioNode = sourceNode;

    // 1. Robot / Ring Modulation FX
    if (preset.robotMod) {
      const osc = offlineCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(50, offlineCtx.currentTime);

      const modGain = offlineCtx.createGain();
      modGain.gain.setValueAtTime(0.5, offlineCtx.currentTime);

      osc.connect(modGain.gain);
      osc.start(0);

      currentNode.connect(modGain);
      currentNode = modGain;
    }

    // 2. Multi-band Formant Vocal Tract Resonators (F1, F2, F3)
    if (preset.formantShift !== 1.0) {
      const shift = preset.formantShift;
      const formants = [
        { freq: 500 * shift, gain: (shift - 1.0) * 8, Q: 3 },
        { freq: 1500 * shift, gain: (shift - 1.0) * 10, Q: 3.5 },
        { freq: 2800 * shift, gain: (shift - 1.0) * 6, Q: 4 }
      ];

      formants.forEach(({ freq, gain, Q }) => {
        const filter = offlineCtx.createBiquadFilter();
        filter.type = 'peaking';
        filter.frequency.setValueAtTime(Math.min(freq, sampleRate / 2 - 100), offlineCtx.currentTime);
        filter.gain.setValueAtTime(gain, offlineCtx.currentTime);
        filter.Q.setValueAtTime(Q, offlineCtx.currentTime);

        currentNode.connect(filter);
        currentNode = filter;
      });
    }

    // 3. Filters (Telephone, Megaphone, Underwater)
    if (preset.telephoneFilter) {
      const hp = offlineCtx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.setValueAtTime(400, offlineCtx.currentTime);

      const lp = offlineCtx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(3000, offlineCtx.currentTime);

      currentNode.connect(hp);
      hp.connect(lp);
      currentNode = lp;
    } else if (preset.underwaterFilter) {
      const lp = offlineCtx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(450, offlineCtx.currentTime);

      currentNode.connect(lp);
      currentNode = lp;
    }

    // 4. Equalizer (Bass & Treble)
    if (preset.eqBass !== 0) {
      const bassFilter = offlineCtx.createBiquadFilter();
      bassFilter.type = 'lowshelf';
      bassFilter.frequency.setValueAtTime(200, offlineCtx.currentTime);
      bassFilter.gain.setValueAtTime(preset.eqBass, offlineCtx.currentTime);
      currentNode.connect(bassFilter);
      currentNode = bassFilter;
    }

    if (preset.eqTreble !== 0) {
      const trebleFilter = offlineCtx.createBiquadFilter();
      trebleFilter.type = 'highshelf';
      trebleFilter.frequency.setValueAtTime(4000, offlineCtx.currentTime);
      trebleFilter.gain.setValueAtTime(preset.eqTreble, offlineCtx.currentTime);
      currentNode.connect(trebleFilter);
      currentNode = trebleFilter;
    }

    // 5. Distortion
    if (preset.distortion > 0) {
      const waveShaper = offlineCtx.createWaveShaper();
      const k = preset.distortion * 50;
      const n_samples = 44100;
      const curve = new Float32Array(n_samples);
      const deg = Math.PI / 180;
      for (let i = 0; i < n_samples; ++i) {
        const x = (i * 2) / n_samples - 1;
        curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
      }
      waveShaper.curve = curve;
      currentNode.connect(waveShaper);
      currentNode = waveShaper;
    }

    // 6. Delay / Echo
    if (preset.delayLevel > 0) {
      const delayNode = offlineCtx.createDelay();
      delayNode.delayTime.setValueAtTime(0.25, offlineCtx.currentTime);

      const delayFeedback = offlineCtx.createGain();
      delayFeedback.gain.setValueAtTime(preset.delayLevel * 0.6, offlineCtx.currentTime);

      const delayGainNode = offlineCtx.createGain();
      delayGainNode.gain.setValueAtTime(preset.delayLevel, offlineCtx.currentTime);

      currentNode.connect(delayNode);
      delayNode.connect(delayFeedback);
      delayFeedback.connect(delayNode);
      delayNode.connect(delayGainNode);

      const merger = offlineCtx.createGain();
      currentNode.connect(merger);
      delayGainNode.connect(merger);
      currentNode = merger;
    }

    // 7. Reverb
    if (preset.reverbLevel > 0) {
      const convolver = offlineCtx.createConvolver();
      convolver.buffer = this.createImpulseResponse(offlineCtx, 2.5, preset.reverbLevel * 3.0);

      const wetGain = offlineCtx.createGain();
      wetGain.gain.setValueAtTime(preset.reverbLevel * 0.8, offlineCtx.currentTime);

      const outputMerger = offlineCtx.createGain();
      currentNode.connect(outputMerger);
      currentNode.connect(convolver);
      convolver.connect(wetGain);
      wetGain.connect(outputMerger);

      currentNode = outputMerger;
    }

    const voiceGain = offlineCtx.createGain();
    voiceGain.gain.setValueAtTime(1.1, offlineCtx.currentTime);
    currentNode.connect(voiceGain);
    voiceGain.connect(offlineCtx.destination);

    // 8. Backing Beat Overlay
    if (backingBeatBuffer) {
      const beatSource = offlineCtx.createBufferSource();
      beatSource.buffer = backingBeatBuffer;
      beatSource.loop = true;

      const beatGain = offlineCtx.createGain();
      beatGain.gain.setValueAtTime(backingBeatVolume, offlineCtx.currentTime);

      beatSource.connect(beatGain);
      beatGain.connect(offlineCtx.destination);

      beatSource.start(0);
    }

    sourceNode.start(0);

    const dspRenderedBuffer = await offlineCtx.startRendering();

    // 9. Apply Tone.js Realism Filter Chain (170Hz Low-Cut, 4000Hz High-Shelf Brightness, Micro-Room Reverb)
    const shelfGain = highShelfGain !== undefined ? highShelfGain : preset.highShelfGain || 5;
    return await this.applyToneJsRealismFilter(dspRenderedBuffer, shelfGain);
  }

  // Algorithmic Reverb Impulse Response Generator
  private createImpulseResponse(ctx: BaseAudioContext, duration: number, decay: number): AudioBuffer {
    const sampleRate = ctx.sampleRate;
    const length = Math.floor(sampleRate * duration);
    const impulse = ctx.createBuffer(2, length, sampleRate);
    const left = impulse.getChannelData(0);
    const right = impulse.getChannelData(1);

    for (let i = 0; i < length; i++) {
      const expDecay = Math.pow(1 - i / length, decay);
      left[i] = (Math.random() * 2 - 1) * expDecay;
      right[i] = (Math.random() * 2 - 1) * expDecay;
    }

    return impulse;
  }

  // Convert AudioBuffer to WAV File Blob
  public bufferToWav(buffer: AudioBuffer): Blob {
    const numOfChan = buffer.numberOfChannels;
    const length = buffer.length * numOfChan * 2 + 44;
    const out = new DataView(new ArrayBuffer(length));
    let channels: Float32Array[] = [];
    let sampleRate = buffer.sampleRate;
    let offset = 0;
    let pos = 0;

    function writeString(str: string) {
      for (let i = 0; i < str.length; i++) {
        out.setUint8(pos++, str.charCodeAt(i));
      }
    }

    function setUint16(data: number) {
      out.setUint16(pos, data, true);
      pos += 2;
    }

    function setUint32(data: number) {
      out.setUint32(pos, data, true);
      pos += 4;
    }

    writeString('RIFF');
    setUint32(length - 8);
    writeString('WAVE');
    writeString('fmt ');
    setUint32(16);
    setUint16(1); // PCM
    setUint16(numOfChan);
    setUint32(sampleRate);
    setUint32(sampleRate * 2 * numOfChan);
    setUint16(numOfChan * 2);
    setUint16(16); // 16-bit
    writeString('data');
    setUint32(length - pos - 4);

    for (let i = 0; i < buffer.numberOfChannels; i++) {
      channels.push(buffer.getChannelData(i));
    }

    while (offset < buffer.length) {
      for (let i = 0; i < numOfChan; i++) {
        let sample = Math.max(-1, Math.min(1, channels[i][offset]));
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
        out.setInt16(pos, sample, true);
        pos += 2;
      }
      offset++;
    }

    return new Blob([out.buffer], { type: 'audio/wav' });
  }

  // Export as Telegram Voice Format (.ogg / .wav audio blob)
  public bufferToTelegramVoiceBlob(buffer: AudioBuffer): Blob {
    const wavBlob = this.bufferToWav(buffer);
    return new Blob([wavBlob], { type: 'audio/wav' });
  }
}

export const voiceEngine = new VoiceChangerEngine();

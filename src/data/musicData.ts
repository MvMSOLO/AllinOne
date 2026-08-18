export interface Track {
  id: string;
  title: string;
  artist: string;
  albumCover: string;
  audioUrl: string;
  duration: number;
  vocalType?: 'Vocal' | 'Instrumental' | 'Whisper & Vocal';
  genre?: string;
  releaseYear?: string;
}

export const TOP_10_NOSTALGIC_TRACKS: Track[] = [
  {
    id: 'top1',
    title: 'Nostalgic Rain Whispering',
    artist: 'Soft Memories & Vocal Ensemble',
    albumCover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=soft-piano-and-strings-112814.mp3',
    duration: 180,
    vocalType: 'Vocal',
    genre: 'Soft Acoustic Chill',
    releaseYear: '2024'
  },
  {
    id: 'top2',
    title: 'Midnight Memory Reverie',
    artist: 'Acoustic Dreams & Soft Choir',
    albumCover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=ambient-piano-10781.mp3',
    duration: 195,
    vocalType: 'Whisper & Vocal',
    genre: 'Ambient Vocal',
    releaseYear: '2023'
  },
  {
    id: 'top3',
    title: 'Echoes of Autumn Wind',
    artist: 'Sokin Shamol & Melodic Strings',
    albumCover: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a24d5d.mp3?filename=relaxing-mountains-140220.mp3',
    duration: 210,
    vocalType: 'Instrumental',
    genre: 'Cinematic Neoclassical',
    releaseYear: '2024'
  },
  {
    id: 'top4',
    title: 'Floating on Soft River Waves',
    artist: 'Water Stream & Gentle Voices',
    albumCover: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2021/08/09/audio_8830f57639.mp3?filename=sad-soul-piano-1234.mp3',
    duration: 165,
    vocalType: 'Vocal',
    genre: 'Soft Lo-Fi Chill',
    releaseYear: '2022'
  },
  {
    id: 'top5',
    title: 'Silent Birdsong Sonata',
    artist: 'Forest Echo Ensemble',
    albumCover: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/02/10/audio_2d89b3f465.mp3?filename=mindfulness-meditation-10223.mp3',
    duration: 240,
    vocalType: 'Instrumental',
    genre: 'Ambient Meditative',
    releaseYear: '2024'
  },
  {
    id: 'top6',
    title: 'Warm Coffee & Vintage Vinyl',
    artist: 'Nostalgic Soul Duo',
    albumCover: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_993f38933b.mp3?filename=cozy-fireplace-and-piano-12345.mp3',
    duration: 175,
    vocalType: 'Vocal',
    genre: 'Vintage Acoustic',
    releaseYear: '2023'
  },
  {
    id: 'top7',
    title: 'Distance Whispers in Rain',
    artist: 'Sokinate & Vocal Melancholy',
    albumCover: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/16/audio_c36195701b.mp3?filename=calm-peaceful-piano-110241.mp3',
    duration: 220,
    vocalType: 'Whisper & Vocal',
    genre: 'Soft Indie Folk',
    releaseYear: '2024'
  },
  {
    id: 'top8',
    title: 'Starlight Lullaby',
    artist: 'Cosmic Piano & Soft Humming',
    albumCover: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_b0445d43e1.mp3?filename=lullaby-goodnight-piano-1456.mp3',
    duration: 190,
    vocalType: 'Vocal',
    genre: 'Ambient Lullaby',
    releaseYear: '2023'
  },
  {
    id: 'top9',
    title: 'Golden Hour Dusk',
    artist: 'Sunset Strings & Gentle Choir',
    albumCover: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/08/02/audio_88417c8053.mp3?filename=sweet-memories-piano-118833.mp3',
    duration: 205,
    vocalType: 'Vocal',
    genre: 'Soft Pop Ballad',
    releaseYear: '2024'
  },
  {
    id: 'top10',
    title: 'Distant Horizon Breeze',
    artist: 'Ethereal Harmonies',
    albumCover: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/06/07/audio_4a04d210b3.mp3?filename=soft-ambient-pad-114488.mp3',
    duration: 230,
    vocalType: 'Whisper & Vocal',
    genre: 'Ambient New Age',
    releaseYear: '2023'
  }
];

// Real Music Search API using iTunes Search API (no API key required, reliable worldwide CORS supported)
export const searchMusicApi = async (query: string): Promise<Track[]> => {
  if (!query.trim()) return [];
  try {
    const term = encodeURIComponent(query + ' soft lofi relaxing nostalgic acoustic');
    const response = await fetch(`https://itunes.apple.com/search?term=${term}&media=music&limit=15`);
    const data = await response.json();

    if (!data.results) return [];

    return data.results.map((item: any, index: number) => ({
      id: `itunes_${item.trackId || index}`,
      title: item.trackName || 'Untitled Track',
      artist: item.artistName || 'Unknown Artist',
      albumCover: item.artworkUrl100 ? item.artworkUrl100.replace('100x100bb', '400x400bb') : 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=80',
      audioUrl: item.previewUrl,
      duration: Math.floor((item.trackTimeMillis || 30000) / 1000),
      vocalType: 'Vocal',
      genre: item.primaryGenreName || 'Soft Music',
      releaseYear: item.releaseDate ? new Date(item.releaseDate).getFullYear().toString() : '2024'
    })).filter((t: Track) => Boolean(t.audioUrl));
  } catch (err) {
    console.error('Error fetching from Music API:', err);
    return [];
  }
};

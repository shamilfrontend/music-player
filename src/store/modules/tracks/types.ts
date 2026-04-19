import type { Nullable } from '../../../types';

export interface Track {
  id: number | string;
  imageUrl: string;
  name: string;
  author: string;
  favorite: boolean;
  trackUrl: string;
  /** Локально добавленный файл (не из встроенной библиотеки) */
  source?: 'user';
}

export interface TracksState {
  tracks: Track[];

  currentTrack: Nullable<Track>;

  currentSeconds: number;
  durationSeconds: number;
  volume: number;

  state: {
    isPlaying: boolean;
    isLooping: boolean;
    isShuffle: boolean;
    isPlayerScreenShown: boolean;
    isLoadingTrack: boolean;
  };
}

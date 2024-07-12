import type { Nullable } from '../../../types';

export interface Track {
  id: number | string;
  imageUrl: string;
  name: string;
  author: string;
  favorite: boolean;
  trackUrl: string;
}

export interface TracksState {
  tracks: Track[];
  currentTrack: Nullable<Track>;
  isPlaying: boolean;
  isPlayerScreenShown: boolean;
}

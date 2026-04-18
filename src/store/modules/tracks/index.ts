import { computed, reactive, ref } from 'vue';

import { defineStore } from 'pinia';

import { tracks as tracksList } from './constants';
import type { Track } from './types';
import type { Nullable } from '../../../types';

const useTracksStore = defineStore('tracks', () => {
  const tracks = ref<Track[]>(tracksList);
  const currentTrack = ref<Nullable<Track>>(null);
  const currentSeconds = ref(0);
  const durationSeconds = ref(0);
  const volume = ref(100);
  const pendingSeekSeconds = ref<Nullable<number>>(null);

  const state = reactive({
    isPlaying: false,
    isLooping: false,
    isPlayerScreenShown: false,
    isLoadingTrack: false
  });

  const favoriteTracks = computed<Track[]>(() =>
    tracks.value.filter(({ favorite }) => Boolean(favorite))
  );

  function toggleFavorite(trackId: Track['id']): void {
    const track = tracks.value.find(({ id }) => id === trackId);

    if (!track) return;

    track.favorite = !track.favorite;
  }

  function seekToSeconds(seconds: number): void {
    const duration = durationSeconds.value;

    if (!duration || !Number.isFinite(seconds)) return;

    const clamped = Math.min(Math.max(0, seconds), duration);

    pendingSeekSeconds.value = clamped;
  }

  return {
    tracks,
    currentTrack,
    currentSeconds,
    durationSeconds,
    volume,
    pendingSeekSeconds,
    state,
    favoriteTracks,
    toggleFavorite,
    seekToSeconds
  };
});

export default useTracksStore;
export { useTracksStore };
export type { Track };

import { computed, reactive, ref, watch } from 'vue';

import { defineStore } from 'pinia';

import { tracks as tracksList } from './constants';
import type { Track } from './types';
import type { Nullable } from '../../../types';

const VOLUME_STORAGE_KEY = 'music-player-volume';

function readStoredVolume(): number {
  if (typeof window === 'undefined') {
    return 100;
  }

  try {
    const raw = window.localStorage.getItem(VOLUME_STORAGE_KEY);

    if (raw === null) {
      return 100;
    }

    const parsed = Number(raw);

    if (!Number.isFinite(parsed)) {
      return 100;
    }

    return Math.min(100, Math.max(0, Math.round(parsed)));
  } catch {
    return 100;
  }
}

function writeStoredVolume(value: number): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(VOLUME_STORAGE_KEY, String(value));
  } catch {
    // quota / приватный режим
  }
}

const useTracksStore = defineStore('tracks', () => {
  const tracks = ref<Track[]>(tracksList);
  const currentTrack = ref<Nullable<Track>>(null);
  const currentSeconds = ref(0);
  const durationSeconds = ref(0);
  const volume = ref(readStoredVolume());
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

  watch(volume, (value) => {
    writeStoredVolume(value);
  });

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

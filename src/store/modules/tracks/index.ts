import { computed, reactive, ref, watch } from 'vue';

import { defineStore } from 'pinia';

import { tracks as tracksList } from './constants';
import type { Track } from './types';
import type { Nullable } from '../../../types';

const VOLUME_STORAGE_KEY = 'music-player-volume';
const LOOP_STORAGE_KEY = 'music-player-loop';
const SHUFFLE_STORAGE_KEY = 'music-player-shuffle';
const LAST_TRACK_ID_STORAGE_KEY = 'music-player-last-track-id';

function readStoredBoolean(key: string, defaultValue: boolean): boolean {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  try {
    const raw = window.localStorage.getItem(key);

    if (raw === null) {
      return defaultValue;
    }

    if (raw === '1' || raw === 'true') return true;

    if (raw === '0' || raw === 'false') return false;
  } catch {
    // ignore
  }

  return defaultValue;
}

function writeStoredBoolean(key: string, value: boolean): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(key, value ? '1' : '0');
  } catch {
    // quota / приватный режим
  }
}

function readLastTrackId(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage.getItem(LAST_TRACK_ID_STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeLastTrackId(id: Track['id'] | null): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    if (id === null || id === undefined) {
      window.localStorage.removeItem(LAST_TRACK_ID_STORAGE_KEY);

      return;
    }

    window.localStorage.setItem(LAST_TRACK_ID_STORAGE_KEY, String(id));
  } catch {
    // ignore
  }
}

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
    isLooping: readStoredBoolean(LOOP_STORAGE_KEY, false),
    isShuffle: readStoredBoolean(SHUFFLE_STORAGE_KEY, false),
    isPlayerScreenShown: false,
    isLoadingTrack: false
  });

  const lastTrackIdStored = readLastTrackId();

  if (lastTrackIdStored !== null && lastTrackIdStored !== '') {
    const restored = tracks.value.find(({ id }) => String(id) === lastTrackIdStored);

    if (restored) {
      currentTrack.value = restored;
    }
  }

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

  function playAdjacentTrack(delta: 1 | -1): void {
    const list = tracks.value;

    if (list.length === 0) return;

    let index: number;

    const current = currentTrack.value;

    if (!current) {
      index = delta === 1 ? 0 : list.length - 1;
    } else {
      const found = list.findIndex(({ id }) => id === current.id);
      const base = found < 0 ? 0 : found;

      index = (base + delta + list.length) % list.length;
    }

    const next = list[index];

    if (!next) return;

    currentTrack.value = next;
    pendingSeekSeconds.value = null;
    state.isPlaying = true;
  }

  function playRandomTrack(): void {
    const list = tracks.value;

    if (list.length === 0) return;

    const current = currentTrack.value;
    let candidates = current
      ? list.filter((t) => t.id !== current.id)
      : [...list];

    if (candidates.length === 0) {
      candidates = [...list];
    }

    const pick = candidates[Math.floor(Math.random() * candidates.length)];

    if (!pick) return;

    currentTrack.value = pick;
    pendingSeekSeconds.value = null;
    state.isPlaying = true;
  }

  function playNextTrack(): void {
    if (state.isShuffle && tracks.value.length > 1) {
      playRandomTrack();

      return;
    }

    playAdjacentTrack(1);
  }

  function playPreviousTrack(): void {
    playAdjacentTrack(-1);
  }

  function toggleLoop(): void {
    state.isLooping = !state.isLooping;
  }

  function toggleShuffle(): void {
    state.isShuffle = !state.isShuffle;
  }

  watch(volume, (value) => {
    writeStoredVolume(value);
  });

  watch(
    () => state.isLooping,
    (value) => {
      writeStoredBoolean(LOOP_STORAGE_KEY, value);
    }
  );

  watch(
    () => state.isShuffle,
    (value) => {
      writeStoredBoolean(SHUFFLE_STORAGE_KEY, value);
    }
  );

  watch(
    () => currentTrack.value?.id,
    (nextId, prevId) => {
      writeLastTrackId(nextId === undefined ? null : nextId);

      if (nextId !== prevId) {
        currentSeconds.value = 0;
        durationSeconds.value = 0;
      }
    }
  );

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
    seekToSeconds,
    playAdjacentTrack,
    playNextTrack,
    playPreviousTrack,
    playRandomTrack,
    toggleLoop,
    toggleShuffle
  };
});

export default useTracksStore;
export { useTracksStore };
export type { Track };

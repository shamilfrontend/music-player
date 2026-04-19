import { computed, reactive, ref, watch } from 'vue';

import { nanoid } from 'nanoid';
import { defineStore } from 'pinia';

import { tracks as tracksList } from './constants';
import type { Track } from './types';
import type { Nullable } from '../../../types';

const VOLUME_STORAGE_KEY = 'music-player-volume';
const LOOP_STORAGE_KEY = 'music-player-loop';
const SHUFFLE_STORAGE_KEY = 'music-player-shuffle';
const LAST_TRACK_ID_STORAGE_KEY = 'music-player-last-track-id';
const FAVORITE_IDS_STORAGE_KEY = 'music-player-favorite-ids';
const USER_TRACKS_STORAGE_KEY = 'music-player-user-tracks';
const PLAY_COUNTS_STORAGE_KEY = 'music-player-play-counts';
const MAX_USER_AUDIO_FILE_BYTES = 2_500_000;
/** База для монотонного addedAt встроенных треков (последние в списке — «новее») */
const ADDED_AT_SEED_BASE = 1_700_000_000_000;
const DEFAULT_USER_COVER = '/albums/kleinod_another_ight.jpg';

function defaultFavoriteIdsFromTracks(seedTracks: Track[]): Set<string> {
  return new Set(
    seedTracks.filter(({ favorite }) => favorite).map(({ id }) => String(id))
  );
}

function readFavoriteIdSet(seedTracks: Track[]): Set<string> {
  if (typeof window === 'undefined') {
    return defaultFavoriteIdsFromTracks(seedTracks);
  }

  try {
    const raw = window.localStorage.getItem(FAVORITE_IDS_STORAGE_KEY);

    if (raw === null) {
      return defaultFavoriteIdsFromTracks(seedTracks);
    }

    const parsed = JSON.parse(raw) as unknown;

    if (!Array.isArray(parsed)) {
      return defaultFavoriteIdsFromTracks(seedTracks);
    }

    return new Set(parsed.map(id => String(id)).filter(id => id.length > 0));
  } catch {
    return defaultFavoriteIdsFromTracks(seedTracks);
  }
}

function writeFavoriteIdsForTracks(list: Track[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const ids = list
      .filter(({ favorite }) => favorite)
      .map(({ id }) => String(id));

    window.localStorage.setItem(FAVORITE_IDS_STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // квота / приватный режим
  }
}

function applyPersistedFavoriteFlags(list: Track[]): void {
  const ids = readFavoriteIdSet(list);

  for (let i = 0; i < list.length; i += 1) {
    const item = list[i];

    if (item) {
      item.favorite = ids.has(String(item.id));
    }
  }
}

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

function readPlayCountsMap(): Record<string, number> {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(PLAY_COUNTS_STORAGE_KEY);

    if (raw === null || raw === '') {
      return {};
    }

    const parsed = JSON.parse(raw) as unknown;

    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return {};
    }

    const out: Record<string, number> = {};

    Object.entries(parsed as Record<string, unknown>).forEach(([k, v]) => {
      if (typeof v === 'number' && Number.isFinite(v) && v >= 0) {
        out[k] = Math.floor(v);
      }
    });

    return out;
  } catch {
    return {};
  }
}

function writePlayCountsMap(map: Record<string, number>): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(PLAY_COUNTS_STORAGE_KEY, JSON.stringify(map));
  } catch {
    // квота / приватный режим
  }
}

function isUserTrackRecord(v: unknown): v is {
  id: string | number;
  name: string;
  author: string;
  imageUrl: string;
  trackUrl: string;
  addedAt?: number;
} {
  if (v === null || typeof v !== 'object') {
    return false;
  }

  const o = v as Record<string, unknown>;

  if (
    typeof o.trackUrl !== 'string' ||
    o.trackUrl.length === 0 ||
    (typeof o.id !== 'string' && typeof o.id !== 'number') ||
    typeof o.name !== 'string' ||
    typeof o.author !== 'string' ||
    typeof o.imageUrl !== 'string'
  ) {
    return false;
  }

  if (
    o.addedAt !== undefined &&
    (typeof o.addedAt !== 'number' || !Number.isFinite(o.addedAt))
  ) {
    return false;
  }

  return true;
}

function loadUserTracksFromStorage(): Track[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(USER_TRACKS_STORAGE_KEY);

    if (raw === null || raw === '') {
      return [];
    }

    const parsed = JSON.parse(raw) as unknown;

    if (!Array.isArray(parsed)) {
      return [];
    }

    const out: Track[] = [];

    for (let i = 0; i < parsed.length; i += 1) {
      const row = parsed[i];

      if (isUserTrackRecord(row)) {
        out.push({
          id: row.id,
          name: row.name,
          author: row.author,
          imageUrl: row.imageUrl || DEFAULT_USER_COVER,
          trackUrl: row.trackUrl,
          favorite: false,
          source: 'user',
          addedAt: row.addedAt ?? 0
        });
      }
    }

    return out;
  } catch {
    return [];
  }
}

function saveUserTracksToStorage(list: Track[]): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const rows = list
    .filter((t): t is Track & { source: 'user' } => t.source === 'user')
    .map(({ id, name, author, imageUrl, trackUrl, addedAt }) => ({
      id,
      name,
      author,
      imageUrl,
      trackUrl,
      source: 'user' as const,
      addedAt: addedAt ?? 0
    }));

  try {
    window.localStorage.setItem(USER_TRACKS_STORAGE_KEY, JSON.stringify(rows));

    return true;
  } catch {
    return false;
  }
}

function readFileAsDataUrl(file: File): Promise<string | null> {
  return new Promise(resolve => {
    const reader = new FileReader();

    reader.onload = (): void => {
      const { result } = reader;

      resolve(typeof result === 'string' ? result : null);
    };

    reader.onerror = (): void => resolve(null);
    reader.readAsDataURL(file);
  });
}

export type AddUserTrackResult =
  | { ok: true }
  | { ok: false; reason: 'file_too_large' | 'read_failed' | 'persist_failed' };

const useTracksStore = defineStore('tracks', () => {
  const builtInTracks = tracksList.map((item, index) => ({
    ...item,
    addedAt: ADDED_AT_SEED_BASE + index
  }));
  const userTracks = loadUserTracksFromStorage();
  const tracks = ref<Track[]>([...builtInTracks, ...userTracks]);

  applyPersistedFavoriteFlags(tracks.value);

  const playCounts = ref<Record<string, number>>(readPlayCountsMap());

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
    const restored = tracks.value.find(
      ({ id }) => String(id) === lastTrackIdStored
    );

    if (restored) {
      currentTrack.value = restored;
    }
  }

  const favoriteTracks = computed<Track[]>(() =>
    tracks.value.filter(({ favorite }) => Boolean(favorite))
  );

  function recordPlay(trackId: Track['id']): void {
    const key = String(trackId);
    const prev = playCounts.value[key] ?? 0;
    const next = { ...playCounts.value, [key]: prev + 1 };

    playCounts.value = next;
    writePlayCountsMap(next);
  }

  function topTracksByPlays(limit: number): Track[] {
    const list = tracks.value;

    if (list.length === 0) {
      return [];
    }

    const capped = Math.max(1, Math.floor(limit));
    const allZero = list.every(
      t => (playCounts.value[String(t.id)] ?? 0) === 0
    );

    if (allZero) {
      return list.slice(0, Math.min(capped, list.length));
    }

    return [...list]
      .sort((a, b) => {
        const ca = playCounts.value[String(a.id)] ?? 0;
        const cb = playCounts.value[String(b.id)] ?? 0;

        if (cb !== ca) {
          return cb - ca;
        }

        return String(a.id).localeCompare(String(b.id));
      })
      .slice(0, capped);
  }

  function newestTracks(limit: number): Track[] {
    const list = tracks.value;

    if (list.length === 0) {
      return [];
    }

    const capped = Math.max(1, Math.floor(limit));

    return [...list]
      .sort((a, b) => (b.addedAt ?? 0) - (a.addedAt ?? 0))
      .slice(0, Math.min(capped, list.length));
  }

  function toggleFavorite(trackId: Track['id']): void {
    const track = tracks.value.find(({ id }) => id === trackId);

    if (!track) return;

    track.favorite = !track.favorite;
    writeFavoriteIdsForTracks(tracks.value);
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
      ? list.filter(t => t.id !== current.id)
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

  async function addUserTrackFromFile(file: File): Promise<AddUserTrackResult> {
    if (file.size > MAX_USER_AUDIO_FILE_BYTES) {
      return { ok: false, reason: 'file_too_large' };
    }

    const dataUrl = await readFileAsDataUrl(file);

    if (!dataUrl) {
      return { ok: false, reason: 'read_failed' };
    }

    const baseName = file.name.replace(/\.[^/.]+$/, '').trim();
    const name = baseName.length > 0 ? baseName : 'Трек без названия';

    const track: Track = {
      id: nanoid(),
      name,
      author: 'Локальный файл',
      imageUrl: DEFAULT_USER_COVER,
      favorite: false,
      trackUrl: dataUrl,
      source: 'user',
      addedAt: Date.now()
    };

    tracks.value.push(track);

    const saved = saveUserTracksToStorage(tracks.value);

    if (!saved) {
      tracks.value.pop();

      return { ok: false, reason: 'persist_failed' };
    }

    applyPersistedFavoriteFlags(tracks.value);

    return { ok: true };
  }

  watch(volume, value => {
    writeStoredVolume(value);
  });

  watch(
    () => state.isLooping,
    value => {
      writeStoredBoolean(LOOP_STORAGE_KEY, value);
    }
  );

  watch(
    () => state.isShuffle,
    value => {
      writeStoredBoolean(SHUFFLE_STORAGE_KEY, value);
    }
  );

  watch(
    () => currentTrack.value?.id,
    (nextId, prevId) => {
      writeLastTrackId(nextId === undefined ? null : nextId);

      if (
        nextId !== undefined &&
        nextId !== prevId &&
        state.isPlaying
      ) {
        recordPlay(nextId);
      }

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
    topTracksByPlays,
    newestTracks,
    recordPlay,
    toggleFavorite,
    seekToSeconds,
    playAdjacentTrack,
    playNextTrack,
    playPreviousTrack,
    playRandomTrack,
    toggleLoop,
    toggleShuffle,
    addUserTrackFromFile
  };
});

export default useTracksStore;
export { useTracksStore };
export type { Track, AddUserTrackResult };

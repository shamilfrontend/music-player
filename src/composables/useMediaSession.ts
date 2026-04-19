import { onUnmounted, watch } from 'vue';

import { SEEK_STEP_SECONDS } from '../constants/player';
import { useTracksStore } from '../store/modules/tracks';

function resolveArtworkUrl(imageUrl: string): string {
  if (typeof window === 'undefined') {
    return imageUrl;
  }

  try {
    return new URL(imageUrl, window.location.href).href;
  } catch {
    return imageUrl;
  }
}

function supportsSetPositionState(ms: MediaSession): boolean {
  return typeof ms.setPositionState === 'function';
}

function useMediaSession(): void {
  const tracksStore = useTracksStore();

  if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) {
    return;
  }

  const { mediaSession } = navigator;

  function syncMetadata(): void {
    const track = tracksStore.currentTrack;

    if (!track) {
      mediaSession.metadata = null;

      return;
    }

    mediaSession.metadata = new MediaMetadata({
      title: track.name,
      artist: track.author,
      artwork: [
        {
          src: resolveArtworkUrl(track.imageUrl),
          sizes: '512x512',
          type: 'image/jpeg'
        }
      ]
    });
  }

  function syncPlaybackState(): void {
    mediaSession.playbackState = tracksStore.state.isPlaying ? 'playing' : 'paused';
  }

  function syncPositionState(): void {
    if (!supportsSetPositionState(mediaSession)) {
      return;
    }

    const track = tracksStore.currentTrack;

    if (!track) {
      try {
        mediaSession.setPositionState(null);
      } catch {
        // среда без очистки
      }

      return;
    }

    const duration = tracksStore.durationSeconds;
    const positionRaw = tracksStore.currentSeconds;

    if (!Number.isFinite(duration) || duration <= 0) {
      try {
        mediaSession.setPositionState(null);
      } catch {
        // ignore
      }

      return;
    }

    const position = Math.min(Math.max(0, positionRaw), duration);

    try {
      mediaSession.setPositionState({
        duration,
        playbackRate: tracksStore.state.isPlaying ? 1 : 0,
        position
      });
    } catch {
      // невалидные значения в конкретной среде
    }
  }

  function setSeekHandlers(): void {
    try {
      mediaSession.setActionHandler('seekto', (details) => {
        if (
          !details ||
          typeof details.seekTime !== 'number' ||
          !Number.isFinite(details.seekTime)
        ) {
          return;
        }

        tracksStore.seekToSeconds(details.seekTime);
      });
    } catch {
      // нет seekto
    }

    try {
      mediaSession.setActionHandler('seekbackward', (details) => {
        const { durationSeconds } = tracksStore;

        if (!durationSeconds) return;

        const offset =
          details &&
          typeof details.seekOffset === 'number' &&
          Number.isFinite(details.seekOffset) &&
          details.seekOffset > 0
            ? details.seekOffset
            : SEEK_STEP_SECONDS;

        tracksStore.seekToSeconds(
          Math.max(0, tracksStore.currentSeconds - offset)
        );
      });
    } catch {
      // нет seekbackward
    }

    try {
      mediaSession.setActionHandler('seekforward', (details) => {
        const { durationSeconds } = tracksStore;

        if (!durationSeconds) return;

        const offset =
          details &&
          typeof details.seekOffset === 'number' &&
          Number.isFinite(details.seekOffset) &&
          details.seekOffset > 0
            ? details.seekOffset
            : SEEK_STEP_SECONDS;

        tracksStore.seekToSeconds(
          Math.min(durationSeconds, tracksStore.currentSeconds + offset)
        );
      });
    } catch {
      // нет seekforward
    }
  }

  try {
    mediaSession.setActionHandler('play', () => {
      tracksStore.state.isPlaying = true;
    });

    mediaSession.setActionHandler('pause', () => {
      tracksStore.state.isPlaying = false;
    });

    mediaSession.setActionHandler('previoustrack', () => {
      tracksStore.playPreviousTrack();
    });

    mediaSession.setActionHandler('nexttrack', () => {
      tracksStore.playNextTrack();
    });

    setSeekHandlers();
  } catch {
    // среда без поддержки отдельных действий
  }

  syncMetadata();
  syncPlaybackState();
  syncPositionState();

  watch(
    () => tracksStore.currentTrack,
    () => {
      syncMetadata();
    },
    { deep: true }
  );

  watch(
    () => tracksStore.state.isPlaying,
    () => {
      syncPlaybackState();
      syncPositionState();
    }
  );

  watch(
    () =>
      [
        tracksStore.currentSeconds,
        tracksStore.durationSeconds,
        tracksStore.currentTrack?.id
      ] as const,
    () => {
      syncPositionState();
    }
  );

  onUnmounted(() => {
    (
      [
        'play',
        'pause',
        'previoustrack',
        'nexttrack',
        'seekto',
        'seekbackward',
        'seekforward'
      ] as const
    ).forEach((action) => {
      try {
        mediaSession.setActionHandler(action, null);
      } catch {
        // игнор
      }
    });

    mediaSession.metadata = null;
    mediaSession.playbackState = 'none';

    if (supportsSetPositionState(mediaSession)) {
      try {
        mediaSession.setPositionState(null);
      } catch {
        // игнор
      }
    }
  });
}

export { useMediaSession };

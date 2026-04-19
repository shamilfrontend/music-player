import { onUnmounted, watch } from 'vue';

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
  } catch {
    // среда без поддержки отдельных действий
  }

  syncMetadata();
  syncPlaybackState();

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
    }
  );

  onUnmounted(() => {
    (['play', 'pause', 'previoustrack', 'nexttrack'] as const).forEach((action) => {
      try {
        mediaSession.setActionHandler(action, null);
      } catch {
        // игнор
      }
    });

    mediaSession.metadata = null;
    mediaSession.playbackState = 'none';
  });
}

export { useMediaSession };

<script lang="ts" setup>
import { computed, nextTick, onUnmounted, ref, watch } from 'vue';

import type { Nullable } from '../../types';

import { useMediaSession } from '../../composables/useMediaSession';
import { useTracksStore } from '../../store';

defineOptions({ name: 'PlayerMini' });

const tracksStore = useTracksStore();

const audio = ref<Nullable<HTMLAudioElement>>(null);

const isPlaying = computed<boolean>(() => tracksStore.state.isPlaying);
const isLooping = computed<boolean>(() => tracksStore.state.isLooping);
const currentTrack = computed(() => tracksStore.currentTrack);
const isLoading = computed<boolean>(() => tracksStore.state.isLoadingTrack);

const handleWrapperClick = (): void => {
  tracksStore.state.isPlayerScreenShown = true;
};

const toggleTrack = (): void => {
  tracksStore.state.isPlaying = !isPlaying.value;
};

const handleTimeUpdate = () => {
  if (!audio.value) return;

  tracksStore.currentSeconds = Number(audio.value.currentTime);
};

const handleVolumeChange = (event: Event) => {
  const value = (event.target as HTMLAudioElement);

  tracksStore.volume = value.volume * 100;
};

const LOADING_INDICATOR_DELAY_MS = 120;

let loadingIndicatorTimerId: ReturnType<typeof setTimeout> | null = null;

function clearLoadingIndicatorTimer(): void {
  if (loadingIndicatorTimerId !== null) {
    clearTimeout(loadingIndicatorTimerId);
    loadingIndicatorTimerId = null;
  }
}

function scheduleLoadingIndicator(): void {
  clearLoadingIndicatorTimer();
  loadingIndicatorTimerId = setTimeout(() => {
    loadingIndicatorTimerId = null;
    tracksStore.state.isLoadingTrack = true;
  }, LOADING_INDICATOR_DELAY_MS);
}

const handleLoad = (): void => {
  clearLoadingIndicatorTimer();

  if (!audio.value) {
    tracksStore.state.isLoadingTrack = false;

    return;
  }

  if (audio.value.readyState < 2) {
    tracksStore.state.isLoadingTrack = false;
    tracksStore.state.isPlaying = false;

    return;
  }

  tracksStore.durationSeconds = Number(audio.value.duration);
  tracksStore.state.isLoadingTrack = false;

  audio.value.play();
  tracksStore.state.isPlaying = true;
};

const handleAudioError = (): void => {
  clearLoadingIndicatorTimer();
  tracksStore.state.isLoadingTrack = false;
  tracksStore.state.isPlaying = false;
};

const handleEnded = (): void => {
  if (tracksStore.state.isLooping) return;

  const urlBefore = tracksStore.currentTrack?.trackUrl ?? null;

  tracksStore.playNextTrack();

  nextTick(() => {
    if (!audio.value) return;

    const urlAfter = tracksStore.currentTrack?.trackUrl ?? null;

    if (urlBefore !== null && urlBefore === urlAfter) {
      audio.value.currentTime = 0;

      if (tracksStore.state.isPlaying) {
        audio.value.play().catch(() => {
          // автовоспроизведение может быть заблокировано политикой браузера
        });
      }
    }
  }).catch(() => {
    // nextTick
  });
};

useMediaSession();

watch(
  () => tracksStore.currentTrack?.trackUrl ?? null,
  (url) => {
    clearLoadingIndicatorTimer();

    if (!url) {
      tracksStore.state.isLoadingTrack = false;

      return;
    }

    scheduleLoadingIndicator();
  },
  { immediate: true }
);

onUnmounted(() => {
  clearLoadingIndicatorTimer();
});

watch(() => tracksStore.state.isPlaying, (value: boolean) => {
  if (!audio.value) return;

  if (value && audio.value.readyState >= 2) {
    audio.value.play();
    return;
  }

  audio.value.pause();
});

watch(() => tracksStore.volume, () => {
  if (!audio.value) return;

  audio.value.volume = tracksStore.volume / 100;
});

watch(
  () => tracksStore.pendingSeekSeconds,
  (seconds) => {
    if (seconds === null || seconds === undefined) return;

    const element = audio.value;

    if (!element) {
      tracksStore.pendingSeekSeconds = null;

      return;
    }

    element.currentTime = seconds;
    tracksStore.currentSeconds = seconds;
    tracksStore.pendingSeekSeconds = null;
  }
);
</script>

<template>
  <div
    class="player-mini"
    @click="handleWrapperClick"
  >
    <div class="player-mini__content">
      <img
        :src="currentTrack?.imageUrl"
        :alt="currentTrack?.name ? `Обложка: ${currentTrack.name}` : 'Обложка трека'"
        class="player-mini__image"
      />

      <div class="player-mini__info">
        <div class="player-mini__info-name">{{ currentTrack?.name }}</div>
        <div class="player-mini__info-author">
          {{ currentTrack?.author }}
        </div>
      </div>

      <div
        class="player-mini__buttons"
        :class="{ 'player-mini__buttons_loading': isLoading }"
      >
        <button
          type="button"
          class="player-mini__play-btn"
          :aria-label="isPlaying ? 'Пауза' : 'Воспроизведение'"
          :aria-busy="isLoading"
          :disabled="isLoading"
          @click.stop="toggleTrack"
        >
          <i
            class="player-mini__icon fa"
            :class="isPlaying ? 'fa-pause' : 'fa-play'"
            aria-hidden="true"
          />
        </button>
        <span
          v-if="isLoading"
          class="player-mini__loading-overlay"
          aria-hidden="true"
        >
          <i
            class="player-mini__icon player-mini__icon-loading fa fa-spinner"
            aria-hidden="true"
          />
        </span>
      </div>
    </div>

    <audio
      ref="audio"
      class="player-mini__audio"
      :loop="isLooping"
      :src="currentTrack?.trackUrl"
      preload="auto"
      @timeupdate="handleTimeUpdate"
      @loadeddata="handleLoad"
      @ended="handleEnded"
      @error="handleAudioError"
      @volumechange="handleVolumeChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.player-mini {
  min-height: var(--player-mini-height);
  margin: 0 var(--page-padding);
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(135deg, rgba(91, 140, 255, 0.24), rgba(127, 92, 255, 0.18)),
    var(--color-surface-elevated);
  box-shadow: var(--shadow-md);

  &__content {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  &__image {
    display: block;
    width: 52px;
    min-width: 52px;
    height: 52px;
    border-radius: 16px;
    object-fit: cover;
  }

  &__info {
    min-width: 0;
    color: var(--color-text);

    * {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &-name {
      font-size: 15px;
      font-weight: 600;
    }

    &-author {
      font-size: 12px;
      color: rgba(245, 247, 251, 0.72);
    }
  }

  &__buttons {
    position: relative;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    margin-left: auto;

    &_loading {
      .player-mini__play-btn {
        opacity: 0.35;
      }
    }
  }

  &__play-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    padding: 0;
    color: inherit;
    background: transparent;
    border: none;
    cursor: pointer;
  }

  &__loading-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  &__icon {
    font-size: 28px;
    color: var(--color-text);

    &-loading {
      animation: track-icon-rotating 1s linear infinite;
    }
  }
}
</style>

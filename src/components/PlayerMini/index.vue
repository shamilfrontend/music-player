<script lang="ts" setup>
import { computed, ref, watch } from 'vue';

import type { Nullable } from '../../types';

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

const handleLoad = (): void => {
  if (!audio.value) return;

  if (audio.value.readyState >= 2) {
    tracksStore.durationSeconds = Number(audio.value.duration);

    audio.value.play();
    tracksStore.state.isPlaying = true;
    return;
  }

  throw new Error('Failed to load sound file.');
};

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

      <div class="player-mini__buttons">
        <button
          v-if="isLoading"
          type="button"
          aria-label="Загрузка трека"
          @click.stop
        >
          <i
            class="player-mini__icon player-mini__icon-loading fa fa-spinner"
            aria-hidden="true"
          />
        </button>

        <button
          v-else
          type="button"
          :aria-label="isPlaying ? 'Пауза' : 'Воспроизведение'"
          @click.stop="toggleTrack"
        >
          <i
            class="player-mini__icon fa"
            :class="isPlaying ? 'fa-pause' : 'fa-play'"
            aria-hidden="true"
          />
        </button>
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
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    margin-left: auto;
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

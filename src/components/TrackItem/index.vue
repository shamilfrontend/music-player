<template>
  <div
    :class="trackItemClasses"
    @click="handleTrackClick"
  >
    <img
      class="track-item__image"
      :src="track.imageUrl"
      alt="song"
    />

    <div class="track-item__content">
      <div class="track-item__name info-title">{{ track.name }}</div>
      <div class="track-item__author info-subtitle">{{ track.author }}</div>
    </div>

    <div class="track-item__actions">
      <button
        v-if="isLoading"
        type="button"
        class="track-item__btn"
      >
        <i
          class="track-item__icon track-item__icon-loading fa fa-spinner"
          aria-hidden="true"
        />
      </button>

      <template v-else>
        <button
          v-if="0"
          type="button"
          class="track-item__btn"
        >
          <i
            class="track-item__icon fa"
            :class="favoriteIconClasses"
            aria-hidden="true"
          />
        </button>
        <button
          type="button"
          class="track-item__btn"
          @click.stop="handlePlayPauseBtnClick"
        >
          <i
            class="track-item__icon fa"
            :class="playPauseIconClasses"
            aria-hidden="true"
          />
        </button>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import type { PropType } from 'vue';

import { useTracksStore } from '../../store';
import type { ClassValue } from '../../types';

import type {
  TrackItemPropTrack,
  TrackItemProps,
  CurrentTrack,
  TrackItemInstance
} from './types';

export default defineComponent({
  name: 'TrackItem',

  props: {
    track: {
      type: Object as PropType<TrackItemPropTrack>,
      default: () => ({})
    }
  },

  setup(props: TrackItemProps): TrackItemInstance {
    const tracksStore = useTracksStore();

    const isPlaying = computed<boolean>(() => tracksStore.state.isPlaying);

    const currentTrack = computed<CurrentTrack>(() => tracksStore.currentTrack);

    const isCurrentTrackActive = computed<boolean>(
      () => isPlaying.value && props.track.id === currentTrack.value?.id
    );

    const isLoading = computed<boolean>(
      () => tracksStore.state.isLoadingTrack && props.track.id === currentTrack.value?.id
    );

    const trackItemClasses = computed<ClassValue>(() => ({
      'track-item': true,
      'track-item_active': isCurrentTrackActive.value
    }));

    const favoriteIconClasses = computed<string>(
      () => props.track.favorite ? 'fa-heart' : 'fa-heart-o'
    );

    const playPauseIconClasses = computed<string>(
      () => isCurrentTrackActive.value ? 'fa-pause' : 'fa-play'
    );

    const handleTrackClick = (): void => {
      if (isPlaying.value && currentTrack.value?.id === props.track.id) {
        tracksStore.state.isPlaying = false;
        return;
      }

      tracksStore.currentTrack = props.track;

      tracksStore.state.isPlaying = true;
    };

    const handlePlayPauseBtnClick = (): void => {
      tracksStore.state.isPlaying = !isPlaying.value;
    };

    return {
      isPlaying,
      isLoading,
      trackItemClasses,
      favoriteIconClasses,
      playPauseIconClasses,
      handleTrackClick,
      handlePlayPauseBtnClick
    }
  }
});
</script>

<style lang="scss" scoped>
.track-item {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.2s ease-in;
  overflow: auto;
  user-select: none;

  &:hover {
    background-color: var(--dark-color);
  }

  &__image {
    min-width: 48px;
    height: 48px;
    margin-right: 16px;
    object-fit: cover;
    border-radius: 10px;
  }

  &__content {
    flex-grow: 1;
    font-weight: 500;
    color: var(--font-color);
  }

  &__name {
    font-size: 14px;
    line-height: 18px;
  }

  &__author {
    font-size: 12px;
    opacity: 0.8;
  }

  &__actions {
    display: flex;
    min-width: 64px;
    margin-left: auto;
    justify-content: flex-end;
    column-gap: 24px;
  }

  &__icon {
    font-size: 22px;
    color: var(--font-color);

    &-loading {
      animation: track-icon-rotating 1s linear infinite;
    }
  }

  &_active {
    background-color: var(--dark-color);
  }
}
</style>

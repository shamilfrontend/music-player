<template>
  <div
    :class="trackItemClasses"
    @click="handleTrackClick"
  >
    <pre v-if="false">{{ track }}</pre>
    <img class="track-item__image" :src="track.imageUrl" alt="song" />

    <div class="track-item__content">
      <div class="track-item__name info-title">{{ track.name }}</div>
      <div class="track-item__author info-subtitle">{{ track.author }}</div>
    </div>

    <div class="track-item__actions">
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

    const isPlaying = computed<boolean>(() => tracksStore.isPlaying);

    const currentTrack = computed<CurrentTrack>(() => tracksStore.currentTrack);

    const isCurrentTrackActive = computed<boolean>(
      () => isPlaying.value && props.track.id === currentTrack.value?.id
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
        tracksStore.setPlaying(false);
        return;
      }

      tracksStore.setCurrentTrack(props.track);

      tracksStore.setPlaying(true);
    };

    const handlePlayPauseBtnClick = (): void => {
      tracksStore.setPlaying(!isPlaying.value);
    };

    return {
      isPlaying,
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
    min-width: 32px;
    height: 32px;
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
    font-size: 12px;
    line-height: 18px;
  }

  &__author {
    font-size: 10px;
    opacity: 0.7;
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
  }

  &_active {
    background-color: var(--dark-color);
  }
}
</style>

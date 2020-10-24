<template>
  <li class="track-item" @click="handleTrackClick">
    <img class="track-item__image" :src="track.imageUrl" alt="song" />

    <div class="track-item__content">
      <div class="track-item__name info-title">{{ track.name }}</div>
      <div class="track-item__author info-subtitle">{{ track.author }}</div>
    </div>

    <button class="track-item__btn">
      <i class="fa" :class="iconClasses" aria-hidden="true" />
    </button>
  </li>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TrackItem',

  props: {
    track: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    ...mapState('musics', ['isPlaying', 'currentTrack']),

    iconClasses() {
      return this.isPlaying && this.track._id === this.currentTrack._id
        ? 'fa-pause'
        : 'fa-play'
    }
  },

  methods: {
    handleTrackClick() {
      // do nothing
    }
  }
}
</script>

<style lang="scss" scoped>
.track-item {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 10px 20px;
  border-bottom: 1px solid rgba(198, 178, 250, 0.1);
  cursor: pointer;
  transition: all 0.2s ease-in;
  overflow: auto;
  user-select: none;

  &:hover {
    background-color: var(--dark-color);
  }

  &__image {
    border-radius: 10px;
    width: 32px;
    height: 32px;
    object-fit: cover;
    margin-right: 16px;
  }

  &__name {
    font-size: 12px;
    line-height: 18px;
    font-weight: 500;
    color: var(--font-color);
  }

  &__author {
    font-size: 10px;
    color: var(--dark-color-light);
  }

  &__btn {
    margin-left: auto;
  }
}
</style>

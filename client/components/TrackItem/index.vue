<template>
  <li class="track-item" @click="handleTrackClick">
    <img class="track-item__image" :src="track.image" alt="song" />

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
export default {
  name: 'TrackItem',

  props: {
    track: {
      type: Object,
      default: () => ({})
    },
    isPlaying: {
      type: Boolean,
      default: false
    },
    currentTrackId: {
      type: Number,
      default: null
    }
  },

  computed: {
    iconClasses() {
      return this.isPlaying && this.track.id === this.currentTrackId
        ? 'fa-play'
        : 'fa-pause'
    }
  },

  methods: {
    handleTrackClick() {
      this.$emit(this.isPlaying ? 'play' : 'pause', this.track)
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
  background-color: var(--main-color);
  transition: all 0.2s ease-in;
  overflow: auto;
  user-select: none;

  &:hover {
    // background-color: lighten(#{var(--main-color)}, 4%);
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
    color: var(--secondary-font-color);
  }

  &__btn {
    margin-left: auto;
  }
}
</style>

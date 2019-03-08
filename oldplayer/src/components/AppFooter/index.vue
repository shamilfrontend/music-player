<template>
  <transition name="fade">
    <footer
      v-show="isShowMiniMusic"
      class="app-footer"
      :style="{backgroundColor: skinColor}"
    >
      <div class="footer-player">
        <div class="footer-player__img">
          <img
            @click="showPlay"
            ref="img"
            :src="audio.musicImgSrc || (musicData[0] && musicData[0].musicImgSrc) || defaultImg"
            alt="img"
          >
        </div>

        <div class="music-name">
          <p @click="showPlay">
            {{audio.name || (musicData[0] && musicData[0].name) || 'name'}}
          </p>
          <div class="progress">
            <span class="start">
              {{transformTime(now)}}
            </span>
            <div
              @click="changeTime($event)"
              @touchmove="touchMove($event)"
              @touchend="touchEnd($event)"
              ref="progressBar"
              class="progress-bar"
            >
              <div
                class="now"
                ref="now"
                :style="{width: (now / nativeAudio.duration).toFixed(3) * 100 + '%'}"
              ></div>
            </div>
            <span class="end" v-text="totalTime"></span>
          </div>
        </div>
        <div class="music-control">
          <i @click="play()" :class="[isPlaying ? 'pause-icon' : 'play-icon']"></i>
        </div>
      </div>
    </footer>
  </transition>
</template>

<script>
  export default {
    name: 'AppFooter',
    computed: {
      isPlaying() {
        return this.$store.state.isPlaying;
      },
      isShowAsideMenu() {
        return this.$store.state.isShowAsideMenu;
      },
      isShowMiniMusic() {
        return this.$store.state.isShowMiniMusic;
      },
      audio() {
        return this.$store.state.audio;
      },
      DOM() {
        return this.$store.state.DOM;
      },
      musicData() {
        return this.$store.state.musicData;
      },
      skinColor() {
        return this.$store.state.skinColor;
      }
    },
    data() {
      return {
        playIcon: 'play-icon',
        now: 0,
        nativeAudio: {},
        totalTime: '0:00',
        defaultImg: 'https://microzz.com/img/avatar.jpg'
      }
    },
    methods: {
      play() {
        this.$store.commit('play', !this.isPlaying);
        !this.isPlaying ? this.DOM.audio.pause() : this.DOM.audio.play();
      },
      showPlay() {
        if (this.isShowAsideMenu) {
          return;
        }
        this.$store.commit('showIndex', false);
        this.$store.commit('showMiniMusic', false);
      },
      changeTime(event) {
        let progressBar = this.$refs.progressBar;
        let coordStart = progressBar.getBoundingClientRect().left;
        let coordEnd = event.pageX;
        this.nativeAudio.currentTime = (coordEnd - coordStart) / progressBar.offsetWidth * this.nativeAudio.duration;
        this.now = this.nativeAudio.currentTime;
        this.nativeAudio.play();
        this.$store.commit('play', true);
      },
      touchMove(event) {
        let progressBar = this.$refs.progressBar;
        let coordStart = progressBar.getBoundingClientRect().left;
        let coordEnd = event.touches[0].pageX;
        this.$refs.now.style.width = ((coordEnd - coordStart) / progressBar.offsetWidth).toFixed(3) * 100 + '%';
      },
      touchEnd(event) {
        this.nativeAudio.currentTime = this.$refs.now.style.width.replace('%', '') / 100 * this.nativeAudio.duration;
        this.now = this.nativeAudio.currentTime;
        this.nativeAudio.play();
        this.$store.commit('play', true);
      },
      transformTime(seconds) {
        let min, sec;

        min = Math.floor(seconds / 60);
        min = min.toString().length === 1 ? ('0' + min) : min;

        sec = Math.floor(seconds - 60 * min);
        sec = sec.toString().length === 1 ? ('0' + sec) : sec;
        return min + ':' + sec;
      }
    },

    mounted() {
      this.nativeAudio = document.querySelector('audio');
    },
  }
</script>

<style lang="scss" scoped>
  // animate
  .fade-enter-active {
    transition: all .3s ease-in-out;
  }

  .fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .fade-enter, .fade-leave-active {
    transform: translateY(50px);
    opacity: 0;
  }
  // animate end

  .app-footer {
    background-color: #B72712;
    width: 100%;
    height: 70px;
    text-align: center;
  }

  .footer-player {
    display: flex;
    height: 70px;
    line-height: 70px;

    &__img {
      width: 70px;
      height: 70px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 70px;
        height: 70px;
        border-radius: 35px;
        background-size: contain;
        cursor: pointer;
      }
    }

    .music-name {
      flex: 5;
      color: white;
      overflow: hidden;
      position: relative;
      width: 100%;

      p {
        position: relative;
        z-index: 1;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        white-space: nowrap;
      }

      .progress {
        position: absolute;
        width: 100%;
        top: 10px;
        left: 0;

        span.start {
          position: absolute;
          left: 6px;
        }

        span.end {
          position: absolute;
          right: 4px;
        }

        @media screen and(min-width: 600px) {
          span.start {
            position: absolute;
            left: 26px;
          }
          span.end {
            position: absolute;
            right: 30px;
          }
        }

        .progress-bar {
          position: relative;
          width: 50%;
          height: 5px;
          display: inline-block;
          background-color: rgba(255, 255, 255, .5);
          vertical-align: 2px;
          border-radius: 3px;
          cursor: pointer;

          .now {
            position: absolute;
            left: 0;
            display: inline-block;
            max-width: 100%;
            height: 5px;
            background-color: #31c27c;

            &::after {
              content: "";
              position: absolute;
              left: 100%;
              width: 2px;
              height: 6px;
              background-color: white;
            }
          }
        }
      }
    }

    .music-control {
      flex: 1.5;

      i {
        padding-right: 10px;
        width: 45px;
        height: 45px;
        margin-top: 13px;
        display: inline-block;
        cursor: pointer;
        border-radius: 22px;
      }

      .play-icon {
        background: url(./icons/play.svg) no-repeat;
        background-size: contain;

      }

      .pause-icon {
        background: url(./icons/pause.svg) no-repeat;
        background-size: contain;
      }
    }
  }
</style>

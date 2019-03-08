<template>
  <div id="app">

    <transition name="show">
      <div v-show="isShowIndex" class="index">

        <AsideMenu v-show="isShowAsideMenu"/>

        <app-header/>

        <router-view/>

        <app-footer/>
      </div>
    </transition>

    <transition name="showIndex">
      <Play v-show="!isShowIndex"/>
    </transition>

    <audio
      id="audio"
      :src="audio.src || (musicData[0] && musicData[0].src) || defaultSrc"
      :autoplay="isPlaying"
      ref="audio"
      controls
    ></audio>

    <About v-if="isShowAbout"/>
  </div>
</template>

<script>
  import AppHeader from './components/AppHeader/';
  import AppFooter from './components/AppFooter';
  import AsideMenu from './components/AsideMenu/AsideMenu.vue';
  import Play from './components/Play';
  import About from './components/About/About.vue';

  export default {
    name: 'App',
    components: {
      AppHeader,
      AppFooter,
      AsideMenu,
      Play,
      About
    },
    beforeCreate() {
      // this.$store.dispatch('getData');
    },
    mounted() {
      this.$store.commit('findDOM', {
        name: 'audio',
        dom: this.$refs.audio
      });
      this.$refs.audio.addEventListener('ended', () => {
        this.next();
      });
      this.$refs.audio.addEventListener('error', () => {
        this.next();
      });
    },
    computed: {
      audio() {
        return this.$store.state.audio;
      },
      isPlaying() {
        return this.$store.state.isPlaying;
      },
      DOM() {
        return this.$store.state.DOM;
      },
      isShowAsideMenu() {
        return this.$store.state.isShowAsideMenu;
      },
      isShowIndex() {
        return this.$store.state.isShowIndex;
      },
      isShowAbout() {
        return this.$store.state.isShowAbout;
      },
      musicData() {
        return this.$store.state.musicData;
      }
    },
    data() {
      return {
        defaultSrc: 'http://m2.music.126.net/K1SFXCvWf8BO9VEpSvx2ew==/7967061257205150.mp3'
      };
    },
    methods: {
      next() {
        this.audio.index = this.audio.index === this.musicData.length - 1 ? 0 : (++this.audio.index);
        this.$store.commit('toggleMusic', this.audio.index);
      }
    }
  }
</script>

<style lang="scss">
  @import "./styles/base.scss";

  .showIndex-enter-active {
    transition: all .4s ease-out;
  }

  .showIndex-leave-active {
    transition: all 0s ease;
  }

  .showIndex-enter, .showIndex-leave-active {
    transform: translateY(350px);
    opacity: 0;
  }

  .show-enter-active {
    transition: all .4s ease;
  }

  .show-leave-active {
    transition: all 0s ease-out;
  }

  .show-enter, .show-leave-active {
    transform: translateX(-350px);
    opacity: 0;
  }

  .down-enter-active {
    transition: all .2s ease-in-out;
  }

  .down-leave-active {
    transition: all .4s ease-in-out;
  }

  .down-enter, .down-leave-active {
    transform: translateY(-250px);
    opacity: 0;
  }

  #app, .index {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    div.search-page {
      position: absolute;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      z-index: 1;
      // background-color: rgba(0, 0, 0, .5);

      .search-input {
        position: relative;
        flex: 1.1;
        width: 100%;
        background-color: white;
        border: none;

        input {
          width: 90%;
          height: 100%;
          padding: 0 55px 0 30px;
          outline: none;
          border: none;
          font-size: 1.2rem;
        }

        i.icon-search {
          position: absolute;
          top: 9px;
          right: 55px;
          display: inline-block;
          width: 25px;
          height: 25px;
          background: url('./assets/search.svg') no-repeat;
          background-size: contain;
        }

        span {
          display: inline-block;
          position: absolute;
          right: 10px;
          top: 10px;
          width: 23px;
          height: 23px;
          background: url('./assets/close.svg') no-repeat;
          background-size: contain;
        }
      }

      .mask {
        flex: 15;
      }
    }
  }

  #audio {
    display: none;
    width: 100%;
  }
</style>

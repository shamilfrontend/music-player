<template>
  <transition name="fadeIn">
    <div class="aside">
      <div class="aside__inner">
        <div class="aside-menu">
          <div
            :style="{backgroundColor: skinColor}"
            class="aside-top"
          >
            <span class="aside-top__name">Shamil Frontend</span>
            <i class="aside-top__back" @click="showAsideMenu"></i>
          </div>

          <div class="settings">
            <div class="content">
              <ul>
                <li><i class="icon-music"></i>Меню</li>
              </ul>
              <ul>
                <li @click.stop.prevent="$store.commit('showIndex', false)">
                  <i class="icon-skin"></i>Плеер
                </li>
                <li @click="showAbout"><i class="aboutme"></i>Об авторе</li>
              </ul>
              <div class="back">
                <i @click.stop.prevent="showAsideMenu" class="icon-back"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="aside__mask"
        @click.stop.prevent="showAsideMenu"
      ></div>
    </div>
  </transition>

</template>

<script>
  export default {
    name: 'AsideMenu',
    computed: {
      skinColor() {
        return this.$store.state.skinColor;
      }
    },
    methods: {
      showAsideMenu() {
        this.$store.commit('showAsideMenu', false);
      },
      showAbout() {
        this.$store.commit('showAbout', true);
      }
    }
  }
</script>

<style lang="scss" scoped>
  // animate
  .fadeIn-enter-active {
    transition: all .4s ease;
  }

  .fadeIn-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .fadeIn-enter, .fadeIn-leave-active {
    transform: translateX(-250px);
    opacity: 0;
  }
  // animate end

  .aside-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    &__name {}
    &__back {
      display: inline-block;
      background: url('./icons/back.svg') no-repeat;
      width: 20px;
      height: 20px;
      background-size: contain;
    }
  }

  .aside-menu {
    flex: 2;
  }

  .aside {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    z-index: 1;

    &__inner {
      flex: 6;
      display: flex;
      flex-direction: column;
    }

    &__mask {
      flex: 4;
    }

    .aside-top {
      padding: 15px;
      background-color: #B72712;
      box-shadow: 2px 0 10px gray;
      flex: 1;
      color: #ffffff;
    }

    .settings {
      flex: 4.2;
      position: relative;
      height: 100%;
      background: white;
      border-right: 1px solid gray;
      box-shadow: 2px 0 20px gray;

      .content {
        height: 85%;
      }

      ul {
        color: rgba(0, 0, 0, .5);
        border-bottom: 6px solid rgba(0, 0, 0, .04);
        list-style: none;
        padding-left: 0;

        li {
          font-size: 1rem;
          padding: 12px 15px;
          margin-bottom: 0;
          cursor: pointer;

          i {
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-right: 4px;
            vertical-align: text-bottom;
          }

          i.icon-skin {
            background: url('./icons/skin.svg') no-repeat;
            background-size: contain;
          }

          i.icon-music {
            background: url('./icons/music.svg') no-repeat;
            background-size: contain;
          }

          i.aboutme {
            display: inline-block;
            margin-right: 2px;
            width: 20px;
            height: 20px;
            background: url('./icons/about.svg') no-repeat;
            background-size: contain;
          }
        }
      }
    }
  }
</style>

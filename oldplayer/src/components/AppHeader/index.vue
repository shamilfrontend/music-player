<template>
  <header
    :style="{backgroundColor: skinColor}"
    class="app-header"
  >
    <div class="header-top">
      <span @click="showAsideMenu(true)" class="func">
        <i class="func-icon"></i>
      </span>
      <p>Shamil Music</p>
      <span class="search">
        <i @click="toSearch" class="search-icon"></i>
      </span>
    </div>
    <div class="header-tab">
      <router-link
        to="/music-list"
        :class="{'header-tab__item_active': linkBorderIndex === 1}"
        class="header-tab__item"
      >
        Моя музыка
      </router-link>
      <router-link
        to="/find"
        :class="{'header-tab__item_active': linkBorderIndex === 2}"
        class="header-tab__item"
      >
        Поиск
      </router-link>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'AppHeader',

    data() {
      return {
        index: ''
      };
    },
    computed: {
      linkBorderIndex() {
        return this.$store.state.linkBorderIndex;
      },
      skinColor() {
        return this.$store.state.skinColor;
      }
    },
    methods: {
      toSearch() {
        this.$router.push('/find');
      },
      showAsideMenu(flag) {
        this.$store.commit('showAsideMenu', flag);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-header {
    background-color: #B72712;
    color: #fff;
    flex: 0;
    width: 100%;
  }

  .header-top {
    display: flex;
    justify-content: space-between;
    text-align: center;
    padding-top: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, .2);

    span.func {
      flex: 1;
      position: relative;

      i {
        display: inline-block;
        position: absolute;
        width: 20px;
        height: 20px;
        left: 15px;
        bottom: 0;
        background: url(./icons/func.svg) no-repeat;
        background-size: contain;
        cursor: pointer;
      }
    }

    p {
      flex: 1;
    }

    span.search {
      position: relative;
      flex: 1;

      i {
        display: inline-block;
        position: absolute;
        width: 20px;
        height: 20px;
        right: 15px;
        bottom: 0;
        background: url(./icons/search.svg) no-repeat;
        background-size: contain;
        cursor: pointer;
      }
    }
  }

  .header-tab {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    border-bottom: 1px solid #9E9E9E;

    a {
      display: inline-block;
      width: 50%;
    }

    a::after {
      background-color: rgba(255, 255, 255, .2);
      height: 1px;
      bottom: -2px;
    }

    .header-tab__item {
      display: inline-block;
      flex: 1;
      text-align: center;
      padding-top: 10px;
      padding-bottom: 10px;
      &_active {
        font-weight: bold;
        color: #BDBDBD;
        border-bottom: 1px solid #E0F2F1;
      }
    }
  }
</style>

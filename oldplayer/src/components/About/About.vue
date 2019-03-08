<template>
  <transition name="showAbout">
    <div class="about">
      <div class="about-modal">
        <div class="about-modal__top">
          <h2 class="about-modal__title">Об авторе</h2>
          <i @click="showAbout" class="about-modal__close"></i>
        </div>
        <div class="about-modal__middle">
          <img
            class="about-modal__image"
            src="https://pp.userapi.com/c849028/v849028905/8003a/Vf_zXdgLblQ.jpg?ava=1"
            alt="img"
          >
          <div class="about-modal__info">
            <h3>Алисултанов Шамиль</h3>
            <p>Frontend Developer в МаксимаТелеком</p>
            <p>Живу в Москве</p>
            <p>
              Соц сети -
              <a href="https://github.com/shamilfrontend">Github</a>
              <a href="https://vk.com/shamilfrontend">Vk</a>
              <a href="https://www.instagram.com/shamilfrontend/">Instagramm</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'About',
    computed: {
      isShowAbout() {
        return this.$store.state.isShowAbout;
      }
    },
    methods: {
      showAbout() {
        this.$store.commit('showAbout', false);
      }
    }
  }
</script>

<style lang="scss" scoped>
  a {
    color: #3F51B5;
  }

  .about {
    display: flex;
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;

    .mask {
      position: absolute;
      z-index: 0;
      width: 100%;
      height: 100%;
      background: none;
    }
  }

  .about-modal {
    position: relative;
    z-index: 2;
    width: 80%;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 0 20px gray;
    overflow: auto;

    &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    &__title {
      font-size: 20px;
    }

    &__close {
      display: inline-block;
      width: 30px;
      height: 30px;
      background: url('./close.svg') no-repeat;
      background-size: contain;
    }

    &__middle {
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    &__image {
      width: 35%;
      height: auto;
      margin-right: 5%;
    }

    &__info {
      width: 60%;
      h3 {
        font-size: 16px;
        margin-top: 0;
        margin-bottom: 5px;
      }
      p {
        font-size: 13px;
        margin-top: 0;
        margin-bottom: 5px;
        &:last-of-type {
          margin-bottom: 0;
        }
      }
    }
  }

  .showAbout-enter-active {
    transition: all .4s ease-in-out;
  }

  .showAbout-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .showAbout-enter, .showAbout-leave-active {
    transform: rotateZ(180deg);
    opacity: 0;
  }
</style>

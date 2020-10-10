<template>
  <div class="login-page">
    <div class="login-page__inner">
      <h1 class="login-page__title">Вход</h1>
      <input
        v-model="formModel.email"
        type="text"
        placeholder="Введите email"
        class="login-page__field"
      />
      <input
        v-model="formModel.password"
        type="password"
        placeholder="Введите пароль"
        class="login-page__field"
      />
      <button class="login-page__btn" @click="handleLoginBtnClick">
        Войти
      </button>
      <!-- <nuxt-link to="/signup" class="login-page__link">Регистрация</nuxt-link> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignInPage',

  layout: 'site',

  data() {
    return {
      formModel: {
        email: 'shamil@mail.ru',
        password: '123456'
      }
    }
  },

  methods: {
    handleLoginBtnClick() {
      if (!Object.values(this.formModel).every(Boolean)) return
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  text-align: center;
  padding-top: 50px;

  &__field,
  &__btn,
  &__link {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 270px;
    margin-top: 30px;
    height: 34px;
  }

  &__field {
    padding-left: 10px;
    border: 1px solid #eee;
    background-color: #fafafa;
    font-size: 18px;
  }

  &__btn {
    background-color: #4a76a8;
    color: #ffffff;
  }

  &__link {
    color: #c1c1c1;
    text-decoration: none;
  }
}
</style>

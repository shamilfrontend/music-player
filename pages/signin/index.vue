<template>
  <div class="login-page">
    <h1 class="login-page-title">Вход</h1>
    <input type="text" placeholder="Введите логин" class="login-page-field" />
    <input
      type="password"
      placeholder="Введите пароль"
      class="login-page-field"
    />
    <button class="login-page-btn">Войти</button>
    <a href="#" class="login-link">Регистрация</a>
  </div>
</template>

<script>
export default {
  name: 'SignInPage',

  layout: 'site'
}
</script>

<style lang="scss" scoped>
.login-page {
  font-size: 20px;
  text-align: center;
  margin-top: 50px;
}

.login-page-field,
.login-page-btn,
.login-link {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 270px;
  margin-top: 30px;
  height: 34px;
}

.login-page-field {
  padding-left: 10px;
  border: 1px solid #eee;
  background-color: #fafafa;
  font-size: 18px;
}

.login-page-btn {
  background-color: #4a76a8;
  color: #ffffff;
}

.login-link {
  color: #c1c1c1;
  text-decoration: none;
}
</style>

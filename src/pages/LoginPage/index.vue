<script lang="ts" setup>
import { ref } from 'vue';

import { useRouter } from 'vue-router';

import { useAuthStore } from '../../store';

defineOptions({ name: 'LoginPage' });

const router = useRouter();
const authStore = useAuthStore();

const login = ref('');
const password = ref('');

const onSubmit = (): void => {
  authStore.login({ login: login.value, password: password.value });

  if (!authStore.error) {
    router.push({ name: 'HOME' });
  }
};
</script>

<template>
  <div class="login-page">
    <form class="login-page__form" @submit.prevent="onSubmit">
      <h1 class="login-page__title">Вход</h1>

      <label class="login-page__field">
        <span class="login-page__label">Логин</span>
        <input
          v-model="login"
          class="login-page__input"
          type="text"
          name="username"
          autocomplete="username"
        />
      </label>

      <label class="login-page__field">
        <span class="login-page__label">Пароль</span>
        <input
          v-model="password"
          class="login-page__input"
          type="password"
          name="password"
          autocomplete="current-password"
        />
      </label>

      <p v-if="authStore.error" class="login-page__error" role="alert">
        {{ authStore.error }}
      </p>

      <button class="login-page__submit" type="submit">Войти</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100%;
  padding: 12px;
  background-color: var(--dark-color-medium);
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-page__form {
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.login-page__title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
  color: var(--font-color);
  text-align: center;
}

.login-page__field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.login-page__label {
  font-size: 13px;
  color: var(--dark-color-light);
}

.login-page__input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--dark-color-light);
  border-radius: 6px;
  background-color: var(--dark-color);
  color: var(--font-color);
  font-size: 15px;
  font-family: inherit;

  &:focus {
    border-color: var(--second-color);
  }
}

.login-page__error {
  margin: 0;
  font-size: 13px;
  color: #e57373;
}

.login-page__submit {
  margin-top: 4px;
  padding: 12px 16px;
  border-radius: 6px;
  background-color: var(--second-color);
  color: var(--font-color);
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;

  &:hover {
    filter: brightness(1.08);
  }

  &:active {
    filter: brightness(0.95);
  }
}
</style>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import { useRouter } from 'vue-router';

import { useAuthStore } from '../../store';
import { usePageLayout } from '../../composables/usePageLayout';
import UiButton from '../../ui/UiButton.vue';
import UiCard from '../../ui/UiCard.vue';
import UiInput from '../../ui/UiInput.vue';

defineOptions({ name: 'LoginPage' });

const router = useRouter();
const authStore = useAuthStore();
const { pageClassName } = usePageLayout('login-page');

const login = ref('');
const password = ref('');

const errorMessage = computed(() => authStore.error);

const onSubmit = async (): Promise<void> => {
  const isSuccess = await authStore.login({
    login: login.value,
    password: password.value
  });

  if (isSuccess) {
    router.push({ name: 'HOME' });
  }
};
</script>

<template>
  <div :class="pageClassName">
    <div class="login-page__content">
      <ui-card class="login-page__card" elevated>
        <div class="page-heading">
          <span class="page-heading__eyebrow">Music Player</span>
          <h1 class="page-heading__title">Вход в приложение</h1>
          <p class="page-heading__description">
            Авторизуйтесь, чтобы открыть библиотеку, избранное и управление треками.
          </p>
        </div>

        <form class="login-page__form" @submit.prevent="onSubmit">
          <ui-input
            v-model="login"
            label="Логин"
            name="username"
            autocomplete="username"
            placeholder="Введите логин"
            :error="errorMessage"
          />

          <ui-input
            v-model="password"
            label="Пароль"
            type="password"
            name="password"
            autocomplete="current-password"
            placeholder="Введите пароль"
          />

          <ui-button
            type="submit"
            size="lg"
            block
            :loading="authStore.isLoading"
          >
            Войти
          </ui-button>
        </form>
      </ui-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;

  &__content {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: var(--space-8);
  }

  &__card {
    width: 100%;
    max-width: 440px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    margin-top: var(--space-6);
  }
}
</style>

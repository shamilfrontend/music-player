import { computed, ref } from 'vue';

import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';

import type { Nullable } from '../../../types';

export interface LoginCredentials {
  login: string;
  password: string;
}

const useAuthStore = defineStore('auth', () => {
  const token = ref<Nullable<string>>(null);
  const error = ref<Nullable<string>>(null);

  const isAuth = computed<boolean>(() => Boolean(token.value));

  const login = (credentials: LoginCredentials): void => {
    const trimmedLogin = credentials.login.trim();

    if (!trimmedLogin || !credentials.password) {
      error.value = 'Введите логин и пароль';
      return;
    }

    error.value = null;
    token.value = nanoid();
  };

  const logout = (): void => {
    token.value = null;
    error.value = null;
  };

  return {
    token,
    error,
    isAuth,
    login,
    logout
  };
});

export default useAuthStore;
export { useAuthStore };

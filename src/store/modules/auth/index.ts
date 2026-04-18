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
  const isLoading = ref(false);

  const isAuth = computed<boolean>(() => Boolean(token.value));

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    const trimmedLogin = credentials.login.trim();

    isLoading.value = true;

    if (!trimmedLogin || !credentials.password) {
      error.value = 'Введите логин и пароль';
      isLoading.value = false;
      return false;
    }

    error.value = null;
    token.value = nanoid();
    isLoading.value = false;
    return true;
  };

  const logout = (): void => {
    token.value = null;
    error.value = null;
    isLoading.value = false;
  };

  return {
    token,
    error,
    isLoading,
    isAuth,
    login,
    logout
  };
});

export default useAuthStore;
export { useAuthStore };

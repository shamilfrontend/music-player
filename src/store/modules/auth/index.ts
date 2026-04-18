import { computed, ref } from 'vue';

import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';

import type { Nullable } from '../../../types';

export interface LoginCredentials {
  login: string;
  password: string;
}

const AUTH_TOKEN_STORAGE_KEY = 'music-player-auth-token';

function readStoredToken(): Nullable<string> {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    return window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

function persistToken(value: string): void {
  try {
    window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, value);
  } catch {
    // storage может быть недоступен (приватный режим, квота)
  }
}

function clearPersistedToken(): void {
  try {
    window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  } catch {
    // см. persistToken
  }
}

const useAuthStore = defineStore('auth', () => {
  const token = ref<Nullable<string>>(readStoredToken());
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
    const newToken = nanoid();
    token.value = newToken;
    persistToken(newToken);
    isLoading.value = false;
    return true;
  };

  const logout = (): void => {
    token.value = null;
    clearPersistedToken();
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

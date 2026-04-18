import { computed, ref } from 'vue';

import { defineStore } from 'pinia';

import type { Nullable } from '../../../types';

const useAuthStore = defineStore('auth', () => {
  const token = ref<Nullable<string>>(null);

  const isAuth = computed<boolean>(() => Boolean(token.value));

  return {
    token,
    isAuth
  };
});

export default useAuthStore;
export { useAuthStore };

import { defineStore } from 'pinia';

const useAuthStore = defineStore({
    id: 'auth',

    state: () => ({
        token: null
    }),

    getters: {
        isAuth(): boolean {
            return Boolean(this.token);
        },
    },

    actions: {}
});

export default useAuthStore;
export { useAuthStore };

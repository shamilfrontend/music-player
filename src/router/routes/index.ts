import type { RouteRecordRaw, RouteComponent } from 'vue-router';

const HomePage = (): Promise<RouteComponent> => import('../../pages/HomePage/index.vue');
const TracksPage = (): Promise<RouteComponent> => import('../../pages/TracksPage/index.vue');
const FavoritePage = (): Promise<RouteComponent> => import('../../pages/FavoritePage/index.vue');
const AddTrackPage = (): Promise<RouteComponent> => import('../../pages/AddTrackPage/index.vue');
const LoginPage = (): Promise<RouteComponent> => import('../../pages/LoginPage/index.vue');

export const routes: RouteRecordRaw[] = [
    {
        name: 'HOME',
        path: '/',
        component: HomePage,
        meta: {
            layout: 'base',
            requiresAuth: true
        }
    },
    {
        name: 'ALL_TRACKS',
        path: '/tracks',
        component: TracksPage,
        meta: {
            layout: 'base',
            requiresAuth: true
        }
    },
    {
        name: 'FAVORITE',
        path: '/favorite',
        component: FavoritePage,
        meta: {
            layout: 'base',
            requiresAuth: true
        }
    },
    {
        name: 'ADD_TRACK',
        path: '/add',
        component: AddTrackPage,
        meta: {
            layout: 'base',
            requiresAuth: true
        }
    },
    {
        name: 'LOGIN',
        path: '/login',
        component: LoginPage,
        meta: {
            layout: 'empty',
            requiresAuth: false
        }
    },
];

import type { RouteRecordRaw, RouteComponent } from 'vue-router';

const HomePage = (): Promise<RouteComponent> => import('../../pages/HomePage/index.vue');
const FavoritePage = (): Promise<RouteComponent> => import('../../pages/FavoritePage/index.vue');
const AddTrackPage = (): Promise<RouteComponent> => import('../../pages/AddTrackPage/index.vue');
const LoginPage = (): Promise<RouteComponent> => import('../../pages/LoginPage/index.vue');

export const routes: RouteRecordRaw[] = [
    {
        name: 'HOME',
        path: '/',
        component: HomePage
    },
    {
        name: 'FAVORITE',
        path: '/favorite',
        component: FavoritePage
    },
    {
        name: 'ADD_TRACK',
        path: '/add',
        component: AddTrackPage
    },
    {
        name: 'LOGIN',
        path: '/login',
        component: LoginPage
    },
];

import type { RouteRecordRaw, RouteComponent } from 'vue-router';

const HomePage = (): Promise<RouteComponent> => import('../../pages/HomePage/index.vue');
const AddTrackPage = (): Promise<RouteComponent> => import('../../pages/AddTrackPage/index.vue');

export const routes: RouteRecordRaw[] = [
    {
        name: 'HOME',
        path: '/',
        component: HomePage
    },
    {
        name: 'ADD_TRACK',
        path: '/add',
        component: AddTrackPage
    },
];

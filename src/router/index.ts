import type { App } from 'vue';
import type { Router } from 'vue-router';

import { createRouter, createWebHistory } from 'vue-router';

import { routes } from './routes';

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: (_, __, savedPosition) => savedPosition ?? { left: 0, top: 0 },
});

const setupRouter = (app: App<Element>): Router => {
    app.use(router);
    return router;
}

export { router, setupRouter };

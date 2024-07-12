import { createApp } from 'vue';

import { setupStore } from './store';
import { setupRouter } from './router';

import AppComponent from './App.vue';

const app =  createApp(AppComponent);

setupStore(app);
setupRouter(app);

app.mount('#app')

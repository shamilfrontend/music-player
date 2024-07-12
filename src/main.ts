import { createApp } from 'vue';

import Qui from '@qvant/qui-max';
import '@qvant/qui-max/styles';

import { setupStore } from './store';
import { setupRouter } from './router';

import AppComponent from './App.vue';

const app =  createApp(AppComponent);
app.use(Qui);

setupStore(app);
setupRouter(app);

app.mount('#app')

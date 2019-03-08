import Vue from 'vue'
import Router from 'vue-router'

import MusicList from '../components/MusicList';
import Find from '../components/Find/Find.vue';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: '/',
      component: MusicList
    },
    {
      path: '/music-list',
      name: 'MusicList',
      component: MusicList
    },
    {
      path: '/find',
      name: 'Find',
      component: Find
    }
  ],
  mode: 'history',
})

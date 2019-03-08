import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';

import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});

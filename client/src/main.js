import Vue from 'vue';
import VeeValidate from 'vee-validate';
import axios from 'axios';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.prototype.axios = axios.create({
  baseURL: 'http://secrets.arievrachman.xyz/',
});

Vue.use(VeeValidate);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

const axios = require('axios')
import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'development') {
  axios.interceptors.request.use((config) => {
    config.url = config.url.replace('https://cdn.statically.io/gh/matt1484/pokemon-unite-designer/master/public', '')
    return config
  }, (error) => {
    return Promise.reject(error)
  })
}

new Vue({
  render: h => h(App),
}).$mount('#app')

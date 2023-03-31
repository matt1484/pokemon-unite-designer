const axios = require('axios')
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'development') {
  axios.interceptors.request.use((config) => {
    config.url = config.url.replace('https://cdn.statically.io/gh/matt1484/pokemon-unite-designer/master/public', '').replace('https://raw.githubusercontent.com/matt1484/pokemon-unite-designer/master/public/', '')
    return config
  }, (error) => {
    return Promise.reject(error)
  })
}

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

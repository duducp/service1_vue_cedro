// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import Snotify from 'vue-snotify';
import VueNativeSock from 'vue-native-websocket'
import App from './App'
import router from './router'

import 'vuetify/dist/vuetify.min.css'
import "vue-snotify/styles/material.css";
import '@mdi/font/css/materialdesignicons.css'

Vue.use(VueNativeSock, 'ws://localhost:8000/ws', {
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 3000,
})

const options = {
  toast: {
    timeout: 2000,
    showProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true
  }
}
Vue.use(Snotify, options)

Vue.config.productionTip = false
Vue.use(Vuetify, {
  iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

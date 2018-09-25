// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import Snotify from 'vue-snotify';
import App from './App'
import router from './router'

import 'vuetify/dist/vuetify.min.css'
import "vue-snotify/styles/material.css";

Vue.use(Snotify)
Vue.config.productionTip = false

const options = {
  toast: {
    timeout: 2000,
    showProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true
  }
}
Vue.use(Vuetify, options)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

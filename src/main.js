/*
 * Main.js
 * + Initialization station
 *
*/

import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import VueCookie from 'vue-cookie'
import { sync } from 'vuex-router-sync'

import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Vuetify)
Vue.use(VueCookie)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: { App },
})

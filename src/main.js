/*
 * Main.js
 * + Initialization station
 *
*/

import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import '../node_modules/vuetify/dist/vuetify.min.css'
import '../node_modules/animate.css/animate.min.css'
import VueCookie from 'vue-cookie'
import { sync } from 'vuex-router-sync'

import { forOwn } from 'lodash'

import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Vuetify)
Vue.use(VueCookie)

router.beforeEach((to, from, next) => {
  forOwn(store.state.dialogs, (value, key) => {
    if (value.active) {
      store.commit('CLOSE_DIALOG', key)
    }
  })

  next()
})

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: { App },
})

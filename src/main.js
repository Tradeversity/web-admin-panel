/*
 * Main.js
 * + Initialization station
 *
*/

import Vue from 'vue'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
import Vuetify from 'vuetify'
import '../node_modules/vuetify/dist/vuetify.min.css'
import VueCookie from 'vue-cookie'
import { sync } from 'vuex-router-sync'

import { forOwn } from 'lodash'

import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Vuelidate)
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

/* eslint-disable no-undef */
// console.log(store.state.version, VERSION)
if (store.state.version !== VERSION) {
  console.log('clearing state...')

  router.push({ path: '/login' })
  store.commit('OPEN_LOGIN_ALERT', {
    type: 'info',
    message: 'New app version, now refreshing...'
  })

  store.commit('SET_NEW_SCHOOL', {})
  store.commit('SET_NEW_ADMIN', {})
  store.commit('SET_NEW_EVENT', {})
  store.commit('SET_NEW_ORGANIZATION', {})
  store.commit('SET_SELECTED_EVENT', {})
  store.commit('SET_NEW_LISTING', {})
  store.commit('SET_EVENTS', [])
  store.commit('SET_ORGANIZATION_EVENTS', [])
  store.commit('SET_SPONSORED_LISTINGS', [])
  store.commit('SET_SCHOOLS', [])
  store.commit('SET_SCHOOL', {})
  store.commit('SET_USER', {})

  store.commit('SET_VERSION', VERSION)
}

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: { App },
})

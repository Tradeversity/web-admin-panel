// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import _ from 'lodash'
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

router.beforeEach((to, from, next) => {
  next()
  // console.log(to, from)
  if (to.fullPath === from.fullPath) {
    return false
  }
  // console.log('schoolid', store.state.schoolID)
  if (to.fullPath !== '/login' && store.state.schoolID === null) {
    // console.log('true')
    // next({
    //   path: '/login',
      // query: { redirect: to.fullPath },
    // })
  } else {
    next()
  }
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

// const ID = VueCookie.get('TV_ADMIN_SCHOOLID')
// console.log('Setting school ID...', ID)
// store.commit('SET_SCHOOL_ID', ID)
// Check local storage to handle refreshes
// const cookieUser = JSON.parse(this.$cookie.get('user'))

// if (cookieUser === null) {
//   console.log('No local user found...')
//   router.push({ path: '/login' })
// } else if (cookieUser && _.isEqual(store.state.user, cookieUser)) {
//   store.commit('SET_USER', cookieUser)
//   store.commit('SET_TOKEN', window.localStorage.getItem('token'))
// }

// import _ from 'lodash'

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
// import VueCookie from 'vue-cookie'

import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: state,
  actions: actions,
  mutations: mutations,
  getters: getters,
  plugins: [
    createPersistedState(),
    // createPersistedState({
    //   getState: (key) => {
    //     let savedState = VueCookie.get(key)
    //     savedState = JSON.parse(savedState)
    //     console.log('Loading saved state...', savedState)
    //     return savedState
    //   },
    //   setState: (key, state) => {
    //     console.log('Saving state, showing schools', state, state.schools)
    //     return VueCookie.set(key, JSON.stringify(state), { expires: 3 })
    //   }
    // }),
    (store) => {
      // console.log(store)
    }
  ]
})

// import _ from 'lodash'

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import VueCookie from 'vue-cookie'

import state from './state'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: state,
  actions: actions,
  mutations: mutations,
  plugins: [
    createPersistedState({
      getState: (key) => {
        let savedState = VueCookie.get(key)
        savedState = JSON.parse(savedState)
        // console.log('Loading saved state...', savedState)
        return savedState
      },
      setState: (key, state) => {
        // console.log('Saving state, showing schools', state.schools)
        return VueCookie.set(key, JSON.stringify(state), { expires: 3 })
      }
    }),
    (store) => {
      // console.log(store)
    }
  ]
})

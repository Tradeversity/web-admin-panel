import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import VueCookie from 'vue-cookie'

import state from './state'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

// console.log('state', state)
// console.log('actions', actions)
// console.log('mutations', mutations)
// console.log('schoolID', state.schoolID)

export default new Vuex.Store({
  state: state,
  actions: actions,
  mutations: mutations,
  plugins: [
    createPersistedState({
      getState: (key) => {
        let savedState = VueCookie.get(key)
        savedState = JSON.parse(savedState)
        // console.log('SAVED STATE', savedState.schoolID)
        return savedState
      },
      setState: (key, state) => {
        return VueCookie.set(key, JSON.stringify(state), { expires: 3 })
      }
    }),
    (store) => {
      // console.log(store)
    }
  ]
})

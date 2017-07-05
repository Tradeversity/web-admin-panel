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

        return savedState
      },
      setState: (key, state) => {
        const token = VueCookie.get('TV_ADMIN_TOKEN')
        const user = VueCookie.get('TV_ADMIN_USER')

        if (
          token !== null &&
          user !== null &&
          token.length > 1 &&
          user.length > 1
        ) {
          return VueCookie.set('TV_ADMIN_VUEX', JSON.stringify(state), { expires: 3 })
        }

        return false
      }
    }),
    (store) => {
      // console.log(store)
    }
  ]
})

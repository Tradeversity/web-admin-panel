import _ from 'lodash'

import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import VueCookie from 'vue-cookie'

import state from './state'
import actions from './actions'
import mutations from './mutations'
// import getters from './getters'

Vue.use(Vuex)

console.log('state', _.merge({}, ...state))
console.log('actions', _.merge({}, ...actions))
console.log('mutations', _.merge({}, ...mutations))

export default new Vuex.Store({
  state: _.merge({}, ...state),
  actions: _.merge({}, ...actions),
  mutations: _.merge({}, ...mutations),
  plugins: [
    createPersistedState({
      getState: (key) => VueCookie.get(key),
      setState: (key, state) => VueCookie.set(
        key,
        state,
        {
          expires: 3,
          secure: true,
        })
    })
  ]
})

import _ from 'lodash'

const requireState = require.context('.', true, /\.\/.+\/state\.js$/)

requireState.keys().forEach((key) => {
  const storeName = key.replace(/\.\/(.+)\/.+$/, '$1')
  const fromName = `from${_.upperFirst(storeName)}`
  const state = requireState(key)
  const getState = (state = {}) => state[storeName] || {}

  Object.keys(state).forEach((name) => {
    const selector = state[name]
    if (typeof selector === 'function') {
      module.exports[fromName][name] = (state, ...args) => selector(getState(state), ...args)
    }
  })
})

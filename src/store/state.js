// import _ from 'lodash'

const reg = require.context('.', true, /\.\/.+\/state\.js$/)

module.exports = reg.keys().map(key => reg(key).default)
// requireState.keys().forEach((key) => {
//   const storeName = key.replace(/\.\/(.+)\/.+$/, '$1')
//   const fromName = `from${_.upperFirst(storeName)}`
//   const state = requireState(key)
//   const getState = (state = {}) => state[storeName] || {}

//   Object.keys(state).forEach((name) => {
//     const selector = state[name]
//     console.log(selector)
//     if (_.isObject(selector)) {
//       module.exports[fromName][name] = (state, ...args) => selector(getState(state), ...args)
//     }
//   })
// })

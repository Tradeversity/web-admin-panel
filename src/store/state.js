/*
 * State.js
 * + Gets state from stores and puts them
 *   in an object with the key relative to
 *   to their store name
*/

import { assignIn } from 'lodash'

const req = require.context('.', true, /\.\/.+\/state\.js$/)
const state = req.keys().map(key => req(key).default)

export default assignIn({}, ...state)

// import { assignIn, upperFirst } from 'lodash'

// const req = require.context('.', true, /\.\/.+\/state\.js$/)
// const state = {}

// req.keys().map(key => {
//   const storeName = key.replace(/\.\/(.+)\/.+$/, '$1')
//   const fromName = `from${upperFirst(storeName)}`
//   const fromStates = req(key)

//   state[fromName] = fromStates[storeName] = fromStates.default
// })

// export default assignIn({}, ...state)

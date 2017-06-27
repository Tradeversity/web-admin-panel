import { assignIn } from 'lodash'

const req = require.context('.', true, /\.\/.+\/state\.js$/)
const state = req.keys().map(key => req(key).default)

export default assignIn({}, ...state)

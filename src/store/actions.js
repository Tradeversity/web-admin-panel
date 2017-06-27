import { assignIn } from 'lodash'

const req = require.context('.', true, /\.\/.+\/actions\.js$/)
const actions = req.keys().map(key => req(key).default)

export default assignIn({}, ...actions)

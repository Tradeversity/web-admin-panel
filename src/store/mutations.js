import { assignIn } from 'lodash'

const req = require.context('.', true, /\.\/.+\/mutations\.js$/)
const mutations = req.keys().map(key => req(key).default)

export default assignIn({}, ...mutations)

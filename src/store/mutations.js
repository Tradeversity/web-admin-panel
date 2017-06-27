const reg = require.context('.', true, /\.\/.+\/mutations\.js$/)

module.exports = reg.keys().map(key => reg(key).default)

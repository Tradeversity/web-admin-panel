const reg = require.context('.', true, /\.\/.+\/actions\.js$/)

module.exports = reg.keys().map(key => reg(key).default)

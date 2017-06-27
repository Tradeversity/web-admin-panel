const requireGetters = require.context('.', true, /\.\/.+\/getters\.js$/)

requireGetters.keys().forEach((key) => {
  const actions = requireGetters(key)

  Object.keys(actions).forEach((name) => {
    module.exports[name] = actions[name]
  })
})

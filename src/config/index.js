const isDevelopment = true

export default {
  serverURI: isDevelopment
    ? 'https://tradeversity-whitelabel-api.herokuapp.com/v2'
    : 'https://whitelabel-api.tradeversity.com'
}

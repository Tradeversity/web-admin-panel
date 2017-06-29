export default {
  SET_FLAGGED_USERS (state, data) {
    state.flaggedUsers = data.users
  },
  SET_USERS (state, data) {
    state.users = data.users
  }
}

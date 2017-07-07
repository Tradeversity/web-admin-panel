export default {
  SET_FLAGGED_USERS (state, data) {
    state.flaggedUsers = data.users
  },
  SET_USERS (state, data) {
    state.users = data.users
  },
  SET_SELECTED_USER (state, user) {
    state.selectedUser = user
  }
}

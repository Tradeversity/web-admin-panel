export default {
  users: state => state.showFlagged
    ? state.flaggedUsers
    : state.users.filter(user => !user.is_locked)
}

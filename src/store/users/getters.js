export default {
  users: state => state.users.filter(user => !user.is_locked)
}

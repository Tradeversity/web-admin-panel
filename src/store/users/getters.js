import { has } from 'lodash'

export default {
  users: state => {
    if (state.showFlagged && has(state, 'flaggedUsers')) {
      return state.flaggedUsers
    } else if (has(state, 'users')) {
      return state.users.filter(user => !user.is_locked)
    }

    return []
  }
}

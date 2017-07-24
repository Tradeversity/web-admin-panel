const TRIGGER_FAB_ACTION = ({ commit, state }) => {
  const route = state.route.fullPath

  if (route.indexOf('organization') !== -1) {
    commit('SET_NEW_ORGANIZATION', {})
    commit('OPEN_DIALOG', 'AddOrganizationDialog')
  }
}

export default {
  TRIGGER_FAB_ACTION,
}

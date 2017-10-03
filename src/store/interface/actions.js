const TRIGGER_FAB_ACTION = ({ commit, state }) => {
  const route = state.route.fullPath

  if (route.indexOf('organization') !== -1) {
    commit('SET_NEW_ORGANIZATION', {})
    commit('SELECTED_ORGANIZATION', null)
    commit('OPEN_DIALOG', 'AddOrganizationDialog')
  } else if (route.indexOf('sponsors') !== -1) {
    commit('SET_NEW_SPONSORED_LISTING', {
      // title: '',
      // price: '',
      // description: '',
      // category: '',
      // condition: '',
    })
    commit('OPEN_DIALOG', 'AddListingDialog')
  }
}

export default {
  TRIGGER_FAB_ACTION,
}

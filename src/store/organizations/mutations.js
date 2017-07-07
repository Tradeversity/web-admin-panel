export default {
  SET_ORGANIZATIONS (state, data) {
    state.organizations = data.organizations
  },
  SET_NEW_ORGANIZATION (state, data) {
    state.newOrganization = data
  },
  ADD_ORGANIZATION (state, data) {
    state.organizations.unshift(data.organization)
  }
}

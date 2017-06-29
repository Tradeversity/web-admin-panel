export default {
  SET_ORGANIZATIONS (state, data) {
    state.organizations = data.organizations
  },
  SET_NEW_ORGANIZATION (state, data) {
    state.newOrganization = data
  }
}

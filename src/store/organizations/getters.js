const organization = state => ({
  firstName: state.newOrganization.first_name,
  lastName: state.newOrganization.last_name,
  ...state.newOrganization,
})

export default {
  organization,
}

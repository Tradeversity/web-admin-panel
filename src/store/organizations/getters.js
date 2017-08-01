const organization = state => ({
  firstName: state.newOrganization.first_name,
  lastName: state.newOrganization.last_name,
  ...state.newOrganization,
})

export default {
  organization,
  organizations: state => state.organizations
    .filter(organization => !organization.is_locked)
}

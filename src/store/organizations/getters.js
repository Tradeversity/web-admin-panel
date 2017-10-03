export default {
  organizations: state => state.organizations.filter(organization => !organization.is_locked),
  organization: state => state.organizations.find(organization => organization.id === state.selectedOrg) || {},
  isEdit: state => state.selectedOrg !== null || false,
}

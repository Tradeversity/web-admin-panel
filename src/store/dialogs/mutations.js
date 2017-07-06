export default {
  OPEN_FLAGGED_DIALOG (state) {
    state.isFlaggedDialogOpen = true
  },
  CLOSE_FLAGGED_DIALOG (state) {
    state.isFlaggedDialogOpen = false
  },
  OPEN_ADD_LISTING_DIALOG (state) {
    state.isAddListingDialogOpen = true
  },
  CLOSE_ADD_LISTING_DIALOG (state) {
    state.isAddListingDialogOpen = false
  },
  OPEN_ADD_ORGANIZATION_DIALOG (state) {
    state.isAddOrganizationDialogOpen = true
  },
  CLOSE_ADD_ORGANIZATION_DIALOG (state) {
    state.isAddOrganizationDialogOpen = false
  },
  OPEN_ADD_ADMIN_DIALOG (state) {
    state.isAddAdminDialogOpen = true
  },
  CLOSE_ADD_ADMIN_DIALOG (state) {
    state.isAddAdminDialogOpen = false
  },
  OPEN_ADD_SCHOOL_DIALOG (state) {
    state.isAddSchoolDialogOpen = true
  },
  CLOSE_ADD_SCHOOL_DIALOG (state) {
    state.isAddSchoolDialogOpen = false
  },
  OPEN_ADD_EVENT_DIALOG (state) {
    state.isAddEventDialogOpen = true
  },
  CLOSE_ADD_EVENT_DIALOG (state) {
    state.isAddEventDialogOpen = false
  },
  SET_FLAGGED_ITEM (state, item) {
    state.flaggedItem = item
  }
}

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
  OPEN_USER_DIALOG (state) {
    state.isUserDialogOpen = true
  },
  CLOSE_USER_DIALOG (state) {
    state.isUserDialogOpen = false
  },
  SET_FLAGGED_ITEM (state, item) {
    state.flaggedItem = item
  },
  CLOSE_SET_LOCATION_DIALOG (state) {
    state.isSetLocationDialogOpen = false
  },
  OPEN_SET_LOCATION_DIALOG (state) {
    state.isSetLocationDialogOpen = true
  },
  CLOSE_CONFIRM_DIALOG (state) {
    state.isConfirmDialogOpen = false
  },
  OPEN_CONFIRM_DIALOG (state) {
    state.isConfirmDialogOpen = true
  },
  SET_CONFIRMATION_ACTION (state, action) {
    state.confirmationAction = action
  }
}

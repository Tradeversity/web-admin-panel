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
  SET_FLAGGED_ITEM (state, item) {
    state.flaggedItem = item
  }
}

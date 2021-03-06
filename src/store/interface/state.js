export default {
  isDeleteDialogOpen: false,
  isEventLoading: true,
  isEventsOwned: false,
  isDrawerOpen: false,
  isTableLoading: false,
  deleteDialogData: {},
  activeAlert: {
    active: false,
    message: '',
    type: 'info',
  },
  activeDialogAlert: {
    active: false,
    message: '',
    type: 'info',
  },
  dialogs: {
    AddListingDialog: {
      active: false,
    },
    UserDialog: {
      active: false,
    },
    ListingDialog: {
      active: false,
    },
    EventDialog: {
      active: false,
    },
    AddOrganizationDialog: {
      active: false,
    },
    AddAdminDialog: {
      active: false,
    },
    DeleteDialog: {
      active: false,
    }
  },

  /* eslint-disable no-undef */
  version: VERSION
}

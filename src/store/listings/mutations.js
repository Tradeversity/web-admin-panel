export default {
  SET_LISTINGS (state, listings) {
    state.listings = listings
  },
  SET_SELECTED_LISTING (state, listing) {
    state.selectedListing = listing
  },
  SET_FLAGGED_LISTINGS (state, flaggedListings) {
    state.flaggedListings = flaggedListings
  },
  SET_SPONSORED_LISTINGS (state, sponsoredListings) {
    state.sponsoredListings = sponsoredListings
  },
}

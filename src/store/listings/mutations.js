export default {
  SET_LISTINGS (state, data) {
    state.listings = data.listings
  },
  SET_SELECTED_LISTING (state, data) {
    state.selectedListing = data.listing
  },
  SET_FLAGGED_LISTINGS (state, data) {
    state.flaggedListings = data.listings
  },
  SET_SPONSORED_LISTINGS (state, data) {
    state.sponsoredListings = data.listings
  },
}

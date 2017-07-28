export default {
  SET_LISTINGS (state, data) {
    state.listings = data.listings
  },
  SET_SELECTED_LISTING (state, data) {
    if (data.hasOwnProperty('listing')) {
      state.selectedListing = data.listing
    } else {
      state.selectedListing = data
    }
  },
  SET_FLAGGED_LISTINGS (state, data) {
    state.flaggedListings = data.listings
  },
  SET_SPONSORED_LISTINGS (state, data) {
    state.sponsoredListings = data.listings
  },
  SET_WORD_FILTERS (state, filters = []) {
    state.filters = filters
  },
  ADD_FILTER_KEYWORD (state, filter) {
    state.filters.push(filter)
  },
  REMOVE_FILTER_KEYWORD (state, filters) {
    if (state.filters.indexOf(filters) > -1) {
      state.filters.splice(state.filters.indexOf(filters), 1)
    }
  },
  SET_NEW_LISTING (state, listing) {
    state.newListing = listing
  },
  SET_NEW_SPONSORED_LISTING (state, listing) {
    state.newSponsoredListing = listing
  }
}

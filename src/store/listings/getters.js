import { filter, indexOf } from 'lodash'

export default {
  newSponsoredListing: state => state.newSponsoredListing,
  defaultFilters: state => {
    return filter(state.defaultFilters, filter =>
        indexOf(state.filters.disabled_filters, filter.toLowerCase()) === -1)
  },
  disabledFilters: state => state.filters.disabled_filters,
  additionalFilters: state => state.filters.additional_filters,
  flaggedListings: state => state.flaggedListings,
  listings: state => state.listings
}

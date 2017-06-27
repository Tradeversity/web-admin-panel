export default {
  SET_USER (state, user) {
    state.user = user
  },
  SET_SCHOOL (state, school) {
    state.school = school

    if (school.hasOwnProperty('id')) {
      state.schoolID = school.id
    }
  },
  SET_SCHOOLS (state, schools) {
    state.schools = schools
  },
  SET_KEEN (state, keen) {
    state.keen = keen
  },
  SET_EVENTS (state, events) {
    state.events = events
  },
  SET_ORGANIZATION_EVENTS (state, organizationEvents) {
    state.organizationEvents = organizationEvents
  },
  SET_SPONSORED_LISTINGS (state, sponsoredListings) {
    state.sponsoredListings = sponsoredListings
  },
}

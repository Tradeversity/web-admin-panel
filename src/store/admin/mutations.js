export default {
  SET_USER (state, user) {
    state.user = user
  },
  SET_SCHOOL (state, school) {
    state.school = school
    console.log(state.school)

    if (school.hasOwnProperty('id')) {
      state.schoolID = school.id
    }
  },
  SET_SCHOOLS (state, schools) {
    console.log('Setting schools...', schools)
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
  SET_SCHOOL_ADMIN (state, admin) {
    const formattedSchools = state.schools.map((school) => {
      const ID = admin.schoolID

      if (ID === school.id) {
        school.admins.push(admin)
      }

      state.school = school
    })

    state.school = formattedSchools
  },
  SET_NEW_ADMIN (state, admin) {
    state.newAdmin = admin
  },
  SET_NEW_SCHOOL (state, school) {
    state.newSchool = school
  }
}

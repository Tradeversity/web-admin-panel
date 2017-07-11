export default {
  SET_ORGANIZATION_EVENTS (state, data) {
    state.organizationEvents = data.events
  },
  SET_EVENTS (state, data) {
    state.events = data.events
  },
  SET_NEW_EVENT (state, data) {
    state.newEvent = data
  }
}

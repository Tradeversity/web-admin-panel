export default {
  CLOSE_DRAWER (state) {
    state.isDrawerOpen = false
  },
  OPEN_DRAWER (state) {
    state.isDrawerOpen = true
  },
  TOGGLE_DRAWER (state) {
    state.isDrawerOpen = !state.isDrawerOpen
  },
  TOGGLE_TABLE_LOADING (state) {
    state.isTableLoading = !state.isTableLoading
  }
}

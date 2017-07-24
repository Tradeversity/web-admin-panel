import { has } from 'lodash'

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
  },
  TOGGLE_DIALOG (state, name) {
    if (!has(state.dialogs, name)) {
      state.dialogs[name] = {}
      state.dialogs[name].active = false
    }

    state.dialogs[name].active = !state.dialogs[name].active
    state.dialogs[name].origin = state.route.fullPath
  },
  OPEN_DIALOG (state, name) {
    if (!has(state.dialogs, name)) {
      state.dialogs[name] = {}
    }

    state.dialogs[name].active = true
    state.dialogs[name].origin = state.route.fullPath
  },
  CLOSE_DIALOG (state, name) {
    if (!has(state.dialogs, name)) {
      state.dialogs[name] = {}
    }

    state.dialogs[name].active = false
  },
  ADD_DIALOG (state, name) {
    if (!has(state.dialogs, name)) {
      state.dialogs[name] = {}
    }

    state.dialogs[name].active = false
    state.dialogs[name].origin = state.route.fullPath
  },
}

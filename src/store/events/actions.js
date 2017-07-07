import api from '@/api'

const errorHandler = error => {
  console.log(error)
}

const POST_APPROVE_EVENT = ({ getters, dispatch }, eventID) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  api.request('post', `${baseURL}/event/${eventID}/approve`)
    .then(response => {
      dispatch('GET_EVENTS')
    })
    .catch(errorHandler)
}

const POST_DENY_EVENT = ({ getters, dispatch }, eventID) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  api.request('post', `${baseURL}/event/${eventID}/deny`)
    .then(response => {
      dispatch('GET_EVENTS')
    })
    .catch(errorHandler)
}

const GET_EVENTS = ({ getters, commit }) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  api.request('get', `${baseURL}/events`)
    .then(response => {
      commit('SET_EVENTS', response.data)
    })
    .catch(errorHandler)
}

export default {
  POST_APPROVE_EVENT,
  POST_DENY_EVENT,
  GET_EVENTS,
}

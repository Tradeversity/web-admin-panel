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

const GET_ORGANIZATION_EVENTS = ({ getters, commit }) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  api.request('get', `${baseURL}/organization/${getters.organizationID}/events`)
    .then(response => {
      commit('SET_ORGANIZATION_EVENTS', response.data)
    })
    .catch(errorHandler)
}

const DELETE_EVENT = ({ getters, dispatch }, eventID) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  api.request('post', `${baseURL}/event/${eventID}/delete`)
    .then(response => {
      dispatch('GET_EVENTS')
    })
    .catch(errorHandler)
}

const POST_EVENT = ({ getters, dispatch }) => {
  // const baseURL = `/admin/school/${getters.schoolID}`
  console.log(getters.eventFormData)

  // api.request('post', `${baseURL}/event`, getters.eventFormData)
  //   .then(response => {
  //     dispatch('GET_EVENTS')
  //   })
  //   .catch(errorHandler)
}

export default {
  POST_APPROVE_EVENT,
  POST_DENY_EVENT,
  GET_EVENTS,
  GET_ORGANIZATION_EVENTS,
  DELETE_EVENT,
  POST_EVENT,
}

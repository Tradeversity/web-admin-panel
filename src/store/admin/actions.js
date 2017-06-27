import api from '@/api'

const errorHandler = error => {
  console.log(error)
}

/*
 *  Global Admin Endpoints
 */

const GET_ALL_SCHOOLS = ({ state, commit }) => {
  api.request('get', `/admin/school/all`)
    .then(response => {
      commit('SET_SCHOOL', response.data.schools[0])
      commit('SET_SCHOOLS', response.data.schools)
    })
    .catch(errorHandler)
}

const POST_SCHOOL = ({ state }, school) => {
  api.request('post', `/admin/school/`, school)
    .then(response => {})
    .catch(errorHandler)
}

const POST_UPDATE = ({ state }, school) => {
  api.request('post', `/admin/school/${state.schooldID}`, school)
    .then(response => {})
    .catch(errorHandler)
}

/*
 *  University Admin Endpoints
 */

const GET_SCHOOL = ({ state, commit }, schoolID) => {
  const baseURL = `/admin/school/${schoolID}`

  api.request('get', `${baseURL}/`)
    .then(response => {
      commit('SET_SCHOOL', response.data)
    })
    .catch(errorHandler)
}

const GET_KEEN = ({ state, commit }, schoolID) => {
  const baseURL = `/admin/school/${schoolID}`

  api.request('get', `${baseURL}/keen`)
    .then(response => {
      commit('SET_KEEN', response.data)
    })
    .catch(errorHandler)
}

/*
 *  Organizations Admin Endpoints
 */

const GET_EVENTS = ({ state, commit }) => {
  const baseURL = `/admin/school/${state.schooldID}`

  api.request('get', `${baseURL}/events`)
    .then(response => {
      commit('SET_EVENTS', response.data)
    })
    .catch(errorHandler)
}

const GET_SPONSORED_LISTINGS = ({ state, commit }, organizationsID) => {
  const baseURL = `/admin/school/${state.schooldID}`

  api.request('get', `${baseURL}/organization/${organizationsID}/sponsored_listings`)
    .then(response => {
      commit('SET_SPONSORED_LISTINGS', response.data)
    })
    .catch(errorHandler)
}

const GET_ORGANIZATION_EVENTS = ({ state, commit }, organizationsID) => {
  const baseURL = `/admin/school/${state.schooldID}`

  api.request('get', `${baseURL}/organization/${organizationsID}/events`)
    .then(response => {
      commit('SET_ORGANIZATION_EVENTS', response.data)
    })
    .catch(errorHandler)
}

const POST_EVENT = ({ state }, eventID) => {
  const baseURL = `/admin/school/${state.schooldID}`

  api.request('post', `${baseURL}/event/${eventID}/deny`)
    .then(response => {})
    .catch(errorHandler)
}

export default {
  // Global Admin Endpoints
  GET_ALL_SCHOOLS,
  POST_SCHOOL,
  POST_UPDATE,

  // University Admin Endpoints
  GET_SCHOOL,
  GET_KEEN,

  // Organizations Admin Endpoints
  GET_EVENTS,
  GET_SPONSORED_LISTINGS,
  GET_ORGANIZATION_EVENTS,
  POST_EVENT,
}

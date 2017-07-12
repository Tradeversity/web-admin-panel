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

const POST_UPDATE = ({ getters }, school) => {
  api.request('post', `/admin/school/${getters.schooldID}`, school)
    .then(response => {})
    .catch(errorHandler)
}

const POST_ADMIN = ({ state, commit }, admin) => {
  const formattedData = {
    email: admin.email,
    first_name: admin.firstName,
    last_name: admin.lastName,
    password: admin.password,
    school_id: admin.schoolId,
    platform: window.navigator.userAgent,
    type: 'Web',
  }

  api.request(admin.isEdit ? 'put' : 'post', `/admin/`, formattedData)
    .then(response => {
      commit('SET_SCHOOL_ADMIN', admin)
    })
    .catch(errorHandler)
}

const PUT_ADMIN = ({ state, commit }, admin) => {
  const formattedData = {
    email: admin.email,
    first_name: admin.firstName,
    last_name: admin.lastName,
    password: admin.password,
    school_id: admin.schoolId,
    platform: window.navigator.userAgent,
    type: 'Web',
  }

  api.request('put', '/admin/', formattedData)
    .then(response => {
      commit('SET_SCHOOL_ADMIN', admin)
    })
    .catch(errorHandler)
}

const UPDATE_ADMIN = ({ state, commit }, admin) => {
  api.request('post', `/admin/school/${admin.schoolID}`, admin)
    .then(response => {
      // commit('ADD_SCHOOL_ADMIN', admin)
    })
    .catch(errorHandler)
}

const DELETE_ADMIN = ({ state, commit }, admin) => {
  api.request('delete', `/admin/school/${admin.schoolID}`, admin)
    .then(response => {

    })
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

const GET_EVENTS = ({ getters, commit }) => {
  const baseURL = `/admin/school/${getters.schooldID}`

  api.request('get', `${baseURL}/events`)
    .then(response => {
      commit('SET_EVENTS', response.data)
    })
    .catch(errorHandler)
}

const GET_SPONSORED_LISTINGS = ({ getters, commit }, organizationsID) => {
  const baseURL = `/admin/school/${getters.schooldID}`

  api.request('get', `${baseURL}/organization/${organizationsID}/sponsored_listings`)
    .then(response => {
      commit('SET_SPONSORED_LISTINGS', response.data)
    })
    .catch(errorHandler)
}

const GET_ORGANIZATION_EVENTS = ({ getters, commit }, organizationsID) => {
  const baseURL = `/admin/school/${getters.schooldID}`

  api.request('get', `${baseURL}/organization/${organizationsID}/events`)
    .then(response => {
      commit('SET_ORGANIZATION_EVENTS', response.data)
    })
    .catch(errorHandler)
}

const POST_EVENT = ({ getters }, eventItem) => {
  const baseURL = `/admin/school/${getters.schooldID}`
  const data = {
    title: eventItem.title,
    description: eventItem.description,
    start_time: eventItem.startTime,
    end_time: eventItem.endTime,
    location: eventItem.location,
    lat: eventItem.latitude,
    long: eventItem.longitude,
    places_id: eventItem.placesId,
  }

  api.request('post', `${baseURL}/event`, data)
    .then(response => {})
    .catch(errorHandler)
}

export default {
  // Global Admin Endpoints
  GET_ALL_SCHOOLS,
  POST_SCHOOL,
  POST_UPDATE,
  POST_ADMIN,
  PUT_ADMIN,
  DELETE_ADMIN,
  UPDATE_ADMIN,

  // University Admin Endpoints
  GET_SCHOOL,
  GET_KEEN,

  // Organizations Admin Endpoints
  GET_EVENTS,
  GET_SPONSORED_LISTINGS,
  GET_ORGANIZATION_EVENTS,
  POST_EVENT,
}

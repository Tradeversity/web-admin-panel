import api from '@/api'
import { has } from 'lodash'

const errorHandler = error => {
  console.log(error)
}

/*
 *  Global Admin Endpoints
 */

const GET_ADMIN = ({ state, commit }, adminID) => {
  return api.request('get', `/admin/${adminID}`)
    .then(response => response.data)
    .catch(errorHandler)
}

const GET_ALL_SCHOOLS = ({ state, commit }) => {
  return api.request('get', `/admin/school/all`)
    .then(response => {
      commit('SET_SCHOOL', response.data.schools[0])
      commit('SET_SCHOOLS', response.data.schools)

      return response
    })
    .catch(errorHandler)
}

const POST_SCHOOL = ({ state }, school) => {
  const defaultCategories = [
    'everything-else',
    'free',
  ]

  defaultCategories.forEach(value => {
    school.selectedCategories.push(value)
  })

  const data = {
    name: school.name,
    short_name: school.shortName,
    domain_name: school.domainName,
    registration_allowed: school.registration,
    sendy_list_id: school.sendyID,
    long: school.longitude,
    lat: school.latitude,
    allowable_radius: parseInt(school.radius),
    color: [
      parseInt(school.colorRed),
      parseInt(school.colorGreen),
      parseInt(school.colorBlue),
    ],
    categories: school.selectedCategories,
    default_asset: school.defaultAsset,
  }

  api.request('post', `/admin/school/`, data)
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

  console.log('Posting', admin)

  return api.request(admin.isEdit ? 'put' : 'post', `/admin/`, formattedData)
    .then(response => {
      commit('SET_SCHOOL_ADMIN', admin)

      return response
    })
    .catch(errorHandler)
}

const PUT_ADMIN = ({ state, commit }, admin) => {
  const formattedData = {
    school_id: admin.schoolId,
    platform: window.navigator.userAgent,
    type: 'Web',
  }

  if (admin.email) {
    formattedData.email = admin.email
  }

  if (admin.firstName) {
    formattedData.first_name = admin.firstName
  }

  if (admin.lastName) {
    formattedData.last_name = admin.lastName
  }

  if (admin.password) {
    formattedData.password = admin.password
  }

  return api.request('put', `/admin/${admin.id}`, formattedData)
    .then(response => {
      commit('SET_SCHOOL_ADMIN', admin)

      return response
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
  if (!has(admin, 'id')) {
    console.log('Your request is missing an admin ID.')
    return false
  }

  api.request('post', `/admin/${admin.id}/delete`)
    .then(response => response)
    .catch(errorHandler)
}

const DELETE_SCHOOL = ({ state, commit }, schoolID) => {
  return api.request('delete', `/admin/school/${schoolID}/delete`)
    .then(response => {
      return response
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

const GET_KEEN = ({ getters, commit }) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  return api.request('get', `${baseURL}/keen`)
    .then(response => {
      commit('SET_KEEN', response.data.keen_access_key)

      return response
    })
    .catch(errorHandler)
}

const GET_KEEN_MARKETPLACE_USERS = ({ state, commit }) => {
  return api.request('get', '/admin/stats/users')
    .then(response => {
      return response
    })
    .catch(errorHandler)
}

const GET_KEEN_TOTAL_MARKET_VALUE = ({state, commit}, start) => {
  return api.request('get', '/admin/stats/market_value?start=' + start)
    .then(response => {
      return response
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

// const GET_ORGANIZATION_EVENTS = ({ getters, commit }, organizationsID) => {
//   const baseURL = `/admin/school/${getters.schooldID}`

//   api.request('get', `${baseURL}/organization/${organizationsID}/events`)
//     .then(response => {
//       commit('SET_ORGANIZATION_EVENTS', response.data)
//     })
//     .catch(errorHandler)
// }

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
  GET_ADMIN,
  GET_ALL_SCHOOLS,
  POST_SCHOOL,
  POST_UPDATE,
  POST_ADMIN,
  PUT_ADMIN,
  DELETE_ADMIN,
  DELETE_SCHOOL,
  UPDATE_ADMIN,

  // University Admin Endpoints
  GET_SCHOOL,
  GET_KEEN,

  // Organizations Admin Endpoints
  GET_EVENTS,
  GET_SPONSORED_LISTINGS,
  // GET_ORGANIZATION_EVENTS,
  POST_EVENT,

  // Stats
  GET_KEEN_MARKETPLACE_USERS,
  GET_KEEN_TOTAL_MARKET_VALUE
}

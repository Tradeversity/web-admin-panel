import api from '@/api'

const errorHandler = error => {
  console.log(error)
}

const GET_ORGANIZATION = ({ commit, getters }, organization) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  return api.request('get', `${baseURL}/organization/${organization.id}`)
    .then(response => {
      commit('SET_NEW_ORGANIZATION', response.data)

      return response
    })
    .catch(errorHandler)
}

const GET_ORGANIZATIONS = ({ getters, commit }) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  return api.request('get', `${baseURL}/organizations`)
    .then(response => {
      commit('SET_ORGANIZATIONS', response.data)

      return response
    })
    .catch(errorHandler)
}

const PUT_ORGANIZATION = ({ getters, commit, dispatch }) => {
  const {
    id,
    email,
    first_name,
    last_name,
    password,
  } = getters.organization

  if (id === undefined || id === null) {
    return false
  }

  const firstName = first_name // eslint-disable-line
  const lastName = last_name // eslint-disable-line

  const baseURL = `/admin/school/${getters.schoolID}`

  const formattedData = {
    platform: window.navigator.userAgent,
    type: 'Web',
  }

  formattedData.first_name = firstName
  formattedData.last_name = lastName
  formattedData.email = email
  formattedData.password = password

  api.request('put', `${baseURL}/organization/${id}`, formattedData)
    .then(response => {
      dispatch('GET_ORGANIZATIONS')
    })
    .catch(errorHandler)
}

const POST_ORGANIZATION = ({ getters, commit }) => {
  const baseURL = `/admin/school/${getters.schoolID}`
  const formattedData = {
    email: getters.organization.email,
    first_name: getters.organization.first_name,
    last_name: getters.organization.last_name,
    password: getters.organization.password,
    platform: window.navigator.userAgent,
    type: 'Web',
  }

  api.request('post', `${baseURL}/organization`, formattedData)
    .then(response => {
      commit('ADD_ORGANIZATION', response.data)
    })
    .catch(errorHandler)
}

const POST_BLOCK_ORGANIZATION = ({ getters }, organization) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  api.request('post', `${baseURL}/block_organization/${organization.id}`)
    .then(response => {})
    .catch(errorHandler)
}

export default {
  GET_ORGANIZATION,
  GET_ORGANIZATIONS,
  PUT_ORGANIZATION,
  POST_ORGANIZATION,
  POST_BLOCK_ORGANIZATION,
}

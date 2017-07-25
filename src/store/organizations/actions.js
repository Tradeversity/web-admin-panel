import api from '@/api'

const errorHandler = error => {
  console.log(error)
}

const GET_ORGANIZATION = ({ getters }, organization) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  return api.request('get', `${baseURL}/organization/${organization.id}`)
    .then(response => {
      this.$store.commit('SET_NEW_ORGANIZATION', response.data)

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

const PUT_ORGANIZATION = ({ getters, commit }) => {
  const {
    id,
    email,
    firstName,
    lastName,
    password,
  } = getters.organization

  if (id === undefined || id === null) {
    console.log('PUT_ORGANIZATION: An ID is required to send a put request...')
    return false
  }

  const baseURL = `/admin/school/${getters.schoolID}/`

  const formattedData = {
    platform: window.navigator.userAgent,
    type: 'Web',
  }

  if (email) {
    formattedData.email = email
  }

  if (firstName) {
    formattedData.first_name = firstName
  }

  if (lastName) {
    formattedData.last_name = lastName
  }

  if (password) {
    formattedData.password = password
  }

  api.request('post', `${baseURL}/organization`, formattedData)
    .then(response => {
      commit('ADD_ORGANIZATION', response.data)
    })
    .catch(errorHandler)
}

const POST_ORGANIZATION = ({ getters, commit }) => {
  const baseURL = `/admin/school/${getters.schoolID}`
  const formattedData = {
    email: getters.organization.email,
    first_name: getters.organization.firstName,
    last_name: getters.organization.lastName,
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

import api from '@/api'

const errorHandler = error => {
  console.log(error)
}

const GET_ORGANIZATIONS = ({ state, commit }) => {
  const baseURL = `/admin/school/${state.schoolID}`

  api.request('get', `${baseURL}/organizations`)
    .then(response => {
      commit('SET_ORGANIZATIONS', response.data)
    })
    .catch(errorHandler)
}

const POST_ORGANIZATION = ({ state, commit }, organization) => {
  const baseURL = `/admin/school/${state.schoolID}`
  const formattedData = {
    email: organization.email,
    first_name: organization.firstName,
    last_name: organization.lastName,
    password: organization.password,
    platform: window.navigator.userAgent,
    type: 'Web',
  }

  api.request('post', `${baseURL}/organization`, formattedData)
    .then(response => {
      commit('ADD_ORGANIZATION', response.data)
    })
    .catch(errorHandler)
}

const POST_BLOCK_ORGANIZATION = ({ state }, organization) => {
  const baseURL = `/admin/school/${state.schoolID}`

  api.request('post', `${baseURL}/block_organization/${organization.id}`)
    .then(response => {})
    .catch(errorHandler)
}

export default {
  GET_ORGANIZATIONS,
  POST_ORGANIZATION,
  POST_BLOCK_ORGANIZATION,
}

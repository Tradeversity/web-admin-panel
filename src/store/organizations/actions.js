import api from '@/api'

const errorHandler = error => {
  console.log(error)
}

const GET_ORGANIZATIONS = ({ state, commit }) => {
  const baseURL = `/admin/school/${state.schoolID}`

  api.request('get', `${baseURL}/organizations`)
    .then(response => {
      commit('SET_FLAGGED_USERS', response.data)
    })
    .catch(errorHandler)
}

const POST_ORGANIZATION = ({ state }, organization) => {
  const baseURL = `/admin/school/${state.schoolID}`

  api.request('post', `${baseURL}/organization`, organization)
    .then(response => {})
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

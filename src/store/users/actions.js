import api from '@/api'

const errorHandler = error => {
  console.log(error)
}

const GET_USERS = ({ state, commit }) => {
  const baseURL = `/admin/school/${state.schoolID}`

  api.request('get', `${baseURL}/users`)
    .then(response => {
      commit('SET_USERS', response.data)
    })
    .catch(errorHandler)
}

const GET_FLAGGED_USERS = ({ state, commit }) => {
  const baseURL = `/admin/school/${state.schoolID}`

  api.request('get', `${baseURL}/flagged_users`)
    .then(response => {
      commit('SET_FLAGGED_USERS', response.data)
    })
    .catch(errorHandler)
}

const POST_UNFLAG_USER = (state, user) => {
  const baseURL = `/admin/school/${state.schoolID}`

  api.request('post', `${baseURL}/unflag_user`)
    .then(response => {})
    .catch(errorHandler)
}

const POST_WARN_USER = (state, user) => {
  const baseURL = `/admin/school/${state.schoolID}`

  api.request('post', `${baseURL}/warn_user`)
    .then(response => {})
    .catch(errorHandler)
}

const POST_BLOCK_USER = (state, user) => {
  const baseURL = `/admin/school/${state.schoolID}`

  api.request('post', `${baseURL}/block_user`)
    .then(response => {})
    .catch(errorHandler)
}

export default {
  GET_USERS,
  GET_FLAGGED_USERS,
  POST_UNFLAG_USER,
  POST_WARN_USER,
  POST_BLOCK_USER,
}

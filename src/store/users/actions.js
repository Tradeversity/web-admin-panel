import api from '@/api'

const errorHandler = error => {
  console.log(error)
}

const GET_USERS = ({ getters, commit }) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  api.request('get', `${baseURL}/users`)
    .then(response => {
      commit('SET_USERS', response.data)
    })
    .catch(errorHandler)
}

const GET_FLAGGED_USERS = ({ getters, commit }) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  api.request('get', `${baseURL}/flagged_users`)
    .then(response => {
      commit('SET_FLAGGED_USERS', response.data)
    })
    .catch(errorHandler)
}

const POST_FLAG_USER = ({ getters }, userID) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  api.request('post', `${baseURL}/flag/${userID}`)
    .then(response => {})
    .catch(errorHandler)
}

const POST_UNFLAG_USER = ({ getters }, userID) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  api.request('post', `${baseURL}/unflag_user/${userID}`)
    .then(response => {})
    .catch(errorHandler)
}

const POST_WARN_USER = ({ getters }, userID) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  api.request('post', `${baseURL}/warn_user/${userID}`)
    .then(response => {})
    .catch(errorHandler)
}

const POST_BAN_USER = ({ getters }, userID) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  api.request('post', `${baseURL}/block_user/${userID}`)
    .then(response => {})
    .catch(errorHandler)
}

export default {
  GET_USERS,
  GET_FLAGGED_USERS,
  POST_UNFLAG_USER,
  POST_FLAG_USER,
  POST_WARN_USER,
  POST_BAN_USER,
}

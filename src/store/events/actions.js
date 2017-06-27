import api from '@/api'

const errorHandler = error => {
  console.log(error)
}

const POST_APPROVE_EVENT = ({ state }, eventID) => {
  const baseURL = `/admin/school/${state.schoolID}`

  api.request('post', `${baseURL}/event/${eventID}/approve`)
    .then(response => {})
    .catch(errorHandler)
}

const POST_DENY_EVENT = ({ state }, eventID) => {
  const baseURL = `/admin/school/${state.schoolID}`

  api.request('post', `${baseURL}/event/${eventID}/deny`)
    .then(response => {})
    .catch(errorHandler)
}

export default {
  POST_APPROVE_EVENT,
  POST_DENY_EVENT,
}

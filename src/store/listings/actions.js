import api from '@/api'

const errorHandler = error => {
  console.log(error)
}

const GET_LISTING = ({ getters, commit }, listingID) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  api.request('get', `${baseURL}/listings/${listingID}`)
    .then(response => {
      commit('SET_SELECTED_LISTING', response.data)
    })
    .catch(errorHandler)
}

const GET_LISTINGS = ({ getters, commit }) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  api.request('get', `${baseURL}/listings`)
    .then(response => {
      commit('SET_LISTINGS', response.data)
    })
    .catch(errorHandler)
}

const GET_SPONSORED_LISTINGS = ({ getters, commit }) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  api.request('get', `${baseURL}/sponsored_listings`)
    .then(response => {
      commit('SET_SPONSORED_LISTINGS', response.data)
    })
    .catch(errorHandler)
}

const GET_FLAGGED_LISTINGS = ({ getters, commit }) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  api.request('get', `${baseURL}/flagged_listings`)
    .then(response => {
      commit('SET_FLAGGED_LISTINGS', response.data)
    })
    .catch(errorHandler)
}

const POST_REMOVE_LISTING = ({ getters }, listingID) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  api.request('post', `${baseURL}/remove_listing/${listingID}`)
    .then(response => {})
    .catch(errorHandler)
}

const POST_UNFLAG_LISTING = ({ getters }, listingID) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  api.request('post', `${baseURL}/unflag_listing/${listingID}`)
    .then(response => {})
    .catch(errorHandler)
}

const POST_REMOVE_QUESTION = ({ getters }, questionID) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  api.request('post', `${baseURL}/remove_question/${questionID}`)
    .then(response => {})
    .catch(errorHandler)
}

const POST_REMOVE_ANSWER = ({ getters }, answerID) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  api.request('post', `${baseURL}/remove_answer/${answerID}`)
    .then(response => {})
    .catch(errorHandler)
}

const GET_WORD_FILTER = ({ getters, commit }) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  api.request('get', `${baseURL}/word_filter`)
    .then(response => {
      commit('SET_WORD_FILTERS', response.data.word_filter)
    })
    .catch(errorHandler)
}

const PUT_WORD_FILTER = ({ getters, commit }, filters) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  api.request('put', `${baseURL}/word_filter`, {
    words: filters.toString(),
  })
    .then(response => {
      commit('SET_WORD_FILTERS', response.data.word_filter)
    })
    .catch(errorHandler)
}

export default {
  GET_LISTING,
  GET_LISTINGS,
  GET_SPONSORED_LISTINGS,
  GET_FLAGGED_LISTINGS,
  POST_REMOVE_LISTING,
  POST_UNFLAG_LISTING,
  POST_REMOVE_QUESTION,
  POST_REMOVE_ANSWER,
  GET_WORD_FILTER,
  PUT_WORD_FILTER,
}

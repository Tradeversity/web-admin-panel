import api from '@/api'
import { has } from 'lodash'

const errorHandler = error => {
  console.log(error)
}

const GET_LISTING = ({ getters, commit }, listingID) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  return api.request('get', `${baseURL}/listings/${listingID}`)
    .then(response => {
      commit('SET_SELECTED_LISTING', response.data)

      return response
    })
    .catch(errorHandler)
}

const GET_LISTINGS = ({ getters, commit }) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  return api.request('get', `${baseURL}/listings`)
    .then(response => {
      commit('SET_LISTINGS', response.data)

      return response
    })
    .catch(errorHandler)
}

const GET_SPONSORED_LISTINGS = ({ getters, commit }) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  return api.request('get', `${baseURL}/sponsored_listings`)
    .then(response => {
      commit('SET_SPONSORED_LISTINGS', response.data)

      return response
    })
    .catch(errorHandler)
}

const GET_FLAGGED_LISTINGS = ({ getters, commit }) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  return api.request('get', `${baseURL}/flagged_listings`)
    .then(response => {
      commit('SET_FLAGGED_LISTINGS', response.data)

      return response
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

  return api.request('post', `${baseURL}/unflag_listing/${listingID}`)
    .then(response => response)
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

const GET_DEFAULT_FILTERS = ({ getters, commit }) => {
  return api.request('get', `/admin/school/${getters.schoolID}/default_naughty_words`)
    .then(response => {
      commit('SET_DEFAULT_FILTERS', response.data)
      return response
    })
    .catch(errorHandler)
}

const GET_WORD_FILTER = ({ getters, commit }) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  return api.request('get', `${baseURL}/word_filter`)
    .then(response => {
      commit('SET_WORD_FILTERS', response.data)

      return response
    })
    .catch(errorHandler)
}

const PUT_WORD_FILTER = ({ getters, commit }, filters) => {
  const baseURL = `/admin/school/${getters.schoolID}`

  api.request('put', `${baseURL}/word_filter`, {
    additional_filters: getters.additionalFilters,
    disabled_filters: getters.disabledFilters,
  })
    .then(response => {
      commit('SET_WORD_FILTERS', response.data)
    })
    .catch(errorHandler)
}

const POST_IMAGE = ({ getters, commit }, imageFile) => {
  const data = new FormData()
  data.append('image', imageFile, imageFile.name)

  return api.request('post', `/media/upload_image`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
    .then(response => {
      return response.data.media
    })
    .catch(errorHandler)
}

const POST_SPONSORED_LISTING = ({ getters, commit }, listingFormData) => {
  const data = {
    title: listingFormData.title,
    description: listingFormData.description,
    price: listingFormData.price,
    listing_type: 'item',
    primary_media_id: listingFormData.assets[0].id,
    category: listingFormData.category,
    additional_properties: {
      condition: 'meh' // listingFormData.condition,
    },
  }

  if (listingFormData.assets.length > 1) {
    data.media = listingFormData.assets.forEach((value, index) => {
      if (index !== 0) {
        return value
      }
    })
  }

  return api.request('post', '/listings/', data)
    .then(response => response)
    .catch(errorHandler)
}

const PUT_SPONSORED_LISTING = (state, listingFormData) => {
  if (listingFormData.id === null || listingFormData.id === undefined) {
    console.log('An ID needs to be specified.')
    return
  }

  const data = {
    listing_type: 'item',
  }

  if (listingFormData.title) {
    data.title = listingFormData.title
  }

  if (listingFormData.description) {
    data.description = listingFormData.description
  }

  if (listingFormData.price) {
    data.price = listingFormData.price
  }

  if (listingFormData.price) {
    data.price = listingFormData.price
  }

  if (has(listingFormData, 'assets') && listingFormData.assets.length > 0) {
    data.primary_media_id = listingFormData.assets[0].id
  }

  if (listingFormData.category) {
    data.category = listingFormData.category
  }

  if (listingFormData.condition) {
    data.additional_properties = {
      condition: 'meh'
    }
  }

  if (has(listingFormData, 'assets') && listingFormData.assets.length > 1) {
    data.media = listingFormData.assets.forEach((value, index) => {
      if (index !== 0) {
        return value
      }
    })
  }

  return api.request('put', `/listings/${listingFormData.id}`, data)
    .then(response => response)
    .catch(errorHandler)
}

const DELETE_LISTING = ({ getters, commit }, listingID) => {
  return api.request('post', `/listings/${listingID}/archive`)
    .then(response => response)
    .catch(errorHandler)
}

export default {
  GET_LISTING,
  GET_LISTINGS,
  GET_SPONSORED_LISTINGS,
  GET_FLAGGED_LISTINGS,
  GET_DEFAULT_FILTERS,
  POST_REMOVE_LISTING,
  POST_UNFLAG_LISTING,
  POST_REMOVE_QUESTION,
  POST_REMOVE_ANSWER,
  GET_WORD_FILTER,
  PUT_WORD_FILTER,
  POST_IMAGE,
  POST_SPONSORED_LISTING,
  PUT_SPONSORED_LISTING,
  DELETE_LISTING,
}

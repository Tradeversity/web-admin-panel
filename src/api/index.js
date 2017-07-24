
import { has } from 'lodash'

import axios from 'axios'
import router from '@/router'
import store from '@/store'
import config from '@/config'

const statusHandler = status => {
  switch (status) {
    case 400:
    case 401:
    case 403:
    case 500:
    case 503:
      router.push({ path: '/login' })
      break
    default:
  }
}

const token = has(store.state, 'user.access_token') &&
  store.state.user.access_token

if (token && token !== null) {
  axios.defaults.headers.common['Authorization'] = token
}

export default {
  request (method, uri, data = null, options) {
    if (!method) {
      console.error('API function call requires method argument')
      return
    }

    if (!uri) {
      console.error('API function call requires uri argument')
      return
    }

    const url = config.serverURI + uri
    const instance = axios({ method, url, data, ...options })

    axios.interceptors.request.use((config) => {
      return config
    }, (error) => {
      return Promise.reject(error)
    })

    axios.interceptors.response.use((response) => {
      return response
    }, (error) => {
      if (Object.prototype.hasOwnProperty.bind(error, 'response') &&
          Object.prototype.hasOwnProperty.bind(error.response, 'status')) {
        statusHandler(error.response.status)
      } else {
        console.log('There was no returned response object, redirecting to login...')
        router.push({ path: '/' })
      }

      return Promise.reject(error)
    })

    return instance
  }
}

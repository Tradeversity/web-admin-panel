import { has } from 'lodash'

import axios from 'axios'
import router from '@/router'
import store from '@/store'
import config from '@/config'

const statusHandler = status => {
  switch (status) {
    case 400:
      store.commit('OPEN_LOGIN_ALERT', {
        type: 'error',
        message: '400: Bad request',
      })
      router.push({ path: '/login' })
      break
    case 401:
      store.commit('OPEN_LOGIN_ALERT', {
        type: 'error',
        message: '401: User unauthorized',
      })
      router.push({ path: '/login' })
      break
    case 403:
      store.commit('OPEN_LOGIN_ALERT', {
        type: 'error',
        message: '403: User forbidden',
      })
      router.push({ path: '/login' })
      break
    case 500:
      store.commit('OPEN_LOGIN_ALERT', {
        type: 'error',
        message: '500: Internal server error',
      })
      router.push({ path: '/login' })
      break
    case 502:
      store.commit('OPEN_LOGIN_ALERT', {
        type: 'error',
        message: '500: Bad gateway',
      })
      router.push({ path: '/login' })
      break
    case 503:
      store.commit('OPEN_LOGIN_ALERT', {
        type: 'error',
        message: '503: Service unavailable',
      })
      router.push({ path: '/login' })
      break
    default:
  }
}

export default {
  request (method, uri, data = null, options = {}) {
    if (!method) {
      console.error('API function call requires method argument')
      return
    }

    if (!uri) {
      console.error('API function call requires uri argument')
      return
    }

    const url = config.serverURI + uri
    const AUTH_TOKEN = has(store.state, 'user.access_token') &&
      store.state.user.access_token

    if (AUTH_TOKEN && AUTH_TOKEN !== null) {
      options.headers = {}
      options.headers['Authorization'] = AUTH_TOKEN
    }

    const instance = axios({
      method,
      url,
      data,
      ...options
    })

    axios.interceptors.request.use(config => {
      return config
    }, (error) => {
      return Promise.reject(error)
    })

    axios.interceptors.response.use(response => {
      return response
    }, (error) => {
      if (
        Object.prototype.hasOwnProperty.bind(error, 'response') &&
        Object.prototype.hasOwnProperty.bind(error.response, 'status')
      ) {
        if (
          error.config.url.indexOf('upload_image') === -1 &&
          error.config.url.indexOf('archive') === -1
        ) {
          statusHandler(error.response.status)
        } else if (error.config.url.indexOf('archive') !== -1) {
          store.commit('OPEN_DIALOG_ALERT', {
            type: 'error',
            message: '400: Only the creator of this listing can delete it.',
          })
        } else if (error.config.url.indexOf('upload_image') !== -1) {
          store.commit('OPEN_DIALOG_ALERT', {
            type: 'error',
            message: '403: Please verify your email.',
          })
        }
      } else {
        console.log('There was no returned response object, redirecting to login...')
        router.push({ path: '/' })
      }

      return Promise.reject(error)
    })

    return instance
  }
}

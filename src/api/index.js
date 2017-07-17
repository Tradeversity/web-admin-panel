import axios from 'axios'
import router from '@/router'
import config from '../config'
// import cookie from 'vue-cookie'

const statusHandler = status => {
  switch (status) {
    case 401:
    case 500:
    case 503:
      router.push({ path: '/login' })
      break
    default:
  }
}

// const token = cookie.get('TV_ADMIN_TOKEN')
const token = window.localStorage.getItem('TV_ADMIN_TOKEN')
console.log(token)

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

    // if (token !== null) {
    //   axios.defaults.headers.common['Authorization'] = token
    //   axios.defaults.headers.post['Authorization'] = token
    //   axios.defaults.headers.get['Authorization'] = token
    // }

    // console.log('axios', axios.defaults)

    axios.interceptors.request.use((config) => {
      // console.log('TOKEN', token)
      // console.log('REQUEST CONFIG', config)

      // if (token !== null) {
      //   config.headers.common['Authorization'] = token
      //   // config.headers.common['X-Tradeversity-Environment'] = 'Development'
      // }

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

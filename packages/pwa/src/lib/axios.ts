import axios from 'axios'
import { history } from './history'
import { FETCH_API_URL } from '@/config'

axios.defaults.baseURL = FETCH_API_URL
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.status === 401) {
      history.navigate('/login', { replace: true })
    }
    return Promise.reject(error)
  }
)

axios.interceptors.request.use(
  (config) => {
    config.withCredentials = true
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export { axios }

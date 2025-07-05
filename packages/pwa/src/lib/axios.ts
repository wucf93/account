import { history } from './history'
import { FETCH_API_URL } from '@/config'
import { client } from '@/apis/client.gen'

client.setConfig({
  baseURL: FETCH_API_URL,
})

client.instance.interceptors.response.use((response) => {
  if (response.data.code === 401) {
    history.navigate('/login', { replace: true })
  }
  return response
})

client.instance.interceptors.request.use(
  (config) => {
    config.withCredentials = true
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

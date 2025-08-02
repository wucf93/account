import { history } from './history'
import { client } from '@/apis/client.gen'

client.setConfig({
  baseURL: '',
})

client.instance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error?.status === 401) {
      history.navigate('/login', { replace: true })
    }
    return Promise.reject(error)
  }
)

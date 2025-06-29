import { FETCH_API_URL } from '@/config'
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: FETCH_API_URL,
  fetchOptions: {
    credentials: 'include',
  },
})

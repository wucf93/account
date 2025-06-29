import type { Context } from 'hono'
import type { SessionType, UserType } from './auth'

export type AppContext = Context<{
  Bindings: Env
  Variables: { user: UserType; session: SessionType }
}>

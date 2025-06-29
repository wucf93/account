import { fromHono } from 'chanfana'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { auth, UserType, SessionType } from './auth'
import { APIError } from 'better-auth/api'

import { CategoryListRoute } from './endpoints/category/list'
import { TransactionCreateRoute } from './endpoints/transaction/create'
import { TransactionListRoute } from './endpoints/transaction/list'
import { TransactionDeleteRoute } from './endpoints/transaction/delete'

// Start a Hono app
const app = new Hono<{
  Bindings: Env
  Variables: { user: UserType; session: SessionType }
}>()

// 解决跨域问题
app.use(
  '/api/*',
  cors({
    origin: ['http://localhost:5173', 'https://account-b1e.pages.dev'], // replace with your origin
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'DELETE', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  })
)

// 解决权限问题
app.use('/api/*', async (c, next) => {
  const session = await auth(c.env).api.getSession({
    headers: c.req.raw.headers,
  })

  if (!session) {
    c.set('user', null)
    c.set('session', null)

    if (!c.req.path.startsWith('/api/auth')) {
      c.status(401)
      return c.json({
        success: false,
        message: 'Session expired or invalid token',
      })
    }
    return next()
  }

  c.set('user', session.user)
  c.set('session', session.session)
  return next()
})

// 鉴权
app.on(['GET', 'POST'], '/api/auth/**', (c) => auth(c.env).handler(c.req.raw))

// Setup OpenAPI registry
const openapi = fromHono(app, { docs_url: '/' })

// 分类
openapi.get('/api/category/list', CategoryListRoute)

// 交易记录
openapi.post('/api/transaction/create', TransactionCreateRoute)
openapi.get('/api/transaction/list/:transactionDate', TransactionListRoute)
openapi.delete('/api/transaction/list/:transactionId', TransactionDeleteRoute)

// Export the Hono app
export default app

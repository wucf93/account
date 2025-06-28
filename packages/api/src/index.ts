import { fromHono } from 'chanfana'
import { Hono } from 'hono'

import { CategoryListRoute } from './endpoints/category/list'

import { TransactionCreateRoute } from './endpoints/transaction/create'
import { TransactionListRoute } from './endpoints/transaction/list'
import { TransactionDeleteRoute } from './endpoints/transaction/delete'

// Start a Hono app
const app = new Hono<{ Bindings: Env }>()

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

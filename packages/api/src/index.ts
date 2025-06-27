import { fromHono } from "chanfana";
import { Hono } from "hono";

import { CreateTransaction } from "./endpoints/transaction/transactionCreate"
import { ListTransaction } from "./endpoints/transaction/transactionList"

import { ListCategory } from "./endpoints/category/categoryList"

// Start a Hono app
const app = new Hono<{ Bindings: Env }>();

// Setup OpenAPI registry
const openapi = fromHono(app, { docs_url: "/" });

// 交易记录
openapi.post('/api/transactions', CreateTransaction);
openapi.get('/api/transactions', ListTransaction);

// 分类
openapi.get('/api/categories', ListCategory);

// Export the Hono app
export default app;

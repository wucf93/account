import { fromHono } from "chanfana";
import { Hono } from "hono";
import { getAuth, type AuthSession, type AuthUser } from "./lib/auth";
import { CategoryList } from "./endpoints/categoryList";
import { TransactionCreate } from "./endpoints/transactionCreate";
import { TransactionDelete } from "./endpoints/transactionDelete";
import { TransactionList } from "./endpoints/transactionList";
import { TransactionFetch } from "./endpoints/transactionFetch";
import { TransactionUpdate } from "./endpoints/transactionUpdate";
import { TransactionFetchAI } from "./endpoints/transactionFetchAI";

// Start a Hono app
const app = new Hono<{
  Bindings: Env;
  Variables: {
    user: AuthUser | null;
    session: AuthSession | null;
  };
}>();

// Register auth routes
app.on(["POST", "GET"], "/api/auth/**", (c) =>
  getAuth(c.env).handler(c.req.raw)
);

// Register auth middleware
app.use("/api/*", async (c, next) => {
  const session = await getAuth(c.env).api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return c.json({ message: "Unauthorized", success: false }, 401);
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

// Setup OpenAPI registry
const openapi = fromHono(app, { docs_url: "/" });

// Category
openapi.get("/api/category", CategoryList);

// Transaction
openapi
  .post("/api/transaction", TransactionCreate)
  .delete("/api/transaction/:transactionId", TransactionDelete)
  .get("/api/transaction", TransactionList)
  .get("/api/transaction/:transactionId", TransactionFetch)
  .put("/api/transaction/:transactionId", TransactionUpdate)
  .post("/api/transaction/ai", TransactionFetchAI);

// Export the Hono app
export default app;

import { fromHono } from "chanfana";
import { Hono } from "hono";
import { getAuth, type AuthSession, type AuthUser } from "./lib/auth";
import { CategoryList } from "./endpoints/categoryList";
import { TransactionCreate } from "./endpoints/transactionCreate";
import { TransactionDelete } from "./endpoints/transactionDelete";

// Start a Hono app
const app = new Hono<{
  Bindings: Env;
  Variables: {
    user: AuthUser | null;
    session: AuthSession | null;
  };
}>();

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

// Register auth routes
app.on(["POST", "GET"], "/api/auth/**", (c) =>
  getAuth(c.env).handler(c.req.raw)
);

// Setup OpenAPI registry
const openapi = fromHono(app, { docs_url: "/" });

// Register OpenAPI endpoints
// openapi.get("/api/tasks", TaskList);
// openapi.get("/api/tasks/:taskSlug", TaskFetch);
// openapi.delete("/api/tasks/:taskSlug", TaskDelete);

// Transaction
openapi
  .post("/api/transaction", TransactionCreate)
  .delete("/api/transaction/:transactionId", TransactionDelete);

// Category
openapi.get("/api/category", CategoryList);

// Export the Hono app
export default app;

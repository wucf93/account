import { fromHono } from "chanfana";
import { Hono } from "hono";
import { auth } from "./lib/auth";
import { TaskCreate } from "./endpoints/taskCreate";
import { TaskDelete } from "./endpoints/taskDelete";
import { TaskFetch } from "./endpoints/taskFetch";
import { TaskList } from "./endpoints/taskList";
// Category
import { CategoryList } from "./endpoints/categoryList";

// Start a Hono app
const app = new Hono<{ Bindings: Env }>();

// Register auth routes
app.on(["POST", "GET"], "/api/auth/**", (c) => auth(c.env).handler(c.req.raw));

// Setup OpenAPI registry
const openapi = fromHono(app, { docs_url: "/" });

// Register OpenAPI endpoints
// openapi.get("/api/tasks", TaskList);
// openapi.post("/api/tasks", TaskCreate);
// openapi.get("/api/tasks/:taskSlug", TaskFetch);
// openapi.delete("/api/tasks/:taskSlug", TaskDelete);

// Category
openapi.get("/api/categories", CategoryList);

// Export the Hono app
export default app;

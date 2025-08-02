import type { Context } from "hono";
import type { AuthSession, AuthUser } from "./lib/auth";

export type AppContext = Context<{
  Bindings: Env;
  Variables: {
    user: AuthUser | null;
    session: AuthSession | null;
  };
}>;

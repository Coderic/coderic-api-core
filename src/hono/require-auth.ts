import { createMiddleware } from "hono/factory";
import type { AuthPrincipal } from "@coderic/acl";

export type ResolveAuthUser = (authorizationHeader: string) => Promise<AuthPrincipal | null>;

export function createRequireAuth(resolveUser: ResolveAuthUser) {
  return createMiddleware<{ Variables: { user: AuthPrincipal } }>(async (c, next) => {
    const auth = c.req.header("Authorization") || "";
    if (!auth.startsWith("Bearer ")) {
      return c.json({ error: "unauthorized", message: "Missing Bearer token" }, 401);
    }
    const user = await resolveUser(auth);
    if (!user) {
      return c.json({ error: "unauthorized", message: "Invalid or expired token" }, 401);
    }
    c.set("user", user);
    await next();
  });
}

export function getAuthUser(c: { get: (key: "user") => AuthPrincipal }): AuthPrincipal {
  return c.get("user");
}

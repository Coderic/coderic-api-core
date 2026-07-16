import type { MiddlewareHandler } from "hono";
import { PortalError, errorBody } from "../errors.js";

export function registerOnError(app: { onError: (handler: (err: Error, c: { json: (body: unknown, status: number) => Response }) => Response) => void }): void {
  app.onError((err, c) => {
    if (err instanceof PortalError) {
      return c.json(errorBody(err), err.statusCode);
    }
    console.error(err);
    return c.json({ error: "internal", message: "Internal error" }, 500);
  });
}

export const cacheControlMiddleware: MiddlewareHandler = async (c, next) => {
  await next();
  if (c.res.headers.has("Cache-Control")) return;
  const path = new URL(c.req.url).pathname;
  c.header("Cache-Control", path === "/api/health" ? "public, max-age=60" : "private, no-store");
};

import { Hono } from "hono";

export type HealthRouteOptions = {
  service: string;
  namespace: string;
};

export function createHealthRoute(options: HealthRouteOptions) {
  const app = new Hono();
  app.get("/health", (c) =>
    c.json({
      ok: true,
      service: options.service,
      namespace: options.namespace,
      timestamp: new Date().toISOString(),
    }),
  );
  return app;
}

export function createAccountRoute(userinfoUrl: string) {
  const app = new Hono();
  app.get("/account", async (c) => {
    const auth = c.req.header("Authorization") || "";
    if (!auth.startsWith("Bearer ")) {
      return c.json({ error: "unauthorized", message: "Missing Bearer token" }, 401);
    }
    const res = await fetch(userinfoUrl, { headers: { Authorization: auth } });
    const data = await res.json();
    return c.json(data, res.status as 200);
  });
  return app;
}

export function createHelloWorldRoute(namespace: string) {
  const app = new Hono();
  app.get("/hello-world", (c) => {
    const auth = c.req.header("Authorization") || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
    if (!token) {
      return c.json({ error: "unauthorized", message: "Bearer token required" }, 401);
    }
    return c.json({
      ok: true,
      message: "hello-world",
      endpoint: "/api/hello-world",
      namespace,
      timestamp: new Date().toISOString(),
    });
  });
  return app;
}

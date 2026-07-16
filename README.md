# @coderic/api-core

Shared Hono utilities for portal APIs: error handling, cache headers, auth middleware, route factories.

No OIDC endpoints or tenant configuration are embedded.

## Install

```bash
npm install @coderic/api-core @coderic/acl hono
```

## Usage

```ts
import { registerOnError, cacheControlMiddleware, createAccountRoute } from "@coderic/api-core/hono";

registerOnError(app);
app.use("*", cacheControlMiddleware);
app.route("/", createAccountRoute("https://id.example.com/userinfo"));
```

## License

MIT

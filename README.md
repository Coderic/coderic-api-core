# @coderic/api-core

Shared Hono utilities for Cloudflare Pages Functions and Node.

**No OIDC userinfo URLs or tenant config embedded.** Callers pass endpoints explicitly.

## Install

```bash
npm install @coderic/api-core @coderic/acl hono
```

GitHub Packages:

```ini
@coderic:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Repo: https://github.com/Coderic/coderic-api-core

## Exports

| Import | Symbols |
|--------|---------|
| `@coderic/api-core` | `PortalError`, error helpers |
| `@coderic/api-core/hono` | `registerOnError`, `cacheControlMiddleware`, `createRequireAuth`, `getAuthUser`, `createHealthRoute`, `createAccountRoute` |

## Usage

```ts
import { Hono } from "hono";
import {
  registerOnError,
  cacheControlMiddleware,
  createHealthRoute,
  createAccountRoute,
} from "@coderic/api-core/hono";

const app = new Hono();

registerOnError(app);
app.use("*", cacheControlMiddleware);
app.route("/health", createHealthRoute());
app.route("/account", createAccountRoute("https://auth.example.com/userinfo"));
```

### Auth middleware

```ts
import { createRequireAuth, getAuthUser } from "@coderic/api-core/hono";

const requireAuth = createRequireAuth({
  resolveUser: async (c) => { /* AuthPrincipal | null */ },
});

app.get("/me", requireAuth, (c) => c.json(getAuthUser(c)));
```

Or use `@coderic/acl/hono` `createRequireAuth` when you only need ACL integration.

## Coderic portals

- Root `package.json`: `@coderic/api-core` + `@coderic/acl` for `functions/api/**`.
- **Portal-specific** `OIDC_USERINFO_URL` (e.g. `https://auth.coderic.org/userinfo`) stays in each portal's `functions/api/auth/resolve-user.ts` — not in this package.
- Do not expect `OIDC_USERINFO_URL` export from `@coderic/api-core`.

## License

MIT

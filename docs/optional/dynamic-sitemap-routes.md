# Dynamic sitemap and prerender routes

`scripts/routes.mjs` feeds both `generate-sitemap.mjs` and `prerender.mjs`.

For slugged CMS content (e.g. blog posts), add an async fetch:

```js
export async function getAllRoutes() {
  const blogRoutes = await fetchBlogRoutes();
  return [...STATIC_ROUTES, ...blogRoutes];
}
```

Build-time fetch needs `VITE_API_BASE_URL` set (CI/deploy env). If the API is down, log a warning and ship static routes only.

Reference: [`bpi-frontend/scripts/routes.mjs`](../../../bpi/bpi-frontend/scripts/routes.mjs) (`fetchBlogRoutes`).

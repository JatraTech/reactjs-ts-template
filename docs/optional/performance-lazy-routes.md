# Performance: lazy routes & deferred sections

Adopted from the King Template performance rules (minimal set for this starter).

## Lazy routes

Pages are loaded with `React.lazy` in `src/app/router/index.tsx`. When adding a route, use `lazyPage(() => import("@/pages/YourPage"))` — do not static-import pages in the router.

## Images

- Use `LazyImage` from `src/shared/ui/LazyImage.tsx`.
- Set `priority` only for LCP hero images.
- Pass `srcSet` / `sizes` when your CDN supports width params.

## Heavy widgets

Wrap maps, video players, or charts in `LazySection` so they mount only near the viewport.

## Build

- `bun run build:spa` — faster CI when prerender is not required.
- `bun run build` — full sitemap + Puppeteer prerender for production SEO.

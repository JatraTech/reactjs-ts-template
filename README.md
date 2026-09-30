# Marketing SPA Template

Production-oriented **Vite + React 19** marketing site starter: FSD-lite folders, RTK Query for CMS APIs, three-tier SEO (static HTML + runtime meta + Puppeteer prerender), and Backstage preview support.

**Backend counterpart:** [`../django_template`](../django_template) (Django + Backstage admin).

**Conventions:** [`../docs/frontend-marketing-spa.md`](../docs/frontend-marketing-spa.md) and [`../docs/frontend-fsd-lite.md`](../docs/frontend-fsd-lite.md).

## Features

- React Router 7 data router, Redux Toolkit Query-only store
- `PageSeo` / `SeoHead`, sitemap + `robots.txt` on build, optional prerender
- Preview mode (`?preview=`) with `X-Preview-Token` on API requests
- Sample `features/website` (homepage) and `features/contact` (form POST)
- Bun scripts: `dev`, `build`, `build:spa`, `typecheck`, `lint`, `test`

## Quick start

```bash
cd marketing-spa-template
bun install
cp .env.example .env
bun run dev
```

Open http://localhost:5173. Without a running API, the home page shows static fallbacks.

## Customizing for a new project

Replace `myproject` / `My Project` / example URLs throughout the repo:

| File / area | What to change |
|-------------|----------------|
| `package.json` | `name`, `description` |
| `.env` | `VITE_API_BASE_URL`, `VITE_SITE_URL` |
| `src/shared/config/constants.ts` | Brand name, nav links, social URLs |
| `src/shared/lib/seo/defaults.ts` | Default description, JSON-LD contact |
| `src/index.css` `@theme` | Brand colors |
| `scripts/routes.mjs` | `STATIC_ROUTES` (+ optional dynamic fetch) |
| `.github/workflows/deploy-production.yml` | GitHub environment secrets (`REMOTE_*`) |
| `src/features/*/api/*` | API paths to match your Django `urls.py` |

**Tip:** Search for `myproject`, `My Project`, and `example.com` (case-insensitive).

## Scripts

| Script | Purpose |
|--------|---------|
| `bun run dev` | Vite dev server |
| `bun run build` | Sitemap → `tsc` → Vite → Puppeteer prerender |
| `bun run build:spa` | Sitemap + build **without** prerender (faster) |
| `bun run typecheck` | `tsc -b` |
| `bun run lint` / `format` | ESLint / Prettier |
| `bun run test` | Vitest smoke tests |

Before merging, run: `typecheck`, `lint`, `test`, `build:spa`.

## Pairing with Django + Backstage

1. Copy [`django_template`](../django_template) for the API and wire the `website` app (homepage, site-settings).
2. Align CORS with local frontend ports (`5173`, `3000`) for prerender — see [preview and frontend](../django_template/docs/backstage/features/preview-and-frontend.md).
3. Use the same `VITE_SITE_URL` in frontend `.env` as your public site URL.

## Optional enhancements

See [`docs/optional/`](docs/optional/):

- React Compiler
- HubSpot tracker from site settings
- Dynamic sitemap routes (blog slugs)
- Split `tailwind-theme.css` for large token sets

## Deploy

Push to `main` runs `.github/workflows/deploy-production.yml` (SSH, `bun run build`, `rsync dist/`). Configure repository secrets for your server paths.

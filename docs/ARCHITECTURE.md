# Frontend architecture (FSD-lite)

This template matches the King / ck12 **layering rules** without shipping product-specific pages.

## Layers

| Layer | Role |
|-------|------|
| `app/` | Router, Redux store, providers — no business UI |
| `pages/` | Route entrypoints: fetch via feature hooks, `PageSeo`, compose **widgets** |
| `features/` | One slice per CMS domain: `api/`, `lib/normalize*`, `model/types`, optional `ui/` |
| `widgets/` | Reusable marketing blocks (hero, sections, header/footer, trackers) |
| `shared/` | Brand config, layout shell, design primitives, SEO helpers, CMS utilities |

## Adding a CMS page

1. Create `features/<name>/` with types, normalizer, and `*Api.ts` using `baseApi.injectEndpoints`.
2. Register the API in `app/store/registerApis.ts` and add a `tagTypes` entry in `baseApi`.
3. Add a thin `pages/<Name>Page.tsx` that composes widgets.
4. Register a lazy route in `app/router/index.tsx` and a row in `scripts/routes.mjs`.

## Widget vs feature UI

- **Widget** — used on multiple pages or is pure presentation (e.g. `PageHero`, `MarketingSection`).
- **Feature `ui/`** — sections tied to one domain (e.g. a custom timeline only used on About).

## Data & SEO

- API responses with flat SEO fields are normalized to `{ ...fields, seo: SeoFields }` via `normalizeSeo`.
- Pages pass `cms={data?.seo}` into `PageSeo`.
- **Preview** stays in `baseApi` and `MainLayout` (not in King by default).

## Site settings

Global chrome (logo, social, HubSpot) comes from `features/site-settings`, with defaults in `shared/lib/cms/siteSettingsDefaults.ts` seeded from `brand.config.ts`.

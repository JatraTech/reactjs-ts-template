# HubSpot tracker (optional)

Caissa K12 loads a HubSpot script from CMS `site-settings` and tracks SPA navigations via `_hsq`.

Pattern:

1. Expose `hubspot_portal_id` (or similar) from `GET /website/site-settings/`.
2. Add `widgets/hubspot-tracker/HubSpotTracker.tsx` in the layout.
3. On `useLocation` changes, push `["setPath", pathname]` to `_hsq`.

Reference: [`caissak12-frontend/src/widgets/hubspot-tracker`](../../../caissak12/caissak12-frontend/src/widgets/hubspot-tracker/HubSpotTracker.tsx).

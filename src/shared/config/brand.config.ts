/**
 * Brand surface — edit this first when cloning (tokens in src/index.css @theme, public assets, OG script).
 */
export const brand = {
  name: "My Project",
  tagline: "Marketing site starter",
  description:
    "My Project — Vite + React marketing SPA template with SEO prerender and CMS-ready RTK Query.",

  defaults: {
    apiBase: "http://localhost:8000/api/v1",
    siteUrl: "https://www.example.com",
  },

  contact: {
    email: "hello@example.com",
    telephone: "",
  },

  social: {
    linkedin: "https://www.linkedin.com/company/example",
  },

  seo: {
    foundingDate: "2020",
    knowsAbout: ["Marketing", "Growth"] as string[],
  },

  assets: {
    logoLight: "/logo-light.png",
    logoDark: "/logo-dark.png",
    ogDefault: "/og-default.webp",
    favicon: "/favicon.ico",
  },

  colors: {
    navy: "#0f172a",
    accent: "#2563eb",
  },
} as const;

export type BrandConfig = typeof brand;

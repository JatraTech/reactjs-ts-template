const API_BASE_FALLBACK = "http://localhost:8000/api/v1";
const SITE_URL_FALLBACK = "https://www.example.com";

export const env = {
  apiBase: import.meta.env.VITE_API_BASE_URL ?? API_BASE_FALLBACK,
  siteUrl: (import.meta.env.VITE_SITE_URL ?? SITE_URL_FALLBACK).replace(/\/$/, ""),
};

if (!import.meta.env.VITE_API_BASE_URL && import.meta.env.PROD) {
  console.warn(
    `VITE_API_BASE_URL is not set in environment variables. Using fallback "${API_BASE_FALLBACK}".`,
  );
}

if (!import.meta.env.VITE_SITE_URL && import.meta.env.PROD) {
  console.warn(`VITE_SITE_URL is not set. Using fallback "${SITE_URL_FALLBACK}".`);
}

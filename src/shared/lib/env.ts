import { brand } from "@/shared/config/brand.config";

function requireEnv(name: "VITE_API_BASE_URL" | "VITE_SITE_URL", fallback: string): string {
  const value = import.meta.env[name]?.trim();
  if (value) return value;

  if (import.meta.env.PROD) {
    console.error(
      `[env] ${name} is not set. Using brand default "${fallback}". Set it in CI / host env for production.`,
    );
  } else if (import.meta.env.DEV) {
    console.info(`[env] ${name} unset — using local brand default "${fallback}".`);
  }

  return fallback;
}

export const env = {
  apiBase: requireEnv("VITE_API_BASE_URL", brand.defaults.apiBase).replace(/\/$/, ""),
  siteUrl: requireEnv("VITE_SITE_URL", brand.defaults.siteUrl).replace(/\/$/, ""),
};

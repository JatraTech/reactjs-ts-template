import { brand } from "@/shared/config/brand.config";

export const APP_NAME = brand.name;
export const APP_FULL_NAME = brand.name;
export const APP_TAGLINE = brand.tagline;
export const APP_EMAIL = brand.contact.email;
export const APP_PHONE = brand.contact.telephone;

export const SOCIAL_LINKS: Record<string, string> = { ...brand.social };

export const NAV_LINKS = [
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
] as const;

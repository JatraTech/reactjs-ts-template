import { brand } from "@/shared/config/brand.config";
import { APP_EMAIL, APP_FULL_NAME, APP_TAGLINE, SOCIAL_LINKS } from "@/shared/config/constants";
import { env } from "@/shared/lib/env";

export const SITE_NAME = APP_FULL_NAME;
export const SITE_TAGLINE = APP_TAGLINE;

export const SITE_URL = env.siteUrl;

export const BASE_TITLE = `${SITE_NAME} | ${SITE_TAGLINE}`;

export const DEFAULT_DESCRIPTION = brand.description;

export const DEFAULT_OG_IMAGE = `${SITE_URL}${brand.assets.ogDefault}`;

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: DEFAULT_OG_IMAGE,
  description: DEFAULT_DESCRIPTION,
  ...(APP_EMAIL
    ? {
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: APP_EMAIL,
        },
      }
    : {}),
  sameAs: Object.values(SOCIAL_LINKS),
};

export const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

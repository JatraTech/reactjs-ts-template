import { fallbackSiteSettings } from "@/shared/lib/cms/siteSettingsDefaults";
import type { SiteSettings } from "@/features/site-settings/model/types";

export function normalizeSiteSettings(response: SiteSettings | null | undefined): SiteSettings {
  const base = { ...fallbackSiteSettings, ...(response ?? {}) };

  return {
    ...base,
    site_name: base.site_name?.trim() || fallbackSiteSettings.site_name,
    hubspot_tracking_id: base.hubspot_tracking_id?.trim() ?? "",
    linkedin_url: base.linkedin_url?.trim() || fallbackSiteSettings.linkedin_url,
    instagram_url: base.instagram_url?.trim() ?? "",
    facebook_url: base.facebook_url?.trim() ?? "",
    youtube_url: base.youtube_url?.trim() ?? "",
  };
}

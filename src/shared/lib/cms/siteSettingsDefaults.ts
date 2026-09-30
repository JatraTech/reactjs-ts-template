import { brand } from "@/shared/config/brand.config";
import type { SiteSettings } from "@/features/site-settings/model/types";

export const fallbackSiteSettings: SiteSettings = {
  id: 0,
  site_name: brand.name,
  logo: null,
  favicon: null,
  support_email: brand.contact.email,
  support_phone: brand.contact.telephone,
  hubspot_tracking_id: "",
  linkedin_url: brand.social.linkedin ?? "",
  instagram_url: "",
  facebook_url: "",
  youtube_url: "",
};

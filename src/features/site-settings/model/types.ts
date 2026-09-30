export interface SiteSettings {
  id: number;
  site_name: string;
  logo: string | null;
  favicon: string | null;
  support_email?: string;
  support_phone?: string;
  hubspot_tracking_id: string;
  linkedin_url: string;
  instagram_url: string;
  facebook_url: string;
  youtube_url: string;
}

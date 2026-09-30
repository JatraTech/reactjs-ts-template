import type { CmsSeoFields } from "@/shared/lib/seo/types";

export type HomepageContent = {
  id: number;
  hero_title: string;
  hero_subtitle?: string;
  hero_image: string | null;
  hero_image_alt?: string;
  about_heading?: string;
  about_body?: string;
} & CmsSeoFields;

export type SiteSettings = {
  id: number;
  site_name?: string;
  support_email?: string;
  support_phone?: string;
};

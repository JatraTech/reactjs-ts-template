import type { PageWithSeo, SeoFields } from "@/shared/model/seo";

export interface HomepageFields {
  id: number;
  hero_title: string;
  hero_subtitle?: string;
  hero_subhead?: string;
  hero_eyebrow?: string;
  hero_image: string | null;
  hero_image_alt?: string;
  hero_button_text?: string;
  hero_button_link?: string;
  about_heading?: string;
  about_body?: string;
}

export type HomepageApiResponse = HomepageFields & SeoFields;
export type HomepageContent = PageWithSeo<HomepageApiResponse>;

import type { PageWithSeo, SeoFields } from "@/shared/model/seo";

export interface AboutFields {
  id: number;
  hero_title: string;
  hero_subhead?: string;
  hero_eyebrow?: string;
  hero_image: string | null;
  hero_image_alt?: string;
  body_heading?: string;
  body_html?: string;
}

export type AboutApiResponse = AboutFields & SeoFields;
export type AboutContent = PageWithSeo<AboutApiResponse>;

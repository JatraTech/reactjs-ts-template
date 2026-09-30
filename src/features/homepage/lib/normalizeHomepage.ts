import { normalizeSeo } from "@/shared/lib/cms/normalizeSeo";
import type { HomepageApiResponse, HomepageContent } from "@/features/homepage/model/types";

export function normalizeHomepage(response: HomepageApiResponse): HomepageContent {
  const { seo_title, seo_description, canonical_url, og_title, og_description, og_image, ...rest } =
    response;

  return {
    ...rest,
    hero_subtitle: rest.hero_subtitle ?? rest.hero_subhead ?? "",
    seo: normalizeSeo({
      seo_title,
      seo_description,
      canonical_url,
      og_title,
      og_description,
      og_image,
    }),
  };
}

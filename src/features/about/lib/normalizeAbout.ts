import { normalizeSeo } from "@/shared/lib/cms/normalizeSeo";
import type { AboutApiResponse, AboutContent } from "@/features/about/model/types";

export function normalizeAbout(response: AboutApiResponse): AboutContent {
  const { seo_title, seo_description, canonical_url, og_title, og_description, og_image, ...rest } =
    response;

  return {
    ...rest,
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

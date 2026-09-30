import type { CmsSeoFields } from "@/shared/lib/seo/types";
import type { SeoFields } from "@/shared/model/seo";

export const normalizeSeo = (response: CmsSeoFields): SeoFields => ({
  seo_title: response.seo_title ?? "",
  seo_description: response.seo_description ?? "",
  canonical_url: response.canonical_url ?? "",
  og_title: response.og_title ?? "",
  og_description: response.og_description ?? "",
  og_image: response.og_image ?? null,
});

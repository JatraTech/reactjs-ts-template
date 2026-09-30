import type { HomepageContent } from "../model/types";

/** Map API JSON to HomepageContent. Extend when your serializer adds fields. */
export function normalizeHomepage(data: HomepageContent): HomepageContent {
  return data;
}

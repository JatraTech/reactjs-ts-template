import { baseApi } from "@/app/store/api/baseApi";
import { normalizeSiteSettings } from "@/features/site-settings/lib/normalizeSiteSettings";
import type { SiteSettings } from "@/features/site-settings/model/types";

export const siteSettingsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSiteSettings: build.query<SiteSettings, void>({
      query: () => ({ url: "/website/site-settings/" }),
      transformResponse: (response: SiteSettings) => normalizeSiteSettings(response),
      providesTags: [{ type: "SiteSettings", id: "SINGLETON" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetSiteSettingsQuery } = siteSettingsApi;

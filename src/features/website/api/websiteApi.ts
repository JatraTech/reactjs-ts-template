import { baseApi } from "@/app/store/api/baseApi";
import { normalizeHomepage } from "@/features/website/lib/normalizeHomepage";
import type { HomepageContent, SiteSettings } from "@/features/website/model/types";

export const websiteApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getHomepage: build.query<HomepageContent, void>({
      query: () => ({ url: "/website/homepage/" }),
      transformResponse: (response: HomepageContent) => normalizeHomepage(response),
      providesTags: [{ type: "Homepage", id: "SINGLETON" }],
    }),
    getSiteSettings: build.query<SiteSettings, void>({
      query: () => ({ url: "/website/site-settings/" }),
      providesTags: [{ type: "SiteSettings", id: "SINGLETON" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetHomepageQuery, useGetSiteSettingsQuery } = websiteApi;

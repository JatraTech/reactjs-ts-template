import { baseApi } from "@/app/store/api/baseApi";
import { normalizeHomepage } from "@/features/homepage/lib/normalizeHomepage";
import type { HomepageApiResponse, HomepageContent } from "@/features/homepage/model/types";

export const homepageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getHomepage: build.query<HomepageContent, void>({
      query: () => ({ url: "/website/homepage/" }),
      transformResponse: (response: HomepageApiResponse) => normalizeHomepage(response),
      providesTags: [{ type: "Homepage", id: "SINGLETON" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetHomepageQuery } = homepageApi;

import { baseApi } from "@/app/store/api/baseApi";
import { normalizeAbout } from "@/features/about/lib/normalizeAbout";
import type { AboutApiResponse, AboutContent } from "@/features/about/model/types";

export const aboutApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAbout: build.query<AboutContent, void>({
      query: () => ({ url: "/website/about/" }),
      transformResponse: (response: AboutApiResponse) => normalizeAbout(response),
      providesTags: [{ type: "About", id: "SINGLETON" }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAboutQuery } = aboutApi;

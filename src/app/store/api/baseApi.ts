import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { getPreviewToken } from "@/shared/lib/preview";
import { env } from "@/shared/lib/env";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: env.apiBase,
  timeout: 30_000,
  prepareHeaders: (headers) => {
    const previewToken = getPreviewToken();
    if (previewToken) headers.set("X-Preview-Token", previewToken);
    return headers;
  },
});

const baseQueryWithPreview: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  const previewToken = getPreviewToken();
  if (!previewToken) {
    return rawBaseQuery(args, api, extraOptions);
  }

  if (typeof args === "string") {
    return rawBaseQuery({ url: args, params: { preview: previewToken } }, api, extraOptions);
  }

  return rawBaseQuery(
    {
      ...args,
      params: {
        ...args.params,
        preview: previewToken,
      },
    },
    api,
    extraOptions,
  );
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithPreview,
  tagTypes: ["Homepage", "SiteSettings", "Contact"],
  endpoints: () => ({}),
});

export default baseApi;

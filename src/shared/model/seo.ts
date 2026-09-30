export interface SeoFields {
  seo_title: string
  seo_description: string
  canonical_url: string
  og_title: string
  og_description: string
  og_image: string | null
}

export type PageWithSeo<T extends SeoFields> = Omit<T, keyof SeoFields> & {
  seo: SeoFields
}

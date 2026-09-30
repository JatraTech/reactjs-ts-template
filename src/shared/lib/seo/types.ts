export type CmsSeoFields = {
  seo_title?: string
  seo_description?: string
  canonical_url?: string
  og_title?: string
  og_description?: string
  og_image?: string | null
}

export type PageSeoData = {
  title?: string
  description?: string
  canonicalPath?: string
  canonicalUrl?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string | null
  ogType?: 'website' | 'article'
  robots?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
  ready?: boolean
}

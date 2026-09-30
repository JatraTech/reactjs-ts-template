import type { CmsSeoFields, PageSeoData } from './types'
import { buildPageSeo } from './buildPageSeo'
import { isSeoReady } from './isSeoReady'
import { SeoHead } from './SeoHead'

type PageSeoProps = {
  cms?: CmsSeoFields | null
  canonicalPath: string
  fallbackTitle: string
  fallbacks?: {
    title?: string
    description?: string
    image?: string | null
  }
  ogType?: PageSeoData['ogType']
  robots?: string
  isLoading?: boolean
  jsonLd?: PageSeoData['jsonLd']
  allowWithoutData?: boolean
}

export function PageSeo({
  cms,
  canonicalPath,
  fallbackTitle,
  fallbacks = {},
  ogType,
  robots,
  isLoading = false,
  jsonLd,
  allowWithoutData = true,
}: PageSeoProps) {
  const seo = buildPageSeo({
    cms,
    fallbacks: {
      title: fallbacks.title ?? fallbackTitle,
      description: fallbacks.description,
      image: fallbacks.image,
    },
    canonicalPath,
    ogType,
    robots,
    jsonLd,
    ready: isSeoReady(isLoading, cms ?? fallbacks, { allowWithoutData }),
  })

  return <SeoHead {...seo} />
}

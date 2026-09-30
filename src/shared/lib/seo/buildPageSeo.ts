import type { CmsSeoFields, PageSeoData } from './types'
import {
  BASE_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from './defaults'
import { stripHtml, truncateDescription } from './utils'

export function buildAbsoluteUrl(path?: string): string | undefined {
  if (!path) return undefined
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}

export function buildPageTitle(pageTitle?: string): string {
  if (!pageTitle) return BASE_TITLE
  const normalized = pageTitle.trim()
  if (normalized.includes(SITE_NAME)) return normalized
  return `${normalized} — ${SITE_NAME}`
}

type BuildPageSeoOptions = {
  cms?: CmsSeoFields | null
  fallbacks?: {
    title?: string
    description?: string
    image?: string | null
  }
  canonicalPath?: string
  ogType?: PageSeoData['ogType']
  robots?: string
  jsonLd?: PageSeoData['jsonLd']
  ready?: boolean
}

export function buildPageSeo({
  cms,
  fallbacks = {},
  canonicalPath,
  ogType = 'website',
  robots,
  jsonLd,
  ready = true,
}: BuildPageSeoOptions): PageSeoData {
  const title = cms?.seo_title || fallbacks.title
  const rawDescription = cms?.seo_description || fallbacks.description || DEFAULT_DESCRIPTION
  const description = truncateDescription(stripHtml(rawDescription))
  const ogTitle = cms?.og_title || title || BASE_TITLE
  const rawOgDescription = cms?.og_description || cms?.seo_description || rawDescription
  const ogDescription = truncateDescription(stripHtml(rawOgDescription))
  const ogImage = cms?.og_image || fallbacks.image || DEFAULT_OG_IMAGE
  const canonicalUrl = cms?.canonical_url || buildAbsoluteUrl(canonicalPath)

  return {
    title: buildPageTitle(title),
    description,
    canonicalPath,
    canonicalUrl,
    ogTitle: buildPageTitle(ogTitle),
    ogDescription,
    ogImage: ogImage ? (buildAbsoluteUrl(ogImage) ?? ogImage) : DEFAULT_OG_IMAGE,
    ogType,
    robots,
    jsonLd,
    ready,
  }
}

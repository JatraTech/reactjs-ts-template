import { useEffect } from 'react'
import type { PageSeoData } from './types'
import { BASE_TITLE, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from './defaults'

type SeoHeadProps = PageSeoData

function upsertMeta(attribute: 'name' | 'property', key: string, content?: string) {
  if (!content) return
  const selector = `meta[${attribute}="${key}"]`
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertLink(rel: string, href?: string) {
  if (!href) return
  let element = document.head.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

function upsertJsonLd(jsonLd: PageSeoData['jsonLd']) {
  document.querySelectorAll('script[data-page-jsonld="true"]').forEach((node) => node.remove())
  if (!jsonLd) return
  const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd]
  items.forEach((item, index) => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.pageJsonld = 'true'
    script.id = `page-jsonld-${index}`
    script.textContent = JSON.stringify(item)
    document.head.appendChild(script)
  })
}

export function SeoHead({
  title = BASE_TITLE,
  description,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  robots,
  jsonLd,
  ready = true,
}: SeoHeadProps) {
  const resolvedOgTitle = ogTitle ?? title
  const resolvedOgDescription = ogDescription ?? description
  const resolvedOgImage = ogImage ?? DEFAULT_OG_IMAGE

  useEffect(() => {
    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('name', 'robots', robots)
    upsertLink('canonical', canonicalUrl)

    upsertMeta('property', 'og:site_name', SITE_NAME)
    upsertMeta('property', 'og:locale', 'en_US')
    upsertMeta('property', 'og:title', resolvedOgTitle)
    upsertMeta('property', 'og:description', resolvedOgDescription)
    upsertMeta('property', 'og:type', ogType)
    upsertMeta('property', 'og:url', canonicalUrl ?? SITE_URL)
    upsertMeta('property', 'og:image', resolvedOgImage)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', resolvedOgTitle)
    upsertMeta('name', 'twitter:description', resolvedOgDescription)
    upsertMeta('name', 'twitter:image', resolvedOgImage)

    upsertJsonLd(jsonLd)

    if (ready) {
      document.body.dataset.seoReady = 'true'
    } else {
      delete document.body.dataset.seoReady
    }
  }, [
    title,
    description,
    canonicalUrl,
    resolvedOgTitle,
    resolvedOgDescription,
    resolvedOgImage,
    ogType,
    robots,
    jsonLd,
    ready,
  ])

  return null
}

import { APP_FULL_NAME } from '@/shared/config/constants'
import { SITE_URL } from './defaults'
import { buildAbsoluteUrl } from './buildPageSeo'

export function buildBreadcrumbJsonLd(items: { name: string; path?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: buildAbsoluteUrl(item.path) } : {}),
    })),
  }
}

export function buildBlogPostingJsonLd(post: {
  title: string
  slug: string
  excerpt?: string
  image_url?: string | null
  author?: string
  published_at?: string | null
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || undefined,
    url: buildAbsoluteUrl(`/blog/${post.slug}`),
    ...(post.image_url ? { image: post.image_url } : {}),
    ...(post.author ? { author: { '@type': 'Person', name: post.author } } : {}),
    ...(post.published_at ? { datePublished: post.published_at } : {}),
    publisher: {
      '@type': 'Organization',
      name: APP_FULL_NAME,
      url: SITE_URL,
    },
  }
}

export function buildEventJsonLd(event: {
  title: string
  description: string
  date: string
  start_time?: string | null
  end_time?: string | null
  location_text?: string
}) {
  const startDate = event.start_time ? `${event.date}T${event.start_time}` : event.date
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate,
    ...(event.end_time ? { endDate: `${event.date}T${event.end_time}` } : {}),
    ...(event.location_text
      ? {
          location: {
            '@type': 'Place',
            name: event.location_text,
          },
        }
      : {}),
    organizer: {
      '@type': 'Organization',
      name: APP_FULL_NAME,
      url: SITE_URL,
    },
  }
}

export function buildFaqPageJsonLd(questions: { question: string; answer: string }[]) {
  if (questions.length === 0) return undefined
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }
}

export function buildJobPostingJsonLd(job: {
  title: string
  description: string
  location?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    hiringOrganization: {
      '@type': 'Organization',
      name: APP_FULL_NAME,
      sameAs: SITE_URL,
    },
    ...(job.location
      ? {
          jobLocation: {
            '@type': 'Place',
            address: {
              '@type': 'PostalAddress',
              addressLocality: job.location,
              addressCountry: 'US',
            },
          },
        }
      : {}),
  }
}

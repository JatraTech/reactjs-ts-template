import { useEffect } from 'react'
import { ORGANIZATION_JSON_LD, WEBSITE_JSON_LD } from './defaults'

export function SiteJsonLd() {
  useEffect(() => {
    const payloads = [ORGANIZATION_JSON_LD, WEBSITE_JSON_LD]
    const elements = payloads.map((payload, index) => {
      const id = `site-jsonld-${index}`
      document.getElementById(id)?.remove()
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = id
      script.textContent = JSON.stringify(payload)
      document.head.appendChild(script)
      return script
    })

    return () => {
      elements.forEach((element) => element.remove())
    }
  }, [])

  return null
}

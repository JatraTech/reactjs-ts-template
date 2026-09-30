import { writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getAllRoutes, routeToAbsoluteUrl, SITE_URL } from './routes.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(__dirname, '../public')
const sitemapPath = resolve(publicDir, 'sitemap.xml')
const robotsPath = resolve(publicDir, 'robots.txt')

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

async function main() {
  const routes = await getAllRoutes()
  const urls = routes.map((route) => {
    const loc = escapeXml(routeToAbsoluteUrl(route.path))
    const lastmod = route.lastmod ? `\n    <lastmod>${route.lastmod}</lastmod>` : ''
    const priority = route.priority ? `\n    <priority>${route.priority}</priority>` : ''
    return `  <url>\n    <loc>${loc}</loc>${lastmod}${priority}\n  </url>`
  })

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
  writeFileSync(sitemapPath, xml, 'utf8')
  console.log(`Generated sitemap with ${routes.length} URLs → ${sitemapPath}`)

  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
  writeFileSync(robotsPath, robots, 'utf8')
  console.log(`Generated robots.txt → ${robotsPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

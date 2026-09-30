import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(__dirname, '../public')
const outputPath = resolve(publicDir, 'og-default.webp')
const logoPath = resolve(publicDir, 'images/bpi-logo.webp')

const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        width: 1200px;
        height: 630px;
        background: #1a1a1a;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 28px;
        font-family: system-ui, sans-serif;
      }
      img { max-width: 420px; max-height: 180px; object-fit: contain; }
      p {
        color: #e3242b;
        font-size: 26px;
        font-weight: 600;
        letter-spacing: 0.02em;
        text-align: center;
        padding: 0 48px;
      }
    </style>
  </head>
  <body>
    <img src="file://${logoPath}" alt="" />
    <p>Wholesale Surfacing Distribution & Marketing</p>
  </body>
</html>`

async function main() {
  if (!existsSync(logoPath)) {
    console.warn(`Logo not found at ${logoPath}; skipping OG image generation.`)
    process.exit(0)
  }

  mkdirSync(publicDir, { recursive: true })
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
  const page = await browser.newPage()
  await page.setViewport({ width: 1200, height: 630 })
  await page.setContent(html, { waitUntil: 'networkidle0' })
  const buffer = await page.screenshot({ type: 'webp', quality: 90 })
  writeFileSync(outputPath, buffer)
  await browser.close()
  console.log(`Generated OG image → ${outputPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

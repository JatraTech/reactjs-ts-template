import { createServer } from 'node:http'
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'
import { getAllRoutes } from './routes.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(__dirname, '../dist')
// Must match backend CORS_ALLOWED_ORIGINS (127.0.0.1 / localhost ports).
const CORS_PRERENDER_PORTS = [5173, 3000]

function tryListen(server, port) {
  return new Promise((resolvePromise, reject) => {
    const onError = (error) => {
      server.off('listening', onListening)
      reject(error)
    }
    const onListening = () => {
      server.off('error', onError)
      resolvePromise()
    }
    server.once('error', onError)
    server.once('listening', onListening)
    server.listen(port, '127.0.0.1')
  })
}

async function listenOnAvailablePort(server) {
  const preferred = process.env.PRERENDER_PORT
    ? [Number(process.env.PRERENDER_PORT)]
    : []
  const ports = [...preferred, ...CORS_PRERENDER_PORTS.filter((port) => !preferred.includes(port))]

  for (const port of ports) {
    try {
      await tryListen(server, port)
      console.log(`Prerender static server on http://127.0.0.1:${port}`)
      return port
    } catch (error) {
      if (error.code === 'EADDRINUSE') continue
      throw error
    }
  }

  throw new Error(
    `No prerender port available (tried ${ports.join(', ')}). Stop "bun run dev" or set PRERENDER_PORT.`,
  )
}

function contentType(filePath) {
  if (filePath.endsWith('.html')) return 'text/html; charset=utf-8'
  if (filePath.endsWith('.js')) return 'application/javascript'
  if (filePath.endsWith('.css')) return 'text/css'
  if (filePath.endsWith('.webp')) return 'image/webp'
  if (filePath.endsWith('.png')) return 'image/png'
  if (filePath.endsWith('.svg')) return 'image/svg+xml'
  if (filePath.endsWith('.json')) return 'application/json'
  if (filePath.endsWith('.xml')) return 'application/xml'
  if (filePath.endsWith('.txt')) return 'text/plain'
  if (filePath.endsWith('.woff2')) return 'font/woff2'
  return 'application/octet-stream'
}

function createStaticServer() {
  return createServer((req, res) => {
    const url = new URL(req.url ?? '/', 'http://127.0.0.1')
    let pathname = decodeURIComponent(url.pathname)
    if (pathname.endsWith('/')) pathname += 'index.html'
    let filePath = join(distDir, pathname)

    if (existsSync(filePath) && statSync(filePath).isDirectory()) {
      filePath = join(filePath, 'index.html')
    }

    if (!existsSync(filePath) || !filePath.startsWith(distDir)) {
      filePath = join(distDir, 'index.html')
    }

    const body = readFileSync(filePath)
    res.writeHead(200, { 'Content-Type': contentType(filePath) })
    res.end(body)
  })
}

function outputPathForRoute(routePath) {
  if (routePath === '/') {
    return join(distDir, 'index.html')
  }
  return join(distDir, routePath, 'index.html')
}

const SYSTEM_CHROMIUM_PATHS = ['/usr/bin/chromium-browser', '/usr/bin/chromium']

const LAUNCH_OPTIONS = {
  headless: true,
  args: ['--no-sandbox'],
}

function getBrowserCandidates() {
  const candidates = []
  const seen = new Set()

  function add(executablePath, source) {
    const key = executablePath ?? '__default__'
    if (seen.has(key)) return
    seen.add(key)
    candidates.push({ executablePath, source })
  }

  const envPath = process.env.PUPPETEER_EXECUTABLE_PATH
  if (envPath && existsSync(envPath)) {
    add(envPath, 'PUPPETEER_EXECUTABLE_PATH')
  }

  for (const path of SYSTEM_CHROMIUM_PATHS) {
    if (existsSync(path)) add(path, path)
  }

  try {
    const bundled = puppeteer.executablePath()
    if (bundled && existsSync(bundled)) add(bundled, 'puppeteer bundled')
  } catch {
    // bundled Chrome not installed
  }

  add(undefined, 'puppeteer default')
  return candidates
}

async function launchBrowser() {
  for (const { executablePath, source } of getBrowserCandidates()) {
    const options = executablePath
      ? { ...LAUNCH_OPTIONS, executablePath }
      : LAUNCH_OPTIONS

    try {
      console.log(`Launching Chromium (${source})...`)
      const browser = await puppeteer.launch(options)
      console.log(`Using Chromium: ${executablePath ?? source}`)
      return browser
    } catch (error) {
      console.warn(`Chromium launch failed (${source}): ${error.message}`)
    }
  }

  return null
}

async function prerenderRoute(page, routePath, port) {
  const url = `http://127.0.0.1:${port}${routePath}`
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 })
  try {
    await page.waitForFunction(
      () => document.body?.dataset.seoReady === 'true',
      { timeout: 30_000 },
    )
  } catch {
    console.warn(`SEO ready timeout for ${routePath}; saving rendered HTML anyway.`)
  }
  try {
    await page.waitForFunction(
      () => !document.querySelector('.loading-overlay'),
      { timeout: 15_000 },
    )
  } catch {
    console.warn(`Page loader timeout for ${routePath}; saving rendered HTML anyway.`)
  }
  const html = await page.content()
  const outputPath = outputPathForRoute(routePath)
  mkdirSync(dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, html, 'utf8')
  console.log(`Prerendered ${routePath} → ${outputPath}`)
}

async function main() {
  console.log('Starting prerender...')
  if (!existsSync(distDir)) {
    throw new Error(`Build output not found at ${distDir}. Run vite build first.`)
  }

  const routes = await getAllRoutes()
  console.log(`Prerendering ${routes.length} routes...`)

  const browser = await launchBrowser()
  if (!browser) {
    console.warn('No Chromium available; skipping prerender (Tier 1 SEO still applied).')
    process.exit(0)
  }

  const server = createStaticServer()
  const port = await listenOnAvailablePort(server)
  const page = await browser.newPage()

  try {
    for (const route of routes) {
      await prerenderRoute(page, route.path, port)
    }
  } finally {
    await browser.close()
    server.close()
  }

  console.log(`Prerendered ${routes.length} routes.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

/**
 * Keep in sync with src/shared/config/brand.config.ts (scripts cannot import TS without a loader).
 */
const BRAND = {
  name: "My Project",
  tagline: "Marketing site starter",
  navy: "#0f172a",
  accent: "#2563eb",
  logoCandidates: ["logo-og-white.png", "logo-dark.png", "logo-light.png"],
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "../public");
const outputPath = resolve(publicDir, "og-default.webp");

function resolveLogoPath() {
  for (const name of BRAND.logoCandidates) {
    const candidate = resolve(publicDir, name);
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

async function main() {
  mkdirSync(publicDir, { recursive: true });
  const logoPath = resolveLogoPath();

  const logoHtml = logoPath
    ? `<img src="file://${logoPath}" alt="" />`
    : `<h1 style="color:#fff;font-size:64px;font-weight:600;letter-spacing:-0.02em">${BRAND.name}</h1>`;

  const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        width: 1200px;
        height: 630px;
        background: ${BRAND.navy};
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 28px;
        font-family: system-ui, sans-serif;
      }
      img { max-width: 420px; max-height: 180px; object-fit: contain; }
      p {
        color: ${BRAND.accent};
        font-size: 26px;
        font-weight: 600;
        letter-spacing: 0.02em;
        text-align: center;
        padding: 0 48px;
      }
    </style>
  </head>
  <body>
    ${logoHtml}
    <p>${BRAND.tagline}</p>
  </body>
</html>`;

  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.setContent(html, { waitUntil: "networkidle0" });
  const buffer = await page.screenshot({ type: "webp", quality: 90 });
  writeFileSync(outputPath, buffer);
  await browser.close();
  console.log(`Generated OG image → ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

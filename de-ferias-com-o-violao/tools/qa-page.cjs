const path = require('path');
const { pathToFileURL } = require('url');
let chromium;
try { ({ chromium } = require('playwright-core')); }
catch { ({ chromium } = require('C:/Users/Felipe/AppData/Local/OpenAI/Codex/runtimes/cua_node/45309f9050f7314b/bin/node_modules/playwright-core')); }

const root = path.resolve(__dirname, '..');
const url = pathToFileURL(path.join(root, 'index.html')).href + '?utm_source=teste';

(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true,
    args: ['--disable-gpu', '--disable-gpu-compositing', '--disable-software-rasterizer']
  });
  try {
    for (const [name, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
      const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(url);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: path.join(root, `tools/qa-${name}.png`), fullPage: true });
      const result = await page.evaluate(() => ({
        title: document.title,
        viewport: document.documentElement.clientWidth,
        content: document.documentElement.scrollWidth,
        checkout: [...document.querySelectorAll('[data-checkout]')].map(link => link.href),
        mainImage: getComputedStyle(document.querySelector('.vac-hero-photo')).backgroundImage,
        images: [...document.images].map(image => ({ src: image.getAttribute('src'), loaded: image.complete && image.naturalWidth > 0 }))
      }));
      console.log(name, JSON.stringify({ ...result, errors }));
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

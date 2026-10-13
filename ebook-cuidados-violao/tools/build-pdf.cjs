const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
let chromium;
try { ({ chromium } = require('playwright-core')); }
catch { ({ chromium } = require('C:/Users/Felipe/AppData/Local/OpenAI/Codex/runtimes/cua_node/45309f9050f7314b/bin/node_modules/playwright-core')); }

const root = path.resolve(__dirname, '../..');
const ebook = path.join(root, 'ebook-cuidados-violao');
const output = path.join(root, 'output/pdf/violao-bem-cuidado-atualizado.pdf');
const expected = [
  'https://link.amazon/B0gW0s1RO',
  'https://link.amazon/B0eP3nixS',
  'https://link.amazon/B07CCI3eW',
  'https://link.amazon/B09tUCL4M'
];

(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true,
    args: ['--disable-gpu', '--disable-gpu-compositing', '--disable-software-rasterizer']
  });
  try {
    const page = await browser.newPage({ viewport: { width: 760, height: 900 }, deviceScaleFactor: 2 });
    await page.goto(pathToFileURL(path.join(ebook, 'index.html')).href);
    await page.evaluate(() => document.fonts.ready);
    const state = await page.evaluate(() => ({
      pages: document.querySelectorAll('.page').length,
      links: [...document.querySelectorAll('.product-button.active')].map(a => a.href),
      disabled: document.querySelectorAll('[data-product]').length,
      lastTitle: document.querySelector('.page:last-of-type h2')?.textContent,
      note: document.querySelector('.product-note')?.textContent
    }));
    if (state.pages !== 14 || state.disabled || JSON.stringify(state.links) !== JSON.stringify(expected)) {
      throw new Error('Conteúdo ou links inesperados: ' + JSON.stringify(state));
    }
    fs.mkdirSync(path.dirname(output), { recursive: true });
    await page.emulateMedia({ media: 'print' });
    await page.locator('.page').nth(5).screenshot({ path: path.join(ebook, 'tools/troca-cordas-preview.png') });
    await page.locator('.page').last().screenshot({ path: path.join(ebook, 'tools/ultima-pagina-preview.png') });
    await page.pdf({ path: output, printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
    const pdf = fs.readFileSync(output).toString('latin1');
    const pdfPages = (pdf.match(/\/Type\s*\/Page\b/g) || []).length;
    if (pdfPages !== 14) throw new Error(`O PDF tem ${pdfPages} páginas; esperado: 14`);
    for (const url of expected) {
      if (!pdf.includes(url)) throw new Error(`Link ausente do PDF: ${url}`);
    }
    console.log(JSON.stringify({ output, bytes: fs.statSync(output).size, pdfPages, ...state }));
    await page.close();
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

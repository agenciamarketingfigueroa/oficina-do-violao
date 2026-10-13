const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require('C:/Users/Felipe/AppData/Local/OpenAI/Codex/runtimes/cua_node/45309f9050f7314b/bin/node_modules/playwright-core');

const out = path.resolve(__dirname, '..');
const source = path.resolve(out, '../2026-10-10-v2/fontes');
const products = [
  { slug: 'de-ferias-com-o-violao', photo: 'ferias', category: 'CURSO ONLINE · 27 AULAS', lines: ['DE FÉRIAS', 'COM O', 'VIOLÃO'], accent: 2 },
  { slug: 'troca-de-acordes', photo: 'troca', category: 'E-BOOK · GUIA DE BOLSO', lines: ['TROCA', 'DE', 'ACORDES'], accent: 2 },
  { slug: 'acordes-em-sequencia', photo: 'sequencias', category: 'E-BOOK · GUIA DE BOLSO', lines: ['ACORDES', 'EM', 'SEQUÊNCIA'], accent: 2 },
  { slug: 'violao-bem-cuidado', photo: 'cuidados', category: 'E-BOOK · GUIA PRÁTICO', lines: ['VIOLÃO', 'BEM', 'CUIDADO'], accent: 2 }
];
const variants = [
  { name: 'capa-vitrine-horizontal-1920x1080.jpg', w: 1920, h: 1080, kind: 'horizontal' },
  { name: 'capa-vitrine-vertical-720x1040.jpg', w: 720, h: 1040, kind: 'vertical' },
  { name: 'avatar-vitrine-600x600.jpg', w: 600, h: 600, kind: 'square' }
];
const fontCss = [400, 800].map(weight => {
  const data = fs.readFileSync(path.join(source, `manrope-${weight}.ttf`)).toString('base64');
  return `@font-face{font-family:Manrope;font-weight:${weight};src:url(data:font/ttf;base64,${data})}`;
}).join('');
const photos = Object.fromEntries(products.map(p => [p.photo, `data:image/png;base64,${fs.readFileSync(path.join(source, p.photo + '.png')).toString('base64')}`]));
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function html(p, variant) {
  const k = variant.kind;
  const title = p.lines.map((line, index) => `<span class="${index === p.accent ? 'accent' : ''}">${esc(line)}</span>`).join('');
  return `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><style>${fontCss}
  *{box-sizing:border-box}html,body{margin:0;width:${variant.w}px;height:${variant.h}px}
  body{font-family:Manrope,Arial,sans-serif;background:#090909;color:#fff7ed}
  #art{width:${variant.w}px;height:${variant.h}px;position:relative;overflow:hidden}
  .photo{position:absolute;inset:0;background-image:url('${photos[p.photo]}');background-size:cover;background-position:${k==='horizontal'?'center center':'73% center'};filter:saturate(1.14) contrast(1.06)}
  .overlay{position:absolute;inset:0;background:${k==='horizontal'?'linear-gradient(90deg,#090807 0%,#090807f4 31%,#090807d6 51%,#09080752 73%,#0908070d 100%)':k==='vertical'?'linear-gradient(180deg,#08080853 0%,#08080810 22%,#08080888 40%,#080808f5 58%,#080808 100%)':'linear-gradient(180deg,#0808084d 0%,#08080826 30%,#080808d9 48%,#080808 100%)'} }
  .stripe{position:absolute;background:#ff650e;${k==='horizontal'?'width:17px;height:240px;left:10%;top:29%':k==='vertical'?'width:110px;height:10px;left:9%;top:48%':'width:80px;height:7px;left:9%;top:47%'} }
  .brand{position:absolute;${k==='horizontal'?'left:12%;top:12%;font-size:27px':'left:9%;top:7%;font-size:'+(k==='vertical'?'19':'16')+'px'};font-weight:800;letter-spacing:.12em;text-shadow:0 2px 10px #000}
  .brand em{font-style:normal;color:#ff6b17}
  .copy{position:absolute;${k==='horizontal'?'left:12%;top:28%;width:66%;bottom:12%':k==='vertical'?'left:9%;right:8%;top:51%;bottom:8%':'left:9%;right:8%;top:52%;bottom:7%'};display:flex;flex-direction:column;align-items:flex-start;justify-content:center}
  .category{color:#ff9b56;font-size:${k==='horizontal'?'31':k==='vertical'?'20':'15'}px;font-weight:800;letter-spacing:.1em;margin-bottom:${k==='horizontal'?'34':k==='vertical'?'20':'11'}px;white-space:nowrap}
  h1{font-size:${k==='horizontal'?'194':k==='vertical'?'112':'79'}px;line-height:1.06;letter-spacing:-.065em;font-weight:800;margin:0;max-width:100%;text-transform:uppercase}
  h1 span{display:block;white-space:nowrap}.accent{color:#ff6b17}
  .rule{width:${k==='horizontal'?'180':k==='vertical'?'115':'75'}px;height:${k==='horizontal'?'10':'7'}px;background:#ff6b17;margin-top:${k==='horizontal'?'46':k==='vertical'?'28':'15'}px}
  </style><body><div id="art"><div class="photo"></div><div class="overlay"></div><div class="stripe"></div><div class="brand">OFICINA DO <em>VIOLÃO</em></div><div class="copy"><div class="category">${esc(p.category)}</div><h1>${title}</h1><div class="rule"></div></div></div></body></html>`;
}

async function main() {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true, args: ['--disable-gpu'] });
  const manifest = [];
  try {
    const page = await browser.newPage({ deviceScaleFactor: 1 });
    for (const p of products) {
      const folder = path.join(out, p.slug);
      fs.mkdirSync(folder, { recursive: true });
      for (const variant of variants) {
        await page.setViewportSize({ width: variant.w, height: variant.h });
        await page.setContent(html(p, variant));
        await page.evaluate(() => document.fonts.ready);
        const metrics = await page.evaluate(() => {
          const title = document.querySelector('h1');
          const copy = document.querySelector('.copy');
          let size = parseFloat(getComputedStyle(title).fontSize);
          const fits = () => title.scrollWidth <= title.clientWidth + 1 && copy.scrollHeight <= copy.clientHeight + 1;
          while (!fits() && size > 54) { size -= 1; title.style.fontSize = size + 'px'; }
          const outer = document.querySelector('#art').getBoundingClientRect();
          const inner = copy.getBoundingClientRect();
          if (!fits() || inner.left < outer.width * .075 || inner.right > outer.width * .93 || inner.top < outer.height * .06 || inner.bottom > outer.height * .93) throw Error('Content outside safe area');
          return { titleSize: size, copy: { x: inner.x, y: inner.y, width: inner.width, height: inner.height } };
        });
        const file = path.join(folder, variant.name);
        await page.locator('#art').screenshot({ path: file, type: 'jpeg', quality: 94 });
        manifest.push({ product: p.slug, file: `${p.slug}/${variant.name}`, width: variant.w, height: variant.h, bytes: fs.statSync(file).size, ...metrics });
      }
    }
    const cards = manifest.map(m => `<article><a href="${m.file}" target="_blank"><img src="${m.file}" loading="lazy"></a><strong>${esc(m.product)}</strong><span>${esc(path.basename(m.file))}</span><small>${m.width} × ${m.height}</small><a href="${m.file}" download>Baixar imagem</a></article>`).join('');
    fs.writeFileSync(path.join(out, 'galeria.html'), `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Capas de vitrine · letras grandes</title><style>body{background:#0c0c0c;color:#eee;font:16px Arial;margin:0;padding:32px}main{max-width:1600px;margin:auto}h1{font-size:44px}p{color:#bbb}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px}article{background:#1b1b1b;border:1px solid #4d2b16;padding:14px;border-radius:12px}article img{width:100%;height:250px;object-fit:contain;background:#080808}article strong,article span,article small{display:block;margin-top:8px}a{color:#ff884a}</style><main><h1>Capas de vitrine</h1><p>Versão com título ampliado · 10/10/2026 · 4 produtos e 3 formatos por produto.</p><div class="grid">${cards}</div></main></html>`);
    fs.writeFileSync(path.join(out, 'fontes', 'verificacao.json'), JSON.stringify(manifest, null, 2));
    console.log(`${manifest.length} imagens criadas.`);
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });

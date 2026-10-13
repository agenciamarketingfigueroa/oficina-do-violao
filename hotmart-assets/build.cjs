/* Gera PNGs para a Hotmart a partir das capas reais e da identidade da Oficina. */
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

let chromium;
try {
  ({ chromium } = require('playwright-core'));
} catch {
  ({ chromium } = require('C:/Users/Felipe/AppData/Local/OpenAI/Codex/runtimes/cua_node/45309f9050f7314b/bin/node_modules/playwright-core'));
}

const root = path.resolve(__dirname, '..');
const out = path.join(__dirname, 'exports');
const source = path.join(__dirname, 'source');
const C = { black: '#090909', orange: '#ff5a00', white: '#f6f3ed', gray: '#bdb9b3', brown: '#2c160c' };
const products = [
  {
    slug: 'troca-de-acordes', number: '01', type: 'GUIA DE BOLSO',
    title: ['TROCA DE', 'ACORDES'],
    short: ['Exercícios para parar de travar', 'entre um acorde e outro.'],
    cover: path.join(root, 'guia-troca-acordes/mockups/capa.png')
  },
  {
    slug: 'acordes-em-sequencia', number: '02', type: 'GUIA DE BOLSO',
    title: ['ACORDES EM', 'SEQUÊNCIA'],
    short: ['Pratique as combinações de acordes', 'que você realmente vai usar.'],
    cover: path.join(root, 'guia-acordes-sequencia/mockups/capa.png')
  },
  {
    slug: 'violao-bem-cuidado', number: '03', type: 'GUIA PRÁTICO',
    title: ['VIOLÃO BEM', 'CUIDADO.'],
    short: ['Cordas, limpeza, conservação', 'e regulagens básicas.'],
    cover: path.join(source, 'cover-cuidados.png')
  }
];

const b64 = file => fs.readFileSync(file).toString('base64');
const pngUri = file => `data:image/png;base64,${b64(file)}`;
const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const tx = (x, y, s, size, color=C.white, weight=800, tracking=0) =>
  `<text x="${x}" y="${y}" fill="${color}" font-family="Arial,Helvetica,sans-serif" font-weight="${weight}" font-size="${size}" letter-spacing="${tracking}">${esc(s)}</text>`;
const mark = (logo, x, y, size) => `<image href="${logo}" x="${x}" y="${y}" width="${size}" height="${size}"/>`;
const brand = (logo, x, y, icon=66) => `${mark(logo,x,y,icon)}${tx(x+icon+15,y+icon*.43,'OFICINA DO VIOLÃO',icon*.28,C.white,900,2)}`;
const subtitle = (lines,x,y,size=28,gap=40,color=C.gray) => lines.map((line,i)=>tx(x,y+i*gap,line,size,color,400)).join('');
const title = (lines,x,y,size,gap=size*1.1) => lines.map((line,i)=>tx(x,y+i*gap,line,size,i===lines.length-1?C.orange:C.white,900,-size*.045)).join('');
const frame = (w,h,body,transparent=false) => `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="shade" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#111"/><stop offset=".55" stop-color="${C.black}"/><stop offset="1" stop-color="#1b0d07"/></linearGradient><filter id="shadow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22"/></filter></defs>${transparent?'':`<rect width="${w}" height="${h}" fill="url(#shade)"/>`}${body}</svg>`;
const decor = (w,h,thick=12) => `<circle cx="${w*.89}" cy="${h*.50}" r="${h*.66}" fill="none" stroke="${C.orange}" stroke-width="${thick}" opacity=".18"/><circle cx="${w*.89}" cy="${h*.50}" r="${h*.51}" fill="none" stroke="${C.orange}" stroke-width="3" opacity=".11"/>`;
const book = (cover,x,y,w,angle=-5) => {
  const h=w*1.416;
  return `<g transform="rotate(${angle} ${x+w/2} ${y+h/2})"><rect x="${x+18}" y="${y+25}" width="${w}" height="${h}" fill="#000" opacity=".6" filter="url(#shadow)"/><path d="M${x-16} ${y+14} L${x} ${y} V${y+h} L${x-16} ${y+h-14}Z" fill="#a83b00"/><path d="M${x-16} ${y+14} L${x} ${y} V${y+h} L${x-16} ${y+h-14}Z" fill="none" stroke="#ff7a30" stroke-width="2"/><image href="${cover}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#ffffff" stroke-opacity=".22" stroke-width="2"/></g>`;
};
const strings = (w,h) => Array.from({length:6},(_,i)=>`<path d="M${w*.53} ${h*(.16+i*.09)} H${w}" stroke="#fff" stroke-width="${1+i*.5}" opacity=".055"/>`).join('');

function productSquare(p,cover,logo){
  const w=600,h=600;
  return frame(w,h,`${decor(w,h,14)}${strings(w,h)}<rect x="0" y="0" width="12" height="600" fill="${C.orange}"/>${mark(logo,42,35,58)}${tx(107,74,'OFICINA DO VIOLÃO',20,C.white,900,1.5)}${tx(44,177,p.type,18,C.orange,900,3)}${title(p.title,42,234,44,53)}${subtitle(p.short,44,382,20,28,C.gray)}${book(cover,400,205,155,-5)}${tx(44,550,'E-BOOK  /  FELIPE FIGUEROA',15,C.white,800,2)}<path d="M44 518 H556" stroke="#ffffff" opacity=".24"/>`);
}

function wide(p,cover,logo,w,h,variant){
  const isBanner=h===640, isCarousel=h===800;
  const bookW=isBanner?335:isCarousel?390:495;
  const bookX=isBanner?1430:isCarousel?1380:1310;
  const bookY=isBanner?56:isCarousel?100:148;
  const titleSize=isBanner?98:isCarousel?108:125;
  const titleY=isBanner?272:isCarousel?337:435;
  const titleGap=isBanner?106:isCarousel?118:137;
  const subY=isBanner?478:isCarousel?555:720;
  return frame(w,h,`${decor(w,h,isBanner?18:24)}${strings(w,h)}<rect x="0" y="0" width="${w}" height="9" fill="${C.orange}"/>${brand(logo,112,70,isBanner?70:78)}${tx(123,isBanner?171:titleY-titleSize-47,p.type+'  /  '+p.number,23,C.orange,900,4)}${title(p.title,112,titleY,titleSize,titleGap)}${subtitle(p.short,120,subY,isBanner?28:34,isBanner?39:48)}${book(cover,bookX,bookY,bookW,-5)}${tx(120,h-54,variant==='produto'?'PÁGINA DO PRODUTO':variant==='vitrine'?'VITRINE  /  OFICINA DO VIOLÃO':'OFICINA DO VIOLÃO  /  FELIPE FIGUEROA',18,C.gray,800,3)}<path d="M112 ${h-84} H${w-120}" stroke="#fff" opacity=".23"/>`);
}

function tall(p,cover,logo,w,h,variant){
  const bookW=h===960?292:320;
  const bookY=h===960?460:500;
  return frame(w,h,`${decor(w,h,16)}${strings(w,h)}<rect x="0" y="0" width="720" height="10" fill="${C.orange}"/>${mark(logo,46,38,64)}${tx(119,77,'OFICINA DO VIOLÃO',19,C.white,900,2)}${tx(50,182,p.type+'  /  '+p.number,20,C.orange,900,3)}${title(p.title,45,269,70,79)}${subtitle(p.short,51,407,24,34)}${book(cover,(w-bookW)/2+8,bookY,bookW,-4)}${tx(49,h-42,variant==='vitrine'?'VITRINE  /  OFICINA DO VIOLÃO':'OFICINA DO VIOLÃO  /  FELIPE FIGUEROA',16,C.gray,800,2)}<path d="M45 ${h-70} H675" stroke="#fff" opacity=".22"/>`);
}

function headerLogo(logo,dark){
  const text=dark?C.white:C.black;
  return frame(180,48,`${mark(logo,0,2,43)}${tx(44,22,'OFICINA DO',14,text,900,-.45)}${tx(44,39,'VIOLÃO',17,dark?C.orange:'#b94300',900,-.3)}`,true);
}

function login(logo,covers){
  const w=2912,h=2160;
  return frame(w,h,`${decor(w,h,35)}${strings(w,h)}<circle cx="2310" cy="1190" r="840" fill="${C.orange}" opacity=".035"/>${mark(logo,160,145,166)}${tx(330,230,'OFICINA DO VIOLÃO',70,C.white,900,-2)}${tx(172,605,'O SEU PRÓXIMO',106,C.white,900,-5)}${tx(172,723,'PASSO COMEÇA AQUI.',106,C.orange,900,-5)}${subtitle(['Estude no seu ritmo. Toque com direção.'],178,814,48,60,'#d3cdc6')}${book(covers[0],1600,1100,350,-12)}${book(covers[1],1985,1000,370,1)}${book(covers[2],2385,1100,350,12)}${tx(175,2016,'FELIPE FIGUEROA  ·  OFICINA DO VIOLÃO',36,C.gray,800,5)}<path d="M172 1950 H2750" stroke="#ffffff" opacity=".21"/>`);
}

function sharedBanner(logo,covers,w,h){
  if(w===1920) return frame(w,h,`${decor(w,h,22)}${brand(logo,105,67,78)}${tx(113,258,'TRÊS GUIAS.',104,C.white,900,-5)}${tx(113,372,'UM CAMINHO',104,C.orange,900,-5)}${tx(113,486,'MAIS CLARO.',104,C.white,900,-5)}${subtitle(['Prática, repertório e cuidado com o instrumento.'],120,581,31,40)}${book(covers[0],1110,215,230,-11)}${book(covers[1],1378,166,240,0)}${book(covers[2],1650,210,230,10)}<path d="M110 716 H1810" stroke="#fff" opacity=".2"/>${tx(115,752,'OFICINA DO VIOLÃO  /  FELIPE FIGUEROA',20,C.gray,900,2)}`);
  return frame(w,h,`${decor(w,h,18)}${mark(logo,46,40,66)}${tx(125,82,'OFICINA DO VIOLÃO',20,C.white,900,1.2)}${tx(49,252,'TRÊS GUIAS.',71,C.white,900,-3)}${tx(49,330,'UM CAMINHO',71,C.orange,900,-3)}${tx(49,408,'MAIS CLARO.',71,C.white,900,-3)}${subtitle(['Prática, repertório e cuidado', 'com o instrumento.'],52,468,25,34)}${book(covers[0],71,625,172,-9)}${book(covers[1],272,580,184,0)}${book(covers[2],483,625,172,9)}<path d="M48 909 H672" stroke="#fff" opacity=".25"/>${tx(51,938,'FELIPE FIGUEROA',17,C.gray,900,2)}`);
}

async function save(page,svg,file,w,h,transparent=false){
  fs.mkdirSync(path.dirname(file),{recursive:true});
  const data='data:image/svg+xml;base64,'+Buffer.from(svg).toString('base64');
  await page.setViewportSize({width:w,height:h});
  await page.setContent(`<html><body style="margin:0;background:transparent"><img id="art" width="${w}" height="${h}" src="${data}"></body></html>`);
  await page.locator('#art').evaluate(img=>img.decode());
  await page.locator('#art').screenshot({path:file,omitBackground:transparent});
  const bytes=fs.statSync(file).size;
  const mb=(bytes/1048576).toFixed(2);
  console.log(`${path.relative(root,file)}  ${w}x${h}  ${mb} MB`);
  if(bytes>5*1048576 && !file.includes('login')) throw new Error(`Arquivo acima de 5 MB: ${file}`);
  if(bytes>8*1048576 && file.includes('login')) throw new Error(`Login acima de 8 MB: ${file}`);
}

async function main(){
  fs.mkdirSync(source,{recursive:true});
  const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true,args:['--disable-gpu','--disable-gpu-compositing','--disable-software-rasterizer']});
  try{
    const carePage=await browser.newPage({viewport:{width:900,height:900},deviceScaleFactor:2});
    await carePage.goto(pathToFileURL(path.join(root,'ebook-cuidados-violao/index.html')).href);
    await carePage.locator('.cover').screenshot({path:products[2].cover});
    await carePage.close();
    const page=await browser.newPage({deviceScaleFactor:1});
    const logo=pngUri(path.join(root,'assets/img/logo-square.png'));
    const covers=products.map(p=>pngUri(p.cover));
    for(let i=0;i<products.length;i++){
      const p=products[i],cover=covers[i],dir=path.join(out,p.slug);
      await save(page,productSquare(p,cover,logo),path.join(dir,'imagem-produto-600x600.png'),600,600);
      fs.copyFileSync(path.join(dir,'imagem-produto-600x600.png'),path.join(dir,'avatar-vitrine-600x600.png'));
      await save(page,wide(p,cover,logo,1920,640,'produto'),path.join(dir,'banner-produto-1920x640.png'),1920,640);
      await save(page,wide(p,cover,logo,1920,800,'vitrine'),path.join(dir,'banner-vitrine-desktop-1920x800.png'),1920,800);
      await save(page,tall(p,cover,logo,720,960,'vitrine'),path.join(dir,'banner-vitrine-mobile-720x960.png'),720,960);
      await save(page,wide(p,cover,logo,1920,1080,'capa'),path.join(dir,'capa-vitrine-horizontal-1920x1080.png'),1920,1080);
      fs.copyFileSync(path.join(dir,'capa-vitrine-horizontal-1920x1080.png'),path.join(dir,'capa-modulo-1920x1080.png'));
      await save(page,tall(p,cover,logo,720,1040,'capa'),path.join(dir,'capa-vitrine-vertical-720x1040.png'),720,1040);
      fs.copyFileSync(path.join(dir,'capa-vitrine-vertical-720x1040.png'),path.join(dir,'capa-trilha-720x1040.png'));
    }
    const shared=path.join(out,'_area-de-membros');
    await save(page,headerLogo(logo,false),path.join(shared,'logo-cabecalho-tema-claro-180x48.png'),180,48,true);
    await save(page,headerLogo(logo,true),path.join(shared,'logo-cabecalho-tema-escuro-180x48.png'),180,48,true);
    await save(page,login(logo,covers),path.join(shared,'fundo-login-2912x2160.png'),2912,2160);
    await save(page,sharedBanner(logo,covers,1920,800),path.join(shared,'banner-tres-ebooks-desktop-1920x800.png'),1920,800);
    await save(page,sharedBanner(logo,covers,720,960),path.join(shared,'banner-tres-ebooks-mobile-720x960.png'),720,960);
    await page.close();
  }finally{await browser.close();}
}
main().catch(err=>{console.error(err);process.exitCode=1;});

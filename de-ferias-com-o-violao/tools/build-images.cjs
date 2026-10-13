/* Imagens do curso para Hotmart e Open Graph. Usa a cena limpa como fotografia-base. */
const fs = require('fs');
const path = require('path');
let chromium;
try { ({chromium} = require('playwright-core')); }
catch { ({chromium} = require('C:/Users/Felipe/AppData/Local/OpenAI/Codex/runtimes/cua_node/45309f9050f7314b/bin/node_modules/playwright-core')); }

const root=path.resolve(__dirname,'../..');
const course=path.join(root,'de-ferias-com-o-violao');
const out=path.join(root,'hotmart-assets/exports/de-ferias-com-o-violao');
const photo='data:image/png;base64,'+fs.readFileSync(path.join(course,'assets/cena-ferias-limpa.png')).toString('base64');
const logo='data:image/png;base64,'+fs.readFileSync(path.join(root,'assets/img/logo-square.png')).toString('base64');
const orange='#ff5a00',white='#f7f5f0',black='#080808',gray='#cac5c0';
const text=(x,y,value,size,color=white,weight=900,space=-2)=>`<text x="${x}" y="${y}" fill="${color}" font-family="Arial,Helvetica,sans-serif" font-weight="${weight}" font-size="${size}" letter-spacing="${space}">${value}</text>`;
const mark=(x,y,w)=>`<image href="${logo}" x="${x}" y="${y}" width="${w}" height="${w}"/>`;
const scene=(x,y,w,h,align='xMidYMid')=>`<image href="${photo}" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="${align} slice"/>`;
const svg=(w,h,body)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="fade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#080808"/><stop offset=".38" stop-color="#080808" stop-opacity=".95"/><stop offset=".66" stop-color="#080808" stop-opacity=".47"/><stop offset="1" stop-color="#080808" stop-opacity=".1"/></linearGradient><linearGradient id="bottom" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#080808" stop-opacity="0"/><stop offset="1" stop-color="#080808"/></linearGradient></defs><rect width="${w}" height="${h}" fill="${black}"/>${body}</svg>`;
const brand=(x,y,size=68)=>`${mark(x,y,size)}${text(x+size+13,y+size*.47,'OFICINA DO VIOLÃO',size*.27,white,900,1)}`;

function square(){const w=600,h=600;return svg(w,h,`${scene(0,0,600,362)}<rect y="254" width="600" height="120" fill="url(#bottom)"/><rect y="344" width="600" height="256" fill="${black}"/><rect width="600" height="9" fill="${orange}"/>${text(38,400,'CURSO ONLINE  /  27 AULAS',16,orange,900,3)}${text(36,471,'DE FÉRIAS',61,white)}${text(36,537,'COM O VIOLÃO',57,orange)}<path d="M38 565 H560" stroke="#fff" stroke-opacity=".28"/>`);}
function wide(w,h,variant){const is640=h===640,is800=h===800;const y1=is640?285:is800?340:455,sz=is640?104:is800?116:141;const y2=y1+sz*1.12;const photoX=is640?690:is800?560:0;const photoW=w-photoX;return svg(w,h,`${scene(photoX,0,photoW,h,is640?'xMidYMid':'xMaxYMid')}<rect width="${w}" height="${h}" fill="url(#fade)"/><rect width="${w}" height="8" fill="${orange}"/>${brand(107,58,is640?65:75)}${text(118,is640?176:y1-sz-44,'CURSO ONLINE  /  27 AULAS',23,orange,900,3)}${text(107,y1,'DE FÉRIAS',sz,white)}${text(107,y2,'COM O VIOLÃO',sz*.88,orange)}${text(115,y2+(is640?74:95),'DO ZERO ÀS PRIMEIRAS MÚSICAS',is640?26:32,white,700,2)}<path d="M110 ${h-68} H${w-115}" stroke="#fff" stroke-opacity=".29"/>${text(116,h-29,variant==='produto'?'DE FÉRIAS COM O VIOLÃO':'OFICINA DO VIOLÃO  /  FELIPE FIGUEROA',17,gray,800,2)}`);}
function tall(h){const w=720,photoH=h===960?470:500;const y1=photoH+135;return svg(w,h,`${scene(0,0,w,photoH,'xMidYMid')}<rect y="${photoH-90}" width="720" height="105" fill="url(#bottom)"/><rect y="${photoH}" width="720" height="${h-photoH}" fill="${black}"/><rect width="720" height="9" fill="${orange}"/>${mark(41,38,63)}${text(113,78,'OFICINA DO VIOLÃO',19,white,900,1)}${text(43,photoH+47,'CURSO ONLINE  /  27 AULAS',19,orange,900,2.5)}${text(37,y1,'DE FÉRIAS',72,white)}${text(37,y1+77,'COM O VIOLÃO',65,orange)}${text(43,y1+144,'DO ZERO ÀS PRIMEIRAS MÚSICAS',22,gray,700,1)}<path d="M42 ${h-67} H675" stroke="#fff" stroke-opacity=".29"/>${text(43,h-31,'FELIPE FIGUEROA  /  OFICINA DO VIOLÃO',17,gray,800,1)}`);}
function login(){const w=2912,h=2160;return svg(w,h,`${scene(0,0,w,h,'xMidYMid')}<rect width="${w}" height="${h}" fill="url(#fade)"/><rect y="1500" width="${w}" height="660" fill="url(#bottom)"/>${brand(170,150,155)}${text(185,705,'DE FÉRIAS',170,white)}${text(185,884,'COM O VIOLÃO',154,orange)}${text(195,977,'27 AULAS PARA COMEÇAR DO ZERO',46,white,700,2)}<path d="M180 2000 H2710" stroke="#fff" stroke-opacity=".27"/>${text(189,2072,'FELIPE FIGUEROA  /  OFICINA DO VIOLÃO',38,gray,800,4)}`);}
function og(){const w=1200,h=630;return svg(w,h,`${scene(450,0,750,630,'xMidYMid')}<rect width="1200" height="630" fill="url(#fade)"/><rect width="1200" height="7" fill="${orange}"/>${brand(60,45,57)}${text(69,176,'CURSO ONLINE  /  27 AULAS',18,orange,900,2)}${text(60,290,'DE FÉRIAS',82,white)}${text(60,382,'COM O VIOLÃO',73,orange)}${text(65,451,'DO ZERO ÀS PRIMEIRAS MÚSICAS',19,white,700,1)}<path d="M60 564 H1140" stroke="#fff" stroke-opacity=".25"/>${text(66,596,'OFICINA DO VIOLÃO',16,gray,800,2)}`);}

async function save(page,markup,file,w,h,kind='jpeg'){
  fs.mkdirSync(path.dirname(file),{recursive:true});
  const data='data:image/svg+xml;base64,'+Buffer.from(markup).toString('base64');
  await page.setViewportSize({width:w,height:h});
  await page.setContent(`<html><body style="margin:0"><img id="asset" width="${w}" height="${h}" src="${data}"></body></html>`);
  await page.locator('#asset').evaluate(img=>img.decode());
  await page.locator('#asset').screenshot({path:file,type:kind,quality:kind==='jpeg'?88:undefined});
  const bytes=fs.statSync(file).size;
  if(bytes>(file.includes('login')?8:5)*1048576)throw new Error(`Arquivo excede o limite: ${file}`);
  console.log(`${path.relative(root,file)}  ${w}x${h}  ${(bytes/1048576).toFixed(2)} MB`);
}
async function main(){
  const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true,args:['--disable-gpu','--disable-gpu-compositing','--disable-software-rasterizer']});
  try{
    const page=await browser.newPage({deviceScaleFactor:1});
    await save(page,square(),path.join(out,'imagem-produto-600x600.jpg'),600,600);
    fs.copyFileSync(path.join(out,'imagem-produto-600x600.jpg'),path.join(out,'avatar-vitrine-600x600.jpg'));
    await save(page,wide(1920,640,'produto'),path.join(out,'banner-produto-1920x640.jpg'),1920,640);
    await save(page,wide(1920,800,'vitrine'),path.join(out,'banner-vitrine-desktop-1920x800.jpg'),1920,800);
    await save(page,tall(960),path.join(out,'banner-vitrine-mobile-720x960.jpg'),720,960);
    await save(page,wide(1920,1080,'capa'),path.join(out,'capa-vitrine-horizontal-1920x1080.jpg'),1920,1080);
    fs.copyFileSync(path.join(out,'capa-vitrine-horizontal-1920x1080.jpg'),path.join(out,'capa-modulo-1920x1080.jpg'));
    await save(page,tall(1040),path.join(out,'capa-vitrine-vertical-720x1040.jpg'),720,1040);
    fs.copyFileSync(path.join(out,'capa-vitrine-vertical-720x1040.jpg'),path.join(out,'capa-trilha-720x1040.jpg'));
    await save(page,login(),path.join(out,'fundo-login-2912x2160.jpg'),2912,2160);
    await save(page,og(),path.join(course,'assets/og-curso.png'),1200,630,'png');
    for (const theme of ['claro','escuro']) {
      const filename=`logo-cabecalho-tema-${theme}-180x48.png`;
      fs.copyFileSync(path.join(root,'hotmart-assets/exports/_area-de-membros',filename),path.join(out,filename));
    }
    await page.close();
  }finally{await browser.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});

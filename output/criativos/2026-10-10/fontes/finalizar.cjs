const fs=require('fs'),path=require('path'),{spawnSync}=require('child_process');
const dir=path.resolve(__dirname,'..');
const posts=JSON.parse(fs.readFileSync(path.join(__dirname,'briefs-e-prompts.json'),'utf8'));
const paths=JSON.parse(fs.readFileSync(path.join(__dirname,'arquivos-gerados.json'),'utf8'));
const magick='C:/Program Files/Wondershare/Recoverit - Data Recovery/ImageMagick/magick.exe';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
for(const p of posts){
 const dest=path.join(dir,p.product,p.id+'.png');
 if(!paths[p.id])throw Error('Falta '+p.id);
 const r=spawnSync(magick,[paths[p.id],'-resize','1080x1080!','-strip',dest],{encoding:'utf8'});
 if(r.status!==0)throw Error(r.stderr);
 const bytes=fs.readFileSync(dest);if(bytes.readUInt32BE(16)!==1080||bytes.readUInt32BE(20)!==1080)throw Error('Dimensões '+p.id);
}
const title={ 'de-ferias-com-o-violao':'De Férias com o Violão','troca-de-acordes':'Guia de Bolso: Troca de Acordes'};
let md='# Criativos — 10/10/2026\n\n20 imagens em PNG, 1080 × 1080 pixels (1:1). Produzidas com a ferramenta integrada de geração de imagens; padronização final de dimensão sem alterar o conteúdo.\n\n## Organização\n\n- `de-ferias-com-o-violao/DFV01.png` até `DFV10.png`: curso em vídeo.\n- `troca-de-acordes/TAC01.png` até `TAC10.png`: e-book.\n- As peças **08, 09 e 10 de cada produto divulgam preço**.\n- `galeria.html`: visualização das 20 peças e seus ângulos.\n- `fontes/briefs-e-prompts.json`: direção criativa e prompts completos.\n\n## Ofertas usadas\n\n- Curso: R$ 47 à vista; 27 aulas em vídeo, do zero às primeiras músicas.\n- Guia: R$ 14,90; PDF de 28 páginas, exercícios progressivos, diagramas e checklist.\n\nValores e características conferidos nas páginas e arquivos de configuração do projeto em 10/10/2026. As peças não anunciam desconto, prazo de resultado ou escassez. O valor parcelado do curso não é usado neste lote.\n\n## Mapa dos criativos\n\n| Arquivo | Produto | Ângulo | Preço na arte |\n| --- | --- | --- | --- |\n';
for(const p of posts)md+=`| [${p.id}.png](${p.product}/${p.id}.png) | ${title[p.product]} | ${p.angle} | ${p.price||'Sem preço'} |\n`;
md+='\n## Como testar os ângulos\n\nEstas são hipóteses criativas para testar em campanha; ainda não há resultados de veiculação.\n\n1. Compare peças do mesmo produto com público, orçamento, posicionamento, período e página de destino equivalentes.\n2. Comece com alguns ângulos distintos e registre compras e custo por compra. Cliques e visitas ajudam a entender o caminho, mas não provam venda.\n3. Como texto e composição variam juntos, a primeira rodada compara conceitos completos. Depois, mantenha a melhor composição e altere uma variável por vez para investigar headline ou preço.\n4. Antes de veicular, confira se preço e página de compra continuam alinhados. O checkout do e-book está vazio no `config.js` local nesta data; conecte o destino de compra correto na campanha.\n\n## Textos e intenção\n';
for(const p of posts)md+=`\n### ${p.id} — ${p.angle}\n\n**Título:** ${p.headline}\n\n**Complemento:** ${p.body}\n\n**Chamada:** ${p.cta}\n\n**Preço:** ${p.price||'Não exibido'}\n`;
fs.writeFileSync(path.join(dir,'LEIA-ME.md'),md);
const cards=posts.map(p=>`<article><a target="_blank" href="${p.product}/${p.id}.png"><img src="${p.product}/${p.id}.png" alt="${esc(p.headline)}"></a><div><small>${p.id} · ${esc(p.angle)}</small><h2>${esc(p.headline)}</h2><p>${p.price||'Sem preço na arte'}</p><a download href="${p.product}/${p.id}.png">Baixar PNG ↗</a></div></article>`).join('');
fs.writeFileSync(path.join(dir,'galeria.html'),`<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Criativos · 10/10/2026</title><style>body{background:#0b0b0b;color:#f4f1eb;font-family:Arial,sans-serif;margin:0;padding:40px 5vw}header{max-width:1400px;margin:0 auto 32px}header span,small{color:#ff8b48}h1{font-size:clamp(32px,5vw,64px);letter-spacing:-2px}header p{color:#bbb}main{max-width:1400px;margin:auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:24px}article{background:#171717;border:1px solid #333;border-radius:18px;overflow:hidden}img{width:100%;display:block;aspect-ratio:1}article>div{padding:22px}h2{font-size:21px;line-height:1.25}p{font-size:14px}a{color:#ff8b48}</style><header><span>OFICINA DO VIOLÃO · 10/10/2026</span><h1>20 criativos. Diferentes motivos para começar.</h1><p>10 para o curso · 10 para o e-book · 1080 × 1080 · preço nas peças 08, 09 e 10 de cada produto.</p></header><main>${cards}</main></html>`);
async function sheets(){
const {chromium}=require('C:/Users/Felipe/AppData/Local/OpenAI/Codex/runtimes/cua_node/45309f9050f7314b/bin/node_modules/playwright-core');
const browser=await chromium.launch({executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true,args:['--disable-gpu']});
try{const page=await browser.newPage({viewport:{width:1600,height:780},deviceScaleFactor:1});
for(const product of Object.keys(title)){
const items=posts.filter(p=>p.product===product);
await page.setContent(`<html><body style="margin:0;padding:25px;background:#161412;color:white;font-family:Arial"><h1 style="font-size:25px;margin:0 0 22px">${title[product]} · 10/10/2026</h1><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:18px">${items.map(p=>`<div><img style="display:block;width:100%" src="data:image/png;base64,${fs.readFileSync(path.join(dir,product,p.id+'.png')).toString('base64')}"><p style="font-size:14px;margin:7px 0 12px">${p.id} · ${p.angle}</p></div>`).join('')}</div></body></html>`);
await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode())));
await page.screenshot({path:path.join(dir,product,'PAINEL.jpg'),type:'jpeg',quality:93,fullPage:true});
}
}finally{await browser.close();}
}
sheets().then(()=>console.log('20 PNGs 1080x1080 + galeria + mapa de ângulos + 2 painéis.')).catch(e=>{console.error(e);process.exitCode=1});

const fs = require('fs');
const path = require('path');
let chromium;
try { ({chromium} = require('playwright-core')); }
catch { ({chromium} = require('C:/Users/Felipe/AppData/Local/OpenAI/Codex/runtimes/cua_node/45309f9050f7314b/bin/node_modules/playwright-core')); }
const dir = __dirname;
const root = path.resolve(dir, '../../..');
const posts = JSON.parse(fs.readFileSync(path.join(dir,'conteudo.json'),'utf8'));
const enc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const slug = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const id = n => String(n).padStart(2,'0');
posts.forEach(p=>p.file=`${id(p.id)}-${slug(p.title)}.png`);
const logoPath = path.join(dir,'logo-square.png');
if(!fs.existsSync(logoPath)) fs.copyFileSync(path.join(root,'assets/img/logo-square.png'),logoPath);
const logo = 'data:image/png;base64,'+fs.readFileSync(logoPath).toString('base64');
const font = weight => `@font-face{font-family:Manrope;font-style:normal;font-weight:${weight};src:url(data:font/ttf;base64,${fs.readFileSync(path.join(dir,`manrope-${weight}.ttf`)).toString('base64')})}`;
const fonts = font(400)+font(800);
const sources = {
cordas:['Fender — Electric Guitar 101','https://www.fender.com/articles/instruments/electric-guitar-101'],
timbre:['Taylor — Wood & Steel, verão de 2019','https://www.taylorguitars.com/sites/default/files/Wood%26Steel%20Summer%202019.pdf'],
oitava:['Yamaha — The rule of strings and pitch','https://www.yamaha.com/en/musical_instrument_guide/acoustic_guitar/mechanism/mechanism003.html'],
compasso:['musictheory.net — Simple and Compound Meter','https://www.musictheory.net/lessons/15'],
capo:['Fender — The Capo: 6 Things You Need to Know','https://www.fender.com/articles/parts-and-accessories/the-capo-6-things-you-need-to-know'],
doze:['Yamaha — Some interesting types of guitars','https://www.yamaha.com/en/musical_instrument_guide/acoustic_guitar/selection/selection002.html'],
tab:['Fender Players Club — How to Read Guitar Tablature (PDF)','https://adamchernick.com/wp-content/uploads/2010/07/reading-tablature.pdf'],
trastes:['Yamaha — Why Do the Spaces Between Frets Grow Narrower?','https://hub.yamaha.com/guitars/g-electric/why-do-the-spaces-between-frets-grow-narrower-down-the-neck/'],
afinador:['Fender — What’s a chromatic tuner?','https://support.fender.com/hc/en-us/articles/42912844750619-What-s-a-chromatic-tuner'],
tampo:['Yamaha — How a guitar makes sound','https://europe.yamaha.com/en/musical-instruments/guitars-basses-amps/explore/musical-instrument-guide/acoustic-guitar/structure001.html'],
palhetas:['Taylor — Wood & Steel, outono de 2015','https://www.taylorguitars.com/sites/default/files/Wood-Steel_Fall-2015_EN.pdf'],
diagramas:['Fender — How to Read a Chord Chart','https://www.fender.com/articles/chords/how-to-read-a-chord-chart'],
cutaway:['Yamaha — Acoustic Guitar Anatomy','https://uk.yamaha.com/musical-instruments/guitars-basses-amps/explore/difference/acoustic-guitar.html'],
eletroacustico:['Yamaha — The appeal of electric acoustic guitars','https://www.yamaha.com/en/musical_instrument_guide/acoustic_guitar/selection/selection002.html'],
harmonico:['UNSW — Strings, standing waves and harmonics','https://phys.unsw.edu.au/jw/strings.html'],
parciais:['UNSW — Strings, standing waves and harmonics','https://phys.unsw.edu.au/jw/strings.html'],
impar:['University of Idaho — Finding Your Way in Irregular Meters','https://uidaho.pressbooks.pub/auralskills/chapter/finding-your-way-in-irregular-meters/'],
drop:['Fender — Drop D Tuning on Guitar','https://www.fender.com/articles/setup/drop-d-tuning-on-guitar'],
calibracao:['D’Addario — What does the 440 mean on my guitar tuner?','https://support.daddario.com/hc/en-us/articles/17274467774356-What-does-the-440-mean-on-my-guitar-tuner'],
tercina:['Open Music Theory — Other Rhythmic Essentials','https://viva.pressbooks.pub/openmusictheory/chapter/other-rhythmic-essentials/'],
intervalos:['Fender — Standard Tuning: How EADGBE Came to Be','https://www.fender.com/articles/setup/standard-tuning-how-eadgbe-came-to-be']
};
const extras={32:'intervalos',34:'drop',40:'calibracao',52:'tercina'};
const tags={
'Conheça o violão':'#AprenderViolao #CuriosidadesMusicais',
'Ritmo na prática':'#Ritmo #EstudoMusical',
'Som e expressão':'#Musicalidade #Timbre',
'Ouvido e repertório':'#PercepcaoMusical #Musica',
'Prática e criatividade':'#PraticaMusical #AprenderViolao',
'Música sem mistério':'#TeoriaMusical #Musica'
};
const hashtag=p=>`#OficinaDoViolao #Violao ${tags[p.category]}`;
const caption=p=>p.caption+'\n\n'+hashtag(p);
const alt=p=>`${p.title} ${p.body} O esquema mostra: ${p.labels.join('; ')}. Assinatura @aoficinadoviolao.`;
const txt=(x,y,s,size=32,color='var(--vfg)',anchor='start')=>`<text x="${x}" y="${y}" font-family="Manrope,Arial,sans-serif" font-size="${size}" font-weight="800" fill="${color}" text-anchor="${anchor}">${enc(s)}</text>`;
const line=(x1,y1,x2,y2,color='var(--line)',width=2,extra='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" ${extra}/>`;
const svg=body=>`<svg viewBox="0 0 900 360" xmlns="http://www.w3.org/2000/svg" role="presentation">${body}</svg>`;
const circle=(x,y,r,fill='var(--accent)',stroke='none')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="3"/>`;
function wave(y,a,cycles,start=45,end=855){let d='';for(let x=start;x<=end;x+=3){const yy=y+Math.sin((x-start)/(end-start)*Math.PI*2*cycles)*a;d+=(x===start?'M':'L')+x+','+yy.toFixed(2);}return d;}
function combinedWave(y){let d='';for(let x=275;x<=850;x+=3){const t=(x-275)/575*Math.PI*2;const yy=y+24*Math.sin(t)+19*Math.sin(3*t);d+=(x===275?'M':'L')+x+','+yy.toFixed(2);}return d;}
function guitar(p){
 const body=p.id===38?'M180 140 C145 115 100 120 96 167 C92 195 126 210 116 240 C95 280 64 305 80 352 C100 415 260 415 280 352 C296 305 265 280 244 240 C234 210 268 195 264 167 C263 153 245 145 226 173 C213 190 197 177 199 140 Z':'M180 140 C145 115 100 120 96 167 C92 195 126 210 116 240 C95 280 64 305 80 352 C100 415 260 415 280 352 C296 305 265 280 244 240 C234 210 268 195 264 167 C260 120 215 115 180 140Z';
 let g=`<g transform="translate(295,-2) scale(.86)"><path d="${body}" fill="var(--accent)" fill-opacity=".14" stroke="var(--accent)" stroke-width="4"/><rect x="158" y="21" width="44" height="166" rx="4" fill="var(--vbg)" stroke="var(--vfg)" stroke-width="3"/><rect x="151" y="-13" width="58" height="47" rx="10" fill="var(--accent)"/>${circle(180,221,34,'var(--vbg)','var(--accent)')}<rect x="128" y="320" width="104" height="19" rx="4" fill="var(--vfg)"/>`;
 for(let i=0;i<6;i++)g+=line(166+i*5.5,8,166+i*5.5,329,'var(--vfg)',1.2);
 for(let i=0;i<9;i++)g+=line(158,47+i*15,202,47+i*15,'var(--vfg)',1);
 g+='</g>';
 if(p.id===3){g+=circle(450,145,15)+circle(450,278,15)+line(445,145,240,105,'var(--accent)',3)+line(466,278,610,240,'var(--accent)',3)+txt(25,85,'PERTO DO',24)+txt(25,117,'BRAÇO',35)+txt(630,232,'PERTO DO',24)+txt(630,266,'CAVALETE',30);}
 else if(p.id===38){g+=circle(488,142,19,'none','var(--accent)')+line(508,142,625,102,'var(--accent)',3)+txt(640,102,'CUTAWAY',29)+txt(25,266,'MAIS ESPAÇO',25)+txt(25,301,'PARA A MÃO',25);}
 else if(p.id===44){g+=circle(450,277,20,'none','var(--accent)')+line(472,277,626,229,'var(--accent)',3)+txt(630,200,'CONTATO',26)+txt(630,233,'LEVE',36)+txt(25,90,'PALM',44)+txt(25,137,'MUTE',44);}
 else {g+=line(451,270,629,205,'var(--accent)',3)+txt(635,184,'CAVALETE',26)+txt(635,220,'+ TAMPO',26)+txt(25,117,'A CORDA',30)+txt(25,157,'VIBRA',44);}
 return svg(g);
}
function visual(p){const l=p.labels.map(enc);
 switch(p.kind){
 case 'compare':return `<div class="compare"><div><b>${l[0]}</b><span>${l[1]}</span></div><div><b>${l[2]}</b><span>${l[3]}</span></div></div>`;
 case 'stack':case 'steps':return `<div class="stack">${l.map((v,i)=>`<div><i>${id(i+1)}</i><b>${v}</b><span>↗</span></div>`).join('')}</div>`;
 case 'flow':return `<div class="flow">${l.map((v,i)=>`${i?'<i>→</i>':''}<div><small>0${i+1}</small><b>${v}</b></div>`).join('')}</div>`;
 case 'number':return `<div class="number"><div><strong>${l[0]}</strong><b>${l[1]}</b></div><span>${l[2]}</span></div>`;
 case 'poster':return `<div class="poster"><b>${l[0]}</b><b>${l[1]}</b><span>${l[2]}</span></div>`;
 case 'quiz':return p.id===58?`<div class="quiz-options">${l.map((v,i)=>`<div><span>${id(i+1)}</span><b>${v}</b><i>?</i></div>`).join('')}</div>`:`<div class="question"><strong>?</strong><div><b>${l[0]}</b><span>${l[1]}</span><small>${l[2]}</small></div></div>`;
 case 'pulse':case 'arrows':case 'pulse8':case 'triplet':{
 const n=p.kind==='pulse8'?8:p.kind==='triplet'?3:4, r=n===8?36:65;
 let b=line(65,180,835,180,'var(--line)',3);
 for(let i=0;i<n;i++){const x=90+(720/(n-1))*i,active=p.id===43?[1,3].includes(i):p.id===15?i!==2:p.kind==='pulse8'?i%2===0:i===0;
 b+=circle(x,180,r,active?'var(--accent)':'var(--vbg)','var(--accent)')+txt(x,195,p.labels[i],n===8?38:51,active?'#080808':'var(--vfg)','middle');}
 if(p.kind==='triplet')b+=line(90,63,810,63,'var(--vfg)',3)+line(90,63,90,84,'var(--vfg)',3)+line(810,63,810,84,'var(--vfg)',3)+txt(450,48,'3',34,'var(--accent)','middle');
 b+=txt(450,310,p.kind==='pulse8'?'NÚMEROS NO CLIQUE · “e” NO MEIO':p.kind==='triplet'?'TRÊS PARTES IGUAIS':p.id===15?'O 3 CONTINUA SENDO CONTADO':p.id===43?'DESTAQUE NO 2 E NO 4':'MANTENHA ESPAÇOS REGULARES',23,'var(--vfg)','middle');return svg(b);}
 case 'strings':return svg(p.labels.map((v,i)=>txt(30,51+i*51,v,29)+line(240,42+i*51,825,42+i*51,i===0?'var(--accent)':'var(--vfg)',1.8+i*1.1)+circle(832,42+i*51,5)).join(''));
 case 'strings12':{let b='';for(let i=0;i<6;i++){const x=118+i*132;b+=line(x,42,x,250,'var(--accent)',3)+line(x+14,42,x+14,250,'var(--vfg)',3)+txt(x+7,287,String(i+1),25,'var(--vfg)','middle');}return svg(b+txt(450,337,'SEIS PARES DE CORDAS',28,'var(--vfg)','middle'));}
 case 'alphabet':return `<div class="alphabet">${p.labels.map(v=>{const [a,b]=v.split(' · ');return `<div><b>${enc(a)}</b><span>${enc(b)}</span></div>`}).join('')}</div>`;
 case 'tab':{let b='';['e','B','G','D','A','E'].forEach((v,i)=>{b+=txt(45,83+i*39,v,28)+line(90,75+i*39,835,75+i*39,'var(--line)',2);});[0,1,3].forEach((v,i)=>{const x=270+i*200;b+=`<rect x="${x-29}" y="44" width="58" height="58" rx="12" fill="var(--accent)"/>`+txt(x,86,String(v),39,'#080808','middle');});return svg(b+txt(450,340,'LINHA DE CIMA = CORDA MAIS FINA',24,'var(--vfg)','middle'));}
 case 'intervals':{let b='';for(let i=0;i<6;i++){const x=90+i*143;b+=circle(x,140,48,'var(--vbg)','var(--accent)')+txt(x,154,p.labels[i],34,'var(--vfg)','middle');if(i<5)b+=line(x+50,140,x+92,140,'var(--line)',3)+txt(x+71,234,i===3?'3ª M':'4ª J',24,i===3?'var(--accent)':'var(--vfg)','middle');}return svg(b+txt(450,317,'DA 6ª CORDA À 1ª · AFINAÇÃO PADRÃO',25,'var(--vfg)','middle'));}
 case 'meter':case 'meter7':{const seven=p.kind==='meter7';let b='';const groups=seven?[[2,2,3],[3,2,2]]:[[2,2,2],[3,3]];groups.forEach((gs,j)=>{const y=95+j*170;let i=0; b+=txt(30,y+13,seven?(j===0?'2+2+3':'3+2+2'):(j===0?'3/4':'6/8'),seven?29:48);gs.forEach((size,gi)=>{const start=i;for(let a=0;a<size;a++,i++){const x=275+i*(seven?82:99);b+=circle(x,y,27,a===0?'var(--accent)':'var(--vbg)','var(--accent)')+txt(x,y+9,String(a+1),24,a===0?'#080808':'var(--vfg)','middle');}b+=line(250+start*(seven?82:99),y+52,300+(i-1)*(seven?82:99),y+52,'var(--accent)',4);});});return svg(b);}
 case 'frets':{if(p.id===48)return svg(line(70,180,830,180,'var(--vfg)',3)+`<path d="${wave(180,60,1)}" fill="none" stroke="var(--accent)" stroke-width="4"/>`+line(450,85,450,280,'var(--vfg)',2,'stroke-dasharray="6 8"')+circle(450,180,15)+txt(450,57,'CONTATO LEVE NA REGIÃO DO TRASTE 12',24,'var(--vfg)','middle')+txt(450,324,'CORDA SOLTA · HARMÔNICO NATURAL',25,'var(--vfg)','middle'));
 let b='';for(let i=0;i<6;i++)b+=line(50,80+i*29,850,80+i*29,'var(--line)',1+i*.5);for(let i=0;i<13;i++){const x=50+(1-Math.pow(2,-i/12))*1600;b+=line(x,65,x,240,'var(--accent)',i===0?9:3);}return svg(b+txt(50,307,'MAIS GRAVE',25)+txt(850,307,'MAIS AGUDO →',25,'var(--vfg)','end'));}
 case 'tuner':{let b=`<path d="M170 155 Q450 -40 730 155" fill="none" stroke="var(--line)" stroke-width="9"/>`;for(let i=0;i<15;i++){const x=185+i*38;b+=line(x,130-Math.sin(i/14*Math.PI)*81,x,151-Math.sin(i/14*Math.PI)*81,i===7?'var(--accent)':'var(--vfg)',i===7?7:3);}return svg(b+line(450,161,450,70,'var(--accent)',7)+txt(450,270,'E',116,'var(--accent)','middle')+txt(450,325,'MI · AFINAÇÃO PADRÃO DA 1ª CORDA',25,'var(--vfg)','middle'));}
 case 'bars':{let b='';for(let i=0;i<15;i++){const x=55+i*56,h=(i<7?50:125)+Math.abs(Math.sin(i*1.7))*80;b+=`<rect x="${x}" y="${245-h}" width="29" height="${h}" rx="12" fill="${i<7?'var(--vfg)':'var(--accent)'}"/>`;}return svg(b+txt(215,309,p.labels[0],27,'var(--vfg)','middle')+txt(665,309,p.labels[1],27,'var(--accent)','middle'));}
 case 'picks':return svg(`<path d="M110 76 Q250 14 390 76 Q412 158 250 290 Q87 158 110 76Z" fill="var(--accent)"/><path d="M510 76 Q650 14 790 76 Q812 158 650 290 Q487 158 510 76Z" fill="none" stroke="var(--accent)" stroke-width="9"/>`+txt(250,157,'A',70,'#080808','middle')+txt(650,157,'B',70,'var(--vfg)','middle')+txt(450,338,'MESMA FRASE · MESMO LOCAL DO ATAQUE',23,'var(--vfg)','middle'));
 case 'contour':{const points=[[80,220],[220,125],[370,165],[520,235],[670,120],[820,120]];let b=`<polyline points="${points.map(v=>v.join(',')).join(' ')}" fill="none" stroke="var(--accent)" stroke-width="6"/>`;points.forEach(([x,y])=>b+=circle(x,y,12));return svg(b+txt(105,316,'SOBE',28)+txt(390,316,'DESCE',28)+txt(700,316,'REPETE',28));}
 case 'frame':return svg(`<rect x="110" y="25" width="680" height="282" rx="30" fill="none" stroke="var(--vfg)" stroke-width="5"/><rect x="145" y="60" width="610" height="212" rx="18" fill="none" stroke="var(--line)" stroke-width="2"/>`+circle(728,91,12)+txt(690,100,'REC',23,'var(--accent)','end')+txt(450,178,'DUAS MÃOS',50,'var(--vfg)','middle')+txt(450,229,'UM DETALHE POR VEZ',27,'var(--accent)','middle')+txt(450,348,'GRAVE · OBSERVE · EXPERIMENTE',22,'var(--vfg)','middle'));
 case 'guitar':return guitar(p);
 case 'wave':{if(p.id===57)return svg([['FUNDAMENTAL',70,1,24],['PARCIAL',174,3,19],['COMBINAÇÃO',278,2,36]].map(([s,y,c,a],i)=>txt(25,y+9,s,23)+`<path d="${i===2?combinedWave(y):wave(y,a,c,275,850)}" stroke="${i===2?'var(--accent)':'var(--vfg)'}" stroke-width="4" fill="none"/>`).join(''));
 let b='';for(let i=0;i<67;i++){const x=50+i*12,h=18+Math.abs(Math.sin(i*.41)*Math.cos(i*.12))*150;b+=line(x,180-h/2,x,180+h/2,i%5===0?'var(--vfg)':'var(--accent)',5,'stroke-linecap="round"');}return svg(b+txt(450,59,p.labels[0],31,'var(--vfg)','middle')+txt(450,325,p.labels.slice(1).join(' · '),25,'var(--vfg)','middle'));}
 default:throw new Error('Unknown visual '+p.kind);
 }}
const css=`${fonts}
*{box-sizing:border-box}body{margin:0;font-family:Manrope,Arial,sans-serif}#post{width:1080px;height:1350px;position:relative;overflow:hidden;background:var(--bg);color:var(--fg);--accent:#ff620e;--vbg:#111;--vfg:#f6f2e9;--line:#6a655b}
.dark{--bg:#0a0a0a;--fg:#f4f0e8;--muted:#c7c2b9;--tag:#ff6a1d;--border:#39362f;--cta:#ff620e;--ctafg:#090909}
.paper{--bg:#eeece6;--fg:#111;--muted:#45423c;--tag:#a83700;--border:#c9c4b9;--cta:#111;--ctafg:#fff}
.orange{--bg:#ff620e;--fg:#090909;--muted:#342012;--tag:#090909;--border:#aa3b00;--cta:#111;--ctafg:#fff}
.pattern{position:absolute;inset:0;background-image:linear-gradient(90deg,transparent 99%,var(--border) 99%),linear-gradient(0deg,transparent 99%,var(--border) 99%);background-size:90px 90px;opacity:.12;mask-image:linear-gradient(140deg,transparent 30%,#000)}
.edge{position:absolute;top:0;left:0;width:100%;height:12px;background:var(--accent)}.orange .edge{background:#111}
.brand{position:absolute;top:61px;left:72px;display:flex;align-items:center;gap:14px;font-size:19px;font-weight:800;line-height:1.13;letter-spacing:.03em}.brand img{height:57px;width:57px;background:#090909;border-radius:13px;padding:6px}.serial{position:absolute;right:74px;top:76px;font-size:20px;font-weight:800;letter-spacing:.08em;color:var(--muted)}
.tag{position:absolute;top:161px;left:74px;font-size:20px;font-weight:800;color:var(--tag);letter-spacing:.12em;text-transform:uppercase}
.main{position:absolute;top:218px;left:72px;right:72px;bottom:229px;display:flex;flex-direction:column;gap:27px}
h1{margin:0;font-size:83px;font-weight:800;line-height:1.04;letter-spacing:-4.1px;flex-shrink:0;text-wrap:balance}h1.short{font-size:95px;letter-spacing:-4.8px}
.body{font-size:31px;line-height:1.35;margin:0;color:var(--muted);flex-shrink:0;max-width:923px}
.visual{width:100%;position:relative;flex:1;min-height:310px;max-height:440px;margin-top:auto;display:flex;align-items:center;justify-content:center;background:var(--vbg);color:var(--vfg);border:1px solid #484239;border-radius:30px;padding:18px 22px;overflow:hidden;box-shadow:0 14px 35px #0001}
.visual svg{width:100%;height:100%;max-height:380px;overflow:visible}
.cta{position:absolute;left:72px;right:72px;bottom:124px;height:74px;border-radius:99px;display:flex;align-items:center;justify-content:space-between;padding:0 31px;background:var(--cta);color:var(--ctafg);font-size:21px;font-weight:800;letter-spacing:.035em}.cta i{font-size:32px;font-style:normal}
.footer{position:absolute;bottom:57px;left:74px;right:74px;display:flex;align-items:center;justify-content:space-between;font-weight:800}.handle{font-size:27px;letter-spacing:-.7px}.follow{font-size:16px;letter-spacing:.07em;color:var(--muted)}
.compare{display:grid;grid-template-columns:1fr 1fr;width:100%;height:100%;gap:20px;padding:10px}.compare>div{background:#211e18;border:1px solid #50483c;border-radius:22px;display:flex;flex-direction:column;justify-content:center;padding:27px;gap:24px}.compare>div:nth-child(2){background:#ff620e;color:#0a0a0a;border-color:#ff620e}.compare b{font-size:48px;line-height:1.06;letter-spacing:-1.9px}.compare span{font-size:28px;line-height:1.25}
.stack,.quiz-options{width:100%;display:flex;flex-direction:column;gap:16px;padding:13px}.stack>div,.quiz-options>div{display:flex;align-items:center;gap:28px;padding:22px 24px;background:#211e18;border:1px solid #4d463a;border-radius:17px}.stack i,.quiz-options span{font-size:24px;color:var(--accent);font-style:normal;font-weight:800}.stack b{font-size:31px;line-height:1.1}.stack span{margin-left:auto;color:var(--accent);font-size:32px}
.flow{display:flex;align-items:center;gap:10px;width:100%;padding:9px}.flow>div{flex:1;min-width:0;padding:25px 13px;text-align:center;border:1px solid #776044;border-radius:23px;min-height:175px;display:flex;flex-direction:column;justify-content:center;gap:24px}.flow small{color:var(--accent);font-weight:800;font-size:20px}.flow b{font-size:29px;line-height:1.15;overflow-wrap:normal}.flow i{font-style:normal;color:var(--accent);font-size:39px}
.number{text-align:center}.number>div{display:flex;align-items:baseline;justify-content:center;gap:23px}.number strong{font-size:190px;letter-spacing:-14px;line-height:1.08;color:var(--accent)}.number b{font-size:37px}.number span{display:block;margin-top:12px;font-size:28px}
.poster{text-align:center}.poster b{font-size:71px;letter-spacing:-4px;line-height:1.1;display:block}.poster b:nth-child(2){color:var(--accent)}.poster span{display:block;margin-top:26px;font-size:37px}
.quiz-options b{font-size:36px}.quiz-options i{margin-left:auto;color:var(--accent);font-size:34px;font-style:normal}.question{display:flex;align-items:center;gap:65px}.question strong{font-size:245px;color:var(--accent);line-height:1}.question>div{max-width:450px}.question b{font-size:53px;display:block;letter-spacing:-2px}.question span{font-size:30px;display:block;color:var(--accent);margin:18px 0}.question small{font-size:25px}
.alphabet{display:grid;grid-template-columns:repeat(7,1fr);gap:9px;width:100%;padding:12px}.alphabet>div{padding:25px 0;border-top:3px solid var(--accent);text-align:center}.alphabet b{font-size:62px;color:var(--accent);display:block}.alphabet span{font-size:24px;display:block;margin-top:25px}
`;
function html(p){const theme=['dark','paper','orange'][((p.id-1)%9<3)?(p.id-1)%3:Math.floor((p.id-1)/3)%3];return `<html lang="pt-BR"><meta charset="utf-8"><style>${css}</style><body><article id="post" class="${theme}"><div class="pattern"></div><div class="edge"></div><div class="brand"><img src="${logo}" alt=""><span>OFICINA<br>DO VIOLÃO</span></div><div class="serial">${id(p.id)} / 60</div><div class="tag">${enc(p.tag)}</div><div class="main"><h1 class="${p.title.length<37?'short':''}">${enc(p.title)}</h1><p class="body">${enc(p.body)}</p><div class="visual">${visual(p)}</div></div><div class="cta">${enc(p.cta)}<i>↗</i></div><div class="footer"><span class="handle">@aoficinadoviolao</span><span class="follow">SIGA PARA APRENDER MAIS ↗</span></div></article></body></html>`;}
function docs(){
 let md='# 60 posts para @aoficinadoviolao\n\nArtes em PNG, 1080 × 1350 px (4:5). Uma imagem por publicação. A ordem alterna os assuntos para variar o feed. Cada legenda abaixo está pronta para copiar, com hashtags; o texto alternativo fica separado.\n\nAs propostas são curtas e independentes. Os treinos completos de troca de acordes, as sequências progressivas e os tutoriais de manutenção continuam nos e-books.\n\n## Como postar\n\n1. Escolha o PNG indicado em `artes/`.\n2. Copie o bloco de legenda do mesmo número.\n3. Acrescente o texto alternativo na publicação, quando o aplicativo oferecer esse campo.\n4. Publique na ordem sugerida ou escolha o tema do dia.\n\n## Índice\n\n| Post | Assunto | Tema |\n| --- | --- | --- |\n';
 posts.forEach(p=>md+=`| ${id(p.id)} | ${p.title} | ${p.category} |\n`);
 posts.forEach(p=>{const key=p.source||extras[p.id],source=sources[key];md+=`\n---\n\n## Post ${id(p.id)} — ${p.title}\n\n**Arquivo:** [${p.file}](artes/${p.file})\n\n**Tema:** ${p.category}\n\n**Texto da arte:** ${p.title} ${p.body}\n\n**Chamada na arte:** ${p.cta}\n\n**Legenda pronta para copiar:**\n\n\`\`\`text\n${caption(p)}\n\`\`\`\n\n**Texto alternativo:** ${alt(p)}\n${source?`\n**Referência de apuração (fora da legenda):** [${source[0]}](${source[1]}).\n`:''}`;});
 fs.writeFileSync(path.join(dir,'LEGENDAS-60-POSTS.md'),md);
 let refs='# Referências editoriais\n\nConsultadas em 10/10/2026 para conferir as curiosidades técnicas. As legendas e as propostas de prática são redação original para a Oficina. Os gráficos são esquemas educativos, sem medições experimentais.\n\n';
 Object.entries(sources).forEach(([k,v])=>{const used=posts.filter(p=>(p.source||extras[p.id])===k).map(p=>id(p.id));if(used.length)refs+=`- Posts ${used.join(', ')}: [${v[0]}](${v[1]}).\n`;});fs.writeFileSync(path.join(dir,'FONTES.md'),refs);
 fs.writeFileSync(path.join(dir,'README.md'),'# 60 posts — Oficina do Violão\n\n- `artes/`: 60 PNGs prontos para o feed, 1080 × 1350 pixels.\n- `LEGENDAS-60-POSTS.md`: legenda, hashtags, texto alternativo e arquivo de cada post.\n- `galeria.html`: prévia das artes, busca por assunto e botão para copiar legenda.\n- `paineis/`: seis folhas de contato com dez artes por folha.\n- `FONTES.md`: referências de apuração.\n- `conteudo.json` e `gerar.cjs`: textos e gerador editáveis.\n\nAs artes usam Manrope e a identidade preto, laranja e off-white da Oficina. São composições tipográficas e diagramas, sem fotografias geradas. O conteúdo foi pensado para complementar os e-books com descobertas curtas, escuta e prática musical.\n\nPara recriar: Node.js com `playwright-core` e Edge/Chrome. Rode `node gerar.cjs` nesta pasta; use `CHROME_PATH` para outro caminho de navegador. Os arquivos de fonte locais permitem a renderização sem conexão.\n');
 const cards=posts.map(p=>`<article data-search="${enc((p.title+' '+p.category).toLowerCase())}"><a href="artes/${p.file}" target="_blank"><img loading="lazy" src="artes/${p.file}" alt="${enc(alt(p))}"></a><div><small>${id(p.id)} · ${enc(p.category)}</small><h2>${enc(p.title)}</h2><button data-copy="${p.id}">Copiar legenda</button><a download href="artes/${p.file}">Baixar arte</a><details><summary>Ver legenda</summary><p>${enc(caption(p))}</p></details></div></article>`).join('');
 const captions=JSON.stringify(Object.fromEntries(posts.map(p=>[p.id,caption(p)]))).replace(/</g,'\\u003c');
 fs.writeFileSync(path.join(dir,'galeria.html'),`<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>60 posts · Oficina do Violão</title><style>body{margin:0;background:#0b0b0b;color:#f2f0eb;font-family:Arial,sans-serif}header{padding:46px 5vw 30px;max-width:1200px;margin:auto}h1{font-size:clamp(32px,5vw,62px);letter-spacing:-2px;margin:8px 0 15px}header>span{color:#ff620e;font-weight:bold}header p{color:#aaa;line-height:1.5}input{background:#222;color:white;border:1px solid #666;padding:15px;border-radius:12px;width:min(90%,460px);font-size:16px}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;max-width:1440px;margin:0 auto;padding:15px 5vw 60px}article{background:#181818;border:1px solid #37332f;border-radius:18px;overflow:hidden}article img{display:block;width:100%;aspect-ratio:4/5}article>div{padding:20px}small{color:#ffa06b}h2{font-size:20px;line-height:1.3;margin:12px 0 20px}button,a{cursor:pointer}button{background:#ff620e;color:#111;padding:12px 15px;border:0;border-radius:30px;font-weight:bold}article>div>a{color:#eee;margin-left:16px;font-size:14px}details{margin-top:20px;color:#ccc;font-size:14px;line-height:1.55}details p{white-space:pre-wrap}.hidden{display:none}</style><header><span>@aoficinadoviolao</span><h1>60 ideias para levar ao violão.</h1><p>Uma arte por publicação. Clique para abrir a imagem, baixar ou copiar a legenda com as hashtags.</p><input aria-label="Buscar assunto" placeholder="Buscar: ritmo, afinação, ouvido…"><p id="count">60 posts</p></header><main>${cards}</main><script>const captions=${captions};document.querySelector('input').addEventListener('input',e=>{const q=e.target.value.toLowerCase();let n=0;document.querySelectorAll('article').forEach(a=>{const show=a.dataset.search.includes(q);a.classList.toggle('hidden',!show);if(show)n++});document.getElementById('count').textContent=n+' posts'});document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{const t=captions[b.dataset.copy];try{await navigator.clipboard.writeText(t)}catch{const a=document.createElement('textarea');a.value=t;document.body.append(a);a.select();document.execCommand('copy');a.remove()}b.textContent='Legenda copiada';setTimeout(()=>b.textContent='Copiar legenda',1800)}));</script></html>`);
}
async function main(){
 if(posts.length!==60||new Set(posts.map(p=>p.id)).size!==60)throw new Error('Esperados 60 posts únicos.');
 if(/[\u0400-\u04ff]/.test(JSON.stringify(posts)))throw new Error('Caractere inesperado nos textos.');
 fs.mkdirSync(path.join(dir,'artes'),{recursive:true});fs.mkdirSync(path.join(dir,'paineis'),{recursive:true});
 docs();
 const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',headless:true,args:['--disable-gpu','--disable-gpu-compositing','--disable-software-rasterizer']});
 const report=[];
 try{const page=await browser.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:1});
 for(const p of posts){await page.setContent(html(p));await page.evaluate(()=>document.fonts.ready);
 const qa=await page.evaluate(()=>{const m=document.querySelector('.main'),h=document.querySelector('h1');let f=parseFloat(getComputedStyle(h).fontSize);while(m.scrollHeight>m.clientHeight+1&&f>64){f-=2;h.style.fontSize=f+'px';h.style.letterSpacing='-3px'}const bad=[...document.querySelectorAll('.main,.visual,.compare>div,.stack>div,.flow>div,.tag,.cta')].filter(e=>e.scrollWidth>e.clientWidth+2||e.scrollHeight>e.clientHeight+2).map(e=>e.className||e.tagName);return {font:f,fontLoaded:document.fonts.check('800 80px Manrope'),overflow:bad}});
 if(!qa.fontLoaded||qa.overflow.length)throw new Error(`Post ${p.id}: ${JSON.stringify(qa)}`);
 await page.locator('#post').screenshot({path:path.join(dir,'artes',p.file)});report.push({id:p.id,file:p.file,...qa});if(p.id%10===0)console.log(`Artes exportadas: ${p.id}/60`);}
 for(let b=0;b<6;b++){const subset=posts.slice(b*10,b*10+10);await page.setViewportSize({width:1400,height:840});await page.setContent(`<html><body style="margin:0;background:#25221f;padding:26px;box-sizing:border-box;font-family:Arial;color:#fff"><div style="font-size:23px;font-weight:bold;margin-bottom:20px">OFICINA DO VIOLÃO · POSTS ${id(b*10+1)}–${id(b*10+10)}</div><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:18px">${subset.map(p=>`<div><img style="width:100%;display:block" src="data:image/png;base64,${fs.readFileSync(path.join(dir,'artes',p.file)).toString('base64')}"><p style="font-size:14px;margin:7px 0">${id(p.id)} · ${enc(p.category)}</p></div>`).join('')}</div></body></html>`);await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode())));await page.screenshot({path:path.join(dir,'paineis',`painel-${b+1}.jpg`),type:'jpeg',quality:90,fullPage:true});}
 fs.writeFileSync(path.join(dir,'verificacao.json'),JSON.stringify({count:report.length,width:1080,height:1350,posts:report},null,2));await page.close();
 }finally{await browser.close();}
 console.log('Concluído: 60 PNGs, legendas, galeria e seis painéis.');
}
main().catch(e=>{console.error(e);process.exitCode=1});

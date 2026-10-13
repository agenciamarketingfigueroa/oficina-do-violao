const fs=require('fs'),path=require('path');
const file=path.join(__dirname,'montar-entrega.cjs');
let s=fs.readFileSync(file,'utf8');
s=s.replace(/\b70\b/g,'100').replace('20 novos criativos do curso.','50 novos criativos do curso.').replace('`DFV30.png`: 20','`DFV60.png`: 50').replace('a `DFV30.png`','a `DFV60.png`').replace('DFV25–DFV30:**','DFV25–DFV30 e DFV52–DFV60:**').replace('20 criativos do curso · 20 de troca','50 criativos do curso · 20 de troca').replace('7 painéis','10 painéis');
s=s.replace("const enc=", "const enc=");
fs.writeFileSync(file,s);
const dataFile=path.join(__dirname,'briefs-e-prompts.json');const posts=JSON.parse(fs.readFileSync(dataFile,'utf8'));const rank={'de-ferias-com-o-violao':0,'troca-de-acordes':1,'acordes-em-sequencia':2};posts.sort((a,b)=>rank[a.product]-rank[b.product]||a.id.localeCompare(b.id));fs.writeFileSync(dataFile,JSON.stringify(posts,null,2));
console.log('Entrega ajustada para os 100 criativos solicitados.');

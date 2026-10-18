// As duas entradas entregam HTML completo, sem redirecionar nem buscar a página via JS.
// Edite quiz/index.html e execute este script antes de publicar.
const fs = require('node:fs');
const path = require('node:path');
const source = path.resolve(__dirname, '../quiz/index.html');
const destination = path.resolve(__dirname, '../../de-ferias/index.html');
fs.copyFileSync(source, destination);
console.log('Quiz sincronizado em /de-ferias/ e /de-ferias-com-o-violao/quiz/.');

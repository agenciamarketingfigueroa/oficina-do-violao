# Violão bem cuidado

E-book A5 da Oficina do Violão. O arquivo editável é `index.html` com `style.css`; o PDF atualizado fica em `../output/pdf/violao-bem-cuidado-atualizado.pdf`.

## Links de afiliado

Os quatro links de produtos informados por Felipe ficam em `productLinks`, no arquivo `products.js`. Cada botão vira um link clicável `VER PRODUTO` na versão HTML e no PDF exportado novamente. A última página reúne somente cordas de nylon, cordas de aço, afinador cromático e alicate encordoador; a antiga página extra de produtos foi removida.

A nota da última página informa a presença de links de afiliado. Confira se tipo, tensão ou calibre das cordas e compatibilidade dos produtos correspondem ao instrumento do comprador.

## Exportar PDF

Execute `node ebook-cuidados-violao/tools/build-pdf.cjs` na raiz do projeto para exportar o PDF A5 e conferir os quatro links. O script usa Playwright Core e Microsoft Edge ou Chrome. Após qualquer alteração nos links, exporte novamente o PDF para que os botões recebam os novos destinos.

O material não substitui o manual do fabricante ou uma avaliação individual de luthier.

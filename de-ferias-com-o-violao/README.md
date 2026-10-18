# De Férias com o Violão

Página de vendas do curso em vídeo com 27 aulas, do zero às primeiras músicas.

- Página pública: `de-ferias-com-o-violao/index.html`
- Checkout: `https://pay.hotmart.com/R56459589W?off=rxe4p9o9&checkoutMode=10`
- Preço exibido: R$ 47 à vista ou 12x de R$ 4,86
- Textos centrais e valores de compra: `config.js` e `index.html`
- Imagens para upload na Hotmart: `../hotmart-assets/exports/de-ferias-com-o-violao/`

A fotografia de fundo foi recriada a partir da capa antiga enviada por Felipe: mantém a barraca laranja, a paisagem e o violão, sem as letras nem os brilhos. `assets/cena-ferias-limpa.png` é a fonte em alta resolução; a versão WebP é usada pela página.

Modo da imagem: edição com a ferramenta integrada de geração de imagens. Prompt final usado:

> Use case: precise-object-edit. Edit target: the user's attached old cover for the course “De Férias com o Violão”. Create a clean, photorealistic high-resolution landscape background suitable for a website hero and product banners. Preserve the recognizable scene and mood: view from inside an orange camping tent with the curved tent opening, rocky lakeshore at sunset, seated person in red holding an acoustic guitar on the right side, calm water and sky. Remove every existing white word, letter and typographic mark. Remove all three white sparkle/star graphics at the lower right. Reconstruct the tent fabric, guitar, pebbles, water and sky behind those removals naturally. Widen the composition toward a landscape 16:9 frame by extending the original environment plausibly; keep the person and guitar to the right and create usable darker negative space on the left for separate HTML text. No new people, no extra instruments, no logo, no typography, no watermark, no sparkle shapes. Keep warm orange tent and realistic natural sunset lighting. Make the result feel like a polished editorial photo, not an illustration.

Para regenerar as artes da Hotmart, execute `node de-ferias-com-o-violao/tools/build-images.cjs` na raiz do projeto. O script usa Playwright Core e Microsoft Edge ou Chrome. Para indicar outro navegador, defina `CHROME_PATH`.

As artes são exportadas em JPG, exceto a imagem Open Graph da página. Os logos de cabeçalho da área de membros ficam no pacote compartilhado em `hotmart-assets/exports/_area-de-membros/`.

## Quiz para tráfego

- Entrada para anúncios: **https://oficinadoviolao.com.br/de-ferias/**. Entrega o quiz diretamente, sem redirecionamento JavaScript ou meta refresh. Use a barra final: o GitHub Pages redireciona URLs de diretórios sem barra com HTTP 301.
- A entrada antiga, /de-ferias-com-o-violao/quiz/, continua funcionando diretamente. As duas páginas usam os mesmos scripts, estilos e HTML; canonical e Open Graph apontam para /de-ferias/.
- Fonte do HTML: quiz/index.html. Após editar, rode node de-ferias-com-o-violao/tools/sync-quiz.cjs para atualizar de-ferias/index.html. O QA confere a igualdade dos arquivos.
- Oito perguntas fixas, sempre na mesma ordem: nível, dificuldade, desânimo, conquista desejada, aulas em vídeo, suporte direto do professor via WhatsApp, grupo no WhatsApp e oferta com ancoragem de preço. Nenhum texto de pergunta depende das respostas.
- A abertura é “Antes de começarmos, quero te conhecer um pouco melhor. Em qual nível você está no violão?”. Opções curtas, ícones locais, progresso numerado e confirmação visual dão ritmo ao fluxo. Um toque seleciona e avança; voltar conserva a seleção.
- Os benefícios aparecem em mockups ilustrativos: aulas na Hotmart em computador e celular, conversa de suporte direto com o professor via WhatsApp e grupo de alunos. As conversas são ilustrações, não capturas nem depoimentos reais. A resposta das videoaulas inclui “Quero acessar as 27 aulas de violão”.
- A última etapa apresenta a ancoragem de R$ 147 por R$ 47; qualquer uma de suas respostas libera a oferta completa e as seções de vendas. Oferta de R$ 147 por R$ 47 por tempo limitado, sem cronômetro artificial. Valores e checkout ficam em config.js.
- O resumo final usa nível, dificuldade e objetivo. Quem prefere aulas ao vivo vê uma observação sobre o formato gravado; quem já toca músicas vê a indicação de que o curso cobre a base.
- Texto e lógica: quiz/quiz.js. Estilos: quiz/quiz.css. Acessibilidade: opções por teclado, foco no título a cada etapa, progresso acessível e respeito a movimento reduzido.
- Pixel do curso: 306814880237849. Eventos: PageView na abertura, QuizStart na primeira escolha, QuizComplete e ViewContent ao liberar a oferta, InitiateCheckout na compra. Rever respostas não duplica esses eventos. Respostas individuais não são enviadas ao pixel.
- /tracking.js preserva UTM, SCK, fbclid e outros parâmetros permitidos até o checkout. off e checkoutMode continuam intactos.
- /de-ferias-v2/ mantém seu encaminhamento para a página de vendas original. O quiz usa noindex, follow.
- Verificação: node de-ferias-com-o-violao/tools/qa-quiz.cjs. Usa Edge e playwright-core (do ambiente ou junto do executável Node). Confere entradas sem redirecionamento, sequência fixa com respostas diferentes, navegação por teclado, clique duplo, retorno, oferta, rastreamento e recursos locais em 1440×900, 390×844 e 320×640. Requisições da Meta são bloqueadas no teste.
- A remoção do salto elimina uma navegação extra; o efeito no connect rate precisa ser medido na campanha após a publicação.
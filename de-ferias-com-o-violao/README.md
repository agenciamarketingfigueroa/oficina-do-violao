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

- Links curtos para anúncios: `/de-ferias/` abre o quiz e `/de-ferias-v2/` abre a página de vendas. Ambos encaminham para a página original, conservando toda a query string (inclusive UTM, SCK e `fbclid`) e a âncora. O pixel dispara apenas na página de destino.

- Nova entrada pública: `/de-ferias-com-o-violao/quiz/`. Abre diretamente na primeira pergunta, sem login.
- Seis etapas: nível declarado, dificuldade, objetivo, aulas em vídeo, suporte do professor e grupo de alunos. É uma orientação de início baseada nas respostas, sem prova técnica ou promessa de prazo para aprender.
- O quiz abre com “Como está seu aprendizado no violão hoje?”, sem tela introdutória, barra de progresso ou contador de perguntas. Durante as perguntas, o cabeçalho fica oculto. O fundo escuro segue o site, com títulos, textos, ícones, opções e controles centralizados em uma coluna vertical. Os textos nas perguntas de dificuldade e objetivo se adaptam à resposta anterior.
- Ao escolher uma resposta, o cartão confirma a seleção e avança com transições suaves e entrada em sequência das opções. As transições respeitam a preferência por movimento reduzido; cliques repetidos durante a mudança não pulam etapas. Botões acessíveis por teclado e opção de voltar permitem revisar as escolhas. Aulas em vídeo, suporte e grupo ganham destaques visuais durante a conversa.
- Ao concluir, a oferta aparece primeiro, com preço de `config.js`, checkout e depois as seções de apresentação do curso. As respostas podem ser revistas sem repetir os eventos de conclusão na mesma visita.
- Textos e lógica do quiz: `quiz/quiz.js`. Oferta e seções: `quiz/index.html`. Estilo: `quiz/quiz.css`.
- Pixel do curso: `306814880237849`. Eventos: `PageView` na abertura, `QuizStart` na primeira escolha, `QuizComplete` e `ViewContent` ao liberar a oferta, `InitiateCheckout` no clique de compra. Nenhuma resposta individual é enviada como parâmetro do pixel.
- O `../../tracking.js` conserva UTM, SCK e os demais parâmetros permitidos durante a navegação na mesma aba. Os links mantêm `off` e `checkoutMode` do checkout. Exemplo: `/de-ferias-com-o-violao/quiz/?utm_source=instagram&utm_medium=paid_social&utm_campaign=ferias_quiz&utm_content=video_01&sck=ferias_quiz_video_01`.
- A variante de campanha usa `noindex, follow`; a página principal do curso continua sendo a entrada de busca orgânica.
- Verificação: `node de-ferias-com-o-violao/tools/qa-quiz.cjs`. Usa servidor local temporário e Edge/Playwright para conferir o fluxo em computador e celular, a oferta, os parâmetros de compra e a fila de eventos. As requisições da Meta são bloqueadas apenas no teste, para não gerar tráfego de QA no pixel.

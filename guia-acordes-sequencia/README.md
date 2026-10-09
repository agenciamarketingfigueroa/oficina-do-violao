# Guia de Bolso — Acordes em Sequência

Produto separado do Guia de Troca de Acordes. Este ensina **quais caminhos de acordes praticar e em qual ordem**. O outro detalha o movimento entre duas formas.

## Entrega

- Página de vendas: `/guia-acordes-sequencia/` (arquivo `index.html`).
- PDF final: `ebook/guia-acordes-sequencia.pdf` — 35 páginas A5.
- Fonte imprimível: `ebook/index.html` e `ebook/ebook.css`.
- 20 diagramas originais em `diagramas/`.
- Mockup feito com a capa e uma página interna renderizadas do PDF real.
- QR Code para o Ré Maior em `assets/re-maior-qr.png`.

## Publicação da oferta

Edite somente `config.js`:

```js
PRODUCT_PRICE: "R$…",
CHECKOUT_URL: "https://…",
WHATSAPP_URL: "https://chat.whatsapp.com/…",
```

O preço aparece na primeira dobra e na oferta final. Enquanto estiver vazio, a página mostra “Preço em definição”. Enquanto o checkout estiver vazio, o botão informa que o link está em preparação. O script repassa `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `sck`, `src` e `fbclid` ao checkout configurado. O projeto não insere IDs de Meta Pixel ou Google Analytics sem os IDs reais; a estrutura atual permite acrescentá-los depois.

O `_config.yml` exclui o PDF pago, o HTML fonte, os diagramas e as ferramentas da publicação no GitHub Pages. Para entregar o produto ao comprador, hospede o PDF na plataforma de checkout ou em armazenamento privado.

## Regerar arquivos

1. `python3 tools/build-ebook.py` cria o HTML e os diagramas, validando notas e baixos de cada forma.
2. Abra o Chrome com depuração local na porta 9223 e rode `node tools/print-pdf.mjs`.
3. Rode `swift tools/render-mockup-pages.swift` e `python3 tools/build-mockup.py` para atualizar o mockup.
4. Rode `python3 tools/build-og.py`; abra `assets/og-guia.svg` em 1200 × 630 no Chrome e exporte `assets/og-guia.png`.

## Alternativas de headline para teste

- A (atual): **Pare de treinar acordes aleatoriamente.**
- B: **Você sabe vários acordes. Mas sabe quais deveria praticar juntos?**
- C: **Aprender mais acordes não resolve se você não consegue conectá-los.**
- D: **Você não toca acordes isolados numa música. Pare de praticar como se tocasse.**

## Validação musical

O gerador verifica a afinação padrão E–A–D–G–B–E, as notas esperadas e o baixo de cada voicing. As formas com sétima, C#dim, C/E, G/B e D/F# foram comparadas com as definições de acordes e inversões de [Berklee PULSE](https://pulse.berklee.edu/chords/index.html), [Berklee, símbolos de acordes](https://archives.berklee.edu/_flysystem/fedora/2022-10/47215-Original%20File.pdf) e [Open Music Theory, tríades e acordes com sétima](https://openmusictheory.github.io/triads.html). A passagem C → C#dim → Dm usa o baixo cromático C–C#–D; os exercícios são exemplos originais e não reproduzem músicas comerciais.

# Guia de Bolso: Troca de Acordes

Microproduto digital da Oficina do Violão. A página pública fica em `index.html`, no endereço `https://oficinadoviolao.com.br/guia-troca-acordes/`. O material de entrega fica em `ebook/guia-troca-acordes.pdf`.

## Arquivos finais

- `ebook/index.html`: conteúdo final diagramado, em 28 páginas A5, pronto para impressão em PDF.
- `ebook/guia-troca-acordes.pdf`: arquivo digital final, com botão clicável e QR Code do Ré Maior.
- `diagramas/*.svg`: diagramas originais dos acordes C, G, D, Am, Em e Fmaj7.
- `mockups/guia-mockup.svg`: mockup usado na página de venda, montado com a capa e uma página interna reais do PDF.
- `index.html`: página de vendas responsiva, com SEO e imagem Open Graph.
- `assets/og-guia.png`: imagem Open Graph 1200 × 630.
- `assets/re-maior-qr.png`: QR Code gerado localmente para a última página do PDF.

## Onde alterar

| Item | Local |
| --- | --- |
| Preço e URL de checkout | `config.js` (`preco`, `checkoutUrl`) |
| Link do Ré Maior | `config.js` (`reMaiorUrl`) |
| Texto e CTAs da página | `index.html` |
| Conteúdo do eBook | `ebook/index.html` |
| Aparência do eBook | `ebook/ebook.css` |
| Aparência da página | `assets/page.css`, seguindo os tokens de `../styles.css` |
| Mockup e Open Graph | `mockups/guia-mockup.svg`, `assets/og-guia.svg` e `assets/og-guia.png` |

`checkoutUrl` está vazio porque nenhum endereço de pagamento foi fornecido. Os botões exibem uma mensagem informativa até esse campo receber a URL real. Não publique a página como oferta ativa antes de configurá-lo.

Os parâmetros `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `sck`, `src` e `fbclid` da página são repassados para o checkout. O endereço do Ré Maior não recebe parâmetros extras.

## Regerar os materiais

Execute a partir desta pasta:

```sh
python3 tools/build-diagrams.py
swift tools/generate-qr.swift assets/re-maior-qr.png
```

Depois, abra `ebook/index.html` no Chrome e use **Imprimir → Salvar como PDF**, tamanho A5, margens zero, gráficos de plano de fundo ativados e cabeçalhos/rodapés desativados. O CSS já fixa as quebras de página. Se preferir a linha de comando, o Chrome aceita `--headless --no-pdf-header-footer --print-to-pdf=ebook/guia-troca-acordes.pdf` com a URL local de `ebook/index.html`.

Para atualizar o mockup após uma mudança no PDF, execute:

```sh
swift tools/render-mockup-pages.swift
python3 tools/build-mockup.py
```

Ao mudar o WhatsApp, gere o QR novamente e exporte o PDF de novo. Ao mudar preço ou texto da capa, atualize também o mockup e a imagem Open Graph.

## Publicação

O `_config.yml` na raiz exclui `ebook/`, `diagramas/` e `tools/` do build padrão do GitHub Pages. Entregue o PDF pela plataforma de checkout, em uma área protegida. Se o repositório ou a publicação usarem outro processo, confirme que ele também não exponha o PDF pago. O arquivo de produção não deve ser usado como link público da landing page.

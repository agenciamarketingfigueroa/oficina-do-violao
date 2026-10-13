# 60 posts — Oficina do Violão

- `artes/`: 60 PNGs prontos para o feed, 1080 × 1350 pixels.
- `LEGENDAS-60-POSTS.md`: legenda, hashtags, texto alternativo e arquivo de cada post.
- `galeria.html`: prévia das artes, busca por assunto e botão para copiar legenda.
- `paineis/`: seis folhas de contato com dez artes por folha.
- `FONTES.md`: referências de apuração.
- `conteudo.json` e `gerar.cjs`: textos e gerador editáveis.

As artes usam Manrope e a identidade preto, laranja e off-white da Oficina. São composições tipográficas e diagramas, sem fotografias geradas. O conteúdo foi pensado para complementar os e-books com descobertas curtas, escuta e prática musical.

Para recriar: Node.js com `playwright-core` e Edge/Chrome. Rode `node gerar.cjs` nesta pasta; use `CHROME_PATH` para outro caminho de navegador. Os arquivos de fonte locais permitem a renderização sem conexão.

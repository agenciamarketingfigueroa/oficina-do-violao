# Hotmart — Oficina do Violão · versão 2

Criado em **10/10/2026**. Nova direção fotográfica em preto, laranja e tons de madeira, inspirada nos criativos aprovados. As fotografias foram geradas com a ferramenta integrada de imagens; a tipografia Manrope e as variações de formato foram compostas no gerador do projeto. As versões anteriores foram preservadas.

## Pastas

- `de-ferias-com-o-violao/`: curso em vídeo.
- `troca-de-acordes/`: e-book de troca de acordes.
- `acordes-em-sequencia/`: e-book de sequências.
- `violao-bem-cuidado/`: e-book de cuidados.
- `_area-de-membros/`: marca, fundo de acesso e banners coletivos.
- `whatsapp/`: imagem do grupo De Férias com o Violão em 1080 × 1080 e prévia circular.
- `fontes/`: fotografias, fontes, prompts, gerador e relatório de verificação.
- `galeria.html`: visualização de todos os arquivos finais.

## Onde usar cada arquivo

| Nome do arquivo | Medida | Destino |
| --- | --- | --- |
| imagem-produto | 600 × 600 | Imagem de cadastro do produto |
| avatar-vitrine | 600 × 600 | Avatar do produto na vitrine |
| banner-produto | 1920 × 640 | Banner interno do produto |
| banner-vitrine-desktop | 1920 × 800 | Vitrine no computador |
| banner-vitrine-mobile | 720 × 960 | Vitrine no celular |
| capa-vitrine-horizontal | 1920 × 1080 | Seção com capa horizontal |
| capa-vitrine-vertical | 720 × 1040 | Seção com capa vertical |
| capa-modulo | 1920 × 1080 | Módulo |
| capa-trilha | 720 × 1040 | Trilha |
| fundo-login | 2912 × 2160 | Fundo da tela de acesso |
| logo-cabecalho-tema-claro/escuro | 180 × 48 | Cabeçalho, conforme o tema |

As medidas de banners, login, módulo e trilha seguem a [documentação oficial da Hotmart](https://help.hotmart.com/en/article/8805423463181/how-to-customize-my-hotmart-members-area-), consultada em 10/10/2026. Quadrados, capas de seção e logos seguem as dimensões do pacote existente; os quadrados e as capas de seção são escolhas de produção, não limites universais publicados para esses campos. JPGs de produto ficam abaixo de 5 MB e fundos de acesso abaixo de 8 MB.

## Proteção contra cortes

- Textos dos banners horizontais ficam na faixa central de 58% da largura, com 18% de respiro vertical.
- Nas peças verticais, o conteúdo fica nos 66% centrais da largura, com 18% de margem vertical.
- Quadrados e avatares concentram os títulos nos 62% centrais. O avatar usa menos texto para funcionar pequeno.
- Os fundos de login são fotográficos e sem textos essenciais, pois o formulário e o recorte mudam conforme a tela.
- A imagem do WhatsApp foi composta com texto central e conferida em prévia circular, também em tamanho reduzido.

Essas margens são escolhas conservadoras de design, não uma área segura oficial garantida pela Hotmart. Envie a versão específica de desktop/celular e confira a prévia da plataforma antes de publicar. A galeria permite inspecionar cada arquivo no tamanho original.

## Banners coletivos

Há um par para os três e-books e outro par para os quatro produtos. Escolha a opção correspondente à sua vitrine. O fundo compartilhado é uma alternativa aos fundos individuais; uma área que reúne todos os produtos pode usar a opção neutra.

## Imagem do grupo

Use `whatsapp/DFV-grupo-whatsapp-1080x1080.png`. `PREVIA-CIRCULAR.jpg` serve apenas para conferir o recorte; não é o arquivo de upload.

## Recriar

O gerador está em `fontes/build-v2.cjs`, com fotografias e fontes locais. Requer Node.js, Playwright Core e Edge. Os prompts efetivamente usados estão em `fontes/geracoes.json`. A criação destes arquivos não altera a configuração publicada da Hotmart.

# Imagens para Hotmart — Oficina do Violão

Pacote preparado para os três e-books: **Troca de Acordes**, **Acordes em Sequência** e **Violão bem cuidado**. Todos os arquivos de upload estão em `exports/`; o código que recria as artes está em `build.cjs`.

As descrições principais e curtas dos quatro produtos atuais estão em [`DESCRICOES-PRODUTOS.md`](DESCRICOES-PRODUTOS.md).

## Curso De Férias com o Violão

O novo curso em vídeo tem uma coleção própria em `exports/de-ferias-com-o-violao/` e um pacote separado `de-ferias-com-o-violao-hotmart.zip`. São dez peças em JPG: imagem de produto, avatar, banner interno, banners de vitrine para computador e celular, capas horizontais e verticais, capa de módulo, capa de trilha e fundo de login. A pasta inclui também os dois logos de cabeçalho compartilhados e um `LEIA-ME.md` com as medidas de cada arquivo. Para recriar as peças, use `node de-ferias-com-o-violao/tools/build-images.cjs` na raiz do projeto.

O fundo de login do curso pode substituir o fundo compartilhado apenas quando fizer sentido para toda a área de membros; confira a prévia na Hotmart se ela também abriga os e-books.

## Medidas e destino

| Onde usar | Arquivo em cada pasta do e-book | Medida | Status da medida |
| --- | --- | --- | --- |
| Cadastro do produto / imagem principal | `imagem-produto-600x600.png` | 600 × 600 px | Tamanho ideal mostrado em uma [tela pública de cadastro da Hotmart](https://hotmart.com/pt-br/marketplace/produtos/https-hagsxd-ebook-teste-caols/P91136357D); a [ajuda de cadastro](https://suportehotmart.zendesk.com/hc/pt-br/articles/215828518-Como-cadastrar-meu-produto-na-Hotmart) confirma JPG, PNG ou GIF e até 5 MB, sem fixar uma dimensão. |
| Avatar da vitrine | `avatar-vitrine-600x600.png` | 600 × 600 px | Reuso da imagem quadrada. A documentação não publica medida específica para o avatar. |
| Banner da página interna do produto | `banner-produto-1920x640.png` | 1920 × 640 px | Recomendação oficial, proporção 3:1; JPG/PNG, até 5 MB. Abaixo de 960 px de largura o envio é bloqueado. |
| Carrossel da vitrine, computador | `banner-vitrine-desktop-1920x800.png` | 1920 × 800 px | Recomendação oficial. |
| Carrossel da vitrine, celular | `banner-vitrine-mobile-720x960.png` | 720 × 960 px | Recomendação oficial. |
| Capa horizontal em seção da vitrine | `capa-vitrine-horizontal-1920x1080.png` | 1920 × 1080 px | Escolha de design em 16:9; a Hotmart permite capa horizontal, mas não publica um tamanho único para esse campo. |
| Capa vertical em seção da vitrine | `capa-vitrine-vertical-720x1040.png` | 720 × 1040 px | Escolha de design; a Hotmart permite capa vertical, mas não publica um tamanho único para esse campo. |
| Capa de módulo, se usar módulos | `capa-modulo-1920x1080.png` | 1920 × 1080 px | Recomendação oficial, 16:9. Mesma arte da capa horizontal. |
| Capa de trilha, se usar trilhas | `capa-trilha-720x1040.png` | 720 × 1040 px | Recomendação oficial. Mesma arte da capa vertical. |

Essas medidas para banner, vitrine, módulo e trilha vêm do [guia de personalização da Área de Membros da Hotmart](https://help.hotmart.com/en/article/8805423463181/how-to-customize-my-hotmart-members-area-). A [ajuda da vitrine](https://help.hotmart.com/pt-br/article/13751605796365/como-configurar-a-vitrine-do-hotmart-club-) confirma a escolha entre capas horizontais e verticais.

## Imagens da área de membros

Na pasta `exports/_area-de-membros/`:

| Arquivo | Medida | Uso |
| --- | --- | --- |
| `logo-cabecalho-tema-claro-180x48.png` | 180 × 48 px | Cabeçalho no tema claro, PNG transparente. |
| `logo-cabecalho-tema-escuro-180x48.png` | 180 × 48 px | Cabeçalho no tema escuro, PNG transparente. |
| `fundo-login-2912x2160.png` | 2912 × 2160 px | Fundo da tela de acesso; JPG/PNG até 8 MB. |
| `banner-tres-ebooks-desktop-1920x800.png` | 1920 × 800 px | Opção de banner único com os três e-books. |
| `banner-tres-ebooks-mobile-720x960.png` | 720 × 960 px | Versão para celular do banner único. |

A Hotmart recomenda **até três mídias no carrossel da vitrine**. Há três pares de banners individuais, um para cada e-book. O par coletivo é uma alternativa caso você prefira um banner só. Os logos e o fundo de login são peças da área inteira, compartilhadas pelos produtos. As medidas e limites estão no [guia oficial de personalização](https://help.hotmart.com/en/article/8805423463181/how-to-customize-my-hotmart-members-area-).

## Ordem sugerida de upload

1. Em **Produtos > Meus produtos > Informações**, envie `imagem-produto-600x600.png` de cada e-book.
2. Em **Produtos > Área de membros > Personalização > Editar tema > Sua marca**, use o logo do tema correspondente.
3. Em **Personalização > Vitrine > Banner**, envie os três pares de banners individuais, ou o par coletivo.
4. Em **Personalização > Produto > Página do produto > Banner**, envie `banner-produto-1920x640.png` do e-book correspondente.
5. Na personalização da vitrine, escolha a capa horizontal ou vertical para cada seção. O avatar quadrado pode substituir a imagem de cadastro na vitrine; a [Hotmart explica essa prioridade](https://help.hotmart.com/en/article/8805423463181/how-to-customize-my-hotmart-members-area-).
6. Em **Tela de acesso**, use `fundo-login-2912x2160.png`.
7. Se organizar o conteúdo em módulos ou trilhas, há capas prontas com os nomes de upload correspondentes.

Use a prévia da Hotmart após o upload. A plataforma pode recortar banners e posicionar o formulário de login de forma diferente no desktop e no celular. Não há medida universal publicada para imagens de blocos do Hotmart Pages, pois elas dependem do template e do layout escolhido.

## Regenerar

O gerador usa Playwright Core com Microsoft Edge ou Chrome. Instale `playwright-core` em Node.js, se necessário, e defina `CHROME_PATH` caso o navegador não esteja no caminho padrão do script. Na raiz do projeto, rode `node hotmart-assets/build.cjs`. Ele captura a capa atual do e-book de cuidados e gera novamente todos os PNGs. As capas dos outros dois e-books vêm dos mockups existentes no projeto.

Os PNGs exportados ficam abaixo dos limites de tamanho publicados pela Hotmart. As imagens opcionais de módulo e trilha são cópias físicas das capas de vitrine equivalentes para facilitar a seleção durante o upload.

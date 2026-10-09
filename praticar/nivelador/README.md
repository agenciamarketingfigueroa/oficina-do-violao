# Teste nivelador da Oficina

Rota: `/praticar/nivelador/`. São 24 perguntas fixas e progressivas: três de conhecimento e três de prática relatada em cada etapa do caminho já apresentado no site (Tocar, Repertório, Autonomia, Musicalidade). O teste não grava áudio ou vídeo, não salva respostas e não usa backend.

- `data.js`: enunciados, alternativas, gabaritos e explicações. Cada pergunta tem um `id` único.
- `report-data.js`: cinco níveis, nomes das áreas e 24 exercícios com passos e metas observáveis.
- `model.js`: validação das respostas completas e cálculo da indicação.
- `nivelador.js`: navegação, preservação de respostas ao voltar, resultado e correção.
- `nivelador.css`: estilos específicos; a página também reutiliza estilos de Praticar e do Quiz.

## Critério de nível prático

Cada pergunta de prática tem quatro alternativas próprias, ordenadas de 0 (ainda não faz) a 3 (faz sozinho com constância naquela habilidade). Os textos descrevem comportamentos observáveis na tarefa, mantendo a mesma escala de pontuação. O nível considera somente prática relatada. Conhecimento é apresentado separadamente, com acertos de 0 a 12; erros e “Ainda não sei” geram revisão, sem rebaixar o nível prático.

- Iniciante: ao menos uma prática de Tocar abaixo de 2.
- Básico: todas de Tocar >= 2; ao menos uma de Repertório abaixo de 2.
- Intermediário: todas de Tocar e Repertório >= 2; ao menos uma de Autonomia abaixo de 2.
- Intermediário avançado: todas das três primeiras áreas >= 2; ao menos uma de Musicalidade abaixo de 3.
- Avançado: todas das três primeiras áreas >= 2 e todas de Musicalidade = 3.

A primeira base pendente define a indicação. Habilidades posteriores são reconhecidas nos pontos fortes e no panorama; perfis com lacunas iniciais e habilidades posteriores recebem uma explicação explícita. O escopo é acompanhamento ao violão, não todas as especialidades ou performance profissional.

## Relatório e treino

O relatório mostra o nível, a posição na escala, as respostas que determinaram a indicação, até três pontos fortes e todas as lacunas teóricas com correção e exercício expansível. O treino tem três exercícios distintos de cinco minutos: até duas lacunas práticas da área prioritária (menores respostas primeiro), a primeira lacuna teórica, e habilidades da área para completar os blocos. Sem lacunas teóricas, os três blocos são práticos. No perfil avançado, os exercícios refinam expressão e arranjo.

Cada bloco tem passos concretos, motivo e meta. As três metas práticas da área indicam o caminho para o próximo nível. Há sugestão de cinco sessões na semana, sem promessa de evolução em prazo fixo. Metas fora do treino de hoje também têm exercício acessível. Os links de apoio abrem o tema correspondente no Quiz/Flashcards com `?tema=id` em nova aba, preservando o relatório aberto. Temas inválidos mantêm a seleção normal da ferramenta.

Esta é uma rubrica inicial de orientação, não um instrumento padronizado ou uma certificação. As respostas práticas são autorrelato. Felipe pode ajustar perguntas e critérios após comparar resultados com alunos tocando. Os limiares são uma escolha do produto, não uma escala validada pelas referências abaixo. Mudanças na quantidade de perguntas exigem revisar o modelo, os textos do critério e os contadores da página.

## Referências de conteúdo

- Etapas: seção “Seu caminho” da página inicial da Oficina.
- [Tríades — musictheory.net](https://www.musictheory.net/lessons/40)
- [Ritmo, compasso e harmonia — University of Puget Sound](https://musictheory.pugetsound.edu/mt21c/)
- [Estrutura e afinação do violão — Yamaha](https://www.yamaha.com/en/musical_instrument_guide/acoustic_guitar/)
- [Prática de trocas de acordes — JustinGuitar](https://www.justinguitar.com/guitar-lessons/one-minute-changes-stage-5-bc-154)
- [Inversões e nota do baixo — musictheory.net](https://www.musictheory.net/lessons/42)

## Conferência

Verificar perfis com todas as respostas baixas, só teoria alta, só prática alta, limiares de cada etapa, todas altas e padrões com lacunas nas etapas iniciais. Na interface, conferir respostas obrigatórias, voltar e alterar, última pergunta, correção e reinício. Resultado incompleto deve ser recusado.

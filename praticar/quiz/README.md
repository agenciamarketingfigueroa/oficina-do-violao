# Quiz da Oficina

O quiz usa os cinco temas e os cards de [`../flashcards/decks.js`](../flashcards/decks.js). Há 20 perguntas por tema. A lógica de alternativas, embaralhamento, pontuação e revisão fica em [`quiz.js`](quiz.js); os estilos específicos ficam em [`quiz.css`](quiz.css).

Cada pergunta tem quatro alternativas: a resposta certa e três respostas diferentes do mesmo grupo. Os grupos impedem misturar letras, nomes de notas, cifras e definições em uma mesma pergunta. Para ampliar um tema, acrescente o card em `decks.js` conforme o [guia dos Flashcards](../flashcards/README.md).

O estado dura apenas enquanto a página permanece aberta. Nenhuma resposta é enviada ou salva.

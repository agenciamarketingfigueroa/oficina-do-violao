# Flashcards da Oficina

Os cinco baralhos e seus 100 cards ficam em [`decks.js`](decks.js). A interface e o fluxo de sessão ficam em [`flashcards.js`](flashcards.js); os estilos específicos ficam em [`flashcards.css`](flashcards.css). O Quiz da Oficina usa os mesmos cards como base para perguntas de múltipla escolha. Não há banco de dados nem armazenamento local. Recarregar a página reinicia a sessão.

## Adicionar um card

No baralho desejado em `decks.js`, acrescente um objeto ao fim de `cards`:

```js
{ front: "Pergunta curta", back: "Resposta curta e precisa" },
```

Mantenha cerca de 20 cards por baralho. Evite perguntas ambíguas e respostas longas. Em **Termos do Violão** e **Teoria Essencial**, inclua também `quizAnswer` com o nome curto do conceito; o quiz usa esse campo como resposta e mostra `back` como descrição.

## Criar um baralho

Acrescente um objeto ao array `window.FLASHCARD_DECKS` em `decks.js` com `id` único, `title`, `description` e `cards`. A tela de seleção e os contadores são gerados automaticamente.

O quiz gera três alternativas a partir das respostas do mesmo tipo no baralho. Ao adicionar um novo tema ao quiz, atualize `groupFor` e `instructionFor` em [`../quiz/quiz.js`](../quiz/quiz.js) para que as opções continuem coerentes.

## Referências de conteúdo

- [Passos, semitons e acidentes — musictheory.net](https://www.musictheory.net/lessons/20)
- [Tríades e acordes — musictheory.net](https://www.musictheory.net/lessons/40)
- [Notação e tablatura para violão — Berklee Online](https://online.berklee.edu/takenote/guitar-notation-basics/)
- [Uso do capotraste — Yamaha](https://hub.yamaha.com/guitars/g-how-to/the-art-of-using-a-capo/)
- [Partes do violão — Yamaha](https://www.yamaha.com/en/musical_instrument_guide/acoustic_guitar/mechanism/)

# Ritmo da Oficina

Rotas independentes: `/praticar/tap-tempo/` e `/praticar/metronomo/`. As páginas usam apenas um módulo comum para a escala de BPM, as fórmulas de compasso e o cálculo do Tap Tempo. Não há dependências, armazenamento ou servidor; o áudio é criado no navegador depois de uma interação com o usuário.

- `tempo.js`: fórmulas de compasso e cálculo do Tap Tempo.
- `../tap-tempo/tap-tempo.js`: interação do Tap Tempo por clique ou tecla.
- `../metronomo/metronomo.js`: controles, acentos e som com Web Audio.
- `ritmo.css`: estilos comuns dentro da identidade da área Praticar.

## Tap Tempo

Use o botão ou uma tecla quando o foco estiver fora de campos e controles. Teclas de navegação e atalhos do navegador ficam disponíveis. O BPM é a média dos intervalos entre até nove batidas recentes; depois de uma pausa maior que 2,5 segundos, uma nova sequência começa. A primeira batida ainda não produz um número. Resultados entre 30 e 300 BPM abrem a página independente do metrônomo com `?bpm=`.

## Metrônomo

Faixa de 30 a 300 BPM. Fórmulas: 2/4, 3/4, 4/4, 5/4, 6/8, 7/8. O BPM conta a unidade inferior da fórmula: semínima nos compassos sobre 4 e colcheia nos compassos sobre 8. Apenas o tempo 1 vem marcado por padrão em cada fórmula. A pessoa pode marcar ou desmarcar qualquer tempo; a chave geral desliga todos os acentos e deixa os cliques com som igual. As marcações feitas em cada fórmula são preservadas enquanto a página está aberta.

O metrônomo agenda cliques de osciladores curtos pelo relógio de `AudioContext`, com antecipação de 120 ms. Para ao ser pausado ou quando a página deixa de estar visível.

## Referências

- [TapTempo.io](https://taptempo.io/) — interação de marcação por clique ou tecla e estimativa de BPM pelos intervalos.
- [MDN: relógio do AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/currentTime)
- [MDN: práticas de início de áudio após interação](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices)

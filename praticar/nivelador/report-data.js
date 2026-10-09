window.PLACEMENT_REPORT = {
  levels: [
    { title: "Iniciante", description: "Você está construindo a base para tocar: fazer os acordes soarem, trocar sem perder o pulso e completar uma música simples." },
    { title: "Básico", description: "Você já relata tocar músicas simples sozinho. Agora precisa ampliar o repertório com pestanas, dedilhados e outras levadas." },
    { title: "Intermediário", description: "Você já relata tocar músicas com pestanas e dedilhados. O próximo passo é aprender, adaptar e corrigir músicas com mais autonomia." },
    { title: "Intermediário avançado", description: "Você já relata aprender músicas e adaptar o acompanhamento sozinho. Agora o foco é dar consistência à dinâmica, à escuta e às variações do arranjo." },
    { title: "Avançado", description: "Você relata autonomia nas bases e constância ao criar um acompanhamento expressivo. Seu treino agora pode aprofundar arranjos e escolhas musicais." },
  ],
  domains: ["Acordes e ritmo", "Pestanas e repertório", "Autonomia musical", "Expressão e arranjo"],
  drills: {
    "tocar-p1": {
      title: "Faça cada corda soar nos acordes abertos",
      steps: ["Comece com Em: pressione as cordas 5 e 4 na casa 2, deixando as demais soltas. Toque uma corda por vez e ajuste os dedos até ouvir todas com clareza.", "Depois experimente Am: 2ª corda na casa 1, cordas 3 e 4 na casa 2. Para C: 2ª na casa 1, 4ª na casa 2 e 5ª na casa 3. Em Am e C, toque da 5ª corda para baixo, com a 3ª solta apenas no C. Confira o som de cada corda; se necessário, estude um acorde por sessão."],
      goal: "Montar Em, Am e C sem ajuda e ouvir com clareza todas as cordas previstas em cada acorde.",
    },
    "tocar-p2": {
      title: "Troque Em e Am sem interromper a contagem",
      steps: ["Conte 1, 2, 3, 4 devagar e toque uma vez em cada número. Faça quatro tempos de Em e quatro de Am.", "Repita oito compassos. Se parar na troca, diminua a velocidade. Um metrônomo a 60 bpm pode ser um ponto de partida; ajuste ao seu conforto."],
      goal: "Completar oito compassos de Em e Am, com som claro e sem interromper o pulso.",
    },
    "tocar-p3": {
      title: "Leve uma música simples até o fim",
      steps: ["Escolha uma música conhecida com dois ou três acordes que você já monta. Anote a ordem das partes e isole a troca mais difícil.", "Pratique essa troca devagar e toque a música inteira com uma batida simples. Continue mesmo depois de um pequeno erro."],
      goal: "Tocar uma música simples inteira, sozinho, mantendo uma batida regular nas mudanças de parte.",
    },
    "repertorio-p1": {
      title: "Coloque a pestana dentro de uma sequência",
      steps: ["Experimente F: indicador sobre as seis cordas na casa 1, médio na 3ª corda/casa 2, anelar na 5ª/casa 3 e mínimo na 4ª/casa 3. Confira cada corda; solte a mão entre tentativas e não force se houver desconforto.", "Alterne C e F, com quatro tempos por acorde, lentamente. Pratique primeiro a montagem; quando o som estiver claro, tente oito compassos seguidos e aplique a troca em uma música."],
      goal: "Usar a pestana em oito compassos de uma música, com notas claras e sem parar a levada.",
    },
    "repertorio-p2": {
      title: "Mantenha o dedilhado durante a troca",
      steps: ["Em Am, toque as cordas 5, 3, 2 e 1: polegar, indicador, médio e anelar. Conte um número por nota: 1, 2, 3, 4.", "Faça quatro ciclos em Am e quatro em C. Repita sem mudar a ordem das cordas nem interromper a contagem."],
      goal: "Dedilhar oito compassos alternando Am e C, sem perder a sequência dos dedos ou o pulso.",
    },
    "repertorio-p3": {
      title: "Amplie as músicas que você consegue terminar",
      steps: ["Liste três músicas conhecidas. Distribua entre elas pelo menos dois padrões de acompanhamento, como uma batida e um dedilhado.", "A cada sessão, escolha uma música e pratique a passagem mais difícil. Depois toque do início ao fim; use sessões extras se a música ultrapassar o tempo do bloco."],
      goal: "Tocar três músicas completas sozinho, usando pelo menos dois padrões de acompanhamento entre elas.",
    },
    "autonomia-p1": {
      title: "Aprenda um trecho pela cifra e pela escuta",
      steps: ["Escolha uma música nova com acordes conhecidos. Ouça a gravação e marque na cifra onde começam verso e refrão.", "Aprenda quatro compassos sem tutorial. Compare com a gravação, corrija a duração dos acordes e acrescente o trecho seguinte nas próximas sessões."],
      goal: "Aprender uma música simples inteira pela cifra e gravação, identificando sozinho a ordem das partes e as trocas.",
    },
    "autonomia-p2": {
      title: "Mude o tom e confira com a voz",
      steps: ["Toque C–F–G com quatro tempos por acorde. Suba todos os acordes um tom: D–G–A. Mantenha o mesmo ritmo nas duas versões.", "Escolha um trecho cantado conhecido. Experimente dois tons, com novos acordes ou capotraste, e escolha o mais confortável para a voz."],
      goal: "Adaptar um trecho simples para uma voz, mudando todos os acordes de forma coerente e mantendo o acompanhamento.",
    },
    "autonomia-p3": {
      title: "Grave, localize e corrija uma passagem",
      steps: ["Grave 30 segundos de um acompanhamento. Ouça e localize o primeiro ponto em que uma troca ou o pulso sai do lugar.", "Repita os dois compassos ao redor desse ponto em velocidade menor. Grave de novo e compare a passagem nas duas versões."],
      goal: "Identificar uma falha sem ajuda, praticar o trecho e ouvir uma melhora concreta na segunda gravação.",
    },
    "musicalidade-p1": {
      title: "Crie contraste sem mudar a velocidade",
      steps: ["Toque quatro compassos suavemente e quatro com mais intensidade, usando os mesmos acordes e o mesmo pulso.", "Grave duas repetições. Confira se o contraste é audível e se você não acelera ao tocar mais forte."],
      goal: "Repetir o contraste em três sessões, com mudança clara de intensidade e andamento estável.",
    },
    "musicalidade-p2": {
      title: "Deixe espaço para a melodia",
      steps: ["Cante ou cantarole uma música conhecida enquanto acompanha. Comece com poucas notas: um baixo no tempo 1 e um acorde no tempo 3 de cada compasso de quatro tempos.", "Grave um trecho. Acrescente notas apenas nos espaços entre as frases e compare se a voz continua clara."],
      goal: "Em três sessões, acompanhar uma parte cantada sem encobrir a melodia nem perder o pulso.",
    },
    "musicalidade-p3": {
      title: "Crie uma variação que ajude a música",
      steps: ["Toque uma sequência conhecida de quatro compassos. Na repetição, acrescente uma única variação: um baixo, uma inversão ou uma frase curta.", "Grave as versões simples e variada. Verifique se a variação termina antes da próxima troca e preserva a estrutura."],
      goal: "Em três sessões, repetir uma variação intencional dentro da música, mantendo a forma e o ritmo.",
    },
    "tocar-k1": { title: "Leia cifras maiores e menores", steps: ["Leia A, C e E: Lá, Dó e Mi maiores. Depois leia Am, Cm e Em: o m indica menor.", "Misture as seis cifras em um papel e diga o nome sem consultar. Toque Em e Am para ligar a leitura ao instrumento."], goal: "Nomear as seis cifras corretamente em duas rodadas.", deck: "maior-ou-menor" },
    "tocar-k2": { title: "Sinta a diferença entre pulso e ritmo", steps: ["Bata o pé 16 vezes em intervalos regulares. Esse é o pulso de referência.", "Mantenha o pé e toque cordas abafadas primeiro em cada batida, depois apenas em batidas alternadas. O desenho muda; a referência continua regular."], goal: "Manter 16 pulsações regulares mesmo ao mudar as batidas da mão.", deck: "teoria-essencial" },
    "tocar-k3": { title: "Localize as cordas na afinação padrão", steps: ["Da corda mais grossa para a mais fina, leia: Mi, Lá, Ré, Sol, Si, Mi — E, A, D, G, B, E.", "Toque cada corda solta e confira com um afinador. Depois aponte e nomeie as cordas sem olhar a sequência."], goal: "Identificar as seis cordas soltas sem consulta, incluindo os dois Mis." },
    "repertorio-k1": { title: "Entenda a pestana na mão", steps: ["Use o indicador para pressionar juntas a 1ª e a 2ª cordas na primeira casa. Toque uma por vez e solte a mão entre tentativas.", "Observe: um único dedo está prendendo duas cordas. Compare com montar um acorde usando dedos separados."], goal: "Explicar a pestana e demonstrar um dedo pressionando duas cordas.", deck: "termos-do-violao" },
    "repertorio-k2": { title: "Ouça um acorde virar arpejo", steps: ["Monte Am e toque as cordas juntas, da 5ª para baixo.", "Sem mudar o acorde, toque as cordas 5, 3, 2 e 1 uma após a outra. Compare o acorde em bloco com suas notas em sequência."], goal: "Demonstrar e explicar a diferença entre tocar em bloco e arpejar.", deck: "termos-do-violao" },
    "repertorio-k3": { title: "Conte um compasso de três tempos", steps: ["Conte 1, 2, 3 em velocidade regular, dando mais apoio ao 1. Repita quatro vezes.", "Toque as cordas abafadas uma vez por número. Cada grupo de três representa um compasso de 3/4 com uma semínima por tempo."], goal: "Tocar quatro compassos de 3/4 e reconhecer o início de cada grupo de três.", deck: "teoria-essencial" },
    "autonomia-k1": { title: "Encontre as notas do acorde de Dó", steps: ["Monte C. Toque a 5ª corda na casa 3 (Dó), a 4ª na casa 2 (Mi) e a 3ª solta (Sol).", "Diga os nomes enquanto toca: Dó, Mi, Sol. São fundamental, terça maior e quinta justa da tríade de Dó maior."], goal: "Nomear e localizar Dó, Mi e Sol no acorde sem consultar." },
    "autonomia-k2": { title: "Transponha todos os acordes da sequência", steps: ["Escreva C–F–G. Suba cada acorde um tom: C vira D, F vira G e G vira A.", "Toque as duas sequências com a mesma duração por acorde. Confira que nenhum acorde ficou no tom anterior."], goal: "Escrever e tocar C–F–G e D–G–A, explicando que todos subiram um tom." },
    "autonomia-k3": { title: "Ouça o baixo indicado depois da barra", steps: ["Monte C e toque da 5ª corda para baixo: o baixo é Dó.", "Mantenha a posição e toque somente da 4ª corda para baixo, sem tocar a 5ª e a 6ª. O baixo agora é Mi: C/E."], goal: "Tocar C e C/E e identificar a nota mais grave de cada versão." },
    "musicalidade-k1": { title: "Separe intensidade de velocidade", steps: ["Toque quatro compassos do mesmo acorde suavemente, contando os tempos.", "Repita mais forte, mantendo a mesma contagem. Dinâmica é a intensidade; andamento é a velocidade do pulso."], goal: "Mudar a intensidade sem mudar a velocidade e explicar essa diferença." },
    "musicalidade-k2": { title: "Experimente acentos fora da batida", steps: ["Conte devagar: 1 e 2 e 3 e 4 e. Mantenha o pé nos números.", "Com as cordas abafadas, toque apenas nos ‘e’. Ouça o deslocamento do acento em relação ao pé; essa experiência ajuda a perceber a base da síncope."], goal: "Manter o pulso do pé por quatro compassos enquanto acentua os ‘e’." },
    "musicalidade-k3": { title: "Mude o timbre da mesma nota", steps: ["Toque a 1ª corda solta perto do cavalete e depois perto da boca do violão, com intensidade semelhante.", "Compare a cor do som sem mudar a nota. Descreva o que ouviu: mais brilhante, mais fechado ou outra diferença perceptível."], goal: "Demonstrar duas sonoridades da mesma nota e explicar o que é timbre." },
  },
};

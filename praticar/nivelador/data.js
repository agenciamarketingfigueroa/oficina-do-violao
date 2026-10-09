window.PLACEMENT_DATA = {
  stages: [
    {
      id: "tocar", title: "Tocar", description: "Acordes básicos, trocas e suas primeiras músicas completas.",
      nextStep: "Escolha uma música com dois ou três acordes e pratique as trocas devagar, mantendo um pulso confortável.",
      exercise: "Toque uma sequência de dois acordes por um minuto. Observe se consegue trocar sem interromper o pulso e se as notas saem claras.",
      questions: [
        { id: "tocar-p1", type: "practice", prompt: "Ao montar acordes abertos como Em, Am e C, como as cordas soam?", focus: "Clareza dos acordes abertos", options: [
          "Ainda não sei montar esses acordes.",
          "Monto com ajuda ou várias cordas ficam abafadas.",
          "Monto sozinho, mas algumas cordas ainda falham.",
          "Monto sozinho e faço as cordas previstas soarem com clareza em uma música.",
        ] },
        { id: "tocar-p2", type: "practice", prompt: "Como você troca entre dois acordes abertos com uma batida lenta?", focus: "Trocas sem parar o pulso", options: [
          "Ainda não consigo trocar entre dois acordes.",
          "Troco com ajuda ou preciso parar a batida a cada mudança.",
          "Troco sozinho sem parar, mas ainda oscilo um pouco no ritmo.",
          "Troco sozinho durante uma música, mantendo a batida regular.",
        ] },
        { id: "tocar-p3", type: "practice", prompt: "Até onde você consegue tocar uma música simples?", focus: "Primeira música completa", options: [
          "Ainda não consigo tocar um trecho de música.",
          "Toco trechos, mas preciso parar ou de ajuda para chegar ao fim.",
          "Toco uma música inteira sozinho, embora ainda haja oscilações.",
          "Toco uma música inteira sozinho e com constância, mesmo devagar.",
        ] },
        { id: "tocar-k1", type: "knowledge", prompt: "Como se lê a cifra Am?", options: ["Lá menor", "Lá maior", "Mi menor", "Dó maior"], answer: 0, explanation: "A representa Lá; o m indica que o acorde é menor.", focus: "Leitura das cifras maiores e menores" },
        { id: "tocar-k2", type: "knowledge", prompt: "O que é o pulso de uma música?", options: ["A força usada para apertar as cordas", "A batida regular que serve de referência para o tempo", "A quantidade de acordes da música", "A altura da nota mais aguda"], answer: 1, explanation: "O pulso é a referência regular sobre a qual organizamos o ritmo.", focus: "Pulso e ritmo" },
        { id: "tocar-k3", type: "knowledge", prompt: "Na afinação padrão do violão, qual é a nota da primeira corda solta, a mais fina?", options: ["Lá", "Ré", "Mi", "Sol"], answer: 2, explanation: "Na afinação padrão, a primeira corda é Mi agudo; a sexta é Mi grave.", focus: "Afinação padrão" },
      ],
    },
    {
      id: "repertorio", title: "Repertório", description: "Pestanas, dedilhados e variedade nas músicas que você toca.",
      nextStep: "Escolha uma música que acrescente uma habilidade ao que você já toca: uma pestana, um dedilhado ou uma nova levada.",
      exercise: "Toque um trecho com uma pestana e outro com dedilhado. Veja se as notas soam e se você consegue manter o ritmo nas trocas.",
      questions: [
        { id: "repertorio-p1", type: "practice", prompt: "O que acontece quando aparece uma pestana, como F ou Bm, em uma música?", focus: "Pestanas dentro da música", options: [
          "Ainda não consigo montar uma pestana.",
          "Monto com ajuda ou paro a levada para conseguir fazê-la.",
          "Uso a pestana sozinho sem parar a levada, mas alguma nota às vezes sai abafada.",
          "Uso a pestana sozinho em uma música, com notas claras e levada constante.",
        ] },
        { id: "repertorio-p2", type: "practice", prompt: "Ao trocar acordes durante um dedilhado, o que você consegue manter?", focus: "Dedilhado com troca de acordes", options: [
          "Ainda não consigo fazer um dedilhado.",
          "Dedilho um acorde, mas paro ou preciso de ajuda quando troco.",
          "Dedilho e troco sozinho sem parar, mas algumas notas ainda falham.",
          "Dedilho e troco sozinho em uma música, mantendo a ordem e o pulso.",
        ] },
        { id: "repertorio-p3", type: "practice", prompt: "Quantas músicas completas você toca usando padrões diferentes de acompanhamento?", focus: "Variedade de repertório e levadas", options: [
          "Ainda não toco uma música inteira.",
          "Toco uma ou duas músicas, ou só uso a mesma levada em todas.",
          "Toco pelo menos três músicas sozinho com mais de um padrão, mas oscilo em algumas passagens.",
          "Toco pelo menos três músicas sozinho, com mais de um padrão e constância nas passagens.",
        ] },
        { id: "repertorio-k1", type: "knowledge", prompt: "O que caracteriza a técnica de pestana?", options: ["Tocar todas as cordas soltas", "Usar um dedo para pressionar mais de uma corda", "Tocar sempre com a palheta", "Afinar todas as cordas na mesma nota"], answer: 1, explanation: "Na pestana, um mesmo dedo pressiona várias cordas.", focus: "Função da pestana" },
        { id: "repertorio-k2", type: "knowledge", prompt: "O que acontece quando você toca um arpejo?", options: ["Interrompe o som das cordas", "Toca apenas notas fora do acorde", "Toca todas as notas ao mesmo tempo", "Toca as notas de um acorde uma após a outra"], answer: 3, explanation: "Um arpejo apresenta as notas do acorde em sequência.", focus: "Arpejos e dedilhados" },
        { id: "repertorio-k3", type: "knowledge", prompt: "Em um compasso simples de 3/4, quantos tempos de semínima há por compasso?", options: ["Três", "Quatro", "Dois", "Seis"], answer: 0, explanation: "O 3 indica três tempos; o 4 indica a semínima como unidade de tempo.", focus: "Contagem de compassos" },
      ],
    },
    {
      id: "autonomia", title: "Autonomia", description: "Cifras, tom e harmonia para aprender com menos dependência.",
      nextStep: "Aprenda uma música nova pela cifra, confira a estrutura ouvindo a gravação e experimente uma tonalidade diferente.",
      exercise: "Toque C–F–G e depois D–G–A. Confira se percebe a mesma relação entre os acordes e consegue manter o acompanhamento.",
      questions: [
        { id: "autonomia-p1", type: "practice", prompt: "Como você aprende uma música nova com a cifra e a gravação?", focus: "Aprender pela cifra e pela escuta", options: [
          "Ainda não consigo usar a cifra e a gravação para aprender um trecho.",
          "Preciso de um tutorial passo a passo ou de ajuda para montar a música.",
          "Aprendo sozinho pela cifra e pela gravação, mas ainda preciso rever algumas partes.",
          "Aprendo uma música nova sozinho pela cifra e pela gravação, reconhecendo as partes e as trocas.",
        ] },
        { id: "autonomia-p2", type: "practice", prompt: "Se uma música fica alta ou baixa para a voz, o que você faz?", focus: "Transposição para uma voz", options: [
          "Ainda não sei mudar o tom de uma música.",
          "Tento mudar o tom, mas preciso de ajuda para escolher os acordes ou usar o capotraste.",
          "Adapto o tom sozinho, com novos acordes ou capotraste, mas ainda preciso conferir algumas trocas.",
          "Adapto o tom sozinho para a voz e acompanho a música inteira no novo tom.",
        ] },
        { id: "autonomia-p3", type: "practice", prompt: "Quando seu acompanhamento sai do lugar, como você corrige?", focus: "Escuta e correção do próprio acompanhamento", options: [
          "Ainda não percebo onde meu acompanhamento se perde.",
          "Percebo que algo mudou, mas preciso de ajuda para localizar ou corrigir o trecho.",
          "Localizo e corrijo o trecho sozinho ao comparar com a gravação, embora precise de algumas tentativas.",
          "Localizo e corrijo o trecho sozinho, mantendo o restante da música estável.",
        ] },
        { id: "autonomia-k1", type: "knowledge", prompt: "Quais notas formam a tríade de Dó maior?", options: ["Dó, Ré e Mi", "Dó, Mi bemol e Sol", "Dó, Mi e Sol", "Dó, Fá e Lá"], answer: 2, explanation: "A tríade maior de Dó tem fundamental Dó, terça maior Mi e quinta justa Sol.", focus: "Notas dos acordes" },
        { id: "autonomia-k2", type: "knowledge", prompt: "Ao subir a sequência C–F–G em um tom, qual sequência resulta?", options: ["D–G–A", "D–F–G", "B–E–F#", "C–G–Am"], answer: 0, explanation: "Cada acorde sobe um tom: C vira D, F vira G e G vira A.", focus: "Transposição de sequências" },
        { id: "autonomia-k3", type: "knowledge", prompt: "Na cifra C/E, o que a letra depois da barra indica?", options: ["O próximo acorde", "A velocidade da música", "A nota mais aguda obrigatória", "A nota Mi no baixo do acorde"], answer: 3, explanation: "A barra informa o baixo: C/E é Dó maior com Mi como nota mais grave.", focus: "Cifras com baixo indicado" },
      ],
    },
    {
      id: "musicalidade", title: "Musicalidade", description: "Dinâmica, arranjos e intenção no seu jeito de tocar.",
      nextStep: "Escolha uma música conhecida e crie contrastes entre as partes usando intensidade, articulação e quantidade de notas.",
      exercise: "Toque o mesmo trecho duas vezes: primeiro com suavidade, depois com mais intensidade, mantendo o andamento. Grave para comparar a intenção e a constância.",
      questions: [
        { id: "musicalidade-p1", type: "practice", prompt: "O que acontece com o tempo quando você toca mais forte ou mais suave?", focus: "Dinâmica com andamento estável", options: [
          "Ainda não vario a intensidade de propósito.",
          "Vario a intensidade, mas quase sempre acelero ou desacelero.",
          "Vario a intensidade sozinho sem mudar o tempo na maior parte do trecho.",
          "Vario a intensidade de propósito durante uma música inteira, mantendo o tempo estável.",
        ] },
        { id: "musicalidade-p2", type: "practice", prompt: "Como você ajusta o violão quando acompanha uma voz ou outro instrumento?", focus: "Escuta e espaço no acompanhamento", options: [
          "Ainda não acompanho uma voz ou outro instrumento.",
          "Acompanho, mas preciso de orientação para deixar espaço à outra parte.",
          "Ajusto sozinho a quantidade ou intensidade das notas, mas às vezes cubro a outra parte.",
          "Ajusto sozinho o acompanhamento durante uma música inteira, deixando a outra parte clara.",
        ] },
        { id: "musicalidade-p3", type: "practice", prompt: "Como você usa baixos, inversões ou pequenas frases no acompanhamento?", focus: "Variações e arranjo com intenção", options: [
          "Ainda não uso essas variações.",
          "Experimento variações, mas perco a estrutura ou o ritmo sem ajuda.",
          "Crio variações sozinho, mas às vezes elas atrapalham uma troca ou a levada.",
          "Crio variações com intenção durante uma música inteira, mantendo estrutura e ritmo.",
        ] },
        { id: "musicalidade-k1", type: "knowledge", prompt: "Qual mudança trabalha a dinâmica sem alterar o andamento?", options: ["Aumentar a velocidade do pulso", "Tocar mais forte ou mais suave, mantendo o pulso", "Trocar a afinação das cordas", "Subir a música em um tom"], answer: 1, explanation: "Dinâmica trata da intensidade. Andamento é a velocidade do pulso.", focus: "Dinâmica e andamento" },
        { id: "musicalidade-k2", type: "knowledge", prompt: "O que caracteriza uma síncope?", options: ["Tocar sempre mais devagar", "Usar somente cordas soltas", "Deslocar um acento esperado para uma parte fraca do tempo ou compasso", "Tocar todas as notas com a mesma duração"], answer: 2, explanation: "A síncope desloca a ênfase em relação aos acentos esperados do pulso.", focus: "Acentuação e síncope" },
        { id: "musicalidade-k3", type: "knowledge", prompt: "Dois instrumentos tocam a mesma nota com intensidade semelhante, mas soam diferentes. Qual característica explica essa diferença?", options: ["Timbre", "Andamento", "Compasso", "Tonalidade"], answer: 0, explanation: "O timbre é a característica sonora que diferencia instrumentos e formas de produzir um som.", focus: "Timbre e intenção sonora" },
      ],
    },
  ],
};

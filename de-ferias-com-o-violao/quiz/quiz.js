(() => {
  const questions = [
    {
      id: "nivel", label: "Seu ponto de partida", icon: "music",
      title: "Como está seu aprendizado no violão hoje?",
      help: "Todo começo vale. Escolha a opção que tem mais a ver com você.",
      options: [
        ["zero", "Vou começar do zero", "spark", "Ainda não sei tocar nada."],
        ["primeiro-contato", "Já dei os primeiros passos", "route", "Tentei, mas acabei travando no começo."],
        ["acordes", "Já conheço alguns acordes", "music", "Quero conseguir tocar uma música inteira."],
      ],
    },
    {
      id: "dificuldade", label: "Vamos destravar esse começo", icon: "compass", title: "O que mais te trava hoje?",
      help: "Pense no que faz você deixar o violão de lado.",
      options: [
        ["direcao", "Não sei o que aprender primeiro", "compass"],
        ["dedos", "Meus dedos não acertam e o som não sai", "music"],
        ["rotina", "Começo animado e depois desisto", "repeat"],
        ["ajuda", "Fico com dúvidas e não tenho ajuda", "chat"],
      ],
    },
    {
      id: "objetivo", label: "Agora, imagine a cena", icon: "spark", title: "O que você quer conseguir?",
      help: "Imagine seu primeiro momento tocando.",
      options: [
        ["musica", "Tocar minha primeira música até o final", "music"],
        ["cantar", "Tocar e cantar uma música de que gosto", "mic"],
        ["lazer", "Ter um momento meu com a música", "heart"],
      ],
    },
    {
      id: "video", label: "Um caminho que cabe na sua vida", icon: "play", title: "E se você pudesse pausar a aula e tentar de novo?",
      help: "De Férias com o Violão tem 27 aulas gravadas em vídeo. Você segue a sequência e revê os movimentos no seu ritmo.",
      feature: "Dê o play no seu começo", caption: "Assista. Pause. Pratique. Repita.",
      options: [
        ["sim", "Sim, quero acompanhar passo a passo", "play"],
        ["repetir", "Seria ótimo poder repetir com calma", "repeat"],
        ["ao-vivo", "Eu prefiro aulas ao vivo", "users"],
      ],
    },
    {
      id: "suporte", label: "Você não precisa adivinhar tudo", icon: "chat", title: "Travou. Poder perguntar ao professor ajudaria?",
      help: "O curso inclui suporte do professor para tirar as dúvidas que surgirem durante o estudo.",
      feature: "Uma dúvida pode virar um próximo passo", caption: "Suporte do professor durante o estudo.",
      options: [
        ["sim", "Muito! Ter a quem perguntar me ajudaria", "chat"],
        ["quando-precisar", "Quero pedir ajuda quando precisar", "spark"],
        ["sozinho", "Prefiro estudar com autonomia", "compass"],
      ],
    },
    {
      id: "grupo", label: "Tem mais gente nesse começo", icon: "users", title: "E ter com quem dividir o primeiro “consegui!”?",
      help: "Você também participa de um grupo de alunos para trocar experiências e dividir suas conquistas.",
      feature: "Seu começo pode ser compartilhado", caption: "Um grupo de alunos para trocar experiências.",
      options: [
        ["participar", "Eu ia gostar de trocar experiências", "users"],
        ["acompanhar", "Gosto de acompanhar, mesmo falando pouco", "heart"],
        ["individual", "Prefiro focar na minha prática individual", "music"],
      ],
    },
  ];

  // Ícones locais: nenhum serviço ou biblioteca externa durante o quiz.
  const iconPaths = {
    music: '<path d="M9 18V5l11-2v13M9 8l11-2"/><ellipse cx="6" cy="18" rx="3" ry="2"/><ellipse cx="17" cy="16" rx="3" ry="2"/>',
    spark: '<path d="m12 3 2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6L12 3Z"/>',
    route: '<circle cx="5" cy="18" r="2"/><circle cx="19" cy="6" r="2"/><path d="M7 18h9a4 4 0 0 0 0-8H8a3 3 0 0 1 0-6h5"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6 6-2Z"/>',
    repeat: '<path d="M4 10a8 8 0 0 1 13-5l3 3M20 3v5h-5M20 14a8 8 0 0 1-13 5l-3-3M4 21v-5h5"/>',
    chat: '<path d="M21 11a9 9 0 0 1-9 9H4l-2 2V11a9 9 0 0 1 19 0ZM7 10h10M7 14h6"/>',
    mic: '<rect x="9" y="2" width="6" height="13" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2M12 19v3M8 22h8"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
    play: '<rect x="2" y="4" width="20" height="16" rx="4"/><path d="m10 8 6 4-6 4V8Z"/>',
    users: '<circle cx="9" cy="8" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 5a3 3 0 0 1 0 6M18 15a5 5 0 0 1 3 5"/>',
  };
  function icon(name) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${iconPaths[name] || iconPaths.music}</svg>`;
  }

  function helpFor(question) {
    if (question.id === "dificuldade") return {
      zero: "Começar do zero faz parte. O que mais dificulta dar esse primeiro passo?",
      "primeiro-contato": "Você já tentou. Vamos entender o que ficou no caminho daquela vez.",
      acordes: "Você já tem alguns acordes nas mãos. O que falta para eles virarem música?",
    }[answers.nivel] || question.help;
    if (question.id === "objetivo") return {
      direcao: "Vamos dar uma direção a essa vontade. Imagine você tocando: qual seria a sua conquista?",
      dedos: "Os movimentos ainda estão se encaixando. Quando eles saírem, o que você quer tocar?",
      rotina: "Ter algo que você quer tocar pode dar sentido à prática. O que faria você pegar o violão?",
      ajuda: "Guardar as dúvidas é frustrante. Com ajuda para seguir, o que você gostaria de conseguir?",
    }[answers.dificuldade] || question.help;
    return question.help;
  }

  const stage = document.querySelector("[data-quiz-form]");
  const panel = document.querySelector("[data-quiz]");
  const offer = document.querySelector("[data-offer]");
  const title = document.querySelector("[data-question-title]");
  const options = document.querySelector("[data-options]");
  const back = document.querySelector("[data-back]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const answers = {};
  let step = 0;
  let started = false;
  let completed = false;
  let checkoutTracked = false;
  let busy = false;

  // Somente eventos do funil são enviados ao pixel, sem o conteúdo das respostas.
  function pixel(method, event, params = {}) {
    if (typeof window.fbq === "function") {
      window.fbq(method, event, { content_name: "De Férias com o Violão", ...params });
    }
  }

  function render(focus = false) {
    const question = questions[step];
    panel.dataset.question = question.id;
    document.querySelector("[data-topic]").textContent = question.label;
    document.querySelector("[data-topic-icon]").innerHTML = icon(question.icon);
    title.replaceChildren();
    if (question.lead) {
      const lead = document.createElement("span");
      lead.className = "quiz-question-lead";
      lead.textContent = question.lead;
      title.append(lead, " ");
    }
    title.append(question.title);
    document.querySelector("[data-question-help]").textContent = helpFor(question);
    const feature = document.querySelector("[data-feature]");
    feature.hidden = !question.feature;
    if (question.feature) {
      feature.querySelector("strong").textContent = question.feature;
      feature.querySelector(".quiz-feature-caption").textContent = question.caption;
      feature.querySelector(".quiz-feature-icon").innerHTML = icon(question.icon);
    }
    options.replaceChildren();
    question.options.forEach(([value, text, symbol, hint]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quiz-option";
      button.dataset.answer = value;
      button.disabled = busy;
      const selected = answers[question.id] === value;
      button.setAttribute("aria-pressed", String(selected));
      const marker = document.createElement("span");
      marker.className = "quiz-option-marker";
      marker.textContent = selected ? "✓" : "→";
      marker.setAttribute("aria-hidden", "true");
      const copy = document.createElement("span");
      copy.className = "quiz-option-copy";
      const label = document.createElement("span");
      label.textContent = text;
      copy.append(label);
      if (hint) {
        const detail = document.createElement("small");
        detail.textContent = hint;
        copy.append(detail);
      }
      const illustration = document.createElement("span");
      illustration.className = "quiz-option-icon";
      illustration.innerHTML = icon(symbol);
      illustration.setAttribute("aria-hidden", "true");
      button.append(illustration, copy, marker);
      options.append(button);
    });
    back.hidden = step === 0;
    if (focus) title.focus({ preventScroll: true });
  }

  function setBusy(value) {
    busy = value;
    options.querySelectorAll("button").forEach(button => { button.disabled = value; });
    back.disabled = value;
  }

  async function transition(update, selected = false, direction = 1) {
    if (busy) return;
    setBusy(true);
    try {
      if (selected || reducedMotion.matches) {
        await new Promise(resolve => setTimeout(resolve, reducedMotion.matches ? 280 : 140));
      }
      if (!reducedMotion.matches) {
        await stage.animate([{ opacity: 1, transform: "translateX(0)" }, { opacity: 0, transform: `translateX(${-12 * direction}px)` }], { duration: 130, easing: "ease-in" }).finished;
      }
      update();
      if (!panel.hidden) {
        title.focus({ preventScroll: true });
        if (window.scrollY > 80) window.scrollTo({ top: 0, behavior: "instant" });
        if (!reducedMotion.matches) {
          const entrance = stage.animate([{ opacity: 0, transform: `translateX(${16 * direction}px)` }, { opacity: 1, transform: "translateX(0)" }], { duration: 220, easing: "ease-out" }).finished;
          const cards = Array.from(options.children, (card, index) => card.animate(
            [{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "translateY(0)" }],
            { duration: 220, delay: index * 40, fill: "backwards", easing: "ease-out" }
          ).finished);
          await Promise.all([entrance, ...cards]);
        }
      }
    } finally { setBusy(false); }
  }

  options.addEventListener("click", (event) => {
    const button = event.target.closest("[data-answer]");
    if (!button || busy) return;
    answers[questions[step].id] = button.dataset.answer;
    options.querySelectorAll("button").forEach(option => {
      const selected = option === button;
      option.setAttribute("aria-pressed", String(selected));
      option.querySelector(".quiz-option-marker").textContent = selected ? "✓" : "→";
    });
    if (!started) { pixel("trackCustom", "QuizStart"); started = true; }
    transition(() => {
      if (step === questions.length - 1) showOffer();
      else { step += 1; render(); }
    }, true);
  });

  function showOffer() {
    const levelCopy = {
      zero: "Seu começo é do zero. Tudo bem.",
      "primeiro-contato": "Seu primeiro contato já aconteceu. Agora, dê continuidade.",
      acordes: "Você já começou. O próximo passo é conectar o que aprendeu.",
    };
    const painCopy = {
      direcao: "Você contou que não sabe o que aprender primeiro. Uma sequência de aulas pode ajudar a organizar seu estudo, sem ter que escolher um vídeo novo a cada tentativa.",
      dedos: "Você contou que os movimentos ainda não saem como gostaria. As aulas em vídeo permitem pausar, observar e repetir; o suporte do professor está disponível para suas dúvidas.",
      rotina: "Você contou que é difícil manter a prática. Experimente reservar um momento possível da sua rotina para assistir a uma aula e praticar seu conteúdo antes de avançar.",
      ajuda: "Você contou que uma dúvida costuma interromper seu estudo. O curso inclui suporte do professor para ajudar você a seguir com mais clareza.",
    };
    const goals = {
      musica: "Seu objetivo: tocar sua primeira música até o final.",
      cantar: "Seu objetivo: acompanhar sua voz com o violão.",
      lazer: "Seu objetivo: ter um momento seu com a música.",
    };
    document.querySelector("[data-result-title]").textContent = levelCopy[answers.nivel];
    document.querySelector("[data-result-copy]").textContent = painCopy[answers.dificuldade];
    document.querySelector("[data-result-goal]").textContent = goals[answers.objetivo];
    document.querySelector("[data-live-note]").hidden = answers.video !== "ao-vivo";
    panel.hidden = true;
    document.body.classList.remove("is-quizzing");
    document.querySelector('meta[name="theme-color"]').content = "#10100f";
    offer.hidden = false;
    document.querySelector("[data-offer-nav]").hidden = false;
    document.querySelector("[data-quiz-header-label]").textContent = "SEU PRÓXIMO PASSO";
    document.querySelector("[data-offer-footer]").hidden = false;
    document.title = "Seu próximo passo | De Férias com o Violão";
    window.scrollTo({ top: 0, behavior: "instant" });
    document.querySelector("[data-offer-title]").focus({ preventScroll: true });
    if (!completed) {
      pixel("trackCustom", "QuizComplete");
      pixel("track", "ViewContent", { content_type: "product" });
      completed = true;
    }
  }

  back.addEventListener("click", () => {
    if (step > 0) transition(() => { step -= 1; render(); }, false, -1);
  });

  document.querySelector("[data-review]").addEventListener("click", () => {
    offer.hidden = true;
    panel.hidden = false;
    document.body.classList.add("is-quizzing");
    document.querySelector('meta[name="theme-color"]').content = "#080808";
    document.querySelector("[data-offer-nav]").hidden = true;
    document.querySelector("[data-offer-footer]").hidden = true;
    document.querySelector("[data-quiz-header-label]").textContent = "SEU COMEÇO NO VIOLÃO";
    document.title = "Qual é seu nível no violão? | Oficina do Violão";
    step = 0;
    render(true);
    window.scrollTo({ top: 0, behavior: "instant" });
  });

  document.querySelectorAll("[data-checkout]").forEach((link) => {
    link.addEventListener("click", () => {
      if (!checkoutTracked) { pixel("track", "InitiateCheckout", { content_type: "product" }); checkoutTracked = true; }
    });
  });
  render();
})();

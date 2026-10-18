(() => {
  const questions = [
    {
      id: "nivel", label: "Seu ponto de partida", icon: "music",
      lead: "Antes de começarmos, quero te conhecer um pouco melhor.",
      title: "Em qual nível você está no violão?",
      help: "",
      options: [
        ["zero", "Começando do zero", "spark"],
        ["primeiro-contato", "Já tentei, mas travei", "route"],
        ["acordes", "Sei alguns acordes", "music"],
        ["musicas", "Já toco algumas músicas", "mic"],
      ],
    },
    {
      id: "dificuldade", label: "Vamos destravar esse começo", icon: "compass", title: "O que mais te trava hoje?",
      help: "",
      options: [
        ["direcao", "Não sei por onde começar", "compass"],
        ["dedos", "Os acordes não saem", "music"],
        ["rotina", "Começo e acabo parando", "repeat"],
        ["ajuda", "Falta alguém para me ajudar", "chat"],
      ],
    },
    {
      id: "frustracao", label: "O que ficou pelo caminho", icon: "repeat",
      title: "O que mais desanima?", help: "",
      options: [
        ["soltos", "Ver vídeos e não evoluir", "play"],
        ["parado", "Deixar o violão no canto", "music"],
        ["duvidas", "Travar e não ter ajuda", "chat"],
        ["nenhum", "Ainda não passei por isso", "spark"],
      ],
    },
    {
      id: "objetivo", label: "Agora, imagine a cena", icon: "spark", title: "O que você quer conseguir?",
      help: "",
      options: [
        ["musica", "Tocar uma música inteira", "music"],
        ["cantar", "Tocar e cantar junto", "mic"],
        ["lazer", "Relaxar tocando violão", "heart"],
      ],
    },
    {
      id: "video", label: "Um passo de cada vez", icon: "play", title: "Aprender através de aulas em vídeo te ajudaria?",
      help: "",
      options: [
        ["sim", "Quero acessar as 27 aulas de violão", "play"],
        ["repetir", "Quero rever com calma", "repeat"],
        ["ao-vivo", "Prefiro aulas ao vivo", "users"],
      ],
    },
    {
      id: "suporte", label: "Ajuda para seguir", icon: "chat", title: "Travou? E se pudesse perguntar?",
      help: "",
      options: [
        ["sim", "Isso faria a diferença", "chat"],
        ["quando-precisar", "Quero ajuda quando precisar", "spark"],
        ["sozinho", "Gosto de tentar sozinho", "compass"],
      ],
    },
    {
      id: "grupo", label: "Aprenda em companhia", icon: "users", title: "Bora aprender com mais gente?",
      help: "",
      options: [
        ["participar", "Bora! Quero participar", "users"],
        ["acompanhar", "Prefiro acompanhar de boa", "heart"],
        ["individual", "Sou mais de praticar sozinho", "music"],
      ],
    },
    {
      id: "preco", label: "Último passo", icon: "spark", title: "Vamos tirar o violão do canto?",
      help: "",
      options: [
        ["comecar", "Quero aproveitar essa oferta", "spark"],
        ["detalhes", "Quero conhecer melhor o curso", "compass"],
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
    const progress = document.querySelector("[data-progress]");
    progress.setAttribute("aria-valuenow", String(step));
    progress.setAttribute("aria-valuemax", String(questions.length));
    progress.setAttribute("aria-valuetext", `${step} de ${questions.length} passos concluídos`);
    progress.replaceChildren(...questions.map((_, index) => {
      const dot = document.createElement("span");
      dot.className = index < step ? "is-done" : index === step ? "is-current" : "";
      dot.textContent = index < step ? "✓" : String(index + 1);
      dot.setAttribute("aria-hidden", "true");
      return dot;
    }));
    document.querySelector("[data-step]").textContent = `${step + 1} / ${questions.length}`;
    document.querySelector("[data-phase]").textContent = question.id === "preco" ? "SEU PRÓXIMO PASSO" : step < 3 ? "SEU COMEÇO" : step < 4 ? "SUA CONQUISTA" : "SEU CAMINHO";
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
    document.querySelector("[data-question-help]").textContent = question.help;
    document.querySelector("[data-question-help]").hidden = !question.help;
    document.querySelector("[data-answer-hint]").textContent = step === questions.length - 1 ? "Toque para ver todos os detalhes do curso" : "Toque em uma opção para avançar";
    document.querySelector("[data-video-mockup]").hidden = question.id !== "video";
    document.querySelectorAll("[data-chat-mockup]").forEach(mockup => { mockup.hidden = mockup.dataset.chatMockup !== question.id; });
    document.querySelector("[data-quiz-price]").hidden = question.id !== "preco";
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
      musicas: "Seu próximo passo pode ser fortalecer a base.",
    };
    const painCopy = {
      direcao: "Troque os vídeos soltos por uma sequência do zero às primeiras músicas.",
      dedos: "Pause o vídeo, repita os movimentos e tire suas dúvidas com o professor.",
      rotina: "Dê um passo por vez, com aulas em vídeo para encaixar na sua rotina.",
      ajuda: "Tenha acesso ao professor para tirar dúvidas e seguir praticando.",
    };
    const goals = {
      musica: "Seu objetivo: tocar uma música até o final.",
      cantar: "Seu objetivo: acompanhar sua voz com o violão.",
      lazer: "Seu objetivo: ter um momento seu com a música.",
    };
    document.querySelector("[data-result-title]").textContent = levelCopy[answers.nivel];
    document.querySelector("[data-result-copy]").textContent = painCopy[answers.dificuldade];
    document.querySelector("[data-result-goal]").textContent = goals[answers.objetivo];
    document.querySelector("[data-live-note]").hidden = answers.video !== "ao-vivo";
    document.querySelector("[data-level-note]").hidden = answers.nivel !== "musicas";
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

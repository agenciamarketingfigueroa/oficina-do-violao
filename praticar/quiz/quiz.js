(() => {
  const decks = window.FLASHCARD_DECKS;
  const list = document.querySelector("[data-deck-list]");
  if (!list || !Array.isArray(decks)) return;

  const $ = (selector) => document.querySelector(selector);
  const screens = Object.fromEntries(
    [...document.querySelectorAll("[data-screen]")].map((screen) => [screen.dataset.screen, screen]),
  );
  const ui = {
    title: $("[data-session-title]"),
    type: $("[data-session-type]"),
    progressLabel: $("[data-progress-label]"),
    progress: $("[data-progress]"),
    progressFill: $("[data-progress-fill]"),
    questionNumber: $("[data-question-number]"),
    instruction: $("[data-question-instruction]"),
    question: $("[data-question-text]"),
    options: $("[data-options]"),
    feedback: $("[data-feedback]"),
    feedbackTitle: $("[data-feedback-title]"),
    feedbackText: $("[data-feedback-text]"),
    next: $("[data-next]"),
    nextLabel: $("[data-next-label]"),
    resultDeck: $("[data-result-deck]"),
    resultTitle: $("[data-result-title]"),
    score: $("[data-score]"),
    resultMessage: $("[data-result-message]"),
    review: $("[data-review]"),
  };

  let selectedDeck = null;
  let queue = [];
  let missed = [];
  let index = 0;
  let correct = 0;
  let answered = false;
  let reviewing = false;

  const shuffle = (items) => {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };

  const groupFor = (deck, card) => {
    if (deck.id === "cifras-basicas") {
      if (card.front.startsWith("Na sequência")) return "sequencia";
      return /^[A-G]$/.test(card.front) ? "letra" : "nota";
    }
    if (deck.id === "maior-ou-menor") return /^[A-G]m?$/.test(card.front) ? "cifra" : "nome";
    if (deck.id === "sustenidos-e-bemois") return /^[A-G][#b]$/.test(card.front) ? "simbolo" : "nome";
    return "definicao";
  };

  const instructionFor = (deck, group) => {
    if (group === "definicao") return "Qual termo combina com esta descrição?";
    if (group === "sequencia") return "Complete a sequência";
    if (deck.id === "cifras-basicas") return group === "letra"
      ? "Que nota corresponde a esta letra?" : "Que letra representa esta nota?";
    if (deck.id === "maior-ou-menor") return group === "cifra"
      ? "Como se lê esta cifra de acorde?" : "Qual é a cifra deste acorde?";
    return group === "simbolo" ? "Como se lê esta nota?" : "Como se escreve esta nota?";
  };

  const questionsFor = (deck) => deck.cards.map((card) => {
    const group = groupFor(deck, card);
    const definition = group === "definicao";
    const answer = definition ? card.quizAnswer : card.back;
    const pool = [...new Set(deck.cards
      .filter((candidate) => groupFor(deck, candidate) === group)
      .map((candidate) => definition ? candidate.quizAnswer : candidate.back))];
    if (!answer || pool.length < 4 || !pool.includes(answer)) {
      throw new Error(`Quiz: alternativas insuficientes em ${deck.id}: ${card.front}`);
    }
    return {
      instruction: instructionFor(deck, group),
      text: definition ? card.back : card.front,
      answer,
      pool,
    };
  });

  const showScreen = (name) => {
    Object.entries(screens).forEach(([key, screen]) => {
      screen.hidden = key !== name;
    });
    window.scrollTo({ top: 0, behavior: "auto" });
    const heading = screens[name].querySelector("h1");
    if (heading && name !== "intro") heading.focus({ preventScroll: true });
  };

  const updateProgress = (completed) => {
    ui.progressLabel.textContent = `${index + 1} de ${queue.length}`;
    ui.progress.setAttribute("aria-valuemax", String(queue.length));
    ui.progress.setAttribute("aria-valuenow", String(completed));
    ui.progressFill.style.width = `${(completed / queue.length) * 100}%`;
  };

  const choose = (value, button) => {
    if (answered || screens.session.hidden) return;
    answered = true;
    const question = queue[index];
    const isCorrect = value === question.answer;
    if (isCorrect) correct += 1;
    else missed.push(question);

    ui.options.querySelectorAll("button").forEach((option) => {
      option.disabled = true;
      if (option.dataset.answer === question.answer) option.dataset.state = "correct";
      else if (option === button) option.dataset.state = "missed";
    });
    ui.feedbackTitle.textContent = isCorrect ? "Acertou!" : "Boa tentativa.";
    ui.feedbackText.textContent = `A resposta é ${question.answer}.`;
    ui.feedback.hidden = false;
    ui.next.hidden = false;
    ui.nextLabel.textContent = index === queue.length - 1 ? "Ver resultado" : "Próxima pergunta";
    updateProgress(index + 1);
    ui.next.focus({ preventScroll: true });
  };

  const renderQuestion = () => {
    const question = queue[index];
    answered = false;
    ui.questionNumber.textContent = `${String(index + 1).padStart(2, "0")} / ${String(queue.length).padStart(2, "0")}`;
    ui.instruction.textContent = question.instruction;
    ui.question.textContent = question.text;
    ui.question.classList.toggle("quiz-question-long", question.text.length > 45);
    ui.options.replaceChildren();
    const alternatives = shuffle([
      question.answer,
      ...shuffle(question.pool.filter((option) => option !== question.answer)).slice(0, 3),
    ]);
    alternatives.forEach((alternative, optionIndex) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quiz-option";
      button.dataset.answer = alternative;
      const letter = document.createElement("span");
      letter.className = "quiz-option-letter";
      letter.textContent = String.fromCharCode(65 + optionIndex);
      letter.setAttribute("aria-hidden", "true");
      const label = document.createElement("span");
      label.textContent = alternative;
      button.append(letter, label);
      button.addEventListener("click", () => choose(alternative, button));
      ui.options.append(button);
    });
    ui.feedback.hidden = true;
    ui.next.hidden = true;
    updateProgress(index);
    ui.question.focus({ preventScroll: true });
  };

  const start = (questions, isReview = false) => {
    queue = shuffle(questions);
    missed = [];
    index = 0;
    correct = 0;
    reviewing = isReview;
    ui.title.textContent = selectedDeck.title;
    ui.type.textContent = isReview ? "Quiz / revisão" : "Quiz da Oficina";
    showScreen("session");
    renderQuestion();
  };

  const finish = () => {
    const total = queue.length;
    ui.resultDeck.textContent = reviewing ? `${selectedDeck.title} / revisão` : selectedDeck.title;
    ui.resultTitle.textContent = correct === total ? "Você acertou todas 🎸" : "Quiz concluído 🎸";
    ui.score.textContent = `${correct} de ${total}`;
    ui.resultMessage.textContent = correct === total
      ? "Boa! Agora leve uma dessas ideias para o violão."
      : correct / total >= 0.7
        ? "Você já reconhece bastante coisa. Revise as que faltaram e experimente no violão."
        : "Algumas respostas ainda pedem revisão. Continue sem pressa e depois pratique no violão.";
    ui.review.hidden = missed.length === 0;
    showScreen("result");
  };

  $("[data-deck-total]").textContent = `${String(decks.length).padStart(2, "0")} TEMAS`;
  decks.forEach((deck, deckIndex) => {
    const article = document.createElement("article");
    article.className = "practice-deck-card";
    const top = document.createElement("div");
    top.className = "practice-card-top";
    const number = document.createElement("span");
    number.textContent = `${String(deckIndex + 1).padStart(2, "0")} / TEMA`;
    const count = document.createElement("span");
    count.textContent = `${deck.cards.length} PERGUNTAS`;
    top.append(number, count);
    const content = document.createElement("div");
    const title = document.createElement("h2");
    title.textContent = deck.title;
    const description = document.createElement("p");
    description.textContent = deck.description;
    content.append(title, description);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "button button-outline";
    button.textContent = "Começar";
    button.setAttribute("aria-label", `Começar quiz de ${deck.title}`);
    button.addEventListener("click", () => {
      selectedDeck = deck;
      start(questionsFor(deck));
    });
    article.append(top, content, button);
    list.append(article);
  });

  ui.next.addEventListener("click", () => {
    if (!answered) return;
    index += 1;
    if (index === queue.length) finish();
    else renderQuestion();
  });
  ui.review.addEventListener("click", () => start(missed, true));
  $("[data-restart]").addEventListener("click", () => start(questionsFor(selectedDeck)));
  document.querySelectorAll("[data-choose]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedDeck = null;
      showScreen("intro");
      list.querySelector("button")?.focus({ preventScroll: true });
    });
  });
  const requestedDeck = decks.find((deck) => deck.id === new URLSearchParams(window.location.search).get("tema"));
  if (requestedDeck) {
    selectedDeck = requestedDeck;
    start(questionsFor(requestedDeck));
  }
})();

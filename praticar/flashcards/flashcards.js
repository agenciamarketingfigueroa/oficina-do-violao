(() => {
  const decks = window.FLASHCARD_DECKS;
  const list = document.querySelector("[data-deck-list]");
  if (!list || !Array.isArray(decks)) return;

  const screens = Object.fromEntries(
    [...document.querySelectorAll("[data-screen]")].map((screen) => [screen.dataset.screen, screen]),
  );
  const $ = (selector) => document.querySelector(selector);
  $("[data-deck-total]").textContent = `${String(decks.length).padStart(2, "0")} BARALHOS`;
  const ui = {
    title: $("[data-session-title]"),
    type: $("[data-session-type]"),
    progressLabel: $("[data-progress-label]"),
    progress: $("[data-progress]"),
    progressFill: $("[data-progress-fill]"),
    cardLabel: $("[data-card-label]"),
    cardContent: $("[data-card-content]"),
    cardCount: $("[data-card-count]"),
    reveal: $("[data-reveal]"),
    answerActions: $("[data-answer-actions]"),
    announcement: $("[data-announcement]"),
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
  let revealed = false;
  let reviewing = false;

  const shuffle = (cards) => {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const showScreen = (name) => {
    Object.entries(screens).forEach(([key, screen]) => {
      screen.hidden = key !== name;
    });
    window.scrollTo({ top: 0, behavior: "auto" });
    const heading = screens[name].querySelector("h1");
    if (heading && name !== "intro") heading.focus({ preventScroll: true });
  };

  const renderCard = () => {
    const card = queue[index];
    revealed = false;
    ui.cardLabel.textContent = "FRENTE / PENSE NA RESPOSTA";
    ui.cardContent.textContent = card.front;
    ui.cardContent.classList.toggle("practice-card-content-long", card.front.length > 24);
    ui.cardCount.textContent = `${String(index + 1).padStart(2, "0")} / ${String(queue.length).padStart(2, "0")}`;
    ui.progressLabel.textContent = `${index + 1} de ${queue.length}`;
    ui.progress.setAttribute("aria-valuemax", String(queue.length));
    ui.progress.setAttribute("aria-valuenow", String(index));
    ui.progressFill.style.width = `${(index / queue.length) * 100}%`;
    ui.reveal.hidden = false;
    ui.answerActions.hidden = true;
    ui.announcement.textContent = `Card ${index + 1} de ${queue.length}: ${card.front}`;
    ui.reveal.focus({ preventScroll: true });
  };

  const start = (cards, isReview = false) => {
    queue = shuffle(cards);
    missed = [];
    index = 0;
    correct = 0;
    reviewing = isReview;
    ui.title.textContent = selectedDeck.title;
    ui.type.textContent = isReview ? "Revisão dos que errei" : "Treino";
    showScreen("session");
    renderCard();
  };

  const reveal = () => {
    if (screens.session.hidden || revealed) return;
    revealed = true;
    const answer = queue[index].back;
    ui.cardLabel.textContent = "VERSO / RESPOSTA";
    ui.cardContent.textContent = answer;
    ui.cardContent.classList.toggle("practice-card-content-long", answer.length > 24);
    ui.reveal.hidden = true;
    ui.answerActions.hidden = false;
    ui.announcement.textContent = `Resposta: ${answer}. Marque se você lembrou.`;
    ui.cardContent.focus({ preventScroll: true });
  };

  const finish = () => {
    const total = queue.length;
    ui.resultDeck.textContent = reviewing ? `${selectedDeck.title} / revisão` : selectedDeck.title;
    ui.resultTitle.textContent = correct === total ? "Você lembrou de todos 🎸" : "Sessão concluída 🎸";
    ui.score.textContent = `${correct} de ${total}`;
    ui.resultMessage.textContent = correct === total
      ? "Boa! Agora tente levar alguma dessas informações para o violão."
      : correct / total >= 0.7
        ? "Boa revisão! Relembre os que faltaram e depois experimente no violão."
        : "Alguns conceitos ainda não estão automáticos — e é para isso que os Flashcards existem.";
    ui.review.hidden = missed.length === 0;
    showScreen("result");
  };

  const answer = (remembered) => {
    if (screens.session.hidden || !revealed) return;
    if (remembered) correct += 1;
    else missed.push(queue[index]);
    index += 1;
    if (index === queue.length) finish();
    else renderCard();
  };

  decks.forEach((deck, deckIndex) => {
    const article = document.createElement("article");
    article.className = "practice-deck-card";
    const top = document.createElement("div");
    top.className = "practice-card-top";
    const number = document.createElement("span");
    number.textContent = `${String(deckIndex + 1).padStart(2, "0")} / BARALHO`;
    const count = document.createElement("span");
    count.textContent = `${deck.cards.length} CARDS`;
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
    button.setAttribute("aria-label", `Começar ${deck.title}`);
    button.addEventListener("click", () => {
      selectedDeck = deck;
      start(deck.cards);
    });
    article.append(top, content, button);
    list.append(article);
  });

  ui.reveal.addEventListener("click", reveal);
  $("[data-missed]").addEventListener("click", () => answer(false));
  $("[data-correct]").addEventListener("click", () => answer(true));
  ui.review.addEventListener("click", () => start(missed, true));
  $("[data-restart]").addEventListener("click", () => start(selectedDeck.cards));
  document.querySelectorAll("[data-choose]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedDeck = null;
      showScreen("intro");
      list.querySelector("button")?.focus({ preventScroll: true });
    });
  });

  document.addEventListener("keydown", (event) => {
    if (screens.session.hidden || document.body.classList.contains("menu-open") || event.altKey || event.ctrlKey || event.metaKey || event.repeat) return;
    const target = event.target;
    if (target instanceof HTMLElement && (target.closest("input, textarea, select") || target.isContentEditable)) return;
    if (!revealed && (event.key === " " || event.key === "Enter")) {
      if (target instanceof HTMLElement && target.closest("button, a")) return;
      event.preventDefault();
      reveal();
    } else if (revealed && event.key === "1") {
      answer(false);
    } else if (revealed && event.key === "2") {
      answer(true);
    } else if (revealed && event.key === " " && !(target instanceof HTMLElement && target.closest("button, a"))) {
      event.preventDefault();
    }
  });
  const requestedDeck = decks.find((deck) => deck.id === new URLSearchParams(window.location.search).get("tema"));
  if (requestedDeck) {
    selectedDeck = requestedDeck;
    start(requestedDeck.cards);
  }
})();

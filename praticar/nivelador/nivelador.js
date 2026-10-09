(() => {
  const data = window.PLACEMENT_DATA;
  const model = window.PLACEMENT;
  const report = window.PLACEMENT_REPORT;
  if (!data || !model || !report) return;
  const $ = (selector) => document.querySelector(selector);
  const screens = Object.fromEntries([...document.querySelectorAll("[data-screen]")]
    .map((screen) => [screen.dataset.screen, screen]));
  const ui = {
    stage: $("[data-stage-title]"), question: $("[data-question]"), kind: $("[data-kind]"),
    help: $("[data-help]"), options: $("[data-options]"), back: $("[data-back]"), next: $("[data-next]"),
    progress: $("[data-progress]"), fill: $("[data-progress-fill]"), progressLabel: $("[data-progress-label]"),
    resultTitle: $("[data-result-title]"), resultDescription: $("[data-result-description]"),
    resultContext: $("[data-result-context]"), summary: $("[data-summary]"), nextStep: $("[data-next-step]"),
    review: $("[data-review]"), levels: $("[data-levels]"), diagnosis: $("[data-diagnosis]"),
    strengths: $("[data-strengths]"), theoryTitle: $("[data-theory-title]"),
    theoryDescription: $("[data-theory-description]"), theoryGaps: $("[data-theory-gaps]"),
    plan: $("[data-plan]"), checklist: $("[data-checklist]"), nextDescription: $("[data-next-description]"),
  };
  let index = 0;
  let responses = {};

  const element = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  const optionsFor = (q) => q.type === "practice" ? q.options : [...q.options, "Ainda não sei."];
  const showScreen = (name) => {
    Object.entries(screens).forEach(([key, screen]) => { screen.hidden = key !== name; });
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  const updateProgress = () => {
    const answered = Object.keys(responses).length;
    ui.progressLabel.textContent = `Pergunta ${index + 1} de ${model.questions.length}`;
    ui.progress.setAttribute("aria-valuemax", String(model.questions.length));
    ui.progress.setAttribute("aria-valuenow", String(answered));
    ui.progress.setAttribute("aria-valuetext", `${answered} de ${model.questions.length} respondidas`);
    ui.fill.style.width = `${answered / model.questions.length * 100}%`;
  };
  const renderQuestion = () => {
    const q = model.questions[index];
    ui.stage.textContent = data.stages.find((stage) => stage.id === q.stageId).title;
    ui.question.textContent = q.prompt;
    ui.kind.textContent = q.type === "practice" ? "SUA PRÁTICA" : "SEU CONHECIMENTO";
    ui.help.textContent = q.type === "practice"
      ? "Pense no que você consegue fazer hoje, com o violão na mão."
      : "Marque uma resposta. Se não souber, use a última opção.";
    ui.options.replaceChildren();
    optionsFor(q).forEach((option, optionIndex) => {
      const label = element("label", "", "placement-choice");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = q.id;
      input.value = String(optionIndex);
      input.checked = responses[q.id] === optionIndex;
      label.classList.toggle("selected", input.checked);
      input.addEventListener("change", () => {
        if (!input.checked) return;
        responses[q.id] = optionIndex;
        ui.options.querySelectorAll("label").forEach((item, itemIndex) => item.classList.toggle("selected", itemIndex === optionIndex));
        ui.next.disabled = false;
        updateProgress();
      });
      label.append(input, element("span", option));
      ui.options.append(label);
    });
    ui.back.disabled = index === 0;
    ui.next.disabled = responses[q.id] === undefined;
    ui.next.textContent = index === model.questions.length - 1 ? "Ver meu resultado →" : "Continuar →";
    updateProgress();
    window.scrollTo({ top: 0, behavior: "auto" });
    ui.question.focus({ preventScroll: true });
  };

  const renderReview = () => {
    ui.review.replaceChildren();
    data.stages.forEach((stage) => {
      ui.review.append(element("h3", stage.title));
      const list = element("ol");
      stage.questions.forEach((q) => {
        const item = element("li");
        item.append(element("strong", q.prompt));
        item.append(element("p", `Sua resposta: ${optionsFor(q)[responses[q.id]]}`));
        if (q.type === "knowledge") {
          item.append(element("p", `${responses[q.id] === q.answer ? "Resposta certa." : `Resposta correta: ${q.options[q.answer]}.`} ${q.explanation}`));
        } else {
          item.append(element("small", "Prática relatada por você; confirme tocando."));
        }
        list.append(item);
      });
      ui.review.append(list);
    });
  };

  const renderDrill = (q, block) => {
    const drill = report.drills[q.id];
    const card = element("article", "", "placement-drill");
    if (block !== undefined) card.append(element("p", `BLOCO ${block + 1} / 5 MINUTOS`, "section-kicker"));
    card.append(element("h3", drill.title));
    card.append(element("p", q.type === "practice"
      ? `Você marcou: “${q.options[responses[q.id]]}” — ${q.focus}.`
      : `Para revisar: ${q.focus}. ${q.explanation}`, "placement-drill-reason"));
    const steps = element("ol");
    drill.steps.forEach((step) => steps.append(element("li", step)));
    card.append(steps, element("p", `Meta: ${drill.goal}`, "placement-drill-goal"));
    if (drill.deck) {
      const links = element("div", "", "placement-drill-links");
      [["flashcards", "Revisar o tema nos Flashcards"], ["quiz", "Praticar o tema no Quiz"]].forEach(([path, label]) => {
        const link = element("a", `${label} (nova aba) ↗`);
        link.href = `../${path}/?tema=${encodeURIComponent(drill.deck)}`;
        link.target = "_blank";
        link.rel = "noopener";
        links.append(link);
      });
      card.append(links);
    }
    return card;
  };

  const finish = () => {
    const result = model.evaluate(responses);
    if (!result) return;
    const level = report.levels[result.levelIndex];
    ui.resultTitle.textContent = level.title;
    ui.resultDescription.textContent = level.description;
    ui.resultContext.textContent = "Estimativa de acompanhamento ao violão baseada na prática que você relata. Confirme as habilidades tocando; o teste não ouve sua execução. O conhecimento teórico aparece separadamente abaixo.";
    ui.levels.replaceChildren();
    report.levels.forEach((item, i) => {
      const step = element("li", "", i === result.levelIndex ? "current" : "");
      if (i === result.levelIndex) step.setAttribute("aria-current", "step");
      step.append(element("span", `0${i + 1}`), element("strong", item.title));
      if (i === result.levelIndex) step.append(element("small", "Você está aqui"));
      ui.levels.append(step);
    });
    ui.diagnosis.replaceChildren();
    if (result.practicalGaps.length) {
      ui.diagnosis.append(element("p", `A primeira base que precisa de atenção é ${report.domains[result.stageIndex].toLowerCase()}. Estas respostas definiram sua indicação:`));
      const list = element("ul", "", "placement-evidence");
      result.practicalGaps.forEach((q) => {
        const li = element("li");
        li.append(element("strong", q.focus), element("span", `Você marcou: “${q.options[responses[q.id]]}”`));
        list.append(li);
      });
      ui.diagnosis.append(list);
    } else {
      ui.diagnosis.append(element("p", "Você relatou fazer sozinho as nove habilidades de base e autonomia, além de manter constância nas três de expressão e arranjo. Isso atende aos critérios do nível Avançado neste teste."));
    }
    if (result.uneven) ui.diagnosis.append(element("p", "Você também relatou habilidades de etapas posteriores. Seu perfil tem pontos em níveis diferentes; a indicação prioriza a primeira base a fortalecer. Confira essa resposta tocando e leve a diferença ao professor."));
    ui.strengths.replaceChildren();
    result.strengths.forEach((q) => {
      const li = element("li");
      li.append(element("strong", q.focus), element("span", q.options[responses[q.id]]));
      ui.strengths.append(li);
    });
    if (!result.strengths.length) ui.strengths.append(element("li", "Você ainda não marcou uma habilidade como independente. A primeira conquista é montar e trocar acordes com clareza; o treino abaixo começa por essa base."));

    ui.theoryTitle.textContent = `Teoria: ${result.theoryCorrect} de 12 respostas certas`;
    ui.theoryDescription.textContent = result.knowledgeGaps.length
      ? `Há ${result.knowledgeGaps.length} conceito${result.knowledgeGaps.length === 1 ? "" : "s"} para revisar. Isso orienta seu estudo teórico e não altera a indicação prática de ${level.title}. Abra um tema para ver a explicação e um exercício.`
      : "Você acertou todos os conceitos desta amostra. Aplique esse conhecimento nas músicas; o treino abaixo prioriza sua prática.";
    ui.theoryGaps.replaceChildren();
    result.knowledgeGaps.forEach((q) => {
      const detail = element("details", "", "placement-concept");
      detail.append(element("summary", q.focus), element("p", `Sua resposta: ${optionsFor(q)[responses[q.id]]}`), renderDrill(q));
      ui.theoryGaps.append(detail);
    });
    ui.plan.replaceChildren();
    result.plan.forEach((q, i) => ui.plan.append(renderDrill(q, i)));
    ui.nextStep.textContent = result.levelIndex === 4 ? "Para aprofundar seu nível Avançado" : `Para chegar ao nível ${report.levels[result.levelIndex + 1].title}`;
    ui.nextDescription.textContent = result.levelIndex === 4
      ? "Aplique estas metas em músicas de estilos diferentes e confira suas gravações com o professor. Este teste não distingue níveis acima de Avançado."
      : "Use estas três metas como referência. Quando conseguir todas sozinho, refaça o teste com base no que você realmente toca. Não é preciso atingir tudo em uma semana.";
    ui.checklist.replaceChildren();
    result.target.forEach((q) => {
      const li = element("li");
      const reached = responses[q.id] >= (result.stageIndex === 3 ? 3 : 2);
      li.append(element("span", reached ? "JÁ RELATADO • CONFIRME TOCANDO" : "PRÓXIMA CONQUISTA", "section-kicker"));
      li.append(element("strong", q.focus), element("p", report.drills[q.id].goal));
      if (!result.plan.some((item) => item.id === q.id)) {
        const detail = element("details", "", "placement-concept");
        detail.append(element("summary", "Ver exercício para esta meta"), renderDrill(q));
        li.append(detail);
      }
      ui.checklist.append(li);
    });
    ui.summary.replaceChildren();
    result.stages.forEach((summary, stageIndex) => {
      const card = element("article", "", "placement-summary-card");
      if (stageIndex === result.stageIndex) card.classList.add("suggested");
      card.append(element("span", `${String(stageIndex + 1).padStart(2, "0")} / ${stageIndex === result.stageIndex ? "FOCO DO TREINO" : "ÁREA"}`, "section-kicker"));
      card.append(element("h3", report.domains[stageIndex]));
      card.append(element("p", `Conhecimento: ${summary.correct} de 3 respostas certas.`));
      card.append(element("p", `Prática: ${summary.practiceReady} de 3 habilidades relatadas com autonomia.`));
      card.append(element("p", `Constância na prática: ${summary.consistent} de 3 habilidades relatadas.`));
      ui.summary.append(card);
    });
    renderReview();
    showScreen("result");
    ui.resultTitle.focus({ preventScroll: true });
  };

  const start = () => {
    index = 0;
    responses = {};
    document.querySelectorAll("details").forEach((detail) => { detail.open = false; });
    showScreen("session");
    renderQuestion();
  };
  $("[data-start]").addEventListener("click", start);
  $("[data-restart]").addEventListener("click", start);
  ui.back.addEventListener("click", () => {
    if (screens.session.hidden || index === 0) return;
    index -= 1;
    renderQuestion();
  });
  ui.next.addEventListener("click", () => {
    if (screens.session.hidden || responses[model.questions[index].id] === undefined) return;
    if (index === model.questions.length - 1) finish();
    else { index += 1; renderQuestion(); }
  });
})();

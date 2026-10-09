(() => {
  const core = window.RHYTHM_CORE;
  if (!core) return;
  const $ = (selector) => document.querySelector(selector);
  const ui = {
    bpm: $("[data-bpm]"), range: $("[data-bpm-range]"), down: $("[data-bpm-down]"), up: $("[data-bpm-up]"),
    meter: $("[data-meter]"), unit: $("[data-unit]"), beats: $("[data-beats]"),
    accent: $("[data-accent-enabled]"), accentMessage: $("[data-accent-message]"),
    play: $("[data-play]"), status: $("[data-audio-status]"),
  };
  if (Object.values(ui).some((node) => !node)) return;

  const Audio = window.AudioContext || window.webkitAudioContext;
  const selectedAccents = Object.fromEntries(Object.keys(core.meters).map((key) => [key, new Set([0])]));
  let bpm = 80;
  let audio = null;
  let playing = false;
  let starting = false;
  let startVersion = 0;
  let timer = null;
  let frame = null;
  let nextTime = 0;
  let beatIndex = 0;
  const visualQueue = [];
  const voices = new Set();
  const meter = () => core.meters[ui.meter.value];
  const accents = () => selectedAccents[ui.meter.value];

  const renderAccentMessage = () => {
    const selected = [...accents()].sort((a, b) => a - b).map((index) => index + 1);
    ui.accentMessage.textContent = !ui.accent.checked ? "Acentos desligados: todos os cliques têm o mesmo som."
      : selected.length ? `Tempo${selected.length === 1 ? "" : "s"} acentuado${selected.length === 1 ? "" : "s"}: ${selected.join(", ")}. Clique nos números para mudar.`
        : "Nenhum tempo acentuado. Clique em um número para escolher.";
    [...ui.beats.children].forEach((button, index) => {
      const selectedBeat = accents().has(index);
      button.classList.toggle("accent-selected", selectedBeat && ui.accent.checked);
      button.disabled = !ui.accent.checked;
      button.setAttribute("aria-pressed", String(selectedBeat));
      button.setAttribute("aria-label", `Tempo ${index + 1}: ${!ui.accent.checked ? "acento desligado" : selectedBeat ? "marcado para acentuar" : "sem acento"}`);
    });
    ui.beats.classList.toggle("accents-off", !ui.accent.checked);
  };
  const renderMeter = () => {
    const current = meter();
    if (!current) return;
    ui.beats.replaceChildren();
    for (let i = 0; i < current.beats; i += 1) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "rhythm-beat";
      button.textContent = String(i + 1);
      button.addEventListener("click", () => {
        if (accents().has(i)) accents().delete(i);
        else accents().add(i);
        renderAccentMessage();
      });
      ui.beats.append(button);
    }
    ui.unit.textContent = `No ${ui.meter.value}, cada clique representa uma ${current.unit}.`;
    renderAccentMessage();
  };
  const setBpm = (value) => {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) { ui.bpm.value = String(bpm); return; }
    bpm = Math.max(core.minBpm, Math.min(core.maxBpm, Math.round(numeric)));
    ui.bpm.value = String(bpm);
    ui.range.value = String(bpm);
    if (playing) ui.status.textContent = `Tocando a ${bpm} BPM em ${ui.meter.value}.`;
  };
  const lightBeat = (index) => {
    [...ui.beats.children].forEach((button, i) => button.classList.toggle("active", i === index));
  };
  const draw = () => {
    if (!playing) return;
    while (visualQueue.length && visualQueue[0].time <= audio.currentTime + 0.005) {
      lightBeat(visualQueue.shift().beat);
    }
    frame = window.requestAnimationFrame(draw);
  };
  const scheduleClick = (at, index) => {
    const accented = ui.accent.checked && accents().has(index);
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(accented ? 1050 : 590, at);
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(accented ? 0.23 : 0.09, at + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.065);
    oscillator.connect(gain);
    gain.connect(audio.destination);
    oscillator.onended = () => {
      voices.delete(oscillator);
      oscillator.disconnect();
      gain.disconnect();
    };
    voices.add(oscillator);
    oscillator.start(at);
    oscillator.stop(at + 0.07);
    visualQueue.push({ time: at, beat: index });
  };
  const schedule = () => {
    if (!playing) return;
    if (nextTime < audio.currentTime) nextTime = audio.currentTime + 0.02;
    while (nextTime < audio.currentTime + 0.12) {
      scheduleClick(nextTime, beatIndex);
      nextTime += 60 / bpm;
      beatIndex = (beatIndex + 1) % meter().beats;
    }
  };
  const stop = () => {
    startVersion += 1;
    if (!playing && !starting) return;
    playing = false;
    window.clearInterval(timer);
    window.cancelAnimationFrame(frame);
    timer = null;
    frame = null;
    visualQueue.length = 0;
    voices.forEach((voice) => { try { voice.stop(audio.currentTime); } catch (_) { /* Ended already. */ } });
    voices.clear();
    lightBeat(-1);
    ui.play.textContent = "Iniciar metrônomo ▶";
    ui.status.textContent = "Metrônomo parado.";
  };
  const start = async () => {
    if (playing || starting) return;
    if (!Audio) { ui.status.textContent = "Este navegador não oferece áudio para o metrônomo."; return; }
    starting = true;
    const version = ++startVersion;
    ui.play.disabled = true;
    try {
      if (!audio) audio = new Audio();
      if (audio.state !== "running") await audio.resume();
      if (version !== startVersion) return;
      if (audio.state !== "running") throw new Error("O áudio não iniciou.");
      beatIndex = 0;
      nextTime = audio.currentTime + 0.04;
      playing = true;
      schedule();
      timer = window.setInterval(schedule, 25);
      frame = window.requestAnimationFrame(draw);
      ui.play.textContent = "Parar metrônomo ■";
      ui.status.textContent = `Tocando a ${bpm} BPM em ${ui.meter.value}.`;
    } catch (_) {
      ui.status.textContent = "Não foi possível iniciar o áudio. Confira o volume ou tente novamente.";
    } finally {
      starting = false;
      ui.play.disabled = false;
    }
  };

  ui.down.addEventListener("click", () => setBpm(bpm - 1));
  ui.up.addEventListener("click", () => setBpm(bpm + 1));
  ui.range.addEventListener("input", () => setBpm(ui.range.value));
  ui.bpm.addEventListener("change", () => setBpm(ui.bpm.value));
  ui.meter.addEventListener("change", () => {
    const wasPlaying = playing;
    if (wasPlaying) stop();
    renderMeter();
    if (wasPlaying) start();
  });
  ui.accent.addEventListener("change", renderAccentMessage);
  ui.play.addEventListener("click", () => { if (playing) stop(); else start(); });
  document.addEventListener("visibilitychange", () => { if (document.hidden) stop(); });
  window.addEventListener("pagehide", stop);
  if (!Audio) { ui.play.disabled = true; ui.status.textContent = "Este navegador não oferece áudio para o metrônomo."; }
  const requested = new URLSearchParams(window.location.search).get("bpm");
  if (requested && /^\d{1,3}$/.test(requested) && Number(requested) >= core.minBpm && Number(requested) <= core.maxBpm) {
    setBpm(requested);
    ui.status.textContent = `${bpm} BPM recebido do Tap Tempo. Inicie para ouvir.`;
  }
  renderMeter();
})();

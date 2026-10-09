(() => {
  const core = window.RHYTHM_CORE;
  if (!core) return;
  const $ = (selector) => document.querySelector(selector);
  const ui = {
    tap: $("[data-tap]"), bpm: $("[data-tap-bpm]"), message: $("[data-tap-message]"),
    useBpm: $("[data-use-bpm]"), clear: $("[data-clear-tap]"),
  };
  if (Object.values(ui).some((node) => !node)) return;
  const tapper = new core.TapTempo();
  let measuredBpm = null;

  const render = (state) => {
    measuredBpm = state.bpm;
    ui.bpm.textContent = state.bpm === null ? "—" : String(state.bpm);
    ui.useBpm.disabled = state.bpm === null || state.bpm < core.minBpm || state.bpm > core.maxBpm;
    ui.message.textContent = state.count === 0 ? "Marque a primeira batida para começar."
      : state.count === 1 ? "Mais uma batida para calcular."
        : ui.useBpm.disabled ? `Tempo fora da faixa do metrônomo (${core.minBpm}–${core.maxBpm} BPM). Marque novamente no pulso principal.`
          : state.count < 4 ? "Continue marcando para estabilizar a estimativa."
            : `${state.count} batidas consideradas. Você já pode levar esse tempo ao metrônomo.`;
  };
  const tap = () => render(tapper.tap(performance.now()));

  ui.tap.addEventListener("click", tap);
  ui.clear.addEventListener("click", () => render(tapper.reset()));
  ui.useBpm.addEventListener("click", () => {
    if (ui.useBpm.disabled || measuredBpm === null) return;
    window.location.assign(`../metronomo/?bpm=${measuredBpm}`);
  });
  document.addEventListener("keydown", (event) => {
    if (event.repeat || event.altKey || event.ctrlKey || event.metaKey || event.isComposing) return;
    if (/^(Tab|Escape|Shift|Control|Alt|Meta|Arrow|Page|Home|End|Backspace|Delete|F\d)/.test(event.key)) return;
    const target = event.target;
    if (target === ui.tap) {
      event.preventDefault();
      tap();
      return;
    }
    if (target && typeof target.closest === "function" && target.closest("input, select, textarea, a, button, summary, [contenteditable]")) return;
    event.preventDefault();
    tap();
  });
})();

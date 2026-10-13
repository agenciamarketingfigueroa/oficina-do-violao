const cfg = window.GUIA_CONFIG;

if (cfg) {
  document.querySelectorAll("[data-price]").forEach((node) => { node.textContent = cfg.preco; });
}

const checkoutUrl = (() => {
  try {
    const url = new URL(cfg?.checkoutUrl || "");
    return ["http:", "https:"].includes(url.protocol) ? url : null;
  } catch { return null; }
})();

for (const link of document.querySelectorAll("[data-checkout]")) {
  if (checkoutUrl) {
    link.href = window.OficinaTracking.checkoutUrl(checkoutUrl);
  } else {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const message = link.parentElement.querySelector("[data-checkout-message]");
      if (message) {
        message.textContent = "O link de compra está em preparação. Volte em breve.";
        message.hidden = false;
      }
    });
  }
}

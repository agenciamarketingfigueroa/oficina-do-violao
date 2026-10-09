const cfg = window.GUIA_CONFIG;
const trackingKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "sck", "src", "fbclid"];

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
    const url = new URL(checkoutUrl);
    const incoming = new URLSearchParams(window.location.search);
    for (const key of trackingKeys) {
      if (incoming.has(key)) url.searchParams.set(key, incoming.get(key));
    }
    link.href = url.toString();
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

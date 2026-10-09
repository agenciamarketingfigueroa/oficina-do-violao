const product = window.PRODUCT_CONFIG;
const trackingKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "sck", "src", "fbclid"];

for (const node of document.querySelectorAll("[data-price]")) {
  node.textContent = product.PRODUCT_PRICE || "Preço em definição";
  node.classList.toggle("price-pending", !product.PRODUCT_PRICE);
}

let checkout = null;
try {
  const parsed = new URL(product.CHECKOUT_URL);
  if (["https:", "http:"].includes(parsed.protocol)) checkout = parsed;
} catch { /* Link ainda não configurado. */ }

for (const link of document.querySelectorAll("[data-checkout]")) {
  if (checkout) {
    const target = new URL(checkout);
    const incoming = new URLSearchParams(window.location.search);
    for (const key of trackingKeys) if (incoming.has(key)) target.searchParams.set(key, incoming.get(key));
    link.href = target.toString();
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

for (const link of document.querySelectorAll("[data-whatsapp]")) {
  link.href = product.WHATSAPP_URL;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
}

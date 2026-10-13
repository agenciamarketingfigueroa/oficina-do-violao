const offer = window.FERIAS_CONFIG;

for (const node of document.querySelectorAll("[data-price]")) node.textContent = offer.price;
for (const node of document.querySelectorAll("[data-installments]")) node.textContent = offer.installments;

for (const link of document.querySelectorAll("[data-checkout]")) {
  link.href = window.OficinaTracking.checkoutUrl(offer.checkoutUrl);
}

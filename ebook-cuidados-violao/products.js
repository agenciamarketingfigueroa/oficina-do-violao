// Links de produtos informados por Felipe. Ao alterar algum link, reexporte o PDF.
const productLinks = {
  cordasNylon: "https://link.amazon/B0gW0s1RO",
  cordasAco: "https://link.amazon/B0eP3nixS",
  afinador: "https://link.amazon/B07CCI3eW",
  alicateEncordoador: "https://link.amazon/B09tUCL4M",
};

document.querySelectorAll("[data-product]").forEach((button) => {
  const url = productLinks[button.dataset.product]?.trim();
  if (!url || !/^https:\/\//i.test(url)) return;
  const link = document.createElement("a");
  link.className = "product-button active";
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer sponsored";
  link.textContent = "VER PRODUTO ↗";
  link.setAttribute("aria-label", `Ver produto: ${button.parentElement.querySelector("strong")?.textContent || "produto"}`);
  button.replaceWith(link);
});

if (document.querySelector(".product-button.active")) {
  document.querySelector(".product-note").textContent =
    "Alguns botões contêm links de afiliado. A Oficina do Violão pode receber comissão por compras feitas por esses links, sem custo adicional para você. Confira a compatibilidade do produto com seu instrumento.";
}

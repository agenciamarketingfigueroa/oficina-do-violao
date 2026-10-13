// Guarda a atribuição apenas nesta aba para que a navegação interna não apague UTM/SCK.
(() => {
  const keys = [
    "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term",
    "utm_id", "utm_source_platform", "utm_creative_format", "utm_marketing_tactic",
    "sck", "src", "fbclid", "gclid", "gbraid", "wbraid", "ttclid",
  ];
  const storageKey = "oficina-campaign";
  const incoming = new URLSearchParams(location.search);
  const hasCampaign = keys.some((key) => incoming.has(key));
  let campaign = {};

  try {
    if (!hasCampaign) campaign = JSON.parse(sessionStorage.getItem(storageKey) || "{}");
    else {
      for (const key of keys) {
        const value = incoming.get(key);
        if (value) campaign[key] = value;
      }
      sessionStorage.setItem(storageKey, JSON.stringify(campaign));
    }
  } catch { // Navegação privada pode bloquear sessionStorage; a URL atual ainda funciona.
    for (const key of keys) {
      const value = incoming.get(key);
      if (value) campaign[key] = value;
    }
  }

  window.OficinaTracking = {
    checkoutUrl(baseUrl) {
      const url = new URL(baseUrl);
      for (const key of keys) {
        if (campaign[key]) url.searchParams.set(key, campaign[key]);
      }
      return url.toString();
    },
  };
})();

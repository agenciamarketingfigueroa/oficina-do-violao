(() => {
  const storageKey = "oficina-aluno";
  const allowedPaths = new Set([
    "/praticar/flashcards/",
    "/praticar/quiz/",
    "/praticar/nivelador/",
  ]);
  const areaPath = "/praticar/area-do-aluno/";
  const session = (() => {
    try { return JSON.parse(sessionStorage.getItem(storageKey) || "null"); }
    catch { return null; }
  })();
  const signedIn = Boolean(session && typeof session.name === "string" && session.name.trim());

  const isArea = [areaPath, `${areaPath}index.html`].includes(location.pathname);
  if (!isArea) {
    if (!signedIn) {
      const destination = new URL(areaPath, location.origin);
      destination.searchParams.set("return", allowedPaths.has(location.pathname) ? location.pathname : areaPath);
      location.replace(destination.href);
      return;
    }
    document.documentElement.classList.add("student-ready");
    return;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const login = document.querySelector("[data-student-login] form");
    const loginPanel = document.querySelector("[data-student-login]");
    const dashboard = document.querySelector("[data-student-dashboard]");
    const error = document.querySelector("[data-login-error]");
    const welcome = document.querySelector("[data-student-name]");
    const target = new URLSearchParams(location.search).get("return");
    const safeTarget = allowedPaths.has(target) ? target : null;

    function showDashboard(name) {
      loginPanel.hidden = true;
      dashboard.hidden = false;
      welcome.textContent = name;
      document.title = "Área do aluno | Oficina do Violão";
    }

    if (signedIn) {
      if (safeTarget) { location.replace(safeTarget); return; }
      showDashboard(session.name);
    }

    login.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = login.elements.name.value.trim();
      const password = login.elements.password.value;
      if (!name || !["1508", "sapTek-zofnuv-1robxo"].includes(password)) {
        error.hidden = false;
        login.elements.password.value = "";
        login.elements.password.focus();
        return;
      }
      try { sessionStorage.setItem(storageKey, JSON.stringify({ name })); }
      catch { error.textContent = "Seu navegador precisa permitir armazenamento nesta aba."; error.hidden = false; return; }
      if (safeTarget) location.replace(safeTarget);
      else showDashboard(name);
    });

    document.querySelector("[data-student-logout]").addEventListener("click", () => {
      sessionStorage.removeItem(storageKey);
      dashboard.hidden = true;
      loginPanel.hidden = false;
      login.reset();
      login.elements.name.focus();
    });
    document.documentElement.classList.add("student-ready");
  });
})();

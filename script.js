document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const stickyCta = document.querySelector(".mobile-sticky-cta");
const toast = document.querySelector("[data-toast]");

const updateScrollState = () => {
  const hasScrolled = window.scrollY > 24;
  header?.classList.toggle("scrolled", hasScrolled);
  stickyCta?.classList.toggle("visible", window.scrollY > 620);
};

updateScrollState();
window.addEventListener("scroll", updateScrollState, { passive: true });

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
  mobileNav?.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Abrir menu");
    mobileNav.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

document.querySelectorAll("[data-accordion] .faq-item button").forEach(
  (button) => {
    button.addEventListener("click", () => {
      const answer = button.nextElementSibling;
      const isExpanded = button.getAttribute("aria-expanded") === "true";

      document.querySelectorAll("[data-accordion] .faq-item button").forEach(
        (otherButton) => {
          otherButton.setAttribute("aria-expanded", "false");
          otherButton.nextElementSibling.hidden = true;
        },
      );

      if (!isExpanded) {
        button.setAttribute("aria-expanded", "true");
        answer.hidden = false;
      }
    });
  },
);

document.querySelectorAll("[data-interest-button]").forEach((button) => {
  button.addEventListener("click", () => {
    toast?.classList.add("visible");
  });
});

document.querySelector("[data-toast-close]")?.addEventListener("click", () => {
  toast?.classList.remove("visible");
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) =>
  revealObserver.observe(element)
);

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

document.querySelectorAll("[data-pending-action]").forEach((button) => {
  button.addEventListener("click", () => {
    toast?.classList.add("visible");
  });
});

document.querySelectorAll("[data-check-step]").forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("done");
    const done = button.classList.contains("done");
    button.innerHTML = done ? "Concluído <i>✓</i>" : "Marcar feito <i>✓</i>";
  });
});

const onboardingForm = document.querySelector("[data-onboarding-form]");

if (onboardingForm) {
  const steps = [...onboardingForm.querySelectorAll("[data-form-step]")];
  const nextButton = onboardingForm.querySelector("[data-form-next]");
  const backButton = onboardingForm.querySelector("[data-form-back]");
  const submitButton = onboardingForm.querySelector("[data-form-submit]");
  const progressBar = document.querySelector("[data-form-progress]");
  const currentStepLabel = document.querySelector("[data-current-step]");
  let currentStep = 0;

  const showStep = (index) => {
    steps.forEach((step, stepIndex) => {
      step.hidden = stepIndex !== index;
      step.classList.toggle("active", stepIndex === index);
    });

    currentStep = index;
    backButton.hidden = index === 0;
    nextButton.hidden = index === steps.length - 1;
    submitButton.hidden = index !== steps.length - 1;
    progressBar.style.width = `${((index + 1) / steps.length) * 100}%`;
    currentStepLabel.textContent = String(index + 1);
  };

  const isCurrentStepValid = () => {
    const fields = [
      ...steps[currentStep].querySelectorAll("input, select, textarea"),
    ];
    return fields.every((field) => field.reportValidity());
  };

  nextButton.addEventListener("click", () => {
    if (isCurrentStepValid()) {
      showStep(Math.min(currentStep + 1, steps.length - 1));
    }
  });

  backButton.addEventListener(
    "click",
    () => showStep(Math.max(currentStep - 1, 0)),
  );

  onboardingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!isCurrentStepValid()) return;
    const toastTitle = document.querySelector("[data-toast-title]");
    const toastMessage = document.querySelector("[data-toast-message]");
    if (toastTitle) toastTitle.textContent = "Diagnóstico preenchido.";
    if (toastMessage) {
      toastMessage.textContent =
        "A integração de envio será conectada à ferramenta escolhida para a turma.";
    }
    toast?.classList.add("visible");
  });

  showStep(0);
}

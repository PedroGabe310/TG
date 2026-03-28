const body = document.body;
const mobilePanel = document.querySelector("[data-mobile-panel]");
const mobileBackdrop = document.querySelector("[data-mobile-backdrop]");
const menuButtons = document.querySelectorAll("[data-menu-toggle]");
const closeMenuLinks = document.querySelectorAll("[data-close-menu]");

function setMenuState(isOpen) {
  if (!mobilePanel || !mobileBackdrop) return;

  mobilePanel.classList.toggle("is-open", isOpen);
  mobileBackdrop.classList.toggle("is-open", isOpen);
  mobilePanel.setAttribute("aria-hidden", String(!isOpen));
  body.classList.toggle("menu-open", isOpen);

  menuButtons.forEach((button) => {
    button.setAttribute("aria-expanded", String(isOpen));
  });
}

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const shouldOpen = !mobilePanel?.classList.contains("is-open");
    setMenuState(Boolean(shouldOpen));
  });
});

mobileBackdrop?.addEventListener("click", () => setMenuState(false));
closeMenuLinks.forEach((link) => link.addEventListener("click", () => setMenuState(false)));

const spotlightSlides = Array.from(document.querySelectorAll("[data-spotlight-slide]"));
const spotlightDots = Array.from(document.querySelectorAll("[data-spotlight-dot]"));
const prevButton = document.querySelector("[data-spotlight-prev]");
const nextButton = document.querySelector("[data-spotlight-next]");
let spotlightIndex = 0;
let spotlightTimer;

function renderSpotlight(index) {
  if (!spotlightSlides.length) return;

  spotlightIndex = (index + spotlightSlides.length) % spotlightSlides.length;

  spotlightSlides.forEach((slide, currentIndex) => {
    slide.classList.toggle("is-active", currentIndex === spotlightIndex);
  });

  spotlightDots.forEach((dot, currentIndex) => {
    dot.classList.toggle("is-active", currentIndex === spotlightIndex);
  });
}

function restartSpotlightTimer() {
  if (!spotlightSlides.length) return;

  window.clearInterval(spotlightTimer);
  spotlightTimer = window.setInterval(() => {
    renderSpotlight(spotlightIndex + 1);
  }, 5000);
}

if (spotlightSlides.length) {
  renderSpotlight(0);
  restartSpotlightTimer();

  prevButton?.addEventListener("click", () => {
    renderSpotlight(spotlightIndex - 1);
    restartSpotlightTimer();
  });

  nextButton?.addEventListener("click", () => {
    renderSpotlight(spotlightIndex + 1);
    restartSpotlightTimer();
  });

  spotlightDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      renderSpotlight(Number(dot.dataset.index || 0));
      restartSpotlightTimer();
    });
  });
}

document.querySelectorAll("[data-filter-group]").forEach((group) => {
  const scope = group.closest(".catalog-shell") || document;
  const cards = Array.from(scope.querySelectorAll("[data-filter-card]"));
  const buttons = Array.from(group.querySelectorAll("[data-filter]"));

  const applyFilter = (filter) => {
    buttons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.filter === filter);
    });

    cards.forEach((card) => {
      const categories = (card.dataset.category || "").split(" ").filter(Boolean);
      const matches = filter === "all" || categories.includes(filter);
      card.hidden = !matches;
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      applyFilter(button.dataset.filter || "all");
    });
  });

  applyFilter("all");
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll("[data-current-year]").forEach((yearNode) => {
  yearNode.textContent = String(new Date().getFullYear());
});

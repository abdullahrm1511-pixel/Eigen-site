const OWNER_EMAIL = "arstudiowebdesign@gmail.com";
const WHATSAPP_NUMBER = "31648363929";
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const revealItems = document.querySelectorAll("[data-reveal]");

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
}

const interactiveCards = document.querySelectorAll(".step-card, .service-card, .design-board, .live-panel");

if (!prefersReducedMotion && hasFinePointer) {
  interactiveCards.forEach((card) => {
    card.classList.add("tilt-card");

    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      card.style.setProperty("--tilt-x", `${x * 5}deg`);
      card.style.setProperty("--tilt-y", `${y * -5}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });
}

if (!prefersReducedMotion && hasFinePointer) {
  document.addEventListener("pointermove", (event) => {
    document.body.style.setProperty("--cursor-x", `${event.clientX}px`);
    document.body.style.setProperty("--cursor-y", `${event.clientY}px`);
  });
}

const form = document.querySelector("#requestForm");
const status = document.querySelector("#formStatus");
const whatsappFloat = document.querySelector(".whatsapp-float");
const magneticButtons = document.querySelectorAll(".button, .header-cta, .whatsapp-float");
const themeButtons = document.querySelectorAll("[data-theme-choice]");
const labButtons = document.querySelectorAll("[data-lab-mode]");
const liveVisual = document.querySelector(".live-visual");
const labTitle = document.querySelector("#labTitle");
const labText = document.querySelector("#labText");
const labStage = document.querySelector("#labStage");

const labModes = {
  websites: {
    title: "Premium website",
    text: "Een high-end landingpage met glow, glass en conversiegericht contact.",
    logo: "AR",
    codes: ["hero()", "convert()", "launch()"],
  },
  backend: {
    title: "Backend systeem",
    text: "Een strak dashboardgevoel met workflows, data en beheer achter de schermen.",
    logo: "{ }",
    codes: ["api()", "auth()", "sync()"],
  },
  logos: {
    title: "Logo identity",
    text: "Een merkbeeld dat direct herkenbaar voelt en doorloopt in website, app en socials.",
    logo: "A",
    codes: ["mark()", "type()", "brand()"],
  },
  apps: {
    title: "App concept",
    text: "Mobile-first schermen met een klikbaar productgevoel voordat de app gebouwd is.",
    logo: "UI",
    codes: ["tap()", "flow()", "ship()"],
  },
};

const updateScrollProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;

  document.body.style.setProperty("--scroll-progress", `${progress}%`);
};

window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

if (!prefersReducedMotion && hasFinePointer) {
  magneticButtons.forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      button.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
    });

    button.addEventListener("pointerleave", () => {
      button.style.transform = "";
    });
  });
}

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const theme = button.dataset.themeChoice;

    document.body.dataset.theme = theme === "amber" ? "" : theme;
    themeButtons.forEach((item) => item.classList.toggle("is-active", item === button));
  });
});

labButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const mode = button.dataset.labMode;
    const content = labModes[mode];

    if (!content || !liveVisual || !labTitle || !labText || !labStage) return;

    liveVisual.dataset.mode = mode;
    labTitle.textContent = content.title;
    labText.textContent = content.text;
    labStage.querySelector(".live-logo").textContent = content.logo;
    labStage.querySelectorAll(".live-code code").forEach((code, index) => {
      code.textContent = content.codes[index] || content.codes[0];
    });
    labButtons.forEach((item) => item.classList.toggle("is-active", item === button));
  });
});

if (!prefersReducedMotion && hasFinePointer) {
  document.addEventListener("click", (event) => {
    const spark = document.createElement("span");

    spark.className = "click-spark";
    spark.style.left = `${event.clientX}px`;
    spark.style.top = `${event.clientY}px`;
    document.body.appendChild(spark);
    window.setTimeout(() => spark.remove(), 560);
  });
}

const buildMessage = (data) =>
  [
    "Hoi AR Studio Webdesign, ik wil graag een website aanvragen.",
    "",
    `Naam: ${data.get("naam") || ""}`,
    `E-mail: ${data.get("email") || ""}`,
    `Dienst: ${data.get("dienst") || ""}`,
    "",
    `Bericht: ${data.get("bericht") || ""}`,
  ].join("\n");

form.addEventListener("input", () => {
  const data = new FormData(form);
  const message = encodeURIComponent(buildMessage(data));

  whatsappFloat.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
});

form.addEventListener("submit", (event) => {
  form.action = `https://formsubmit.co/${OWNER_EMAIL}`;
  status.textContent = "Je aanvraag wordt verzonden naar AR Studio Webdesign...";
});

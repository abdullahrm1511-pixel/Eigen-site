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
const formSubmitFrame = document.querySelector('iframe[name="formSubmitFrame"]');
const whatsappFloat = document.querySelector(".whatsapp-float");
const magneticButtons = document.querySelectorAll(".button, .header-cta, .whatsapp-float");
const themeButtons = document.querySelectorAll("[data-theme-choice]");
const labButtons = document.querySelectorAll("[data-lab-choice]");
const liveVisual = document.querySelector(".live-visual");
const labTitle = document.querySelector("#labTitle");
const labText = document.querySelector("#labText");
const labStage = document.querySelector("#labStage");
const labLogo = document.querySelector("#labLogo");
const surpriseLab = document.querySelector("#surpriseLab");
const labBuildButton = document.querySelector("#labBuildButton");

const labState = {
  audience: "creator",
  style: "dark mode",
  build: "portfolio",
};

const styleDetails = {
  "premium": {
    mood: "premium details, rustige luxe en sterke typografie",
    logo: "PR",
    codes: ["luxury()", "trust()", "launch()"],
  },
  "futuristic": {
    mood: "futuristische UI, lichte glow en slimme micro-animaties",
    logo: "FX",
    codes: ["future()", "scan()", "ship()"],
  },
  "dark mode": {
    mood: "cinematic scroll, grote visuals en een bold intro",
    logo: "DM",
    codes: ["vibe()", "motion()", "build()"],
  },
  "clean business": {
    mood: "heldere secties, rustige contentblokken en een directe call-to-action",
    logo: "CB",
    codes: ["clarity()", "flow()", "lead()"],
  },
  "streetwear": {
    mood: "editorial layouts, rauwe typografie en drop-energie",
    logo: "SW",
    codes: ["drop()", "hype()", "sell()"],
  },
  "neon": {
    mood: "neon contrast, glitch-effecten en een opvallende eerste klik",
    logo: "NX",
    codes: ["glow()", "pulse()", "drop()"],
  },
  "minimal": {
    mood: "veel witruimte, heldere opbouw en subtiele beweging",
    logo: "MN",
    codes: ["clean()", "space()", "focus()"],
  },
  "bold": {
    mood: "grote typografie, sterke statements en een intro die blijft hangen",
    logo: "BD",
    codes: ["impact()", "type()", "go()"],
  },
};

const randomConcepts = [
  {
    audience: "random idee",
    style: "neon",
    build: "landing page",
    text: "Een neon landingspagina voor een sneaker drop met glitch-effecten, countdown en snelle checkout-vibe.",
  },
  {
    audience: "personal brand",
    style: "premium",
    build: "website",
    text: "Een premium personal-brand site voor een jonge ondernemer met smooth animations en grote typografie.",
  },
  {
    audience: "artiest",
    style: "dark mode",
    build: "portfolio",
    text: "Een dark portfolio voor een fotograaf met cinematic intro, fullscreen visuals en een stille luxe feel.",
  },
  {
    audience: "student",
    style: "futuristic",
    build: "app idea",
    text: "Een futuristisch app concept voor een student met swipe-flow, zachte glow en een prototype dat meteen duidelijk voelt.",
  },
  {
    audience: "bedrijf",
    style: "clean business",
    build: "website",
    text: "Een clean business website voor een bedrijf met heldere diensten, vertrouwen opbouwende secties en een directe aanvraagroute.",
  },
  {
    audience: "creator",
    style: "streetwear",
    build: "online profiel",
    text: "Een streetwear online profiel voor een creator met drop-cards, bold visuals en een social-first layout.",
  },
];

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

const setActiveLabButton = (group, value) => {
  labButtons.forEach((button) => {
    if (button.dataset.labChoice === group) {
      button.classList.toggle("is-active", button.dataset.value === value);
    }
  });
};

const buildLabConcept = () => {
  const detail = styleDetails[labState.style] || styleDetails["dark mode"];
  return `Een ${labState.style} ${labState.build} voor een ${labState.audience} met ${detail.mood}.`;
};

const updateLabPreview = (customText) => {
  if (!liveVisual || !labTitle || !labText || !labStage || !labLogo) return;

  const detail = styleDetails[labState.style] || styleDetails["dark mode"];

  labStage.classList.remove("is-rebuilding");
  liveVisual.dataset.style = labState.style.replace(/\s+/g, "-");
  labTitle.textContent = `${labState.style} ${labState.build}`;
  labLogo.textContent = detail.logo;
  labText.textContent = customText || buildLabConcept();
  labStage.querySelectorAll(".live-code code").forEach((code, index) => {
    code.textContent = detail.codes[index] || detail.codes[0];
  });
  window.requestAnimationFrame(() => {
    labStage.classList.add("is-rebuilding");
  });
};

labButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.dataset.labChoice;
    const value = button.dataset.value;

    if (!group || !value) return;

    labState[group] = value;
    setActiveLabButton(group, value);
    updateLabPreview();
  });
});

surpriseLab?.addEventListener("click", () => {
  const concept = randomConcepts[Math.floor(Math.random() * randomConcepts.length)];

  labState.audience = concept.audience;
  labState.style = concept.style;
  labState.build = concept.build;
  setActiveLabButton("audience", concept.audience);
  setActiveLabButton("style", concept.style);
  setActiveLabButton("build", concept.build);
  updateLabPreview(concept.text);
});

labBuildButton?.addEventListener("click", () => {
  const serviceSelect = form?.querySelector('select[name="dienst"]');
  const messageField = form?.querySelector('textarea[name="bericht"]');

  if (serviceSelect && labState.build.includes("landing")) {
    serviceSelect.value = "Landingspagina";
  } else if (serviceSelect) {
    serviceSelect.value = "Nieuwe website";
  }

  if (messageField && labText) {
    messageField.value = `Ik wil dit concept laten bouwen: ${labText.textContent}`;
    form.dispatchEvent(new Event("input"));
  }
});

updateLabPreview();

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
    "Hoi AR Studio, ik wil graag een digitale ervaring aanvragen.",
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

let formHasSubmitted = false;
const submitButton = form?.querySelector('button[type="submit"]');
const originalSubmitText = submitButton?.textContent || "Verstuur aanvraag";

form.addEventListener("submit", () => {
  formHasSubmitted = true;
  form.action = `https://formsubmit.co/${OWNER_EMAIL}`;
  status.classList.remove("is-success", "is-error");
  status.textContent = "Je aanvraag wordt verzonden naar AR Studio...";

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Versturen...";
  }
});

formSubmitFrame?.addEventListener("load", () => {
  if (!formHasSubmitted) return;

  formHasSubmitted = false;
  form.reset();
  whatsappFloat.href = `https://wa.me/${WHATSAPP_NUMBER}`;
  status.classList.add("is-success");
  status.textContent = "Gelukt. Je aanvraag is verstuurd en komt binnen in mijn inbox.";

  if (submitButton) {
    submitButton.disabled = false;
    submitButton.textContent = originalSubmitText;
  }
});

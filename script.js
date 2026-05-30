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
    mood: "premium details, quiet luxury, and strong typography",
    logo: "PR",
    codes: ["luxury()", "trust()", "launch()"],
  },
  "futuristic": {
    mood: "futuristic UI, soft glow, and smart micro-animations",
    logo: "FX",
    codes: ["future()", "scan()", "ship()"],
  },
  "dark mode": {
    mood: "cinematic scroll, big visuals, and a bold intro",
    logo: "DM",
    codes: ["vibe()", "motion()", "build()"],
  },
  "clean business": {
    mood: "clear sections, calm content blocks, and a direct call-to-action",
    logo: "CB",
    codes: ["clarity()", "flow()", "lead()"],
  },
  "streetwear": {
    mood: "editorial layouts, raw typography, and drop energy",
    logo: "SW",
    codes: ["drop()", "hype()", "sell()"],
  },
  "neon": {
    mood: "neon contrast, glitch effects, and a first click that stands out",
    logo: "NX",
    codes: ["glow()", "pulse()", "drop()"],
  },
  "minimal": {
    mood: "wide spacing, clear structure, and subtle motion",
    logo: "MN",
    codes: ["clean()", "space()", "focus()"],
  },
  "bold": {
    mood: "large typography, strong statements, and an intro that sticks",
    logo: "BD",
    codes: ["impact()", "type()", "go()"],
  },
};

const randomConcepts = [
  {
    audience: "random idea",
    style: "neon",
    build: "landing page",
    text: "A neon landing page for a sneaker drop with glitch effects, a countdown, and a fast checkout vibe.",
  },
  {
    audience: "personal brand",
    style: "premium",
    build: "website",
    text: "A premium personal-brand site for a young entrepreneur with smooth animations and large typography.",
  },
  {
    audience: "artist",
    style: "dark mode",
    build: "portfolio",
    text: "A dark portfolio for a photographer with a cinematic intro, fullscreen visuals, and a quiet luxury feel.",
  },
  {
    audience: "student",
    style: "futuristic",
    build: "app idea",
    text: "A futuristic app concept for a student with swipe flow, soft glow, and a prototype that feels instantly clear.",
  },
  {
    audience: "business",
    style: "clean business",
    build: "website",
    text: "A clean business website for a company with clear services, trust-building sections, and a direct request route.",
  },
  {
    audience: "creator",
    style: "streetwear",
    build: "online profile",
    text: "A streetwear online profile for a creator with drop cards, bold visuals, and a social-first layout.",
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
  return `A ${labState.style} ${labState.build} for a ${labState.audience} with ${detail.mood}.`;
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
  const serviceSelect = form?.querySelector('select[name="service"]');
  const messageField = form?.querySelector('textarea[name="message"]');

  if (serviceSelect && labState.build.includes("landing")) {
    serviceSelect.value = "Landing page";
  } else if (serviceSelect) {
    serviceSelect.value = "New website";
  }

  if (messageField && labText) {
    messageField.value = `I want this concept built: ${labText.textContent}`;
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
    "Hi AR Studio, I would like to request a digital experience.",
    "",
    `Name: ${data.get("name") || ""}`,
    `Email: ${data.get("email") || ""}`,
    `Service: ${data.get("service") || ""}`,
    "",
    `Message: ${data.get("message") || ""}`,
  ].join("\n");

form.addEventListener("input", () => {
  const data = new FormData(form);
  const message = encodeURIComponent(buildMessage(data));

  whatsappFloat.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
});

let formHasSubmitted = false;
const submitButton = form?.querySelector('button[type="submit"]');
const originalSubmitText = submitButton?.textContent || "Send request";

form.addEventListener("submit", () => {
  formHasSubmitted = true;
  form.action = `https://formsubmit.co/${OWNER_EMAIL}`;
  status.classList.remove("is-success", "is-error");
  status.textContent = "Your request is being sent to AR Studio...";

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
  }
});

formSubmitFrame?.addEventListener("load", () => {
  if (!formHasSubmitted) return;

  formHasSubmitted = false;
  form.reset();
  whatsappFloat.href = `https://wa.me/${WHATSAPP_NUMBER}`;
  status.classList.add("is-success");
  status.textContent = "Done. Your request has been sent and will land in my inbox.";

  if (submitButton) {
    submitButton.disabled = false;
    submitButton.textContent = originalSubmitText;
  }
});
/* StudioLab Live Build Upgrade */

const activateStudioMode = document.querySelector("#activateStudioMode");
const closeStudioToolbar = document.querySelector("#closeStudioToolbar");
const motionRange = document.querySelector("#motionRange");
const glowRange = document.querySelector("#glowRange");
const layoutButtons = document.querySelectorAll("[data-layout-mode]");
const heroHeadline = document.querySelector("#heroHeadline");
const heroText = document.querySelector("#heroText");
const briefTitle = document.querySelector("#briefTitle");
const briefFeel = document.querySelector("#briefFeel");
const briefLayout = document.querySelector("#briefLayout");
const briefRoute = document.querySelector("#briefRoute");

let studioInteractionStarted = false;

const studioHeroCopies = {
  business: {
    website: "A sharp business website built to turn trust into real requests.",
    "landing page": "A focused landing page made to explain, convince, and convert fast.",
    "app idea": "A practical app concept that makes your business system feel easy to use.",
  },
  artist: {
    portfolio: "A cinematic portfolio that makes your work feel impossible to ignore.",
    website: "An artist website with movement, atmosphere, and a memorable first impression.",
  },
  creator: {
    portfolio: "A creator portfolio with motion, proof, and a scroll flow that keeps people watching.",
    "online profile": "A bold creator profile with social-first energy and a premium digital vibe.",
  },
  student: {
    "app idea": "A futuristic app concept that turns your idea into something people can instantly understand.",
    portfolio: "A sharp student portfolio that makes projects, skills, and ambition feel professional.",
  },
  "personal brand": {
    website: "A personal-brand website that turns your story, proof, and offer into one strong presence.",
    "online profile": "A premium online profile that makes your name feel like a brand.",
  },
  "random idea": {
    "landing page": "A wild landing page that gives even a random idea a serious launch feeling.",
  },
};

const studioSlugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const triggerSiteRebuild = () => {
  if (typeof prefersReducedMotion !== "undefined" && prefersReducedMotion) return;

  document.body.classList.remove("is-rebuilding-site");
  void document.body.offsetWidth;
  document.body.classList.add("is-rebuilding-site");
};

const updateGlobalStudioLook = () => {
  if (typeof labState === "undefined") return;

  const styleSlug = studioSlugify(labState.style);
  const audienceSlug = studioSlugify(labState.audience);
  const buildSlug = studioSlugify(labState.build);

  document.body.dataset.vibe = styleSlug;
  document.body.dataset.audience = audienceSlug;
  document.body.dataset.build = buildSlug;

  const headline =
    studioHeroCopies[labState.audience]?.[labState.build] ||
    `A ${labState.style} ${labState.build} that makes your ${labState.audience} idea feel ready to launch.`;

  if (!studioInteractionStarted && !document.body.classList.contains("studio-mode")) return;

  if (heroHeadline) {
    heroHeadline.textContent = headline;
  }

  if (heroText) {
    heroText.textContent = `StudioLab is previewing a ${labState.style} ${labState.build} for a ${labState.audience}. The full page now adapts in real time, from color and motion to the request flow.`;
  }
};

const updateStudioBrief = () => {
  if (
    typeof labState === "undefined" ||
    typeof styleDetails === "undefined" ||
    !briefTitle ||
    !briefFeel ||
    !briefLayout ||
    !briefRoute
  ) {
    return;
  }

  const detail = styleDetails[labState.style] || styleDetails["dark mode"];

  briefTitle.textContent = `${labState.style} ${labState.build} for a ${labState.audience}`;
  briefFeel.textContent = detail.mood;
  briefLayout.textContent = `A ${labState.build} with animated sections, live UI layers, and mobile-first flow.`;
  briefRoute.textContent = `${labState.audience} intro → visual proof → interactive preview → direct request`;
};

const syncStudioRequest = () => {
  if (typeof form === "undefined" || typeof labState === "undefined") return;

  const serviceSelect = form?.querySelector('select[name="service"]');
  const messageField = form?.querySelector('textarea[name="message"]');

  if (serviceSelect) {
    if (labState.build.includes("landing")) {
      serviceSelect.value = "Landing page";
    } else if (labState.build.includes("restyle")) {
      serviceSelect.value = "Website restyle";
    } else {
      serviceSelect.value = "New website";
    }
  }

  if (messageField && typeof labText !== "undefined" && labText) {
    messageField.value = `StudioLab direction: ${labText.textContent}

Audience: ${labState.audience}
Vibe: ${labState.style}
Build: ${labState.build}

I want the website to feel interactive, premium and custom.`;

    form?.dispatchEvent(new Event("input"));
  }
};

const studioRefresh = () => {
  updateGlobalStudioLook();
  updateStudioBrief();
  triggerSiteRebuild();
};

document.querySelectorAll("[data-lab-choice]").forEach((button) => {
  button.addEventListener("click", () => {
    studioInteractionStarted = true;

    window.setTimeout(() => {
      studioRefresh();

      if (document.body.classList.contains("studio-mode")) {
        syncStudioRequest();
      }
    }, 10);
  });
});

document.querySelector("#surpriseLab")?.addEventListener("click", () => {
  studioInteractionStarted = true;

  window.setTimeout(() => {
    studioRefresh();

    if (document.body.classList.contains("studio-mode")) {
      syncStudioRequest();
    }
  }, 10);
});

document.querySelector("#labBuildButton")?.addEventListener("click", () => {
  syncStudioRequest();
});

activateStudioMode?.addEventListener("click", () => {
  studioInteractionStarted = true;
  document.body.classList.add("studio-mode");
  studioRefresh();
  syncStudioRequest();
});

closeStudioToolbar?.addEventListener("click", () => {
  document.body.classList.remove("studio-mode");
});

motionRange?.addEventListener("input", () => {
  document.body.style.setProperty("--studio-motion", motionRange.value);
});

glowRange?.addEventListener("input", () => {
  document.body.style.setProperty("--studio-glow", `${glowRange.value / 100}`);
});

layoutButtons.forEach((button) => {
  button.addEventListener("click", () => {
    document.body.dataset.layoutMode = button.dataset.layoutMode;

    layoutButtons.forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });

    triggerSiteRebuild();
  });
});

studioRefresh();

/* ================================
   MEGA THEME REACTOR
================================ */

const megaThemeButtons = document.querySelectorAll("[data-theme-choice]");
const activeThemeName = document.querySelector("#activeThemeName");
const randomThemeButton = document.querySelector("#randomTheme");
const cycleThemeButton = document.querySelector("#cycleTheme");
const insaneModeButton = document.querySelector("#insaneMode");

const megaThemes = [
  "amber",
  "cyber",
  "luxe",
  "neon",
  "glacier",
  "inferno",
  "toxic",
  "candy",
  "matrix",
  "midnight",
  "royal",
  "mono",
];

const themeLabels = {
  amber: "Amber",
  cyber: "Cyber",
  luxe: "Luxe",
  neon: "Neon",
  glacier: "Glacier",
  inferno: "Inferno",
  toxic: "Toxic",
  candy: "Candy",
  matrix: "Matrix",
  midnight: "Midnight",
  royal: "Royal",
  mono: "Mono",
};

let themeCycleTimer = null;
let currentThemeIndex = 0;

const triggerThemeBurst = () => {
  if (typeof prefersReducedMotion !== "undefined" && prefersReducedMotion) return;

  document.body.classList.remove("theme-bursting");
  void document.body.offsetWidth;
  document.body.classList.add("theme-bursting");

  window.setTimeout(() => {
    document.body.classList.remove("theme-bursting");
  }, 820);
};

const setMegaTheme = (theme) => {
  if (!megaThemes.includes(theme)) return;

  currentThemeIndex = megaThemes.indexOf(theme);

  if (theme === "amber") {
    document.body.dataset.theme = "";
  } else {
    document.body.dataset.theme = theme;
  }

  megaThemeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.themeChoice === theme);
  });

  if (activeThemeName) {
    activeThemeName.textContent = themeLabels[theme] || theme;
  }

  triggerThemeBurst();

  if (document.body.classList.contains("studio-mode")) {
    document.body.dataset.vibe = theme;
  }
};

megaThemeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setMegaTheme(button.dataset.themeChoice);
  });
});

randomThemeButton?.addEventListener("click", () => {
  const nextTheme = megaThemes[Math.floor(Math.random() * megaThemes.length)];
  setMegaTheme(nextTheme);
});

cycleThemeButton?.addEventListener("click", () => {
  const isCycling = Boolean(themeCycleTimer);

  if (isCycling) {
    window.clearInterval(themeCycleTimer);
    themeCycleTimer = null;
    cycleThemeButton.classList.remove("is-active");
    cycleThemeButton.textContent = "Cycle";
    return;
  }

  cycleThemeButton.classList.add("is-active");
  cycleThemeButton.textContent = "Stop";

  themeCycleTimer = window.setInterval(() => {
    currentThemeIndex = (currentThemeIndex + 1) % megaThemes.length;
    setMegaTheme(megaThemes[currentThemeIndex]);
  }, 1600);
});

insaneModeButton?.addEventListener("click", () => {
  document.body.classList.toggle("insane-mode");
  insaneModeButton.classList.toggle("is-active", document.body.classList.contains("insane-mode"));

  if (document.body.classList.contains("insane-mode")) {
    triggerThemeBurst();
  }
});

/* Keyboard shortcut: press T for random theme, I for insane mode */
document.addEventListener("keydown", (event) => {
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement) {
    return;
  }

  if (event.key.toLowerCase() === "t") {
    const nextTheme = megaThemes[Math.floor(Math.random() * megaThemes.length)];
    setMegaTheme(nextTheme);
  }

  if (event.key.toLowerCase() === "i") {
    insaneModeButton?.click();
  }
});

setMegaTheme("amber");
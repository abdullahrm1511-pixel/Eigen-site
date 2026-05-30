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

form?.addEventListener("input", () => {
  const data = new FormData(form);
  const message = encodeURIComponent(buildMessage(data));

  if (whatsappFloat) {
    whatsappFloat.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  }
});

let formHasSubmitted = false;
const submitButton = form?.querySelector('button[type="submit"]');
const originalSubmitText = submitButton?.textContent || "Send request";

form?.addEventListener("submit", () => {
  formHasSubmitted = true;
  form.action = `https://formsubmit.co/${OWNER_EMAIL}`;
  status?.classList.remove("is-success", "is-error");
  if (status) {
    status.textContent = "Your request is being sent to AR Studio...";
  }

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
  }
});

formSubmitFrame?.addEventListener("load", () => {
  if (!formHasSubmitted) return;

  formHasSubmitted = false;
  form.reset();
  if (whatsappFloat) {
    whatsappFloat.href = `https://wa.me/${WHATSAPP_NUMBER}`;
  }
  status?.classList.add("is-success");
  if (status) {
    status.textContent = "Done. Your request has been sent and will land in my inbox.";
  }

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
  briefRoute.textContent = `${labState.audience} intro -> visual proof -> interactive preview -> direct request`;
};

const syncStudioRequest = () => {
  if (typeof form === "undefined" || typeof labState === "undefined") return;

  const serviceSelect = form?.querySelector('select[name="service"]');
  const messageField = form?.querySelector('textarea[name="message"]');
  const recommendation =
    typeof getPackageRecommendation === "function"
      ? getPackageRecommendation()
      : { package: labState.build.includes("landing") ? "Landing page" : "Starter website" };

  if (serviceSelect) {
    if (recommendation.package.includes("Landing") || labState.build.includes("landing")) {
      serviceSelect.value = "Landing page";
    } else if (recommendation.package.includes("backend") || recommendation.package.includes("app")) {
      serviceSelect.value = "I'm not sure yet";
    } else if (labState.build.includes("restyle")) {
      serviceSelect.value = "Website restyle";
    } else {
      serviceSelect.value = "New website";
    }
  }

  if (messageField && typeof labText !== "undefined" && labText) {
    messageField.value =
      typeof buildStudioBrief === "function"
        ? buildStudioBrief()
        : `StudioLab direction: ${labText.textContent}`;

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

/* StudioLab All Out Upgrade */

const studioAllOutState = {
  preset: "",
  device: "desktop",
  beforeAfter: 68,
  touched: {
    audience: false,
    style: false,
    build: false,
  },
};

const presetProfiles = {
  Restaurant: {
    audience: "business",
    title: "A warm restaurant website that turns hungry visitors into bookings.",
    subtitle: "Menu highlights, atmosphere, reviews, and a fast reservation or WhatsApp route.",
    cards: ["Menu preview", "Table booking", "Reviews and location"],
    cta: "Reserve a table",
    route: "Taste -> menu -> trust -> booking",
    bestFor: "Local hospitality and reservation flow",
  },
  Barbershop: {
    audience: "business",
    title: "A premium barbershop website with a luxury booking flow.",
    subtitle: "Strong visuals, service prices, barber proof, and mobile-first WhatsApp booking.",
    cards: ["Signature cuts", "Price clarity", "Book by WhatsApp"],
    cta: "Book a cut",
    route: "Style -> services -> proof -> booking",
    bestFor: "Appointments, pricing, and local trust",
  },
  Coach: {
    audience: "personal brand",
    title: "A calm coaching landing page that makes the next step clear.",
    subtitle: "Positioning, proof, intake CTA, and a focused story that feels trustworthy.",
    cards: ["Clear promise", "Client results", "Intake route"],
    cta: "Book an intake",
    route: "Promise -> proof -> method -> intake",
    bestFor: "Personal services with a clear intake",
  },
  "Real estate": {
    audience: "business",
    title: "A trustworthy real estate website built around listings and leads.",
    subtitle: "Premium property cards, valuation CTA, social proof, and direct contact.",
    cards: ["Property showcase", "Valuation CTA", "Local authority"],
    cta: "Request valuation",
    route: "Listings -> trust -> valuation -> contact",
    bestFor: "Lead generation and property presentation",
  },
  "Mosque / Foundation": {
    audience: "business",
    title: "A clean foundation website with trust, donations, and community updates.",
    subtitle: "Clear mission, events, donation route, and contact for volunteers or visitors.",
    cards: ["Mission clarity", "Donation flow", "Community updates"],
    cta: "Support the mission",
    route: "Mission -> activities -> donate -> contact",
    bestFor: "Community trust and donation/contact flow",
  },
  Fitness: {
    audience: "business",
    title: "A high-energy fitness site that pushes visitors toward their first session.",
    subtitle: "Programs, trainer proof, transformation blocks, and a trial-session CTA.",
    cards: ["Programs", "Transformations", "Trial session"],
    cta: "Start training",
    route: "Energy -> programs -> proof -> trial",
    bestFor: "Membership, programs, and trial requests",
  },
  "E-commerce": {
    audience: "business",
    title: "A product-focused shop concept with futuristic buying energy.",
    subtitle: "Featured drops, product proof, fast category flow, and a checkout-ready CTA.",
    cards: ["Hero product", "Drop cards", "Fast checkout"],
    cta: "Shop the drop",
    route: "Product -> benefits -> drop -> checkout",
    bestFor: "Product sales and online conversion",
  },
  "Cleaning company": {
    audience: "business",
    title: "A professional cleaning website that makes requesting a quote easy.",
    subtitle: "Service areas, trust proof, before/after blocks, and a clear quote route.",
    cards: ["Service areas", "Before / after", "Quote request"],
    cta: "Request a quote",
    route: "Services -> proof -> areas -> quote",
    bestFor: "Local service requests and trust",
  },
  "Car company": {
    audience: "business",
    title: "A sharp automotive website for inventory, trust, and quick enquiries.",
    subtitle: "Vehicle cards, finance/contact routes, and mobile-first WhatsApp enquiries.",
    cards: ["Inventory cards", "Finance route", "WhatsApp enquiry"],
    cta: "Ask about a car",
    route: "Inventory -> specs -> trust -> enquiry",
    bestFor: "Inventory and lead capture",
  },
  "Personal trainer": {
    audience: "personal brand",
    title: "A bold trainer website that turns motivation into intake requests.",
    subtitle: "Programs, proof, transformation stories, and a direct mobile contact route.",
    cards: ["Program offers", "Client proof", "Intake CTA"],
    cta: "Plan my intake",
    route: "Goal -> plan -> proof -> intake",
    bestFor: "Personal brand and fitness leads",
  },
};

const styleTone = {
  premium: "luxurious, trustworthy and editorial",
  futuristic: "fast, technical and product-focused",
  "dark mode": "cinematic, bold and visual",
  "clean business": "clear, reliable and conversion-focused",
  streetwear: "bold, social-first and culture-driven",
  neon: "energetic, glowing and launch-ready",
  minimal: "calm, focused and easy to understand",
  bold: "confident, loud and memorable",
};

const allOutEls = {
  presetButtons: document.querySelectorAll("[data-studio-preset]"),
  deviceButtons: document.querySelectorAll("[data-studio-device]"),
  generateDirectionButton: document.querySelector("#generateDirectionButton"),
  exportVibeButton: document.querySelector("#exportVibeButton"),
  generatedPreview: document.querySelector("#generatedSitePreview"),
  generatedDomain: document.querySelector("#generatedDomain"),
  generatedEyebrow: document.querySelector("#generatedEyebrow"),
  generatedHeroTitle: document.querySelector("#generatedHeroTitle"),
  generatedSubtitle: document.querySelector("#generatedSubtitle"),
  generatedCta: document.querySelector("#generatedCta"),
  generatedCards: [
    document.querySelector("#generatedCardOne"),
    document.querySelector("#generatedCardTwo"),
    document.querySelector("#generatedCardThree"),
  ],
  generatedRoute: document.querySelector("#generatedRoute"),
  dnaMeters: document.querySelectorAll("[data-dna-meter]"),
  buildConsole: document.querySelector("#buildConsole"),
  recommendedPackage: document.querySelector("#recommendedPackage"),
  recommendedBudget: document.querySelector("#recommendedBudget"),
  recommendedTimeline: document.querySelector("#recommendedTimeline"),
  recommendedBestFor: document.querySelector("#recommendedBestFor"),
  recommendedReason: document.querySelector("#recommendedReason"),
  buildTimeline: document.querySelector(".build-timeline"),
  comparisonRange: document.querySelector("#comparisonRange"),
  comparisonValue: document.querySelector("#comparisonValue"),
  comparisonFrame: document.querySelector(".comparison-frame"),
  exportSummary: document.querySelector("#exportSummary"),
  copyBriefButton: document.querySelector("#copyBriefButton"),
  whatsappBriefButton: document.querySelector("#whatsappBriefButton"),
  putInFormButton: document.querySelector("#putInFormButton"),
  briefActionStatus: document.querySelector("#briefActionStatus"),
};

let buildConsoleTimers = [];

const titleCase = (value) =>
  value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const getStudioProfile = () => {
  const preset = presetProfiles[studioAllOutState.preset];
  const audience = preset?.audience || labState.audience;
  const style = labState.style;
  const build = labState.build;
  const tone = styleTone[style] || "premium, clear and modern";
  const label = studioAllOutState.preset || audience;
  const genericTitle = `A ${style} ${build} for a ${label} that feels ready to launch.`;
  const genericSubtitle = `A ${tone} direction with proof, mobile flow, and one clear request path.`;
  const cards = preset?.cards || ["Strong first impression", "Trust and proof blocks", "Clear contact route"];

  return {
    preset: studioAllOutState.preset,
    audience,
    label,
    style,
    build,
    tone,
    title: preset?.title || genericTitle,
    subtitle: preset?.subtitle || genericSubtitle,
    cards,
    cta: preset?.cta || (build.includes("app") ? "View the concept" : "Start the request"),
    route: preset?.route || `${titleCase(audience)} intro -> proof -> offer -> contact`,
    bestFor: preset?.bestFor || "A clear first version with room to grow",
    device: studioAllOutState.device,
  };
};

const clampPercent = (value) => Math.max(5, Math.min(100, value));

const getStudioCompletion = () => {
  const touched = studioAllOutState.touched || {};
  const completed = ["audience", "style", "build"].filter((key) => touched[key]).length;
  return completed / 3;
};

const getBrandDna = () => {
  const profile = getStudioProfile();
  const dna = {
    luxury: 62,
    trust: 78,
    motion: 72,
    boldness: 70,
    speed: 74,
    conversion: 86,
  };

  if (profile.style === "premium") {
    dna.luxury += 34;
    dna.trust += 18;
  }
  if (profile.style === "futuristic" || profile.style === "neon") {
    dna.motion += 26;
    dna.speed += 24;
  }
  if (profile.style === "clean business" || profile.style === "minimal") {
    dna.trust += 24;
    dna.conversion += 18;
  }
  if (profile.style === "streetwear" || profile.style === "bold") {
    dna.boldness += 30;
    dna.motion += 10;
  }
  if (profile.build === "landing page") {
    dna.conversion += 10;
  }
  if (profile.build === "app idea") {
    dna.motion += 18;
    dna.speed += 18;
    dna.conversion += 4;
  }
  if (["business", "personal brand"].includes(profile.audience)) {
    dna.trust += 10;
    dna.conversion += 6;
  }
  if (profile.preset) {
    dna.trust += 6;
    dna.conversion += 7;
  }

  dna.luxury = Number(studioAllOutState.beforeAfter) || dna.luxury;

  const warmupDna = {
    luxury: 34,
    trust: 42,
    motion: 38,
    boldness: 36,
    speed: 40,
    conversion: 48,
  };
  const completion = getStudioCompletion();

  return Object.fromEntries(
    Object.entries(dna).map(([key, value]) => {
      const finalValue = clampPercent(value);
      const warmupValue = warmupDna[key] || 40;
      const stagedValue =
        completion >= 1 ? finalValue : Math.round(warmupValue + (finalValue - warmupValue) * completion);

      return [key, clampPercent(stagedValue)];
    })
  );
};

const getPackageRecommendation = () => {
  const profile = getStudioProfile();
  const label = profile.preset || profile.audience;
  const businessPresets = ["Real estate", "E-commerce", "Cleaning company", "Car company"];
  const backendLike = profile.build.includes("backend") || profile.build.includes("system");

  if (profile.build === "landing page") {
    return {
      package: "Landing page",
      budget: "Business",
      timeline: "3-5 days",
      bestFor: "A focused offer, campaign, or intake flow",
      reason: "Best when one strong page needs to explain, convince, and convert quickly.",
    };
  }

  if (profile.build === "app idea" || backendLike) {
    return {
      package: "Custom backend / app concept",
      budget: "Custom",
      timeline: "Custom",
      bestFor: "Systems, app ideas, dashboards, or custom workflows",
      reason: "This needs a tailored structure, not just a standard website layout.",
    };
  }

  if (profile.style === "premium" && ["business", "personal brand"].includes(profile.audience)) {
    return {
      package: "Premium brand site",
      budget: "Premium",
      timeline: "10-20 days",
      bestFor: "A stronger brand presence with premium visuals and trust-building content",
      reason: "The concept needs a high-end first impression and a polished conversion route.",
    };
  }

  if (profile.audience === "business" || businessPresets.includes(label)) {
    return {
      package: "Business website",
      budget: "Business",
      timeline: "5-10 days",
      bestFor: "Professional service pages, proof, and request generation",
      reason: "This direction benefits from clear sections, trust signals, and a serious request flow.",
    };
  }

  return {
    package: "Starter website",
    budget: "Starter",
    timeline: "3-5 days",
    bestFor: "A clean launch, portfolio, personal profile, or first online presence",
    reason: "A focused first version is enough to look professional and start getting requests.",
  };
};

const buildStudioBrief = () => {
  const profile = getStudioProfile();
  const recommendation = getPackageRecommendation();
  const brandFeel = `${profile.tone}, with ${getBrandDna().trust}% trust and ${getBrandDna().conversion}% conversion focus`;
  const deviceFocus =
    profile.device === "mobile"
      ? "Mobile-first, with the main CTA easy to reach."
      : profile.device === "tablet"
        ? "Tablet-friendly, with a balanced visual layout."
        : "Desktop-first preview with responsive mobile execution.";

  return [
    `Hi AR Studio, I want a ${profile.style} ${profile.build} direction for a ${profile.label}.`,
    "",
    `Project type: ${titleCase(profile.build)}`,
    `Business/preset: ${titleCase(profile.label)}`,
    `Visual style: ${titleCase(profile.style)} - ${profile.tone}`,
    `Brand feel: ${brandFeel}`,
    `Main goal: ${profile.cta} through a clear ${profile.route.toLowerCase()} flow.`,
    `Recommended package: ${recommendation.package}`,
    `Budget level: ${recommendation.budget}`,
    `Estimated timeline: ${recommendation.timeline}`,
    `Device focus: ${deviceFocus}`,
    `Conversion route: ${profile.route}`,
    "",
    "Notes for AR Studio:",
    `The site should feel ${profile.tone} and make it easy for visitors to trust the brand and take action.`,
    `Suggested homepage direction: ${profile.title} ${profile.subtitle}`,
  ].join("\n");
};

const runBuildConsole = () => {
  buildConsoleTimers.forEach((timer) => window.clearTimeout(timer));
  buildConsoleTimers = [];

  const items = allOutEls.buildConsole?.querySelectorAll("li");
  if (!items?.length) return;

  items.forEach((item) => item.classList.remove("is-active", "is-done"));

  if (prefersReducedMotion) {
    items.forEach((item) => item.classList.add("is-done"));
    return;
  }

  items.forEach((item, index) => {
    const timer = window.setTimeout(() => {
      items.forEach((step, stepIndex) => {
        step.classList.toggle("is-active", stepIndex === index);
        step.classList.toggle("is-done", stepIndex < index);
      });

      if (index === items.length - 1) {
        item.classList.add("is-done");
      }
    }, index * 120);

    buildConsoleTimers.push(timer);
  });

  allOutEls.buildTimeline?.classList.remove("is-building");
  void allOutEls.buildTimeline?.offsetWidth;
  allOutEls.buildTimeline?.classList.add("is-building");
};

const updateAllOutStudioLab = ({ animateConsole = true } = {}) => {
  const profile = getStudioProfile();
  const dna = getBrandDna();
  const recommendation = getPackageRecommendation();
  const domain = `${studioSlugify(profile.label)}-${studioSlugify(profile.build)}.arstudio`;

  if (allOutEls.generatedPreview) {
    allOutEls.generatedPreview.dataset.device = profile.device;
  }
  if (allOutEls.generatedDomain) allOutEls.generatedDomain.textContent = domain;
  if (allOutEls.generatedEyebrow) {
    allOutEls.generatedEyebrow.textContent = `${titleCase(profile.label)} ${titleCase(profile.build)}`;
  }
  if (allOutEls.generatedHeroTitle) allOutEls.generatedHeroTitle.textContent = profile.title;
  if (allOutEls.generatedSubtitle) allOutEls.generatedSubtitle.textContent = profile.subtitle;
  if (allOutEls.generatedCta) allOutEls.generatedCta.textContent = profile.cta;
  allOutEls.generatedCards.forEach((card, index) => {
    if (card) card.textContent = profile.cards[index] || profile.cards[0];
  });
  if (allOutEls.generatedRoute) allOutEls.generatedRoute.textContent = profile.route;

  allOutEls.dnaMeters.forEach((meter) => {
    const key = meter.dataset.dnaMeter;
    const value = dna[key] || 0;
    meter.style.setProperty("--meter-value", `${value}%`);
    const output = meter.querySelector("strong");
    if (output) output.textContent = `${value}%`;
  });

  if (allOutEls.recommendedPackage) allOutEls.recommendedPackage.textContent = recommendation.package;
  if (allOutEls.recommendedBudget) allOutEls.recommendedBudget.textContent = recommendation.budget;
  if (allOutEls.recommendedTimeline) allOutEls.recommendedTimeline.textContent = recommendation.timeline;
  if (allOutEls.recommendedBestFor) allOutEls.recommendedBestFor.textContent = recommendation.bestFor;
  if (allOutEls.recommendedReason) allOutEls.recommendedReason.textContent = recommendation.reason;
  if (allOutEls.exportSummary) {
    allOutEls.exportSummary.textContent = `${titleCase(profile.style)} ${profile.build} for ${profile.label}, ready as a professional project brief.`;
  }

  if (allOutEls.comparisonRange && allOutEls.comparisonValue && allOutEls.comparisonFrame) {
    allOutEls.comparisonValue.textContent = `${studioAllOutState.beforeAfter}%`;
    allOutEls.comparisonFrame.style.setProperty("--after-width", `${studioAllOutState.beforeAfter}%`);
  }

  allOutEls.presetButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.studioPreset === studioAllOutState.preset);
  });
  allOutEls.deviceButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.studioDevice === studioAllOutState.device);
  });

  updateStudioBrief();
  if (animateConsole) {
    runBuildConsole();
  }
};

const showBriefStatus = (message) => {
  if (allOutEls.briefActionStatus) {
    allOutEls.briefActionStatus.textContent = message;
  }
};

const focusGeneratedPreview = () => {
  allOutEls.generatedPreview?.classList.remove("is-highlighted");
  void allOutEls.generatedPreview?.offsetWidth;
  allOutEls.generatedPreview?.classList.add("is-highlighted");
  allOutEls.generatedPreview?.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "center",
  });
};

const generateStudioDirection = () => {
  studioInteractionStarted = true;
  studioAllOutState.touched.audience = true;
  studioAllOutState.touched.style = true;
  studioAllOutState.touched.build = true;
  studioRefresh();
  updateAllOutStudioLab();
  syncStudioRequest();

  focusGeneratedPreview();

  showBriefStatus("Website direction generated. The project brief is ready.");
};

const copyStudioBrief = async () => {
  const brief = buildStudioBrief();

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(brief);
    } else {
      const fallback = document.createElement("textarea");
      fallback.value = brief;
      fallback.setAttribute("readonly", "");
      fallback.style.position = "fixed";
      fallback.style.opacity = "0";
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand("copy");
      fallback.remove();
    }
    showBriefStatus("Project brief copied.");
  } catch (error) {
    showBriefStatus("Copy did not work here. The brief is already placed in the form below.");
    syncStudioRequest();
  }
};

const putStudioBriefInForm = () => {
  syncStudioRequest();
  document.querySelector("#contact")?.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
  showBriefStatus("Brief placed in the contact form.");
};

allOutEls.presetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const preset = button.dataset.studioPreset || "";
    const profile = presetProfiles[preset];

    studioAllOutState.preset = preset;
    studioAllOutState.touched.audience = true;
    if (profile?.audience) {
      labState.audience = profile.audience;
      setActiveLabButton("audience", profile.audience);
    }

    updateLabPreview();
    studioRefresh();
    updateAllOutStudioLab();
  });
});

allOutEls.deviceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    studioAllOutState.device = button.dataset.studioDevice || "desktop";
    updateAllOutStudioLab();
    focusGeneratedPreview();
  });
});

allOutEls.comparisonRange?.addEventListener("input", () => {
  studioAllOutState.beforeAfter = Number(allOutEls.comparisonRange.value);
  updateAllOutStudioLab({ animateConsole: false });
});

labButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.dataset.labChoice;

    if (group && studioAllOutState.touched[group] !== undefined) {
      studioAllOutState.touched[group] = true;
    }

    if (button.dataset.labChoice === "audience") {
      studioAllOutState.preset = "";
    }
    window.setTimeout(updateAllOutStudioLab, 20);
  });
});

surpriseLab?.addEventListener("click", () => {
  studioAllOutState.preset = "";
  studioAllOutState.touched.audience = true;
  studioAllOutState.touched.style = true;
  studioAllOutState.touched.build = true;
  window.setTimeout(updateAllOutStudioLab, 20);
});

allOutEls.generateDirectionButton?.addEventListener("click", generateStudioDirection);
allOutEls.exportVibeButton?.addEventListener("click", generateStudioDirection);
allOutEls.copyBriefButton?.addEventListener("click", copyStudioBrief);
allOutEls.whatsappBriefButton?.addEventListener("click", () => {
  const text = encodeURIComponent(buildStudioBrief());
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
  showBriefStatus("WhatsApp opened with your concept.");
});
allOutEls.putInFormButton?.addEventListener("click", putStudioBriefInForm);
labBuildButton?.addEventListener("click", putStudioBriefInForm);
activateStudioMode?.addEventListener("click", () => {
  window.setTimeout(updateAllOutStudioLab, 20);
});

updateAllOutStudioLab();

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

  document.body.dataset.theme = theme;

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

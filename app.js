function el(tag, opts = {}, children = []) {
  const node = document.createElement(tag);
  if (opts.class) node.className = opts.class;
  if (opts.id) node.id = opts.id;
  if (opts.href) node.href = opts.href;
  if (opts.src) node.src = opts.src;
  if (opts.alt !== undefined) node.alt = opts.alt;
  if (opts.text) node.textContent = opts.text;
  if (opts.html) node.innerHTML = opts.html;
  if (opts.target) node.target = opts.target;
  if (opts.rel) node.rel = opts.rel;
  if (opts.loading) node.loading = opts.loading;
  children.forEach((c) => node.appendChild(c));
  return node;
}

function initials(name) {
  return name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

function renderHero(data) {
  document.title = data.name + ", " + data.title;
  document.getElementById("hero-name").textContent = data.name;
  document.getElementById("hero-role").textContent = data.title;
  document.getElementById("hero-location").textContent = data.location;
  document.getElementById("hero-bio").textContent = data.bio;

  const photoMount = document.getElementById("hero-photo");
  photoMount.innerHTML = "";
  if (data.photo) {
    photoMount.appendChild(el("img", { src: data.photo, alt: data.name, class: "hero-photo-img" }));
  } else {
    photoMount.appendChild(el("div", { class: "hero-photo-fallback", text: initials(data.name) }));
  }

  const linksEl = document.getElementById("hero-links");
  linksEl.innerHTML = ""; // clear the static fallback links baked into index.html for crawlers
  data.links.forEach((l) => {
    linksEl.appendChild(el("a", {
      href: l.href,
      text: l.label,
      target: l.href.startsWith("http") ? "_blank" : "",
      rel: "noopener",
      class: l.primary ? "links-primary" : "",
    }));
  });
}

function renderFocusAreas(areas) {
  const grid = document.getElementById("focus-grid");
  areas.forEach((a) => {
    grid.appendChild(
      el("div", { class: "card" }, [
        el("h3", { text: a.title }),
        el("p", { text: a.body }),
      ])
    );
  });
}

function renderImpact(items) {
  const list = document.getElementById("impact-list");
  items.forEach((text) => list.appendChild(el("li", { text })));
}

function renderExperience(items) {
  const timeline = document.getElementById("timeline");
  items.forEach((job) => {
    const metaParts = [job.location, job.dates].filter(Boolean).join(" | ");
    timeline.appendChild(
      el("div", { class: "timeline-item" }, [
        el("p", { class: "role", text: job.title + ", " + job.company }),
        el("p", { class: "meta", text: metaParts }),
      ])
    );
  });
}

// A compact, contained version of the same carousel mechanism used for
// Publications and Media Coverage (see setupCarousel below), sized for a row
// of small badges inside a card rather than full-width thumbnail cards. This
// is what lets Affiliations and Certifications keep growing over time
// without the card getting taller, new badges just join the scroll instead
// of wrapping onto more lines.
function badgeCarousel(items, carouselId) {
  const track = el(
    "div",
    { class: "carousel-track" },
    items.map((text) => el("span", { class: "badge", text }))
  );
  return el("div", { id: carouselId, class: "carousel carousel-compact" }, [track]);
}

function metaCard(title, children) {
  return el("div", { class: "card meta-card" }, [el("h3", { text: title }), ...children]);
}

// Education, Affiliations, Volunteer Affiliations, and Certifications each
// render as their own full-width row, stacked one below the other. The three
// badge lists are each their own independent carousel, since they grow at
// different times and shouldn't be forced to loop together.
function renderEduCert(education, affiliations, volunteerAffiliations, certifications) {
  const stack = document.getElementById("edu-cert");

  stack.appendChild(
    metaCard("Education", [
      el("p", { class: "meta-primary", text: education.degree }),
      el("p", { class: "meta-sub", text: education.school + ", " + education.year }),
    ])
  );

  if (affiliations.length) {
    stack.appendChild(metaCard("Affiliations", [badgeCarousel(affiliations, "aff-carousel")]));
  }
  if (volunteerAffiliations.length) {
    stack.appendChild(
      metaCard("Volunteer Affiliations", [badgeCarousel(volunteerAffiliations, "vol-carousel")])
    );
  }
  stack.appendChild(metaCard("Certifications", [badgeCarousel(certifications, "cert-carousel")]));

  setupCarousel("aff-carousel", affiliations.length, 5);
  setupCarousel("vol-carousel", volunteerAffiliations.length, 5);
  setupCarousel("cert-carousel", certifications.length, 5);
}

function pubCard(imgSrc, imgAlt, titleNode, statusText, description) {
  const body = [
    el("p", { class: "pub-title" }, [titleNode]),
    el("span", { class: "pub-status", text: statusText }),
  ];
  if (description) body.push(el("p", { text: description }));

  const children = [];
  if (imgSrc) {
    children.push(el("img", { src: imgSrc, alt: imgAlt, class: "pub-thumb", loading: "lazy" }));
  }
  children.push(el("div", { class: "pub-body" }, body));
  return el("div", { class: "pub-item" + (imgSrc ? " has-thumb" : "") }, children);
}

// Turns a populated track into a slow, seamless, auto-scrolling carousel.
// Duplicates the rendered cards once so the loop has no visible seam, pauses
// on hover/keyboard-focus/touch so a visitor can always stop and read or
// click, and does nothing (leaves a normal static, swipeable row) if the
// visitor has asked the OS for reduced motion.
function setupCarousel(carouselId, itemCount, secondsPerItem = 7) {
  const carousel = document.getElementById(carouselId);
  const track = carousel.querySelector(".carousel-track");
  if (itemCount < 2) return; // not enough content to loop meaningfully

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return; // leave it as a plain, swipeable row, no duplicated content

  // Duplicate the rendered cards once, so translating the track by exactly
  // -50% lands back on an identical copy of the start, no visible jump.
  // The clones are hidden from assistive tech and keyboard tabbing, since
  // they are a visual repeat, not new content.
  [...track.children].forEach((child) => {
    const clone = child.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.querySelectorAll("a").forEach((a) => a.setAttribute("tabindex", "-1"));
    track.appendChild(clone);
  });

  track.style.setProperty("--marquee-duration", itemCount * secondsPerItem + "s");
  carousel.classList.add("carousel-animated");

  let resumeTimer;
  const pause = () => track.classList.add("paused");
  const resume = () => track.classList.remove("paused");
  carousel.addEventListener("mouseenter", pause);
  carousel.addEventListener("mouseleave", resume);
  carousel.addEventListener("focusin", pause);
  carousel.addEventListener("focusout", resume);
  carousel.addEventListener("touchstart", () => {
    clearTimeout(resumeTimer);
    pause();
  }, { passive: true });
  carousel.addEventListener("touchend", () => {
    resumeTimer = setTimeout(resume, 2500);
  }, { passive: true });
}

function renderPublications(items, mountId) {
  const list = document.getElementById(mountId);
  items.forEach((p) => {
    const titleNode = p.href
      ? el("a", { href: p.href, text: p.title, target: "_blank", rel: "noopener" })
      : el("span", { text: p.title });
    list.appendChild(pubCard(p.image, p.title, titleNode, p.status, p.description));
  });
}

function renderMediaCoverage(items) {
  const list = document.getElementById("media-list");
  if (!items.length) {
    list.appendChild(
      el("p", { class: "empty-note", text: "No press mentions yet, check back soon." })
    );
    return;
  }
  items.forEach((m) => {
    const titleNode = m.href
      ? el("a", { href: m.href, text: m.title, target: "_blank", rel: "noopener" })
      : el("span", { text: m.title });
    list.appendChild(
      pubCard(m.image, m.title, titleNode, m.outlet + (m.date ? ", " + m.date : ""), "")
    );
  });
}

function renderProjects(items) {
  const grid = document.getElementById("projects-grid");
  items.forEach((p) => {
    const link = p.href ? el("a", { href: p.href, target: "_blank", rel: "noopener", text: "View on GitHub" }) : null;
    grid.appendChild(
      el("div", { class: "card" }, [
        el("h3", { text: p.title }),
        el("p", { text: p.body }),
        ...(link ? [link] : []),
      ])
    );
  });
}

function setupThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  const root = document.documentElement;
  const stored = (() => {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  })();
  if (stored) root.setAttribute("data-theme", stored);

  btn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
}

(function init() {
  const d = SITE_DATA;
  renderHero(d.profile);
  renderFocusAreas(d.focusAreas);
  renderImpact(d.impact);
  renderExperience(d.experience);
  renderEduCert(d.education, d.affiliations, d.volunteerAffiliations, d.certifications);
  renderPublications(d.publications, "pub-list");
  renderMediaCoverage(d.mediaCoverage);
  renderProjects(d.projects);
  setupCarousel("pub-carousel", d.publications.length);
  setupCarousel("media-carousel", d.mediaCoverage.length);
  document.getElementById("year").textContent = new Date().getFullYear();
  setupThemeToggle();
})();

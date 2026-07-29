/**
 * main.js — content.js-এর ডেটা পড়ে DOM-এ বসিয়ে দেয়।
 * এই ফাইলে সাধারণত হাত দেয়ার দরকার নেই — টেক্সট বদলাতে হলে content.js এডিট করো।
 */
(function () {
  "use strict";

  var C = window.SITE_CONTENT;
  if (!C) {
    console.error("SITE_CONTENT পাওয়া যায়নি — content.js ঠিকভাবে লোড হয়েছে কিনা দেখো।");
    return;
  }

  /* ---------- ছোট হেল্পার ---------- */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (key) {
      if (key === "class") node.className = attrs[key];
      else if (key === "html") node.innerHTML = attrs[key];
      else if (key === "text") node.textContent = attrs[key];
      else node.setAttribute(key, attrs[key]);
    });
    (children || []).forEach(function (child) {
      if (child) node.appendChild(child);
    });
    return node;
  }
  function $(sel, scope) { return (scope || document).querySelector(sel); }
  function $all(sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); }

  // content.js-এ #section লিংক থাকে (যেমন "#faq"), যেগুলো index.html-এ কাজ করে।
  // privacy.html-এর মতো অন্য পেজ থেকে ওই একই লিংক ব্যবহার করলে "index.html" প্রিফিক্স
  // যোগ করে দেয়, নাহলে ক্লিক করলে কিছুই হতো না।
  function resolveHref(href) {
    if (href && href.charAt(0) === "#" && !document.getElementById(href.slice(1))) {
      return "index.html" + href;
    }
    return href;
  }

  /* ---------- আইকন লাইব্রেরি (inline SVG, stroke-based) ---------- */
  var ICONS = {
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4.5 6v6c0 5 3.2 8 7.5 9 4.3-1 7.5-4 7.5-9V6L12 3Z"/></svg>',
    click: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m9 9 8.5 3-3.3 1.2L13 16.5 9 9Z"/><path d="M5 5v3M3.5 9.5h3M13 3v2.5M18.5 6 17 7.5"/></svg>',
    keyboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M6.5 10h.01M10 10h.01M13.5 10h.01M17 10h.01M8 14h8"/></svg>',
    offline: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 18h.01"/><path d="M8.5 14.5a5 5 0 0 1 7 0M5.5 11a9 9 0 0 1 13 0"/><path d="m3 3 18 18" stroke-opacity="0"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11a8 8 0 0 0-14.5-4.5M4 5v4h4"/><path d="M4 13a8 8 0 0 0 14.5 4.5M20 19v-4h-4"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5L20 7"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="m5 5 14 14M19 5 5 19"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  };
  function icon(name) { return ICONS[name] || ""; }

  /* ---------- মেটা ট্যাগ ---------- */
  function renderMeta() {
    if (C.meta.title) document.title = C.meta.title;
    var setMeta = function (name, content, attr) {
      attr = attr || "name";
      var tag = document.querySelector('meta[' + attr + '="' + name + '"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };
    if (C.meta.description) {
      setMeta("description", C.meta.description);
      setMeta("og:description", C.meta.description, "property");
    }
    if (C.meta.title) setMeta("og:title", C.meta.title, "property");
    if (C.meta.themeColor) setMeta("theme-color", C.meta.themeColor);
  }

  /* ---------- লোগো (nav + footer + hero mockup — সব জায়গায় একই ইমেজ) ---------- */
  // brand.logoImage পাথ থেকে <img> বানিয়ে প্রতিটা [data-brand-logo] কন্টেইনারে
  // বসিয়ে দেয়। ফাইলটা এখনো assets/img/icon.png-এ নেই বলে ব্রাউজারে broken-image
  // দেখাবে যতক্ষণ না ফাইলটা ওই পাথে রাখা হয় — কোড-এর দিক থেকে এটা এখনই রেডি।
  function renderBrandLogo() {
    var targets = $all("[data-brand-logo]");
    if (!targets.length || !C.brand.logoImage) return;
    targets.forEach(function (t) {
      t.innerHTML = "";
      t.appendChild(el("img", { src: C.brand.logoImage, alt: C.brand.name + " logo" }));
    });
  }

  /* ---------- নেভবার (দুই পেজেই কমন) ---------- */
  function renderNav() {
    var logoTargets = $all("[data-brand-name]");
    logoTargets.forEach(function (t) { t.textContent = C.brand.name; });

    var linksWrap = $("#nav-links");
    if (linksWrap) {
      C.nav.links.forEach(function (link) {
        linksWrap.appendChild(el("a", { href: resolveHref(link.href), text: link.label }));
      });
    }
    $all("[data-nav-cta]").forEach(function (btn) {
      btn.textContent = C.nav.ctaLabel;
      btn.setAttribute("href", resolveHref(C.nav.ctaHref));
    });

    // mobile toggle
    var nav = $(".nav");
    var toggle = $(".nav-toggle");
    if (nav && toggle) {
      toggle.innerHTML = icon("menu");
      toggle.addEventListener("click", function () {
        var isOpen = nav.classList.toggle("is-open");
        toggle.innerHTML = isOpen ? icon("close") : icon("menu");
        toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
      $all("a", nav).forEach(function (a) {
        a.addEventListener("click", function () {
          nav.classList.remove("is-open");
          toggle.innerHTML = icon("menu");
        });
      });
    }

    // scrollspy — চলমান সেকশন হাইলাইট (শুধু বর্তমান পেজের ভেতরের #anchor-দের জন্য)
    var navAnchors = linksWrap
      ? $all("a", linksWrap).filter(function (a) { return a.getAttribute("href").charAt(0) === "#"; })
      : [];
    if (navAnchors.length) {
      var sections = navAnchors
        .map(function (a) { return document.querySelector(a.getAttribute("href")); })
        .filter(Boolean);
      if (sections.length && "IntersectionObserver" in window) {
        var spy = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                var id = "#" + entry.target.id;
                navAnchors.forEach(function (a) {
                  a.classList.toggle("is-active", a.getAttribute("href") === id);
                });
              }
            });
          },
          { rootMargin: "-45% 0px -50% 0px" }
        );
        sections.forEach(function (s) { spy.observe(s); });
      }
    }
  }

  /* ---------- হিরো ---------- */
  function renderHero() {
    var root = $("#hero");
    if (!root) return;
    var h = C.hero;
    $(".hero-eyebrow", root) && ($(".hero-eyebrow", root).textContent = h.eyebrow);
    $(".hero-headline", root) && ($(".hero-headline", root).textContent = h.headline);
    $(".hero-sub", root) && ($(".hero-sub", root).textContent = h.subheadline);

    var primary = $(".hero-primary", root);
    if (primary) { primary.textContent = h.primaryCta.label; primary.href = h.primaryCta.href; }
    var secondary = $(".hero-secondary", root);
    if (secondary) { secondary.textContent = h.secondaryCta.label; secondary.href = h.secondaryCta.href; }

    var metaRow = $(".hero-meta", root);
    if (metaRow) {
      h.metaRow.forEach(function (m) { metaRow.appendChild(el("span", { text: m })); });
    }
  }

  /* ---------- Why manual strip ---------- */
  function renderTrustStrip() {
    var root = $("#trust-strip-items");
    if (!root) return;
    var titleEl = $("#why-manual-title");
    if (titleEl) titleEl.textContent = C.whyManual.title;
    C.whyManual.items.forEach(function (item) {
      root.appendChild(
        el("div", { class: "trust-item" }, [
          el("h3", { text: item.title }),
          el("p", { text: item.description }),
        ])
      );
    });
  }

  /* ---------- How it works ---------- */
  function renderHowItWorks() {
    var root = $("#steps-list");
    if (!root) return;
    var data = C.howItWorks;
    setSectionHead("how-it-works", data.eyebrow, data.title, data.subtitle);
    data.steps.forEach(function (step, i) {
      root.appendChild(
        el("div", { class: "step" }, [
          el("span", { class: "step-index", text: "STEP " + String(i + 1).padStart(2, "0") }),
          el("h3", { text: step.title }),
          el("p", { text: step.description }),
          el("div", { class: "step-detail", text: step.detail }),
        ])
      );
    });
  }

  /* ---------- Features ---------- */
  function renderFeatures() {
    var root = $("#features-grid");
    if (!root) return;
    var data = C.features;
    setSectionHead("features", data.eyebrow, data.title, data.subtitle);
    data.items.forEach(function (item) {
      root.appendChild(
        el("div", { class: "feature-card" }, [
          el("div", { class: "feature-icon", html: icon(item.icon) }),
          el("h3", { text: item.title }),
          el("p", { text: item.description }),
        ])
      );
    });
  }

  /* ---------- Permissions ---------- */
  function renderPermissions() {
    var root = $("#permissions-list");
    if (!root) return;
    var data = C.permissions;
    setSectionHead("permissions", data.eyebrow, data.title, data.subtitle);
    data.items.forEach(function (item) {
      var isRequired = /required/i.test(item.level);
      root.appendChild(
        el("div", { class: "permission-row" }, [
          el("h3", { text: item.title }),
          el("span", { class: "tag " + (isRequired ? "tag--required" : "tag--optional"), text: item.level }),
          el("p", { text: item.description }),
        ])
      );
    });
  }

  /* ---------- Download ---------- */
  function renderDownload() {
    var root = $("#download");
    if (!root) return;
    var d = C.download;
    $(".download-eyebrow", root) && ($(".download-eyebrow", root).textContent = d.eyebrow);
    $(".download-title", root) && ($(".download-title", root).textContent = d.title);
    $(".download-sub", root) && ($(".download-sub", root).textContent = d.subtitle);

    var metaWrap = $(".download-meta", root);
    if (metaWrap) {
      [d.version, d.size, d.updated].forEach(function (m) {
        metaWrap.appendChild(el("span", { class: "tag", text: m }));
      });
    }
    var primary = $(".download-primary", root);
    if (primary) { primary.textContent = d.primaryCta.label; primary.href = d.primaryCta.href; }
    var secondary = $(".download-secondary", root);
    if (secondary) { secondary.textContent = d.secondaryCta.label; secondary.href = d.secondaryCta.href; }

    var reqList = $(".requirements-box ul", root);
    if (reqList) {
      d.requirements.forEach(function (req) {
        reqList.appendChild(el("li", {}, [el("span", { html: icon("check") }), el("span", { text: req })]));
      });
    }
  }

  /* ---------- FAQ ---------- */
  function renderFAQ() {
    var root = $("#faq-list");
    if (!root) return;
    var data = C.faq;
    setSectionHead("faq", data.eyebrow, data.title, null);
    data.items.forEach(function (item, i) {
      var answerId = "faq-answer-" + i;
      var item_el = el("div", { class: "faq-item" }, [
        el("button", {
          class: "faq-question",
          "aria-expanded": "false",
          "aria-controls": answerId,
        }, [el("span", { text: item.q }), el("span", { class: "plus" })]),
        el("div", { class: "faq-answer", id: answerId }, [
          el("div", { class: "faq-answer-inner" }, [el("p", { text: item.a })]),
        ]),
      ]);
      root.appendChild(item_el);

      var btn = $(".faq-question", item_el);
      btn.addEventListener("click", function () {
        var isOpen = item_el.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });
    });
  }

  /* ---------- Changelog ---------- */
  function renderChangelog() {
    var root = $("#changelog-list");
    if (!root) return;
    var data = C.changelog;
    setSectionHead("changelog", data.eyebrow, data.title, null);
    data.entries.forEach(function (entryData) {
      root.appendChild(
        el("div", { class: "changelog-entry" }, [
          el("div", {}, [
            el("span", { class: "changelog-version", text: entryData.version }),
            el("span", { class: "changelog-date", text: entryData.date }),
          ]),
          el(
            "ul",
            { class: "changelog-notes" },
            entryData.notes.map(function (note) { return el("li", { text: note }); })
          ),
        ])
      );
    });
  }

  /* ---------- Footer ---------- */
  function renderFooter() {
    var root = $("#site-footer");
    if (!root) return;
    var f = C.footer;
    $(".footer-tagline", root) && ($(".footer-tagline", root).textContent = f.tagline);

    var colsWrap = $(".footer-cols", root);
    if (colsWrap) {
      f.columns.forEach(function (col) {
        colsWrap.appendChild(
          el("div", { class: "footer-col" }, [
            el("h4", { text: col.title }),
            el(
              "ul",
              {},
              col.links.map(function (link) {
                return el("li", {}, [el("a", { href: resolveHref(link.href), text: link.label })]);
              })
            ),
          ])
        );
      });
    }
    var yearEl = $(".footer-year", root);
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    var nameEl = $(".footer-copy-name", root);
    if (nameEl) nameEl.textContent = f.copyrightName;
  }

  /* ---------- প্রাইভেসি পেজ ---------- */
  function renderPrivacyPage() {
    var root = $("#privacy-page");
    if (!root) return;
    var p = C.privacyPage;
    $(".privacy-title", root) && ($(".privacy-title", root).textContent = p.title);
    $(".privacy-updated", root) && ($(".privacy-updated", root).textContent = p.lastUpdated);
    $(".privacy-intro", root) && ($(".privacy-intro", root).textContent = p.intro);

    var sectionsWrap = $(".privacy-sections", root);
    if (sectionsWrap) {
      p.sections.forEach(function (s) {
        sectionsWrap.appendChild(
          el("div", { class: "policy-section" }, [el("h2", { text: s.heading }), el("p", { text: s.body })])
        );
      });
    }
  }

  /* ---------- সেকশন হেডার হেল্পার ---------- */
  function setSectionHead(sectionId, eyebrow, title, subtitle) {
    var section = document.getElementById(sectionId);
    if (!section) return;
    var e = $(".eyebrow", section);
    var t = $(".section-head h2", section);
    var s = $(".section-head .lede", section);
    if (e && eyebrow) e.textContent = eyebrow;
    if (t && title) t.textContent = title;
    if (s && subtitle) s.textContent = subtitle;
  }

  /* ---------- scroll-reveal অ্যানিমেশন ---------- */
  function initReveal() {
    var targets = $all(".reveal, .reveal-stagger");
    if (!targets.length) return;
    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (t) { t.classList.add("is-visible"); });
      return;
    }
    var obs = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -60px 0px" }
    );
    targets.forEach(function (t) { obs.observe(t); });
  }

  /* ---------- init ---------- */
  function init() {
    renderMeta();
    renderBrandLogo();
    renderNav();
    renderHero();
    renderTrustStrip();
    renderHowItWorks();
    renderFeatures();
    renderPermissions();
    renderDownload();
    renderFAQ();
    renderChangelog();
    renderFooter();
    renderPrivacyPage();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

/**
 * ============================================================================
 *  content.js — সাইটের একমাত্র সোর্স অফ ট্রুথ
 * ============================================================================
 *  এই ফাইলটাই তোমার পুরো সাইটের "ডেটাবেস"। এখানে যা লেখা আছে, ঠিক সেটাই
 *  ওয়েবসাইটে দেখা যাবে — HTML/CSS/main.js কিচ্ছু ছোঁয়া লাগবে না।
 *
 *  কীভাবে কাজ করে:
 *   - প্রতিটা সেকশনের নিচে "// EDIT:" কমেন্ট আছে — ওটা পড়ে বুঝে নাও কী বদলাতে হবে।
 *   - array (features.items, faq.items, changelog.entries ইত্যাদি) থেকে item
 *     মুছেও ফেলতে পারো, নতুন item { } আকারে কপি-পেস্ট করেও যোগ করতে পারো।
 *   - href: "#" মানে লিংকটা এখনো বসানো হয়নি — নিজের আসল লিংক/ফাইল বসিয়ে দিও।
 *   - লোগো: নিচের brand.logoImage-এ যে পাথ লেখা (assets/img/icon.png), সেই
 *     নামে ফাইলটা assets/img/ ফোল্ডারে রাখলেই nav, footer আর hero mockup —
 *     সব জায়গায় একসাথে বসে যাবে। আলাদা করে HTML-এ কিছু বদলানো লাগবে না।
 * ============================================================================
 */

window.SITE_CONTENT = {

  // ── মেটা / SEO ──────────────────────────────────────────────────────────
  // EDIT: ব্রাউজার ট্যাবের টাইটেল, সার্চ ইঞ্জিনে যে বর্ণনা দেখাবে
  meta: {
    title: "NFtools — a browser extension you install yourself",
    description:
      "NFtools is a lightweight browser extension you download and load manually — no web store, no forced updates, nothing running that you didn't approve.",
    themeColor: "#131419",
  },

  // ── ব্র্যান্ড (নাম এখানে editable, লোগো ইমেজ হিসেবে assets/img/icon.png থেকে সব জায়গায় বসে) ──
  // EDIT: নাম বদলাও। লোগো বদলাতে চাইলে assets/img/ ফোল্ডারে সেই নামের ফাইল রাখো
  // আর নিচের logoImage পাথ সেই নাম দিয়ে আপডেট করো — nav, footer, hero mockup
  // সব জায়গায় এক জায়গা থেকেই বসে যাবে।
  brand: {
    name: "NFtools",
    logoImage: "assets/img/icon.png",
  },

  // ── টপ ন্যাভিগেশন ───────────────────────────────────────────────────────
  nav: {
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Trust", href: "#permissions" },
      { label: "FAQ", href: "#faq" },
    ],
    ctaLabel: "Download",
    ctaHref: "#download",
  },

  // ── হিরো সেকশন ──────────────────────────────────────────────────────────
  // EDIT: এইটাই প্রথম যা ভিজিটর পড়বে — headline/subheadline নিজের এক্সটেনশন
  // অনুযায়ী বদলে নাও। বাকি কাঠামো (badge, buttons, meta row) রেখে দিলেই হবে।
  hero: {
    eyebrow: "MANUAL INSTALL · NOT LISTED ON ANY STORE",
    headline: "You install it. Nobody else does.",
    subheadline:
      "NFtools isn't on the Chrome Web Store. You download it once, load it into your browser yourself, and that's the only copy that exists — no forced updates, no store review quietly changing what it does underneath you.",
    primaryCta: { label: "Download NFtools", href: "#download" },
    secondaryCta: { label: "See how install works", href: "#how-it-works" },
    // EDIT: ভার্সন নাম্বার, সাইজ, কম্প্যাটিবিলিটি — রিলিজ দেয়ার সময় আপডেট কোরো
    metaRow: ["v2.4.1", "340 KB", "Chrome · Edge · Brave · Opera"],
  },

  // ── "কেন ম্যানুয়াল ইনস্টল" — trust strip (কোনো fake সংখ্যা নেই ইচ্ছাকৃতভাবে) ──
  // EDIT: চাইলে array-তে আরও পয়েন্ট যোগ করো, বা কমিয়ে দাও।
  // নোট: এখানে ইচ্ছে করেই কোনো বানানো "ইউজার সংখ্যা" রাখা হয়নি — কারণ যদি
  // পাবলিশ করার আগে ভুলে যাও এটা বদলাতে, তাহলে মিথ্যা দাবি হয়ে যাবে সাইটে।
  // real সংখ্যা থাকলে নিজে বসিয়ে নিও।
  whyManual: {
    title: "The trade-off, made honest",
    items: [
      {
        title: "No store review delay",
        description: "Ships the moment it's ready — not weeks later.",
      },
      {
        title: "No forced auto-update",
        description: "It only changes when you choose to re-download it.",
      },
      {
        title: "Open folder, not a black box",
        description: "Everything that runs is sitting right there, readable.",
      },
    ],
  },

  // ── "কীভাবে ইনস্টল করবে" — সাইটের সিগনেচার সেকশন ──────────────────────────
  // EDIT: ব্রাউজারের exact ধাপ একই থাকবে, শুধু চাইলে ভাষা/টোন বদলাও।
  howItWorks: {
    eyebrow: "GETTING STARTED",
    title: "Three steps, about a minute",
    subtitle:
      "NFtools isn't on the Chrome Web Store, so the install looks a little different from what you're used to. Here's exactly what happens.",
    steps: [
      {
        title: "Download and unzip",
        description:
          "Grab the .zip from the Download section below and extract it somewhere you'll remember — Desktop or Downloads both work fine.",
        detail: "You'll get a single folder — that folder is the extension.",
      },
      {
        title: "Open your browser's extension page",
        description:
          "Go to chrome://extensions (edge://extensions on Edge), then switch on Developer mode using the toggle in the top-right corner.",
        detail: "This is a standard browser setting — it doesn't weaken your browser's security.",
      },
      {
        title: "Load the unpacked folder",
        description:
          "Click Load unpacked and select the folder you unzipped. NFtools appears in your toolbar immediately — no restart needed.",
        detail: "Don't see the icon? Click the puzzle-piece icon and pin it.",
      },
    ],
  },

  // ── ফিচার গ্রিড ──────────────────────────────────────────────────────────
  // EDIT: এইগুলো generic placeholder ফিচার — নিজের এক্সটেনশন আসলে কী করে
  // সেটা দিয়ে বদলে দাও। icon-এর নাম নিচের ICONS অবজেক্ট থেকে বেছে নাও
  // (main.js-এ যতগুলো icon সংজ্ঞায়িত আছে), অথবা নতুন icon যোগ করো।
  features: {
    eyebrow: "FEATURES",
    title: "What NFtools actually does",
    subtitle: "A short, honest list — no fluff.",
    items: [
      {
        icon: "bolt",
        title: "Lightweight by default",
        description: "Runs quietly in the background and stays out of your way until you need it.",
      },
      {
        icon: "shield",
        title: "Your data stays local",
        description: "Settings and history live in your browser, not on a server you don't control.",
      },
      {
        icon: "click",
        title: "One click away",
        description: "Pin it to your toolbar and everything is a single click from any tab.",
      },
      {
        icon: "keyboard",
        title: "Keyboard shortcuts",
        description: "Do the most common actions without reaching for your mouse.",
      },
      {
        icon: "offline",
        title: "Works offline-first",
        description: "The interface doesn't depend on a server being up to function.",
      },
      {
        icon: "refresh",
        title: "Updates on your terms",
        description: "New versions are posted here — you decide when to grab them.",
      },
    ],
  },

  // ── পারমিশন / ট্রাস্ট প্যানেল ────────────────────────────────────────────
  // EDIT: এক্সটেনশন manifest.json-এ যে permissions চেয়েছ, ঠিক সেগুলোর
  // সাথে মিলিয়ে এই list আপডেট করো — এটা ভিজিটরের কাছে honesty সিগনাল।
  permissions: {
    eyebrow: "TRUST & PERMISSIONS",
    title: "What NFtools can see",
    subtitle:
      "Extensions loaded outside a web store skip a store's review process — so here's a plain-language account of what this one actually asks for.",
    items: [
      {
        title: "Active tab",
        level: "Required",
        description: "Reads the page you're currently on, only while you're actively using the extension.",
      },
      {
        title: "Storage",
        level: "Required",
        description: "Saves your settings locally so they're still there the next time you open your browser.",
      },
      {
        title: "Downloads",
        level: "Optional",
        description: "Only requested if a feature you turn on needs to save a file to your computer.",
      },
    ],
  },

  // ── ডাউনলোড সেকশন ────────────────────────────────────────────────────────
  // EDIT: এখানে আসল ডাউনলোড লিংক (GitHub release / নিজের CDN) বসাও।
  download: {
    eyebrow: "DOWNLOAD",
    title: "Get NFtools",
    subtitle: "One file. No account, no store, no install wizard.",
    version: "v2.4.1",
    size: "340 KB",
    updated: "Updated Jul 2026",
    // EDIT: href="#" এর জায়গায় আসল .zip ফাইলের লিংক বসাও
    primaryCta: { label: "Download .zip", href: "#" },
    secondaryCta: { label: "View source on GitHub", href: "#" },
    requirements: [
      "Any Chromium-based browser — Chrome, Edge, Brave, Opera, or Vivaldi",
      "Windows, macOS, or Linux",
      "Developer mode enabled (see step 2 above)",
    ],
  },

  // ── FAQ ──────────────────────────────────────────────────────────────────
  // EDIT: প্রশ্ন-উত্তর যোগ/বিয়োগ করতে পারো, একই { q, a } ফরম্যাটে।
  faq: {
    eyebrow: "FAQ",
    title: "Questions people actually ask",
    items: [
      {
        q: "Why isn't this on the Chrome Web Store?",
        a: "A few reasons: store review can take weeks, some categories of extension get rejected outright, and shipping outside a store means an update reaches you the moment it's ready instead of waiting on someone else's review queue. Nothing shady about it — just a different distribution choice.",
      },
      {
        q: "Is it safe to turn on Developer mode just for this?",
        a: "Yes. Developer mode is a standard, built-in browser setting — it doesn't weaken your overall browser security. It simply allows your browser to load extensions from a folder instead of only from a store.",
      },
      {
        q: "Will my browser disable it automatically?",
        a: "Chromium browsers occasionally show a reminder about developer-mode extensions and may ask you to re-enable them after an update. If NFtools ever looks inactive, open chrome://extensions and check it's still toggled on.",
      },
      {
        q: "How do I update to a new version?",
        a: "Download the latest .zip from this page, unzip it over the old folder (or a fresh one), then go to chrome://extensions and click the refresh icon on NFtools's card — or remove the old version first and load the new folder the same way you did the first time.",
      },
      {
        q: "I loaded it but I don't see the icon anywhere.",
        a: "It's very likely just hidden in the extensions menu. Click the puzzle-piece icon in your toolbar, find NFtools in the list, and click the pin icon next to it.",
      },
      {
        q: "Does it work on Firefox or Safari?",
        a: "Not yet — NFtools currently targets Chromium-based browsers only. If that changes, it'll be announced right here.",
      },
      {
        q: "What data does NFtools collect?",
        a: "The short version lives on this page's Trust section above; the full policy is on the Privacy page linked in the footer.",
      },
    ],
  },

  // ── চেঞ্জলগ ──────────────────────────────────────────────────────────────
  // EDIT: নতুন ভার্সন রিলিজ দিলে উপরে একটা নতুন entry যোগ করো (নিচে ঠেলে দিও না)
  changelog: {
    eyebrow: "CHANGELOG",
    title: "What's shipped recently",
    entries: [
      {
        version: "v2.4.1",
        date: "Jul 2026",
        notes: ["Fixed a keyboard shortcut conflict on Windows", "Small performance improvements"],
      },
      {
        version: "v2.4.0",
        date: "Jun 2026",
        notes: ["Added keyboard shortcuts", "Reduced background memory usage"],
      },
      {
        version: "v2.3.0",
        date: "Apr 2026",
        notes: ["Initial public release"],
      },
    ],
  },

  // ── ফুটার ────────────────────────────────────────────────────────────────
  footer: {
    tagline: "A browser extension you install yourself.",
    columns: [
      {
        title: "Product",
        links: [
          { label: "Features", href: "#features" },
          { label: "How it works", href: "#how-it-works" },
          { label: "FAQ", href: "#faq" },
          { label: "Download", href: "#download" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Changelog", href: "#changelog" },
          { label: "Privacy Policy", href: "privacy.html" },
          // EDIT: GitHub রিপো থাকলে href বসাও, না হলে এই লাইনটা মুছে দাও
          { label: "Source code", href: "#" },
        ],
      },
    ],
    // EDIT: কপিরাইট লাইনের নাম নিজের ব্র্যান্ড অনুযায়ী বদলাও (বছর auto-generate হয়)
    copyrightName: "NFtools",
  },

  // ── প্রাইভেসি পেজ ────────────────────────────────────────────────────────
  // ⚠️ গুরুত্বপূর্ণ: এই সেকশনটা placeholder টেক্সট, আইনগত ডকুমেন্ট নয়।
  // পাবলিশ করার আগে এক্সটেনশন আসলে যা করে তার সাথে মিলিয়ে সততার সাথে
  // লিখে নিও — privacy policy তে ভুল দাবি থাকলে ইউজারের ভরসা ভাঙবে।
  privacyPage: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: Jul 2026",
    intro:
      "This page explains, in plain language, what NFtools does and doesn't do with your data. Edit every claim below so it matches exactly what the extension actually does before publishing.",
    sections: [
      {
        heading: "What NFtools collects",
        body:
          "// EDIT: সততার সাথে লেখো — যেমন, 'NFtools কোনো ব্রাউজিং ডেটা কোনো সার্ভারে পাঠায় না; সব সেটিংস শুধু তোমার নিজের ব্রাউজারে সংরক্ষিত থাকে।' যদি সত্যিই কিছু পাঠানো হয়, ঠিক কী এবং কেন, তা স্পষ্ট করে লেখো।",
      },
      {
        heading: "What NFtools does not do",
        body:
          "// EDIT: যেমন, 'NFtools তোমার ব্রাউজিং হিস্ট্রি ট্র্যাক করে না, বিজ্ঞাপনদাতার কাছে কিছু বিক্রি করে না, এবং তোমার অনুমতি ছাড়া কোনো ফাইল ডাউনলোড করে না।'",
      },
      {
        heading: "Permissions explained",
        body:
          "See the Trust & Permissions section on the homepage for a breakdown of each permission NFtools requests and why.",
      },
      {
        heading: "Changes to this policy",
        body:
          "If this policy changes, the 'Last updated' date at the top of this page will change too.",
      },
      {
        heading: "Contact",
        body: "// EDIT: যোগাযোগের ইমেইল বা লিংক বসাও।",
      },
    ],
  },
};

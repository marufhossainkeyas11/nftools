# RELAY — Extension Landing Site

একটা প্রিমিয়াম, পুরোপুরি editable ওয়েবসাইট — কোনো build tool/framework লাগে না,
সরাসরি ব্রাউজারে খুললেই চলে।

## ফাইল স্ট্রাকচার

```
├── index.html                 → মূল ল্যান্ডিং পেজ (কাঠামো মাত্র, টেক্সট নেই)
├── privacy.html                → প্রাইভেসি পলিসি পেজ (কাঠামো মাত্র)
├── README.md                   → এই ফাইল
└── assets/
    ├── css/style.css           → পুরো ডিজাইন সিস্টেম (রঙ, ফন্ট, স্পেসিং, সব কম্পোনেন্ট)
    ├── js/
    │   ├── content.js          → ⭐ সব টেক্সট/ডেটা এখানে — এটাই মূলত এডিট করবে
    │   └── main.js              → content.js পড়ে সাইট রেন্ডার করে (সাধারণত হাত দেয়া লাগবে না)
    └── img/
        └── favicon.svg          → placeholder favicon
```

**মূল কথা:** `index.html`/`privacy.html`-এ কোনো টেক্সট সরাসরি লেখা নেই — সব
`content.js` থেকে JavaScript দিয়ে বসে। মানে ৯৯% এডিটিং শুধু একটা ফাইলে
(`assets/js/content.js`) — সেখানে আরবি সংখ্যার মতো ধারাবাহিক কমেন্ট
(`// EDIT: ...`) দেয়া আছে, ওগুলো অনুসরণ করলেই হবে।

## যা এডিট করতে হবে

### ১. নাম, হেডলাইন, ফিচার, FAQ ইত্যাদি
`assets/js/content.js` খোলো। প্রতিটা সেকশনের ওপরে বাংলায় কমেন্ট লেখা আছে কী
বদলাতে হবে। যেমন নতুন একটা FAQ যোগ করতে চাইলে `faq.items` অ্যারেতে এভাবে
একটা অবজেক্ট যোগ করো:

```js
{
  q: "তোমার প্রশ্ন এখানে",
  a: "উত্তর এখানে",
},
```

একই প্যাটার্নে `features.items`, `changelog.entries`, `permissions.items`
ইত্যাদি অ্যারেতেও নতুন item যোগ/বিয়োগ করতে পারবে — কাঠামো (`{ }`) কপি করে
ভেতরের টেক্সট বদলে দিলেই যথেষ্ট।

### ২. লোগো ও ব্র্যান্ড নাম (তুমি নিজে কোড করবে বলেছিলে)
`index.html` আর `privacy.html`-এ দুই জায়গায় (header + footer) এই কমেন্ট
খুঁজে পাবে:

```html
<!-- REPLACE LOGO HERE: এই .logo-mark div-টা তোমার নিজের লোগো (SVG/img) দিয়ে বদলে ফেলো -->
<span class="logo-mark" data-brand-monogram>R</span>
```

এই `<span class="logo-mark">...</span>` অংশটুকু মুছে নিজের `<img>` বা
`<svg>` লোগো বসিয়ে দাও। পাশের `<span data-brand-name>RELAY</span>`
স্বয়ংক্রিয়ভাবে `content.js`-এর `brand.name` থেকে টেক্সট বসায় — চাইলে এই
স্প্যানটাও মুছে শুধু লোগো ইমেজ রাখতে পারো।

`favicon.svg`-ও (`assets/img/favicon.svg`) একই নামে নিজের লোগো দিয়ে
বদলে ফেলতে পারো — ফাইলের নাম একই রাখলে HTML-এ আর কিছু বদলানো লাগবে না।

### ৩. ডাউনলোড লিংক
এখন পর্যন্ত `content.js`-এর `download.primaryCta.href` আর
`download.secondaryCta.href`-এর মান `"#"` — মানে এখনো আসল ফাইলের লিংক
বসানো হয়নি। তোমার `.zip` ফাইল যেখানে হোস্ট করবে (GitHub Release, নিজের
CDN, ইত্যাদি) সেই লিংকটা এখানে বসিয়ে দিও। `hero.primaryCta`-এর href
`"#download"` রেখে দিও — ওটা পেজের ভেতরেই ডাউনলোড সেকশনে নিয়ে যায়।

### ৪. প্রাইভেসি পলিসি — ⚠️ গুরুত্বপূর্ণ
`content.js`-এর `privacyPage.sections`-এ যা লেখা আছে সেগুলো placeholder
টেক্সট, আইনগত ডকুমেন্ট না। পাবলিশ করার আগে এক্সটেনশন আসলে কী করে তার
সাথে মিলিয়ে সত্যি কথা লিখে নিও — বিশেষ করে "What RELAY collects" আর
"What RELAY does not do" অংশ দুটো।

### ৫. রঙ/ফন্ট বদলাতে চাইলে (ঐচ্ছিক)
`assets/css/style.css`-এর একদম উপরে `:root { ... }` ব্লকে সব রঙ CSS
variable আকারে আছে (`--accent`, `--bg`, `--brand-gradient`, ইত্যাদি) —
একটা জায়গায় বদলালে পুরো সাইটে ছড়িয়ে যাবে। **এই রঙগুলো এখন এক্সটেনশনের
আসল popup.css থেকে হুবহু নেয়া** (pure black + flat purple accent +
orange→purple→blue→green brand gradient) — popup-এর রঙ বদলালে এখানেও
মিলিয়ে বদলে নিও, নাহলে দুটো জায়গায় mismatch হয়ে যাবে। ফন্ট বদলাতে চাইলে
`index.html`/`privacy.html`-এর `<head>`-এ Google Fonts লিংক আর CSS-এর
`--font-display`/`--font-body` ভ্যারিয়েবল একসাথে বদলিও।

## লোকালি দেখতে

সরাসরি `index.html`-এ ডাবল-ক্লিক করলেই ব্রাউজারে খুলে যাবে। অথবা টার্মিনাল
থেকে:

```bash
cd relay-site
python3 -m http.server 8000
```
তারপর ব্রাউজারে `http://localhost:8000` খোলো।

## ডিপ্লয় করতে

যেহেতু কোনো build step নেই, যেকোনো static hosting-এ ফোল্ডারটা আপলোড করলেই
হবে — Cloudflare Pages, GitHub Pages, Netlify, Vercel সব কটাই কাজ করবে।
Cloudflare Pages-এ ড্র্যাগ-ড্রপ করেই ডিপ্লয় করা যায় (build command খালি
রেখো, output directory `/` দিও)।

## যা যোগ করা আছে (এমনি এমনি রাখা হয়নি)

- **Trust & Permissions সেকশন** — sideload করা এক্সটেনশনে ইউজাররা "এটা
  নিরাপদ তো?" ভাবে, তাই permission গুলো plain language-এ explain করা
  আছে। manifest.json-এর আসল permissions-এর সাথে মিলিয়ে নিও।
- **Changelog সেকশন** — দেখায় যে এক্সটেনশনটা সক্রিয়ভাবে maintain হচ্ছে,
  যেটা "web store-এ নেই" জিনিসের জন্য বাড়তি ভরসা দেয়।
- **FAQ-তে "কেন Web Store-এ নেই"** প্রশ্নটা ইচ্ছে করেই প্রথম দিকে রাখা —
  এই প্রশ্নটা visitor-এর মাথায় সবার আগে আসবে বলে ধরে নেয়া হয়েছে।

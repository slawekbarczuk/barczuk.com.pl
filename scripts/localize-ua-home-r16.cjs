"use strict";
// UA-home editorial additions are applied after translation, never to PL sources.
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const content = JSON.parse(fs.readFileSync(path.join(root, "i18n/ua-home-r16.json"), "utf8"));
const text = value => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function replaceOnce(html, anchor, replacement, label) {
  const count = html.split(anchor).length - 1;
  if (count !== 1) throw Error("UA home anchor changed: " + label + " (" + count + ")");
  return html.replace(anchor, () => replacement);
}

function bankingSection(c) {
  return '<section class="ua-bank-support" id="bank-support" aria-labelledby="ua-bank-heading"><div class="shell ua-bank-grid">' +
    '<div><p class="eyebrow">' + text(c.eyebrow) + '</p><h2 id="ua-bank-heading">' + c.heading.map(text).join("<br>") + '</h2></div>' +
    '<div class="ua-bank-copy"><p class="ua-bank-intro">' + text(c.intro) + '</p>' +
    '<ul class="ua-bank-list">' + c.items.map(item => '<li><strong>' + text(item.title) + '</strong><span>' + text(item.text) + '</span></li>').join("") + '</ul>' +
    '<div class="ua-bank-questions">' + c.questions.map(q => '<details><summary>' + text(q.question) + '</summary><div>' + q.paragraphs.map(p => '<p>' + text(p) + '</p>').join("") + '</div></details>').join("") + '</div>' +
    '<p class="ua-bank-notice">' + text(c.notice) + '</p><a class="text-link" href="#kontakt">' + text(c.action) + '</a></div></div></section>';
}

module.exports = function localizeUaHome(html) {
  const hero = content.hero;
  html = replaceOnce(html, '<p class="eyebrow">Консультування для підприємств</p>', '<p class="eyebrow">' + text(hero.eyebrow) + '</p>', "hero audience");
  html = replaceOnce(html, '<h1>Незалежне<br>фінансове консультування</h1>', '<h1>' + hero.heading.map(text).join('<br>') + '</h1>', "balanced UA heading");
  html = replaceOnce(html, '<p class="lead">Підтримка компаній у підготовці фінансування, отриманні банківських гарантій, погодженні умов із банками, реалізації інвестицій та обслуговуванні заборгованості.</p>', '<p class="lead">' + text(hero.lead) + '</p>', "hero lead");
  html = replaceOnce(html, '>Обговорімо потреби компанії </a>', '>' + text(hero.primaryAction) + ' </a>', "hero contact action");
  html = replaceOnce(html, '>Ознайомитися з послугами </a>', '>' + text(hero.secondaryAction) + ' </a>', "hero scope action");
  const media = /<div class="hero-visual hero-media hero-slideshow"[^>]*>[\s\S]*?<\/div>/g;
  if ((html.match(media) || []).length !== 1) throw Error("UA home slideshow anchor changed");
  const slides = hero.slides.map((slide, i) => {
    if (!/^\/assets\/photos-r16\/ua\/[a-z-]+\.webp$/.test(slide.src) || !fs.existsSync(path.join(root, slide.src.slice(1)))) throw Error("Missing or invalid UA photo " + slide.src);
    return '<img class="hero-slide' + (i === 0 ? ' is-visible' : '') + '" src="' + text(slide.src) + '" width="' + slide.width + '" height="' + slide.height + '" alt="" aria-hidden="true"' + (i === 0 ? ' fetchpriority="high"' : '') + ' decoding="async">';
  }).join("\n");
  html = html.replace(media, () => '<div class="hero-visual hero-media hero-slideshow" data-hero-slideshow role="img" aria-label="' + text(hero.ariaLabel) + '">\n' + slides + '\n</div>');
  for (const item of content.replacements) html = replaceOnce(html, item.from, item.to, item.from.slice(0, 50));
  const nextSection = '<section class="situations" id="kiedy-warto">';
  const discovery = '<div class="shell" style="padding:25px 0 38px"><p class="eyebrow" style="margin-bottom:10px">Фінансування бізнесу в Польщі</p><p style="max-width:850px;color:var(--muted)">Маєте польську компанію з українським капіталом? Дізнайтеся, як підготувати фінансові документи, кредитну заявку та переговори з банком.</p><a class="text-link" href="/ua/finansuvannia-biznesu-v-polshchi/">Фінансування бізнесу з українським капіталом у Польщі →</a></div>';
  html = replaceOnce(html, nextSection, bankingSection(content.bankingSupport) + discovery + nextSection, "bank support placement");
  // Organic landing-page link on the UA homepage; preserved after each rebuild.
  html = replaceOnce(html, '<a class="text-link" href="/ua/finansuvannia/">'+text(hero.secondaryAction)+' </a>', '<a class="text-link" href="/ua/finansuvannia-biznesu-v-polshchi/">'+text("Фінансування компаній з українським капіталом")+' </a>', "UA financing SEO hero link");
  html = replaceOnce(html, '</head>', '<link rel="stylesheet" href="/assets/ua-home-r16.css?v=R16-ua-20261120b"></head>', "UA-only stylesheet");
  return html;
};

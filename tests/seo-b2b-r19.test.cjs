"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const read = p => fs.readFileSync(path.join(root,p), "utf8");
const services=[
 {slug:"modele-finansowe-dla-bankow",phrase:"Modele finansowe i prognozy dla banków",marker:"zintegrowana prognoza"},
 {slug:"gwarancje-bankowe-dla-firm",phrase:"Gwarancje bankowe dla przedsiębiorstw",marker:"beneficjentem gwarancji"}
];
test("R19 SEO: focused B2B pages have unique titles, self canonicals and safe links",()=>{
 const titles=new Set(),canonicals=new Set();
 for(const item of services){
  const h=read(item.slug+"/index.html"),url="https://www.barczuk.com.pl/"+item.slug+"/";
  assert.match(h,/<html lang="pl">/);
  assert.match(h,/<meta name="robots" content="index,follow">/);
  const title=h.match(/<title>([^<]+)<\/title>/)?.[1];
  assert.ok(title&&!titles.has(title),item.slug+" unique title");
  titles.add(title);
  assert.ok(h.includes('<link rel="canonical" href="'+url+'">'),item.slug+" canonical");
  canonicals.add(url);
  assert.equal((h.match(/<link rel="canonical"/g)||[]).length,1);
  assert.equal((h.match(/<h1\b/g)||[]).length,1);
  assert.ok(h.includes(item.phrase));
  assert.ok(h.includes(item.marker));
  assert.ok(!h.includes('hreflang="x-default"'),"No false translated equivalent");
  assert.ok(h.includes('href="mailto:kontakt@barczuk.com.pl"'));
  assert.ok(h.includes('/assets/analytics-r17.js?v=r17-audit-v4'));
  assert.ok(h.includes('href="/finansowanie-przedsiebiorstw/"'));
  assert.ok(h.includes('SB-WEB-1126-R16'));
 }
 assert.equal(titles.size,2);assert.equal(canonicals.size,2);
});
test("R19 SEO: links are present in Polish parent, absent in the translations",()=>{
 const pl=read("finansowanie-przedsiebiorstw/index.html");
 for(const item of services) assert.ok(pl.includes('href="/'+item.slug+'/">'));
 for(const lang of ["en/corporate-financing/index.html","de/unternehmensfinanzierung/index.html","ua/finansuvannia/index.html"]){
  const page=read(lang);
  for(const item of services)assert.ok(!page.includes('href="/'+item.slug+'/">'),lang+" must not show Polish-only SEO links");
 }
});
test("R19 SEO: new pages appear once in the reproducible 23-entry sitemap",()=>{
 const xml=read("sitemap.xml");
 const locs=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
 assert.equal(locs.length,23);
 assert.equal(new Set(locs).size,23);
 for(const item of services)assert.equal(locs.filter(l=>l==="https://www.barczuk.com.pl/"+item.slug+"/").length,1);
 const ua=read("scripts/build-ua-r16.cjs"),en=read("scripts/build-i18n-r16.cjs");
 assert.ok(ua.includes('injectSeo("modele"')&&ua.includes('injectSeo("warunki"'));
 assert.ok(en.includes("BARCZUK SEO R19 START"));
});
test("R19 SEO: legacy finance redirects, unrelated retired services are not redirected to finance",()=>{
 const cfg=JSON.parse(read("staticwebapp.config.json"));
 const redirect=cfg.routes.find(r=>r.route==="/uslugi/finanse-i-analiza-biznesowa*");
 assert.equal(redirect?.redirect,"/finansowanie-przedsiebiorstw/");
 assert.equal(redirect?.statusCode,301);
 for(const old of ["/uslugi/uslugi-prawnicze/","/uslugi/doradztwo-i-zarzadzanie/","/uslugi/it-i-automatyzacja/"])
  assert.ok(!cfg.routes.some(r=>r.route===old&&r.redirect),old+" must not mislead");
 assert.ok(read("404.html").includes('content="noindex,follow"'));
});

"use strict";
const {test}=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.join(__dirname,"..");
const paths={
 pl:["index.html","finansowanie-przedsiebiorstw/index.html","informacje/informacje-prawne/index.html","informacje/prywatnosc/index.html","informacje/cookies/index.html"],
 en:["en/index.html","en/corporate-financing/index.html","en/legal-information/index.html","en/privacy/index.html","en/cookies/index.html"],
 de:["de/index.html","de/unternehmensfinanzierung/index.html","de/rechtliche-hinweise/index.html","de/datenschutz/index.html","de/cookies/index.html"],
 ua:["ua/index.html","ua/finansuvannia/index.html","ua/pravova-informatsiia/index.html","ua/konfidentsiinist/index.html","ua/cookies/index.html"]
};
const expected={
 pl:["https://portal.barczuk.com.pl/","Strefa klienta","Porozmawiajmy"],
 en:["https://portal.barczuk.com.pl/en/","Client portal","Let's talk"],
 de:["https://portal.barczuk.com.pl/de/","Kundenportal","Kontakt aufnehmen"],
 ua:["https://portal.barczuk.com.pl/","Клієнтський портал","Обговорімо"]
};
test("R16 navigation: contact plain, portal framed last, across 20 pages and 404",()=>{
 for(const [locale,files] of Object.entries(paths)){
  const [url,portalLabel,contactLabel]=expected[locale];
  for(const p of files){
   const html=fs.readFileSync(path.join(root,p),"utf8");
   const nav=html.match(/<nav class="nav-links"[\s\S]*?<\/nav>/)?.[0];
   assert.ok(nav,p+" missing navigation");
   const links=[...nav.matchAll(/<a\b([^>]*)>([^<]*)<\/a>/g)];
   assert.ok(links.length>=5,p+" too few links");
   const before=links.at(-2),last=links.at(-1);
   assert.equal(before[2].trim(),contactLabel,p+" contact must be penultimate");
   assert.ok(!/class=/.test(before[1]),p+" contact must be an ordinary, unframed link");
   assert.match(before[1],/href="(?:\/|#kontakt)/,p+" contact href");
   assert.equal(last[2].trim(),portalLabel,p+" portal must be final");
   assert.ok(last[1].includes('class="nav-cta nav-portal"'),p+" portal must own the outlined CTA");
   assert.ok(last[1].includes('href="'+url+'"'),p+" wrong portal URL");
   assert.ok(!nav.includes('class="nav-cta nav-contact"'),p+" old framed contact remains");
  }
 }
 const html=fs.readFileSync(path.join(root,"404.html"),"utf8");
 const nav=html.match(/<nav class="nav-links"[\s\S]*?<\/nav>/)?.[0];
 assert.ok(nav&&nav.includes('<a href="/#kontakt">Porozmawiajmy </a><a class="nav-cta nav-portal" href="https://portal.barczuk.com.pl/">Strefa klienta</a>'),"404 menu consistency");
 const css=fs.readFileSync(path.join(root,"assets/editorial-r16.css"),"utf8");
 assert.match(css,/\.nav-links \.nav-cta\{background:transparent;border:1px solid var\(--navy\)/);
 assert.match(css,/\.nav-links \.nav-cta:hover\{background:var\(--navy\);color:#fff\}/);
});
test("R16 client portal: medium viewport supports existing toggle menu",()=>{
 const css=fs.readFileSync(path.join(root,"assets/language-switcher-r16.css"),"utf8");
 assert.match(css,/@media \(min-width:761px\) and \(max-width:1120px\)/);
 assert.match(css,/\.header \.nav-links\.is-open\{display:flex\}/);
 assert.match(css,/\.header \.menu-toggle\{display:flex/);
 for(const lang of ["en","de"]){
  const dict=JSON.parse(fs.readFileSync(path.join(root,`i18n/${lang}-main.json`),"utf8"));
  assert.equal(dict["Strefa klienta"],expected[lang][1]);
 }
});

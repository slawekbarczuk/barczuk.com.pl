"use strict";
const {test}=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.join(__dirname,"..");
const paths={
 pl:["index.html","finansowanie-przedsiebiorstw/index.html","informacje/informacje-prawne/index.html","informacje/prywatnosc/index.html","informacje/cookies/index.html"],
 en:["en/index.html","en/corporate-financing/index.html","en/legal-information/index.html","en/privacy/index.html","en/cookies/index.html"],
 de:["de/index.html","de/unternehmensfinanzierung/index.html","de/rechtliche-hinweise/index.html","de/datenschutz/index.html","de/cookies/index.html"]
};
const expected={
 pl:['https://portal.barczuk.com.pl/','Strefa klienta'],
 en:['https://portal.barczuk.com.pl/en/','Client portal'],
 de:['https://portal.barczuk.com.pl/de/','Kundenportal']
};
test("R16 client portal: visible localized menu link on all 15 pages",()=>{
 for(const [locale,files] of Object.entries(paths)){
  const [url,label]=expected[locale];
  for(const p of files){
   const html=fs.readFileSync(path.join(root,p),"utf8");
   const nav=html.match(/<nav class="nav-links"[\s\S]*?<\/nav>/)?.[0];
   assert.ok(nav,p+" missing navigation");
   const matches=[...nav.matchAll(/<a class="nav-portal" href="([^"]+)">([^<]+)<\/a>/g)];
   assert.equal(matches.length,1,p+" must have exactly one portal link");
   assert.equal(matches[0][1],url,p+" portal URL");
   assert.equal(matches[0][2],label,p+" portal label");
   assert.ok(nav.includes('class="nav-cta nav-contact"'),p+" lost existing contact CTA");
  }
 }
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

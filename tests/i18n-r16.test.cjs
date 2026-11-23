"use strict";
const {test}=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const base="https://www.barczuk.com.pl";
const pageSets=[
 {id:"home",paths:{pl:"/",en:"/en/",de:"/de/"}},
 {id:"financing",paths:{pl:"/finansowanie-przedsiebiorstw/",en:"/en/corporate-financing/",de:"/de/unternehmensfinanzierung/"}},
 {id:"legal",paths:{pl:"/informacje/informacje-prawne/",en:"/en/legal-information/",de:"/de/rechtliche-hinweise/"}},
 {id:"privacy",paths:{pl:"/informacje/prywatnosc/",en:"/en/privacy/",de:"/de/datenschutz/"}},
 {id:"cookies",paths:{pl:"/informacje/cookies/",en:"/en/cookies/",de:"/de/cookies/"}}
];
const routeFile=r=>r.replace(/^\//,"")+"index.html";
test("R16 multilingual: 15 complete static pages, correct lang and canonical",()=>{
 for(const set of pageSets)for(const lang of ["pl","en","de"]){
  const route=set.paths[lang],file=routeFile(route),html=read(file);
  assert.ok(Buffer.byteLength(html)>18000,"Not a full static page: "+file);
  assert.match(html,new RegExp('<html lang="'+lang+'">'),file);
  assert.ok(html.includes('<link rel="canonical" href="'+base+route+'">'),file);
  assert.match(html,/<meta name="robots" content="index,follow">/,file);
  assert.ok(html.includes('data-language-switcher'),file);
  assert.ok(html.includes('href="/assets/language-switcher-r16.css?v=R16-ua-nav2"'),file);
  assert.match(html,/<meta name="description" content="[^"]{15,}">/,file);
  assert.match(html,/<title>[^<]{12,}<\/title>/,file);
 }
});
test("R16 multilingual: each switcher targets corresponding page",()=>{
 for(const set of pageSets)for(const lang of ["pl","en","de"]){
  const html=read(routeFile(set.paths[lang]));
  const match=html.match(/<nav class="language-switcher"[\s\S]*?<\/nav>/);
  assert.ok(match,"No language switcher "+set.id+" "+lang);
  const sw=match[0];
  for(const alt of ["pl","en","de"])assert.ok(sw.includes('href="'+set.paths[alt]+'" hreflang="'+alt+'" lang="'+alt+'"'),set.id+" "+lang+"->"+alt);
  assert.equal((sw.match(/aria-current="page"/g)||[]).length,1,set.id+" "+lang);
  assert.ok(sw.includes('href="'+set.paths[lang]+'" hreflang="'+lang+'" lang="'+lang+'"'),set.id);
 }
});
test("R16 multilingual: reciprocal hreflang and Polish x-default",()=>{
 for(const set of pageSets)for(const lang of ["pl","en","de"]){
  const html=read(routeFile(set.paths[lang]));
  for(const alt of ["pl","en","de"])assert.ok(
   html.includes('<link rel="alternate" hreflang="'+alt+'" href="'+base+set.paths[alt]+'">'),set.id+"/"+lang+" missing "+alt);
  assert.ok(html.includes('<link rel="alternate" hreflang="x-default" href="'+base+set.paths.pl+'">'),set.id);
  assert.equal((html.match(/hreflang="x-default"/g)||[]).length,1,set.id+"/"+lang);
 }
});
test("R16 multilingual: translated financing, guarantees and imagery",()=>{
 const en=read("en/index.html"),de=read("de/index.html");
 assert.match(en,/Independent<br>financial advisory/);
 assert.match(de,/Unabhängige<br>Finanzierungsberatung/);
 const heroSlides=html=>{
  const region=html.match(/<div class="hero-visual hero-media hero-slideshow"[^>]*>([\s\S]*?)<\/div>/)?.[1];
  assert.ok(region,"Homepage hero slideshow missing");
  return [...region.matchAll(/<img class="hero-slide(?: is-visible)?" src="([^"]+)"/g)].map(m=>m[1]);
 };
 const lodz=["fabryczna","manufaktura","piotrkowska","ec1"].map(n=>"/assets/photos-r16/"+n+".webp");
 for(const file of ["index.html","en/index.html","de/index.html"])
  assert.deepEqual(heroSlides(read(file)),lodz,file+" must show only Łódź");
 assert.match(de,/Künstlerische Visualisierungen der Architektur von Łódź/);
 assert.doesNotMatch(de,/photos-de-r18|Frankfurt am Main, Berlin und München/);
 assert.doesNotMatch(read("scripts/build-i18n-r16.cjs"),/applyGermanCityPhotos|photos-de-r18/,
  "Localization rebuild must not reintroduce German city slides");
 assert.deepEqual(heroSlides(read("ua/index.html")),[
  "/assets/photos-r16/ua/kyiv-dnipro.webp",
  "/assets/photos-r16/ua/odesa.webp",
  "/assets/photos-r16/ua/lviv.webp"
 ],"Ukrainian slides must remain unchanged");
 const enFin=read("en/corporate-financing/index.html"),deFin=read("de/unternehmensfinanzierung/index.html");
 for(const [source,label] of [[enFin,"Bank guarantees"],[deFin,"Bankgarantien"]]){
  assert.ok(source.includes(label),"Missing guarantee expertise "+label);
  assert.ok(source.includes("/api/contact"),"Contact endpoint unexpectedly translated");
  assert.ok(source.includes("/api/contact-settings"),"Contact configuration unexpectedly translated");
  assert.ok(source.includes("contact-turnstile"),"Anti-bot unexpectedly changed");
  assert.ok(source.includes("SB-WEB-1126-R16"),"Version changed");
 }
 assert.ok(enFin.includes('href="/en/privacy/"'));
 assert.ok(deFin.includes('href="/de/datenschutz/"'));
});
test("R16 multilingual: legal, privacy and cookie texts",()=>{
 const pair=[
  ["en/legal-information/index.html",["Legal information","Confidentiality of correspondence","Polish Civil Code"]],
  ["de/rechtliche-hinweise/index.html",["Rechtliche Hinweise","Vertraulichkeit der Korrespondenz","polnischen Zivilgesetzbuchs"]],
  ["en/privacy/index.html",["Article 6(1)(b) GDPR","12 months","Microsoft Graph","Azure Table Storage"]],
  ["de/datenschutz/index.html",["Art. 6 Abs. 1","zwölf Monate","Microsoft Graph","Azure Table Storage"]],
  ["en/cookies/index.html",["Cloudflare Web Analytics","Google Analytics 4 — after consent","barczuk_analytics_consent_v2"]],
  ["de/cookies/index.html",["Cloudflare Web Analytics","Google Analytics 4 — nach Einwilligung","barczuk_analytics_consent_v2"]]
 ];
 for(const [p,parts] of pair){
  const s=read(p);
  for(const fragment of parts)assert.ok(s.includes(fragment),p+" missing "+fragment);
  assert.ok(s.includes('kontakt@barczuk.com.pl'),p);
 }
});
test("R16 multilingual: internal navigation resolves to actual pages",()=>{
 const all=new Set();
 for(const set of pageSets)for(const l of ["pl","en","de"])all.add(set.paths[l]);
 for(const ua of ["/ua/","/ua/finansuvannia/","/ua/pravova-informatsiia/","/ua/konfidentsiinist/","/ua/cookies/"])all.add(ua);
 for(const set of pageSets)for(const l of ["pl","en","de"]){
  const file=routeFile(set.paths[l]),s=read(file);
  for(const [,href] of s.matchAll(/\bhref="(\/[^"]*)"/g)){
   if(href.startsWith("/assets/")||href.startsWith("/favicon")||href.startsWith("/api/"))continue;
   const pathOnly=href.split("#")[0].split("?")[0];
   if(!pathOnly)continue;
   assert.ok(all.has(pathOnly),"Broken localized navigation "+file+" -> "+href);
  }
 }
});
test("R16 multilingual: 23 sitemap URLs after focused B2B services, Polish default",()=>{
 const sitemap=read("sitemap.xml");
 const locs=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
 assert.equal(locs.length,23);
 assert.equal(new Set(locs).size,21);
 assert.equal(locs[0],base+"/");
 for(const set of pageSets)for(const l of ["pl","en","de"])assert.ok(locs.includes(base+set.paths[l]));
 const pl=read("index.html");
 assert.match(pl,/<html lang="pl">/);
 assert.match(pl,/Niezależne<br>doradztwo finansowe/);
 assert.match(pl,/href="\/" hreflang="pl" lang="pl" title="Polski" aria-current="page"/);
});
test("R16 multilingual: responsive German heading and language switcher",()=>{
 const s=read("assets/language-switcher-r16.css");
 assert.match(s,/html\[lang="de"\] \.hero \.hero-copy h1/);
 assert.match(s,/@media\(max-width:760px\)/);
 assert.match(s,/\.language-switcher a\[aria-current="page"\]/);
});

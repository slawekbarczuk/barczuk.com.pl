"use strict";
const {test}=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const crypto=require("node:crypto");
const root=path.join(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const hash=text=>crypto.createHash("sha256").update(text.replace(/\r\n/g,"\n")).digest("hex");
const baseline=JSON.parse(read("tests/fixtures/r09-preserved.json"));
const r16Baseline=JSON.parse(read("tests/fixtures/r16-preserved.json"));
const formShape=html=>html.replace(/<svg\b[^>]*class="arrow-ne"[^>]*>[\s\S]*?<\/svg>/g,"").replace(/<span aria-hidden="true">\s*<\/span>/g,"").replace(/>[^<]*</g,"><").replace(/\s+/g," ").trim();
const pages=["index.html","finansowanie-przedsiebiorstw/index.html","informacje/informacje-prawne/index.html","informacje/prywatnosc/index.html","informacje/cookies/index.html"];

test("R16 production pages have current version and canonical metadata without proposal controls",()=>{
 for(const p of [...pages,"404.html"]){
  const html=read(p);
  assert.equal((html.match(/SB-WEB-1126-R\d+/g)||[]).length,1,p);
  assert.match(html,/SB-WEB-1126-R16/,p);
  assert.match(html,/href="\/assets\/editorial-r16\.css\?v=R16"/,p);
  assert.doesNotMatch(html,/PROPOZYCJA P0[12]|data-preview|class="proposal-bar"|class="preview-note"/,p);
  assert.match(html,/<link rel="canonical" href="https:\/\/www\.barczuk\.com\.pl\//,p);
  assert.match(html,/class="brand-square brand-dot"/,p);
  assert.match(html,/class="nav-cta nav-contact"/,p);
  if(p!=="404.html") assert.match(html,/<meta name="robots" content="index,follow">/,p);
 }
});

test("R16 preserves the working P04 markup, client logic and hidden-until-ready behavior on both offer pages",()=>{
 for(const p of pages.slice(0,2)){
  const html=read(p);
  const form=html.match(/<form id="contact-request-form"[\s\S]*?<\/form>/)?.[0];
  assert.ok(form,p);
  assert.equal(hash(formShape(form)),r16Baseline.form_structure,p);
  const js=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).find(s=>s.includes('const form=document.getElementById("contact-request-form")'));
  const unchangedLogic=js.replace("Trwa wysyłanie zgłoszenia…","Przekazuję prośbę o kontakt…").replace("Zgłoszenie zostało przyjęte do wysyłki. Do usłyszenia!","Prośba została przyjęta do wysyłki. Dziękuję za kontakt.");
  assert.equal(hash(unchangedLogic),baseline.form_script,p);
  assert.match(html,/<section class="contact-form-section" id="formularz-kontaktowy" aria-labelledby="contact-form-heading" hidden>/);
  assert.match(html,/\.contact-form-section\[hidden\]\{display:none!important\}/);
  assert.match(js,/if\(!config\.enabled\|\|typeof config\.siteKey!=="string"\)return;\s*section\.hidden=false;/);
 }
});

test("R16 leaves the P04 backend and existing deployment workflows unchanged",()=>{
 for(const [p,expected] of Object.entries(baseline.protected_files)) assert.equal(hash(read(p)),expected,p);
 assert.equal(JSON.parse(read("staticwebapp.config.json")).platform.apiRuntime,"node:20");
});

test("R16 keeps business identity and the full privacy policy, including approved retention",()=>{
 const legal=read("informacje/informacje-prawne/index.html");
 assert.match(legal,/8671417151/);
 assert.match(legal,/523942958/);
 assert.match(legal,/id="ochrona-danych"[\s\S]*?href="\/informacje\/prywatnosc\/"/);
 for(const p of pages.slice(2)) assert.doesNotMatch(read(p),/Bookings/);
 const privacy=read("informacje/prywatnosc/index.html");
 assert.match(privacy,/12 miesięcy od zakończenia sprawy/);
 assert.match(privacy,/Microsoft Graph/);
 assert.match(privacy,/Cloudflare Turnstile/);
 assert.match(privacy,/Azure Table Storage/);
});

test("R16 exposes the consolidated offer and withdraws the former standalone services",()=>{
 const xml=read("sitemap.xml");
 assert.equal((xml.match(/<loc>/g)||[]).length,5);
 assert.match(xml,/https:\/\/www\.barczuk\.com\.pl\/finansowanie-przedsiebiorstw\//);
 assert.doesNotMatch(xml,/\/uslugi\//);
 const retired=["finanse-i-analiza-biznesowa","uslugi-prawnicze","doradztwo-i-zarzadzanie","it-i-automatyzacja"];
 for(const name of retired) assert.equal(fs.existsSync(path.join(root,"uslugi",name,"index.html")),false,name);
 const config=JSON.parse(read("staticwebapp.config.json"));
 assert.deepEqual(config.routes,[{route:"/uslugi/finanse-i-analiza-biznesowa*",redirect:"/finansowanie-przedsiebiorstw/",statusCode:301}]);
 assert.equal(config.responseOverrides["404"].rewrite,"/404.html");
});

test("R16 home has three recognizable financing situations and a concise cooperation proposition",()=>{
 const html=read("index.html");
 const cases=html.match(/<section class="situations" id="kiedy-warto">[\s\S]*?<\/section>/)?.[0];
 assert.ok(cases,"Missing R16 situations section");
 assert.equal((cases.match(/<li>/g)||[]).length,3);
 for(const term of ["Planowana inwestycja.","Negocjacje z bankami.","Istniejące zadłużenie."]) assert.ok(cases.includes(term),term);
 assert.ok(html.indexOf('id="zakres"') < html.indexOf('id="kiedy-warto"'));
 assert.ok(html.indexOf('id="kiedy-warto"') < html.indexOf('id="jak-pracuje"'));
 const approach=html.match(/<section class="approach" id="jak-pracuje">[\s\S]*?<\/section>/)?.[0];
 assert.ok(approach);
 assert.equal((approach.match(/<article>/g)||[]).length,3);
 assert.equal((approach.match(/<p class="intro">/g)||[]).length,1);
 const cooperation=html.match(/<section class="cooperation" id="wspolpraca">[\s\S]*?<\/section>/)?.[0];
 assert.ok(cooperation);
 assert.match(cooperation,/Jasne zadania/);
 assert.match(cooperation,/Przykładowe rezultaty/);
 assert.match(html,/także w finansowaniu konsorcjalnym/);
});

test("R16 detail page highlights bank collateral and syndicated financing",()=>{
 const html=read("finansowanie-przedsiebiorstw/index.html");
 const section=html.match(/<section class="scope-item" id="warunki">[\s\S]*?<\/section>/)?.[0];
 assert.ok(section);
 assert.match(section,/zabezpieczenia bankowe/);
 assert.match(section,/Finansowanie konsorcjalne/);
 assert.match(section,/uzgadniane z właściwymi doradcami przedsiębiorstwa/);
 for(const anchor of ["struktura","modele","proces","warunki","inwestycje","monitorowanie"]) {
   assert.match(html,new RegExp('id="'+anchor+'"'));
 }
});

test("R16 has differentiated meta descriptions without modifying the URL paths",()=>{
 const home=read("index.html"), detail=read("finansowanie-przedsiebiorstw/index.html");
 const m=html=>(html.match(/<meta name="description" content="([^"]+)"/)||[])[1];
 const a=m(home),b=m(detail);
 assert.ok(a&&b&&a!==b);
 assert.ok(a.length>=80&&a.length<=160);
 assert.ok(b.length>=80&&b.length<=160);
 for(const [html,desc] of [[home,a],[detail,b]]) assert.ok(html.includes('<meta property="og:description" content="'+desc+'">'));
 assert.match(home,/href="https:\/\/www\.barczuk\.com\.pl\/">/);
 assert.match(detail,/href="https:\/\/www\.barczuk\.com\.pl\/finansowanie-przedsiebiorstw\/">/);
});

test("R16 provides an original visual system without weakening SEO or P04",()=>{
 const home=read("index.html"), css=read("assets/editorial-r16.css");
 assert.match(home,/data-src="\/assets\/video\/lodz-r16\.mp4"/);
 assert.doesNotMatch(home,/class="editorial-band"/);
 assert.match(home,/Doświadczenie w bankowości korporacyjnej od 1995 roku/);
 assert.match(css,/--navy:#14243a/);
 assert.match(css,/@media\(max-width:760px\)/);
 assert.match(css,/\.contact-form-section\[hidden\]\{display:none!important\}/);
 assert.doesNotMatch(css,/@import|fonts\.googleapis|https?:\/\//);
 assert.match(home,/<video[^>]* muted playsinline loop preload="none"/);
 assert.match(home,/data-media-toggle hidden/);
 assert.match(home,/<section class="contact-form-section"[^>]* hidden>/);
});

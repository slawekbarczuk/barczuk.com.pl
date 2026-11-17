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
const pages=["index.html","finansowanie-przedsiebiorstw/index.html","informacje/informacje-prawne/index.html","informacje/prywatnosc/index.html","informacje/cookies/index.html"];

test("R10 production pages have current version and canonical metadata without proposal controls",()=>{
 for(const p of [...pages,"404.html"]){
  const html=read(p);
  assert.equal((html.match(/SB-WEB-1126-R\d+/g)||[]).length,1,p);
  assert.match(html,/SB-WEB-1126-R10/,p);
  assert.doesNotMatch(html,/PROPOZYCJA P0[12]|data-preview|class="proposal-bar"|class="preview-note"/,p);
  assert.match(html,/<link rel="canonical" href="https:\/\/www\.barczuk\.com\.pl\//,p);
  assert.match(html,/class="brand-square brand-dot"/,p);
  assert.match(html,/class="nav-cta nav-contact"/,p);
  if(p!=="404.html") assert.match(html,/<meta name="robots" content="index,follow">/,p);
 }
});

test("R10 preserves the working P04 markup, client logic and hidden-until-ready behavior on both offer pages",()=>{
 for(const p of pages.slice(0,2)){
  const html=read(p);
  const form=html.match(/<form id="contact-request-form"[\s\S]*?<\/form>/)?.[0];
  assert.ok(form,p);
  assert.equal(hash(form),baseline.form_markup,p);
  const js=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]).find(s=>s.includes('const form=document.getElementById("contact-request-form")'));
  assert.equal(hash(js),baseline.form_script,p);
  assert.match(html,/<section class="contact-form-section request-form" id="formularz-kontaktowy" aria-labelledby="contact-form-heading" hidden>/);
  assert.match(html,/\.contact-form-section\[hidden\]\{display:none!important\}/);
  assert.match(js,/if\(!config\.enabled\|\|typeof config\.siteKey!=="string"\)return;\s*section\.hidden=false;/);
 }
});

test("R10 leaves the P04 backend and existing deployment workflows unchanged",()=>{
 for(const [p,expected] of Object.entries(baseline.protected_files)) assert.equal(hash(read(p)),expected,p);
 assert.equal(JSON.parse(read("staticwebapp.config.json")).platform.apiRuntime,"node:20");
});

test("R10 preserves the full legal and privacy content, including the approved retention",()=>{
 for(const [p,expected] of Object.entries(baseline.legal_main)) assert.equal(hash(read(p).match(/<main\b[\s\S]*?<\/main>/)[0]),expected,p);
 const privacy=read("informacje/prywatnosc/index.html");
 assert.match(privacy,/12 miesięcy od zakończenia sprawy/);
 assert.match(privacy,/Microsoft Graph/);
 assert.match(privacy,/Cloudflare Turnstile/);
 assert.match(privacy,/Azure Table Storage/);
});

test("R10 exposes the consolidated offer and withdraws the former standalone services",()=>{
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

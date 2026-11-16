"use strict";
const {test} = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.join(__dirname,"..");

test("R09 offer-led about section preserves brand mark and contact identity",()=>{
 const html=fs.readFileSync(path.join(root,"index.html"),"utf8");
 const about=html.match(/<section class="about" id="o-mnie">[\s\S]*?<\/section>/)?.[0];
 assert.ok(about,"about section must exist");
 assert.match(about,/<h2 class="about-heading-offer">Doradztwo<br>dla biznesu<span class="about-square" aria-hidden="true"><\/span><\/h2>/);
 assert.doesNotMatch(about,/<h2>Sławomir<br>Barczuk/);
 assert.match(html,/@media\(max-width:560px\)\{\.about h2\.about-heading-offer/);
 assert.match(html,/kontakt@barczuk\.com\.pl/);
});

test("R09 privacy information includes approved retention and actual processors",()=>{
 const html=fs.readFileSync(path.join(root,"informacje/prywatnosc/index.html"),"utf8");
 const section=html.match(/<section id="formularz-prywatnosc">[\s\S]*?<\/section>/)?.[0];
 assert.ok(section);
 assert.match(section,/12 miesięcy od zakończenia sprawy/);
 assert.match(section,/Microsoft Graph/);
 assert.match(section,/Cloudflare Turnstile/);
 assert.match(section,/Azure Table Storage/);
 assert.doesNotMatch(section,/Okres retencji korespondencji .*zostanie doprecyzowany/);
});

const releasePages=[
 "index.html","informacje/informacje-prawne/index.html",
 "informacje/prywatnosc/index.html","informacje/cookies/index.html",
 "uslugi/finanse-i-analiza-biznesowa/index.html","uslugi/uslugi-prawnicze/index.html",
 "uslugi/doradztwo-i-zarzadzanie/index.html","uslugi/it-i-automatyzacja/index.html"
];
test("R09 footer version on eight pages",()=>{
 for(const page of releasePages){
   const html=fs.readFileSync(path.join(root,page),"utf8");
   const matches=[...html.matchAll(/SB-WEB-1126-R0\d/g)];
   assert.deepEqual(matches.map(m=>m[0]),["SB-WEB-1126-R09"],page);
 }
});
test("R09 sitemap covers eight updated pages",()=>{
 const xml=fs.readFileSync(path.join(root,"sitemap.xml"),"utf8");
 const locs=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)];
 const mods=[...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)];
 assert.equal(locs.length,8);
 assert.equal(mods.length,8);
 assert.ok(mods.every(m=>m[1]==="2026-11-16"));
});

test("P04 remains hidden unless the backend confirms it is configured",()=>{
 const html=fs.readFileSync(path.join(root,"index.html"),"utf8");
 assert.match(html,/<section class="contact-form-section" id="formularz-kontaktowy" aria-labelledby="contact-form-heading" hidden>/);
 assert.match(html,/if\(!config\.enabled\|\|typeof config\.siteKey!=="string"\)return;\s*section\.hidden=false;/);
 assert.match(html,/const section=document\.getElementById\("formularz-kontaktowy"\)/);
});

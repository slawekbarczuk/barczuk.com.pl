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

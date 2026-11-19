"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict");
const fs=require("node:fs"),path=require("node:path");
const root=path.join(__dirname,"..");
const routeSets=[
 ["/","/en/","/de/","/ua/","ua/index.html"],
 ["/finansowanie-przedsiebiorstw/","/en/corporate-financing/","/de/unternehmensfinanzierung/","/ua/finansuvannia/","ua/finansuvannia/index.html"],
 ["/informacje/informacje-prawne/","/en/legal-information/","/de/rechtliche-hinweise/","/ua/pravova-informatsiia/","ua/pravova-informatsiia/index.html"],
 ["/informacje/prywatnosc/","/en/privacy/","/de/datenschutz/","/ua/konfidentsiinist/","ua/konfidentsiinist/index.html"],
 ["/informacje/cookies/","/en/cookies/","/de/cookies/","/ua/cookies/","ua/cookies/index.html"]
];
test("Ukrainian language uses lowercase /ua/ URLs and BCP-47 uk",()=>{
 for(const [pl,en,de,ua,file] of routeSets){
  const html=fs.readFileSync(path.join(root,file),"utf8");
  assert.match(html,/<html lang="uk">/);
  assert.ok(html.includes('<link rel="canonical" href="https://www.barczuk.com.pl'+ua+'">'));
  assert.ok(html.includes('<link rel="alternate" hreflang="uk" href="https://www.barczuk.com.pl'+ua+'">'));
  assert.ok(html.includes('href="'+ua+'" hreflang="uk" lang="uk" title="Українська" aria-current="page">UA</a>'));
  assert.ok(html.includes('href="'+pl+'" hreflang="pl"'));
  assert.ok(html.includes('href="'+en+'" hreflang="en"'));
  assert.ok(html.includes('href="'+de+'" hreflang="de"'));
  assert.ok(html.includes('href="/assets/language-switcher-r16.css?v=R16-ua"'));
  assert.ok(html.includes('class="nav-portal"'));
  assert.ok(!html.includes('<html lang="pl">'));
 }
});
test("Ukrainian body, financing and legal/privacy materials are translated",()=>{
 const read=p=>fs.readFileSync(path.join(root,p),"utf8");
 assert.ok(read("ua/index.html").includes("Незалежне"));
 assert.ok(read("ua/index.html").includes("Клієнтський портал"));
 assert.ok(read("ua/finansuvannia/index.html").includes("Банківські гарантії"));
 assert.ok(read("ua/pravova-informatsiia/index.html").includes("Правова інформація"));
 assert.ok(read("ua/konfidentsiinist/index.html").includes("персональних даних"));
 assert.ok(read("ua/cookies/index.html").includes("Cloudflare Web Analytics"));
 for(const file of ["index.html","en/index.html","de/index.html"])assert.ok(read(file).includes('hreflang="uk"'));
});
test("Navigation spacing compacts only desktop",()=>{
 const css=fs.readFileSync(path.join(root,"assets/language-switcher-r16.css"),"utf8");
 assert.match(css,/@media\(min-width:1121px\)/);
 assert.match(css,/\.header \.shell\.nav>\.nav-links\{margin-left:auto\}/);
 assert.match(css,/\.header \.language-switcher\{gap:2px/);
});

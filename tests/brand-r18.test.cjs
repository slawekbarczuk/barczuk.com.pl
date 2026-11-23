"use strict";
const {test}=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const homes=[
  ["index.html",["Finansowanie<br>przedsiębiorstw","Inwestycje<br>i rozwój","Kapitał<br>i decyzje strategiczne","Ciągłość<br>finansowania"]],
  ["en/index.html",["Financing<br>for businesses","Investments<br>and growth","Capital<br>and strategy","Financing<br>continuity"]],
  ["de/index.html",["Finanzierung<br>für Unternehmen","Investitionen<br>und Wachstum","Kapital<br>und Strategie","Finanzierungs-<br>kontinuität"]],
  ["ua/index.html",["Фінансування<br>підприємств","Інвестиції<br>та розвиток","Капітал<br>і стратегічні рішення","Безперервність<br>фінансування"]]
];
test("R18: four pillars, organizational voice, experience anchored in practice, not invented team",()=>{
  for(const [file,titles] of homes){
    const s=read(file);
    const grid=s.match(/<div class="service-grid">([\s\S]*?)<\/div><div class="scope-bottom">/)?.[1];
    assert.ok(grid,file+" missing service grid");
    for(const title of titles)assert.ok(grid.includes("<h3>"+title+"</h3>"),file+" "+title);
    assert.equal((grid.match(/<a class="service" href=/g)||[]).length,4,file);
    assert.ok(!/nasz zespół ekspertów|our team of experts|unser Expertenteam|наша команда експертів/i.test(s),file);
    assert.ok(s.includes("1995"),file);
    assert.ok(s.includes('href="https://portal.barczuk.com.pl/'),file);
  }
});
test("R18: Polish home expresses strategy without personal biography",()=>{
 const s=read("index.html");
 assert.match(s,/Doradztwo finansowe w istotnych momentach rozwoju przedsiębiorstwa/);
 assert.match(s,/Podstawą doradztwa BARCZUK jest doświadczenie w bankowości korporacyjnej/);
 assert.match(s,/spółkami giełdowymi/);
 assert.match(s,/finansowe aspekty sukcesji/);
 const main=s.slice(s.indexOf('<main id="tresc">'),s.indexOf('<section class="contact-form-section"'));
 assert.doesNotMatch(main,/Sławomir Barczuk|pracowałem|byłem|jestem niezależnym doradcą/i);
 assert.match(s,/Administratorem danych jest Sławomir Barczuk/);
});
test("R18: four financing pages and approved contact safeguards",()=>{
 const pages=["finansowanie-przedsiebiorstw/index.html","en/corporate-financing/index.html","de/unternehmensfinanzierung/index.html","ua/finansuvannia/index.html"];
 const leads=["Wspieramy przedsiębiorstwa","We support businesses","Wir unterstützen Unternehmen","Допомагаємо підприємствам"];
 for(let i=0;i<pages.length;i++){
   const html=read(pages[i]);
   assert.ok(html.includes(leads[i]),pages[i]);
   assert.ok(html.includes('id="contact-request-form"'),pages[i]);
   assert.ok(html.includes('action="/api/contact"'),pages[i]);
   assert.ok(html.includes('portal.barczuk.com.pl'),pages[i]);
 }
});

test("Each service card links to its own translated section, with the UA hero retaining the focused offer",()=>{
 const sections={financing:"struktura",investment:"inwestycje",capital:"kapital",continuity:"monitorowanie"};
 for(const [file] of homes){
   const home=read(file);
   const cards=[...home.matchAll(/<a class="service" href="([^"#]+)#([^"]+)" data-offer="([^"]+)"/g)];
   assert.deepEqual(cards.map(card=>card[3]),Object.keys(sections),file);
   for(const [,route,anchor,area] of cards){
     assert.equal(anchor,sections[area],file);
     const target=read(route.slice(1)+"index.html");
     assert.ok(target.includes('<section class="scope-item" id="'+anchor+'">'),route);
     assert.ok(target.includes('<a href="#'+anchor+'"><span>'),route);
   }
 }
 assert.ok(read("index.html").includes('href="#zakres">Poznaj zakres doradztwa'));
 assert.ok(read("ua/index.html").includes('class="text-link" href="/ua/finansuvannia-biznesu-v-polshchi/"'));
 assert.match(read("finansowanie-przedsiebiorstw/index.html"),/<title>Finansowanie przedsiębiorstw i gwarancje bankowe \| Barczuk<\/title>/);
});

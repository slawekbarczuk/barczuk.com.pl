"use strict";
const {test}=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.resolve(__dirname,"..");
const localized={
  pl:["404.html","index.html","finansowanie-przedsiebiorstw/index.html","informacje/cookies/index.html","informacje/informacje-prawne/index.html","informacje/prywatnosc/index.html"],
  en:["en/index.html","en/corporate-financing/index.html","en/legal-information/index.html","en/privacy/index.html","en/cookies/index.html"],
  de:["de/index.html","de/unternehmensfinanzierung/index.html","de/rechtliche-hinweise/index.html","de/datenschutz/index.html","de/cookies/index.html"],
  ua:["ua/index.html","ua/finansuvannia/index.html","ua/pravova-informatsiia/index.html","ua/konfidentsiinist/index.html","ua/cookies/index.html","ua/finansuvannia-biznesu-v-polshchi/index.html"]
};
const taglines={
 pl:"Niezależne doradztwo finansowe",
 en:"Independent financial advisory",
 de:"Unabhängige Finanzberatung",
 ua:"Незалежне фінансове консультування"
};
test("BARCZUK footer shows a single brand tagline instead of a personal marketing signature on every page",()=>{
 let count=0;
 for(const [lang,files] of Object.entries(localized))for(const file of files){
   const html=fs.readFileSync(path.join(root,file),"utf8");
   const footer=html.match(/<footer>[\\s\\S]*?<\\/footer>/)?.[0];
   assert.ok(footer,file+" lacks footer");
   const identity=footer.match(/<div class="footer-identity">([\\s\\S]*?)<\\/div>/)?.[1];
   assert.ok(identity,file+" lacks identity");
   assert.ok(identity.includes('<span>Barczuk</span>'),file);
   assert.ok(identity.includes('<p>'+taglines[lang]+'</p>'),file);
   assert.doesNotMatch(identity,/Sławomir Barczuk|Doradztwo w finansowaniu przedsiębiorstw|Corporate financing advisory|Beratung zur Unternehmensfinanzierung|Консультування з питань фінансування підприємств/);
   assert.match(footer,/© 2026 Sławomir Barczuk/,file+" must retain legal copyright attribution");
   assert.equal((footer.match(/class="footer-identity"/g)||[]).length,1,file);
   count++;
 }
 assert.equal(count,22);
});
test("Footer tagline translations survive rebuilds",()=>{
 const pl="Niezależne doradztwo finansowe";
 for(const [lang,text] of Object.entries(taglines)){
   if(lang==="pl")continue;
   const d=JSON.parse(fs.readFileSync(path.join(root,"i18n",lang+"-main.json"),"utf8"));
   assert.equal(d[pl],text,lang);
 }
});

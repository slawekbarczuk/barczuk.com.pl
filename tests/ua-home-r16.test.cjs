"use strict";
const {test} = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {createHash} = require("node:crypto");
const root = path.resolve(__dirname, "..");
const read = p => fs.readFileSync(path.join(root,p),"utf8");

test("UA homepage uses three local panoramas and accessible banking guidance",()=>{
 const html = read("ua/index.html");
 const hero = html.match(/<div class="hero-visual hero-media hero-slideshow"[^>]*>[\s\S]*?<\/div>/)?.[0];
 assert.ok(hero);
 assert.equal((hero.match(/class="hero-slide/g)||[]).length,3);
 for(const name of ["kyiv-dnipro","odesa","lviv"]){
  assert.ok(hero.includes('/assets/photos-r16/ua/'+name+'.webp'));
  const data = fs.readFileSync(path.join(root,'assets/photos-r16/ua/'+name+'.webp'));
  assert.equal(data.toString('ascii',0,4),'RIFF');
  assert.equal(data.toString('ascii',8,12),'WEBP');
  assert.ok(data.length>10000);
 }
 assert.match(hero,/aria-label="Художні панорами України:/);
 assert.doesNotMatch(hero,/fabryczna|manufaktura|piotrkowska|ec1/);
 assert.match(html,/Для бізнесу з України в Польщі/);
 assert.match(html,/id="bank-support" aria-labelledby="ua-bank-heading"/);
 assert.match(html,/<details><summary>Чому банк просить додаткові документи\?/);
 assert.match(html,/KYC\/AML/);
 assert.match(html,/рішення щодо відкриття та обслуговування рахунку визначає банк/);
 assert.match(html,/src="\/assets\/hero-slideshow-r16\.js\?v=R16-xl"/);
 assert.doesNotMatch(html,/<h2>Обговорімо<br>про потреби/);
});

test("UA-only content survives complete rebuilds without changing other languages or UA subpages",()=>{
 const temp = fs.mkdtempSync(path.join(root,".tmp-ua-home-"));
 const files = ["index.html","404.html","finansowanie-przedsiebiorstw","informacje","en","de","ua","scripts","i18n","assets","sitemap.xml"];
 const generatedFiles = [];
 function copy(source,dest){
  if(fs.statSync(source).isDirectory()){
   fs.mkdirSync(dest,{recursive:true});
   for(const entry of fs.readdirSync(source))copy(path.join(source,entry),path.join(dest,entry));
  }else fs.writeFileSync(dest,fs.readFileSync(source));
 }
 function collect(dir, prefix=""){
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
   const rel=path.posix.join(prefix,entry.name);
   if(entry.isDirectory())collect(path.join(dir,entry.name),rel);
   else if(entry.name.endsWith(".html")||rel==="sitemap.xml")generatedFiles.push(rel);
  }
 }
 try{
  for(const file of files)copy(path.join(root,file),path.join(temp,file));
  collect(temp);
  const protectedFiles=generatedFiles.filter(p=>p!=="ua/index.html"&&p!=="sitemap.xml"&&p!=="ua/finansuvannia-biznesu-v-polshchi/index.html");
  const digest=p=>createHash("sha256").update(fs.readFileSync(path.join(temp,p),"utf8").replace(/\r\n/g,"\n")).digest("hex");
  const before=new Map(protectedFiles.map(p=>[p,digest(p)]));
  const build=()=>{
   for(const file of Object.keys(require.cache))if(file.startsWith(temp+path.sep))delete require.cache[file];
   require(path.join(temp,"scripts/build-i18n-r16.cjs"));
  };
  build();
  for(const [file,hash] of before)assert.equal(digest(file),hash,"Changed protected page "+file);
  generatedFiles.push("ua/finansuvannia-biznesu-v-polshchi/index.html");
  const first=new Map(generatedFiles.map(p=>[p,digest(p)]));
  build();
  for(const [file,hash] of first)assert.equal(digest(file),hash,"Non-idempotent build "+file);
  const home=fs.readFileSync(path.join(temp,"ua/index.html"),"utf8");
  assert.equal((home.match(/id="bank-support"/g)||[]).length,1);
  assert.match(home,/href="\/ua\/finansuvannia-biznesu-v-polshchi\/"/);
  assert.match(read("sitemap.xml"),/finansuvannia-biznesu-v-polshchi/);
  assert.equal((home.match(/ua-home-r16\.css/g)||[]).length,1);
 }finally{
  assert.equal(path.dirname(fs.realpathSync(temp)),fs.realpathSync(root));
  assert.ok(path.basename(temp).startsWith(".tmp-ua-home-"));
  fs.rmSync(temp,{recursive:true,force:true});
 }
});

test("UA business financing SEO page is discoverable and not falsely translated",()=>{
 const page=read("ua/finansuvannia-biznesu-v-polshchi/index.html");
 assert.match(page,/<html lang="uk">/);
 assert.match(page,/Фінансування бізнесу з українським капіталом у Польщі/);
 assert.match(page,/<link rel="canonical" href="https:\/\/www\.barczuk\.com\.pl\/ua\/finansuvannia-biznesu-v-polshchi\/"/);
 assert.doesNotMatch(page,/hreflang="x-default"/);
 assert.match(page,/name="description"/);
 assert.match(page,/mailto:kontakt@barczuk\.com\.pl/);
 assert.match(read("ua/index.html"),/finansuvannia-biznesu-v-polshchi/);
 assert.match(read("sitemap.xml"),/finansuvannia-biznesu-v-polshchi/);
});

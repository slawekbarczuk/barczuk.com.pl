"use strict";
/* R16: Ukrainian /ua/ route with html lang="uk" and hreflang="uk".
   Idempotent postprocessor after scripts/build-i18n-r16.cjs. */
const fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,".."),base="https://www.barczuk.com.pl";
const pages=[
 {id:"home",pl:"index.html",en:"en/index.html",de:"de/index.html",ua:"ua/index.html",url:{pl:"/",en:"/en/",de:"/de/",ua:"/ua/"}},
 {id:"financing",pl:"finansowanie-przedsiebiorstw/index.html",en:"en/corporate-financing/index.html",de:"de/unternehmensfinanzierung/index.html",ua:"ua/finansuvannia/index.html",url:{pl:"/finansowanie-przedsiebiorstw/",en:"/en/corporate-financing/",de:"/de/unternehmensfinanzierung/",ua:"/ua/finansuvannia/"}},
 {id:"legal",pl:"informacje/informacje-prawne/index.html",en:"en/legal-information/index.html",de:"de/rechtliche-hinweise/index.html",ua:"ua/pravova-informatsiia/index.html",url:{pl:"/informacje/informacje-prawne/",en:"/en/legal-information/",de:"/de/rechtliche-hinweise/",ua:"/ua/pravova-informatsiia/"}},
 {id:"privacy",pl:"informacje/prywatnosc/index.html",en:"en/privacy/index.html",de:"de/datenschutz/index.html",ua:"ua/konfidentsiinist/index.html",url:{pl:"/informacje/prywatnosc/",en:"/en/privacy/",de:"/de/datenschutz/",ua:"/ua/konfidentsiinist/"}},
 {id:"cookies",pl:"informacje/cookies/index.html",en:"en/cookies/index.html",de:"de/cookies/index.html",ua:"ua/cookies/index.html",url:{pl:"/informacje/cookies/",en:"/en/cookies/",de:"/de/cookies/",ua:"/ua/cookies/"}}
];
const meta={
 home:["Незалежне фінансове консультування | Barczuk","Незалежне консультування з фінансування підприємств: інвестиційні та оборотні кредити, банківські гарантії, переговори з банками й управління заборгованістю."],
 financing:["Фінансування підприємств і банківські гарантії | Barczuk","Консультування з фінансування підприємств та інвестицій: фінансові моделі, банківські гарантії, синдиковані кредити, переговори й рефінансування."],
 legal:["Правова інформація та захист даних | Barczuk","Дані підприємця, правова інформація, захист персональних даних і конфіденційність листування."],
 privacy:["Політика конфіденційності | Barczuk","Обробка персональних даних, права за GDPR, строки зберігання та інформація про контактну форму."],
 cookies:["Файли cookie та вебаналітика | Barczuk","Інформація про файли cookie, Cloudflare Web Analytics та технічне функціонування barczuk.com.pl."]
};
const locales=["pl","ua","en","de"],bcp={pl:"pl",en:"en",de:"de",ua:"uk"};
const labels={
 pl:["Wybór języka","Polski","Ukraiński","Angielski","Niemiecki"],
 en:["Choose language","Polish","Ukrainian","English","German"],
 de:["Sprache auswählen","Polnisch","Ukrainisch","Englisch","Deutsch"],
 ua:["Вибір мови","Польська","Українська","Англійська","Німецька"]
};
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const write=(p,s)=>{const dest=path.join(root,p);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.writeFileSync(dest,s,"utf8");console.log("Built",p,Buffer.byteLength(s,"utf8"),"bytes");};
const dict=Object.assign({},...["main","financing","legal-cookies","privacy"].map(x=>JSON.parse(read("i18n/ua-"+x+".json"))));
const runtime=JSON.parse(read("i18n/ua-runtime.json"));
const escape=s=>s.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
function localHref(h){
 if(h==="/"||h.startsWith("/#")||h.startsWith("/?"))return "/ua/"+h.slice(1);
 for(const p of pages)if(p.url.pl!=="/"&&h.startsWith(p.url.pl))return p.url.ua+h.slice(p.url.pl.length);
 return h;
}
function switcher(p,locale){
 const l=labels[locale];
 return '<nav class="language-switcher" data-language-switcher aria-label="'+l[0]+'">'+
  locales.map((code,i)=>(i?'<span class="language-divider" aria-hidden="true">/</span>':'')+
    '<a href="'+p.url[code]+'" hreflang="'+bcp[code]+'" lang="'+bcp[code]+'" title="'+l[i+1]+'"'+(code===locale?' aria-current="page"':'')+'>'+code.toUpperCase()+'</a>').join("")+'</nav>';
}
function shared(h,p,locale){
 h=h.replace(/<nav class="language-switcher"[\s\S]*?<\/nav>/g,"");
 h=h.replace(/<link rel="alternate" hreflang="(?:pl|en|de|uk|x-default)"[^>]*>/g,"");
 h=h.replace(/<link rel="canonical"[^>]*>/g,"");
 h=h.replace(/<link rel="stylesheet" href="\/assets\/language-switcher-r16\.css[^"]*"[^>]*>/g,"");
 const seo='<link rel="canonical" href="'+base+p.url[locale]+'">'+
  locales.map(c=>'<link rel="alternate" hreflang="'+bcp[c]+'" href="'+base+p.url[c]+'">').join("")+
  '<link rel="alternate" hreflang="x-default" href="'+base+p.url.pl+'">';
 h=h.replace("</head>",seo+'<link rel="stylesheet" href="/assets/language-switcher-r16.css?v=R16-ua"></head>');
 h=h.replace(/(<nav class="nav-links"[\s\S]*?<\/nav>)(<\/div><\/header>)/,(_,n,end)=>n+switcher(p,locale)+end);
 if(!h.includes('data-language-switcher'))throw Error("No language switcher: "+p.id+" "+locale);
 return h;
}
function translated(h,p){
 h=h.replace(/<nav class="language-switcher"[\s\S]*?<\/nav>/g,"");
 const misses=new Set();
 h=h.replace(/<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>|<[^>]+>|[^<]+/gi,part=>{
  if(part[0]==="<")return part;
  const key=part.trim();if(!key)return part;
  if(Object.prototype.hasOwnProperty.call(dict,key))return part.replace(key,dict[key]);
  const skip=/^(?:\d+|CEIDG|NIP|REGON|Barczuk|Sławomir Barczuk|\+48|kontakt@|barczuk\.com\.pl|SB-WEB|Cloudflare Web Analytics|&nbsp;|©|\*|\.|→|＋|PL|EN|DE|\/)/i.test(key);
  if(!skip&&!key.endsWith(" | Barczuk")&&/[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]/.test(key))misses.add(key);
  return part;
 });
 if(misses.size)throw Error("Untranslated on "+p.id+": "+[...misses].join(" | ").slice(0,1800));
 const attrs={
  "Barczuk — strona główna":"Barczuk — головна сторінка","Menu główne":"Головна навігація",
  "Wybór języka":"Вибір мови","Weryfikacja antyspamowa":"Перевірка на захист від спаму",
  "Wersja witryny":"Версія сайту","Zakres doradztwa":"Напрями консультування",
  "Artystyczne wizualizacje architektury Łodzi: Łódź Fabryczna i Brama Miasta, Manufaktura, ulica Piotrkowska oraz EC1":"Художні візуалізації архітектури Лодзі: Łódź Fabryczna і Brama Miasta, Manufaktura, вулиця Piotrkowska та EC1"
 };
 h=h.replace(/\b(aria-label|alt|placeholder|title)="([^"]*)"/g,(_,k,v)=>k+'="'+escape(attrs[v]||dict[v]||v)+'"');
 h=h.replace(/\bhref="(\/[^"]*)"/g,(_,v)=>'href="'+localHref(v)+'"');
 h=h.replace('<html lang="pl">','<html lang="uk">');
 const [title,description]=meta[p.id];
 h=h.replace(/<title>[\s\S]*?<\/title>/,'<title>'+escape(title)+'</title>');
 h=h.replace(/<meta name="description" content="[^"]*">/,'<meta name="description" content="'+escape(description)+'">');
 h=h.replace(/<meta property="og:title" content="[^"]*">/,'<meta property="og:title" content="'+escape(title)+'">');
 h=h.replace(/<meta property="og:description" content="[^"]*">/,'<meta property="og:description" content="'+escape(description)+'">');
 h=h.replace(/<meta property="og:url" content="[^"]*">/,'<meta property="og:url" content="'+base+p.url.ua+'">');
 h=h.replace(/<meta property="og:locale" content="[^"]*">/,'<meta property="og:locale" content="uk_UA">');
 h=h.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,(all,data)=>{
  try{const obj=JSON.parse(data);obj.description=description;return '<script type="application/ld+json">'+JSON.stringify(obj)+'</script>';}catch{return all;}
 });
 if(h.includes('const form=document.getElementById("contact-request-form")')){
  for(const [pl,ua] of Object.entries(runtime)){if(!h.includes(pl))throw Error("Missing P04 message "+pl.slice(0,45));h=h.replaceAll(pl,ua);}
 }
 const polishTypo="document.querySelectorAll('p,h1,h2,h3,a,li').forEach(e=>e.childNodes.forEach(n=>{if(n.nodeType===Node.TEXT_NODE)n.textContent=n.textContent.replace(/(^|\\s)([aiouwz])\\s+/gi,'$1$2\\u00a0')}));";
 h=h.replaceAll(polishTypo,"");
 return h;
}
for(const p of pages){
 const ua=shared(translated(read(p.pl),p),p,"ua");
 if(!ua.includes('<html lang="uk">')||!ua.includes('hreflang="uk"'))throw Error("UA metadata "+p.id);
 write(p.ua,ua);
 for(const c of ["pl","en","de"]){let s=read(p[c]);if(c!=="pl")s=s.replace('href="https://portal.barczuk.com.pl/">','href="https://portal.barczuk.com.pl/'+c+'/">');write(p[c],shared(s,p,c));}
}
const urls=pages.flatMap(p=>locales.map(c=>'<url><loc>'+base+p.url[c]+'</loc><lastmod>2026-11-19</lastmod></url>'));
write("sitemap.xml",'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.join("")+'</urlset>\n');

"use strict";
/**
 * Build PL/EN/DE static website pages from the canonical Polish R16 HTML.
 * Keeping each page as static, fully translated HTML supports accessibility,
 * no-JavaScript navigation and proper language-aware SEO.
 *
 * Usage: node scripts/build-i18n-r16.cjs
 * Source pages are deliberately retained as the content source of truth.
 */
const fs=require("node:fs");
const path=require("node:path");
const root=path.resolve(__dirname,"..");
const domain="https://www.barczuk.com.pl";
const pageTypes=[
  {id:"home",base:"index.html",url:{pl:"/",en:"/en/",de:"/de/"},output:{en:"en/index.html",de:"de/index.html"}},
  {id:"financing",base:"finansowanie-przedsiebiorstw/index.html",url:{pl:"/finansowanie-przedsiebiorstw/",en:"/en/corporate-financing/",de:"/de/unternehmensfinanzierung/"},output:{en:"en/corporate-financing/index.html",de:"de/unternehmensfinanzierung/index.html"}},
  {id:"legal",base:"informacje/informacje-prawne/index.html",url:{pl:"/informacje/informacje-prawne/",en:"/en/legal-information/",de:"/de/rechtliche-hinweise/"},output:{en:"en/legal-information/index.html",de:"de/rechtliche-hinweise/index.html"}},
  {id:"privacy",base:"informacje/prywatnosc/index.html",url:{pl:"/informacje/prywatnosc/",en:"/en/privacy/",de:"/de/datenschutz/"},output:{en:"en/privacy/index.html",de:"de/datenschutz/index.html"}},
  {id:"cookies",base:"informacje/cookies/index.html",url:{pl:"/informacje/cookies/",en:"/en/cookies/",de:"/de/cookies/"},output:{en:"en/cookies/index.html",de:"de/cookies/index.html"}}
];
const meta={
  en:{
    home:{title:"Independent Financial Advisory | Barczuk",description:"Independent corporate finance advisory: investment and working-capital financing, bank guarantees, lender negotiations and debt management."},
    financing:{title:"Corporate Financing and Bank Guarantees | Barczuk",description:"Corporate financing advisory: investment and working capital, financial models, bank guarantees, syndicated loans, negotiations and refinancing."},
    legal:{title:"Legal Information and Data Protection | Barczuk",description:"Business registration details, legal information, data protection and confidentiality of correspondence."},
    privacy:{title:"Privacy Policy | Barczuk",description:"Personal data processing, GDPR rights, retention and information about the contact form."},
    cookies:{title:"Cookies and Analytics | Barczuk",description:"Information about cookies, Cloudflare Web Analytics and the technical operation of barczuk.com.pl."}
  },
  de:{
    home:{title:"Unabhängige Finanzierungsberatung | Barczuk",description:"Unabhängige Unternehmensberatung zu Investitions- und Betriebsmittelfinanzierung, Bankgarantien, Bankenverhandlungen und Finanzierungsbetreuung."},
    financing:{title:"Unternehmensfinanzierung und Bankgarantien | Barczuk",description:"Beratung zu Unternehmens- und Investitionsfinanzierung, Finanzmodellen, Bankgarantien, Konsortialkrediten, Verhandlungen und Refinanzierung."},
    legal:{title:"Rechtliche Hinweise und Datenschutz | Barczuk",description:"Angaben zum Unternehmen, rechtliche Hinweise, Datenschutz und Vertraulichkeit der Korrespondenz."},
    privacy:{title:"Datenschutzerklärung | Barczuk",description:"Informationen zur Verarbeitung personenbezogener Daten, DSGVO-Rechten, Aufbewahrung und Kontaktformular."},
    cookies:{title:"Cookies und Webanalyse | Barczuk",description:"Hinweise zu Cookies, Cloudflare Web Analytics und zum technischen Betrieb von barczuk.com.pl."}
  }
};
const navigationMeta={
  pl:{label:"Wybór języka",home:"Polski",eng:"Angielski",german:"Niemiecki"},
  en:{label:"Choose language",home:"Polish",eng:"English",german:"German"},
  de:{label:"Sprache auswählen",home:"Polnisch",eng:"Englisch",german:"Deutsch"}
};
function loadTranslations(locale){
 const out={};
 const files=[locale+"-main.json",locale+"-financing.json",locale+"-legal-cookies.json",locale+"-privacy.json"];
 for(const filename of files){
   const data=JSON.parse(fs.readFileSync(path.join(root,"i18n",filename),"utf8"));
   Object.assign(out,data);
 }
 return out;
}
function safeHtml(str){return str.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");}
function alternates(p){
 return ['pl','en','de'].map(lang=>'<link rel="alternate" hreflang="'+lang+'" href="'+domain+p.url[lang]+'">').join("")+
   '<link rel="alternate" hreflang="x-default" href="'+domain+p.url.pl+'">';
}
function switcher(p,current){
 const labels=navigationMeta[current];
 const codes=[['pl','PL',labels.home],['en','EN',labels.eng],['de','DE',labels.german]];
 return '<nav class="language-switcher" data-language-switcher aria-label="'+labels.label+'">'+
   codes.map(([code,abbr,full],i)=> (i?'<span class="language-divider" aria-hidden="true">/</span>':'')+
      '<a href="'+p.url[code]+'" hreflang="'+code+'" lang="'+code+'" title="'+full+'"'+
       (code===current?' aria-current="page"':'')+'>'+abbr+'</a>').join('')+
   '</nav>';
}
function injectShared(h,p,locale){
 // Idempotence: do not accumulate metadata or switchers on subsequent builds.
 h=h.replace(/<nav class="language-switcher"[\s\S]*?<\/nav>/g,"");
 h=h.replace(/<link rel="alternate" hreflang="(?:pl|en|de|x-default)"[^>]*>/g,"");
 h=h.replace(/<link rel="canonical"[^>]*>/g,"");
 h=h.replace(/<link rel="stylesheet" href="\/assets\/language-switcher-r16\.css[^"]*"[^>]*>/g,"");
 const canonical=domain+p.url[locale];
 const seo='<link rel="canonical" href="'+canonical+'">'+alternates(p);
 const css='<link rel="stylesheet" href="/assets/language-switcher-r16.css?v=R16-i18n">';
 h=h.replace("</head>",seo+css+"</head>");
 h=h.replace(/(<nav class="nav-links"[\s\S]*?<\/nav>)(<\/div><\/header>)/,
   (_,nav,ending)=>nav+switcher(p,locale)+ending);
 if(!h.includes('data-language-switcher'))throw Error("Language navigation not injected: "+p.id+" "+locale);
 return h;
}
function localHref(value,locale){
 if(!value.startsWith("/"))return value;
 const paths={
  "/":"/"+locale+"/",
  "/finansowanie-przedsiebiorstw/":locale==="en"?"/en/corporate-financing/":"/de/unternehmensfinanzierung/",
  "/informacje/informacje-prawne/":locale==="en"?"/en/legal-information/":"/de/rechtliche-hinweise/",
  "/informacje/prywatnosc/":locale==="en"?"/en/privacy/":"/de/datenschutz/",
  "/informacje/cookies/":"/"+locale+"/cookies/"
 };
 for(const [pl,translated] of Object.entries(paths).sort((a,b)=>b[0].length-a[0].length))
   if(value.startsWith(pl))return translated+value.slice(pl.length);
 return value; // assets, APIs, images and other resources retain their actual URLs
}
function localizeRuntime(h,locale){
 const runtime=JSON.parse(fs.readFileSync(path.join(root,"i18n",locale+"-runtime.json"),"utf8"));
 if(h.includes('const form=document.getElementById("contact-request-form")')){
  for(const [pl,localized] of Object.entries(runtime)){
   if(!h.includes(pl))throw Error("Runtime text disappeared: "+pl.slice(0,70));
   h=h.replaceAll(pl,localized);
  }
 }
 // The Polish typography fix for one-character prepositions is Polish-only.
 const polishTypo="document.querySelectorAll('p,h1,h2,h3,a,li').forEach(e=>e.childNodes.forEach(n=>{if(n.nodeType===Node.TEXT_NODE)n.textContent=n.textContent.replace(/(^|\\s)([aiouwz])\\s+/gi,'$1$2\\u00a0')}));";
 if(!h.includes(polishTypo))throw Error("Cannot find Polish-only typographic script");
 h=h.replaceAll(polishTypo,"");
 return h;
}
function translateHtml(h,dict,locale,p){
 let misses=new Set();
 h=h.replace(/<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>|<[^>]+>|[^<]+/gi,part=>{
   if(part[0]==="<")return part;
   const key=part.trim();
   if(!key)return part;
   if(Object.prototype.hasOwnProperty.call(dict,key)){
     return part.replace(key,dict[key]);
   }
   const skip = /^(?:\d+|CEIDG|NIP|REGON|Barczuk|Sławomir Barczuk|\+48|kontakt@|barczuk\.com\.pl|SB-WEB|Cloudflare Web Analytics|&nbsp;|©|\*|\.|→|＋)/i.test(key);
   if(!skip && !key.endsWith(" | Barczuk") && /[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]/.test(key)) misses.add(key);
   return part;
 });
 // Attribute strings translated without changing IDs, validation or endpoints.
 const attributeMap=locale==="en"?{
  "Barczuk — strona główna":"Barczuk — home",
  "Menu główne":"Main navigation",
  "Weryfikacja antyspamowa":"Anti-spam verification",
  "Wersja witryny":"Website version",
  "Artystyczne wizualizacje architektury Łodzi: Łódź Fabryczna i Brama Miasta, Manufaktura, ulica Piotrkowska oraz EC1":"Artistic visualisations inspired by Łódź architecture: Łódź Fabryczna, Brama Miasta, Manufaktura, Piotrkowska Street and EC1",
  "Zakres doradztwa":"Advisory services"
 }:{
  "Barczuk — strona główna":"Barczuk — Startseite",
  "Menu główne":"Hauptnavigation",
  "Weryfikacja antyspamowa":"Anti-Spam-Prüfung",
  "Wersja witryny":"Website-Version",
  "Artystyczne wizualizacje architektury Łodzi: Łódź Fabryczna i Brama Miasta, Manufaktura, ulica Piotrkowska oraz EC1":"Künstlerische Visualisierungen der Architektur von Łódź: Łódź Fabryczna, Brama Miasta, Manufaktura, Piotrkowska-Straße und EC1",
  "Zakres doradztwa":"Beratungsleistungen"
 };
 h=h.replace(/\b(aria-label|alt|placeholder|title)="([^"]*)"/g,(all,attr,val)=>{
   return attr+'="'+safeHtml(attributeMap[val]||val)+'"';
 });
 h=h.replace(/\bhref="(\/[^"]*)"/g,(all,href)=>'href="'+localHref(href,locale)+'"');
 h=h.replace('<html lang="pl">','<html lang="'+locale+'">');
 // Keep the existing version badge and site branding.
 const title=meta[locale][p.id].title;
 const description=meta[locale][p.id].description;
 h=h.replace(/<title>[\s\S]*?<\/title>/,'<title>'+safeHtml(title)+'</title>');
 h=h.replace(/<meta name="description" content="[^"]*">/,'<meta name="description" content="'+safeHtml(description)+'">');
 h=h.replace(/<meta property="og:title" content="[^"]*">/,'<meta property="og:title" content="'+safeHtml(title)+'">');
 h=h.replace(/<meta property="og:description" content="[^"]*">/,'<meta property="og:description" content="'+safeHtml(description)+'">');
 h=h.replace(/<meta property="og:url" content="[^"]*">/,'<meta property="og:url" content="'+domain+p.url[locale]+'">');
 h=h.replace(/<meta property="og:locale" content="[^"]*">/,'<meta property="og:locale" content="'+(locale==="en"?"en_GB":"de_DE")+'">');
 // Original Organization schema stays tied to the Polish business, but its description is localized.
 h=h.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,(all,data)=>{
   try{
     const json=JSON.parse(data);
     json.description=description;
     return '<script type="application/ld+json">'+JSON.stringify(json)+'</script>';
   }catch{return all;}
 });
 h=localizeRuntime(h,locale);
 if(misses.size)throw Error("Untranslated text in "+p.id+" "+locale+": "+[...misses].join(" || ").slice(0,2200));
 return injectShared(h,p,locale);
}
function writeFile(file,html){
 const dest=path.join(root,file);fs.mkdirSync(path.dirname(dest),{recursive:true});
 fs.writeFileSync(dest,html,'utf8');
 console.log("Built",file,Buffer.byteLength(html,"utf8"),"bytes");
}
function build(){
 const source=new Map(pageTypes.map(p=>[p.id,fs.readFileSync(path.join(root,p.base),"utf8")
   .replace(/<nav class="language-switcher"[\s\S]*?<\/nav>/g,"")
   .replace(/<link rel="alternate" hreflang="(?:pl|en|de|x-default)"[^>]*>/g,"")
   .replace(/<link rel="stylesheet" href="\/assets\/language-switcher-r16\.css[^"]*"[^>]*>/g,"")]));
 const dict={en:loadTranslations("en"),de:loadTranslations("de")};
 for(const p of pageTypes){
  let pl=source.get(p.id);
  // Synchronize the legacy legal pages' menu wording to the current R16 brand.
  if(["legal","privacy","cookies"].includes(p.id)){
    pl=pl.replaceAll('>Sposób pracy</a>','>Etapy</a>').replaceAll('>O współpracy</a>','>Rezultaty</a>');
  }
  writeFile(p.base,injectShared(pl,p,"pl"));
  for(const locale of ["en","de"])writeFile(p.output[locale],translateHtml(source.get(p.id),dict[locale],locale,p));
 }
 const urls=pageTypes.flatMap(p=>["pl","en","de"].map(locale=>'<url><loc>'+domain+p.url[locale]+'</loc><lastmod>2026-11-18</lastmod></url>'));
 writeFile("sitemap.xml",'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.join("")+'</urlset>\n');
}
build();

"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.resolve(__dirname,"..");
const read=p=>fs.readFileSync(path.join(root,p),"utf8");
const slug="/ua/finansuvannia-biznesu-v-polshchi/";
test("UA B2B bank financing landing is indexable and in Ukrainian",()=>{
 const h=read("ua/finansuvannia-biznesu-v-polshchi/index.html");
 assert.match(h,/<html lang="uk">/);
 assert.match(h,/<meta name="robots" content="index,follow">/);
 assert.ok(h.includes('<link rel="canonical" href="https://www.barczuk.com.pl'+slug+'">'));
 assert.match(h,/<h1>Фінансування бізнесу/);
 assert.match(h,/банківські гарантії/i);
 assert.match(h,/KYC\/AML/);
 assert.match(h,/href="mailto:kontakt@barczuk.com.pl"/);
 assert.ok(!/<link rel="alternate" hreflang="x-default"/.test(h),"No false translation relationship");
 assert.equal((h.match(/<main id="tresc">/g)||[]).length,1);
});
test("UA homepage links to focused finance landing",()=>{
 const h=read("ua/index.html");
 assert.ok(h.includes('class="text-link" href="'+slug+'"'));
 assert.ok(h.includes('data-hero-slideshow'));
});
test("UA page is discoverable and preserved by generator",()=>{
 const xml=read("sitemap.xml");
 assert.ok(xml.includes("<loc>https://www.barczuk.com.pl"+slug+"</loc>"));
 const generator=read("scripts/build-ua-r16.cjs");
 assert.ok(generator.includes('require("./build-ua-business-r16.cjs")'));
 assert.ok(read("scripts/localize-ua-home-r16.cjs").includes(slug));
 assert.ok(read("robots.txt").includes("Sitemap: https://www.barczuk.com.pl/sitemap.xml"));
});

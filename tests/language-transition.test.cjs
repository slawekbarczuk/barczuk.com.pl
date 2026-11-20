"use strict";
const {test}=require("node:test");
const assert=require("node:assert/strict");
const vm=require("node:vm");
const fs=require("node:fs");
const path=require("node:path");
const root=path.resolve(__dirname,"..");
const site=fs.existsSync(path.join(root,"assets/language-transition.js"));
const prefix=site?"assets/":"dist/";
const script=fs.readFileSync(path.join(root,prefix+"language-transition.js"),"utf8");
const css=fs.readFileSync(path.join(root,prefix+"language-transition.css"),"utf8");
function browser(opts={}){
 const currentHref=opts.href||"https://barczuk.com.pl/";
 const cookies=opts.cookies||new Map();
 const store=opts.store||new Map();
 const events={},classes=new Set(),timers=new Map();
 const calls={assigned:[],prevented:0,skipped:0,classes,cookies,store};
 let nextId=0;
 const location={href:currentHref,origin:new URL(currentHref).origin,assign:url=>calls.assigned.push(url)};
 const window={
  matchMedia:()=>({matches:Boolean(opts.reduced)}),
  addEventListener:(name,fn)=>{events[name]=fn;},
  setTimeout:fn=>{timers.set(++nextId,fn);return nextId;},
  clearTimeout:id=>timers.delete(id)
 };
 if(opts.native){window.onpageswap=null;window.onpagereveal=null;}
 const document={
  documentElement:{classList:{add:name=>classes.add(name),remove:name=>classes.delete(name)}},
  addEventListener:(name,fn)=>{events[name]=fn;}
 };
 Object.defineProperty(document,"cookie",{
  get(){if(opts.cookieBlocked)throw Error("cookie blocked");return [...cookies].map(([k,v])=>k+"="+v).join("; ");},
  set(raw){
   if(opts.cookieBlocked)throw Error("cookie blocked");
   const pair=raw.split(";")[0],index=pair.indexOf("="),name=pair.slice(0,index),value=pair.slice(index+1);
   if(/Max-Age=0/.test(raw))cookies.delete(name);else cookies.set(name,value);
  }
 });
 const sessionStorage={
  getItem:key=>{if(opts.storageBlocked)throw Error("storage blocked");return store.get(key)||null;},
  setItem:(key,value)=>{if(opts.storageBlocked)throw Error("storage blocked");store.set(key,value);},
  removeItem:key=>{if(opts.storageBlocked)throw Error("storage blocked");store.delete(key);}
 };
 vm.runInNewContext(script,{window,document,sessionStorage,location,URL,Date,encodeURIComponent,decodeURIComponent,JSON});
 calls.click=(o={})=>{
  const link={
   href:o.url||"https://barczuk.com.pl/ua/",
   target:o.target||"",
   hasAttribute:name=>name==="download"&&Boolean(o.download),
   getAttribute:name=>name==="aria-current"?o.current:null,
   closest:selector=>selector==="[data-language-switcher]"&&o.language!==false?{}:null
  };
  const event={
   target:{closest:()=>o.outside?null:link},
   button:o.button??0,defaultPrevented:Boolean(o.defaultPrevented),
   ctrlKey:Boolean(o.ctrlKey),metaKey:Boolean(o.metaKey),
   altKey:Boolean(o.altKey),shiftKey:Boolean(o.shiftKey),
   preventDefault:()=>calls.prevented++
  };
  events.click(event);
 };
 calls.flush=()=>{for(const [id,fn] of [...timers]){timers.delete(id);fn();}};
 calls.show=()=>events.pageshow();
 calls.swap=()=>events.pageswap({viewTransition:{skipTransition:()=>calls.skipped++}});
 return calls;
}
test("native same-origin language navigation keeps normal links and view transition",()=>{
 const b=browser({native:true});b.click();b.swap();
 assert.equal(b.prevented,0);assert.equal(b.skipped,0);assert.deepEqual(b.assigned,[]);
});
test("cross-subdomain main-to-portal navigates with fade even in native browsers",()=>{
 const cookies=new Map(),b=browser({native:true,cookies});
 b.click({url:"https://portal.barczuk.com.pl/ua/",language:false});
 assert.equal(b.prevented,1);assert.ok(b.classes.has("language-leaving"));
 assert.ok(cookies.has("barczuk_navigation_arrival"));
 const info=JSON.parse(decodeURIComponent(cookies.get("barczuk_navigation_arrival")));
 assert.equal(info.key,"portal.barczuk.com.pl/ua/");
 b.flush();assert.deepEqual(b.assigned,["https://portal.barczuk.com.pl/ua/"]);
 const arrived=browser({href:"https://portal.barczuk.com.pl/ua/",cookies});
 assert.ok(arrived.classes.has("language-arriving"));
 assert.equal(cookies.size,0);
 arrived.flush();assert.equal(arrived.classes.has("language-arriving"),false);
});
test("cross-subdomain portal-to-website works with www redirect aliases",()=>{
 const cookies=new Map(),b=browser({href:"https://portal.barczuk.com.pl/ua/",cookies,native:true});
 b.click({url:"https://barczuk.com.pl/ua/",language:false});
 assert.equal(b.prevented,1);
 b.flush();assert.deepEqual(b.assigned,["https://barczuk.com.pl/ua/"]);
 const arrived=browser({href:"https://www.barczuk.com.pl/ua/",cookies});
 assert.ok(arrived.classes.has("language-arriving"));
});
test("same-origin fallback fades out, navigates once, and fades in from storage",()=>{
 const store=new Map(),b=browser({store});
 b.click();b.click();
 assert.equal(b.prevented,2);assert.ok(b.classes.has("language-leaving"));
 const saved=JSON.parse(store.get("barczuk-navigation-arrival-v2"));
 assert.equal(saved.key,"barczuk.com.pl/ua/");
 b.flush();assert.deepEqual(b.assigned,["https://barczuk.com.pl/ua/"]);
 const arrived=browser({href:"https://barczuk.com.pl/ua/",store});
 assert.ok(arrived.classes.has("language-arriving"));assert.equal(store.size,0);
});
test("non-language links, external/auth links and modified clicks stay untouched",()=>{
 for(const o of [
  {url:"https://barczuk.com.pl/finansowanie-przedsiebiorstw/",language:false},
  {url:"https://login.microsoftonline.com/tenant",language:false},
  {url:"https://other.test/",language:false},
  {ctrlKey:true},{metaKey:true},{shiftKey:true},{altKey:true},
  {button:1},{target:"_blank"},{download:true},{current:"page"},
  {defaultPrevented:true},{outside:true}
 ]){
  const b=browser();
  b.click(o);b.flush();
  assert.equal(b.prevented,0,JSON.stringify(o));
  assert.deepEqual(b.assigned,[]);
 }
});
test("reduced motion never delays navigation, within or between sites",()=>{
 for(const opts of [{native:true,reduced:true},{reduced:true}]){
  const b=browser(opts);b.click();b.click({url:"https://portal.barczuk.com.pl/",language:false});
  b.flush();assert.equal(b.prevented,0);assert.deepEqual(b.assigned,[]);
  b.swap();assert.equal(b.skipped,1);
 }
});
test("back-forward restoration clears outgoing state and pending navigation",()=>{
 const b=browser();b.click();b.show();b.flush();
 assert.equal(b.classes.has("language-leaving"),false);
 assert.deepEqual(b.assigned,[]);
 b.click();b.flush();
 assert.deepEqual(b.assigned,["https://barczuk.com.pl/ua/"]);
});
test("wrong/stale arrivals and blocked cookie or storage never break navigation",()=>{
 const cookies=new Map();
 cookies.set("barczuk_navigation_arrival",encodeURIComponent(JSON.stringify({key:"portal.barczuk.com.pl/en/",at:Date.now()})));
 assert.equal(browser({href:"https://portal.barczuk.com.pl/ua/",cookies}).classes.size,0);
 const blocked=browser({storageBlocked:true,cookieBlocked:true});
 blocked.click();blocked.flush();assert.deepEqual(blocked.assigned,["https://barczuk.com.pl/ua/"]);
 const c=browser({cookieBlocked:true});c.click({url:"https://portal.barczuk.com.pl/",language:false});
 c.flush();assert.deepEqual(c.assigned,["https://portal.barczuk.com.pl/"]);
});
test("subtle timing and accessibility preferences are present",()=>{
 assert.match(css,/\.56s/);
 assert.match(css,/\.26s/);
 assert.match(css,/\.45s/);
 assert.match(css,/prefers-reduced-motion:reduce/);
});
test("site and portal share one script; mobile public logo never wraps",()=>{
 if(site){
  const publicHeader=fs.readFileSync(path.join(root,"assets/language-switcher-r16.css"),"utf8");
  assert.match(publicHeader,/\.header \.shell\.nav>\.brand\{[\s\S]*?white-space:nowrap/);
  assert.match(publicHeader,/@media\(max-width:520px\)/);
  const pages=[
   "index.html","informacje/informacje-prawne/index.html","informacje/prywatnosc/index.html",
   "informacje/cookies/index.html","ua/index.html","ua/konfidentsiinist/index.html",
   "ua/finansuvannia-biznesu-v-polshchi/index.html"
  ];
  for(const page of pages){
   const html=fs.readFileSync(path.join(root,page),"utf8");
   assert.ok(html.includes("/assets/language-transition.js?v=20261120b"),page);
   assert.ok(html.includes("/assets/language-switcher-r16.css?v=R16-ua-nav2"),page);
  }
  assert.ok(fs.readFileSync(path.join(root,"scripts/build-ua-r16.cjs"),"utf8").includes("?v=20261120b"));
 }else{
  for(const locale of ["","ua/","en/","de/"]){
   const html=fs.readFileSync(path.join(root,"dist",locale,"index.html"),"utf8");
   assert.ok(html.includes("/language-transition.js?v=20261120b"),locale);
  }
 }
});

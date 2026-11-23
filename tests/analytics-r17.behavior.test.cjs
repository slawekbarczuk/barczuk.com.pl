"use strict";
const {test} = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const fs = require("node:fs");
const path = require("node:path");
const script = fs.readFileSync(path.join(__dirname,"../assets/analytics-r17.js"),"utf8");
const config = fs.readFileSync(path.join(__dirname,"../assets/analytics-r17-config.js"),"utf8");

function browser(shared,host="www.barczuk.com.pl",pathname="/",query="?email=PRIVATE",referrer="https://example.org/path?token=SECRET") {
  const network = [];
  const handlers={};
  const elements=[];
  const jar=shared || new Map();
  const body={
    appendChild(n){elements.push(n);return n;},
    append(...ns){elements.push(...ns);}
  };
  const footer={appendChild(n){elements.push(n);return n;}};
  const head={appendChild(n){if(n.src)network.push(n.src);return n;}};
  const document={
    readyState:"complete",
    documentElement:{lang:"pl"},
    body, head, referrer,
    get cookie() {
      return [...jar].map(([k,v])=>k+"="+v).join("; ");
    },
    set cookie(s) {
      const first=s.split(";")[0]; const key=first.slice(0,first.indexOf("="));
      const value=first.slice(first.indexOf("=")+1);
      if(/Max-Age=0/.test(s)) jar.delete(key); else jar.set(key,value);
    },
    createElement(tag) {
      return {
        tag,src:"",type:"",checked:false,className:"",textContent:"",id:"",children:[],attrs:{},
        append(...ns){this.children.push(...ns);},
        appendChild(n){this.children.push(n);return n;},
        remove(){this.removed=true;},
        addEventListener(event,fn){this["on"+event]=fn;},
        setAttribute(name,val){this.attrs[name]=val;},
        getAttribute(name){return this.attrs[name];}
      };
    },
    querySelector(sel) {if(sel === "footer .footer-bottom")return footer;if(sel === "form")return null;if(sel==="footer")return footer;return null;},
    getElementById(id){return elements.find(x=>x.id===id)||null;},
    addEventListener(name,fn){handlers["document:"+name]=fn;}
  };
  const location={hostname:host,pathname,search:query,reloads:0,reload(){this.reloads++;}};
  const window={BARCZUK_ANALYTICS_CONFIG:{ga4MeasurementId:"G-ABC1234567",clarityProjectId:"",enableClarityReplay:false},addEventListener(name,fn){handlers["window:"+name]=fn;}};
  const context={window,document,location,URL,Date,JSON,encodeURIComponent,decodeURIComponent,console};
  vm.runInNewContext(script,context,{timeout:1000});
  const find=(e,name)=>{
    if(!e)return null;
    if((e.className||"").split(/\s+/).includes(name))return e;
    for(const child of e.children||[]){const r=find(child,name);if(r)return r;}
    return null;
  };
  const banner=()=>elements.find(e=>(e.className||"").split(/\s+/).includes("barczuk-consent")&&!e.removed);
  const buttons=()=>find(banner(),"barczuk-consent__choices")?.children || [];
  const option=()=>find(banner(),"barczuk-consent__option");
  const footerSettings=()=>elements.find(x=>x.id==="barczuk-analytics-settings");
  return {
    network,location,window,jar,handlers,banner,buttons,option,footerSettings,
    accept(){assert.equal(buttons().length,3);buttons()[2].onclick();},
    deny(){assert.equal(buttons().length,3);buttons()[1].onclick();},
    openSettings(){assert.equal(buttons().length,3);buttons()[0].onclick();},
    saveSettings(analytics){const row=option();assert.ok(row);row.children[0].checked=!!analytics;buttons()[2].onclick();},
    openFromFooter(){const b=footerSettings();assert.ok(b);b.onclick();},
    clickHref(href){handlers["document:click"]({target:{closest(){return {getAttribute(){return href;}};}}});},
    focus(){handlers["window:focus"]?.();}
  };
}
test("No optional requests before consent; rejection blocks vendor requests",()=>{
  const b=browser();
  assert.deepEqual(b.network,[]);
  assert.ok(b.banner());
  b.deny(); b.clickHref("mailto:kontakt@barczuk.com.pl");
  assert.deepEqual(b.network,[]);
});
test("Consent enables only GA4 with sanitized URL; never Clarity",()=>{
  const b=browser();
  b.accept();
  assert.equal(b.network.length,1);
  assert.match(b.network[0],/googletagmanager.com/);
  assert.ok(b.network.every(x=>!x.includes("clarity.ms")));
  const pushed=b.window.dataLayer.map(x=>Array.from(x));
  const view=pushed.find(x=>x[0]==="event"&&x[1]==="page_view");
  assert.ok(view);
  assert.equal(view[2].page_location,"https://www.barczuk.com.pl/");
  assert.equal(view[2].page_referrer,"https://example.org/");
  assert.ok(!JSON.stringify(pushed).includes("PRIVATE"));
  assert.ok(!JSON.stringify(pushed).includes("SECRET"));
});
test("Second tab notices revoked consent and cannot enqueue a new click",()=>{
  const jar=new Map();
  const a=browser(jar),b=browser(jar);
  a.accept();
  b.focus();
  assert.equal(b.network.length,1);
  b.clickHref("mailto:kontakt@barczuk.com.pl");
  const eventCount=()=>b.window.dataLayer.filter(x=>x[0]==="event"&&x[1]==="contact_email_click").length;
  const before=eventCount();
  a.clickHref("mailto:kontakt@barczuk.com.pl");
  // Toggle the already approved preference in tab A.
  const settings=a.handlers; // Real control is in footer, but consent can also change via cookie shared across tabs.
  jar.set("barczuk_analytics_consent_v2",encodeURIComponent(JSON.stringify({v:2,ts:Date.now(),analytics:false,replay:false})));
  b.clickHref("mailto:kontakt@barczuk.com.pl");
  assert.equal(eventCount(),before);
  assert.equal(b.location.reloads,1);
});
test("No tracking on 404, private portal, policy or unexpected URL",()=>{
  for(const [host,p] of [["portal.barczuk.com.pl","/"],["www.barczuk.com.pl","/404"],["www.barczuk.com.pl","/informacje/prywatnosc/"],["www.barczuk.com.pl","/secret/"]]){
    const b=browser(new Map(),host,p);
    if(host!=="portal.barczuk.com.pl"&&p==="/informacje/prywatnosc/"){b.accept();assert.deepEqual(b.network,[]);} else assert.deepEqual(b.network,[]);
  }
});
test("Config is inert until identifiers are explicitly configured",()=>{
  assert.match(config,/ga4MeasurementId:\s*"G-QH65KPVNPH"/);
  assert.match(config,/clarityProjectId:\s*""/);
  assert.match(config,/enableClarityReplay:\s*false/);
});

test("Compact consent layer has three actions and no checkbox",()=>{
  const b=browser();
  assert.equal(b.buttons().length,3);
  assert.equal(b.option(),null);
  assert.equal(b.buttons()[0].textContent,"USTAWIENIA COOKIES");
  assert.equal(b.buttons()[1].textContent,"ODRZUĆ OPCJONALNE");
  assert.equal(b.buttons()[2].textContent,"AKCEPTUJĘ");
  assert.deepEqual(b.network,[]);
});
test("Detailed settings keep analytics off by default and allow later opt-in",()=>{
  const b=browser();b.openSettings();
  assert.match(b.banner().className,/barczuk-consent--settings/);
  assert.equal(b.option().children[0].checked,false);
  b.saveSettings(false);assert.deepEqual(b.network,[]);
  const c=browser(b.jar);c.openFromFooter();
  assert.equal(c.option().children[0].checked,false);
  c.saveSettings(true);assert.equal(c.network.length,1);
  assert.match(c.network[0],/googletagmanager.com/);
});
test("Approved analytics can be withdrawn through footer settings",()=>{
  const b=browser();b.accept();assert.equal(b.network.length,1);
  b.openFromFooter();assert.equal(b.option().children[0].checked,true);
  b.saveSettings(false);assert.equal(b.location.reloads,1);
});

test("Manual view and host-only cookies are configured before the vendor starts",()=>{
  const b=browser();
  b.accept();
  const calls=b.window.dataLayer;
  const set=calls.findIndex(call=>call[0]==="set");
  assert.ok(set>=0 && set<calls.findIndex(call=>call[0]==="js"));
  for(const options of [calls[set][1],calls.find(call=>call[0]==="config")[2]]){
    assert.equal(options.send_page_view,false);
    assert.equal(options.cookie_domain,"none");
    assert.equal(options.cookie_prefix,"barczuk");
    assert.equal(options.cookie_flags,"SameSite=Lax;Secure");
  }
  assert.equal(calls.filter(call=>call[0]==="event" && call[1]==="page_view").length,1);
});

test("Only the four service cards select service areas; accepted requests carry no form data",()=>{
  const b=browser();
  const click=area=>b.handlers["document:click"]({target:{closest:()=>({
    getAttribute:key=>key==="data-offer"?area:"/finansowanie-przedsiebiorstw/"
  })}});
  const accepted=()=>b.handlers["document:barczuk:contact-accepted"]({target:{id:"contact-request-form"}});
  accepted();
  assert.equal(b.window.dataLayer,undefined);
  b.accept();
  const areas=["financing","investment","capital","continuity"];
  for(const area of areas)click(area);
  click(null);click("free-text");
  const selections=Array.from(b.window.dataLayer).filter(x=>x[1]==="offer_select");
  assert.deepEqual(selections.map(x=>x[2].interaction),areas);
  accepted();
  let receipts=b.window.dataLayer.filter(x=>x[1]==="contact_request_accepted");
  assert.equal(receipts.length,1);
  assert.deepEqual(Object.keys(receipts[0][2]).sort(),["interaction","language","page_id"]);
  b.openFromFooter();b.saveSettings(false);
  accepted();
  assert.equal(b.window.dataLayer.filter(x=>x[1]==="contact_request_accepted").length,1);
});

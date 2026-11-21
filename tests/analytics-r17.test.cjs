"use strict";
const {test} = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname,"..");
const js = fs.readFileSync(path.join(root,"assets/analytics-r17.js"),"utf8");
const cfg = fs.readFileSync(path.join(root,"assets/analytics-r17-config.js"),"utf8");
const roots = ["index.html","404.html","finansowanie-przedsiebiorstw","informacje","en","de","ua"];
function walk(entry) {
  const full=path.join(root,entry);
  if(fs.statSync(full).isFile()) return full.endsWith(".html")?[full]:[];
  return fs.readdirSync(full,{withFileTypes:true}).flatMap(e=>walk(path.join(entry,e.name)));
}
test("R17 modules are on each public page, only once, in correct order",()=>{
  const pages=roots.flatMap(walk);
  assert.equal(pages.length,22);
  for(const file of pages){
    const html=fs.readFileSync(file,"utf8");
    for(const asset of ["analytics-r17-config.js","analytics-r17.js","analytics-r17.css"]){
      assert.equal(html.split(asset).length-1,1,file+" "+asset);
    }
    assert.ok(html.indexOf("analytics-r17-config.js")<html.indexOf("analytics-r17.js"),file);
  }
});
test("No vendors active before account setup, replay opt-in is separately disabled",()=>{
  assert.match(cfg,/ga4MeasurementId:\s*"G-QH65KPVNPH"/);
  assert.match(cfg,/clarityProjectId:\s*""/);
  assert.match(cfg,/enableClarityReplay:\s*false/);
  assert.match(js,/cfg\.enableClarityReplay === true/);
});
test("Gated, sanitized GA4 and independent Clarity consent",()=>{
  assert.match(js,/if \(!ga4 && !clarity\) return/);
  assert.match(js,/ga4 && analytics/);
  assert.match(js,/clarity && replay/);
  assert.match(js,/permitted\("analytics"\)/);
  assert.match(js,/permitted\("replay"\)/);
  assert.match(js,/send_page_view:false/);
  assert.match(js,/page_location:safeLocation/);
  assert.match(js,/safeReferrer\(\)/);
  assert.match(js,/!Object\.prototype\.hasOwnProperty\.call\(pages, path\)/);
  assert.match(js,/document\.querySelector\("form"\)/);
  assert.match(js,/window\.clarity\("consentv2"/);
});
test("Consents synchronize across tabs and bfcache, revocation reloads loaded vendors",()=>{
  assert.match(js,/Domain=\.barczuk\.com\.pl/);
  assert.match(js,/var current = readConsent\(\)/);
  assert.match(js,/window\.addEventListener\("focus",refreshConsent\)/);
  assert.match(js,/window\.addEventListener\("pageshow",refreshConsent\)/);
  assert.match(js,/document\.addEventListener\("visibilitychange"/);
  assert.match(js,/location\.reload\(\)/);
  assert.match(js,/clearKnownCookies\(\)/);
});
test("No privacy / legal / 404 tracking or private portal",()=>{
  assert.match(js,/host !== "www\.barczuk\.com\.pl"/);
  assert.match(js,/isSensitivePage/);
  assert.ok(!js.includes('"404"'));
  assert.ok(!js.includes('location.search'));
  assert.ok(!js.includes('document.title'));
  assert.ok(!js.includes('form_submit'));
});

"use strict";
const {test} = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname,"..");
const js = fs.readFileSync(path.join(root,"assets/analytics-r17.js"),"utf8");
const cfg = fs.readFileSync(path.join(root,"assets/analytics-r17-config.js"),"utf8");
const css = fs.readFileSync(path.join(root,"assets/analytics-r17.css"),"utf8");
const roots = ["index.html","404.html","finansowanie-przedsiebiorstw","modele-finansowe-dla-bankow","gwarancje-bankowe-dla-firm","informacje","en","de","ua"];
function walk(entry) {
  const full=path.join(root,entry);
  if(fs.statSync(full).isFile()) return full.endsWith(".html")?[full]:[];
  return fs.readdirSync(full,{withFileTypes:true}).flatMap(e=>walk(path.join(entry,e.name)));
}
test("R17 modules are on each public page, only once, in correct order",()=>{
  const pages=roots.flatMap(walk);
  assert.equal(pages.length,24);
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

test("Minimal corporate cookie bar stays in four languages with mobile layout",()=>{
  assert.match(js,/function showBanner\(\)/);
  assert.match(js,/function showSettings\(\)/);
  assert.match(js,/button\(t\.accept/);
  assert.match(js,/We use essential cookies/);
  assert.match(js,/Wir verwenden notwendige Cookies/);
  assert.match(js,/Ми використовуємо необхідні файли cookie/);
  assert.match(css,/left:0;right:0;bottom:0/);
  assert.match(css,/border-bottom:2px solid #ffd400/);
  assert.match(css,/grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
  assert.match(cfg,/enableClarityReplay:\s*false/);
});

test("Cookie settings precede footer version on a shared responsive baseline",()=>{
  assert.ok(js.includes('footer.querySelector(".site-version")'));
  assert.ok(js.includes('footer.insertBefore(tools, version)'));
  assert.ok(js.includes('tools.append(settings, version)'));
  assert.ok(css.includes('.footer-bottom .barczuk-footer-tools{display:flex;align-items:baseline'));
  assert.ok(css.includes('.footer-bottom .barczuk-footer-tools .site-version{margin:0'));
  assert.ok(css.includes('@media(max-width:620px){.footer-bottom .barczuk-footer-tools'));
  for(const file of roots.flatMap(walk)){
    const html=fs.readFileSync(file,"utf8");
    assert.equal(html.split('/assets/analytics-r17.css?v=r17-audit-v4').length-1,1,file+" CSS cache version");
    assert.equal(html.split('/assets/analytics-r17.js?v=r17-audit-v4').length-1,1,file+" JS cache version");
  }
  for(const file of ["scripts/build-i18n-r16.cjs","scripts/build-ua-r16.cjs","scripts/build-ua-business-r16.cjs","scripts/inject-analytics-r17.cjs"]){
    const source=fs.readFileSync(path.join(root,file),"utf8");
    assert.ok(source.includes("r17-audit-v4"),file+" regeneration must preserve footer asset version");
  }
});

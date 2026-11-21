"use strict";
const {test} = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "assets/analytics-r17.js"),"utf8");
const cfg = fs.readFileSync(path.join(root, "assets/analytics-r17-config.js"),"utf8");
const roots = ["index.html","404.html","finansowanie-przedsiebiorstw","informacje","en","de","ua"];
function walk(entry) {
 const file = path.join(root,entry);
 if (fs.statSync(file).isFile()) return entry.endsWith(".html") ? [file] : [];
 return fs.readdirSync(file,{withFileTypes:true}).flatMap(e=>walk(path.join(entry,e.name)));
}
const pages = roots.flatMap(walk).filter(p=>p.endsWith(".html"));
test("R17 free analytics: all public pages contain a single, ordered tag pair",()=>{
 assert.equal(pages.length,22, "R16 pages should not silently disappear");
 for(const file of pages) {
  const html=fs.readFileSync(file,"utf8");
  assert.equal((html.match(/assets\/analytics-r17-config\.js/g)||[]).length,1,file);
  assert.equal((html.match(/assets\/analytics-r17\.js/g)||[]).length,1,file);
  assert.equal((html.match(/assets\/analytics-r17\.css/g)||[]).length,1,file);
  assert.ok(html.indexOf("analytics-r17-config.js")<html.indexOf("analytics-r17.js"),file);
 }
});
test("R17 free analytics: no Google or Clarity project IDs committed",()=>{
 assert.match(cfg,/ga4MeasurementId:\s*""/);
 assert.match(cfg,/clarityProjectId:\s*""/);
});
test("R17 free analytics: vendors wait for affirmative consent",()=>{
 assert.match(source,/if \(!ga4 && !clarity\) return;/);
 assert.match(source,/if \(choice === "yes"\) startApprovedAnalytics\(\)/);
 assert.match(source,/if \(loaded \|\| choice !== "yes"\) return;/);
 assert.match(source,/window\.gtag\("consent", "default"/);
 assert.match(source,/analytics_storage:"denied"/);
 assert.match(source,/button\(t\.reject/);
 assert.match(source,/button\(t\.accept/);
});
test("R17 free analytics: client portal protected and forms masked",()=>{
 assert.match(source,/location\.hostname === "portal\.barczuk\.com\.pl"/);
 assert.match(source,/data-clarity-mask/);
 assert.match(source,/removeAnalyticsCookies\(\)/);
 assert.doesNotMatch(source,/document\.querySelector\([^)]*input\[value/);
});

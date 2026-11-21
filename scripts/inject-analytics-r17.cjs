"use strict";
// Idempotent R17 injection step for the entire public website (not the private portal).
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const roots = ["index.html","404.html","finansowanie-przedsiebiorstw","informacje","en","de","ua"];
const head = '<link rel="stylesheet" href="/assets/analytics-r17.css?v=r17-draft">';
const tail = '<script defer src="/assets/analytics-r17-config.js?v=r17-draft"></script><script defer src="/assets/analytics-r17.js?v=r17-draft"></script>';
function processFile(name) {
  let html = fs.readFileSync(name, "utf8");
  // Rebuilds run more than once; do not duplicate tags.
  if (html.includes('/assets/analytics-r17.js')) {
    if ((html.match(/\/assets\/analytics-r17\.js/g) || []).length !== 1) throw Error("Duplicate analytics tags: " + name);
    return false;
  }
  if (!html.includes("</head>") || !html.includes("</body>")) throw Error("Malformed HTML: " + name);
  html = html.replace("</head>", head + "</head>");
  html = html.replace("</body>", tail + "</body>");
  fs.writeFileSync(name, html, "utf8");
  return true;
}
function walk(entry) {
  const full = path.join(root, entry);
  if (!fs.existsSync(full)) throw Error("Missing expected public path: " + entry);
  if (fs.statSync(full).isFile()) return entry.endsWith(".html") ? [full] : [];
  return fs.readdirSync(full, {withFileTypes:true}).flatMap(e => walk(path.join(entry, e.name)));
}
const pages = roots.flatMap(walk).filter(p => p.endsWith(".html"));
let changes = 0;
for (const page of pages) changes += Number(processFile(page));
console.log("R17 analytics tags: checked", pages.length, "public pages, changed", changes);

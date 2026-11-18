"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const read=p=>fs.readFileSync(path.join(__dirname,"..",p),"utf8");
const pages=["index.html","finansowanie-przedsiebiorstw/index.html","404.html","informacje/informacje-prawne/index.html","informacje/prywatnosc/index.html","informacje/cookies/index.html"];
test("R16 uses the B favicon on every page",()=>{for(const p of pages)assert.match(read(p),/href="\/favicon-b\.svg\?v=r16c"/,p);});
test("R16 hero contains only Łódź media references",()=>{
const h=read("index.html");
assert.match(h,/data-src="\/assets\/video\/lodz-r16\.mp4"/);
assert.match(h,/src="\/assets\/video\/lodz-r16-poster\.jpg"/);
assert.doesNotMatch(h,/lodz-warszawa-r16|panoramę Warszawy/i);
});
test("R16 styles the compact pause control and heading",()=>{
const c=read("assets/editorial-r16.css");
assert.match(c,/\.light-weight\{font-style:normal\}/);
assert.match(c,/\.request-form h3#contact-form-heading\{font-size:clamp\(40px,4\.1vw,56px\)/);
assert.match(c,/\.media-toggle\{width:36px/);
});


test("R16 media files exist before deployment",()=>{
  const root=path.join(__dirname,"..");
  for(const [p,min] of [["assets/video/lodz-r16-calm.mp4",200000],["assets/video/lodz-r16-calm-poster.jpg",20000],["favicon-b-32.png",400],["favicon-b-180.png",1000],["favicon.ico",1000]]){
    const file=path.join(root,p);
    assert.ok(fs.existsSync(file),"Missing asset: "+p);
    assert.ok(fs.statSync(file).size>=min,"Incomplete asset: "+p);
  }
  assert.ok(!fs.existsSync(path.join(root,"assets/video/lodz-warszawa-r16.mp4")),"Old mixed-city video should not be published");
});

test("R16 distinguishes stages and results, with a stronger film overlay",()=>{
  for(const page of ["index.html","finansowanie-przedsiebiorstw/index.html"]){
    const html=read(page);
    assert.match(html,/href="\/#jak-pracuje">Etapy<\/a>/);
    assert.match(html,/href="\/#wspolpraca">Rezultaty<\/a>/);
    assert.doesNotMatch(html,/href="\/#jak-pracuje">Sposób pracy/);
    assert.doesNotMatch(html,/href="\/#wspolpraca">O współpracy/);
  }
  const home=read("index.html"),css=read("assets/editorial-r16.css");
  assert.match(home,/Etapy doradztwa/);
  assert.match(home,/Zakres i rezultaty/);
  assert.match(css,/rgba\(20,36,58,\.48\)/);
  assert.match(css,/animation:none/);
});

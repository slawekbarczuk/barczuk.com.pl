"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path");
const read=p=>fs.readFileSync(path.join(__dirname,"..",p),"utf8");
const pages=["index.html","finansowanie-przedsiebiorstw/index.html","404.html","informacje/informacje-prawne/index.html","informacje/prywatnosc/index.html","informacje/cookies/index.html"];
test("R16 uses the B favicon on every page",()=>{for(const p of pages)assert.match(read(p),/href="\/favicon-b\.svg\?v=r16c"/,p);});
test("R16 shows four approved stationary Lodz-inspired images",()=>{
  const h=read("index.html");
  for(const name of ["fabryczna","manufaktura","piotrkowska","ec1"])
    assert.match(h,new RegExp("/assets/photos-r16/"+name+"\\.webp"));
  assert.match(h,/data-hero-slideshow/);
  assert.match(h,/Artystyczne wizualizacje/);
  assert.doesNotMatch(h,/<video\b|data-media-toggle|lodz-warszawa-r16/i);
});
test("R16 contact headings and slideshow transitions are coherent",()=>{
  const h=read("index.html"),css=read("assets/editorial-r16.css");
  assert.match(css,/\.light-weight\{font-style:normal\}/);
  assert.match(css,/\.request-form h3#contact-form-heading\{font-size:clamp\(40px,4\.1vw,56px\)/);
  assert.match(css,/transition:opacity 2\.2s ease-in-out/);
  assert.match(h,/Przedstaw<br>swoją sprawę\./);
  assert.doesNotMatch(h,/Zacznijmy od rozmowy/);
});

test("R16 media files exist before deployment",()=>{
  const root=path.join(__dirname,"..");
  for(const [p,min] of [["assets/photos-r16/fabryczna.webp",5000],["assets/photos-r16/manufaktura.webp",5000],["assets/photos-r16/piotrkowska.webp",5000],["assets/photos-r16/ec1.webp",5000],["favicon-b-32.png",400],["favicon-b-180.png",1000],["favicon.ico",1000]]){
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

test("R16 favicon PNGs retain an alpha channel (no background)",()=>{
  for(const p of ["favicon-b-32.png","favicon-b-180.png"]){
    const b=fs.readFileSync(path.join(__dirname,"..",p));
    assert.equal(b.subarray(1,4).toString("ascii"),"PNG",p);
    assert.equal(b[25],6,"Expected RGBA PNG: "+p);
  }
});

test("R16 uses only actual WebP image assets",()=>{
  for(const name of ["fabryczna","manufaktura","piotrkowska","ec1"]){
    const b=fs.readFileSync(path.join(__dirname,"../assets/photos-r16",name+".webp"));
    assert.equal(b.toString("ascii",0,4),"RIFF");
    assert.equal(b.toString("ascii",8,12),"WEBP");
  }
});

"use strict";
const {test}=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),path=require("node:path"),vm=require("node:vm");
const script=fs.readFileSync(path.join(__dirname,"../assets/hero-slideshow-r16.js"),"utf8");
function emitter(x={}){
 const handlers={};
 return Object.assign(x,{
  addEventListener(name,fn){(handlers[name]??=[]).push(fn)},
  emit(name){for(const fn of handlers[name]??[])fn()}
 });
}
function harness({reduced=false,saveData=false,slideCount=4}={}){
 const motion=emitter({matches:reduced}),connection=emitter({saveData});
 const slides=Array.from({length:slideCount},()=>({visible:false,classList:null}));
 for(const s of slides)s.classList={toggle(name,val){if(name==="is-visible")s.visible=val}};
 const root={querySelectorAll(){return slides}};
 const document=emitter({hidden:false,querySelector(q){return q==="[data-hero-slideshow]"?root:null}});
 let observe=null,timers=[],cancelled=new Set(),counter=0;
 class IntersectionObserver{
  constructor(callback){observe=callback}
  observe(x){assert.equal(x,root)}
 }
 vm.runInNewContext(script,{document,navigator:{connection},window:{matchMedia:()=>motion,IntersectionObserver},IntersectionObserver,
  setTimeout(fn,ms){const id=++counter;timers.push({id,fn,ms});return id},
  clearTimeout(id){cancelled.add(id)}});
 const pending=()=>timers.filter(t=>!cancelled.has(t.id));
 return {
  index(){return slides.findIndex(s=>s.visible)},
  count(){return slides.filter(s=>s.visible).length},
  timerCount(){return pending().length},
  tick(){const t=pending()[0];assert.ok(t);cancelled.add(t.id);t.fn();return t.ms},
  hide(value){document.hidden=value;document.emit("visibilitychange")},
  reduce(value){motion.matches=value;motion.emit("change")},
  save(value){connection.saveData=value;connection.emit("change")},
  inView(value){observe([{isIntersecting:value}])}
 };
}
test("four images transition every 8 seconds with one visible at a time",()=>{
 const h=harness();assert.equal(h.index(),0);assert.equal(h.count(),1);
 for(const expected of [1,2,3,0]){assert.equal(h.tick(),8000);assert.equal(h.index(),expected);assert.equal(h.count(),1);assert.equal(h.timerCount(),1)}
});

test("three Ukrainian images share the same eight-second rotation and loop",()=>{
 const h=harness({slideCount:3});assert.equal(h.index(),0);
 for(const expected of [1,2,0,1]){assert.equal(h.tick(),8000);assert.equal(h.index(),expected);assert.equal(h.count(),1);assert.equal(h.timerCount(),1)}
});
test("reduced-motion and data saving preserve first photo",()=>{
 for(const config of [{reduced:true},{saveData:true}]){const h=harness(config);assert.equal(h.index(),0);assert.equal(h.timerCount(),0)}
});
test("hidden browser tab and offscreen image do not rotate",()=>{
 const h=harness();h.hide(true);assert.equal(h.timerCount(),0);
 h.hide(false);assert.equal(h.tick(),8000);assert.equal(h.index(),1);
 h.inView(false);assert.equal(h.timerCount(),0);
 h.inView(true);assert.equal(h.tick(),8000);assert.equal(h.index(),2);
});
test("changing user motion and data settings stops slides and resets first image",()=>{
 const h=harness();h.tick();assert.equal(h.index(),1);
 h.reduce(true);assert.equal(h.index(),0);assert.equal(h.timerCount(),0);
 h.reduce(false);assert.equal(h.tick(),8000);assert.equal(h.index(),1);
 h.save(true);assert.equal(h.index(),0);assert.equal(h.timerCount(),0);
});

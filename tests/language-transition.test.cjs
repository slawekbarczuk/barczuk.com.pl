const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..');
const script=fs.readFileSync(path.join(root,fs.existsSync(path.join(root,'assets/language-transition.js'))?'assets/language-transition.js':'dist/language-transition.js'),'utf8');
function browser({native=false,reduced=false,arrival=null,storageBlocked=false}={}){
 const events={},classes=new Set(),timers=new Map(),storage=new Map();let id=0;
 if(arrival)storage.set('barczuk-language-arrival',JSON.stringify(arrival));
 const state={assigned:[],skipped:0,prevented:0,classes,storage};
 const on=(name,fn)=>events[name]=fn;
 const location={href:'https://example.test/',origin:'https://example.test',assign:url=>state.assigned.push(url)};
 const window={matchMedia:()=>({matches:reduced}),addEventListener:on,setTimeout:fn=>{timers.set(++id,fn);return id;},clearTimeout:key=>timers.delete(key)};
 if(native){window.onpageswap=null;window.onpagereveal=null;}
 const document={documentElement:{classList:{add:name=>classes.add(name),remove:name=>classes.delete(name)}},addEventListener:on};
 const sessionStorage={getItem:key=>{if(storageBlocked)throw Error('denied');return storage.get(key)||null;},setItem:(key,value)=>{if(storageBlocked)throw Error('denied');storage.set(key,value);},removeItem:key=>storage.delete(key)};
 vm.runInNewContext(script,{window,document,sessionStorage,location,URL,Date});
 state.click=(options={})=>{
  const link={href:options.url||'https://example.test/ua/',target:options.target||'',hasAttribute:name=>name==='download'&&options.download,getAttribute:name=>name==='aria-current'?options.current:null};
  const event={target:{closest:()=>options.outside?null:link},button:0,preventDefault:()=>state.prevented++,...options};events.click(event);
 };
 state.flush=()=>{for(const [key,fn]of timers){timers.delete(key);fn();}};
 state.show=()=>events.pageshow();
 state.swap=()=>events.pageswap({viewTransition:{skipTransition:()=>state.skipped++}});
 return state;
}
test('native language navigation keeps real links and allows the crossfade',()=>{const b=browser({native:true});b.click();b.swap();assert.equal(b.prevented,0);assert.equal(b.skipped,0);assert.deepEqual(b.assigned,[]);});
test('ordinary navigation skips the language transition',()=>{const b=browser({native:true});b.click({outside:true});b.swap();assert.equal(b.skipped,1);assert.equal(b.prevented,0);});
test('fallback fades out, navigates once and records the correct destination',()=>{const b=browser();b.click();b.click();assert.equal(b.prevented,2);assert.ok(b.classes.has('language-leaving'));assert.equal(JSON.parse(b.storage.get('barczuk-language-arrival')).url,'https://example.test/ua/');b.flush();assert.deepEqual(b.assigned,['https://example.test/ua/']);});
test('modified clicks, new tabs, external links, downloads and current locale remain native',()=>{for(const o of [{ctrlKey:true},{metaKey:true},{shiftKey:true},{altKey:true},{button:1},{target:'_blank'},{url:'https://other.test/ua/'},{download:true},{current:'page'},{defaultPrevented:true}]){const b=browser();b.click(o);b.flush();assert.equal(b.prevented,0,JSON.stringify(o));assert.deepEqual(b.assigned,[]);}});
test('reduced motion never delays links or runs the native transition',()=>{const b=browser({native:true,reduced:true});b.click();b.swap();assert.equal(b.prevented,0);assert.equal(b.skipped,1);const f=browser({reduced:true});f.click();assert.equal(f.prevented,0);});
test('history restoration clears the outgoing fade and pending navigation',()=>{const b=browser();b.click();b.show();b.flush();assert.equal(b.classes.has('language-leaving'),false);assert.deepEqual(b.assigned,[]);b.click();b.flush();assert.deepEqual(b.assigned,['https://example.test/ua/']);});
test('arrival is limited to the expected fresh destination, and blocked storage cannot break links',()=>{const b=browser({arrival:{url:'https://example.test/',at:Date.now()}});assert.ok(b.classes.has('language-arriving'));assert.equal(b.storage.size,0);b.flush();assert.equal(b.classes.size,0);for(const arrival of [{url:'https://example.test/en/',at:Date.now()},{url:'https://example.test/',at:Date.now()-6000}])assert.equal(browser({arrival}).classes.size,0);const blocked=browser({storageBlocked:true});blocked.click();blocked.flush();assert.deepEqual(blocked.assigned,['https://example.test/ua/']);});

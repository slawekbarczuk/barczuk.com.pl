"use strict";
const {test}=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const html=fs.readFileSync(path.join(__dirname,"../index.html"),"utf8");
const script=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)]
  .map(match=>match[1]).find(code=>code.includes('const form=document.getElementById("contact-request-form")'));

test("P04 reports a single acceptance after a genuine API receipt, including concurrent submit attempts",async()=>{
  for(const [status,receipt,expected] of [
    [202,{ok:true,id:"private-receipt"},1], [202,{ok:true},0],
    [202,{ok:false,id:"ignored"},0], [200,{ok:true},0], [429,{},0], [502,{},0]
  ]){
    const events=[];
    let submitForm,finishRequest;
    let posted=0;
    const form={
      action:"/api/contact",reportValidity:()=>true,reset(){},
      addEventListener(name,callback){if(name==="submit")submitForm=callback;},
      dispatchEvent(event){events.push(event);}
    };
    const ids={"contact-request-form":form,"contact-submit":{},"contact-form-state":{},
      "contact-turnstile":{},"formularz-kontaktowy":{}};
    const document={getElementById:id=>ids[id],createElement:()=>({}),head:{append:node=>node.onload()}};
    const window={turnstile:{render(element,options){options.callback("test-only");return 1;},reset(){}}};
    async function fetch(url){
      if(url==="/api/contact-settings")return {ok:true,json:async()=>({enabled:true,siteKey:"test-only"})};
      assert.equal(url,form.action);
      posted++;
      return new Promise(resolve=>{finishRequest=()=>resolve({status,ok:status>=200 && status<300,json:async()=>receipt});});
    }
    vm.runInNewContext(script,{document,window,fetch,location:{hash:""},FormData:class {get(){return "";}},Event});
    await new Promise(setImmediate);
    const first=submitForm({preventDefault(){}});
    await submitForm({preventDefault(){}});
    assert.equal(posted,1);
    assert.equal(events.length,0);
    finishRequest();
    await first;
    assert.equal(events.length,expected,"HTTP "+status+" "+JSON.stringify(receipt));
    if(expected){
      assert.equal(events[0].type,"barczuk:contact-accepted");
      assert.equal(events[0].bubbles,true);
      assert.equal(events[0].detail,undefined);
    }
  }
});

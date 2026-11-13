"use strict";
const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const vm=require("node:vm");
const path=require("node:path");
const code=fs.readFileSync(path.join(__dirname,"../api/src/functions.js"),"utf8");
const validEnv={
 CONTACT_FORM_ENABLED:"true", CONTACT_PRIVACY_READY:"true", CONTACT_RATE_LIMIT_READY:"true",
 TURNSTILE_SITE_KEY:"test-site", TURNSTILE_SECRET:"test-secret",
 MAIL_TENANT_ID:"12345678-1234-1234-1234-123456789abc",
 MAIL_CLIENT_ID:"test-client",MAIL_CLIENT_SECRET:"test-client-secret",
 MAILBOX_USER:"mailbox@example.test",MAIL_TO:"destination@example.test",
 RATE_LIMIT_TABLE_CONNECTION_STRING:"test-table-connection"
};
function harness(custom={}, fetchImpl=async()=>{throw Error("Unexpected fetch");}){
 const routes={}; const logs=[];
 const ctx={
  require:(name)=>name==="@azure/functions"
    ? {app:{http:(name,config)=>{routes[name]=config.handler;}}}
    : name==="./rate-limit" ? {allowSubmission:async()=>true} : require(name),
  process:{env:{...custom}},fetch:fetchImpl,
  Response,Request,URLSearchParams,AbortSignal,Date,JSON,String,Array,Number,RegExp,Error,console,
 };
 vm.runInNewContext(code,ctx,{filename:"functions.js"});
 const request=(body={},headers={})=>({
  headers:new Headers({"Content-Type":"application/json",Origin:"https://www.barczuk.com.pl",...headers}),
  text:async()=>JSON.stringify(body)
 });
 return {routes,logs,request,context:{error:x=>logs.push(x)}};
}
test("API disabled by default; does not touch remote network",async()=>{
 const h=harness();
 assert.equal((await h.routes["contact-settings"]()).jsonBody.enabled,false);
 assert.equal((await h.routes.contact(h.request({email:"a@example.com"}),h.context)).status,503);
});
test("bad origin rejected before reading data",async()=>{
 const h=harness(validEnv);
 const r=await h.routes.contact(h.request({email:"a@example.com"},{Origin:"https://attacker.invalid"}),h.context);
 assert.equal(r.status,403);
});
test("invalid JSON and content-type are rejected",async()=>{
 const h=harness(validEnv);
 assert.equal((await h.routes.contact(h.request({},{"Content-Type":"text/plain"}),h.context)).status,415);
 const q=h.request();q.text=async()=>"{invalid";
 assert.equal((await h.routes.contact(q,h.context)).status,400);
});
test("field validation rejects bad email and overlong payloads",async()=>{
 const h=harness(validEnv);
 assert.equal((await h.routes.contact(h.request({email:"invalid"}),h.context)).status,400);
 assert.equal((await h.routes.contact(h.request({email:"a@example.com",company:"X".repeat(161)}),h.context)).status,400);
});
test("requires Turnstile and rejects invalid/expired token",async()=>{
 let calls=0;
 const h=harness(validEnv,async(url)=>{
   calls++;assert.match(url.toString(),/siteverify/);
   return {ok:true,json:async()=>({success:false,action:"contact",hostname:"www.barczuk.com.pl"})};
 });
 assert.equal((await h.routes.contact(h.request({email:"a@example.com"}),h.context)).status,400);
 assert.equal(calls,0);
 assert.equal((await h.routes.contact(h.request({email:"a@example.com",turnstileToken:"invalid"}),h.context)).status,400);
 assert.equal(calls,1);
});
test("valid Turnstile + OAuth + Microsoft Graph acceptance",async()=>{
 const events=[];
 const h=harness(validEnv,async(url,options)=>{
   const uri=url.toString();events.push(uri);
   if(uri.includes("/siteverify"))return {ok:true,json:async()=>({success:true,action:"contact",hostname:"www.barczuk.com.pl"})};
   if(uri.includes("/token"))return {ok:true,json:async()=>({access_token:"test-access-token"})};
   if(uri.includes("/sendMail")){
     assert.equal(options.headers.Authorization,"Bearer test-access-token");
     const body=JSON.parse(options.body);
     assert.equal(body.message.toRecipients[0].emailAddress.address,"destination@example.test");
     assert.equal(body.message.replyTo[0].emailAddress.address,"sender@example.test");
     assert.match(body.message.body.content,/Firma: Przykładowa firma/);
     return {status:202};
   }
   throw Error("Unexpected URL "+uri);
 });
 const res=await h.routes.contact(h.request({email:"sender@example.test",company:"Przykładowa firma",turnstileToken:"valid"}),h.context);
 assert.equal(res.status,202);
 assert.equal(events.length,3);
});
test("Graph failure never reports success",async()=>{
 const h=harness(validEnv,async(url)=>{
   const uri=url.toString();
   if(uri.includes("/siteverify"))return {ok:true,json:async()=>({success:true,action:"contact",hostname:"www.barczuk.com.pl"})};
   if(uri.includes("/token"))return {ok:true,json:async()=>({access_token:"fake"})};
   if(uri.includes("/sendMail"))return {status:403};
   throw Error("Unexpected");
 });
 const res=await h.routes.contact(h.request({email:"sender@example.test",turnstileToken:"valid"}),h.context);
 assert.equal(res.status,502);
 assert.equal(h.logs.length,1);
 assert.doesNotMatch(h.logs[0],/sender@example.test/);
});

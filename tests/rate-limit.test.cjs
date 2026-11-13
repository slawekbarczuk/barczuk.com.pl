"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const crypto = require("node:crypto");

const source = fs.readFileSync(path.join(__dirname, "../api/src/rate-limit.js"), "utf8");

function harness(options = {}) {
  const rows = new Map();
  const error = (code) => Object.assign(new Error("mock_storage_" + code), {statusCode: code});
  const service = {
    async getEntity(partitionKey, rowKey) {
      if (options.failStorage) throw error(503);
      const entity = rows.get(partitionKey + "/" + rowKey);
      if (!entity) throw error(404);
      return {...entity};
    },
    async createEntity(entity) {
      if (options.failStorage) throw error(503);
      const key = entity.partitionKey + "/" + entity.rowKey;
      if (rows.has(key)) throw error(409);
      rows.set(key, {...entity, etag: "1"});
    },
    async updateEntity(entity, mode, opts) {
      if (options.failStorage) throw error(503);
      assert.equal(mode, "Replace");
      const key = entity.partitionKey + "/" + entity.rowKey;
      const old = rows.get(key);
      if (!old) throw error(404);
      if (opts.etag !== old.etag) throw error(412);
      rows.set(key, {...entity, etag: String(Number(old.etag) + 1)});
    }
  };
  const module = {exports:{}};
  const ctx = {
    require: name => name === "node:crypto" ? crypto :
      name === "@azure/data-tables"
        ? {TableClient:{fromConnectionString:() => service}} : require(name),
    process: {env: {
      RATE_LIMIT_TABLE_CONNECTION_STRING: options.connection === false ? "" : "fake-connection"
    }},
    module, exports:module.exports,
    String,Number,Math,Date,Error
  };
  vm.runInNewContext(source, ctx, {filename:"rate-limit.js"});
  return {allow:module.exports.allowSubmission,rows};
}

test("quota: four per sender per hour, without storing email", async()=>{
  const h = harness(); const t=Date.UTC(2026,10,13,14,30);
  for(let i=0;i<4;i++) assert.equal(await h.allow("sender@example.test",t),true);
  assert.equal(await h.allow("sender@example.test",t),false);
  assert.equal(await h.allow("another@example.test",t),true);
  const stored = JSON.stringify([...h.rows.values()]);
  assert.doesNotMatch(stored,/sender@example|another@example|\d+\.\d+\.\d+\.\d+/);
});

test("quota: global ten-minute ceiling cannot be bypassed by rotating emails",async()=>{
  const h=harness();const t=Date.UTC(2026,10,13,14,30);
  let accepted=0;
  for(let i=0;i<20;i++) if(await h.allow("person"+i+"@example.test",t)) accepted++;
  assert.equal(accepted,12);
});

test("quota: resets counters across fixed periods without unbounded rows",async()=>{
  const h=harness();const start=Date.UTC(2026,10,13,0,0);
  for(let hour=0;hour<48;hour++){
    const time=start+hour*3600000;
    assert.equal(await h.allow("sender@example.test",time),true);
  }
  assert.ok(h.rows.size<=6,"counter keys stay bounded");
});

test("quota: storage faults and missing credentials fail closed",async()=>{
  const missing=harness({connection:false});
  await assert.rejects(missing.allow("sender@example.test"),/quota_storage_not_configured/);
  const fault=harness({failStorage:true});
  await assert.rejects(fault.allow("sender@example.test"),/mock_storage_503/);
});

test("quota: concurrency never admits more than the cap",async()=>{
  const h=harness();const t=Date.UTC(2026,10,13,14,30);
  const results=await Promise.allSettled(
    Array.from({length:12},()=>h.allow("same@example.test",t))
  );
  const successful=results.filter(x=>x.status==="fulfilled"&&x.value===true).length;
  assert.ok(successful<=4,"optimistic concurrency must enforce sender quota");
  assert.ok(successful>=1,"at least one reservation should succeed");
});

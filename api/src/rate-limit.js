"use strict";
const crypto = require("node:crypto");
const { TableClient } = require("@azure/data-tables");

const TABLE_NAME = "ContactLimitP04";
let client;
let connectionUsed;

function getClient() {
  const connection = String(process.env.RATE_LIMIT_TABLE_CONNECTION_STRING || "");
  if (!connection) throw new Error("quota_storage_not_configured");
  if (!client || connectionUsed !== connection) {
    client = TableClient.fromConnectionString(connection, TABLE_NAME);
    connectionUsed = connection;
  }
  return client;
}

// Each counter reuses one of two fixed row keys. Only period/count are stored,
// never an e-mail, IP address, or submitted message.
async function reserveCounter(table, group, periodMs, limit, identity, now) {
  const period = Math.floor(now / periodMs);
  const rowKey = group + "-" + (period % 2) + "-" + identity;
  const partitionKey = "contactP04";

  for (let attempt = 0; attempt < 10; attempt++) {
    let current;
    try {
      current = await table.getEntity(partitionKey, rowKey);
    } catch (error) {
      if (error.statusCode !== 404) throw error;
    }

    const existingCount = current && Number(current.period) === period ?
      Number(current.count) : 0;

    if (current && existingCount >= limit) return false;

    const next = { partitionKey, rowKey, period, count: existingCount + 1 };
    try {
      if (!current) {
        await table.createEntity(next);
      } else {
        if (!current.etag) throw new Error("quota_etag_missing");
        await table.updateEntity(next, "Replace", { etag: current.etag });
      }
      return true;
    } catch (error) {
      if (error.statusCode === 409 || error.statusCode === 412 ||
          error.statusCode === 404) continue;
      throw error;
    }
  }
  throw new Error("quota_concurrent_update");
}

async function allowSubmission(email, now = Date.now()) {
  const table = getClient();
  // Coarse bucket, rather than a stored email hash: finite cardinality and
  // no exact identifier. A collision can conservatively share the same quota.
  const digest = crypto.createHash("sha256")
    .update(String(email).trim().toLowerCase()).digest();
  const emailBucket = String(digest.readUInt16BE(0) % 4096);

  const rules = [
    ["sender-hour", 60 * 60 * 1000, 4, emailBucket],
    ["global-ten-min", 10 * 60 * 1000, 12, "all"],
    ["global-day", 24 * 60 * 60 * 1000, 80, "all"]
  ];

  for (const rule of rules) {
    if (!(await reserveCounter(table, ...rule, now))) return false;
  }
  return true;
}

module.exports = { allowSubmission };

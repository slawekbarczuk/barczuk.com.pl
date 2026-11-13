"use strict";
const { app } = require("@azure/functions");
const crypto = require("node:crypto");

const env = (name) => String(process.env[name] || "").trim();
const required = ["CONTACT_FORM_ENABLED", "CONTACT_PRIVACY_READY", "CONTACT_RATE_LIMIT_READY", "TURNSTILE_SITE_KEY", "TURNSTILE_SECRET", "MAIL_TENANT_ID", "MAIL_CLIENT_ID", "MAIL_CLIENT_SECRET", "MAILBOX_USER", "MAIL_TO"];
const configured = () => required.every(name => !!env(name)) &&
  ["CONTACT_FORM_ENABLED", "CONTACT_PRIVACY_READY", "CONTACT_RATE_LIMIT_READY"].every(name => env(name) === "true");

const json = (status, result) => ({
  status, headers: {"content-type": "application/json; charset=utf-8", "cache-control": "no-store", "x-content-type-options": "nosniff"},
  jsonBody: result
});

app.http("contact-settings", {
  methods: ["GET"], authLevel: "anonymous", route: "contact-settings",
  handler: async () => json(200, configured()
    ? {enabled: true, siteKey: env("TURNSTILE_SITE_KEY")}
    : {enabled: false})
});

function normal(value, limit) {
  return typeof value === "string" ? value.trim().slice(0, limit + 1) : "";
}
function validEmail(s) {
  return s.length <= 254 && /^[^\s@\x00-\x1f]+@[^\s@\x00-\x1f]+\.[^\s@\x00-\x1f]+$/.test(s);
}
async function turnstileVerified(token) {
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST", headers: {"content-type": "application/x-www-form-urlencoded"},
    body: new URLSearchParams({secret: env("TURNSTILE_SECRET"), response: token}),
    signal: AbortSignal.timeout(10000)
  });
  if (!response.ok) return false;
  const reply = await response.json();
  const validHostnames = (env("CONTACT_ALLOWED_HOSTNAMES") || "barczuk.com.pl,www.barczuk.com.pl")
    .split(",").map(x => x.trim().toLowerCase()).filter(Boolean);
  return reply.success === true && reply.action === "contact" &&
    validHostnames.includes(String(reply.hostname || "").toLowerCase());
}
async function bearer() {
  const tenant = env("MAIL_TENANT_ID");
  if (!/^[0-9a-f-]{36}$/i.test(tenant)) throw new Error("Invalid tenant id");
  const tokenRes = await fetch("https://login.microsoftonline.com/" + tenant + "/oauth2/v2.0/token", {
    method: "POST", headers: {"content-type": "application/x-www-form-urlencoded"},
    body: new URLSearchParams({client_id: env("MAIL_CLIENT_ID"), client_secret: env("MAIL_CLIENT_SECRET"), scope:"https://graph.microsoft.com/.default", grant_type:"client_credentials"}),
    signal: AbortSignal.timeout(12000)
  });
  if (!tokenRes.ok) throw new Error("Mail authentication failed");
  const token = await tokenRes.json();
  if (!token.access_token) throw new Error("Mail token missing");
  return token.access_token;
}
async function sendMail(data) {
  const id = crypto.randomUUID();
  const timestamp = new Date().toISOString();
  const text = [
    "Prośba o kontakt z barczuk.com.pl",
    "Identyfikator: " + id,
    "Odebrano (UTC): " + timestamp,
    "",
    "Adres e-mail: " + data.email,
    "Telefon: " + (data.phone || "(nie podano)"),
    "Firma: " + (data.company || "(nie podano)"),
    "Treść:",
    data.message || "(nie podano)"
  ].join("\n");
  const message = {
    message: {
      subject: "Nowa prośba o kontakt – barczuk.com.pl / " + id,
      body: {contentType: "Text", content: text},
      toRecipients: [{emailAddress: {address: env("MAIL_TO")}}],
      replyTo: [{emailAddress: {address: data.email}}]
    },
    saveToSentItems: false
  };
  const token = await bearer();
  const sender = encodeURIComponent(env("MAILBOX_USER"));
  const reply = await fetch("https://graph.microsoft.com/v1.0/users/" + sender + "/sendMail", {
    method:"POST", headers: {"Authorization":"Bearer " + token,"Content-Type":"application/json"},
    body: JSON.stringify(message), signal: AbortSignal.timeout(12000)
  });
  if (reply.status !== 202) throw new Error("Mail send failed");
  return id;
}

app.http("contact", {
  methods: ["POST"], authLevel: "anonymous", route: "contact",
  handler: async (request, context) => {
    if (!configured()) return json(503, {ok:false, error:"unavailable"});
    const ct = request.headers.get("content-type") || "";
    const len = Number(request.headers.get("content-length") || "0");
    if (!ct.toLowerCase().startsWith("application/json") || len > 20000) return json(415,{ok:false,error:"invalid_request"});
    try {
      const raw = await request.text();
      if (raw.length > 20000) return json(413,{ok:false,error:"too_large"});
      const data = JSON.parse(raw);
      if (!data || typeof data !== "object" || Array.isArray(data)) return json(400,{ok:false,error:"invalid_request"});
      if (typeof data.website === "string" && data.website.trim()) return json(202,{ok:true}); // Honeypot; no email sent
      const fields = {
        email: normal(data.email,254), phone:normal(data.phone,40),
        company:normal(data.company,160), message:normal(data.message,3000)
      };
      if (!validEmail(fields.email) || fields.phone.length > 40 || fields.company.length > 160 ||
          fields.message.length > 3000 || /[\r\n]/.test(fields.phone)) {
        return json(400,{ok:false,error:"invalid_fields"});
      }
      const proof = normal(data.turnstileToken,2048);
      if (!proof || !(await turnstileVerified(proof))) return json(400,{ok:false,error:"verification_failed"});
      const id = await sendMail(fields);
      return json(202,{ok:true, id});
    } catch (error) {
      // Never log user-submitted fields, email contents, IP or tokens.
      context.error("Contact service error: " + (error && error.name === "TimeoutError" ? "timeout" : "delivery_failure"));
      return json(502,{ok:false,error:"delivery_unavailable"});
    }
  }
});

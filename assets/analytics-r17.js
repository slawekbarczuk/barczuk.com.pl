/* BARCZUK R17: optional GA4 measurement + separately gated session replay.
   No optional vendor loads without explicit, current, purpose-specific consent. */
(function () {
  "use strict";
  var host = location.hostname.toLowerCase();
  if (host !== "www.barczuk.com.pl" && host !== "barczuk.com.pl") return;

  var cfg = window.BARCZUK_ANALYTICS_CONFIG || {};
  var ga4 = /^G-[A-Z0-9]{5,20}$/.test(cfg.ga4MeasurementId || "") ? cfg.ga4MeasurementId : "";
  var clarity = cfg.enableClarityReplay === true && /^[a-z0-9]{6,32}$/i.test(cfg.clarityProjectId || "") ? cfg.clarityProjectId : "";
  if (!ga4 && !clarity) return;

  var pages = {
    "/":"home", "/en/":"home", "/de/":"home", "/ua/":"home",
    "/finansowanie-przedsiebiorstw/":"financing",
    "/en/corporate-financing/":"financing", "/de/unternehmensfinanzierung/":"financing",
    "/ua/finansuvannia/":"financing", "/ua/finansuvannia-biznesu-v-polshchi/":"financing_ua",
    "/informacje/prywatnosc/":"privacy", "/en/privacy/":"privacy",
    "/de/datenschutz/":"privacy", "/ua/konfidentsiinist/":"privacy",
    "/informacje/cookies/":"cookies", "/en/cookies/":"cookies",
    "/de/cookies/":"cookies", "/ua/cookies/":"cookies",
    "/informacje/informacje-prawne/":"legal", "/en/legal-information/":"legal",
    "/de/rechtliche-hinweise/":"legal", "/ua/pravova-informatsiia/":"legal"
  };
  var path = location.pathname.replace(/\/index\.html$/i, "/");
  if (!Object.prototype.hasOwnProperty.call(pages, path)) return;
  var pageId = pages[path];
  var isSensitivePage = pageId === "privacy" || pageId === "cookies" || pageId === "legal";
  var language = (document.documentElement.lang || "pl").toLowerCase();
  if (language === "ua") language = "uk";
  if (!["pl","en","de","uk"].includes(language)) language = "pl";

  var words = {
    pl: {title:"Ustawienia prywatności",intro:"Możesz zgodzić się na dobrowolne statystyki odwiedzin publicznej strony. Odmowa nie ogranicza dostępu. Nigdy nie nagrywamy Strefy klienta.",ga:"Google Analytics 4 — statystyki i kliknięcia kontaktu",replay:"Microsoft Clarity — nagrania wybranych publicznych stron",reject:"Odrzuć opcjonalne",save:"Zapisz wybór",policy:"Informacja o cookies",settings:"Ustawienia prywatności"},
    en: {title:"Privacy preferences",intro:"You may opt in to statistics about visits to this public website. Refusing does not restrict access. We never record the client portal.",ga:"Google Analytics 4 — visits and contact clicks",replay:"Microsoft Clarity — recordings of selected public pages",reject:"Reject optional",save:"Save preferences",policy:"Cookie notice",settings:"Privacy preferences"},
    de: {title:"Datenschutzeinstellungen",intro:"Sie können freiwilligen Statistiken über Besuche der öffentlichen Website zustimmen. Eine Ablehnung beschränkt den Zugang nicht. Das Kundenportal wird nie aufgezeichnet.",ga:"Google Analytics 4 — Besuche und Kontaktklicks",replay:"Microsoft Clarity — Aufzeichnungen ausgewählter öffentlicher Seiten",reject:"Optionale ablehnen",save:"Auswahl speichern",policy:"Cookie-Hinweise",settings:"Datenschutzeinstellungen"},
    uk: {title:"Налаштування приватності",intro:"Ви можете погодитися на необов'язкову статистику відвідувань відкритого сайту. Відмова не обмежує доступ. Кабінет клієнта ніколи не записується.",ga:"Google Analytics 4 — відвідування та натискання контактів",replay:"Microsoft Clarity — записи окремих відкритих сторінок",reject:"Відхилити необов'язкове",save:"Зберегти вибір",policy:"Інформація про cookie",settings:"Налаштування приватності"}
  };
  var urls = {pl:"/informacje/cookies/",en:"/en/cookies/",de:"/de/cookies/",uk:"/ua/cookies/"};
  var t = words[language];
  var consentName = "barczuk_analytics_consent_v2";
  var consentDays = 180;
  var banner = null;
  var gaLoaded = false;
  var clarityLoaded = false;
  var choices = readConsent();

  function readConsent() {
    try {
      var parts = document.cookie.split(";").map(function (p) {return p.trim();});
      var raw = parts.find(function (p) {return p.indexOf(consentName + "=") === 0;});
      if (!raw) return null;
      var data = JSON.parse(decodeURIComponent(raw.slice(consentName.length + 1)));
      if (data.v !== 2 || typeof data.ts !== "number" || Date.now() - data.ts > consentDays*86400000 ||
          data.ts > Date.now() + 300000 || typeof data.analytics !== "boolean" || typeof data.replay !== "boolean") return null;
      return data;
    } catch (_) {return null;}
  }
  function saveConsent(analytics, replay) {
    var data = {v:2,ts:Date.now(),analytics:!!analytics,replay:!!replay};
    var encoded = encodeURIComponent(JSON.stringify(data));
    document.cookie = consentName + "=" + encoded + "; Path=/; Max-Age=" + (consentDays*86400) +
      "; Domain=.barczuk.com.pl; SameSite=Lax; Secure";
    return readConsent();
  }
  function permitted(name) {
    var current = readConsent(); // Never trust stale consent cached in another open tab.
    return !!(current && current[name] === true);
  }
  function safeReferrer() {
    try {
      if (!document.referrer) return "";
      var u = new URL(document.referrer);
      if (u.protocol !== "https:") return "";
      if (u.hostname === "www.barczuk.com.pl" || u.hostname === "barczuk.com.pl") return "https://www.barczuk.com.pl/";
      return u.origin + "/";
    } catch (_) {return "";}
  }
  function loadScript(src) {
    var tag = document.createElement("script");
    tag.async = true;
    tag.src = src;
    document.head.appendChild(tag);
  }
  function startGA() {
    if (!ga4 || gaLoaded || isSensitivePage || !permitted("analytics")) return;
    gaLoaded = true;
    var safeLocation = "https://www.barczuk.com.pl" + path; // No query, hash, PII or freeform content.
    var safeSource = safeReferrer(); // No referring URL path/query.
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {window.dataLayer.push(arguments);};
    window.gtag("consent","default",{
      analytics_storage:"denied", ad_storage:"denied",
      ad_user_data:"denied", ad_personalization:"denied"
    });
    window.gtag("consent","update",{analytics_storage:"granted"});
    window.gtag("set",{page_location:safeLocation,page_referrer:safeSource});
    window.gtag("js",new Date());
    window.gtag("config",ga4,{
      send_page_view:false,
      page_location:safeLocation,page_referrer:safeSource,
      allow_google_signals:false,allow_ad_personalization_signals:false
    });
    window.gtag("event","page_view",{
      page_location:safeLocation,page_referrer:safeSource,page_title:"BARCZUK " + pageId,
      page_id:pageId,language:language
    });
    loadScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ga4));
  }
  function startReplay() {
    if (!clarity || clarityLoaded || isSensitivePage || !permitted("replay")) return;
    // Sessions containing P04 or any other form are excluded; no client data recording.
    if (document.querySelector("form")) return;
    if (path !== "/ua/finansuvannia-biznesu-v-polshchi/") return;
    clarityLoaded = true;
    window.clarity = window.clarity || function () {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };
    window.clarity("consentv2",{ad_Storage:"denied",analytics_Storage:"granted"});
    loadScript("https://www.clarity.ms/tag/" + encodeURIComponent(clarity));
  }
  function track(eventName,interaction) {
    if (!ga4 || !gaLoaded || isSensitivePage || !permitted("analytics") || typeof window.gtag !== "function") return;
    window.gtag("event",eventName,{page_id:pageId,interaction:interaction,language:language});
  }
  function clearKnownCookies() {
    var names = document.cookie.split(";").map(function (x) {return x.trim().split("=")[0];});
    names.filter(function (x) {return /^(_ga(?:_|$)|_gid$|_gat(?:_|$)|_clck$|_clsk$)/.test(x);})
      .forEach(function (name) {
        ["", "; Domain=barczuk.com.pl", "; Domain=.barczuk.com.pl"].forEach(function (suffix) {
          document.cookie = name + "=; Path=/; Max-Age=0; SameSite=Lax; Secure" + suffix;
        });
      });
  }
  function denyLoadedVendors() {
    if (gaLoaded && typeof window.gtag === "function") {
      window.gtag("consent","update",{
        analytics_storage:"denied",ad_storage:"denied",
        ad_user_data:"denied",ad_personalization:"denied"
      });
    }
    if (clarityLoaded && typeof window.clarity === "function") {
      window.clarity("consentv2",{ad_Storage:"denied",analytics_Storage:"denied"});
    }
    clearKnownCookies();
  }
  function refreshConsent() {
    var now = readConsent();
    if (choices && ((choices.analytics && !(now && now.analytics)) || (choices.replay && !(now && now.replay)))) {
      choices = now;
      denyLoadedVendors();
      location.reload(); // Remove vendors already present in another tab.
      return false;
    }
    choices = now;
    if (now) {
      startGA();
      startReplay();
    }
    return true;
  }
  function choose(analytics,replay) {
    var before = choices;
    choices = saveConsent(ga4 && analytics,clarity && replay);
    if (banner) { banner.remove(); banner = null; }
    if (!choices) {showBanner();return;}
    if (before && ((before.analytics && !choices.analytics) || (before.replay && !choices.replay))) {
      denyLoadedVendors(); location.reload(); return;
    }
    startGA(); startReplay();
  }
  function button(title,cls,fn) {
    var el = document.createElement("button");
    el.type = "button"; el.className = cls; el.textContent = title; el.addEventListener("click",fn);
    return el;
  }
  function line(label,selected) {
    var wrapper = document.createElement("label");
    wrapper.className = "barczuk-consent__option";
    var input = document.createElement("input");
    input.type = "checkbox"; input.checked = !!selected;
    var text = document.createElement("span");
    text.textContent = label; wrapper.append(input,text);
    return {wrapper:wrapper,input:input};
  }
  function showBanner() {
    if (banner) return;
    banner = document.createElement("section");
    banner.className = "barczuk-consent";
    banner.setAttribute("role","region");
    banner.setAttribute("aria-label",t.title);
    var body = document.createElement("div");
    body.className = "barczuk-consent__body";
    var title = document.createElement("strong"); title.textContent = t.title;
    var desc = document.createElement("p"); desc.textContent = t.intro;
    var link = document.createElement("a");link.href = urls[language];link.textContent = t.policy;
    body.append(title,desc);
    var current = readConsent();
    var analyticsOption = ga4 ? line(t.ga,current && current.analytics) : null;
    var replayOption = clarity ? line(t.replay,current && current.replay) : null;
    if (analyticsOption) body.appendChild(analyticsOption.wrapper);
    if (replayOption) body.appendChild(replayOption.wrapper);
    body.appendChild(link);
    var actions = document.createElement("div");
    actions.className = "barczuk-consent__choices";
    actions.append(
      button(t.reject,"barczuk-consent__button barczuk-consent__button--reject",function () { choose(false,false); }),
      button(t.save,"barczuk-consent__button barczuk-consent__button--accept",function () {
        choose(analyticsOption && analyticsOption.input.checked,replayOption && replayOption.input.checked);
      })
    );
    banner.append(body,actions);
    document.body.appendChild(banner);
  }
  function start() {
    var footer = document.querySelector("footer .footer-bottom") || document.querySelector("footer");
    if (footer && !document.getElementById("barczuk-analytics-settings")) {
      var settings = button(t.settings,"barczuk-analytics-settings",showBanner);
      settings.id = "barczuk-analytics-settings";
      footer.appendChild(settings);
    }
    document.addEventListener("click",function (event) {
      if (!refreshConsent()) return;
      var link = event.target.closest && event.target.closest("a[href]");
      if (!link) return;
      var href = link.getAttribute("href") || "";
      if (/^mailto:/i.test(href)) track("contact_email_click","email");
      else if (/^tel:/i.test(href)) track("contact_phone_click","telephone");
      else if (/^https:\/\/portal\.barczuk\.com\.pl\//.test(href)) track("portal_entry_click","client_portal");
      else if (/^\/(?:finansowanie-przedsiebiorstw|en\/corporate-financing|de\/unternehmensfinanzierung|ua\/finansuvannia)/.test(href))
        track("offer_select","financing");
    },{capture:true});
    if (choices) {startGA();startReplay();}
    else showBanner();
    window.addEventListener("focus",refreshConsent);
    window.addEventListener("pageshow",refreshConsent);
    document.addEventListener("visibilitychange",function () {if (!document.hidden) refreshConsent();});
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",start,{once:true});
  else start();
})();

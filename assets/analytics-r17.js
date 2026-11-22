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
    pl: {intro:"Korzystamy z niezbędnych plików cookie oraz — za Twoją zgodą — z plików analitycznych, które pomagają nam ulepszać witrynę. Swój wybór możesz zmienić w każdej chwili.",settings:"USTAWIENIA COOKIES",reject:"ODRZUĆ OPCJONALNE",accept:"AKCEPTUJĘ",title:"Ustawienia cookies",details:"Wybierz, czy zgadzasz się na opcjonalny pomiar odwiedzin. Swoją decyzję możesz później zmienić.",essential:"Niezbędne",always:"Zawsze aktywne",essentialDesc:"Służą do działania strony, bezpieczeństwa i zapamiętania Twojego wyboru.",ga:"Analityczne — Google Analytics 4",gaDesc:"Pomagają analizować odwiedziny i wybrane kliknięcia na publicznej stronie. Bez treści formularzy i danych Strefy klienta.",back:"WRÓĆ",save:"ZAPISZ WYBÓR",policy:"Informacja o cookies"},
    en: {intro:"We use essential cookies and, with your consent, analytics cookies to help us improve our website. You can change your preferences at any time.",settings:"COOKIE SETTINGS",reject:"REJECT OPTIONAL",accept:"ACCEPT",title:"Cookie settings",details:"Choose whether to allow optional website analytics. You can change your decision later.",essential:"Essential",always:"Always active",essentialDesc:"Used for website operation, security and remembering your choice.",ga:"Analytics — Google Analytics 4",gaDesc:"Help us understand public-page visits and selected clicks. No form contents or client portal data.",back:"BACK",save:"SAVE CHOICE",policy:"Cookie notice"},
    de: {intro:"Wir verwenden notwendige Cookies und – mit Ihrer Einwilligung – Analyse-Cookies, um unsere Website zu verbessern. Sie können Ihre Auswahl jederzeit ändern.",settings:"COOKIE-EINSTELLUNGEN",reject:"OPTIONALE ABLEHNEN",accept:"AKZEPTIEREN",title:"Cookie-Einstellungen",details:"Wählen Sie, ob eine freiwillige Analyse zulässig ist. Sie können Ihre Entscheidung später ändern.",essential:"Notwendig",always:"Immer aktiv",essentialDesc:"Für den Betrieb und die Sicherheit der Website sowie das Speichern Ihrer Auswahl.",ga:"Analyse — Google Analytics 4",gaDesc:"Erfasst Besuche öffentlicher Seiten und ausgewählte Klicks. Keine Formulardaten oder Aktivitäten im Kundenportal.",back:"ZURÜCK",save:"AUSWAHL SPEICHERN",policy:"Cookie-Hinweise"},
    uk: {intro:"Ми використовуємо необхідні файли cookie, а за вашою згодою — аналітичні файли cookie, які допомагають нам покращувати сайт. Ви можете змінити свій вибір у будь-який момент.",settings:"НАЛАШТУВАННЯ COOKIE",reject:"ВІДХИЛИТИ НЕОБОВ’ЯЗКОВІ",accept:"ПРИЙНЯТИ",title:"Налаштування cookie",details:"Оберіть, чи дозволяєте ви необов'язкову аналітику. Пізніше вибір можна змінити.",essential:"Необхідні",always:"Завжди активні",essentialDesc:"Для роботи й безпеки сайту та збереження вашого вибору.",ga:"Аналітичні — Google Analytics 4",gaDesc:"Допомагають аналізувати відвідування публічних сторінок і вибрані натискання. Без даних форм і кабінету клієнта.",back:"НАЗАД",save:"ЗБЕРЕГТИ ВИБІР",policy:"Інформація про cookie"}
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
    el.type = "button";el.className=cls;el.textContent=title;el.addEventListener("click",fn);
    return el;
  }
  function line(label,selected) {
    var wrapper=document.createElement("label");wrapper.className="barczuk-consent__option";
    var input=document.createElement("input");input.type="checkbox";input.checked=!!selected;
    var text=document.createElement("span");text.textContent=label;wrapper.append(input,text);
    return {wrapper:wrapper,input:input};
  }
  function removeBanner(){if(banner){banner.remove();banner=null;}}
  function consentRoot(detailed){
    var root=document.createElement("section");
    root.className="barczuk-consent"+(detailed?" barczuk-consent--settings":"");
    root.setAttribute("role","region");root.setAttribute("aria-label",t.title);
    return root;
  }
  function showBanner(){
    if(banner)return;
    banner=consentRoot(false);
    var wrap=document.createElement("div");wrap.className="barczuk-consent__wrap";
    var copy=document.createElement("p");copy.className="barczuk-consent__intro";copy.textContent=t.intro;
    var actions=document.createElement("div");actions.className="barczuk-consent__choices";
    actions.append(
      button(t.settings,"barczuk-consent__button barczuk-consent__button--settings",showSettings),
      button(t.reject,"barczuk-consent__button barczuk-consent__button--reject",function(){choose(false,false);}),
      button(t.accept,"barczuk-consent__button barczuk-consent__button--accept",function(){choose(true,false);})
    );
    wrap.append(copy,actions);banner.appendChild(wrap);document.body.appendChild(banner);
  }
  function showSettings(){
    removeBanner();
    banner=consentRoot(true);
    var wrap=document.createElement("div");wrap.className="barczuk-consent__wrap";
    var h=document.createElement("h2");h.className="barczuk-consent__heading";h.textContent=t.title;
    var intro=document.createElement("p");intro.className="barczuk-consent__details";intro.textContent=t.details;
    var groups=document.createElement("div");groups.className="barczuk-consent__categories";
    var essential=document.createElement("div");essential.className="barczuk-consent__category";
    var essentialTop=document.createElement("div");essentialTop.className="barczuk-consent__category-top";
    var essentialName=document.createElement("strong");essentialName.textContent=t.essential;
    var essentialStatus=document.createElement("span");essentialStatus.className="barczuk-consent__always";essentialStatus.textContent=t.always;
    essentialTop.append(essentialName,essentialStatus);
    var essentialInfo=document.createElement("p");essentialInfo.textContent=t.essentialDesc;
    essential.append(essentialTop,essentialInfo);groups.appendChild(essential);
    var current=readConsent();
    var analyticsOption=ga4?line(t.ga,!!(current&&current.analytics)):null;
    var replayOption=clarity?line("Microsoft Clarity — session recordings",!!(current&&current.replay)):null;
    if(analyticsOption){
      var gaBox=document.createElement("div");gaBox.className="barczuk-consent__category";
      var gaInfo=document.createElement("p");gaInfo.textContent=t.gaDesc;
      gaBox.append(analyticsOption.wrapper,gaInfo);groups.appendChild(gaBox);
    }
    if(replayOption){
      var replayBox=document.createElement("div");replayBox.className="barczuk-consent__category";
      replayBox.appendChild(replayOption.wrapper);groups.appendChild(replayBox);
    }
    var link=document.createElement("a");link.href=urls[language];link.className="barczuk-consent__policy";link.textContent=t.policy;
    var actions=document.createElement("div");actions.className="barczuk-consent__choices";
    actions.append(
      button(t.back,"barczuk-consent__button barczuk-consent__button--settings",function(){removeBanner();showBanner();}),
      button(t.reject,"barczuk-consent__button barczuk-consent__button--reject",function(){choose(false,false);}),
      button(t.save,"barczuk-consent__button barczuk-consent__button--accept",function(){
        choose(analyticsOption&&analyticsOption.input.checked,replayOption&&replayOption.input.checked);
      })
    );
    wrap.append(h,intro,groups,link,actions);banner.appendChild(wrap);document.body.appendChild(banner);
    if(typeof h.focus==="function"){h.setAttribute("tabindex","-1");h.focus();}
  }
  function start() {
    var footer = document.querySelector("footer .footer-bottom") || document.querySelector("footer");
    if (footer && !document.getElementById("barczuk-analytics-settings")) {
      var settings = button(t.settings,"barczuk-analytics-settings",showSettings);
      settings.id = "barczuk-analytics-settings";
      var version = typeof footer.querySelector === "function" ? footer.querySelector(".site-version") : null;
      if (version && version.parentNode === footer) {
        // One row: cookie settings, followed by the current version.
        var tools = document.createElement("div");
        tools.className = "barczuk-footer-tools";
        footer.insertBefore(tools, version);
        tools.append(settings, version);
      } else {
        footer.appendChild(settings);
      }
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

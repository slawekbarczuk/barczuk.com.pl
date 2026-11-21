/* BARCZUK R17: free analytics, opt-in only; public barczuk.com.pl pages. */
(function () {
  "use strict";
  // Never record or instrument authenticated client portal pages.
  if (location.hostname === "portal.barczuk.com.pl") return;

  var config = window.BARCZUK_ANALYTICS_CONFIG || {};
  var ga4 = /^G-[A-Z0-9]+$/.test(config.ga4MeasurementId || "") ? config.ga4MeasurementId : "";
  var clarity = /^[a-z0-9]{6,32}$/i.test(config.clarityProjectId || "") ? config.clarityProjectId : "";
  // No vendor identifiers: no banner, cookies or third-party analytic requests.
  if (!ga4 && !clarity) return;

  var locale = (document.documentElement.lang || "pl").toLowerCase();
  if (locale === "ua") locale = "uk";
  if (!["pl", "en", "de", "uk"].includes(locale)) locale = "pl";
  var strings = {
    pl: { title:"Prywatność i analityka", desc:"Za Twoją zgodą używamy Google Analytics 4 i Microsoft Clarity, aby sprawdzać, jak odwiedzający korzystają z publicznej strony. Możesz odmówić bez ograniczenia dostępu. Nie rejestrujemy zawartości Strefy klienta.", reject:"Odrzuć", accept:"Zgadzam się", policy:"Zasady cookies", settings:"Ustawienia analityki" },
    en: { title:"Privacy and analytics", desc:"With your consent, we use Google Analytics 4 and Microsoft Clarity to understand how visitors use our public website. You can decline without restricting access. We do not record the client portal.", reject:"Reject", accept:"Accept analytics", policy:"Cookie policy", settings:"Analytics settings" },
    de: { title:"Datenschutz und Analyse", desc:"Mit Ihrer Einwilligung nutzen wir Google Analytics 4 und Microsoft Clarity, um die Nutzung unserer öffentlichen Website zu verstehen. Sie können ablehnen, ohne den Zugang einzuschränken. Das Kundenportal wird nicht aufgezeichnet.", reject:"Ablehnen", accept:"Analyse erlauben", policy:"Cookie-Hinweise", settings:"Analyse-Einstellungen" },
    uk: { title:"Приватність та аналітика", desc:"За вашою згодою ми використовуємо Google Analytics 4 і Microsoft Clarity для аналізу відвідувань публічного сайту. Ви можете відмовитися без обмеження доступу. Вміст кабінету клієнта не записується.", reject:"Відхилити", accept:"Дозволити аналітику", policy:"Політика cookie", settings:"Налаштування аналітики" }
  };
  var cookieUrls = {pl:"/informacje/cookies/",en:"/en/cookies/",de:"/de/cookies/",uk:"/ua/cookies/"};
  var t = strings[locale];
  var consentKey = "barczuk_r17_analytics_consent_v1";
  var choice = null;
  var loaded = false;
  var banner = null;

  try { var saved = localStorage.getItem(consentKey); if (saved === "yes" || saved === "no") choice = saved; }
  catch (_) { /* Privacy storage unavailable: ask again next visit. */ }

  function loadVendor(src) {
    var tag = document.createElement("script");
    tag.async = true;
    tag.src = src;
    document.head.appendChild(tag);
  }
  function startGA4() {
    if (!ga4) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag("consent", "default", {
      analytics_storage:"denied", ad_storage:"denied",
      ad_user_data:"denied", ad_personalization:"denied"
    });
    window.gtag("consent", "update", {analytics_storage:"granted"});
    window.gtag("js", new Date());
    window.gtag("config", ga4, {
      allow_google_signals:false,
      allow_ad_personalization_signals:false
    });
    loadVendor("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ga4));
  }
  function isPolicyPage() {
    return /\/(informacje\/(?:prywatnosc|cookies|informacje-prawne)|(?:en|de)\/(?:privacy|cookies|legal-information|datenschutz|rechtliche-hinweise)|ua\/(?:konfidentsiinist|cookies|pravova-informatsiia))\//.test(location.pathname);
  }
  function startClarity() {
    if (!clarity || isPolicyPage()) return;
    // Mask the entire contact form, not just form input values.
    document.querySelectorAll("form, #formularz-kontaktowy").forEach(function (node) {
      node.setAttribute("data-clarity-mask", "true");
    });
    window.clarity = window.clarity || function () {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };
    window.clarity("consentv2", {ad_Storage:"denied", analytics_Storage:"granted"});
    loadVendor("https://www.clarity.ms/tag/" + encodeURIComponent(clarity));
  }
  function track(action, scope) {
    if (choice !== "yes" || !ga4 || typeof window.gtag !== "function") return;
    // Event parameters contain no name, email address, phone number, URL query or form data.
    window.gtag("event", action, {interaction:scope, language:locale});
  }
  function startApprovedAnalytics() {
    if (loaded || choice !== "yes") return;
    loaded = true;
    startGA4();
    startClarity();
    document.addEventListener("click", function (event) {
      var link = event.target.closest && event.target.closest("a[href]");
      if (!link) return;
      var href = link.getAttribute("href") || "";
      if (href.indexOf("mailto:") === 0) track("contact_email_click", "email");
      else if (href.indexOf("tel:") === 0) track("contact_phone_click", "telephone");
      else if (/^https:\/\/portal\.barczuk\.com\.pl\//.test(href)) track("portal_entry_click", "client_portal");
      else if (/finansowanie-przedsiebiorstw|corporate-financing|unternehmensfinanzierung|finansuvannia/.test(href)) track("financing_interest", "financing");
    }, {capture:true});
  }
  function dismiss() { if (banner) { banner.remove(); banner = null; } }
  function removeAnalyticsCookies() {
    // Withdrawn consent: expire only known first-party GA4/Clarity cookies.
    // Third-party or HttpOnly cookies cannot be deleted from client-side JavaScript.
    var domain = location.hostname.replace(/^www\\./, "");
    document.cookie.split(";").forEach(function (entry) {
      var name = entry.trim().split("=")[0];
      if (!/^(_ga(?:_|$)|_gid$|_gat(?:_|$)|_clck$|_clsk$)/.test(name)) return;
      ["", "; domain=" + domain, "; domain=." + domain].forEach(function (suffix) {
        document.cookie = name + "=; Max-Age=0; path=/; SameSite=Lax" + suffix;
      });
    });
  }
  function decide(value) {
    var prior = choice;
    choice = value;
    try { localStorage.setItem(consentKey, value); } catch (_) {}
    dismiss();
    if (value === "yes") startApprovedAnalytics();
    // Revocation must stop already loaded scripts, not merely change the preference.
    if (prior === "yes" && value === "no") {
      if (typeof window.gtag === "function") window.gtag("consent","update",{analytics_storage:"denied"});
      if (typeof window.clarity === "function") window.clarity("consentv2",{ad_Storage:"denied",analytics_Storage:"denied"});
      removeAnalyticsCookies();
      location.reload();
    }
  }
  function button(label, classname, handler) {
    var el = document.createElement("button");
    el.type = "button";
    el.className = classname;
    el.textContent = label;
    el.addEventListener("click", handler);
    return el;
  }
  function showBanner() {
    if (banner) return;
    banner = document.createElement("section");
    banner.className = "barczuk-consent";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", t.title);
    var body = document.createElement("div");
    body.className = "barczuk-consent__body";
    var heading = document.createElement("strong");
    heading.textContent = t.title;
    var copy = document.createElement("p");
    copy.textContent = t.desc;
    var link = document.createElement("a");
    link.href = cookieUrls[locale];
    link.textContent = t.policy;
    body.append(heading, copy, link);
    var buttons = document.createElement("div");
    buttons.className = "barczuk-consent__choices";
    buttons.append(
      button(t.reject, "barczuk-consent__button barczuk-consent__button--reject", function () { decide("no"); }),
      button(t.accept, "barczuk-consent__button barczuk-consent__button--accept", function () { decide("yes"); })
    );
    banner.append(body, buttons);
    document.body.appendChild(banner);
  }
  function addSettingsControl() {
    var footer = document.querySelector("footer .footer-bottom") || document.querySelector("footer");
    if (!footer || document.getElementById("barczuk-analytics-settings")) return;
    var settings = button(t.settings, "barczuk-analytics-settings", showBanner);
    settings.id = "barczuk-analytics-settings";
    footer.appendChild(settings);
  }
  function ready() {
    addSettingsControl();
    if (choice === "yes") startApprovedAnalytics();
    else if (choice === null) showBanner();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready, {once:true});
  else ready();
})();

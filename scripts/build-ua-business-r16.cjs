"use strict";
// Dedicated Ukrainian B2B financing page, derived from the current R16 UA
// financing template. Rebuilt after the common i18n process; no PL/EN/DE edits.
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const read = p => fs.readFileSync(path.join(root, p), "utf8");
const slug = "/ua/finansuvannia-biznesu-v-polshchi/";
const canonical = "https://www.barczuk.com.pl" + slug;
const title = "Фінансування бізнесу з українським капіталом у Польщі | Barczuk";
const desc = "Незалежне фінансове консультування для польських компаній з українським капіталом: кредити для бізнесу, банківські гарантії, переговори та підготовка до вимог банку.";
const esc = s => s.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;");
let html = read("ua/finansuvannia/index.html");
const check = (find,label) => { if(!html.includes(find)) throw Error("UA SEO template changed: " + label); };
check('<html lang="uk">',"lang");
check('<main id="tresc">',"main");
check('</main><footer>',"main footer");
check('<nav class="language-switcher"',"language switcher");
html = html.replace(/<title>[\s\S]*?<\/title>/, '<title>'+esc(title)+'</title>');
html = html.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="'+esc(desc)+'">');
html = html.replace(/<meta property="og:title" content="[^"]*">/, '<meta property="og:title" content="'+esc(title)+'">');
html = html.replace(/<meta property="og:description" content="[^"]*">/, '<meta property="og:description" content="'+esc(desc)+'">');
html = html.replace(/<meta property="og:url" content="[^"]*">/, '<meta property="og:url" content="'+canonical+'">');
// This page is distinct, not a translation of the generic financing pages.
// Keep the language navigation, but do not falsely mark different pages as hreflang counterparts.
html = html.replace(/<link rel="alternate" hreflang="(?:pl|en|de|uk|x-default)"[^>]*>/g, "");
html = html.replace(/<link rel="canonical"[^>]*>/g, "");
const structured = {"@context":"https://schema.org","@type":"WebPage","@id":canonical+"#webpage","url":canonical,"name":title,"description":desc,"inLanguage":"uk","isPartOf":{"@id":"https://www.barczuk.com.pl/#organization"}};
const analyticsTag = '<link rel="stylesheet" href="/assets/analytics-r17.css?v=r17-footer-v3">';
const hasAnalytics = html.includes('/assets/analytics-r17.js');
html = html.replaceAll(analyticsTag, '');
html = html.replace("</head>", '<link rel="canonical" href="'+canonical+'"><script type="application/ld+json">'+JSON.stringify(structured)+'</script>'+(hasAnalytics?analyticsTag:'')+'</head>');
html = html.replace(/(<nav class="language-switcher"[\s\S]*?<\/nav>)/, block=>block.replace('href="/ua/finansuvannia/"','href="'+slug+'"'));
const main = [
'<main id="tresc">',
'<section class="detail-hero"><div class="shell">',
'<a class="back" href="/ua/finansuvannia/">← Усі напрями фінансування</a>',
'<p class="eyebrow">Для компаній з українським капіталом, які працюють у Польщі</p>',
'<div class="detail-hero-grid"><h1>Фінансування бізнесу<br>з українським капіталом<br>у Польщі</h1>',
'<p class="lead">Незалежна підтримка польських підприємств у підготовці до кредитування в банках Польщі. Аналіз фінансової ситуації, структури власності, документації, умов фінансування та переговори з банками.</p>',
'</div></div></section>',
'<div class="detail-strip"><div class="shell detail-strip-inner"><strong>Кредити для бізнесу · Інвестиції · Банківські гарантії</strong><p>Для підприємств, а не для приватного споживчого кредитування.</p></div></div>',
'<div class="shell detail-layout"><aside class="scope-nav" aria-label="Зміст сторінки">',
'<p class="eyebrow">На цій сторінці</p><div class="scope-nav-links">',
'<a href="#komu"><span>01</span>Кому підходить послуга</a>',
'<a href="#finansuvannia"><span>02</span>Види фінансування</a>',
'<a href="#bank"><span>03</span>Вимоги банку</a>',
'<a href="#etapy"><span>04</span>Етапи співпраці</a>',
'<a href="#pytannia"><span>05</span>Запитання та відповіді</a>',
'</div></aside><div>',
'<section class="scope-item" id="komu"><span class="scope-no">01</span><div>',
'<h2>Для яких компаній?</h2>',
'<p>Послуга призначена для підприємств, що ведуть господарську діяльність у Польщі, зокрема польських spółka z o.o. з українськими акціонерами або учасниками. Це можуть бути виробничі, торговельні, логістичні, будівельні та інші компанії, які потребують фінансування діяльності чи інвестицій.</p>',
'<p>Розглядаємо також ситуації, коли українська компанія розвиває польський підрозділ або планує інвестицію в Польщі. Можливість залучення банківських коштів залежить від конкретного підприємства, документів, структури операції та політики відповідного банку.</p>',
'</div></section>',
'<section class="scope-item" id="finansuvannia"><span class="scope-no">02</span><div>',
'<h2>Які види фінансування?</h2>',
'<p><strong>Оборотний капітал.</strong> Кредитні лінії, фінансування запасів, закупівель, контрактів та операційного циклу.</p>',
'<p><strong>Інвестиції.</strong> Фінансування придбання обладнання, розвитку виробництва, складських об’єктів або інших корпоративних інвестицій.</p>',
'<p><strong>Банківські гарантії.</strong> Підготовка заявки, аналіз строку, забезпечення та умов гарантії для контрактів.</p>',
'<p><strong>Зміна чинного фінансування.</strong> Переговори про кредитні умови, графік погашення, забезпечення чи рефінансування.</p>',
'<p class="work-output">Мета — підготувати зрозумілу для банку структуру операції та перевірити, які варіанти можна обґрунтовано розглядати.</p>',
'</div></section>',
'<section class="scope-item" id="bank"><span class="scope-no">03</span><div>',
'<h2>Що перевіряє польський банк?</h2>',
'<p>Кредитна оцінка може охоплювати фінансову звітність, обороти, грошові потоки, наявні зобов’язання, ціль фінансування, власний внесок, забезпечення та перспективи діяльності.</p>',
'<p>У рамках процедур KYC/AML банк може перевіряти структуру власності, кінцевих бенефіціарних власників, походження коштів, контрагентів і характер міжнародних розрахунків. За потреби готуються пояснення та документи з Польщі й інших країн.</p>',
'<p><strong>Український капітал сам по собі не означає відмови у фінансуванні.</strong> Вимоги й рішення залежать від конкретної ситуації та політики банку. Немає універсальної, гарантованої процедури отримання кредиту.</p>',
'<p class="work-output">На початку достатньо короткого опису компанії та потреби у фінансуванні. Фінансові документи передаються лише після погодження безпечного каналу та умов співпраці.</p>',
'</div></section>',
'<section class="scope-item" id="etapy"><span class="scope-no">04</span><div>',
'<h2>Як проходить співпраця?</h2>',
'<p><strong>1. Попередня розмова.</strong> З’ясовуємо діяльність компанії, ціль фінансування, приблизний строк і основні питання банку.</p>',
'<p><strong>2. Аналіз можливостей.</strong> Визначаємо потрібні документи, можливі обмеження та напрям підготовки фінансування.</p>',
'<p><strong>3. Підготовка й переговори.</strong> Після погодження обсягу послуги — фінансові моделі, інформаційні матеріали, порівняння пропозицій та підтримка переговорів.</p>',
'<p><strong>4. Супровід після підписання.</strong> За окремою домовленістю — моніторинг умов договору, звітності, ковенантів і строків.</p>',
'</div></section>',
'<section class="scope-item" id="pytannia"><span class="scope-no">05</span><div>',
'<h2>Поширені запитання</h2>',
'<p><strong>Чи може польська spółka z o.o. з українськими власниками подати заявку на кредит?</strong> Так, компанія може звернутися до банку. Розгляд залежить від її фінансової ситуації, структури власності, характеру операції та чинних вимог конкретного банку.</p>',
'<p><strong>Чи можливо фінансування новоствореної компанії?</strong> Це залежить від продукту та критеріїв банку. Відсутність історії може обмежувати стандартні кредитні можливості; доцільно спочатку оцінити модель діяльності та плановану структуру інвестиції.</p>',
'<p><strong>Чи можна допомогти, якщо банк вимагає додаткові документи?</strong> Можлива допомога в упорядкуванні інформації про компанію, структуру власності, джерела коштів, розрахунки та відповідях на запитання. Рішення про відкриття рахунку чи надання кредиту ухвалює банк.</p>',
'<p><strong>Якою мовою відбувається консультація?</strong> Мову й організацію спілкування узгоджуємо індивідуально перед початком співпраці.</p>',
'</div></section>',
'</div></div>',
'<section class="engagement"><div class="shell engagement-grid">',
'<div><p class="eyebrow">Перший крок</p><h2>Обговорімо потреби вашої компанії</h2></div>',
'<div class="engagement-copy"><p>У першому повідомленні достатньо вказати назву підприємства, сферу діяльності та мету фінансування. Не надсилайте конфіденційну фінансову документацію до погодження безпечного способу її передачі.</p>',
'<p>Відомості про опрацювання персональних даних: <a href="/ua/konfidentsiinist/">Політика конфіденційності</a>.</p>',
'<a class="button black" href="mailto:kontakt@barczuk.com.pl">Написати на kontakt@barczuk.com.pl</a>',
'<p>Інші послуги: <a class="text-link" href="/ua/finansuvannia/">Фінансування підприємств</a>.</p>',
'</div></div></section>',
'<section class="contact" id="kontakt"><div class="shell contact-grid">',
'<div><p class="eyebrow">Контакт</p><h2>Почнімо з короткої розмови.</h2><p class="contact-intro">Незалежне консультування для підприємств у Польщі. Без обіцянок позитивного рішення банку.</p></div>',
'<div class="contact-details"><p>Зв’язатися</p><a href="mailto:kontakt@barczuk.com.pl">kontakt@barczuk.com.pl</a><a href="tel:+48422031057">+48 42 203 10 57</a></div>',
'</div></section>',
'</main>'
].join("");
// Check critical content remains in the generated document.
if(!main.includes("Кредитна оцінка")) throw Error("Missing bank assessment content");
const start = html.indexOf('<main id="tresc">');
const end = html.indexOf('</main>',start);
if(start<0 || end<0) throw Error("Cannot isolate UA template main");
html = html.slice(0,start) + main + html.slice(end + '</main>'.length);
if((html.match(/<link rel="canonical"/g)||[]).length!==1) throw Error("Canonical count");
if(html.includes('hreflang="x-default"')) throw Error("Unrelated hreflang");
const target = path.join(root,"ua/finansuvannia-biznesu-v-polshchi/index.html");
fs.mkdirSync(path.dirname(target),{recursive:true});
fs.writeFileSync(target,html,"utf8");
console.log("Built UA finance business landing",target, Buffer.byteLength(html));

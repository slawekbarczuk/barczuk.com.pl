# R16 — bezpłatna widoczność UA: finansowanie biznesu w Polsce

**Status 2026-11-20:** przygotowano na gałęzi feature/r16-ua-financing-seo-20261120; do kontroli CI, wdrożenia i potwierdzenia indeksowania. Bez reklam ani opłat SEO.

## Zmiany
- Dedykowana ukraińska podstrona `/ua/finansuvannia-biznesu-v-polshchi/` dla polskich spółek z kapitałem ukraińskim: kredyty obrotowe, inwestycje, gwarancje, KYC/AML, FAQ, jasny kontakt B2B.
- Jeden kontekstowy link ze strony głównej UA, nowe metadane UA-home, samodzielny URL kanoniczny i struktura WebPage.
- Uzupełnienie `sitemap.xml` i odpowiednie `lastmod` dla zmienionej strony UA.
- Generowanie w `scripts/build-ua-business-r16.cjs`, podłączone do istniejącego procesu `scripts/build-ua-r16.cjs`, test `tests/ua-business-seo-r16.test.cjs`.
- Bez deklaracji gwarantowanego kredytu, ukraińskojęzycznych konsultacji ani uruchomienia formularza P04. Pierwszy kontakt e-mail, bez przesyłania finansowych załączników.
- Zachowano wygląd R16, trzy panoramy UA, cztery języki, portal i API; bez zmian PL/EN/DE.

## Bezpłatne działania Google/Bing po zatwierdzonym wydaniu
1. Zweryfikować HTTP 200, canonical, robots, schema, linkowanie i sitemapę na produkcji.
2. Sprawdzić stan istniejącej usługi Google Search Console dla domeny; skontrolować właściwość i dodać/odczytać `https://www.barczuk.com.pl/sitemap.xml`. Użyć kontroli URL dla nowej strony i `/ua/`, poprosić o indeksację nowych/zmienionych stron.
3. Sprawdzić Bing Webmaster Tools, zgłoszenie tej samej sitemapy i diagnostykę nowego URL; rozważyć bezpłatne IndexNow dopiero po uzgodnieniu klucza i bez ujawniania go.
4. Mierzyć *Performance*: organic impressions, clicks, CTR, zapytania ukraińskojęzyczne i indeksowane adresy, bez obietnicy pozycji.
5. Po 2–4 tygodniach opublikować kolejny **rzeczywiście przydatny** tekst UA o dokumentacji kredytowej i KYC/AML, bez masowych stron o podobnej treści.

## Wymagana weryfikacja
- Testy pełnego generatora i testów Node, w tym idempotencja dwóch przebiegów;
- porównanie PL/EN/DE i czterech istniejących UA podstron ze stanem przed zmianą;
- desktop/mobile, szczególnie nawigacja, adresy /ua/, kontakt, brak poziomego przepełnienia;
- GitHub Actions i dowód publikacji Azure.
- Bing/Google: nie twierdzić, że strona została zaindeksowana, dopóki nie ma dowodu z narzędzi webmastera.

**Bez kosztów:** nie uruchamiać Google Ads, Bing Ads, płatnego link buildingu ani zakupów publikacji.

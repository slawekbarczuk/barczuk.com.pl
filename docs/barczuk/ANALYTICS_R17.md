# R17: analityka strony — gotowość techniczna, bez aktywacji na produkcji

Stan: 21.11.2026. Gałąź: \`r17-free-analytics-consent-20261121\`, PR #18.

## Rozdzielenie narzędzi

- Cloudflare Web Analytics: **już istnieje na publicznym R16**; nie dublować instalacji. Zweryfikować ocenę prawno-techniczną beacona, ponieważ brak cookie nie oznacza automatycznie braku obowiązków informacyjnych.
- Google Analytics 4 Standard: przygotowane zdarzenia odsłony (z zatwierdzonych ścieżek), kliknięcia e-mail, telefon, wejście do portalu, zainteresowanie ofertą; uruchamiać **dopiero po dobrowolnej zgodzie**.
- Microsoft Clarity: kod przygotowany osobno, ale **flaga enableClarityReplay=false** i pusty identyfikator. Nie uruchamiać ciągłych nagrań bez odrębnej decyzji właściciela i oceny dostawcy.

## Poprawki po niezależnym audycie

1. Własny, wersjonowany techniczny cookie \`barczuk_analytics_consent_v2\` dla obu hostów \`barczuk.com.pl\` i \`www.barczuk.com.pl\`, ważność maksymalnie 180 dni. Nie zawiera identyfikatora odwiedzającego.
2. Oddzielne, domyślnie niezaznaczone pola zgody: GA4 statystyki i Clarity replay. Pierwsze pole widoczne tylko z poprawnym identyfikatorem GA4, drugie tylko przy ręcznej aktywacji Clarity.
3. Cofnięcie zgody: ostatni stan sprawdzany w cookie przy każdym zdarzeniu, przy focus, pageshow oraz powrocie do aktywnej karty; załadowane już biblioteki są wyłączane przez przeładowanie. Czyszczenie znanych własnych cookies dostępnych z JavaScript.
4. Ograniczenie analityki do jawnej listy publicznych tras. Brak analityki strony 404 i stron prawnych. Brak obsługi hosta portalu ani losowych podstron.
5. Oczyszczony URL odsłony: \`https://www.barczuk.com.pl\` + znana ścieżka, bez query i fragmentu. Odsyłacz wyłącznie jako origin domeny HTTPS. \`send_page_view:false\`, zdarzenie strony z kodem oferty, bez danych formularza.
6. Clarity wykluczone ze stron zawierających dowolny formularz oraz z prywatności, cookies, 404 i portalu; dodatkowo dopuszczony tylko wybrany adres UA, ale usługa pozostaje nieaktywna.
7. Cztery języki banneru PL/UA/EN/DE. Odmowa nie blokuje korzystania z witryny. Dostępny przycisk ponownego otwarcia ustawień w stopce.

## Ważne ograniczenia

- **Nic nowego jeszcze nie wysyła telemetrii**, ponieważ w \`assets/analytics-r17-config.js\` obydwa identyfikatory są puste.
- Pozostawić \`enableClarityReplay:false\` do dalszego audytu i odrębnej decyzji.
- Poprawne testy Node i CI nie potwierdzają skuteczności ustawień w rzeczywistych panelach GA4/Clarity. Należy wyłączyć pomiar rozszerzony GA4, zwłaszcza form interactions, outbound clicks, page changes, oraz sprawdzić redakcję URL i retencję w panelu.
- Nie wdrażać bieżącego PR w produkcji, dopóki **polityki cookies i prywatności w PL/UA/EN/DE nie zostaną uaktualnione do rzeczywiście włączonych usług**, a użytkownik nie poda publicznego identyfikatora GA4.
- Parametry cookie i zasady transferu danych wymagają zatwierdzenia po ocenie prawnej; cookies zapisuje się tylko na domenie publicznej.
- Testy zachowania w Node z podmienionymi vendorami nie zastępują sprawdzenia w Chrome/Safari, na rzeczywistych identyfikatorach i panelach.
- Przed wdrożeniem przeprowadzić też podwójną, powtarzalną odbudowę stron UA z czystego SHA. Niezależny audyt ujawnił różnice UA przy pierwszym uruchomieniu generatora.

## Kroki właściciela wymagane do aktywacji

1. W https://analytics.google.com utworzyć bezpłatną usługę GA4 \`BARCZUK – strona publiczna\`, strumień Web \`https://www.barczuk.com.pl\`; strefa czasu Europe/Warsaw, waluta PLN. Podać wyłącznie Measurement ID w formie \`G-XXXXXXXXXX\`.
2. W panelu GA4 sprawdzić ustawienia udostępniania danych, przechowywania, enhanced measurement i automatycznego wykrywania formularzy. Nigdy nie wysyłać PII.
3. Ocenić i zaakceptować aktualizację dokumentów prywatności, umowę powierzenia oraz odpowiedni instrument transferowy, jeżeli dotyczy.
4. Uruchomić GA4 w kontrolowanym środowisku testowym z dozwolonym hostname (obecny skrypt blokuje tymczasowe domeny Azure preview), a następnie wykonać test czystej sesji, odmowy, zgody, cofnięcia w 2 kartach, powrotu z historii, obu hostów, 4 języków oraz braku wysyłki query string. Skontrolować GA4 Realtime.
5. Po sukcesie i zgodzie na produkcję opublikować zmiany, zweryfikować produkcję i dopiero wtedy udokumentować wydanie R17.

Nie instalować gotowego tagu Google obok skryptu R17 — prowadziłoby to do uruchomienia pomiaru przed zgodą albo podwójnych zdarzeń.

## Aktualizacja 21.11.2026 — gotowość GA4

Measurement ID: `G-QH65KPVNPH` (publiczny, nie sekret). Polityki cookies/prywatności przygotowano w PL/EN/DE/UA dla wariantu z GA4 po zgodzie. Microsoft Clarity pozostaje wyłączone. Nie instalować osobnego kontenera GTM `GTM-MJLK6VTH` i nie scalać do produkcji przed testem rzeczywistych tagów, ustawień Google i odbiorem informacji prawnych. W Google Analytics sprawdzić retencję danych (zalecane 2 miesiące), rozszerzone pomiary (wyłączone), udostępnianie danych i właściwe warunki przetwarzania/transferów.

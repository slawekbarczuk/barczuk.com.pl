# Stan projektu BARCZUK — 2026-11-20

## R16: płynne języki i spójna wysokość hero — KOD SCALONY, PRODUKCJA DO POTWIERDZENIA (20.11.2026)

- Na podstawie wcześniejszego projektu z wątku „Dostosuj Ukraińskie hero” przeniesiono gotowe pliki do aktualnej gałęzi z nową podstroną SEO UA. [PR #16](https://github.com/slawekbarczuk/barczuk.com.pl/pull/16), commit `7c98439104195d4fbad386f4b02112ebafe71ac5`.
- Działać ma delikatne przejście PL/UA/EN/DE na 21 podstronach; ten sam arkusz kadru co w portalu R08: desktop 598,5 px, tablet 4:3, telefon 16:9, z zachowaniem swobodnego wzrostu wysokości przy dużej treści. Zdjęcia, teksty, P04/API, Strefa klienta i SEO niezmienione.
- Testy PR: formularz P04 [44732918925](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44732918925) i Azure preview [44732918767](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44732918767) — success. Nie potwierdzono jeszcze osobno końcowej publikacji produkcyjnej ani porównania wizualnego w aktualnym browserze.
- Portal R08: kod analogicznej zmiany jest w osobnym prywatnym repo; wdrożenie produkcyjne portalu wymaga ręcznego uruchomienia i weryfikacji.


## Aktualizacja kodu SEO UA — 20.11.2026

- Dodatkowe ulepszenia podstrony UA i jej odtwarzalnego generatora zostały scalone w [PR #15](https://github.com/slawekbarczuk/barczuk.com.pl/pull/15), commit `f737f5fd8b8322481c8b1d37caa672a5ba19a3d4`.
- Workflow testowy dla gałęzi przeszedł 65/65 testów: [44731491498](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44731491498). Próba wdrożenia podglądu Azure [44731491535](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44731491535) nie powiodła się z powodu błędu dystrybucji zawartości. Bez osobnego potwierdzenia nie oznaczać publikacji produkcyjnej jako zweryfikowanej.
- Google Search Console i Bing Webmaster Tools: status indeksacji i zgłoszeń pozostaje niezweryfikowany. Brak płatnych działań.


## Widoczność UA i finansowanie biznesu — KOD GOTOWY, PRODUKCJA DO WERYFIKACJI (20.11.2026)

- W `main` scalono [PR #14](https://github.com/slawekbarczuk/barczuk.com.pl/pull/14), nowa docelowa podstrona `/ua/finansuvannia-biznesu-v-polshchi/`, link z głównej UA i 21 adresów w mapie witryny. Testy Node/P04 po poprawieniu oczekiwanego rozmiaru sitemapy: [44731417561](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44731417561) — success.
- Repozytorium zawiera trwały generator i treści. Status dostępności produkcji oraz status indeksacji Google/Bing nie jest jeszcze potwierdzony. Zero płatnych kampanii.
- Szczegóły: [SEO_UA_ORGANIC_R16.md](SEO_UA_ORGANIC_R16.md).


Statusy: **POTWIERDZONE** = dowód w GitHub/Azure lub test użytkownika; **PLAN** = zatwierdzony kierunek, bez implementacji; **DO WERYFIKACJI** = brak wystarczającego dowodu.

## Wydanie UA — WDROŻONE I ZWERYFIKOWANE (20.11.2026)

**Korekta zgłoszona po wydaniu — WDROŻONA I ZWERYFIKOWANA:** niższe hero UA dzięki zrównoważeniu nagłówka i typografii; na produkcji przy 1920 px: 598,5 px jak PL zamiast 661,4 px. Dalsze stonowanie istniejących zdjęć przez CSS ładowany tylko na stronie głównej UA. Naprawiono generator adresu portalu: wszystkie pięć stron UA prowadzi do `https://portal.barczuk.com.pl/ua/`; rzeczywiste kliknięcie na produkcji otwiera ukraiński ekran portalu. Kod: [PR #12](https://github.com/slawekbarczuk/barczuk.com.pl/pull/12), commit `8e8d6ac0970ed1b725a0c894c87bbe36cebd2a70`. [CI 44725933380](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44725933380) — success, 61 testów; [publikacja 44726319405](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44726319405) — success. Kontrola produkcji: 15 stron PL/EN/DE identycznych ze stanem sprzed korekty, cztery pozostałe strony UA różnią się wyłącznie adresem portalu, trzy pliki obrazów zachowane. Sprawdzono komputer i telefon 390 × 844 bez poziomego przepełnienia. Treść AML i mechanika 8 s / 1,6 s zachowane.

Na wyraźne polecenie użytkownika opublikowano zaakceptowaną treść oraz finalne kadry Kijowa, Odessy i Lwowa o kolorystyce umiarkowanie zbliżonej do Łodzi. Strona główna UA zawiera wsparcie firm z Ukrainy i przedsiębiorstw z ukraińskim kapitałem w finansowaniu w Polsce oraz w sprawach rachunków/KYC/AML. Kod: [PR #11](https://github.com/slawekbarczuk/barczuk.com.pl/pull/11), commit `79176f13266a3654a2f96f2bfbde6a4e5ac6205f`. Publikacja produkcyjna [44723055515](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44723055515) — success. Testy CI [44722798603](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44722798603) — success (61 testów). Kontrola produkcji potwierdziła nowe treści i zgodność SHA-256 trzech obrazów z wydaniem; pozostałe 19 podstron HTML jest identyczne ze stanem sprzed publikacji. Sprawdzono komputer oraz telefon 390 × 844, brak poziomego przepełnienia, działające rozwijane wyjaśnienie i wczytywanie obrazów. Szczegóły: [UA_PREVIEW_R16.md](UA_PREVIEW_R16.md).

## 1. Publiczna witryna — POTWIERDZONE

- Domena: https://barczuk.com.pl/ (kanoniczna wersja z www ustawiana przez repozytorium; nie zmieniać DNS bez sprawdzenia).
- Wydanie interfejsu: `SB-WEB-1126-R16` (R16). Źródło: repozytorium `slawekbarczuk/barczuk.com.pl`, gałąź `main`.
- Statyczne podstrony: główna, finansowanie przedsiębiorstw, informacje prawne, prywatność i cookies w PL, EN, DE, UA (20 stron).
- Adresy językowe: `/`, `/en/`, `/de/`, `/ua/`; w HTML /ua/ używa poprawnego `lang="uk"` i `hreflang="uk"`. Polska jest domyślna.
- **20.11.2026 — kolejność i priorytet publicznego menu:** Finansowanie / Etapy / Rezultaty / **Porozmawiajmy** (zwykły link) / **Strefa klienta** (ostatnia pozycja, obramowana CTA). Przełącznik języków **PL / UA / EN / DE**. Wprowadzono we wszystkich 20 podstronach i 404, z zachowaniem URL i tłumaczeń; nowa wersja generowana przez `scripts/build-ua-r16.cjs`. Testy i generator https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44702351609 — sukces; wdrożenie Azure https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44702453417 — sukces. Portalu R08 to osobna aplikacja: **20.11.2026 dokonano także oddzielnego wdrożenia** takiego samego porządku menu i PL / UA / EN / DE. Użytkownik uruchomił przygotowany ZIP `barczuk-strefa-r08-menu-jezyki-20261120.zip` przez Azure Cloud Shell; log SWA CLI potwierdza produkcyjne `Project deployed` na istniejącej aplikacji. Kod: https://github.com/slawekbarczuk/barczuk-strefa-klienta/commit/3ca3879aa8a3240ea7832bc98161942e252f180a, testy: https://github.com/slawekbarczuk/barczuk-strefa-klienta/actions/runs/44708027637 — sukces. Weryfikacja wizualna po odświeżeniu oczekuje.
- **20.11.2026 — poprawka iPhone dla klauzul:** na 12 stronach informacji prawnych, prywatności i cookies (PL/EN/DE/UA) ograniczono globalne reguły `nav` do `.nav-links`, aby przełącznik języków pozostawał poziomy. Testy regresji i generator czterech języków przeszły: https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44699634788. Publikacja Azure zakończona sukcesem: https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44699740937. **Wizualne działanie po poprawce użytkownik potwierdził na iPhonie 20.11.2026 („jest już idealnie”).**
- Projekt graficzny: granatowo-kremowa elegancka estetyka, szeryfowe nagłówki, mały złoty znak. PL/EN/DE: cztery wizualizacje Łodzi (Fabryczna, Manufaktura, Piotrkowska, EC1). Strona główna UA od 20.11.2026: trzy wizualizacje Kijowa, Odessy i Lwowa. Wspólny pokaz co 8 s i przenikanie 1,6 s; na komputerze obraz wypełnia prawą część hero z miękkim przejściem jedynie od lewej.
- Utrzymano zwięzłą komunikację usług B2B, gwarancje bankowe oraz doświadczenie w bankowości korporacyjnej od 1995 roku. Bez rozbudowanego CV i bez publikowania kwot.
- Wersje językowe generowane skryptami `scripts/build-i18n-r16.cjs` i `scripts/build-ua-r16.cjs`; tłumaczenia w katalogu `i18n/`. Witryna wdrażana z GitHub Actions do Azure Static Web Apps.
- Potwierdzenie wdrożenia czterech języków: GitHub Actions run https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44545813532 — sukces, commit `7a5403cb442d49543831093395d670fa9324cbbb`.

## 2. Strefa klienta — POTWIERDZONE

- Adres: https://portal.barczuk.com.pl/. To oddzielna aplikacja Azure Static Web Apps, nie podfolder głównej witryny.
- Wydanie aplikacji interfejsowej: **R08**, opublikowane 19.11.2026 z pakietu ZIP przez Azure Cloud Shell i Static Web Apps CLI (produkcja).
- Języki i ścieżki: PL /, EN /en/, DE /de/, UA /ua/. Wspólna identyfikacja wizualna, zdjęcie skarbca i menu odpowiadające witrynie.
- Własna subdomena ma rekord CNAME w Azure DNS i status przypisania domeny `Ready`; zachowany był również techniczny adres Azure Static Web Apps.
- Uwierzytelnienie przez Microsoft Entra; nowa domena została dodana do konfiguracji przekierowań, a dozwolony origin do CORS backendu.
- Użytkownik potwierdził logowanie na nowej domenie. Zrzut ekranu z 19.11.2026 pokazuje zalogowaną sesję i komunikat **połączenie z API działa (HTTP 200)** w wersji ukraińskiej. To potwierdza dostęp do istniejącego endpointu diagnostycznego, **nie** gotowość przyszłych funkcji biznesowych.
- **20.11.2026 — potwierdzone wdrożenie poprawki wysokości hero R08:** użytkownik opublikował z `barczuk-strefa-r08-krotszy-ekran.zip` przez Azure Cloud Shell. SWA CLI 2.1.0 potwierdziło produkcyjne `Project deployed` na istniejącej aplikacji (dotychczasowy hostname Azure oraz domeny PL/EN/DE/UA). Zmieniono wyłącznie CSS: krótsza sekcja ze skarbcem i białe tło poniżej; elastyczny układ mobilny. Kod: https://github.com/slawekbarczuk/barczuk-strefa-klienta/commit/6aa516ad10ef46d25d84383d79c15043305df6c4, testy: https://github.com/slawekbarczuk/barczuk-strefa-klienta/actions/runs/44703632463 — sukces. Nie zmieniano Entra ani API. **Kontrola wizualna efektu w przeglądarce oczekuje na potwierdzenie.**

## 3. Trwałość źródeł portalu — POTWIERDZONE 19.11.2026

- Oddzielne prywatne repozytorium źródeł: https://github.com/slawekbarczuk/barczuk-strefa-klienta. Widoczność **Private** potwierdzona w GitHub.
- Wersjonowane źródła R08, cztery języki, statyczne strony, oryginalna grafika skarbca, dokumentacja, skrypty oraz testy zostały zapisane; oryginalna grafika przeszła kontrolę SHA-256.
- Import, testy R05/R07/R08 i budowanie SPA przeszły pomyślnie w GitHub Actions: https://github.com/slawekbarczuk/barczuk-strefa-klienta/actions/runs/44576101323.
- Repozytorium portalu ma własne testy CI **bez automatycznego wdrażania**. 19.11.2026 użytkownik ręcznie opublikował jeszcze kosmetyczną poprawkę R08 (wyrównanie złotego kwadratu logo z R16) z pakietu ZIP przez Azure Cloud Shell; SWA CLI potwierdziło `Project deployed` na dotychczasowej aplikacji. Testy prywatnego repo: https://github.com/slawekbarczuk/barczuk-strefa-klienta/actions/runs/44577961335 — sukces. Kontrola wizualna po odświeżeniu strony pozostaje do potwierdzenia. Przyszłe publikacje wymagają świadomego uruchomienia lub zatwierdzonego procesu release.
- Dalsze ryzyko organizacyjne: formalna procedura wydań (testy, środowisko testowe, kontrola zmian i bezpieczny rollback) wciąż pozostaje do opracowania.
- Nie ma potwierdzenia, że ekran po zalogowaniu jest już właściwym Panelem doradcy lub że wdrożono teczki, bezpieczny obieg dokumentów, analizę finansową, zapisy umów i powiadomienia.

## 4. Formularz kontaktowy P04 — DO WERYFIKACJI PRZED ZMIANĄ

- W publicznym repo istnieją kod, dokumenty i testy P04 z Microsoft Graph, Turnstile i ograniczaniem zgłoszeń. Status aktualnego przełącznika produkcyjnego formularza oraz realizacja procesu retencji wymagają osobnego sprawdzenia przed jakimikolwiek deklaracjami o jego aktywności.
- Nie zmieniać obecnych uprawnień pocztowych, zasad przetwarzania ani mechanizmów antyspamowych przy okazji prac nad portalem.

## 5. Następne zadanie

W kolejnej sesji: odczytać ten plik, ROADMAP.md oraz prywatne repozytorium portalu; zaplanować pierwszy pionowy moduł Panelu doradcy i teczek przedsiębiorstw oraz kontrolę uprawnień. Nie implementować przetwarzania danych rzeczywistych klientów bez zabezpieczeń i informacji o przetwarzaniu.

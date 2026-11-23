# Stan projektu BARCZUK — 2026-11-22

## 22.11.2026 — wdrożenie zaleceń z audytu publicznej witryny

Poprzednia wersja (baza `3d6d586`) wysyłała w dwóch próbach po dwie odsłony na jedno otwarcie. Zmiana obejmuje jedną odsłonę po zgodzie, cookies GA ograniczone do odwiedzanego hosta, cztery rozróżnialne karty i pomiar przyjętych zgłoszeń P04. Dodano sekcję kapitałową oraz wyniki opracowań w PL, EN, DE i UA. Formularz wysyła wyłącznie techniczne zdarzenie po potwierdzeniu operacji przez API. Informacje o cookies i prywatności zaktualizowano w czterech językach.

Do odbioru po publikacji: sprawdzenie odpowiedzi publicznej strony, rzeczywistego pomiaru i jednego uzgodnionego zgłoszenia testowego. Weryfikacja raportu na prywatnym koncie GA4 i urządzenia fizycznego wymaga dostępu do tych zasobów.

## 22.11.2026 — stopka cookies + wersja: WDROŻONE W AZURE, QA WIZUALNA DO POTWIERDZENIA

- Przywrócono prawidłową kolejność po prawej stronie stopki we wszystkich czterech językach: `Ustawienia cookies` przed `SB-WEB-1126-R16`. Wspólne wyrównanie do linii tekstu i responsywne odstępy; skrypt JS przesuwa istniejący numer do wspólnego kontenera.
- Zmiany [PR #26](https://github.com/slawekbarczuk/barczuk.com.pl/pull/26), commit `609b8f03ac7833e6620054fdfa8da804c8683fcb`. Testy P04/R17, Azure Preview — sukces. Wdrożenie produkcyjne Azure [45019353669](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/45019353669) — sukces. Weryfikacja wizualna pozostaje do potwierdzenia.
- Konfiguracja zgód/GA4, oferta, obrazy i portal pozostają bez zmian.


## 22.11.2026 — DE: powrót do czterech kadrów Łodzi — WDROŻONE W AZURE

- Na decyzję użytkownika cofnięto tylko zmianę fotografii niemieckiej strony głównej z 21.11 (Frankfurt/Berlin/Monachium), przywracając dokładnie cztery kadry Łodzi R16 jak w PL/EN: Fabryczna, Manufaktura, Piotrkowska, EC1. Wersja UA (Kijów, Odessa, Lwów) pozostaje **bez zmian**.
- Zmieniono `de/index.html`, generator `scripts/build-i18n-r16.cjs` i test `tests/i18n-r16.test.cjs`. Pozostałe treści R17/R18, P04, GA4 i portal bez zmian. Zachowano animację 8 s / 1,6 s.
- [PR #24](https://github.com/slawekbarczuk/barczuk.com.pl/pull/24) scalony do `main` jako `c1af6b5bd41e52ab9765c170afdb03ff35c6e840`. [Testy R17](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/45003250811), [P04](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/45003250795), [Azure Preview](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/45003250774) i [Azure produkcja](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/45003332975) — sukces.
- Pozostaje niezależna kontrola widoku na komputerze i iPhonie oraz publicznego odczytu HTTP. Nie utożsamiać pomyślnego wdrożenia CI z pełną weryfikacją wizualną. Starsza decyzja D-020 jest zastąpiona przez D-021.



## 21.11.2026 — DE: Frankfurt/Berlin/Monachium — WDROŻONE W AZURE

- Do niemieckiej strony glownej przygotowano trzy wizualizacje architektury miast w chlodnej kolorystyce Lodzi. WebP 1280x720 (ok. 69-71 kB) zapisane lokalnie w `assets/photos-de-r18/`. Slajdy i generator jezykowy DE zaktualizowano. Bez zmian PL/EN/UA, innych podstron, P04, GA4 i portalu.
- Pliki obrazu to wizualizacje kreatywne, nie dokumentacja fotograficzna. [PR #23](https://github.com/slawekbarczuk/barczuk.com.pl/pull/23), commit produkcyjny `66ddb844a503c609665db033a2bfef96ec270e05`. [R17 testy](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44944958272), [P04](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44944958242), [Azure Preview](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44944958230), [Azure produkcja](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44945076572) — sukces. Zweryfikowano na `main` trzy slajdy DE, brak zmian PL/EN/UA, GA4 i wyłączone Clarity. Pozostaje niezależny test wizualny desktop/iPhone w rzeczywistej przeglądarce.


## 21.11.2026 — stopka BARCZUK jako marka — WDROZONA W AZURE

- Ujednolicono pod logo BARCZUK stopke we wszystkich 22 publicznych plikach: PL `Niezależne doradztwo finansowe`, EN `Independent financial advisory`, DE `Unabhängige Finanzberatung`, UA `Незалежне фінансове консультування`. Usunieto marketingowy podpis wlasciciela i stary opis finansowania tylko z czesci pod logo. Dolna linia `© 2026 Sławomir Barczuk` i informacje prawne pozostaja bez zmian.
- [PR #22](https://github.com/slawekbarczuk/barczuk.com.pl/pull/22) scalony w commit `d34f078751a1a507f9d8bcf9ebeddb399de5f9b8`. [R17 testy](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44936705072), [P04](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44936705128), [Azure Preview](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44936705089), [Azure produkcja](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44936827523) — sukces.
- Potwierdzono stan repozytorium na `main` (haslo stopki, copyright, GA4, wylaczony Clarity). Test w rzeczywistej przegladarce do potwierdzenia przez uzytkownika; dane z historycznego cache wyszukiwarki nie sa miarodajne.




## 21.11.2026 — korekta zwrotu o doswiadczeniu — WDROZONA

- Zatwierdzony tekst etykiety: **„Doświadczenie w bankowości korporacyjnej od 1995 roku”**. Ujednolicono akapit podsumowujacy podstawe kompetencji oraz tlumaczenia PL/EN/DE/UA. Bez zmian designu, portalu, P04 i analityki. [PR #21](https://github.com/slawekbarczuk/barczuk.com.pl/pull/21), commit `336b7e18b3a017d885f7962b6288fac652a046e1` — [testy Node/GA4](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44935793920) i [P04](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44935793922) sukces, [Azure Preview](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44935793917) sukces, [Azure produkcja](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44935948390) sukces.

## 21.11.2026 — R18: BARCZUK jako marka doradcza — WDROŻONE W AZURE, QA WIZUALNA DO POTWIERDZENIA

- Zatwierdzona korekta: bez eksponowania właściciela w marketingu, bez fikcyjnej deklaracji liczebności zespołu. Cztery filary: finansowanie przedsiębiorstw, inwestycje i rozwój, kapitał i decyzje strategiczne, ciągłość finansowania. Sukcesja pozostaje finansowym aspektem zmian właścicielskich, a praktyka bankowa od 1995 r. podstawą podejścia BARCZUK, nie biografią całego zespołu.
- Wdrożono korektę strony głównej i podstrony finansowania w PL/EN/DE/UA oraz opisy SEO i trwałe słowniki generatorów. Zachowano dedykowaną ukraińską stronę z tematyką bankową KYC/AML i fotografie. Bez zmian danych prawnych, P04/API, portalu R08 i analityki R17. Nazwisko przedsiębiorcy pozostaje w wymaganych dokumentach i klauzulach.
- Kod: [PR #20](https://github.com/slawekbarczuk/barczuk.com.pl/pull/20), commit scalający `4b2bccea2a327d00bf061c83ced55fb997992254`.
- Testy: [R17 i pełna regresja Node 44935130729](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44935130729) — sukces, [P04 44935130785](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44935130785) — sukces, [Azure Preview 44935130719](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44935130719) — sukces, [Azure produkcja 44935256509](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44935256509) — sukces.
- Pozostaje test wyglądu i zawijania tekstów w rzeczywistej przeglądarce (desktop/Safari/iPhone) oraz weryfikacja publicznego HTTP. Nie utożsamiać sukcesu Azure z niezależnym testem wizualnym. Stopka zachowuje historyczną etykietę R16 — bez zmiany w tym wydaniu.

## 21.11.2026 — baner cookies R17 — WDROŻONY W AZURE, TEST WIZUALNY DO POTWIERDZENIA

- Zatwierdzono i opublikowano prosty, pełnoszerokościowy baner zgody, wzorowany układem na dyskretnych witrynach doradczych: trzy przyciski (ustawienia cookies / odrzuć opcjonalne / akceptuję), bez checkboxów na pierwszej warstwie. Osobny panel ustawień GA4, cztery języki PL/UA/EN/DE oraz responsywny wygląd czerni, bieli i żółtego akcentu.
- Zmiana kodu: [PR #19](https://github.com/slawekbarczuk/barczuk.com.pl/pull/19), scalony jako `dd83af700ff9e7bccfd482b8d79b2e43a5d37232`. [Testy analityki](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44933155243) i [P04](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44933155186) — sukces. [Azure Preview](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44933155214) — sukces. [Wdrożenie Azure produkcja](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44933278571) — sukces.
- Odświeżono wersje URL assetów na 22 publicznych stronach i w generatorach (klucz `r17-bar-v2`), żeby ograniczyć ryzyko wyświetlania starego banera z cache. Bez zmian w treści oferty, P04, API i prywatnym portalu. Microsoft Clarity pozostaje wyłączony, GA4 korzysta z dotychczasowego mechanizmu zgody.
- **Do dalszej weryfikacji:** wygląd i działanie nowego banera w rzeczywistej przeglądarce (desktop/Safari/iPhone) oraz odbiór zdarzeń GA4 w panelu usługi. Zielony workflow potwierdza publikację Azure, ale nie zastępuje testu wizualnego użytkownika. Stopka zachowuje dotychczasowy numer wersji strony.

## 20.11.2026 — R16: wolniejsze przejścia, portal i mobilny znak — KOD SCALONY

- Na podstawie zrzutu z iPhone'a poprawiono zawijający się złoty kwadrat BARCZUK na podstronach prawnych. CSS `assets/language-switcher-r16.css` utrzymuje logo w jednej linii i zmniejsza odstępy na bardzo wąskich ekranach (bez ruszania treści disclaimera).
- [PR #17](https://github.com/slawekbarczuk/barczuk.com.pl/pull/17), commit `29ee72a105610a14d9bf676772cd739215f6b06a`: płynniejsze przejścia języków ok. 560 ms i obsługa przejść z witryny do `portal.barczuk.com.pl` oraz z powrotem (fade-out 260 ms, fade-in 450 ms). Wspólny mechanizm z R08, preferencja reduced-motion, bez przechwytywania Microsoft Entra.
- Odświeżono URL cache CSS/JS na 21 stronach i w generatorze, zachowano SEO UA, dokumenty, fotografie i formularz P04. Tymczasowe ciasteczko pierwszej strony ważne maks. 8 sekund zawiera tylko techniczną trasę docelową i czas, bez danych użytkownika.
- Kontrola PR: [P04/Node #44735927065](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44735927065) — sukces, [Azure preview #44735927248](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44735927248) — zadanie Build And Deploy zakończone sukcesem. Produkcyjny odczyt HTTP i wynik na urządzeniu użytkownika jeszcze niezweryfikowane.
- Portal R08: analogiczny kod w osobnym prywatnym repo `main` (PR #3), paczka do ręcznego wdrożenia przetestowana; nie mylić poprzedniego wdrożenia R08 z tą nową korektą.


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

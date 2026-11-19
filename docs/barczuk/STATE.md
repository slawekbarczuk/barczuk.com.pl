# Stan projektu BARCZUK — 2026-11-19

Statusy: **POTWIERDZONE** = dowód w GitHub/Azure lub test użytkownika; **PLAN** = zatwierdzony kierunek, bez implementacji; **DO WERYFIKACJI** = brak wystarczającego dowodu.

## 1. Publiczna witryna — POTWIERDZONE

- Domena: https://barczuk.com.pl/ (kanoniczna wersja z www ustawiana przez repozytorium; nie zmieniać DNS bez sprawdzenia).
- Wydanie interfejsu: `SB-WEB-1126-R16` (R16). Źródło: repozytorium `slawekbarczuk/barczuk.com.pl`, gałąź `main`.
- Statyczne podstrony: główna, finansowanie przedsiębiorstw, informacje prawne, prywatność i cookies w PL, EN, DE, UA (20 stron).
- Adresy językowe: `/`, `/en/`, `/de/`, `/ua/`; w HTML /ua/ używa poprawnego `lang="uk"` i `hreflang="uk"`. Polska jest domyślna.
- Jednolite menu: Finansowanie / Etapy / Rezultaty / Strefa klienta / Porozmawiajmy; odpowiedniki EN/DE/UA, pozycja prowadząca do portalu i działająca nawigacja mobilna. Zmniejszono odstęp między menu i językami.
- Projekt graficzny: granatowo-kremowa elegancka estetyka, szeryfowe nagłówki, mały złoty znak; po prawej cztery wizualizacje Łodzi (Fabryczna, Manufaktura, Piotrkowska, EC1), zmiana co 8 s i przenikanie 1,6 s. Na komputerze zdjęcie wypełnia prawą część hero, miękkie przejście jedynie od lewej.
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

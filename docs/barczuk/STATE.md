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

## 3. Główna luka w trwałości projektu — DO UZUPEŁNIENIA

- Kod R08 jest utrzymywany jako osobny pakiet wdrożeniowy ZIP / źródła w Cloud Shell, **nie został jeszcze potwierdzony jako zapisany w dedykowanym repozytorium**. To krytyczne dla odtwarzalności, zmian, przeglądów i współpracy między wątkami.
- Należy utworzyć **osobne prywatne repozytorium Strefy klienta**, dodać wersjonowane źródła R08, instrukcję budowania, wzorce konfiguracji bez sekretów, testy i proces wdrożenia. Nie kopiować tego kodu do niniejszego publicznego repozytorium.
- Nie ma potwierdzenia, że ekran po zalogowaniu jest już właściwym Panelem doradcy lub że wdrożono teczki, bezpieczny obieg dokumentów, analizę finansową, zapisy umów i powiadomienia.

## 4. Formularz kontaktowy P04 — DO WERYFIKACJI PRZED ZMIANĄ

- W publicznym repo istnieją kod, dokumenty i testy P04 z Microsoft Graph, Turnstile i ograniczaniem zgłoszeń. Status aktualnego przełącznika produkcyjnego formularza oraz realizacja procesu retencji wymagają osobnego sprawdzenia przed jakimikolwiek deklaracjami o jego aktywności.
- Nie zmieniać obecnych uprawnień pocztowych, zasad przetwarzania ani mechanizmów antyspamowych przy okazji prac nad portalem.

## 5. Następne zadanie

Jutro / w kolejnej sesji: zacząć od odczytania tego pliku oraz ROADMAP.md, zabezpieczyć źródła R08 w prywatnym repozytorium i dopiero potem zaplanować pierwszy pionowy moduł Panelu doradcy i teczek przedsiębiorstw. Nie implementować bez kontroli dostępu i prawidłowego informowania o przetwarzaniu danych.

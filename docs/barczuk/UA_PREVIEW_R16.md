# R16 UA — projekt panoram Ukrainy i wsparcia bankowego

Data: 20.11.2026. Status: **WDROŻONE I ZWERYFIKOWANE**. Dokument zachowuje historię projektu przed wydaniem oraz końcowe dowody publikacji.

## Baza i cel

- Odtworzono aktualne `main`: `e4f51d0781c53fb28a2e50602c77abd33a38f181`.
- Bazowa publikacja produkcji: https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44709603253 — success. Ten dowód dotyczy bazy R16, nie niniejszego projektu.
- Pierwszy projekt zapisano lokalnie na gałęzi `preview/r16-ua-ukraine-hero-aml`, commit `755537c`, przed publikacją. Finalne wydanie przygotowywane na `feature/r16-ua-ukraine-hero-aml`.
- Zlecenie: dopasować Kijów, Odessę i Lwów do istniejącego hero, zachować przenikanie i pokazać bardziej ukierunkowaną na przedsiębiorców z Ukrainy treść, w tym KYC/AML, przed publikacją.

## Zakres

Zmienia się wyłącznie strona główna `/ua/`: trzy wizualizacje Ukrainy 1440 × 810 WebP, komunikat do firm z Ukrainy i z ukraińskim kapitałem, lokalny kontekst finansowania w Polsce, blok rachunków i wymagań bankowych, dwa rozwijane wyjaśnienia, dopracowanie kontaktu.

PL, EN, DE i cztery pozostałe podstrony UA zachowują dotychczasową treść. Wspólne style R16, kod pokazu slajdów, P04/API, konfiguracja hostingu, portal i mechanizmy bezpieczeństwa bez zmian. Pokaz wykorzystuje istniejący zegar 8 s, przenikanie 1,6 s i ograniczenia ruchu/oszczędzania danych.

Nie deklaruje się gwarancji otwarcia/utrzymania rachunku, decyzji bankowej, biura w Ukrainie, obsługi w określonym języku ani gotowości przyjmowania dokumentów w portalu.

## Trwałe źródło

- `i18n/ua-home-r16.json` — teksty i lista slajdów UA-home.
- `scripts/localize-ua-home-r16.cjs` — kontrolowane dodanie treści po tłumaczeniu; zmiana kotwicy źródła powoduje czytelny błąd zamiast cichego pominięcia.
- `scripts/build-ua-r16.cjs` — wywołuje lokalizację wyłącznie dla `p.id === "home"`.
- `assets/ua-home-r16.css` — styl wczytywany wyłącznie w `/ua/`; zachowuje układ i maskę R16, dostosowuje kadrowanie, formatuje sekcję bankową.
- `ua/index.html` — wynik generowania. Nie edytować ręcznie.
- `tests/ua-home-r16.test.cjs` i uzupełnienie testów pokazu — trwałość, brak zmian pozostałych stron, trzy obrazy i pętla.

## Zatwierdzona treść

Polski odpowiednik otwarcia: „Finansowanie, gwarancje bankowe oraz wsparcie we współpracy z bankami w Polsce — dla firm z Ukrainy i przedsiębiorstw z ukraińskim kapitałem”.

Blok bankowy: „Rachunki, rozliczenia i wymagania banków”. Wsparcie dotyczy opisu działalności i płatności, struktury własności i beneficjentów rzeczywistych, pochodzenia środków, kompletności dokumentów oraz odpowiedzi na pytania banku. Krótkie wyjaśnienie pokazuje, dlaczego bank może potrzebować dokumentów z kilku krajów. Decyzje należą do banku.

Pełny polski odpowiednik nowych tekstów: `Tresc_PL_do_oceny.html` w lokalnym pakiecie projektu. Użytkownik zaakceptował treści 20.11.2026 i zlecił wdrożenie, z dodatkowym dopasowaniem kolorystyki obrazów.

Podstawa informacyjna: https://www.gov.pl/web/finanse/komunikat-nr-73-w-sprawie-wykluczania-niektorych-kategorii-klientow-z-nawiazywania-stosunkow-gospodarczych-derisking-oraz-skarg-wnoszonych-do-generalnego-inspektora-informacji-finansowej-przez-klientow-instytucji-obowiazanych oraz komunikat GIIF nr 45. Wymagania są opisywane jako ocena konkretnej relacji, bez automatycznego przypisywania ryzyka narodowości.

## Weryfikacja lokalna

- Wszystkie 61 testów przechodzi (`node --test tests/*.test.cjs`).
- Pełny generator wykonany dwukrotnie na odizolowanej kopii: wynik stabilny, jeden blok bankowy, jedna lista slajdów, brak zmian pozostałych stron (z pominięciem technicznych różnic LF/CRLF).
- Widok komputera i 390 × 844 px: brak poziomego przepełnienia, wszystkie trzy obrazy wczytują się, wyjaśnienie KYC/AML rozwija się natywnym elementem `details`.
- Zachowane zrzuty komputera, telefonu i pełnej strony. Samodzielny podgląd HTML ma osadzone grafiki/style i nie wysyła formularza.

## Publikacja

Polecenie publikacji zostało udzielone 20.11.2026. Potwierdzono bazę `main` = `e4f51d0`, finalnie dopasowano obrazy do `fabryczna.webp` i `piotrkowska.webp`, zachowując miękkie światło. Eksport trzech grafik: 1440 × 810 WebP, łącznie około 550 KB. Wszystkie 61 testów przechodzi.

- Kod: [PR #11](https://github.com/slawekbarczuk/barczuk.com.pl/pull/11), commit `79176f13266a3654a2f96f2bfbde6a4e5ac6205f`.
- [Testy CI 44722798603](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44722798603) — success; próba publikacji 44722798878 — success.
- [Produkcja 44723055515](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44723055515) — success.
- Kontrola https://www.barczuk.com.pl/ua/: właściwe nowe teksty, trzy slajdy i dokładna zgodność SHA-256 plików WebP. Pozostałe 19 podstron identyczne bajtowo ze stanem sprzed publikacji.
- Przeglądarka: komputer i 390 × 844 px, wszystkie obrazy wczytane, przejście 1,6 s, działające rozwijane wyjaśnienie KYC/AML, brak poziomego przepełnienia. Zachowane zrzuty produkcyjne.

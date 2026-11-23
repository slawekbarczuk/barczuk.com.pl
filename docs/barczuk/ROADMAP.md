# Plan rozwoju BARCZUK — stan na 2026-11-22

## 23.11.2026 — R19 wydanie i odbiór
- [x] PR #29 scalony, testy P04 i R17 przeszły; Azure Preview i produkcyjny run #45141056320 zakończone sukcesem.
- [x] Dwie nowe polskie podstrony oraz sitemap 23 adresy znalazły się w wydaniu.
- [ ] Zweryfikować z produkcji publiczne HTTP 200 dla nowych stron oraz 301/404 dla dawnych URL i kontrolę mobilną.
- [ ] Sprawdzić sitemapę po wydaniu i zgłosić nowe strony do indeksowania w Google Search Console.
- [ ] Ocenić zmiany wyświetleń i zapytań B2B po 2–4 tygodniach bez twierdzeń o gwarantowanych pozycjach.


## 23.11.2026 — SEO R19 i historyczne URL
- [x] Odczyt danych Google Search Console oraz historii indeksacji; potwierdzone zgłoszenie nowej mapy (21 URL).
- [x] Przygotowano dwa polskie landing pages B2B oraz kontekstowe linki, aktualizację sitemapy do 23 URL i testy regresji na gałęzi SEO R19.
- [ ] Testy Node i Azure Preview na PR, kontrola generacji dwukrotnej, układu na telefonie i polityki zgody; poprawić ewentualne uwagi.
- [ ] Scalić i wdrożyć produkcyjnie dopiero po pozytywnych testach, następnie potwierdzić HTTP 200 i sitemapę 23 URL.
- [ ] Zweryfikować HTTP 301 dla starego finansowania i 404/410 dla starych usług prawnych/IT/zarządzania, bez przekierowania niepowiązanych stron na ofertę kredytową.
- [ ] Zgłosić nowe adresy do Search Console i monitorować indeksację oraz zapytania B2B po 2–4 tygodniach.
- [ ] Sprawdzić historyczne wizytówki i katalogi kojarzące domenę z zamkniętym biurem rachunkowym; korekty tylko po weryfikacji praw do profili.


## 22.11.2026 — realizacja powtórnego audytu

- [x] Jeden ręczny pomiar odsłony, cztery wartości obszaru doradztwa oraz odrębne zdarzenie przyjęcia przez P04. Starsze domenowe cookies GA są wygaszane przy wizycie na publicznej witrynie.
- [x] Sekcja kapitału i decyzji strategicznych w czterech językach, polski tytuł finansowania i bezpośrednie przejście do przeglądu usług. UA zachowuje odnośnik do odrębnej oferty dla firm z ukraińskim kapitałem.
- [x] Korekta wąskiego układu DE i kontrola pierwszej oraz drugiej odbudowy wszystkich 22 publicznych dokumentów HTML i mapy.
- [x] Odbiór produkcyjny Azure, GA4 od strony sieciowej, treści, widoku 320 px w Chromium i doręczenia P04.
- [ ] Odrębne potwierdzenie prywatnego raportu GA4 i fizycznego iPhone’a.

## 22.11.2026 — wyrównanie elementów stopki

- [x] Przeniesiono `Ustawienia cookies` przed numer wersji i wyrównano oba w jednym kontenerze, także na telefonie.
- [x] Wykonano testy regresyjne i Azure Preview ([PR #26](https://github.com/slawekbarczuk/barczuk.com.pl/pull/26)).
- [ ] Publikacja Azure [45019353669](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/45019353669) — sukces; nadal niezależna kontrola desktop/Safari/iPhone, bez zmian analityki GA4.



## 22.11.2026 — DE powrót do Łodzi (PL/EN/DE)

- [x] Przywrócono cztery kadry Łodzi w niemieckiej stronie głównej i usunięto nadpisywanie w generatorze językowym.
- [x] Zachowano osobne fotografie Ukrainy; test regresji porównuje kolejność slajdów PL, EN, DE i UA.
- [x] Scalono [PR #24](https://github.com/slawekbarczuk/barczuk.com.pl/pull/24); testy regresyjne, Azure Preview i wdrożenie produkcyjne [45003332975](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/45003332975) zakończyły się pomyślnie.
- [ ] Kontrola wizualna na desktopie i iPhonie/Safari oraz niezależne potwierdzenie strony w publicznym HTTP; nie zmieniać UA.



## R18 — niezależna marka doradcza i nowa narracja usług

- [x] Ustalono hasło i cztery filary usług z głosem marki w liczbie mnogiej.
- [x] Przygotowano redakcję PL/UA/EN/DE, aktualizację opisów SEO oraz słowniki generatorów.
- [x] CI i odtwarzalny generator potwierdzone; Azure Preview i produkcja zakończone sukcesem (PR #20, commit `4b2bccea`).
- [ ] Zweryfikować rzeczywisty wygląd treści i zawijanie nagłówków na telefonie oraz komputerze; P04 i portal pozostają niezmienione.


## R17 — minimalistyczny baner zgody GA4

- [x] Zatwierdzono pełnoszerokościowy trzyprzyciskowy układ PL/UA/EN/DE z osobnymi ustawieniami oraz kolorami BARCZUK.
- [x] Przygotowano i scalono kod/wersjonowanie assetów w [PR #19](https://github.com/slawekbarczuk/barczuk.com.pl/pull/19).
- [x] Testy analityki i P04 oraz Azure Preview — sukces. Produkcyjny Azure [44933278571](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44933278571) — sukces.
- [ ] Potwierdzić w rzeczywistej przeglądarce układ desktopowy i mobilny (w tym Safari/iPhone) i test zgody, odmowy, cofnięcia.
- [ ] Potwierdzić odbiór zdarzeń w Google Analytics 4 (Realtime). Clarity zostaje wyłączony.

## 20.11.2026 — dopracowanie nawigacji R16/R08

- [x] R16: zwolniono animację języków i dodano płynne przejście przez domeny głównej witryny i portalu, commit `29ee72a`, PR #17.
- [x] Poprawiono mobilne logo na podstronach prawnych; przyklejony do napisu złoty kwadrat i węższe odstępy. 21 stron odświeżonych wraz z generatorem.
- [x] W prywatnym R08 gotowy jest identyczny skrypt, PR #3, z przetestowaną paczką do manualnego deploy.
- [ ] Potwierdzić produkcyjną publikację R16, przejścia i układ na iPhonie.
- [ ] Uruchomić nowe wdrożenie R08 ręcznie w istniejącym Azure Static Web Apps; następnie sprawdzić języki, przejścia oraz sesję Entra i API.


## Wizualna spójność R16 i R08 — 20.11.2026

- [x] Scalone R16: płynne przełączanie języków i wspólna wysokość/ramka fotografii; [PR #16](https://github.com/slawekbarczuk/barczuk.com.pl/pull/16).
- [x] Scalone R08 w prywatnym repo (PR #1) i przygotowany ręczny artefakt wdrożeniowy (PR #2).
- [ ] Zweryfikować produkcyjną publikację R16 i zachowanie animacji PL/UA/EN/DE.
- [ ] Ręcznie wdrożyć R08 z aktualnej paczki w Azure Cloud Shell i sprawdzić wymiary oraz logowanie.


## Bezpłatna widoczność Google/Bing — nowy priorytet (20.11.2026)

- [x] Dedykowana podstrona B2B dla ukraińskich przedsiębiorców i kanoniczny adres; kod scalony do main przez [PR #15](https://github.com/slawekbarczuk/barczuk.com.pl/pull/15).
- [x] Link wewnętrzny z UA, metadane i wpis do sitemapy (21 URL), generator i 65 pomyślnych testów.
- [ ] Potwierdzić udane wdrożenie produkcyjne i dostępność nowej strony (HTTP 200), także na telefonie.
- [ ] Sprawdzić dane indeksacji w istniejących kontach Google Search Console i Bing Webmaster Tools; ponowić zgłoszenie sitemapy, jeśli potrzebne.
- [ ] Po potwierdzonej publikacji zgłosić nowy adres, monitorować zapytania ukraińskie, organiczne wyświetlenia i kliknięcia.
- [ ] Rozważyć bezpłatne IndexNow zgodnie z zasadami bezpieczeństwa, bez udostępniania sekretów i bez kosztów reklamy.


Punkt startowy: R16 witryny publicznej i R08 Strefy klienta, zalogowanie Microsoft Entra oraz diagnostyka API HTTP 200 potwierdzone. **Właściwe moduły Panelu doradcy nie zostały jeszcze wdrożone.**

## Etap 0 — zamknięty: fundament techniczny

- [x] Strona R16 w PL/EN/DE/UA, wspólny nagłówek, SEO i kontakt do portalu.
- [x] Osobna aplikacja portalu R08 na subdomenie, cztery języki, zgodność wizualna.
- [x] Podłączenie domeny portal, Microsoft Entra i CORS.
- [x] Test sesji i diagnostycznego API HTTP 200.
- [x] Oddzielne prywatne repozytorium z odtwarzalnym źródłem R08 — zweryfikowane 19.11.2026.
- [ ] Procedura wydań/rollback i test bezpieczeństwa uprawnień przed modułami danych klientów.

## Etap 1 — Panel doradcy i rejestr przedsiębiorstw (następny)

### Witryna UA — zaakceptowane wydanie

- [x] Przygotowana korekta wysokości hero, mocniej stonowane wyświetlanie obrazów i poprawne linki do portalu UA; 61 testów, lokalne widoki 1920/1280/390 px i przejście do portalu sprawdzone.
- [x] Publikacja i kontrola produkcji korekty: [PR #12](https://github.com/slawekbarczuk/barczuk.com.pl/pull/12), [44726319405](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44726319405) — success. Wysokość hero i kolorystyka sprawdzone na komputerze/telefonie, kliknięcie otwiera ukraiński portal, 15 stron PL/EN/DE bez zmian.

- [x] Projekt hero Kijów / Odessa / Lwów, treści bankowej i trwałej generacji UA-home; lokalne testy i widoki komputera/telefonu.
- [x] Ocena i akceptacja treści przez użytkownika oraz wyraźne polecenie wdrożenia 20.11.2026.
- [x] Finalne, umiarkowane dopasowanie kolorystyki trzech panoram do rzeczywistych zdjęć Łodzi; eksport 1440 × 810 WebP.
- [x] Publikacja i kontrola produkcji 20.11.2026: [44723055515](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44723055515) — success; pozostałe 19 stron bez zmian, trzy obrazy zgodne z wydaniem, komputer/telefon i rozwijane wyjaśnienie sprawdzone. Szczegóły: [UA_PREVIEW_R16.md](UA_PREVIEW_R16.md).

- [ ] Ustalić schemat kont użytkowników i minimalne uprawnienia doradca/administrator/klient oraz granice dostępu.
- [ ] Bezpieczny rejestr przedsiębiorstw B2B z identyfikatorem wewnętrznym i statusem relacji, bez fikcyjnych danych produkcyjnych.
- [ ] Indywidualna teczka klienta: podstawowe dane przedsiębiorstwa, sprawy, zadania, terminy, historia zdarzeń.
- [ ] Właściwy panel po zalogowaniu; użytkownik ma widzieć tylko dozwolone zasoby.
- [ ] Testy izolacji danych pomiędzy dwiema niezależnymi firmami i ochrony API, także przy ręcznym wywołaniu endpointu.
- [ ] Zmiany w prawnych informacjach o przetwarzaniu zatwierdzone przed zbieraniem rzeczywistych dokumentów.

**Definicja ukończenia:** system pozwala w środowisku testowym dodać fikcyjne przedsiębiorstwo i sprawę, przejść przez minimalny przepływ z pełnymi kontrolami uprawnień, a następnie opublikować wydanie z dowodem testów.

## Etap 2 — dokumenty i analiza danych

- [ ] Bezpieczne przesyłanie dokumentów finansowych i obsługa metadanych/wersji.
- [ ] Rejestrowanie podstawy i informacji o przetwarzaniu danych przed uploadem.
- [ ] Kontrola rozmiaru/formatu, antywirus, szyfrowanie, minimalne uprawnienia, logi dostępu, bezpieczne usuwanie i retencja.
- [ ] Zestaw analiz B2B: bilans, RZiS, przepływy pieniężne, wskaźniki i warianty finansowania; testy na danych syntetycznych.
- [ ] Wymienialna warstwa AI oraz obowiązkowa walidacja jakości i kontrola człowieka.

## Etap 3 — prowadzenie finansowania

- [ ] Rejestr zapytań i ofert instytucji finansowych, warunków, zabezpieczeń oraz gwarancji bankowych.
- [ ] Wersjonowana baza polityk kredytowych i wymagań, data wejścia w życie, źródło i kontrola aktualności.
- [ ] Generowanie porównań i list braków, workflow doradcy i ślad zatwierdzeń.
- [ ] Archiwum zawartych umów w teczkach klientów.

## Etap 4 — monitoring aktywnych umów

- [ ] Terminy spłat i transz, kowenanty, raportowanie, zabezpieczenia, gwarancje, aneksy i przypomnienia.
- [ ] Aktualizacje wskaźników referencyjnych (w tym zmiany związane z POLSTR po potwierdzeniu obowiązujących zasad) i scenariusze.
- [ ] Historia zmian warunków, powiadomienia, raporty dla klienta i kontrola odpowiedzialności.

## Poza zakresem na dziś

Nie deklarować gotowości bankowego silnika decyzji, autonomicznych rekomendacji kredytowych, obsługi osób fizycznych ani pełnej obsługi dokumentacji klienta. Wersja R08 jest potwierdzonym fundamentem logowania i łączności, nie gotowym systemem operacyjnym.

## Wznowienie

Pierwsza czynność w kolejnej sesji: odczytać STATE.md, ten ROADMAP i źródła prywatnego repozytorium barczuk-strefa-klienta; następnie zaprojektować kontrolę dostępu i pierwszy moduł Panelu doradcy, bez nadpisywania R16/R08.

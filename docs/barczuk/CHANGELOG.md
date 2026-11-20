# Dziennik kamieni milowych BARCZUK

## 2026-11-20 — weryfikacja rozszerzenia SEO UA — SCALONE, PRODUKCJA DO SPRAWDZENIA

- [PR #15](https://github.com/slawekbarczuk/barczuk.com.pl/pull/15), commit `f737f5fd8b8322481c8b1d37caa672a5ba19a3d4` — dalsze utrwalenie dedykowanej podstrony, linku UA i testów indeksowalności.
- [Testy 44731491498](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44731491498): 65/65 poprawnych. [Podgląd Azure 44731491535](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44731491535): błąd content distribution. Potwierdzenie publikacji produkcyjnej i indeksowania osobno.
- Brak zmian w panoramach UA, układzie R16, PL/EN/DE, P04, portalu i bezpieczeństwie. Żadnych płatnych kampanii.


## 2026-11-20 — ukraińska podstrona finansowania i bezpłatne SEO — KOD SCALONY, PUBLIKACJA DO WERYFIKACJI

- Użytkownik zlecił dokończenie witryny UA i poprawę bezpłatnej widoczności w Google i Bing, bez reklam.
- PR [#14](https://github.com/slawekbarczuk/barczuk.com.pl/pull/14) scalony do main, commit `048a74b3e1ef7a49884ad2c98e155ba9137bc7eb`.
- Dodano `/ua/finansuvannia-biznesu-v-polshchi/`, nowy generator `scripts/build-ua-business-r16.cjs`, link na stronie głównej UA, metadane i 21. URL w sitemapie, testy SEO.
- Po dostosowaniu istniejących testów sitemap wynik workflow P04/Node [44731417561](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44731417561): **success**.
- Nie zmieniono fotografii, R16, ofert PL/EN/DE, portalu ani backendu P04. Wyszukiwarki mogą nadal wyświetlać starsze wersje (indeksowanie nie jest natychmiastowe).
- Publikacja Azure po merge, kod HTTP na domenie, wygląd mobilny, stan Google Search Console i Bing Webmaster Tools wymagają odrębnej weryfikacji; zgłoszeń do indeksowania jeszcze nie potwierdzono. Plan: [SEO_UA_ORGANIC_R16.md](SEO_UA_ORGANIC_R16.md).


## 2026-11-20 — korekta hero UA i języka portalu — WDROŻONA

- Powód: dłuższy nagłówek UA zwiększał wysokość hero; adres portalu UA odziedziczył polski `/`, a stary test również utrwalał ten błędny adres.
- Zmieniono wyłącznie prezentację strony głównej UA i link portalu na pięciu stronach UA. Słowa nagłówka zachowano, zmieniono łamanie i rozmiar na desktopie. W pomiarze 1920 px wysokość spadła z 661,4 px do 598,5 px, zgodnie z PL.
- Dalsze stonowanie kolorów to korekta prezentacji w osobnym CSS UA (`grayscale(.38) saturate(.62) brightness(.98)`), bez zmiany plików obrazów ani ich kompozycji. Zmieniono adres wersji CSS, aby przeglądarki pobrały poprawkę.
- Generator centralnie ustala adres portalu według języka; pięć stron UA kieruje do `https://portal.barczuk.com.pl/ua/`. Poprawiono oczekiwanie w teście nawigacji. Sprawdzono rzeczywiste lokalne kliknięcie: portal otwiera się po ukraińsku.
- 61 testów lokalnych przechodzi, pełna regeneracja stabilna. Widoki 1920/1280/390 px bez poziomego przepełnienia. PL/EN/DE, treść AML, wspólne style/slideshow, P04/API i prywatny portal bez zmian.
- Kod: [PR #12](https://github.com/slawekbarczuk/barczuk.com.pl/pull/12), commit `8e8d6ac0970ed1b725a0c894c87bbe36cebd2a70`. [Testy CI 44725933380](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44725933380) i [publikacja produkcyjna 44726319405](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44726319405) — success.
- Kontrola produkcji: 15 stron PL/EN/DE identycznych ze stanem sprzed korekty; cztery pozostałe strony UA różnią się wyłącznie adresem portalu; trzy obrazy zachowały SHA-256. Na produkcji potwierdzono hero 598,5 px przy szerokości 1920 px, widok telefonu 390 × 844 bez poziomego przepełnienia oraz kliknięcie otwierające ukraiński ekran portalu. Status: wdrożone i zweryfikowane.

## 2026-11-20 — R16 UA: finalna kolorystyka i wsparcie bankowe — WDROŻONE

- Użytkownik zaakceptował treść projektu i wyraźnie zlecił wdrożenie. Zastrzeżenie dotyczyło dalszego umiarkowanego zbliżenia kolorów do rzeczywistych fotografii Łodzi.
- Finalnie dopasowano Kijów, Odessę i Lwów: chłodniejsze neutralne odcienie, spokojniejsza zieleń i refleksy, z zachowaniem delikatnego ciepła. Pliki 1440 × 810 WebP, około 550 KB łącznie.
- 61 testów przechodzi; pełne generowanie jest stabilne. PL/EN/DE, pozostałe podstrony UA, wspólne style/slideshow, P04/API i hosting bez zmian.
- Kod scalono w [PR #11](https://github.com/slawekbarczuk/barczuk.com.pl/pull/11), commit `79176f13266a3654a2f96f2bfbde6a4e5ac6205f`. [Testy CI 44722798603](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44722798603) oraz próbne wdrożenie 44722798878 — success.
- **Publikacja produkcyjna:** [44723055515](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44723055515) — success. Strona https://www.barczuk.com.pl/ua/ zweryfikowana po publikacji.
- Kontrola HTTP/SHA-256: pozostałe 19 podstron HTML identyczne ze stanem sprzed wdrożenia; trzy obrazy produkcyjne identyczne z finalnymi plikami. Sprawdzono widok komputera i telefonu 390 × 844, brak poziomego przepełnienia, kompletność obrazów oraz rozwijanie wyjaśnienia KYC/AML.
- Stan: wdrożone i zweryfikowane. Zaktualizowano STATE.md, DECISIONS.md, ROADMAP.md, RELEASE_R16.md i dokument przebiegu projektu. Nie zmieniono portalu, P04/API, PL/EN/DE ani pozostałych podstron UA.

## 2026-11-20 — lokalny projekt UA: panoramy Ukrainy i wsparcie bankowe — DO OCENY

- Baza: `e4f51d0781c53fb28a2e50602c77abd33a38f181`; lokalna gałąź `preview/r16-ua-ukraine-hero-aml`.
- Przygotowano trzy dopasowane wizualizacje 1440 × 810 WebP (Kijów, Odessa, Lwów), kierunkową treść dla przedsiębiorców z Ukrainy, blok rachunków i wymagań KYC/AML oraz dwa krótkie wyjaśnienia.
- Zmiany UA-home są odtwarzalne z `i18n/ua-home-r16.json` i lokalizatora wywoływanego przez generator. Wspólny pokaz slajdów bez zmian: 8 s / 1,6 s.
- Dowód lokalny: 61 testów przechodzi, dwukrotna pełna regeneracja stabilna, pozostałe strony zachowane, sprawdzony widok komputera i telefonu 390 × 844, zapisane zrzuty i samodzielny HTML projektu.
- Nie zmieniono PL/EN/DE, pozostałych podstron UA, P04/API, wspólnych stylów i skryptu slajdów, portalu oraz hostingu. Źródłowe PNG i prompty zachowano lokalnie.
- **Nie opublikowano, nie wykonano push do GitHub.** Nowy etap pozostaje projektem do oceny treści i wyglądu. Szczegóły: [UA_PREVIEW_R16.md](UA_PREVIEW_R16.md).

## 2026-11-20 — Strefa klienta R08: niższa sekcja powitalna wdrożona

- Cel: dopasować wysokość sekcji ze zdjęciem skarbca do głównej strony i odsłonić **białą przestrzeń poniżej**, zamiast zajmowania całego ekranu.
- Zmiana CSS w prywatnym repo: `min-height:clamp(560px,calc(100svh - 180px),700px)` dla desktopu, `min-height:0` na urządzeniach mobilnych, białe tło strony poza kremową sekcją hero.
- Potwierdzenie: użytkownik wgrał `barczuk-strefa-r08-krotszy-ekran.zip` do Cloud Shell i wykonał `deploy.ps1`; SWA CLI potwierdziło `Project deployed` w środowisku production oraz adresy PL/EN/DE/UA na istniejącym portalu. Kod: https://github.com/slawekbarczuk/barczuk-strefa-klienta/commit/6aa516ad10ef46d25d84383d79c15043305df6c4, CI: https://github.com/slawekbarczuk/barczuk-strefa-klienta/actions/runs/44703632463 — Success.
- Publiczna witryna, uwierzytelnianie Entra, konfiguracja API i fotografia skarbca bez zmian.
- Pozostaje potwierdzić wygląd wysokości sekcji w przeglądarce użytkownika po odświeżeniu.

## 2026-11-20 — nowy priorytet menu i PL / UA / EN / DE (R16)

- Prośba użytkownika: zamienić miejscami „Porozmawiajmy” oraz „Strefa klienta”; obramowanie przenieść na Strefę klienta, a Porozmawiajmy pozostawić zwykłym linkiem. Dodatkowo przenieść UA bezpośrednio za PL.
- **Wdrożone na publicznej witrynie:** menu Finansowanie / Etapy / Rezultaty / Porozmawiajmy / [Strefa klienta, przycisk z ramką]; języki PL / UA / EN / DE. Zmiana dotyczy 20 stron w PL/EN/DE/UA i strony 404.
- Zmieniono pięć kanonicznych podstron PL, 404 i testy; generator `scripts/build-ua-r16.cjs` utrwala kolejność języków, poprawne etykiety i przy regeneracji wszystkich wersji. Zachowano adresy i bieżące oznaczenie języka.
- Testy i generowanie: https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44702351609 — Success. Produkcyjna publikacja Azure: https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44702453417 — Success. Commit wersji: https://github.com/slawekbarczuk/barczuk.com.pl/commit/b2f78c42354a1c767ff3cd17c127ff1f29245091.
- Portal R08 jest osobną aplikacją: w ramach tej zmiany na publicznej stronie nie był jeszcze aktualizowany, ale **później 20.11.2026 został oddzielnie wdrożony** ten sam układ menu oraz PL / UA / EN / DE. Użytkownik przesłał `barczuk-strefa-r08-menu-jezyki-20261120.zip` do Azure Cloud Shell; SWA CLI potwierdziło `Project deployed` w środowisku `production` na dotychczasowej aplikacji. Kod: https://github.com/slawekbarczuk/barczuk-strefa-klienta/commit/3ca3879aa8a3240ea7832bc98161942e252f180a, CI: https://github.com/slawekbarczuk/barczuk-strefa-klienta/actions/runs/44708027637 — sukces. Wizualne sprawdzenie po odświeżeniu pozostaje do potwierdzenia. Nie zmieniono zdjęć, zawartości, formularza P04, bezpieczeństwa logowania i backendu.
- Weryfikacja wizualna nowej wersji w przeglądarce użytkownika: jeszcze do potwierdzenia.

## 2026-11-20 — naprawa mobilnego przełącznika języków na stronach prawnych (R16)

- Problem zgłoszony na iPhonie: na podstronach prawnych przełącznik PL/EN/DE/UA zajmował cały wiersz i układał języki pionowo, zasłaniając treść.
- Przyczyna: stary inline CSS używał ogólnego selektora `nav` w regułach mobilnego menu, przez co obejmował też niezależny `nav.language-switcher`.
- Rozwiązanie: ograniczono osiem selektorów na każdej z 12 podstron (informacje prawne, prywatność, cookie × PL/EN/DE/UA) do `.nav-links`. Zachowano rozwijane menu, dostępność i nawigację językową. Kanoniczne źródła PL zostały poprawione, dlatego następna generacja EN/DE/UA zachowa naprawę.
- Dodano test regresji w `tests/ua-r16.test.cjs`, sprawdzający wszystkie 12 stron. Testy i generator: https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44699634788 — sukces.
- Zmiana kodu: https://github.com/slawekbarczuk/barczuk.com.pl/commit/45b00fcda1b50acd29e6492f324e9df4bcabbccf. Wdrożenie produkcyjne Azure Static Web Apps: https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44699740937 — sukces.
- Bez zmian w tekstach klauzul, fotografiach, kolorystyce, logowaniu Entra, prywatnym portalu R08 i API.
- **Potwierdzone przez użytkownika na iPhonie 20.11.2026:** układ po naprawie jest prawidłowy („jest już idealnie”).

Każdy ważny wpis powinien zawierać: datę, zakres, wersję, status, dowód wdrożenia lub testu, elementy niezmienione i kolejny krok.

## 2026-11-19 — R08, korekta złotego kwadratu logo

- Ujednolicono położenie znaku BARCZUK w portalu (PL/EN/DE/UA) z publiczną witryną: wspólny CSS, wyrównanie kwadratu do linii pisma.
- Zapis kodu: https://github.com/slawekbarczuk/barczuk-strefa-klienta/commit/7c71eccf4ef3eca97ada400bf6711c640a226125; testy CI: https://github.com/slawekbarczuk/barczuk-strefa-klienta/actions/runs/44577961335 — sukces.
- Ręczne wdrożenie użytkownika przez Azure Cloud Shell zakończone komunikatem `Project deployed`. Pozostają do potwierdzenia efekty wizualne na świeżo odświeżonym portalu.
- Bez zmian w publicznej witrynie R16, Entra, CORS, API, zdjęciach i funkcjach biznesowych.

## 2026-11-19 — R16 + R08, fundament gotowy

**Witryna publiczna R16:**
- Dodano do głównego menu link do Strefy klienta na 15 ówczesnych podstronach PL/EN/DE. Potwierdzona publikacja GitHub Actions: https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44540232891.
- Dodano kompletną wersję UA pod `/ua/` (łącznie 20 stron w czterech językach), metadane SEO i przełącznik PL/EN/DE/UA; skorygowano odstęp menu od przełącznika. Automatyczne testy gałęzi przeszły; publikacja na `main` potwierdzona: https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44545813532, commit `7a5403cb442d49543831093395d670fa9324cbbb`.
- Zachowano zdjęcia, treść oferty, design R16 i istniejącą warstwę publicznego API.

**Portal R07, następnie R08:**
- Skonfigurowano subdomenę portal.barczuk.com.pl w Azure DNS i Static Web Apps; przypisanie miało stan `Ready`.
- Dla domeny poprawiono konfigurację adresów przekierowania Microsoft Entra i CORS backendu.
- R07, a potem R08 opublikowano przez Azure Cloud Shell / Static Web Apps CLI na dotychczasowej aplikacji, bez tworzenia kolejnego hostingu.
- R08 ujednoliciła nagłówek z witryną i dodała UA. Użytkownik zweryfikował wygląd, logowanie i komunikat API HTTP 200 na stronie UA 19.11.2026.
- **Prywatne źródła R08 potwierdzone 19.11.2026:** https://github.com/slawekbarczuk/barczuk-strefa-klienta (Private), kompletne źródła, oryginalna grafika, testy CI; https://github.com/slawekbarczuk/barczuk-strefa-klienta/actions/runs/44576101323 — sukces. Repo nie wdraża automatycznie na produkcję.

**Decyzja kolejnego etapu:** repozytorium prywatne gotowe; następne zadanie to kontrola uprawnień, proces wydań i pierwszy pionowy moduł Panelu doradcy oraz teczek klientów.

## 2026-11-18 — strona R16, obrazy i języki PL/EN/DE

- Konsolidacja oferty doradztwa B2B, skorygowane teksty, gwarancje bankowe i doświadczenie od 1995 r.
- Cztery generowane wizualizacje Łodzi, przebudowany hero, przenikanie oraz wersje językowe PL/EN/DE. Szczegóły i starsze założenia: [RELEASE_R16.md](../../RELEASE_R16.md).

## Wzór nowego wpisu

### RRRR-MM-DD — [nazwa kamienia] — [wersja]

- Zmieniono:
- Nie zmieniono:
- Status: wdrożono / test / przygotowano / zablokowano.
- Dowód: commit, workflow, test, screenshot/test użytkownika.
- Otwarte ryzyka:
- Następny krok:
- Zaktualizowano: STATE.md, ROADMAP.md, DECISIONS.md (jeśli dotyczy).

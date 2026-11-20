# Dziennik kamieni milowych BARCZUK

## 2026-11-20 — nowy priorytet menu i PL / UA / EN / DE (R16)

- Prośba użytkownika: zamienić miejscami „Porozmawiajmy” oraz „Strefa klienta”; obramowanie przenieść na Strefę klienta, a Porozmawiajmy pozostawić zwykłym linkiem. Dodatkowo przenieść UA bezpośrednio za PL.
- **Wdrożone na publicznej witrynie:** menu Finansowanie / Etapy / Rezultaty / Porozmawiajmy / [Strefa klienta, przycisk z ramką]; języki PL / UA / EN / DE. Zmiana dotyczy 20 stron w PL/EN/DE/UA i strony 404.
- Zmieniono pięć kanonicznych podstron PL, 404 i testy; generator `scripts/build-ua-r16.cjs` utrwala kolejność języków, poprawne etykiety i przy regeneracji wszystkich wersji. Zachowano adresy i bieżące oznaczenie języka.
- Testy i generowanie: https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44702351609 — Success. Produkcyjna publikacja Azure: https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44702453417 — Success. Commit wersji: https://github.com/slawekbarczuk/barczuk.com.pl/commit/b2f78c42354a1c767ff3cd17c127ff1f29245091.
- Portal R08 jest osobną aplikacją i nie był aktualizowany w ramach tej zmiany. Nie zmieniono zdjęć, zawartości, formularza P04, bezpieczeństwa logowania i backendu.
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

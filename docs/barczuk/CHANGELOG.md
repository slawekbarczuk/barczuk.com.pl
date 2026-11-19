# Dziennik kamieni milowych BARCZUK

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

# SB-WEB-1126-R09 — checklista publikacji (stan: 16.11.2026)

## Wykonane na PR #1 (NIE SCALONE)
- [x] Zmieniono duży napis imienia i nazwiska na „Doradztwo dla biznesu” w sekcji „O mnie”, zachowano żółty kwadrat oraz informacje formalne.
- [x] Polityka prywatności P04 uwzględnia 12 miesięcy retencji zapytań niezrealizowanych, Microsoft 365/Graph, Azure Table Storage, Cloudflare Turnstile.
- [x] Wersja SB-WEB-1126-R09 w stopce każdej z 8 podstron; sitemap z lastmod 2026-11-16.
- [x] Backend P04 przetestowany end-to-end w środowisku PR; wiadomość odebrana 16.11.2026, 10:15 CET.
- [x] Weryfikacja serwerowa Turnstile, Exchange Application RBAC ograniczone do kontakt@barczuk.com.pl, liczniki Azure Table.
- [x] Dodano testy statyczne R09 do CI.

## Niewykonane — blokery przed połączeniem gałęzi z main
- [ ] Sprawdzić po zapisie nazwy i flagi PRODUKCYJNYCH appsettings Azure Static Web Apps (environment=default), nie wyświetlając sekretów; konfiguracja została zapisana z Cloud Shell 16.11.2026 z CONTACT_FORM_ENABLED=false.
- [x] Przekopiować do produkcji TYLKO właściwe ustawienia bez sekretów na ekranie i z formularzem wyłączonym: MAIL_*, TURNSTILE_*, RATE_LIMIT_TABLE_CONNECTION_STRING, CONTACT_ALLOWED_ORIGINS, CONTACT_ALLOWED_HOSTNAMES, CONTACT_TEST_ONLY=false.
- [ ] Wdrożyć proces retencji: rozdzielenie zapytań P04 od innej poczty współdzielonej, sposób odnotowania zamknięcia, comiesięczny przegląd, zasady usuwania powiązanych wiadomości (procedura w PROCEDURA_RETENCJI_P04.md). KONTROLA 16.11.2026: Default MRM Policy; LitigationHold, RetentionHold, DelayHold i DelayReleaseHold=false, InPlaceHolds w skrzynce i organizacji=0. Nadal sprawdzić etykiety i reguły Purview (Policy lookup).
- [ ] Zweryfikować warianty formularza: tylko e-mail, telefon (także międzynarodowy), odpowiedź Reply-To, błąd zdalny, duplikaty, zablokowany token.
- [ ] Sprawdzić na telefonie, tablecie i desktopie oraz na klawiaturze i czytniku ekranu; poprawność strony prywatności.
- [ ] Potwierdzić zatwierdzenie publikacji i dopiero wtedy scalić PR #1 do main.
- [ ] Po wdrożeniu API do produkcji włączyć CONTACT_FORM_ENABLED=true, CONTACT_RATE_LIMIT_READY=true, CONTACT_PRIVACY_READY=true, CONTACT_TEST_ONLY=false; weryfikować jeden raz wszystkie klucze i bezpieczeństwo przed przełączeniem.
- [ ] Przeprowadzić produkcyjny test E2E i potwierdzić realne doręczenie na kontakt@barczuk.com.pl.
- [ ] Zapisać migawkę wydania oraz datę publikacji w OneDrive (03_Wydania i 04_REJESTR_ZMIAN.txt).

## Zasada bezpieczeństwa
Brak gotowej i stosowanej retencji lub produkcyjnej konfiguracji API oznacza: **NIE scalać PR**, nie aktywować przycisku. W razie problemu wyłączyć CONTACT_FORM_ENABLED w produkcji; działają nadal e-mail i telefon.

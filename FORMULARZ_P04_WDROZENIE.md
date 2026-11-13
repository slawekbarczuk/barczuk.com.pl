# Formularz kontaktowy P04 — gałąź robocza (bez publikacji)

Źródło ustaleń: OneDrive / Family Docs / Slawek / Praca / Firma SB / Strona WWW barczuk.com.pl / 02_Projekty / FORMULARZ_KONTAKTOWY_P04.zip, 13 listopada 2026.

## Uzgodniony zakres
- Wymagane: adres e-mail.
- Opcjonalne: telefon, nazwa firmy, „Czego dotyczy kontakt?”.
- Bez imienia, lokalizacji, GPS ani zgody marketingowej.
- Tekst pod formularzem wskazuje administratora i stronę prywatności.
- Nadal działa bezpośredni e-mail i telefon.
- Zachować dotychczasową kolorystykę i numer wersji w stopce.

## W obecnym PR
- Zintegrowana makieta formularza ze stroną główną.
- Przycisk wysyłki domyślnie zablokowany (fail closed); nie powstają zgłoszenia.
- API Azure Functions: /api/contact-settings, /api/contact.
- Po pełnej konfiguracji: Cloudflare Turnstile (weryfikowane serwerowo), walidacja, Microsoft Graph /sendMail, nadawca wewnętrzny i Reply-To klienta. Nie zapisuje ani nie wysyła IP, GPS, strefy urządzenia.
- Ten PR jest **roboczy**. Nie scalać z main przed gotowością i testami.

## Co musi zostać skonfigurowane w Azure Static Web Apps — Application settings
- CONTACT_FORM_ENABLED = true (dopiero po testach i polityce).
- CONTACT_PRIVACY_READY = true (dopiero po publikacji prawidłowej klauzuli).
- CONTACT_RATE_LIMIT_READY = true (dopiero po rzeczywistym wdrożeniu i teście licznika w Azure Table Storage).
- TURNSTILE_SITE_KEY = publiczny klucz witryny z Cloudflare Turnstile.
- TURNSTILE_SECRET = sekret; tylko po stronie serwera.
- CONTACT_ALLOWED_HOSTNAMES = www.barczuk.com.pl,barczuk.com.pl (lub uzupełnione o nazwę środowiska testowego).
- MAIL_TENANT_ID = identyfikator tenanta Entra.
- MAIL_CLIENT_ID = ID aplikacji.
- MAIL_CLIENT_SECRET = sekret OAuth aplikacji; tylko serwer.
- MAILBOX_USER = adres uprawnionej skrzynki nadawczej.
- MAIL_TO = kontakt@barczuk.com.pl.
- RATE_LIMIT_TABLE_CONNECTION_STRING = poufny connection string do osobnego Azure Table Storage (tabela ContactLimitP04); tylko API. Tabela nie zawiera adresów e-mail, IP ani treści zgłoszeń: używa ograniczonych kluczy liczników modulo, dzięki czemu nie przybywają rekordy w nieskończoność.

WAŻNE: Przełącznik RATE_LIMIT_READY bez działającej tabeli nie jest dowodem bezpieczeństwa. Połączenie do storage jest dodatkowym wymaganiem bramki konfiguracyjnej i kod wywołuje realny licznik przed wysyłką poczty.

Aktualny stan: licznik zakodowany w gałęzi roboczej; zasób Storage musi jeszcze zostać utworzony i przetestowany. Nie scalać z main.

Microsoft Graph wymaga uprawnienia aplikacyjnego Mail.Send (zgoda administratora), możliwie ograniczonego do konkretnej skrzynki przez Exchange Online Application RBAC. Nie umieszczać haseł i kluczy w GitHub. Stan 13.11.2026: aplikacja Entra, ograniczenie Exchange Application RBAC, sekret w środowisku testowym 1 oraz Cloudflare Turnstile zostały skonfigurowane; test Graph HTTP 202 potwierdzono doręczeniem do skrzynki. Produkcja nadal wyłączona.

## Wymagane testy przed scaleniem
1. Sprawdzić, że brak konfiguracji = API 503, a formularz ma nieaktywny przycisk.
2. Sprawdzić hosty Turnstile, action=contact, tokeny wygasłe i boty.
3. Wdrożyć na Azure Table Storage ograniczenia zgłoszeń: maks. 4 na godzinę na kubełek nadawcy (hash 12-bitowy, bez zapisu adresu), 12 na 10 minut globalnie, 80 dziennie globalnie. Zgodność liczników przy współbieżności przez ETag; awaria storage blokuje wysyłkę. Ustawić RATE_LIMIT_TABLE_CONNECTION_STRING jedynie w środowisku 1, utworzyć tabelę ContactLimitP04 i sprawdzić limit w integracji.
4. Zweryfikować ograniczenie uprawnień konta wysyłkowego, tożsamość nadawcy, dostarczenie do kontakt@barczuk.com.pl i Reply-To.
5. Test tylko e-maila; test pełnego formularza; błąd wysyłki; duplikat; telefon i międzynarodowy numer.
6. Uzupełnić i opublikować politykę prywatności po ustaleniu retencji zakończonych zapytań i logów, dostawców i ewentualnych transferów.
7. Sprawdzić desktop, tablet, mobile, kontrast, klawiaturę, zgłoszenie z czytnika.
8. Po udanym teście przygotować kompletne wydanie SB-WEB-1126-R09: osiem podstron z numerem w prawym dolnym rogu, kopia źródeł i rejestr zmian OneDrive.
9. Zweryfikować produkcyjne wdrożenie na domenie i realną odebraną wiadomość.

## Dlaczego nie publikować obecnie
W Work P04 był wyłącznie podglądem, który nigdy nic nie wysyłał. Nie zatwierdzono retencji, dostawców i transferów, nie utworzono konfiguracji Microsoft Graph i Turnstile. Publikacja przycisku „Poproś o kontakt” bez rzeczywistej, bezpiecznej wysyłki byłaby myląca.

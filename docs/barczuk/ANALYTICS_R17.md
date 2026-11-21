# R17 — darmowa analityka z wyraźną zgodą (projekt, NIE WDROŻONO)

Stan: 21.11.2026 — przygotowanie techniczne; nie jest to potwierdzenie publikacji.

## Narzędzia

1. Cloudflare Web Analytics: istniejący skrypt na publicznej stronie, bez dodatkowego wdrożenia i bez cookie tracking.
2. Google Analytics 4 Standard: darmowy; pomiar wejść i zdarzeń typu kliknięcie e-mail / telefonu / przejście do Strefy klienta / finansowania.
3. Microsoft Clarity: darmowy; mapy kliknięć, przewijanie i nagrania interakcji na publicznych podstronach po zgodzie.

## Zasada prywatności

- GA4 i Clarity **nie są ładowane ani nie wysyłają danych przed zgodą** (Google Basic Consent Mode).
- Cookies i analityka są opcjonalne; „Odrzuć” i „Zgadzam się” mają równorzędny dostęp.
- Dostępne są PL/EN/DE/UA, a preferencję można zmienić w stopce. Cofnięcie zgody zatrzymuje skrypty przez przeładowanie strony i usuwa znane dostępne z JS ciasteczka analityczne z domeny publicznej.
- GA4 bez Google Signals oraz personalizacji reklam; nie wysyłać PII i danych formularza.
- Clarity ładowany wyłącznie na publicznych stronach; wyłączony na stronach polityk prawnych i prywatności. Formularze otrzymują `data-clarity-mask="true"`.
- **Nie dodawać GA4 ani Clarity do oddzielnej Strefy klienta** https://portal.barczuk.com.pl/ lub stron i dokumentów prywatnych.

## Włączenie — kroki wymagające właściciela kont

1. Utworzyć / wskazać usługę GA4 (Web stream dla https://barczuk.com.pl), zebrać publiczny identyfikator `G-XXXXXXXXXX`.
2. Utworzyć projekt Microsoft Clarity dla publicznej witryny; skonfigurować Consent Mode, maskowanie i nie pozwolić na domyślne cookies bez zgody; zebrać publiczny Project ID.
3. Uzupełnić obie wartości w `assets/analytics-r17-config.js`. To nie są hasła; żadnych tokenów API.
4. **Przed publikacją** zweryfikować i zaktualizować przetwarzanie w czterech językach: `informacje/cookies`, `informacje/prywatnosc` i odpowiedniki EN/DE/UA, wymienić obu dostawców, cel, retencję, prawo cofnięcia zgody i międzynarodowe transfery. Skonsultować zgodność z RODO/PKE; ocenić DPA.
5. Testy: po odrzuceniu nie ma requestów do `googletagmanager.com`, `google-analytics.com` i `clarity.ms`; po zgodzie ruch pojawia się w GA4 i Clarity; cofnięcie usuwa/wyłącza tracking po odświeżeniu; test na telefonie oraz 4 języki.
6. Zachować numer wersji R16 w produkcji aż do pełnej publikacji i weryfikacji R17; osobny PR / release procesu treści i wizualnej spójności.

## Kluczowe ograniczenie

Obecne identyfikatory GA4 i Clarity są puste, więc skrypt **nie pokazuje bannera i nie uruchamia nowych usług**. Po wpisaniu identyfikatorów zgodnie z powyższymi krokami banner pojawi się automatycznie. Ani repozytorium, ani ten dokument nie potwierdzają utworzenia usług w Google i Microsoft.

Źródła: https://support.google.com/analytics/answer/10000067 ; https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-mode ; https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-masking

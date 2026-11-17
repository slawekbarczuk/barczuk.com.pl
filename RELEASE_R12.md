# SB-WEB-1126-R12 — dopracowanie oferty finansowania przedsiębiorstw
Data opracowania: 17.11.2026

## Cel
Bez zmiany identyfikacji Barczuk (czarny / biały / żółty), podstawowego układu dwóch stron i działającego formularza P04, poprawić czytelność oferty, eliminując powtórzenia i podkreślając doradztwo w zakresie zabezpieczeń i finansowań konsorcjalnych.

## Zmiany
- Strona główna: trzy sytuacje klienta pomiędzy zakresem usług a sekcją „Jak pracuję” (planowana inwestycja, negocjacje z bankami, istniejące zadłużenie).
- Strona główna: znacząco skrócona sekcja „Jak pracuję” (jedna wypowiedź wprowadzająca, po jednym konkretnym opisie każdego z trzech etapów).
- Strona główna: „O współpracy” skupia się na organizacji zlecenia, rolach oraz przykładowych rezultatach zamiast powtarzać zakres finansowania.
- Druga karta usług: doprecyzowanie informacji o negocjowaniu zabezpieczeń w tym przy finansowaniu konsorcjalnym.
- Podstrona finansowania: doprecyzowano osobno zabezpieczenia bankowe i finansowanie konsorcjalne oraz charakter opracowania dla klienta.
- Unikalne krótkie opisy meta/og dla strony głównej i podstrony; bez zmiany ścieżek URL.
- Wersja SB-WEB-1126-R12 na wszystkich 6 stronach HTML, w tym 404 i podstronach informacyjnych.
- Pozostały ten sam: układ, logotyp, kolory, menu, formularz, API, Turnstile, limity Azure, ustawienia Microsoft Graph, polityka prywatności i retencja korespondencji, wpisy w sitemap.

## Bezpieczeństwo
Backend i pliki konfiguracyjne P04 niezmienione. W testach regresji sprawdzamy SHA-256 formularza, skryptu obsługi i chronionych plików backendu na podstawie baseline R09.

## Weryfikacja
- [ ] GitHub Actions: testy jednostkowe i statyczne przechodzą.
- [ ] Azure Static Web Apps: wdrożenie gałęzi PR zakończone.
- [ ] Kontrola R12 w podglądzie: teksty, pozycje sekcji, wersja oraz zachowanie formularza.
- [ ] Przed scaleniem: zweryfikować aktualność gałęzi main.
- [ ] Po scaleniu: GitHub Actions produkcji zakończone.
- [ ] Publiczna domena wyświetla R12, nadal P04 działa i nie zmieniono ustawień API.

## Uwaga
To aktualizacja redakcyjna; nie deklaruje gwarancji uzyskania finansowania, nie zawiera nazw banków ani kwot obsługiwanych przedsięwzięć.

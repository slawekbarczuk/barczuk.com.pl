# Architektura logiczna BARCZUK (opis bezpieczny dla publicznego repo)

## Warstwy

1. **Witryna marketingowa** — barczuk.com.pl; statyczna strona R16 (PL/EN/DE/UA), niezależna od prywatnego portalu. Repozytorium: `slawekbarczuk/barczuk.com.pl`. Auto-deploy przez GitHub Actions do Azure Static Web Apps.
2. **Portal uwierzytelniony** — portal.barczuk.com.pl; R08, odrębna aplikacja Azure Static Web Apps. Obecnie ekran logowania i diagnostyka; brak potwierdzenia gotowych modułów biznesowych. Źródła R08 i testy CI są w osobnym prywatnym repozytorium `slawekbarczuk/barczuk-strefa-klienta`; brak automatycznego wdrażania produkcyjnego (planowana procedura wydań).
3. **Tożsamość i dostęp** — Microsoft Entra, połączenie SPA -> zabezpieczona usługa API. Logowanie i diagnostyczne HTTP 200 zostały potwierdzone. Uprawnienia rolowe, izolacja przedsiębiorstw i dostęp osób zewnętrznych to dopiero etap projektowania.
4. **Backend** — Azure Functions jako warstwa API. Dotychczasowa diagnostyka działa. Funkcje teczek, danych i analiz jeszcze do zaprojektowania i przetestowania.
5. **Dane i dokumenty** — planowany prywatny magazyn dokumentów oraz rejestr metadanych spraw, umów i terminów; brak potwierdzenia gotowej funkcji biznesowej. Nie przechowywać plików klientów w publicznej witrynie/repo.
6. **Analiza AI** — planowana odrębna, wymienialna warstwa silnika, z walidacją wyników i nadzorem doradcy; nie zakładać, że już działa produkcyjnie.

## Podstawowe zasady projektu

Prezentacja hero i zmiany języka: `assets/hero-frame.css`, `assets/language-transition.css` oraz `assets/language-transition.js` mają identyczne odpowiedniki w `dist/` prywatnego portalu. Synchronizować je świadomie przy zmianach interfejsu. Publiczny generator `shared()` w `scripts/build-ua-r16.cjs` dołącza animację na wszystkich 20 stronach, a reguły fotografii tylko na czterech stronach głównych. Portal nie wymaga zmian kodu autoryzacji ani API przy publikacji tych zasobów.

- Wszystkie funkcje doradcze i analizy finansowania dotyczą **wyłącznie przedsiębiorstw (B2B)**; nie projektować produktów kredytowych dla osób fizycznych.
- Izolacja danych klientów, uprawnienia oparte na rolach, minimalne uprawnienia, historia operacji i poufność są wymaganiami projektowymi, nie funkcjami już zweryfikowanymi.
- Zgoda/podstawa prawna i informacja o przetwarzaniu **przed przyjęciem dokumentów finansowych**. Treści wymagają kontroli prawnej i zgodności z wdrożonym procesem.
- Zewnętrzne źródła polityk kredytowych, zmian przepisów i wskaźników referencyjnych muszą mieć datę obowiązywania i źródło. Rozważany kierunek POLSTR wymaga bieżącej weryfikacji; nie przyjmować dat/stawek z pamięci modelu.
- Wyniki AI stanowią wsparcie dla doradcy. Istotne wnioski wymagają testów, wyjaśnialności, kontroli wersji modelu i weryfikacji człowieka przed przekazaniem klientowi.
- Interfejs API oddziela witrynę/portal od modelu AI: w przyszłości można zmienić model bez przebudowy serwisu i migracji danych klienta do publicznego kodu.

## Granice i ryzyka

- Główna witryna i portal mają osobne cykle wdrożeniowe. Zmiana w GitHub `slawekbarczuk/barczuk.com.pl` nie aktualizuje automatycznie portalu.
- Kod źródłowy portalu R08 jest zapisany w osobnym prywatnym repozytorium. Zachować ten podział; nie publikować sekretów, materiałów klientów, łańcuchów połączenia, tokenów ani szczegółowych map dostępu.
- Logowanie użytkownika + HTTP 200 diagnostyki nie oznacza jeszcze audytu bezpieczeństwa ani gotowości przetwarzania rzeczywistych sprawozdań finansowych klientów.

# Architektura logiczna BARCZUK (opis bezpieczny dla publicznego repo)

## Warstwy

1. **Witryna marketingowa** — barczuk.com.pl; statyczna strona R16 (PL/EN/DE/UA), niezależna od prywatnego portalu. Repozytorium: `slawekbarczuk/barczuk.com.pl`. Auto-deploy przez GitHub Actions do Azure Static Web Apps.
2. **Portal uwierzytelniony** — portal.barczuk.com.pl; R08, odrębna aplikacja Azure Static Web Apps. Obecnie ekran logowania i diagnostyka; brak potwierdzenia gotowych modułów biznesowych. Docelowo oddzielny prywatny kod i CI/CD.
3. **Tożsamość i dostęp** — Microsoft Entra, połączenie SPA -> zabezpieczona usługa API. Logowanie i diagnostyczne HTTP 200 zostały potwierdzone. Uprawnienia rolowe, izolacja przedsiębiorstw i dostęp osób zewnętrznych to dopiero etap projektowania.
4. **Backend** — Azure Functions jako warstwa API. Dotychczasowa diagnostyka działa. Funkcje teczek, danych i analiz jeszcze do zaprojektowania i przetestowania.
5. **Dane i dokumenty** — planowany prywatny magazyn dokumentów oraz rejestr metadanych spraw, umów i terminów; brak potwierdzenia gotowej funkcji biznesowej. Nie przechowywać plików klientów w publicznej witrynie/repo.
6. **Analiza AI** — planowana odrębna, wymienialna warstwa silnika, z walidacją wyników i nadzorem doradcy; nie zakładać, że już działa produkcyjnie.

## Podstawowe zasady projektu

- Wszystkie funkcje doradcze i analizy finansowania dotyczą **wyłącznie przedsiębiorstw (B2B)**; nie projektować produktów kredytowych dla osób fizycznych.
- Izolacja danych klientów, uprawnienia oparte na rolach, minimalne uprawnienia, historia operacji i poufność są wymaganiami projektowymi, nie funkcjami już zweryfikowanymi.
- Zgoda/podstawa prawna i informacja o przetwarzaniu **przed przyjęciem dokumentów finansowych**. Treści wymagają kontroli prawnej i zgodności z wdrożonym procesem.
- Zewnętrzne źródła polityk kredytowych, zmian przepisów i wskaźników referencyjnych muszą mieć datę obowiązywania i źródło. Rozważany kierunek POLSTR wymaga bieżącej weryfikacji; nie przyjmować dat/stawek z pamięci modelu.
- Wyniki AI stanowią wsparcie dla doradcy. Istotne wnioski wymagają testów, wyjaśnialności, kontroli wersji modelu i weryfikacji człowieka przed przekazaniem klientowi.
- Interfejs API oddziela witrynę/portal od modelu AI: w przyszłości można zmienić model bez przebudowy serwisu i migracji danych klienta do publicznego kodu.

## Granice i ryzyka

- Główna witryna i portal mają osobne cykle wdrożeniowe. Zmiana w GitHub `slawekbarczuk/barczuk.com.pl` nie aktualizuje automatycznie portalu.
- Obecny kod źródłowy portalu R08 należy zachować w osobnym prywatnym repozytorium; nie publikować sekretów, materiałów klientów, łańcuchów połączenia, tokenów, szczegółowych map dostępu.
- Logowanie użytkownika + HTTP 200 diagnostyki nie oznacza jeszcze audytu bezpieczeństwa ani gotowości przetwarzania rzeczywistych sprawozdań finansowych klientów.

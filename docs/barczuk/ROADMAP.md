# Plan rozwoju BARCZUK — stan na 2026-11-19

Punkt startowy: R16 witryny publicznej i R08 Strefy klienta, zalogowanie Microsoft Entra oraz diagnostyka API HTTP 200 potwierdzone. **Właściwe moduły Panelu doradcy nie zostały jeszcze wdrożone.**

## Etap 0 — zamknięty: fundament techniczny

- [x] Strona R16 w PL/EN/DE/UA, wspólny nagłówek, SEO i kontakt do portalu.
- [x] Osobna aplikacja portalu R08 na subdomenie, cztery języki, zgodność wizualna.
- [x] Podłączenie domeny portal, Microsoft Entra i CORS.
- [x] Test sesji i diagnostycznego API HTTP 200.
- [ ] Oddzielne prywatne repozytorium z odtwarzalnym źródłem R08 — **priorytet A**.

## Etap 1 — Panel doradcy i rejestr przedsiębiorstw (następny)

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

Pierwsza czynność w kolejnej sesji: odczytać STATE.md i ten ROADMAP; następnie uporządkować wersjonowanie prywatnego R08 i zaprojektować pierwszy moduł Panelu doradcy, bez nadpisywania R16/R08.

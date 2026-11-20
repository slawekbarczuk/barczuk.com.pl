# Plan rozwoju BARCZUK — stan na 2026-11-19

Punkt startowy: R16 witryny publicznej i R08 Strefy klienta, zalogowanie Microsoft Entra oraz diagnostyka API HTTP 200 potwierdzone. **Właściwe moduły Panelu doradcy nie zostały jeszcze wdrożone.**

## Etap 0 — zamknięty: fundament techniczny

- [x] Strona R16 w PL/EN/DE/UA, wspólny nagłówek, SEO i kontakt do portalu.
- [x] Osobna aplikacja portalu R08 na subdomenie, cztery języki, zgodność wizualna.
- [x] Podłączenie domeny portal, Microsoft Entra i CORS.
- [x] Test sesji i diagnostycznego API HTTP 200.
- [x] Oddzielne prywatne repozytorium z odtwarzalnym źródłem R08 — zweryfikowane 19.11.2026.
- [ ] Procedura wydań/rollback i test bezpieczeństwa uprawnień przed modułami danych klientów.

## Etap 1 — Panel doradcy i rejestr przedsiębiorstw (następny)

### Witryna UA — zaakceptowane wydanie

- [x] Przygotowana korekta wysokości hero, mocniej stonowane wyświetlanie obrazów i poprawne linki do portalu UA; 61 testów, lokalne widoki 1920/1280/390 px i przejście do portalu sprawdzone.
- [x] Publikacja i kontrola produkcji korekty: [PR #12](https://github.com/slawekbarczuk/barczuk.com.pl/pull/12), [44726319405](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44726319405) — success. Wysokość hero i kolorystyka sprawdzone na komputerze/telefonie, kliknięcie otwiera ukraiński portal, 15 stron PL/EN/DE bez zmian.

- [x] Projekt hero Kijów / Odessa / Lwów, treści bankowej i trwałej generacji UA-home; lokalne testy i widoki komputera/telefonu.
- [x] Ocena i akceptacja treści przez użytkownika oraz wyraźne polecenie wdrożenia 20.11.2026.
- [x] Finalne, umiarkowane dopasowanie kolorystyki trzech panoram do rzeczywistych zdjęć Łodzi; eksport 1440 × 810 WebP.
- [x] Publikacja i kontrola produkcji 20.11.2026: [44723055515](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44723055515) — success; pozostałe 19 stron bez zmian, trzy obrazy zgodne z wydaniem, komputer/telefon i rozwijane wyjaśnienie sprawdzone. Szczegóły: [UA_PREVIEW_R16.md](UA_PREVIEW_R16.md).

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

Pierwsza czynność w kolejnej sesji: odczytać STATE.md, ten ROADMAP i źródła prywatnego repozytorium barczuk-strefa-klienta; następnie zaprojektować kontrolę dostępu i pierwszy moduł Panelu doradcy, bez nadpisywania R16/R08.

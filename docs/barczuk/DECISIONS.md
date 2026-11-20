# Rejestr decyzji BARCZUK

**Format:** [ID] data — decyzja; uzasadnienie / konsekwencja. Zmiana decyzji wymaga nowego wpisu i aktualizacji dokumentacji, zamiast jej cichego nadpisywania.

- **D-001, 2026-11:** Główna oferta to niezależne doradztwo finansowe dla firm i inwestycji, w tym bankowe gwarancje i obsługa finansowania. Bez CV i bez publikowania kwot. Utrzymywać zwięzły, rzeczowy język; doświadczenie w bankowości korporacyjnej od 1995 r.
- **D-002, 2026-11:** Wizualna baza R16 i jej cztery artystyczne kadry Łodzi pozostają zachowane. Nie zamieniać zdjęć, układu ani animacji bez wyraźnej decyzji.
- **D-003, 2026-11-19:** Domyślna wersja strony jest polska; dodatkowe EN, DE i UA. W URL ukraiński ma małe `/ua/`, przy poprawnym kodzie języka `uk` w HTML/SEO. Zarówno witryna, jak i portal mają cztery wersje językowe.
- **D-004, 2026-11-19:** Własny adres Strefy klienta to `portal.barczuk.com.pl`, a nie adres techniczny Azure. Portal jest osobną aplikacją.
- **D-005, 2026-11-19:** Menu w obu aplikacjach ma wspólny wygląd i prowadzi między publicznym serwisem a portalem; na desktopie główne menu ma być blisko przełącznika języków.
- **D-006, 2026-11:** Projekt analizy i finansowania dotyczy tylko przedsiębiorstw (B2B); bez finansowania osób fizycznych.
- **D-007, 2026-11:** Analiza AI ma być modułowa: wersjonowanie i wymiana dostawcy/modelu bez przebudowy strony; bezpieczeństwo dokumentów i niezależna walidacja rezultatów.
- **D-008, 2026-11:** System musi umożliwiać aktualizację wymogów banków, polityk kredytowych, regulacji i wskaźników referencyjnych w czasie, z ich źródłem i datą obowiązywania.
- **D-009, 2026-11:** Przed przetwarzaniem informacji finansowych należy zapewnić właściwą podstawę/zgodę, przejrzyste informacje o prywatności i bezpieczny obieg dokumentów. Zawarta umowa ma być archiwizowana w teczce klienta, a istotne warunki monitorowane podczas trwania finansowania.
- **D-010, 2026-11-19:** Priorytet po uruchomieniu logowania i API: Panel doradcy, rejestr przedsiębiorstw, teczki klientów, dokumenty i status spraw. Umowy, terminy i monitoring w kolejnych etapach.
- **D-011, 2026-11-19:** Dokumentacja ciągłości prac jest aktualizowana po każdej większej zmianie. Publiczne repo zawiera tylko jawne informacje; prywatna implementacja portalu i dane klientów muszą być przechowywane oddzielnie.
- **D-012, 2026-11-20:** W publicznej witrynie R16 „Porozmawiajmy” jest zwykłym przedostatnim linkiem, a obramowana „Strefa klienta” ostatnią pozycją przed językami. Kolejność języków to **PL / UA / EN / DE** na wszystkich stronach. Należy zachować tę decyzję w generatorze. Portal R08 ma odrębny cykl wydań i wymaga osobnej synchronizacji interfejsu, jeśli zostanie o nią poproszone.

- **D-013, 2026-11-20:** Użytkownik zaakceptował treści i zlecił wdrożenie trzech panoram Ukrainy oraz wsparcia bankowego/KYC/AML wyłącznie na stronie głównej UA. Finalnie zbliżyć kolorystykę do zdjęć Łodzi, z zachowaniem delikatnego ciepła i przyjaznego nastroju. Zachować R16, pozostałe języki oraz pokaz 8 s / 1,6 s. Treści i obrazy mają być odtwarzalne z generatora; decyzje bankowe pozostają po stronie banku.

## Decyzje jeszcze wymagające szczegółowego projektu

- Role i dostęp: administrator/doradca/klient, udostępnianie do teczek, wieloosobowa reprezentacja firmy, MFA/Conditional Access i kontrola dostępu do API.
- Struktura rejestru spraw, dokumentów, umów, historii zmian i obowiązków kredytowych.
- Dokładny proces dokumentowania zgody i podstawy prawnej, retencji, usuwania danych oraz obsługi żądań podmiotu danych.
- Architektura weryfikacji jakości AI, zestawu testów finansowych i aktualizacji bankowych źródeł wiedzy.
- Docelowa procedura publikacji portalu z prywatnego repozytorium i jej środowiska testowe.

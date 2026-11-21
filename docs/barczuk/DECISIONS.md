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

- **D-014, 2026-11-20:** Po wydaniu UA użytkownik zlecił obniżenie hero do wysokości PL, dalsze stonowanie kolorów i poprawę przejścia do ukraińskiego portalu. Zachować zatwierdzone słowa nagłówka i treść AML; zmienić tylko łamanie/rozmiar nagłówka oraz prezentację zdjęć w CSS UA. Adres Strefy klienta ma wynikać z języka bieżącej strony, w tym `/ua/`, i być odtwarzany przez generator na wszystkich pięciu podstronach UA.

- **D-015, 2026-11-20:** Przełączanie PL/UA/EN/DE powinno mieć wyraźnie wolniejszy, dyskretny efekt przenikania. Linki pomiędzy barczuk.com.pl i portal.barczuk.com.pl muszą być podobnie płynne; wykluczyć z animacji logowanie Microsoft, zewnętrzne linki i użytkowników korzystających z ustawienia ograniczenia ruchu. W mobilnym nagłówku logo BARCZUK wraz ze złotym kwadratem ma pozostawać w jednym wierszu, także na stronach informacji prawnych. Dopuszczony krótkotrwały techniczny znacznik przejścia, bez danych użytkownika.

## Decyzje jeszcze wymagające szczegółowego projektu

- Role i dostęp: administrator/doradca/klient, udostępnianie do teczek, wieloosobowa reprezentacja firmy, MFA/Conditional Access i kontrola dostępu do API.
- Struktura rejestru spraw, dokumentów, umów, historii zmian i obowiązków kredytowych.
- Dokładny proces dokumentowania zgody i podstawy prawnej, retencji, usuwania danych oraz obsługi żądań podmiotu danych.
- Architektura weryfikacji jakości AI, zestawu testów finansowych i aktualizacji bankowych źródeł wiedzy.
- Docelowa procedura publikacji portalu z prywatnego repozytorium i jej środowiska testowe.

- **D-016, 2026-11-21:** Zatwierdzono dla publicznej witryny R17 prosty, pelnoszerokosciowy baner zgody wzorowany kompozycja na profesjonalnych stronach doradczych: krotki tekst i trzy rownorzedne dzialania (ustawienia / odrzuc opcjonalne / akceptuj), a celowy wybor GA4 na drugiej warstwie. Kolory BARCZUK: czern, biel i dyskretny zolty. Cztery jezyki PL/UA/EN/DE. Bez aktywacji Microsoft Clarity. Kolejne wdrozenie wymaga testow i weryfikacji produkcyjnej.

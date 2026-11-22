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


- **D-021, 2026-11-22:** Na wyraźną decyzję użytkownika wycofano D-020 (Frankfurt, Berlin, Monachium). Strony główne PL, EN i DE mają prezentować wyłącznie te same cztery kadry Łodzi R16: Fabryczna, Manufaktura, Piotrkowska, EC1. Wersja UA zachowuje odrębne fotografie Kijowa, Odessy i Lwowa, bez zmian. Zachować zgodność generatora języków i testów; nie cofać pozostałych zmian R17/R18.

- **D-022, 2026-11-22:** W stopce wszystkich publicznych wersji językowych przycisk `Ustawienia cookies` ma poprzedzać numer wersji i znajdować się na tej samej linii. Zachować spójność mobilną, wersjonowanie zasobów i działające ustawienia zgód.

## Decyzje jeszcze wymagające szczegółowego projektu

- Role i dostęp: administrator/doradca/klient, udostępnianie do teczek, wieloosobowa reprezentacja firmy, MFA/Conditional Access i kontrola dostępu do API.
- Struktura rejestru spraw, dokumentów, umów, historii zmian i obowiązków kredytowych.
- Dokładny proces dokumentowania zgody i podstawy prawnej, retencji, usuwania danych oraz obsługi żądań podmiotu danych.
- Architektura weryfikacji jakości AI, zestawu testów finansowych i aktualizacji bankowych źródeł wiedzy.
- Docelowa procedura publikacji portalu z prywatnego repozytorium i jej środowiska testowe.

- **D-016, 2026-11-21:** Zatwierdzono dla publicznej witryny R17 prosty, pelnoszerokosciowy baner zgody wzorowany kompozycja na profesjonalnych stronach doradczych: krotki tekst i trzy rownorzedne dzialania (ustawienia / odrzuc opcjonalne / akceptuj), a celowy wybor GA4 na drugiej warstwie. Kolory BARCZUK: czern, biel i dyskretny zolty. Cztery jezyki PL/UA/EN/DE. Bez aktywacji Microsoft Clarity. Kolejne wdrozenie wymaga testow i weryfikacji produkcyjnej.

- **D-017, 2026-11-21:** BARCZUK ma funkcjonować jako marka niezależnego doradztwa finansowego dla przedsiębiorstw, z komunikacją organizacyjną w liczbie mnogiej („wspieramy”, „analizujemy”), bez eksponowania właściciela w treściach marketingowych i bez niepotwierdzonych twierdzeń o zatrudnionym zespole. Doświadczenie w bankowości korporacyjnej od 1995 r. przedstawiać jako podstawę podejścia, nie biografię ani staż całego zespołu. Cztery obszary oferty: finansowanie, inwestycje, kapitał i decyzje strategiczne, ciągłość finansowania. Sukcesja jest jedynie elementem decyzji właścicielskich. Nazwisko przedsiębiorcy pozostaje w informacjach prawnych i ochronie danych.

- **D-018, 2026-11-21:** W marketingowej komunikacji BARCZUK stosowac dokladne brzmienie: „Doświadczenie w bankowości korporacyjnej od 1995 roku” zamiast „Praktyka bankowości korporacyjnej sięgająca 1995 roku”. Ujednolicic akapit o podstawie doradztwa i wersje PL/EN/DE/UA; nie sugerowac, ze marka dziala od 1995 r. ani ze lata praktyki odnosza sie do calego przyszlego zespolu.

- **D-019, 2026-11-21:** W wizytowkowej czesci stopki wszystkich publicznych stron zamienic „Sławomir Barczuk / Doradztwo w finansowaniu przedsiębiorstw” na jedno haslo „Niezależne doradztwo finansowe” (odpowiedniki EN/DE/UA). Logo BARCZUK bez zmian. W stopce dolnej pozostawic © 2026 Sławomir Barczuk oraz pelne dane w informacjach prawnych i prywatnosci. Bez zmian grafiki, P04, analityki i portalu.

- **D-020, 2026-11-21:** W niemieckiej stronie glownej pokaz trzech wizualizacji w kolejnosci Frankfurt, Berlin, Monachium, zamiast czterech obrazow Lodzi. Styl chlodnych tonow jak w polskiej witrynie. Grafiki lokalne WebP, bez zewnetrznych dostawcow. Inne jezyki i podstrony bez zmian. Generator ma zachowac ustawienia DE.

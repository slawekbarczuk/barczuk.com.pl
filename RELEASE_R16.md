# SB-WEB-1126-R16 — czytelność, neutralna narracja i film miast

Data przygotowania: 18 listopada 2026 r. Baza: `74154316ca82ed375accd87ce4dd912e97994723` (R15).

## Wynik

Strona zachowuje specjalizację w doradztwie finansowym i identyfikację R15. Opis otwarcia wymienia przygotowanie finansowania, pozyskanie gwarancji bankowych, uzgadnianie warunków z bankami, realizację inwestycji i obsługę zadłużenia. Narracja oferty jest bezosobowa. Nie dodano twierdzeń o liczbie pracowników, biurach ani strukturze zespołu.

Zaproszenie do rozmowy dotyczy potrzeb firmy. Formularz ma etykietę „Zostańmy w kontakcie”, nagłówek „Zacznijmy od rozmowy” i przycisk „Porozmawiajmy”. Nadal wystarcza sam e-mail; telefon, firma i temat są opcjonalne.

## Obraz i nawigacja

- W otwarciu użyto lokalnego filmu Łodzi i Warszawy: 14,79 s, 1280 × 720, H.264, bez dźwięku, około 2,2 MB. Autorzy, pierwotne adresy i warunki licencji: [SOURCES.md](assets/video/SOURCES.md).
- Film ma nieruchomy obraz zapasowy i przycisk zatrzymania/odtworzenia. Źródło nie jest dołączane przy włączonym ograniczeniu ruchu lub oszczędzaniu danych. Odtwarzanie jest wstrzymywane poza obszarem widocznym oraz w ukrytej karcie; ręczna pauza pozostaje zachowana.
- Mały złoty znak marki jest wspólny dla sześciu stron. Usunięto dekoracyjne strzałki z dziewięciu nieklikalnych opisów i nadmiarowe ukośne ikony. Cztery karty mają po jednym dolnym znaku działania.
- Powiększono opisy usług, rezultatów i działań, uspokojono nagłówki i odstępy. Informacja o doświadczeniu od 1995 r. została przeniesiona wyżej. Usunięto powtarzający zakres granatowy pas na głównej.
- Wewnętrzne odnośniki stopki otwierają się w tej samej karcie. Zachowano istniejące adresy i kotwice; widoczna nazwa „Sposób pracy” nadal kieruje do `#jak-pracuje`.

## Treści informacyjne i metadane

- Usunięto nieużywane w obecnej witrynie wzmianki o Bookings.
- Pełne informacje o danych zgromadzono w „Prywatność”; unikatowe informacje z dawnego podwójnego opisu zostały tam zachowane. Informacje prawne odsyłają do tej strony.
- Zachowano dane przedsiębiorcy, administratora, dotychczasowe podstawy i fakty o przetwarzaniu oraz 12-miesięczny okres zapytań z formularza niezakończonych współpracą.
- Dodano wspólny obraz do udostępniania linków i aktualny znak Organization. Mapa nadal obejmuje pięć tych samych kanonicznych URL.
- Zachowano celowe 404 wycofanych ofert i przekierowanie dawnej oferty finansowej.

## Kontrola i status

31 testów automatycznych przechodzi: istniejące testy API i limitowania, kontrola struktury P04 i niezmienionego skryptu obsługi po odjęciu dwóch zatwierdzonych zmian tekstów komunikatów, strony/metadane oraz osiem scenariuszy filmu.

Kod API, konfiguracja hostingu i istniejące procesy publikacji pozostają zgodne z chronionymi sumami kontrolnymi. Nie wykonywano prawdziwego wysłania formularza.

Kontrola wizualna tej wersji w przeglądarce nie została ukończona: narzędzie sterowania zostało zatrzymane, ponieważ nie potrafiło wiarygodnie ustalić adresu aktywnej karty. Przygotowano wersję do podglądu; przed publikacją produkcyjną pozostaje sprawdzić rzeczywisty wygląd na komputerze i telefonie, kadry obu miast oraz przycisk pauzy. Bieżący stan wdrożenia należy potwierdzić w GitHub Actions; ten dokument sam nie potwierdza publikacji.

## Uzupełnienie R16 — spokojny film, nawigacja i favicon
- Film 34 s: industrialna Łódź, nowoczesna panorama i szeroki widok Łodzi Fabrycznej; przenikania 2,5 s i płynna pętla.
- Usunięto zoompan ze zdjęć, wprowadzono mocniejszy granatowy filtr. Film i plakat mają nowe adresy (uniknięcie starej pamięci podręcznej).
- Menu: „Etapy” i „Rezultaty”, bez zmiany identyfikatorów sekcji ani SEO.
- Favicon bez tła: granatowa litera B (krój szeryfowy Palatino/P052 jako kontur wektorowy) i złoty kwadrat na wspólnej podstawie; PNG/ICO przezroczyste.
- Zachowano SB-WEB-1126-R16, P04 i konfigurację API.

## R16 — zdjęcia Łodzi i spokojne przejścia (18.11.2026)
- Film zastąpiono 4 zatwierdzonymi artystycznymi wizualizacjami architektury Łodzi (Fabryczna + Brama Miasta, Manufaktura, Piotrkowska, EC1).
- Grafiki WebP, proste narożniki, statyczne kadry, bez sztucznego przesuwania i bez przycisku pauzy. Wymiana co 11 sekund, przenikanie 2,2 sekundy, pełny cykl 44 sekundy.
- Tryb ograniczenia ruchu i oszczędzania danych zatrzymują pokaz; niewidoczna karta i obraz poza ekranem wstrzymują zegar.
- Powtórzone „Zacznijmy od rozmowy” zastąpiono etykietą „Kontakt” i odrębnym nagłówkiem formularza „Przedstaw swoją sprawę”.
- Wszystkie cztery obrazy są **wizualizacjami wygenerowanymi** inspirowanymi Łodzią; nie są dokumentalnymi fotografiami. P04 i API pozostają bez zmian.

## R16 XL — powiększone zdjęcia na komputerze (18.11.2026)
- Desktop: zwiększono docelową szerokość zdjęć o 50% względem pierwotnego maksimum (560 → 840 px), poszerzając układ sekcji hero i dostosowując typografię. Układ mobilny zachowano.
- Podniesiono jakość wszystkich czterech plików WebP z 640×360 do 1440×810 px, bez zmiany zaakceptowanych wizualizacji. Razem ok. 430 KB.
- Zdjęcia zmieniają się co 8 s zamiast 11 s, z delikatnym przenikaniem 1,6 s zamiast 2,2 s.
- Proste narożniki, brak przesuwania/zoomowania, zachowane ograniczenia ruchu oraz P04/API.
- Bez zmiany wersji SB-WEB-1126-R16.

## R16 — wielojęzyczna witryna (18.11.2026)
- Języki polski (domyślny), angielski i niemiecki, dyskretny przełącznik PL/EN/DE w nagłówku komputera i telefonu.
- Pięć kompletnych podstron w każdym języku: start, finansowanie, informacje prawne, prywatność i cookies (łącznie 15 adresów statycznych).
- Wersje językowe mają własne adresy, kompletne tłumaczenia oferty oraz polityk, odrębne tytuły i opisy SEO, wzajemne relacje hreflang, x-default PL i własne canonical URL.
- Zachowano wszystkie zdjęcia Łodzi, układ R16, formularz i działający backend P04; teksty formularza i zabezpieczenia Turnstile są tłumaczone na stronach EN/DE.
- Lokalizacje generowane z kanonicznej treści polskiej przez scripts/build-i18n-r16.cjs i pliki i18n; bez automatycznego przekierowywania na podstawie języka przeglądarki.
- Rozszerzono sitemap.xml do 15 adresów i dodano testy SEO, dostępności przełącznika, kompletności stron i regresji funkcji.
- Wersja widoczna w stopce bez zmian: SB-WEB-1126-R16.

## R16 UA — panoramy Ukrainy i wsparcie bankowe (20.11.2026)

- Wdrożona i zweryfikowana korekta po wydaniu: niższe hero poprzez dopasowanie typografii UA, bardziej neutralne kolory wyświetlanych obrazów oraz adres portalu `/ua/` odtwarzany na pięciu stronach UA przez generator. [PR #12](https://github.com/slawekbarczuk/barczuk.com.pl/pull/12), [publikacja 44726319405](https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44726319405) — success. Szczegóły kontroli produkcji w `docs/barczuk/STATE.md`.

- Użytkownik zaakceptował treści i zlecił publikację. **Wdrożono i zweryfikowano**: https://github.com/slawekbarczuk/barczuk.com.pl/actions/runs/44723055515 — success, commit `79176f13266a3654a2f96f2bfbde6a4e5ac6205f`. Pełne dowody w `docs/barczuk/STATE.md` oraz `CHANGELOG.md`.
- Tylko strona główna UA: Kijów / Odessa / Lwów, 1440 × 810 WebP; wspólny mechanizm 8 s / 1,6 s. Kolorystykę finalnie dopasowano do zdjęć Łodzi, zachowując delikatne ciepło.
- Treść kierowana do firm z Ukrainy i przedsiębiorstw z ukraińskim kapitałem, sekcja rachunków/rozliczeń/KYC/AML, krótkie rozwijane wyjaśnienia i kontakt. Decyzje o rachunku pozostają po stronie banku.
- Trwałe źródło: `i18n/ua-home-r16.json` i `scripts/localize-ua-home-r16.cjs` wywoływany z generatora UA wyłącznie dla strony głównej. Osobny CSS wczytywany tylko przez `/ua/`.
- 61 testów przechodzi, w tym dwukrotna regeneracja i brak zmian pozostałych wersji. Zachowano PL/EN/DE, pozostałe podstrony UA, P04/API, wspólne style, skrypt pokazu i wydanie SB-WEB-1126-R16.

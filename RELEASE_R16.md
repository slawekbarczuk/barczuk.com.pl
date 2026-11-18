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

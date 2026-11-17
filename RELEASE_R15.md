# Wydanie SB-WEB-1126-R15 — Financial Advisory Editorial

**Data:** 17.11.2026  
**Baza:** R13, commit `f919c48d2a858a2f5ad11cdb079eece9444309e2` (przywrócenie po wycofaniu R14).  
**Zakres:** odświeżenie warstwy wizualnej z zachowaniem obecnego pozycjonowania oferty.

## Kierunek
- Autorska identyfikacja BAR CZUK inspirowana eleganckim, redakcyjnym stylem niezależnych firm doradztwa finansowego; bez kopiowania znaków i materiałów innych marek.
- Paleta: granat `#14243A`, kość słoniowa `#F7F5F0`, jasne szarości, dyskretny akcent `#B6A27A`.
- Szeryfowe nagłówki z systemowych fontów (bez transmisji danych do zewnętrznych serwisów fontów), teksty bezszeryfowe.
- Własna wektorowa grafika architektoniczna i wąski granatowy pas z hasłem.
- Minimalistyczne listy usług zamiast ciężkich żółtych kafli.
- Dyskretna informacja o doświadczeniu w bankowości korporacyjnej od 1995 r.

## Zachowanie ciągłości
- Adresy i kotwice `/finansowanie-przedsiebiorstw/`, `#zakres`, `#jak-pracuje`, `#wspolpraca`, `#kontakt`, sekcje sześciu usług bez zmiany.
- Treść merytoryczna oferty i meta-opisy SEO z R13 zachowane.
- Brak zmian w `api/`, `staticwebapp.config.json`, `sitemap.xml`, `robots.txt` i skryptach formularza P04.
- Sekcja formularza pozostaje ukryta do czasu spełnienia warunków uruchomienia po stronie systemu.
- Strony prawne i polityki zachowują treść; zmienia się wyłącznie identyfikacja graficzna i stopka.

## Pliki
- Nowe: `assets/editorial-r15.css`, `assets/architektura-r15.svg`.
- Zmienione: `index.html`, `finansowanie-przedsiebiorstw/index.html`, `404.html`, trzy strony w `informacje/`, `tests/website-r12.test.cjs` (zachowana nazwa pliku testowego na potrzeby zgodności z istniejącym układem).
- Nowa wersja stopki: `SB-WEB-1126-R15`.

## Weryfikacja
Testy sprawdzają m.in. metadane, integralność P04, legal, adresy i elementy R15. W razie problemów można przywrócić commit bazowy R13.

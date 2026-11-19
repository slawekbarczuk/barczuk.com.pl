# BARCZUK — centrum ciągłości projektu

**Projekt:** publiczna witryna niezależnego doradztwa finansowego B2B + odrębna, uwierzytelniona Strefa klienta i przyszłe narzędzia analizy finansowej przedsiębiorstw.

**Stan odniesienia:** 2026-11-19 (czwartek), Europe/Warsaw. Dokumentacja jest wersjonowana w GitHub; po kolejnych wdrożeniach należy ją aktualizować.

## Przeczytaj w tej kolejności

1. [STATE.md](STATE.md) — co rzeczywiście działa, czego jeszcze nie wiemy.
2. [DECISIONS.md](DECISIONS.md) — ustalone granice i niezmienne założenia.
3. [ARCHITECTURE.md](ARCHITECTURE.md) — ogólny podział systemu, bez sekretów.
4. [ROADMAP.md](ROADMAP.md) — plan od obecnego punktu.
5. [CHANGELOG.md](CHANGELOG.md) — historia ważnych kroków i dowody.
6. [WORKFLOW.md](WORKFLOW.md) — jak dokumentujemy każdą większą zmianę.

## Zasoby

- Produkcja strony publicznej: https://barczuk.com.pl/
- Produkcja portalu: https://portal.barczuk.com.pl/
- Kod witryny i niniejsza dokumentacja: https://github.com/slawekbarczuk/barczuk.com.pl
- Szczegóły ostatniej wersji strony: [RELEASE_R16.md](../../RELEASE_R16.md)
- Historia istniejącej pracy nad formularzem kontaktowym: [FORMULARZ_P04_WDROZENIE.md](../../FORMULARZ_P04_WDROZENIE.md) i [PROCEDURA_RETENCJI_P04.md](../../PROCEDURA_RETENCJI_P04.md) — nie zakładać automatycznie, że wszystkie opisane tam działania zostały już wdrożone.

## Granice dokumentacji

Repozytorium `slawekbarczuk/barczuk.com.pl` jest **publiczne**. Nie jest miejscem na akta klientów, hasła, klucze, sekretne ustawienia, tokeny API, dane finansowe ani szczegółowy kod prywatnego portalu. Te zasoby muszą trafić do właściwych zabezpieczonych systemów i osobnego prywatnego repozytorium. Tutaj odnotowujemy tylko jawny stan i zadania.

## Najważniejszy następny krok

Przed rozwijaniem Panelu doradcy zapewnić trwałe, prywatne repozytorium źródeł R08 portalu, z procedurą bezpiecznych wdrożeń, odtwarzalnością i testami. Następnie rozpocząć moduły rejestru przedsiębiorstw i teczek klientów; szczegóły w ROADMAP.md.

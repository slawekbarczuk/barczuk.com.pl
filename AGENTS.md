# BARCZUK — instrukcja wznowienia projektu

Przed rozpoczęciem lub kontynuacją prac nad barczuk.com.pl albo portal.barczuk.com.pl:
1. Odczytaj aktualną gałąź `main` w repozytorium GitHub `slawekbarczuk/barczuk.com.pl`.
2. Przeczytaj `docs/barczuk/README.md`, a następnie `STATE.md`, `DECISIONS.md`, `ARCHITECTURE.md`, `ROADMAP.md` i ostatni wpis `CHANGELOG.md`.
3. Odróżniaj stan **wdrożony i zweryfikowany** od **planowanego**, **niezweryfikowanego** i **zablokowanego**; dokumentacja może być starsza od bieżącego wdrożenia.
4. Zanim zmienisz kod, odczytaj aktualne źródła, testy oraz ostatnie wyniki GitHub Actions. Nie odtwarzaj stanu ze wspomnień, zrzutów ani przybliżeń.
5. Zachowaj zakres B2B, wersje PL/EN/DE/UA, układ R16 i bezpieczeństwo logowania i danych portalu. Nie zmieniaj samodzielnie autoryzacji, przetwarzania danych ani warunków prawnych bez weryfikacji.
6. Nie dodawaj do publicznego repo sekretów, tokenów, identyfikatorów klientów, umów, sprawozdań finansowych, prywatnych parametrów infrastruktury i kodu bezpieczeństwa portalu.
7. Po każdym istotnym, zakończonym etapie zastosuj procedurę `docs/barczuk/WORKFLOW.md`: uaktualnij status, decyzje, roadmapę i dziennik z dowodem wdrożenia.
8. Jeśli w danej rozmowie nie masz dostępu do GitHub/Azure, wyraźnie to zaznacz. Nie deklaruj zapisu lub wdrożenia bez potwierdzenia.

Wskazówka na start kolejnej rozmowy: „Kontynuujemy BARCZUK. Odczytaj AGENTS.md oraz dokumentację docs/barczuk w slawekbarczuk/barczuk.com.pl; najpierw odtwórz aktualny stan i wskaż następny krok”.

Ten plik jest wskazówką do pracy, a nie upoważnieniem do samodzielnych zmian w infrastrukturze.

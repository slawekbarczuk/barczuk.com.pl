# Procedura aktualizacji dokumentacji BARCZUK

Cel: bezpieczna ciągłość pomiędzy kolejnymi rozmowami i możliwość odtworzenia stanu bez polegania wyłącznie na pamięci asystenta.

## Kiedy aktualizować

Po **każdej większej zmianie**: nowa wersja strony/portalu, zmiana domeny lub konfiguracji logowania, uruchomienie modułu biznesowego, nowy model danych, istotna decyzja zakresowa/prawna, migracja, wynik testów lub zmiana priorytetu. Małe korekty redakcyjne mogą być grupowane.

## Procedura dla asystenta prowadzącego

1. **Na początku sesji:** przeczytaj AGENTS.md, README.md oraz pliki w docs/barczuk na aktualnej gałęzi. Odczytaj prawdziwy stan kodu i CI, gdy dotyczy.
2. **Przed zmianą:** zapisz cel, bazową wersję, ryzyko, zakres wpływu, zachowywane funkcje; sprawdź prawa dostępu i środowisko.
3. **Po zmianie:** wykonaj testy oraz zweryfikuj faktyczne wdrożenie. Nie utożsamiaj skompilowania ze stanem produkcyjnym.
4. **Dziennik:** dopisz do CHANGELOG.md datę, co zmieniono, co pozostawiono, wersję/commit, testy i wynik.
5. **Stan:** popraw STATE.md — wyłącznie stan potwierdzony; aktualizuj ROADMAP.md (ukończone / następne) i DECISIONS.md, jeśli podjęto nową decyzję.
6. **Commit:** zapisz dokumentację razem ze zmianą albo bezpośrednio po niej; użyj treści typu `docs: update BARCZUK status after Rxx`. Sprawdź, czy commit trafił na właściwą gałąź i czy CI skończyło się poprawnie.
7. **Raport do użytkownika:** podaj link do konkretnego zapisu GitHub, status wdrożenia, testy i kolejny krok. Jeśli brak dostępu do zewnętrznych narzędzi, wskaż brak i nie udawaj wykonanej operacji.
8. **Bezpieczeństwo:** przed commitem do publicznego repo sprawdź, że nie ujawniono sekretów, identyfikatorów/danych klientów ani poufnego kodu portalu. Materiały poufne są wyłącznie w repo prywatnym i zabezpieczonych zasobach, zgodnie z uprawnieniami.

## Zasada prawdy

- **Potwierdzone:** istnieje artefakt, wynik Azure/GitHub Actions lub wiarygodny test użytkownika.
- **Planowane:** decyzja o funkcji, ale bez implementacji.
- **Do weryfikacji:** nie ma wystarczającego aktualnego dowodu.
- **Zablokowane:** konkretna przeszkoda, jej właściciel i dalsza ścieżka.

Nie zamieniać automatycznie „wykonano” na „wdrożono”. Nie wpisywać przyszłych funkcji jako gotowych.

## Wznowienie w nowym wątku

Użytkownik może wkleić: „Kontynuuj BARCZUK. Zacznij od https://github.com/slawekbarczuk/barczuk.com.pl/blob/main/docs/barczuk/README.md i AGENTS.md; sprawdź aktualny stan, nie zgaduj z pamięci”.

Aktualizacja wykonywana jest w toku naszej wspólnej pracy, kiedy dostęp do GitHub i odpowiednie uprawnienia są dostępne. Sam zapis tej procedury nie uruchamia automatycznego procesu w tle.

# P04 — procedura retencji korespondencji (12 miesięcy)
Status: PROJEKT PROCEDURY DO WDROŻENIA PRZED PUBLIKACJĄ R09
Data decyzji: 16.11.2026

## Zakres
Dotyczy zapytań nadesłanych przez formularz barczuk.com.pl P04 oraz powiązanej korespondencji w Microsoft 365. Formularz wysyła wiadomości do współdzielonej skrzynki kontakt@barczuk.com.pl, której używa się również do innych spraw. **Nie wolno stosować reguły automatycznego kasowania wszystkich wiadomości tej skrzynki.**

## Zasada przyjęta przez administratora
Zgłoszenia, które nie prowadzą do współpracy, przechowuje się maksymalnie przez 12 miesięcy **od zamknięcia sprawy**, chyba że istnieje konkretny obowiązek prawny lub potrzeba zabezpieczenia roszczeń. Gdy rozpoczyna się współpraca, stosuje się odpowiednie inne terminy dla dokumentów umownych/księgowych; materiały trzeba przekwalifikować do właściwej dokumentacji.

## Procedura operacyjna
1. Wiadomości P04 rozpoznać po stałym początku tematu: „Nowa prośba o kontakt – barczuk.com.pl / ...”. Ten sam identyfikator widoczny jest w treści.
2. Podczas obsługi zachować wątek i odpowiedzi, w tym załączniki, zgodnie z bieżącym celem sprawy.
3. Po zakończeniu sprawy bez współpracy przenieść **kompletny wątek** (w tym odpowiedzi wychodzące) do folderu spraw P04 zakończonych w miesiącu zamknięcia, np. „P04/Zamkniete/2026-11”. Umożliwia to ustalenie początku 12-miesięcznego okresu bez przechowywania dodatkowych danych w rejestrze.
4. **Pierwszego dnia każdego miesiąca** sprawdzić foldery P04 o tej samej nazwie miesiąca z poprzedniego roku (np. 1 listopada 2027 r. folder „2026-11”). Po sprawdzeniu, czy nie ma aktywnej sprawy ani wyjątku prawnego, usunąć wiadomości. Takie grupowanie powoduje, że korespondencja jest usuwana nie później niż po 12 miesiącach od zamknięcia; część spraw może zostać usunięta nieco wcześniej. W rejestrze kontrolnym odnotować jedynie datę przeglądu, liczbę spraw i ewentualne podstawy wyjątku, bez kopiowania danych osób.
5. Zweryfikować również kopie i odpowiedzi w folderach „Wysłane”, archiwach, ewentualnych skrzynkach innych uczestników oraz ustawienia retencji/hold Exchange Online. Usunięcie z Outlooka nie musi oznaczać fizycznego usunięcia z systemów Microsoft 365, jeżeli obowiązuje odrębna polityka lub blokada prawna.
6. Prowadzący proces odpowiada za terminowość i kontrolę wyjątków. Procedura powinna zostać rzeczywiście wprowadzona i wykonana — samo zamieszczenie polityki prywatności na stronie tego nie zapewnia.

## Weryfikacja przed produkcją
- [ ] Foldery / oznaczanie wątków P04 w skrzynce współdzielonej są gotowe.
- [ ] Wybrano odpowiedzialnego i kalendarz miesięcznej kontroli.
- [x] Kontrola Exchange 16.11.2026: mailbox i organization InPlaceHolds=0, LitigationHold=false, RetentionHold=false, DelayHold=false, DelayReleaseHold=false, Default MRM Policy. Pozostaje sprawdzenie ewentualnych etykiet/polityk Purview przez Policy lookup.
- [ ] Zweryfikowano sposób usuwania kopii w innych miejscach.
- [ ] Polityka na stronie odpowiada praktyce.
- [ ] Dane techniczne Azure Storage Table: tabelę stanowią licznik/okres, bez adresów e-mail i treści; nie stosuje się wobec nich retencji korespondencji.

# P04 — procedura retencji korespondencji (12 miesięcy)
Status: PROJEKT PROCEDURY DO WDROŻENIA PRZED PUBLIKACJĄ R09
Data decyzji: 16.11.2026

## Zakres
Dotyczy zapytań nadesłanych przez formularz barczuk.com.pl P04 oraz powiązanej korespondencji w Microsoft 365. Formularz wysyła wiadomości do współdzielonej skrzynki kontakt@barczuk.com.pl, której używa się również do innych spraw. **Nie wolno stosować reguły automatycznego kasowania wszystkich wiadomości tej skrzynki.**

## Zasada przyjęta przez administratora
Zgłoszenia, które nie prowadzą do współpracy, przechowuje się maksymalnie przez 12 miesięcy **od zamknięcia sprawy**, chyba że istnieje konkretny obowiązek prawny lub potrzeba zabezpieczenia roszczeń. Gdy rozpoczyna się współpraca, stosuje się odpowiednie inne terminy dla dokumentów umownych/księgowych; materiały trzeba przekwalifikować do właściwej dokumentacji.

## Procedura operacyjna — wariant uproszczony dla kilku–kilkunastu zapytań rocznie
1. W skrzynce współdzielonej kontakt@barczuk.com.pl używać tylko jednego folderu głównego **„P04 – Formularz WWW”** i jednego podfolderu **„Zamknięte”**. Żadnych folderów na poszczególne miesiące ani lata.
2. Do folderu głównego trafiają zapytania w toku. Rozpoznawać je po temacie „Nowa prośba o kontakt – barczuk.com.pl / ...” z unikalnym identyfikatorem. Z uwagi na mały ruch przenoszenie może być ręczne; automatyczna reguła nie jest konieczna.
3. Po zakończeniu sprawy bez współpracy przenieść cały dostępny wątek do **„P04 – Formularz WWW / Zamknięte”**, pamiętając także o odpowiedziach i ewentualnych kopiach w „Wysłane”. Dla ustalenia daty zamknięcia wystarczy data ostatniej wiadomości kończącej korespondencję. Gdy sprawę zamknięto później bez kończącej wiadomości, odnotować datę zamknięcia obok identyfikatora w minimalnym rejestrze P04 (wyłącznie identyfikator sprawy i data zamknięcia; bez danych osoby).
4. **Pierwszego dnia każdego miesiąca** szybko przejrzeć folder **„Zamknięte”** i usunąć sprawy zamknięte w tym samym miesiącu poprzedniego roku (np. 1 listopada 2027 r. sprawy z listopada 2026 r.), o ile nie istnieje konkretny obowiązek prawny albo potrzeba zabezpieczenia roszczeń. Taki przegląd może usuwać niektóre sprawy nieco wcześniej, ale nie przekracza terminu 12 miesięcy od zamknięcia. Nie stosować zbiorczej reguły „kasuj 365 dni po otrzymaniu” do wspólnej skrzynki.
5. Zweryfikować również kopie i odpowiedzi w „Wysłane”, archiwach, ewentualnych skrzynkach innych uczestników oraz ustawienia Exchange Online i Purview. Usunięcie z Outlooka nie zawsze oznacza natychmiastowe fizyczne usunięcie danych na platformie.
6. Miesięczny przegląd można wykonywać ręcznie przy tak małej liczbie spraw; wystarczy przypomnienie pierwszego dnia miesiąca. Procedura musi działać w praktyce — samo zamieszczenie zasady na stronie tego nie zapewnia.

## Weryfikacja przed produkcją
- [x] Użytkownik utworzył folder „P04 – Formularz WWW” i zdecydował o jednym podfolderze „Zamknięte”; brak folderów miesięcznych. Należy jedynie potwierdzić utworzenie podfolderu.
- [ ] Potwierdzić comiesięczny krótki przegląd folderu „Zamknięte”, sposób odnotowania daty zamknięcia oraz odpowiedzialność za usuwanie danych najpóźniej po 12 miesiącach.
- [x] Kontrola Exchange 16.11.2026: mailbox i organization InPlaceHolds=0, LitigationHold=false, RetentionHold=false, DelayHold=false, DelayReleaseHold=false, Default MRM Policy. Pozostaje sprawdzenie ewentualnych etykiet/polityk Purview przez Policy lookup.
- [ ] Zweryfikowano sposób usuwania kopii w innych miejscach.
- [ ] Polityka na stronie odpowiada praktyce.
- [ ] Dane techniczne Azure Storage Table: tabelę stanowią licznik/okres, bez adresów e-mail i treści; nie stosuje się wobec nich retencji korespondencji.

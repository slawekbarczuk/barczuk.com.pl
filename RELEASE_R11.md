# SB-WEB-1126-R11 — 17 listopada 2026

Sekcja „Poproś o kontakt” otrzymuje jasnoszare tło spójne z sekcją „O współpracy”, białe pola oraz ciemne, czytelne opisy. Czarny pas z bezpośrednim kontaktem pozostaje osobnym blokiem. Zmiana obejmuje stronę główną oraz podstronę finansowania.

Zachowano dokładny kod formularza P04 i skrypt obsługi, endpointy, pola wymagane i opcjonalne, weryfikację Turnstile, ochronę antyspamową, treść informacji o prywatności i konfigurację usług. Backend oraz istniejące procesy publikowania pozostają bez zmian. Akceptowany wariant A P02 wdrożony w R10 pozostaje podstawą treści i układu strony.

Weryfikacja przed publikacją: 19 testów, zgodność kodu formularza i obsługi z R09/P04 oraz kontrola odsyłaczy. Podgląd układu lokalnie; po publikacji weryfikacja źródła, konfiguracji formularza, przekierowań i wycofanych usług oraz wyglądu na komputerze i telefonie. Nie wykonywano nowego testu doręczenia wiadomości.

Punkt przywrócenia: commit R10 `10174df1ba3c7defa33e2ea12a31203171e36d07`, archiwum `SB-WEB-1126-R10_WYDANIE.zip`.

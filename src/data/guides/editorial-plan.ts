/**
 * Explicit exceptions for the five standard guides whose depth layer is useful
 * as reference material but too long for the default reading path. The
 * remaining depth sections are still rendered in the closed advanced layer.
 */
export const visibleDepthHeadings: Record<string, string[]> = {
  'g-co-je-gemini-notebook': ['Rozhodnutí: notebook, nebo běžná aplikace?', 'Praktický příklad: průmyslová revoluce'],
  'g-prvni-notebook': ['Postup od otázky k první odpovědi', 'Praktický příklad: notebook pro pracovní list'],
  'g-kvalitni-zdroje': ['Rozhodovací karta pro výběr zdroje', 'Praktický příklad: tři zdroje, tři role'],
  'g-zdroj-nejde-nacist': ['Diagnostický strom místo náhodného opakování', 'Praktický příklad: PDF s tabulkou'],
};

export const visibleExtraHeadings: Record<string, string[]> = {
  'g-mind-maps': ['Od mapy k otázce'],
  'g-cinematic-short': ['Kritérium pro odmítnutí filmového stylu', 'Filmový brief s důkazní hranicí', 'Důkazní hranice v popisku'],
  'g-co-nenahravat': ['Rychlý fallback pro tým'],
  'g-exporty': ['Change log místo nové kopie bez vysvětlení'],
  'g-overovat-odpovedi': ['Vzorek podle rizika', 'Schválení a auditní stopa'],
  'g-diferenciace': ['Kdy podporu ubrat a kdy ji ponechat'],
  'g-video-overview': ['Storyboard před generováním'],
  'g-infografika': ['Kontrola vizuálního zkreslení', 'Datový a vizuální proofread'],
  'g-slide-deck': ['Argumentová linie a slepé místo', 'Slide audit podle otázky publika'],
  'g-reports-data-tables': ['Kontrola citlivých hodnot', 'Kritická buňka a rozhodnutí'],
  'g-rozpory-a-interpretace': ['Příčina, mechanismus a názor', 'Závěr s mírou jistoty'],
  'g-evidence-map': ['Kvalita řádku evidence mapy', 'Minimum pro auditovatelný řádek'],
  'g-vice-dokumentu': ['Rozhodnutí jako hypotéza', 'Pilotní doporučení místo definitivního verdiktu'],
  'g-hallucinace-citace': ['Test rozšíření tvrzení', 'Jazyk, který nepřidává jistotu', 'Před publikací použijte menší tvrzení'],
  'g-copyright': ['Nejmenší nutná kopie', 'Rozhodnutí o sdílení ve čtyřech stavech'],
  'g-osobni-udaje': ['Minimální pracovní balíček', 'Kontrola účelu a přiměřenosti'],
  'g-cizi-jazyk': ['Úroveň jazyka a odborná přesnost'],
  'g-odborne-predmety': ['Bezpečná simulace odborného případu'],
  'g-dlouhy-dokument': ['Kapitola, příloha a definice'],
  'g-flashcards-quizzes': ['Rozložení obtížnosti a zpětná vazba'],
};

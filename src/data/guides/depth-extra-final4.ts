import type { GuideDepthExtension } from './depth-extra';

export const depthExtraFinal4: GuideDepthExtension[] = [
  {
    id: 'g-overovat-odpovedi',
    sections: [{ heading: 'Doložení rozsahu kontroly', paragraphs: ["V revizi uveďte, zda jste kontrolovali celý výstup, všechna rozhodující tvrzení nebo pouze vzorek. Přidejte důvod volby a seznam neověřených částí. Transparentní rozsah je důležitější než obecné tvrzení, že odpověď byla „zkontrolována“."], bullets: ['rozsah', 'důvod', 'neověřené části', 'datum'] }],
  },
  {
    id: 'g-hallucinace-citace',
    sections: [{ heading: 'Před publikací použijte menší tvrzení', paragraphs: ["Pokud ani po revizi není jasné, jak široký závěr zdroj dovoluje, zmenšete jej na pozorování a uveďte, co z něj nelze vyvodit. Kratší tvrzení s přesnou citací má větší praktickou hodnotu než působivý odstavec s nejistou hranicí."], bullets: ['pozorování', 'omezení', 'přesná citace', 'další otázka'] }],
  },
  {
    id: 'g-copyright',
    sections: [{ heading: 'Doklad o rozhodnutí', paragraphs: ["Do pracovního archivu uložte odkaz na licenční podmínku nebo poznámku, kdo rozsah schválil. Když podmínku nelze dohledat, označte materiál jako nejistý. Tato jednoduchá stopa chrání před tím, aby se pracovní výjimka později vydávala za obecné právo."], bullets: ['odkaz', 'schvalovatel', 'rozsah', 'stav'] }],
  },
  {
    id: 'g-osobni-udaje',
    sections: [{ heading: 'Přiměřenost po vytvoření výstupu', paragraphs: ["Po dokončení návrhu odstraňte vstupní údaje, které už nepotřebujete, a zkontrolujte, zda výstup neobsahuje více detailu než rozhodnutí vyžaduje. Minimalizace je průběžný proces, ne jednorázová úprava před nahráním."], bullets: ['co zůstává', 'co odstranit', 'proč je údaj nutný', 'kdo má přístup'] }],
  },
  {
    id: 'g-cinematic-short',
    sections: [{ heading: 'Finální hranice krátkého videa', paragraphs: ["Krátký formát schvalte až tehdy, když jeho nejpravděpodobnější divácký závěr odpovídá zdrojům a když příjemce ví, kde najde detail. Pokud video vyvolává silnější interpretaci než text, přidejte kontext, změňte scénu nebo zvolte jiný formát. Přitažlivost není důvod přenést na diváka skryté riziko."], bullets: ['divácký závěr', 'zdrojový detail', 'kontext', 'alternativní formát'] }],
  },
  {
    id: 'g-reports-data-tables',
    sections: [{ heading: 'Kritický údaj v textu', paragraphs: ["U závěru reportu zopakujte nejdůležitější hodnotu v textu s jednotkou, obdobím a zdrojem. Čtenář tak nemusí odhadovat význam z grafu. Pokud jde o odvozený údaj, uveďte, že je odvozený, a připojte vstupní definici."], bullets: ['hodnota', 'jednotka', 'období', 'zdroj', 'odvození'] }],
  },
  {
    id: 'g-rozpory-a-interpretace',
    sections: [{ heading: 'Závěr s mírou jistoty', paragraphs: ["U rozporu zvolte formulaci podle evidence: „zdroje uvádějí rozdílné hodnoty“, „rozdíl může souviset s metodou“ nebo „není možné rozhodnout“. Vyhněte se větě, která působí rozhodněji jen proto, že je kratší."], bullets: ['pozorování', 'možné vysvětlení', 'nejistota', 'další ověření'] }],
  },
  {
    id: 'g-evidence-map',
    sections: [{ heading: 'Připravenost mapy pro dalšího čtenáře', paragraphs: ["Předejte jeden ukázkový řádek, který vysvětluje význam všech sloupců. Pokud další člověk podle něj nedokáže najít oporu a pochopit stav, mapa není připravená k týmovému použití. Opravte schéma dříve, než přidáte další tvrzení."], bullets: ['ukázkový řádek', 'význam sloupců', 'dohledatelná opora', 'týmová čitelnost'] }],
  },
  {
    id: 'g-vice-dokumentu',
    sections: [{ heading: 'Konečný test briefu', paragraphs: ["Přečtěte brief člověku, který neviděl rešerši, a zeptejte se: jaké rozhodnutí podporuje, co je nejisté a co má udělat dál? Pokud odpověď není jasná, zkraťte úvod, přesuňte omezení výš nebo přidejte odkaz na rozhodující důkaz."], bullets: ['rozhodnutí', 'nejistota', 'další krok', 'důkaz'] }],
  },
];

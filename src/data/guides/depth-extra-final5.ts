import type { GuideDepthExtension } from './depth-extra';

export const depthExtraFinal5: GuideDepthExtension[] = [
  {
    id: 'g-overovat-odpovedi',
    sections: [{ heading: 'Přenos do běžného workflow', paragraphs: ["Kontrolní postup si zkraťte do šablony, kterou použijete při každém důležitém výstupu: otázka, zdroje, klíčová tvrzení, citace, mezery, schvalovatel a datum. Šablona nemá nahradit úsudek, ale brání tomu, aby se nejdůležitější kontrola ztratila pod tlakem času."], bullets: ['otázka', 'zdroje', 'tvrzení', 'citace', 'mezery', 'schvalovatel'] }],
  },
  {
    id: 'g-hallucinace-citace',
    sections: [{ heading: 'Krátká kontrola před odesláním', paragraphs: ["Před odesláním vyberte jednu větu s číslem, jednu s doporučením a jednu s obecným závěrem. U každé otevřete citaci a ověřte, zda formulace nepřesahuje zdroj. Tři různé typy tvrzení zachytí více rizik než opakovaná kontrola stejného detailu."], bullets: ['číslo', 'doporučení', 'obecný závěr', 'citace'] }],
  },
  {
    id: 'g-copyright',
    sections: [{ heading: 'Kopie a další nástroj', paragraphs: ["Pokud export posíláte do dalšího nástroje, posuďte znovu účel, příjemce a licenci. Převod formátu nebo nový prompt z cizího materiálu nevytváří nové oprávnění. Uložte rozhodnutí i pro tuto mezifázi, nejen pro původní notebook."], bullets: ['další nástroj', 'nový příjemce', 'nový účel', 'nové posouzení'] }],
  },
  {
    id: 'g-osobni-udaje',
    sections: [{ heading: 'Předání bez přebytečných detailů', paragraphs: ["Příjemci předejte pouze podklad nutný pro jeho roli. Učitel nepotřebuje osobní historii k úpravě instrukce a správce nepotřebuje celý pracovní list k ověření účtu. Menší balíček snižuje riziko omylu i rozsah případného incidentu."], bullets: ['role příjemce', 'nutný podklad', 'omezený export', 'kontrola'] }],
  },
  {
    id: 'g-cinematic-short',
    sections: [{ heading: 'Důkazní hranice v popisku', paragraphs: ["K videu přidejte krátký popisek, který uvádí zdroje, datum a omezení formátu. Popisek nesmí slibovat, že video obsahuje úplné vysvětlení, pokud slouží jen jako orientace. Divák tak dostane cestu k detailu dříve, než si vytvoří příliš silný závěr."], bullets: ['zdroje', 'datum', 'účel', 'omezení', 'další krok'] }],
  },
  {
    id: 'g-reports-data-tables',
    sections: [{ heading: 'Jedna věta k interpretaci', paragraphs: ["Za tabulku napište jednu větu, která říká, co data skutečně ukazují, a jednu větu, co z nich nelze vyvodit. Tento pár vět je jednoduchá ochrana proti tomu, aby vizuální trend převzal roli doporučení bez podmínek."], bullets: ['co data ukazují', 'co neukazují', 'podmínka'] }],
  },
  {
    id: 'g-rozpory-a-interpretace',
    sections: [{ heading: 'Otevřená otázka jako výstup', paragraphs: ["Pokud rozpor nelze vyřešit, formulujte jednu konkrétní otevřenou otázku a řekněte, jaký zdroj nebo měření by na ni odpovědělo. Tím se výzkumná práce posune dopředu bez předstírání, že konflikt zmizel."], bullets: ['otázka', 'potřebný zdroj', 'potřebné měření', 'vlastník'] }],
  },
  {
    id: 'g-evidence-map',
    sections: [{ heading: 'Mapa jako živý registr', paragraphs: ["Při každém přidání zdroje označte, zda přidal nové tvrzení, posílil oporu, vytvořil rozpor nebo nezměnil závěr. Tato čtyři rozhodnutí udrží mapu malou a čitelnou. Bez nich roste jen počet řádků, ne kvalita evidence."], bullets: ['nové tvrzení', 'silnější opora', 'rozpor', 'bez změny'] }],
  },
  {
    id: 'g-vice-dokumentu',
    sections: [{ heading: 'Co se vrací do další verze', paragraphs: ["Po rozhodnutí uložte, které tvrzení, riziko nebo otevřená otázka se má vrátit do další rešerše. Brief tak není jednorázová stránka, ale řídicí bod mezi zdroji, pilotem a další revizí."], bullets: ['tvrzení', 'riziko', 'otevřená otázka', 'další verze'] }],
  },
];

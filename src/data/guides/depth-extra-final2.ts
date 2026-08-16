import type { GuideDepthExtension } from './depth-extra';

export const depthExtraFinal2: GuideDepthExtension[] = [
  {
    id: 'g-overovat-odpovedi',
    sections: [
      { heading: 'Rozhodovací protokol po ověření', paragraphs: ["Po kontrole každé klíčové věty zvolte jednu akci: ponechat, zúžit, označit jako otevřenou, doplnit zdroj nebo odstranit. Akce musí být viditelná v revizní poznámce. Samotné přepsání textu bez důvodu nedokazuje, že se kvalita zlepšila.", "Učitel nebo pracovní vlastník si vybere nejrizikovější tvrzení a popíše, kdo jej smí schválit. Pokud schvalovatel nemá přístup k originálu, výstup se nepředává jako hotový. Ověření tedy končí nejen správnou větou, ale také jasnou odpovědností."], bullets: ['ponechat', 'zúžit', 'doplnit zdroj', 'odstranit', 'přiřadit schvalovatele'] },
    ],
  },
  {
    id: 'g-hallucinace-citace',
    sections: [
      { heading: 'Srovnání původní a opravené věty', paragraphs: ["Při revizi ponechte vedle sebe původní větu, citovaný úsek, nalezený problém a opravené znění. Čtenář tak vidí, zda šlo o doplněný detail, příliš širokou populaci, ztracenou výjimku nebo interpretaci vydávanou za fakt.", "Tento formát je vhodný i pro výuku mediální a informační gramotnosti. Žák se neučí pouze říct, že AI udělala chybu; učí se ukázat přesný rozdíl mezi evidencí a závěrem a navrhnout bezpečnější formulaci."], bullets: ['původní věta', 'citace', 'typ chyby', 'oprava', 'další ověření'] },
    ],
  },
  {
    id: 'g-copyright',
    sections: [
      { heading: 'Rozhodnutí o sdílení ve čtyřech stavech', paragraphs: ["Před zveřejněním si materiály rozdělte na schválené, povolené pouze interně, čekající na ověření a zakázané pro daný účel. Jen první stav může projít bez dalšího zásahu. Interní položka patří do omezeného pracovního prostoru, ne do veřejného notebooku.", "Když výstup kombinuje otevřený zdroj a licencovaný materiál, posuzujte celek i jednotlivé části. Přidejte původ do popisku a uchovejte rozhodnutí, proč byl zvolen daný rozsah. Při změně publika neberte staré rozhodnutí jako automaticky platné."], bullets: ['schválené', 'interní', 'čeká na ověření', 'zakázané'] },
    ],
  },
  {
    id: 'g-osobni-udaje',
    sections: [
      { heading: 'Minimální pracovní balíček', paragraphs: ["Pro návrh výukové úpravy si ponechte pouze cíl, anonymizovaný popis bariéry, původní instrukci a požadovaný formát. Vše ostatní je kandidát na odstranění. Pokud tým tvrdí, že potřebuje detail, napište konkrétní rozhodnutí, které bez něj nelze udělat.", "Při předání zkontrolujte, zda se citlivý údaj nevrátil v názvu souboru, komentáři, exportu nebo promptu. Bezpečnostní kontrola nekončí u zdroje; stejný filtr platí pro výsledek a všechny kopie."], bullets: ['cíl', 'bariéra bez diagnózy', 'instrukce', 'formát', 'kontrola kopií'] },
    ],
  },
  {
    id: 'g-video-overview',
    sections: [
      { heading: 'Přijetí nebo odmítnutí videa', paragraphs: ["Stanovte předem tři nepřijatelné chyby, například změněné číslo, chybějící výjimku a obraz odporující mapě. Pokud se některá objeví, video se nepublikuje pouze s kosmetickou opravou. Vraťte se ke zdroji, storyboardu nebo zvolte textový fallback.", "Při schválení uveďte rozsah kontroly: celý přepis, všechny scény, nebo jen vzorek. U vysokého dopadu nestačí vzorek. U orientačního materiálu může být vzorek přijatelný, pokud je omezení viditelné a video neslouží jako jediný zdroj."], bullets: ['nepřijatelné chyby', 'fallback', 'rozsah kontroly', 'schválení'] },
    ],
  },
  {
    id: 'g-cinematic-short',
    sections: [
      { heading: 'Filmový brief s důkazní hranicí', paragraphs: ["Brief rozdělte na faktickou vrstvu, tvůrčí vrstvu a zakázané domyšlení. Faktická vrstva obsahuje pouze tvrzení a podmínky ze zdrojů. Tvůrčí vrstva určuje tempo, perspektivu, scénu nebo emoci. Zakázané domyšlení chrání před tím, aby obraz vytvořil osobu, motiv nebo příčinu, kterou dokument neuvádí.", "Po vytvoření krátkého formátu si nechte vypsat všechna tvrzení, která divák může z videa odnést. Porovnejte je s faktickou vrstvou a označte přebytečnou jistotu. Pokud video potřebuje delší vysvětlení, přidejte textový zdroj nebo jej nahraďte storyboardem.", "U různých publik měňte rychlost, slovník a počet scén, ne hranici důkazu. Začátečník potřebuje méně pojmů, ne jinou pravdu. Odborník potřebuje odkazy a limity, ne pouze efektnější obraz."], bullets: ['faktická vrstva', 'tvůrčí vrstva', 'zakázané domyšlení', 'odvozená tvrzení', 'odkaz na detail'] },
    ],
  },
  {
    id: 'g-infografika',
    sections: [
      { heading: 'Prototyp, revize, publikace', paragraphs: ["Nejdřív vytvořte černobílý prototyp s textem a čísly. Teprve po ověření evidence řešte styl, barvu a layout. Tento postup oddělí věcnou chybu od designové chyby a usnadní opravu bez nového generování celého média.", "Při publikaci předejte obrázek spolu s textovým popisem, zdroji a datem. Pokud se vizuální výstup používá ve výuce, nabídněte i alternativní text nebo tabulku. Přístupnost není pouze doplněk; bez ní část publika nemůže kontrolovat stejnou informaci."], bullets: ['černobílý prototyp', 'ověření dat', 'design', 'alternativní text', 'datum'] },
    ],
  },
  {
    id: 'g-slide-deck',
    sections: [
      { heading: 'Revize po exportu', paragraphs: ["Po exportu zkontrolujte, zda se nezměnily zalomení, tabulky, poznámky, odkazy a citace. Prezentace se může lišit od náhledu v notebooku. U veřejného sdílení zkontrolujte také, zda export neobsahuje interní komentáře nebo neveřejný zdroj.", "Příjemce by měl poznat, které části jsou hlavní sdělení a kde najde detailní důkaz. Pokud musí otevřít pět odkazů, aby pochopil jeden slide, zkraťte nebo přeorganizujte argument."], bullets: ['export', 'zalomení', 'poznámky', 'citace', 'příjemce'] },
    ],
  },
  {
    id: 'g-reports-data-tables',
    sections: [
      { heading: 'Kritická buňka a rozhodnutí', paragraphs: ["Označte buňky, které vstupují do závěru nebo doporučení. U těch proveďte dvojí kontrolu: proti originálu a nezávislým výpočtem. Pokud je buňka odvozená, musí být vidět vstup i vzorec. Pokud je prázdná, nesmí se při exportu změnit na nulu.", "Report předávejte s krátkou definicí, co tabulka měří a co neměří. Tím chráníte čtenáře před tím, aby si strukturovaný formát spletl s úplnou databází."], bullets: ['kritická buňka', 'originál', 'vzorec', 'prázdná hodnota', 'omezení'] },
    ],
  },
  {
    id: 'g-test-a-kviz',
    sections: [
      { heading: 'Když položka nemá jednoznačný klíč', paragraphs: ["Položku neřešte pouze změnou správné odpovědi. Zkontrolujte, zda zadání skutečně požaduje jeden výsledek, zda zdroj používá stejnou definici a zda distractory neobsahují více obhajitelných možností. Někdy je správná oprava otázku odstranit.", "Při zpětné vazbě ukažte žákům zdroj a pravidlo, podle kterého byla odpověď hodnocena. Pokud se pravidlo změnilo po testu, vysvětlete změnu transparentně a upravte záznam bodování."], bullets: ['jedna odpověď', 'stejná definice', 'distractory', 'případné odstranění', 'transparentní oprava'] },
    ],
  },
  {
    id: 'g-diferenciace',
    sections: [
      { heading: 'Volba podle potřeby v daný den', paragraphs: ["Diferenciace nemusí být trvalé přiřazení. Připravte opory tak, aby je žák mohl využít podle aktuálního úkolu: slovník, otázky, tabulku, vzor první věty nebo možnost ústního vysvětlení. Učitel sleduje, zda volba pomáhá ukázat cíl, a může ji během práce změnit.", "Do materiálu napište, co je společné pro všechny a co je volitelné. Tím se vyhnete tomu, že různé formy budou vnímány jako různá hodnota žáka."], bullets: ['společný cíl', 'volitelná opora', 'změna během práce', 'stejná hodnota výkonu'] },
    ],
  },
  {
    id: 'g-porovnat-zdroje',
    sections: [
      { heading: 'Srovnání jako rozhodnutí o rozsahu', paragraphs: ["Některé srovnání potřebuje všechny zdroje, jiné může být reprezentativním vzorkem. Napište, proč byla sada zvolena a co by další dokument mohl změnit. Tím se vyhnete nekonečnému přidávání zdrojů bez změny otázky.", "U závěru označte, zda je platný pro celou sadu nebo pouze pro vybraný výřez. Vždy uveďte datum, protože webové podklady a statistiky se mohou měnit."], bullets: ['rozsah sady', 'vzorek', 'možný nový zdroj', 'datum'] },
    ],
  },
  {
    id: 'g-rozpory-a-interpretace',
    sections: [
      { heading: 'Rozpor jako výsledek, ne závada', paragraphs: ["Uveďte rozpor v závěru tak, aby byl čitelný bez původního chatu: které zdroje, jaká tvrzení, jaký typ rozdílu a jaké podmínky. Pokud není možné rozhodnout, napište další nejmenší měření nebo dokument, který by pomohl.", "Tento zápis chrání před falešným kompromisem. Někdy je přesnější doporučit další ověření než vytvořit průměr z hodnot, které měří něco jiného."], bullets: ['zdroje', 'tvrzení', 'typ rozdílu', 'další měření'] },
    ],
  },
  {
    id: 'g-evidence-map',
    sections: [
      { heading: 'Od mapy k rozhodnutí', paragraphs: ["Evidence map má hodnotu až tehdy, když pomůže vybrat další krok. U každého prioritního tvrzení přidejte akci: použít v briefu, ověřit v originálu, hledat další data nebo vyřadit. Nechte tým projít jen prioritní řádky a zdokumentujte, co bylo přijato.", "Při změně zdroje aktualizujte pouze dotčené řádky a přidejte stručný change log. Tak zachováte auditní stopu bez přepisování celé mapy."], bullets: ['akce', 'priorita', 'dotčený řádek', 'change log'] },
    ],
  },
  {
    id: 'g-vice-dokumentu',
    sections: [
      { heading: 'Pilotní doporučení místo definitivního verdiktu', paragraphs: ["Když evidence nestačí pro definitivní rozhodnutí, navrhněte omezený pilot s měřitelným cílem, časem, vlastníkem a pravidlem ukončení. Pilot není způsob, jak obejít slabé zdroje; je to transparentní další krok, pokud jsou rizika přijatelná.", "V briefu oddělte to, co pilot ověří, od toho, co zůstane mimo. Příjemce pak ví, jaká data bude potřeba vrátit do další verze notebooku."], bullets: ['cílový signál', 'čas', 'vlastník', 'pravidlo ukončení', 'mimo rozsah'] },
    ],
  },
  {
    id: 'g-flashcards-quizzes',
    sections: [
      { heading: 'Kdy sadu nepoužít', paragraphs: ["Sadu odložte, pokud jsou zdroje rozporné, klíčové pojmy ještě nemají stabilní definici nebo karty vyžadují aktuální údaj bez ověření. Procvičování nestabilního obsahu může upevnit chybu rychleji než běžné čtení."], bullets: ['stabilní zdroje', 'jasné definice', 'ověřený klíč', 'datum revize'] },
    ],
  },
  {
    id: 'g-pracovni-list',
    sections: [
      { heading: 'Odstranění prázdné otázky', paragraphs: ["Pokud otázka vyžaduje pouze opsat větu, nahraďte ji úkolem na výběr důkazu, vysvětlení vztahu nebo krátkou aplikaci. Zachovejte oporu ve zdroji a požadovaný čas. Jedna kvalitní otázka může nahradit tři podobné."], bullets: ['neopsat', 'vybrat důkaz', 'vysvětlit vztah', 'aplikovat'] },
    ],
  },
  {
    id: 'g-cizi-jazyk',
    sections: [
      { heading: 'Revize překladu s odborníkem', paragraphs: ["U kritického termínu nechte výstup zkontrolovat člověkem, který zná obor i cílový jazyk. Model může zachovat gramatiku a ztratit věcnou hranici. Opravený slovník připojte k verzi materiálu a používejte jej konzistentně v dalších otázkách."], bullets: ['obor', 'jazyk', 'kritický termín', 'verze slovníku'] },
    ],
  },
  {
    id: 'g-odborne-predmety',
    sections: [
      { heading: 'Zkouška na novém případě', paragraphs: ["Po vysvětlení termínu použijte nový, ale syntetický případ. Pokud student zopakuje definici, ale neumí rozhodnout, zda se postup hodí, výstup připravuje paměť, ne praxi. Přidejte kontrolní bod a hranici, kdy se má poradit."], bullets: ['nový případ', 'rozhodnutí', 'hranice postupu', 'eskalace'] },
    ],
  },
  {
    id: 'g-dlouhy-dokument',
    sections: [
      { heading: 'Kontrolní návrat k originálu', paragraphs: ["Před finálním briefem otevřete nejméně jedno místo z každé části, na které se závěr odvolává. Pokud se definice nebo výjimka liší, upravte brief a napište, že dokument není v tomto bodě jednoznačný."], bullets: ['každá část', 'definice', 'výjimka', 'opravený brief'] },
    ],
  },
  {
    id: 'g-exporty',
    sections: [
      { heading: 'Archivní kontrola po čase', paragraphs: ["Při plánované revizi porovnejte aktuální zdroje se source-logem a zkontrolujte, zda se nezměnil účel, příjemce nebo licence. Pokud ano, starý export označte jako historický a vytvořte novou schválenou kopii s vlastním datem."], bullets: ['zdroje', 'účel', 'příjemce', 'licence', 'nová verze'] },
    ],
  },
];

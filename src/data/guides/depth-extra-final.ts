import type { GuideDepthExtension } from './depth-extra';

export const depthExtraFinal: GuideDepthExtension[] = [
  {
    id: 'g-citace-a-overeni',
    sections: [
      { heading: 'Auditní vzorek s opačným čtením', paragraphs: ["Po běžné kontrole si vyberte tvrzení, které se zdá nejpřesvědčivější, a zkuste je vyvrátit. Hledejte v citovaném místě podmínku, menší populaci, jinou časovou osu nebo výjimku. Tato opačná otázka často odhalí problém, který kontrola shody přehlédla.", "Výsledek zapište ve třech větách: co říká zdroj, co tvrdí návrh a jak se návrh upraví. Takový záznam je užitečný při předání i při další iteraci, protože nezaměňuje opravu formulace za nový důkaz."], bullets: ['nejpřesvědčivější tvrzení', 'možná výjimka', 'opravená formulace', 'nový důkaz nebo přiznaná mezera'] },
    ],
  },
  {
    id: 'g-priprava-hodiny',
    sections: [
      { heading: 'Kontrola proveditelnosti ve třech rolích', paragraphs: ["Plán si přečtěte jako učitel, žák a pozorovatel. Učitel potřebuje vědět, co říct a připravit. Žák potřebuje pochopit první krok bez skrytého předpokladu. Pozorovatel potřebuje poznat, jaký důkaz ukáže postup. Pokud jedna role selže, upravte konkrétní část plánu, ne celý cíl.", "Uveďte také, co dělat při kratším čase nebo chybějící pomůcce. Záložní varianta nesmí být pouze „udělejte pracovní list“; musí zachovat podstatný důkaz porozumění a popsat, co učitel vyřadí."], bullets: ['učitel: instrukce a pomůcky', 'žák: první krok', 'pozorovatel: důkaz', 'fallback: zachovaný cíl'] },
    ],
  },
  {
    id: 'g-test-a-kviz',
    sections: [
      { heading: 'Analýza položky po pilotu', paragraphs: ["U každé problematické otázky rozlište, zda selhala znalost, instrukce, klíč nebo rozsah. Nechte si k otázce vypsat zdroj, cíl, očekávanou odpověď a možné obhajitelné alternativy. Pokud jsou dvě, položku přepište nebo přiznejte více odpovědí v klíči.", "Po opravě porovnejte původní a novou obtížnost. Neodstraňujte všechny chyby žáků; odstraňte chyby, které vznikají kvůli špatnému zadání. Výsledky testu pak interpretujte společně s cílem a s podmínkami jeho zadání."], bullets: ['typ chyby', 'zdroj a cíl', 'alternativní odpověď', 'změna po revizi'] },
      { heading: 'Transparentní komunikace', paragraphs: ["Před testem žákům vysvětlete scope, typ úloh a způsob bodování. Po testu jim u sporné otázky ukažte důvod opravy nebo přiznané více řešení. Tím se hodnocení nestane neprůhledným výstupem AI."], bullets: ['scope', 'rubrika', 'sporné položky', 'zpětná vazba'] },
    ],
  },
  {
    id: 'g-spu',
    sections: [
      { heading: 'Kontrola stejných šancí, ne stejného vzhledu', paragraphs: ["Dvě přístupné verze nemusí vypadat stejně. Kontrolujte, zda obě dávají reálnou možnost ukázat stejný výkon, nikoli zda mají stejný počet řádků nebo stejnou grafiku. U úkolu s psaním se ptejte, zda změna formy zachovává schopnost vysvětlit pojem, pokud je to skutečný cíl.", "Před použitím odstraňte instrukce, které pouze zvyšují kognitivní zátěž, a ponechte ty, které nesou obsah. Tuto hranici si zapište, aby pozdější úprava nepřinesla nechtěné zjednodušení."], bullets: ['stejný výkon', 'odstraněná bariéra', 'zachovaný obsah', 'schválený kontext'] },
      { heading: 'Reálný případ až po schválení', paragraphs: ["Modelový případ je vhodný pro návrh. Teprve po schválení účtu a procesu zvažujte práci s reálným materiálem. I tehdy minimalizujte údaje a kontrolujte, zda výstup neobsahuje osobní příběh nebo diagnózu, kterou pro pedagogický úkol nepotřebujete."], bullets: ['nejprve modelovat', 'potom schválit', 'minimalizovat', 'ručně revidovat'] },
    ],
  },
  {
    id: 'g-diferenciace',
    sections: [
      { heading: 'Kdy podporu ubrat a kdy ji ponechat', paragraphs: ["Rozhodnutí opírejte o pozorovaný výkon a cíl, ne o předpokládanou schopnost skupiny. Pokud žák zvládne první krok bez tabulky, může pokračovat s menší oporou. Pokud podpora odstranila pouze jazykovou překážku, není důvod ji odebrat jen kvůli vzhledu práce.", "Notebook může navrhnout postupné uvolňování, ale učitel sleduje konkrétní reakci. Zapište, jaký signál vedl ke změně a zda žák dokázal vysvětlit rozhodnutí vlastním způsobem."], bullets: ['pozorovaný signál', 'cílový výkon', 'změna podpory', 'zpětná vazba žáka'] },
      { heading: 'Předání bez pevných skupin', paragraphs: ["V dokumentu popište varianty podle typu opory, nikoli podle názvu skupiny nebo diagnózy. To umožňuje učiteli nabídnout stejnou strategii více žákům a měnit ji podle situace."], bullets: ['opora podle potřeby', 'volba žáka', 'průběžná změna', 'žádný pevný profil'] },
    ],
  },
  {
    id: 'g-audio-overview',
    sections: [
      { heading: 'Kontrolní scénář pro odborné audio', paragraphs: ["U tématu s více výjimkami požádejte nejdřív o textový scénář a teprve potom o audio. Ve scénáři označte tvrzení, zdroj a místo, kde se vysvětluje podmínka. Po vygenerování zkontrolujte stejná místa v přepisu. Pokud se změnila věta, opravte scénář, ne pouze hlasitost nebo tempo.", "U dialogu sledujte, zda střídání mluvčích neudělá z nejistoty falešný konsenzus. Jeden hlas může klást otázku a druhý může odpovídat, ale oba musí pracovat se stejnou sadou zdrojů. Debata není důkaz, že existují dvě rovnocenné pozice."], bullets: ['textový scénář', 'tvrzení a zdroj', 'přepis po generování', 'jasná míra jistoty'] },
      { heading: 'Test posluchače', paragraphs: ["Nechte člověka, který nevidí notebook, vypsat tři tvrzení a jednu otevřenou otázku po poslechu. Pokud nedokáže najít zdroj nebo zamění příklad za fakt, audio potřebuje úpravu. Tato kontrola je praktičtější než jen kontrola, zda se soubor přehrává."], bullets: ['tři tvrzení', 'jedna mezera', 'zdroj', 'další krok'] },
    ],
  },
  {
    id: 'g-video-overview',
    sections: [
      { heading: 'Storyboard před generováním', paragraphs: ["Vytvořte storyboard s časem, obrazem, hlasem, tvrzením a zdrojem pro každou scénu. U scény, která nemá jednoznačnou vizuální oporu, použijte text nebo neutrální schéma. Filmový obraz nesmí doplnit událost, osobu nebo příčinu jen proto, že se hodí do příběhu.", "Po renderu porovnejte storyboard se skutečným výsledkem. Pokud nástroj změnil pořadí nebo vynechal scénu, upravte video brief a označte verzi. Nepřepisujte výstup jako „podle zdrojů“ bez kontroly všech vrstev."], bullets: ['čas scén', 'vizuální opora', 'hlas a titulky', 'verze po renderu'] },
      { heading: 'Test bez zvuku a bez obrazu', paragraphs: ["Pusťte video jednou bez zvuku a jednou poslouchejte bez obrazovky. Obě verze by měly být omezené, ale neměly by si odporovat. Rozpor ukazuje, že obraz nebo mluvený text převzal jiný význam než zdroj."], bullets: ['bez zvuku', 'bez obrazu', 'vzájemná shoda', 'oprava briefu'] },
    ],
  },
  {
    id: 'g-cinematic-short',
    sections: [
      { heading: 'Kritérium pro odmítnutí filmového stylu', paragraphs: ["Cinematic styl odmítněte, když vizuální metafora mění časovou osu, osobu, míru nebo příčinu. Krátké video může fungovat jako pozvánka ke zdroji, ale nesmí být jediným vysvětlením tématu, které vyžaduje definice a výjimky.", "Předem si napište, co divák po zhlédnutí smí říct a co ještě říct nesmí. Po renderu tento test zopakujte s člověkem, který zdroje neviděl."], bullets: ['povolený závěr', 'zakázaný závěr', 'vizuální metafora', 'test diváka'] },
      { heading: 'Dvě verze pro různé publikum', paragraphs: ["Pro začátečníka zkraťte počet pojmů, ne podmínky. Pro odbornější publikum můžete přidat odkaz na detailní zdroj nebo metodickou poznámku, ale nevyřešíte tím špatně ověřený obraz. Publikum mění formu, nikoli důkaz."], bullets: ['počet pojmů', 'zachované podmínky', 'odkaz na detail', 'ověření'] },
    ],
  },
  {
    id: 'g-infografika',
    sections: [
      { heading: 'Kontrola vizuálního zkreslení', paragraphs: ["Změřte, zda rozdíl v grafu odpovídá rozdílu v datech. Zkontrolujte začátek osy, pořadí kategorií, zaokrouhlení a barevnou intenzitu. Vizuální váha může převážit nad číslem a vytvořit tvrzení, které text nikdy neřekl.", "U infografiky s více zdroji přidejte krátkou poznámku, kde se definice liší. Pokud se vysvětlení nevejde, odkažte na report nebo tabulku místo odstranění výjimky."], bullets: ['osa', 'měřítko', 'barva', 'definice', 'odkaz na detail'] },
      { heading: 'Příjemce a verze', paragraphs: ["Ověřte infografiku na zařízení, které používá publikum. Předejte také textový přepis dat a zdrojů; obrazová kopie bez něj se špatně opravuje. Při aktualizaci změňte číslo verze i datum."], bullets: ['cílové zařízení', 'textový podklad', 'zdroje', 'verze'] },
    ],
  },
  {
    id: 'g-slide-deck',
    sections: [
      { heading: 'Argumentová linie a slepé místo', paragraphs: ["Seřaďte slidy jako tvrzení, důkaz, výklad, omezení a další krok. Pokud po slidu s důkazem následuje závěr bez podmínky, doplňte ji nebo zkraťte závěr. Při revizi se ptejte, který zdroj by publikum mělo otevřít, kdyby nesouhlasilo.", "Nenechávejte citace pouze v poznámkách, pokud je publikum potřebuje pro rozhodnutí. Zároveň nezaplavujte slidy bibliografií; použijte krátký odkaz a předejte detailní source log zvlášť."], bullets: ['tvrzení', 'důkaz', 'omezení', 'další krok', 'zdroj pro oponenturu'] },
      { heading: 'Přednáška jako zkouška', paragraphs: ["Nahrajte si nebo nahlas projděte úvod, hlavní přechody a závěr. Pokud bez čtení nedokážete vysvětlit, proč je závěr oprávněný, problém není v animaci. Upravte argument nebo zdrojový brief."], bullets: ['mluvený průchod', 'přechody', 'závěr', 'zdrojový brief'] },
    ],
  },
  {
    id: 'g-flashcards-quizzes',
    sections: [
      { heading: 'Prostor pro chybu a návrat ke zdroji', paragraphs: ["Předem určete, co má student udělat po chybě: přečíst citované místo, napsat vlastní příklad nebo porovnat dvě definice. Bez dalšího kroku se kvíz mění v počítadlo bodů. U učitele oddělte diagnostickou informaci od klasifikace.", "Po několika kolech vyřaďte kartu, která se opakuje nebo vyžaduje formulaci přesně jako ve zdroji, i když chápe jinou správnou odpověď. Cílem je porozumění a dohledatelný návrat k evidenci."], bullets: ['reakce na chybu', 'návrat ke zdroji', 'vlastní příklad', 'revize karty'] },
    ],
  },
  {
    id: 'g-reports-data-tables',
    sections: [
      { heading: 'Kontrola citlivých hodnot', paragraphs: ["U hodnot, které mění doporučení, proveďte ruční výpočet nezávisle na textu reportu. Zkontrolujte i nulu, zápornou hodnotu, prázdné pole a zaokrouhlení. Model může zachovat správný formát a přesto posunout hodnotu nebo jednotku.", "Pokud report používá odhad, napište zdroj předpokladu a rozsah nejistoty, pokud jej dokument poskytuje. Nezaměňujte prázdnou hodnotu za nulu ani historický údaj za aktuální."], bullets: ['kritická hodnota', 'nezávislý výpočet', 'prázdno versus nula', 'datum'] },
    ],
  },
  {
    id: 'g-porovnat-zdroje',
    sections: [
      { heading: 'Robustnost závěru', paragraphs: ["Označte, zda závěr stojí na jednom primárním zdroji, na shodě více zdrojů, nebo na syntéze různých typů evidence. Při shodě se ptejte, zda nejsou zdroje závislé na stejném původním tvrzení. Dva články opakující stejnou tabulku nejsou dvě nezávislá měření.", "U závěru napište, co by se muselo změnit, aby přestal platit. Tato věta je praktická pro další revizi i pro čtenáře, který má jiné podklady."], bullets: ['závislost zdrojů', 'typ evidence', 'podmínka změny', 'datum dalšího ověření'] },
    ],
  },
  {
    id: 'g-rozpory-a-interpretace',
    sections: [
      { heading: 'Příčina, mechanismus a názor', paragraphs: ["Ve výsledku oddělte empirický rozdíl, možný mechanismus a názor autora. Zdroj může uvádět rozdíl, ale nemusí vysvětlovat jeho příčinu. Komentář může nabídnout mechanismus, ale nemusí jej testovat. Tři vrstvy nespojujte do jedné věty bez označení.", "Při veřejném nebo školním sdílení ponechte krátký odstavec „co nevíme“. Pomáhá zabránit tomu, aby čtenář převzal hypotézu jako fakt jen proto, že je jediným příběhem v závěru."], bullets: ['rozdíl', 'mechanismus', 'názor', 'co nevíme'] },
    ],
  },
  {
    id: 'g-evidence-map',
    sections: [
      { heading: 'Kvalita řádku evidence mapy', paragraphs: ["Kvalitní řádek umožní jinému člověku najít tvrzení, přečíst oporu, pochopit míru odvození a zjistit další krok. Pokud některé pole chybí, nevyplňujte jej obecnou větou. Použijte „nenalezeno“, „neověřeno“ nebo „mimo rozsah“.", "Při týmové práci si určete vlastníka řádku, nikoli pouze vlastníka celého dokumentu. Změna jednoho zdroje pak má jasnou cestu k revizi."], bullets: ['tvrzení', 'opora', 'odvození', 'stav', 'vlastník'] },
    ],
  },
  {
    id: 'g-dlouhy-dokument',
    sections: [
      { heading: 'Kapitola, příloha a definice', paragraphs: ["U dlouhého dokumentu evidujte, zda citace pochází z hlavního textu, poznámky nebo přílohy. Stejný pojem může mít v úvodu pracovní význam a v metodice přesnou definici. Pokud se liší, závěr musí říct, kterou definici používá.", "Požádejte o seznam částí, které notebook nepoužil. Je to užitečný signál, že shrnutí může být vyvážené pouze zdánlivě."], bullets: ['část dokumentu', 'definice', 'nepoužité části', 'dopad na závěr'] },
    ],
  },
  {
    id: 'g-vice-dokumentu',
    sections: [
      { heading: 'Rozhodnutí jako hypotéza', paragraphs: ["Research brief neuzavírejte slovem doporučujeme bez podmínky. Napište doporučení jako hypotézu: „Pokud platí A a B, dává smysl pilot C; sledujte D a při E postup upravte.“ Tato forma přirozeně oddělí evidence, implementaci a řízení rizika.", "Před předáním si vyberte jeden zdroj, který by doporučení mohl oslabit, a uveďte jej. Brief pak nepůsobí jako výběr pouze potvrzujících podkladů."], bullets: ['předpoklad', 'pilot', 'signál', 'reakce na riziko', 'protiargument'] },
    ],
  },
  {
    id: 'g-overovat-odpovedi',
    sections: [
      { heading: 'Důkaz negativního výsledku', paragraphs: ["Ověření není jen potvrzení správných vět. Zapište také, které očekávané tvrzení se ve zdrojích nepotvrdilo, která citace byla příliš slabá a co jste proto z textu odstranili. Tato negativní stopa vysvětluje, proč je finální odpověď kratší než původní návrh.", "U kritického výstupu si ponechte seznam neověřených položek a rozhodněte, zda je má ověřit jiný člověk, novější zdroj, nebo se nemají použít vůbec."], bullets: ['odstraněné tvrzení', 'slabá citace', 'neověřená položka', 'rozhodnutí'] },
    ],
  },
  {
    id: 'g-hallucinace-citace',
    sections: [
      { heading: 'Korekce bez přepisování důkazu', paragraphs: ["Když najdete příliš silné tvrzení, neopravujte jej přidáním dalšího sebevědomého odstavce. Zachovejte původní citaci, zmenšete závěr a napište, jaké další evidence by byla potřeba pro širší claim. Tím je oprava auditovatelná.", "Učitel může tento rozdíl použít ve výuce: žáci označí slova jako všichni, vždy, dokazuje a nejlepší a hledají, zda je zdroj skutečně podporuje."], bullets: ['původní citace', 'užší claim', 'chybějící evidence', 'jazyk jistoty'] },
    ],
  },
  {
    id: 'g-copyright',
    sections: [
      { heading: 'Nejmenší nutná kopie', paragraphs: ["Před nahráním si vyznačte přesný rozsah, který potřebujete. Pokud potřebujete definici a dvě tabulky, vyřaďte zbytek kapitoly. Uchovejte odkaz na původní dokument a nepředávejte výňatek mimo účel, pro který byl zvolen.", "U veřejného artefaktu zkontrolujte, zda výstup nepřevzal více textu nebo vizuálů, než jste zamýšleli. Když ano, zkraťte jej, nahraďte zdroj otevřeným materiálem nebo zastavte sdílení."], bullets: ['potřebný rozsah', 'původ', 'účel', 'kontrola kopie'] },
    ],
  },
  {
    id: 'g-osobni-udaje',
    sections: [
      { heading: 'Modelový případ versus skutečný záznam', paragraphs: ["V promptu si explicitně označte, zda pracujete s modelem. Například „role: žák, bariéra: dlouhá instrukce, cíl: rozdělit do kroků“ je obecný případ; „žák 7.B, datum, diagnóza“ je reálný záznam. Tyto režimy nesmí splývat v jednom notebooku nebo exportu.", "Při předání vynechte údaje, které příjemce nepotřebuje k pedagogickému rozhodnutí. Minimalizace pokračuje i po vytvoření výstupu."], bullets: ['označený modelový případ', 'oddělený reálný proces', 'minimální příjemce', 'kontrola exportu'] },
    ],
  },
  {
    id: 'g-exporty',
    sections: [
      { heading: 'Change log místo nové kopie bez vysvětlení', paragraphs: ["Ke každé nové verzi napište jednu až tři změny: nový zdroj, opravené tvrzení, změněný příjemce nebo jiný účel. Pokud se nic věcného nezměnilo, nevytvářejte kopie jen kvůli jiné formulaci názvu.", "Při předání označte, která verze je aktuální a kdy bude znovu ověřena. Historické kopie ponechte pouze tehdy, když je potřebujete pro dohledatelnost a jsou správně chráněné."], bullets: ['verze', 'důvod změny', 'aktuální kopie', 'další revize'] },
      { heading: 'Export jako nový kontrolní bod', paragraphs: ["Po exportu proveďte stejnou kontrolu jako po generování: tvrzení, citace, příjemce a omezení. Export může změnit zalomení, skrýt poznámku nebo zlomit odkaz. Teprve otevřený soubor je předatelný."], bullets: ['tvrzení', 'citace', 'příjemce', 'omezení'] },
    ],
  },
  {
    id: 'g-pracovni-list',
    sections: [
      { heading: 'Převod otázky na důkaz', paragraphs: ["U každé otázky doplňte větu „poznám, že žák rozumí, když…“. Pokud odpověď pouze zopakuje slovo ze zdroje, změňte ji na vysvětlení, příklad nebo práci s důkazem. Tento krok zvyšuje hodnotu listu bez přidávání dalších položek."], bullets: ['otázka', 'důkaz', 'kritérium', 'revize'] },
    ],
  },
  {
    id: 'g-cizi-jazyk',
    sections: [
      { heading: 'Úroveň jazyka a odborná přesnost', paragraphs: ["Zkontrolujte zvlášť jednoduchost věty a přesnost termínu. Zjednodušená věta nesmí odstranit podmínku, která je pro odborný význam nutná. U jazykové výuky ukažte studentům i původní větu a vysvětlete, proč byl zvolen daný překlad."], bullets: ['srozumitelnost', 'přesnost', 'podmínka', 'zdroj'] },
    ],
  },
  {
    id: 'g-odborne-predmety',
    sections: [
      { heading: 'Kontrola hranice mezi výukou a provozem', paragraphs: ["Výukový příklad může být zjednodušený, provozní návod nesmí skrýt výjimky. Označte, zda materiál slouží k procvičení, nebo k reálnému rozhodnutí. U druhého typu přidejte aktuální primární zdroj a povinnou lidskou kontrolu."], bullets: ['výukový příklad', 'provozní postup', 'aktuální pravidlo', 'schvalovatel'] },
    ],
  },
  {
    id: 'g-dlouhy-dokument',
    sections: [
      { heading: 'Krátký brief, úplná stopa', paragraphs: ["Udržujte hlavní brief krátký, ale připojte mapu kapitol a neověřené otázky. Čtenář tak dostane rychlé rozhodnutí i cestu k detailu. Pokud je v briefu důležitý číselný závěr, odkazujte na tabulku a metodiku, ne pouze na kapitolu."], bullets: ['brief', 'mapa', 'metodika', 'neověřená otázka'] },
    ],
  },
];

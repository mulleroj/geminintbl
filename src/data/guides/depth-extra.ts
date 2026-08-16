import type { GuideSection } from '../../schemas';

export interface GuideDepthExtension {
  id: string;
  sections: GuideSection[];
}

export const depthExtra: GuideDepthExtension[] = [
  {
    id: 'g-co-je-gemini-notebook',
    sections: [
      { heading: 'Rozhodovací tabulka před prací', paragraphs: ["Když váháte mezi notebookem a běžným chatem, položte si tři otázky: mám vlastní zdroje, potřebuji dohledatelné opory a bude výstup navazovat na další artefakt? Tři odpovědi ano obvykle znamenají notebook. Pokud chcete pouze nápady bez podkladů, začněte jinde a notebook založte až ve chvíli, kdy máte materiál a účel.", "Po skončení prvního kola si napište, zda notebook skutečně pomohl: zkrátil hledání, zpřehlednil rozpory nebo umožnil opakovaně použít zdroje. Pokud ne, změňte rozsah nebo nástroj, ne pouze barvu a formát výstupu."], bullets: ['Notebook pro zdrojově ukotvenou práci.', 'Chat pro otevřenou ideaci.', 'Primární zdroj pro rozhodující fakt.', 'Člověk pro schválení výsledku.'] },
      { heading: 'Předání výsledku', paragraphs: ["Předávejte otázku, seznam zdrojů, datum ověření a omezení spolu s výstupem. Příjemce tak pozná, zda čte pracovní návrh, výukovou pomůcku nebo schválený materiál. Když se mění účet nebo sdílení, proveďte kontrolu znovu; nastavení a dostupnost funkcí nejsou univerzální pro všechny kontexty."], bullets: ['účel a stav', 'zdroje a datum', 'kontrolní otázka', 'vlastník další revize'] },
    ],
  },
  {
    id: 'g-prvni-notebook',
    sections: [
      { heading: 'Druhý průchod: co se změnilo?', paragraphs: ["Po první odpovědi neimportujte další zdroj automaticky. Nejprve si označte větu, která je nejasná, neúplná nebo důležitá pro výsledek. Nový dokument přidejte jen tehdy, když má tuto mezeru vyřešit. Potom položte stejnou otázku před a po importu a uložte rozdíl.", "Tento postup funguje i při spolupráci: další člověk vidí, proč byl zdroj přidán a co změnil. Pokud se změnil pouze tón, nikoli důkaz, není to věcný posun. V poznámce rozlište změnu zdrojů od změny promptu."], bullets: ['původní otázka', 'důvod nového zdroje', 'rozdíl odpovědi', 'rozhodnutí o verzi'] },
      { heading: 'Předání a uzavření prvního kola', paragraphs: ["První kolo uzavřete malou sadou: název notebooku, účel, zdroje, jedna ověřená citace a jedna přiznaná mezera. Pokud to neumíte předat za několik minut, projekt je pravděpodobně příliš široký. Teprve po tomto uzavření vytvářejte audio, kvíz nebo prezentaci."], bullets: ['Předávám pracovní návrh, ne hotovou pravdu.', 'Vím, kde je opora.', 'Vím, co se musí ověřit později.'] },
    ],
  },
  {
    id: 'g-kvalitni-zdroje',
    sections: [
      { heading: 'Záznam výběru zdrojů', paragraphs: ["U výzkumné nebo školní práce si veďte jednoduchý source log. Kromě URL obsahuje důvod zařazení, důvod vyřazení, datum přístupu a vztah k otázce. Vyřazený zdroj není ztráta času: může ukázat, že byl příliš obecný, zastaralý nebo metodicky mimo.", "Po vytvoření odpovědi porovnejte hlavní závěr se source logem. Pokud se objeví tvrzení, ke kterému nemá žádný zdroj jasnou roli, vraťte se k výběru. Tím zabráníte, aby se do textu nenápadně dostal obsah z kontextového článku."], bullets: ['zařazený zdroj a role', 'vyřazený zdroj a důvod', 'datum a verze', 'mezera bez zdroje'] },
      { heading: 'Kdy stačí přiznat neznalost', paragraphs: ["Někdy je správný výsledek „v dostupných podkladech to není“. Nový zdroj přidávejte pouze tehdy, když je otázka důležitá a dokument je dostupný, oprávněný a metodicky vhodný. Náhodné rozšiřování sady zvyšuje počet rozporů bez zvýšení kvality."], bullets: ['Nový zdroj má konkrétní účel.', 'Jeho metoda je čitelná.', 'Přínos převyšuje nový šum.'] },
    ],
  },
  {
    id: 'g-pridavani-zdroju',
    sections: [
      { heading: 'Předání importovaného zdroje', paragraphs: ["Po úspěšném importu si uložte název, typ, původ a datum. U živého Drive dokumentu poznamenejte, že se může měnit. U kopírovaného textu přidejte kontext před a po výňatku, jinak bude pozdější citace působit přesněji, než ve skutečnosti je."], bullets: ['typ a verze', 'původ a práva', 'testovací citace'] },
    ],
  },
  {
    id: 'g-zdroj-nejde-nacist',
    sections: [
      { heading: 'Eskalace podle dopadu', paragraphs: ["U nízkorizikového studijního výstupu lze použít oprávněný fallback a jasně jej označit. U rozhodujícího čísla, školního pravidla nebo bezpečnostního údaje se nezastavujte u náhradního výňatku: dohledatelný originál musí projít ruční kontrolou. Rozdíl mezi „nepodařilo se načíst“ a „ověřil jsem alternativní zdroj“ napište do výsledku.", "Při opakovaném selhání si vyžádejte přesný typ dokumentu, textovou vrstvu nebo export od vlastníka. Neobcházejte technickou nebo přístupovou překážku stahováním materiálu bez oprávnění. Když zdroj zůstane mimo, upravte otázku tak, aby jeho absenci respektovala."], bullets: ['nízký dopad: označený fallback', 'střední dopad: druhý ověřený zdroj', 'vysoký dopad: ruční kontrola originálu', 'nejasný přístup: zastavit a ověřit práva'] },
      { heading: 'Protokol opravy', paragraphs: ["Uložte původní chybu, jednu provedenou změnu a výsledek testovací otázky. Tento krátký protokol je užitečnější než tvrzení, že import „funguje“. Pokud se problém týká aktuálního produktu, ověřte také účet, region a typ zdroje v oficiální nápovědě."], bullets: ['chyba', 'změna', 'nový test', 'omezení'] },
    ],
  },
  {
    id: 'g-citace-a-overeni',
    sections: [
      { heading: 'Kalibrovaná jistota v textu', paragraphs: ["V protokolu si u každého tvrzení zvolte jednoduchý stav: potvrzené v jednom zdroji, potvrzené ve více nezávislých zdrojích, odvozené, sporné nebo nenalezené. Stav není matematické skóre a nesmí nahrazovat úsudek. Pomáhá ale upravit sloveso a rozhodnout, zda tvrzení patří do závěru.", "Přímé tvrzení může říkat „zdroj uvádí“. Syntéza může říkat „z těchto míst lze odvodit“. U interpretace napište „jedna možná interpretace“. U nenalezeného tvrzení řekněte „v dostupných zdrojích nebylo potvrzeno“. Tato drobná změna chrání čtenáře před falešnou jistotou."], bullets: ['potvrzené', 'odvozené', 'sporné', 'nenalezené'] },
      { heading: 'Předání auditu druhému čtenáři', paragraphs: ["Druhému čtenáři nedávejte pouze finální text. Přidejte seznam pěti nejdůležitějších tvrzení, citace a otázku „co by zde mohlo být příliš silné?“. Jeho úkolem není znovu prověřit celý svět, ale zkontrolovat vztah mezi formulací a oporou.", "Pokud se čtenáři neshodnou, zachovejte spor v poznámce a uveďte, kdo rozhodnutí schválil. Při aktualizaci zdrojů zopakujte kontrolu pouze u tvrzení, kterých se změna týká, ale zaznamenejte rozsah revize."], bullets: ['výběr podle dopadu', 'přesná citace', 'otázka pro kritika', 'datum a schvalovatel'] },
      { heading: 'Reprodukční test', paragraphs: ["Za týden zkuste podle uložené otázky, zdrojů a verze promptu dojít ke stejnému tvrzení. Pokud to nejde, záznam je příliš vágní nebo se změnil zdroj. Reprodukce neznamená, že model vrátí stejnou větu; znamená, že další člověk najde stejnou evidenci a pochopí stejné omezení."], bullets: ['stejná otázka', 'stejná verze zdrojů', 'stejná opora', 'viditelná změna'] },
    ],
  },
  {
    id: 'g-priprava-hodiny',
    sections: [
      { heading: 'Druhý průchod: z návrhu do třídy', paragraphs: ["Po vygenerování plánu si vyberte jednu aktivitu a proveďte její suchý běh. Kolik minut zabere vysvětlení, rozdání, práce a reflexe? Který krok může zdržet celou třídu? Požádejte notebook o alternativu, ale porovnejte ji podle stejného cíle a důkazu, ne podle atraktivního jazyka.", "Zkontrolujte také přechody mezi aktivitami. Žák může rozumět obsahu, ale selhat kvůli nejasnému přesunu od čtení k tabulce nebo od poslechu k argumentu. Do plánu doplňte jednu větu, která popíše, co má učitel během práce pozorovat."], bullets: ['časový běh', 'přechod mezi kroky', 'pozorovatelný důkaz', 'záchranná varianta'] },
      { heading: 'Reflexe po hodině', paragraphs: ["Po použití si neukládejte pouze „fungovalo/nefungovalo“. Zapište, která otázka odhalila porozumění, kde vznikl omyl a zda podpora pomohla bez snížení cíle. Tuto poznámku použijte při další revizi zdrojů a promptu. Je to učitelská zkušenost, ne automatický závěr systému."], bullets: ['co žáci skutečně udělali', 'kde potřebovali pomoc', 'co změnit příště'] },
    ],
  },
  {
    id: 'g-pracovni-list',
    sections: [
      { heading: 'Test listu jako žák a jako hodnotitel', paragraphs: ["Přečtěte instrukce bez učebnice a zkontrolujte, zda přesně říkají, co má žák hledat, napsat nebo vysvětlit. Potom vezměte zdroje a ověřte, zda existuje očekávaná odpověď a zda není možné získat body bez práce s obsahem. Dva krátké testy odhalí více než další generování otázek.", "U otevřených úloh doplňte příklad odpovědi pouze pro učitele. Žákovská verze má mít prostor pro vlastní práci. Pokud list obsahuje graf nebo obrázek, ověřte jeho rozlišení, legendu a vazbu na otázku i na mobilním náhledu."], bullets: ['instrukce bez domýšlení', 'opora v podkladu', 'jednoznačná odpověď', 'čitelnost'] },
      { heading: 'Předání a revize', paragraphs: ["Uložte verzi listu, zdroje a krátkou poznámku o tom, co bylo upraveno. Po první hodině vyřaďte položky, které neměřily zamýšlený cíl, a ponechte si důvod. Tak se knihovna pracovních listů nestane sbírkou generických šablon."], bullets: ['verze', 'zdroje', 'úprava po použití'] },
    ],
  },
  {
    id: 'g-test-a-kviz',
    sections: [
      { heading: 'Pilotní kontrola před ostrým testem', paragraphs: ["Před zadáním požádejte druhého učitele nebo malý bezpečný vzorek o přečtení otázek. Nechte je označit nejednoznačnost, předpokládanou znalost mimo scope, zbytečnou jazykovou zátěž a více možných klíčů. U položky, která má být snadná, zkontrolujte, zda není pouze nápadná podle délky nebo gramatiky distractoru.", "Výsledky pilotu nepoužívejte jako automatické nastavení známek. Použijte je k opravě položek a blueprintu. Pokud test ukáže, že se žáci učili jiný obsah, je to informace o návrhu výuky, nikoli jen o jejich výkonu."], bullets: ['scope pilotu', 'jednoznačnost', 'jazyk', 'klíč a distractory', 'úprava blueprintu'] },
      { heading: 'Předání klíče a záznamu', paragraphs: ["Oddělte žákovský test, učitelský klíč a interní poznámku. V klíči uvádějte zdrojovou oporu a pravidlo pro částečné body. V interní poznámce evidujte, co bylo ověřeno ručně a které položky mají být revidovány po prvním použití."], bullets: ['tři oddělené verze', 'zdrojová opora', 'pravidlo pro částečnost', 'datum revize'] },
      { heading: 'Kontrola klasifikačních hranic', paragraphs: ["Hranice pro známky nejsou vlastností generátoru. Uvažujte cíl, obtížnost, školní pravidla a konkrétní kontext. Pokud se test mění, může být nutné přepočítat nebo vysvětlit interpretaci výsledku. Automatický návrh může pomoci zobrazit možnosti, ale odpovědnost zůstává u učitele a školy."], bullets: ['schválená pravidla', 'obtížnost položek', 'kontext třídy', 'transparentní komunikace'] },
    ],
  },
  {
    id: 'g-spu',
    sections: [
      { heading: 'Ověření přístupnosti bez nálepkování', paragraphs: ["Přečtěte upravený materiál jako člověk, který úkol poprvé vidí. Je jasné, co je první krok? Je klíčové slovo viditelné? Je příklad dostatečný, ale neprozrazuje řešení? Potom se vraťte k původnímu cíli a ověřte, že se změnila bariéra, ne očekávaný výkon.", "Pokud máte konkrétní doporučení žáka, porovnejte návrh s oficiálním školním postupem. Když se obecná úprava a individuální potřeba rozcházejí, nerozhoduje model. Rozhodne učitel a odborný tým s přístupem ke kontextu."], bullets: ['první krok je zřejmý', 'klíčové je zvýrazněné', 'příklad nepřebírá řešení', 'cíl zůstává stejný'] },
      { heading: 'Praktický kontrolní pár', paragraphs: ["Vytvořte dvě varianty stejné úlohy: jednu s kratší instrukcí a druhou s vizuální tabulkou. Nechte kolegu označit, zda obě stále měří stejný výkon. Pokud jedna varianta měří pouze schopnost číst složitou větu, upravte ji; pokud naopak odstraní rozhodující část úkolu, vraťte ji zpět.", "Po použití sledujte konkrétní chování, nikoli domnělou diagnózu: kde žák začal, kde se zastavil, jakou podporu použil. Záznam formulujte neutrálně a uložte jej pouze ve schváleném režimu."], bullets: ['stejný cíl', 'jiná bariéra', 'pozorovatelné chování', 'schválený záznam'] },
      { heading: 'Předání učiteli nebo týmu', paragraphs: ["Předávejte původní verzi, upravenou verzi, popis změn a otázku k revizi. Neříkejte „toto je pro SPU“, ale „tato verze rozděluje čtyřkrokovou instrukci a zachovává stejný cíl“. Jazyk popisu chrání před tím, aby se obecná strategie změnila v pevný profil dítěte."], bullets: ['co se změnilo', 'co zůstalo', 'co pozorovat', 'kdo schvaluje'] },
    ],
  },
  {
    id: 'g-diferenciace',
    sections: [
      { heading: 'Matrix variant podle míry opory', paragraphs: ["Místo tří pevných skupin vytvořte matrix podpor: otevřená otázka, výběr možných důkazů, předstrukturovaná tabulka a modelovaný první krok. Učitel může zvolit cestu podle aktuální potřeby a podpory postupně ubírat. Notebook pomůže popsat rozdíly, ale nemá žáky automaticky zařazovat.", "Každou variantu vyzkoušejte na stejném zdroji a stejné rubrice. Pokud jedna cesta vede k jinému faktu nebo jednoduššímu cíli, není to diferenciace, ale jiný úkol. Rozdíl musí být v cestě k důkazu nebo ve formě vyjádření, pokud cíl nevyžaduje konkrétní formu."], bullets: ['volná cesta', 'vodicí otázky', 'tabulka', 'modelovaný krok', 'postupné uvolnění podpory'] },
      { heading: 'Důkaz společného cíle', paragraphs: ["Na konci si položte otázku, zda by učitel z odpovědí poznal stejné porozumění. U argumentu například všechny varianty potřebují tvrzení, důkaz a vysvětlení. U výpočtu všechny potřebují správnou jednotku a postup, i když jedna skupina dostane více mezikroků.", "Pokud se podpora ukáže jako příliš silná, neodebírejte ji bez záznamu. Upravte jediný prvek, sledujte výsledek a ponechte žákovi možnost požádat o další oporu. To je citlivější než jednorázové rozhodnutí podle nálepky."], bullets: ['stejná rubrika', 'stejný důkaz', 'mění se jen opora', 'žák může požádat o změnu'] },
      { heading: 'Předání a reflexe', paragraphs: ["Kolegovi předejte cíl, varianty, důvod rozdílu a kontrolní otázku. Po hodině zapište, která podpora pomohla a která vytvořila zmatek. Nepřenášejte tuto zkušenost automaticky na všechny žáky; je to informace pro další rozhodnutí v konkrétním kontextu."], bullets: ['cíl', 'varianty', 'kritérium', 'pozorování'] },
    ],
  },
  {
    id: 'g-cizi-jazyk',
    sections: [
      { heading: 'Jazykový audit ve dvou sloupcích', paragraphs: ["Vytiskněte nebo zobrazte vedle sebe původní termín a výstupní vysvětlení. Označte slova, která jsou přeložená doslova, zjednodušená nebo ponechaná bez definice. Tento audit je zvlášť důležitý u false friends, zkratek, názvů institucí a odborných sloves.", "Studentům můžete ukázat i místo, kde se překlad liší podle kontextu. Tím se jazyková práce opírá o zdroj a rozhodování, ne o představu, že existuje vždy jeden automaticky správný ekvivalent."], bullets: ['termín', 'kontext', 'překlad', 'ověření'] },
      { heading: 'Předání materiálu', paragraphs: ["Uveďte zdrojový jazyk, cílovou úroveň a seznam termínů, které mají zůstat v originále. Při změně zdroje nebo publika proveďte audit znovu; stejný překlad nemusí být vhodný pro začátečníka a odbornou třídu."], bullets: ['jazyk a úroveň', 'slovník', 'datum revize'] },
    ],
  },
  {
    id: 'g-odborne-predmety',
    sections: [
      { heading: 'Bezpečná simulace odborného případu', paragraphs: ["Před použitím reálných dat vytvořte syntetický případ se stejnou strukturou, ale bez skutečných identifikátorů. Nechte notebook vysvětlit postup, najít kontrolní bod a uvést, kdy je třeba odborník nebo schválený systém. Syntetický případ neověří všechny provozní výjimky, ale umožní bezpečně otestovat instrukci.", "U právních, finančních a bezpečnostních tvrzení přidejte datum, jurisdikci a primární zdroj. Odborná terminologie bez těchto hranic může znít přesně a přesto být nepoužitelná v praxi."], bullets: ['syntetická data', 'kontrolní bod', 'jurisdikce nebo verze', 'eskalace na odborníka'] },
      { heading: 'Předání podle role', paragraphs: ["Student dostane postup a modelový případ, učitel kontrolní klíč a odborník seznam tvrzení k ověření. Toto rozdělení zabraňuje tomu, aby jeden výstup sloužil současně jako výuka, provozní návod a právní stanovisko."], bullets: ['student: procvičení', 'učitel: pedagogická kontrola', 'odborník: aktuální a bezpečné pravidlo'] },
    ],
  },
  {
    id: 'g-audio-overview',
    sections: [
      { heading: 'Kontrola přepisu a posluchačské zátěže', paragraphs: ["Nechte si nejprve vypsat textový přepis audia a porovnejte jej s vybranými zdroji. Zvláštní vzorek tvoří čísla, vlastní jména, zkratky, negace a věty, které obsahují podmínku. Potom audio poslechněte bez obrazovky: pokud posluchač nepozná, co je tvrzení a co příklad, dramaturgie je příliš hladká.", "U výukového poslechu přidejte zastavovací bod nebo otázku po každém hlavním úseku. Audio, které pouze plyne, může vytvořit iluzi zvládnutí. Student musí mít možnost vrátit se ke zdroji a ověřit si odpověď."], bullets: ['přepis proti zdroji', 'čísla a jména', 'tempo a délka', 'otázka po poslechu'] },
      { heading: 'Varianta při selhání audia', paragraphs: ["Když nativní audio není dostupné, jazyk nesedí nebo export obsahuje chybu, použijte ověřený textový brief, poznámku nebo otázky. Hub generator může připravit scénář, ale nenahradí zvukový výstup. Tato varianta je lepší než tvrdit, že se audio vytvořilo podle promptu."], bullets: ['textový brief', 'ověřené otázky', 'jasně označená nedostupnost'] },
      { heading: 'Předání audia', paragraphs: ["Příjemci předejte účel, zdroje, jazyk, datum a poznámku, že audio je AI návrh. U veřejného sdílení projděte práva a viditelnost zdrojů. Při aktualizaci dokumentů vytvořte nové audio nebo jasně označte, že starý export pracuje se starou verzí."], bullets: ['účel', 'verze zdrojů', 'jazyk', 'omezení', 'datum revize'] },
    ],
  },
  {
    id: 'g-video-overview',
    sections: [
      { heading: 'Scénář, obraz a faktická kontrola', paragraphs: ["Vytáhněte z videa tři vrstvy: mluvený scénář, titulky a obraz. Každou kontrolujte jinak. Scénář může změnit podmínku, titulek může vynechat negaci a obraz může znázornit vztah, který zdroj pouze předpokládá. U map, schémat a grafů porovnejte směr šipek, legendu a měřítko.", "Požádejte druhého čtenáře, aby video popsal bez přístupu ke zdrojům. Potom zkontrolujte, zda jeho závěr odpovídá tomu, co zdroje opravdu říkají. Pokud ne, přidejte odkaz na textovou podkladovou část nebo video nepoužívejte jako samostatné vysvětlení."], bullets: ['scénář', 'titulky', 'obraz', 'zdroj a kontext'] },
      { heading: 'Dostupnost a bezpečný fallback', paragraphs: ["Nativní typy videa mohou mít rozdílnou dostupnost podle jazyka, věku, účtu nebo délky generování. Když konkrétní volba chybí, použijte storyboard, slide deck nebo textový brief. Prompt generátor Hubu pomůže převést záměr do instrukcí, ale nezmění dostupnost nativního produktu."], bullets: ['ověřit účet a jazyk', 'použít storyboard', 'nepředstírat hotové video'] },
      { heading: 'Předání a revize', paragraphs: ["Uveďte, které části byly vytvořeny nativním Gemini Notebook a které vznikly následným promptovým nebo vizuálním nástrojem. Přidejte datum, verzi zdrojů a jméno člověka, který prošel faktickou kontrolu. Tím se video nestane černou skříňkou při další aktualizaci."], bullets: ['nativní funkce', 'generator/prompt steering', 'kontrola', 'verze'] },
    ],
  },
  {
    id: 'g-cinematic-short',
    sections: [
      { heading: 'Ořez obsahu bez ořezu významu', paragraphs: ["Při krátkém videu nejprve vyberte tvrzení, která musí zůstat, a tvrzení, která mohou být odkazem na zdroj. Každé zkrácení zkontrolujte, zda neodstranilo podmínku, výjimku nebo měřítko. Storytelling může pořadí změnit, nesmí změnit vztah mezi důkazem a závěrem.", "Napište si i negativní brief: co video nemá tvrdit, zobrazovat nebo slibovat. Tato věta je užitečná u filmového stylu, protože výrazný obraz často přidává příčinu, emoci nebo jistotu, kterou podklad nepodporuje."], bullets: ['must-have tvrzení', 'odkaz na zdroj', 'zakázaná zkratka', 'kontrola měřítka'] },
      { heading: 'Předání krátkého formátu', paragraphs: ["Příjemci vysvětlete, zda jde o nativní Video Overview, nebo výsledek dalšího nástroje podle promptu. Připojte textový přepis a zdroje. Když se video aktualizuje, starou verzi nechte označenou datem, aby se nepletla s aktuální."], bullets: ['typ výstupu', 'přepis', 'zdroje', 'datum'] },
    ],
  },
  {
    id: 'g-infografika',
    sections: [
      { heading: 'Datový a vizuální proofread', paragraphs: ["Infografiku kontrolujte ve dvou průchodech. V prvním zakryjte grafický styl a ověřte tvrzení, čísla, jednotky, období a citace. Ve druhém zkontrolujte, zda velikost, barva a pořadí vizuálně nenaznačují jiný význam. Nejčastější chyba není pravopisná, ale špatné měřítko nebo legendou skrytá výjimka.", "Na mobilu si všimněte dlouhých URL, popisků a kontrastu. Pokud se zdroj nebo poznámka ztratí při zmenšení, přesuňte ji do čitelného textu nebo odkazované přílohy. Infografika musí být srozumitelná, ale nesmí se tvářit jako úplná evidence."], bullets: ['claim audit', 'number audit', 'scale audit', 'mobile audit'] },
      { heading: 'Kdy použít jiný formát', paragraphs: ["Pokud je tématem více rozporných zdrojů, tabulka nebo evidence map může být poctivější než zjednodušený vizuál. Pokud potřebujete delší vysvětlení, použijte report a infografiku pouze jako orientační vstup. Výběr formátu je součást kvality, ne selhání designu."], bullets: ['srovnání: tabulka', 'rozpor: evidence map', 'detail: report', 'orientace: infografika'] },
      { heading: 'Předání briefu a výstupu', paragraphs: ["Uložte původní datový brief, prompt generatoru a finální obrázek odděleně. Uveďte, že 39 styles, 27 layouts a 17 color modes patří Hub generatoru, nikoli nativním volbám Gemini Notebook. Příjemce tak ví, co může hledat v produktu a co je náš doporučený postup."], bullets: ['brief', 'prompt', 'finální médium', 'původ a verze'] },
    ],
  },
  {
    id: 'g-slide-deck',
    sections: [
      { heading: 'Slide audit podle otázky publika', paragraphs: ["Ke každému slidu napište jednu otázku, na kterou má publikum po jeho zhlédnutí umět odpovědět. Pokud slide žádnou nemá, je pravděpodobně dekorativní nebo duplicitní. U tabulek a grafů zkontrolujte, zda odpověď nevyplývá z vizuálního triku místo z dat.", "Poznámky pro mluvčího nesmí obsahovat tvrzení, která nejsou ve slidu nebo zdroji kontrolovatelná. Proveďte zvláštní revizi přechodů: právě při zkrácení prezentace se často ztratí podmínka, která držela závěr pohromadě."], bullets: ['otázka slidu', 'důkaz', 'přechod', 'poznámka mluvčího'] },
      { heading: 'Native a generator v předávacím balíčku', paragraphs: ["Předejte zdroje, osnovu, prompt generatoru a export odděleně. Nativní Slide Deck může mít vlastní volby a chování; naše generátorové promptové parametry nejsou jeho skrytá konfigurace. Pokud příjemce potřebuje změnu layoutu, ví, zda ji má hledat v produktu nebo v promptu."], bullets: ['nativní volby', 'prompt steering', 'export', 'kontrolní poznámka'] },
      { heading: 'Přednášková zkouška', paragraphs: ["Projděte prezentaci v cílovém poměru a na projektoru nebo malém displeji. Změřte čas bez čtení textu ze slidu. Pokud je bez drobného písma nezřejmý závěr, zkraťte obsah nebo přesuňte detail do odkazu. Čitelnost je součást věcné přesnosti, protože neviditelná citace nemůže být ověřena."], bullets: ['čas', 'poměr', 'kontrast', 'čitelnost'] },
    ],
  },
  {
    id: 'g-mind-maps',
    sections: [
      { heading: 'Od mapy k otázce', paragraphs: ["Po vytvoření mapy vyberte tři uzly: jeden centrální pojem, jeden vztah a jednu mezeru. Pro každý napište další otázku a zdroj, který by ji mohl zodpovědět. Tím mapa přestane být koncem práce a stane se navigací k četbě nebo experimentu.", "Pokud mapa spojuje pojmy pouze proto, že se často objevují ve stejném textu, označte vztah jako hypotézu. Nechte studenta najít konkrétní větu, tabulku nebo definici, která spojení podporuje."], bullets: ['uzel', 'vztah', 'důkaz', 'další otázka'] },
    ],
  },
  {
    id: 'g-flashcards-quizzes',
    sections: [
      { heading: 'Rozložení obtížnosti a zpětná vazba', paragraphs: ["Sadu rozdělte na vybavení, vysvětlení a aplikaci. U chybné odpovědi nepřidávejte pouze správné slovo; doplňte krátké vysvětlení a odkaz na zdroj. Pokud dvě karty testují stejný detail, jednu nahraďte otázkou na vztah nebo podmínku.", "Po procvičení si student označí karty podle důvodu nejistoty: neznám pojem, nerozumím vztahu, pletu si výjimku nebo neumím najít oporu. Tato informace je užitečnější než samotný počet správných odpovědí a může vést k jiné další aktivitě."], bullets: ['vybavení', 'vysvětlení', 'aplikace', 'důvod chyby'] },
      { heading: 'Předání jako studijní pomůcky', paragraphs: ["Uveďte zdrojovou verzi a datum. Když se sada používá ve třídě, oddělte dobrovolné procvičení od klasifikace a vysvětlete, že nativní AI výstup prošel pouze navrženou, nikoli automatickou garancí správnosti."], bullets: ['rozsah', 'zdroj', 'účel', 'stav kontroly'] },
    ],
  },
  {
    id: 'g-reports-data-tables',
    sections: [
      { heading: 'Reconciliation log pro data', paragraphs: ["Když dva zdroje dodají různé hodnoty, nepřepisujte jednu druhou. Přidejte reconciliation log: zdroj, řádek, definice, důvod rozdílu, rozhodnutí a kdo jej schválil. Pokud rozhodnutí nelze udělat, ponechte obě hodnoty a v reportu vysvětlete, proč nejsou agregované.", "U odvozených údajů uvádějte, zda šlo o součet, podíl, přepočet nebo pouze slovní syntézu. Čtenář musí umět zopakovat alespoň vzorový výpočet bez přístupu k internímu promptu."], bullets: ['nesoulad', 'definice', 'vzorec', 'schválení'] },
      { heading: 'Export a následná revize', paragraphs: ["Po exportu otevřete tabulku v cílovém nástroji, zkontrolujte formát čísel a ověřte, že prázdná hodnota zůstala prázdná. Při změně zdroje znovu zkontrolujte buňky s největším dopadem, ne jen datum v záhlaví."], bullets: ['cílový formát', 'prázdná hodnota', 'kritické buňky', 'datum'] },
      { heading: 'Předání datového balíčku', paragraphs: ["Předejte schéma, zdroje, report, log rozporů a krátké omezení. Pokud z reportu vzniká slide nebo infografika, předejte také datový brief, aby vizuální zkratka šla ověřit proti tabulce."], bullets: ['schéma', 'report', 'zdroje', 'omezení', 'vizuální brief'] },
    ],
  },
  {
    id: 'g-porovnat-zdroje',
    sections: [
      { heading: 'Srovnávací matice a citace', paragraphs: ["Při delším srovnání použijte matici, kde řádky jsou tvrzení a sloupce zdroje. Do buňky napište krátkou hodnotu, přesné místo a stav: podporuje, odporuje, neřeší. Prázdná buňka je informativní; neznamená, že zdroj souhlasí.", "Potom z matice vytvořte slovní závěr. Začněte společnou osou, pokračujte rozdíly a skončete podmínkou, za které by se interpretace změnila. Tato struktura je pro čtenáře čitelnější než dlouhý odstavec s mnoha „zatímco“."], bullets: ['tvrzení', 'zdroj A', 'zdroj B', 'stav opory', 'podmínka'] },
      { heading: 'Předání srovnání', paragraphs: ["Předejte i nesrovnatelné řádky a zdůvodnění jejich vyřazení. Při aktualizaci zdroje zkontrolujte všechny řádky, které používají jeho definici, ne pouze řádky, které obsahují nové číslo."], bullets: ['matice', 'rozpory', 'vyřazené řádky', 'datum revize'] },
      { heading: 'Stress test', paragraphs: ["Zkuste závěr napsat jednou bez zdroje A a jednou bez zdroje B. Pokud se změní celý argument, uveďte závislost. Pokud se nezmění, vysvětlete, proč má více zdrojů skutečně nezávislou oporu."], bullets: ['vyřadit A', 'vyřadit B', 'porovnat závěr'] },
    ],
  },
  {
    id: 'g-rozpory-a-interpretace',
    sections: [
      { heading: 'Hypotéza o příčině není vysvětlení', paragraphs: ["U každého rozporu vytvořte nejméně dvě možné příčiny a ke každé napište, jaký údaj by ji podpořil nebo oslabil. Jedna hypotéza může být metodická, druhá časová a třetí souviset s populací. Notebook pomůže varianty formulovat, ale zdrojová opora rozhoduje, co smí vstoupit do závěru.", "Při psaní briefu zachovejte vrstvy: pozorování, možná příčina, důkaz pro příčinu a otevřená otázka. Čtenář pak pozná, zda má jednat, hledat další data, nebo pouze odložit závěr."], bullets: ['pozorování', 'hypotéza', 'podpora', 'co by hypotézu vyvrátilo'] },
      { heading: 'Reprodukce kontroly', paragraphs: ["Druhý čtenář dostane pouze tabulku rozdílů a odkazy, ne váš vysvětlující odstavec. Pokud z nich nedokáže rozpoznat stejný rozpor, je popis příliš abstraktní. Upravte jej na konkrétní číslo, pojem, období nebo metodu."], bullets: ['tabulka rozdílů', 'originální místa', 'nezávislé čtení'] },
      { heading: 'Předání a další výzkum', paragraphs: ["Na konci uvádějte, zda je rozpor vyřešený, zúžený nebo otevřený. U otevřeného rozporu napište nejmenší další krok: dohledat metodiku, získat novější data nebo vyzkoušet stejnou definici na jiné populaci."], bullets: ['stav rozporu', 'další zdroj', 'další měření'] },
    ],
  },
  {
    id: 'g-evidence-map',
    sections: [
      { heading: 'Prioritizace mapy', paragraphs: ["Ne všechna tvrzení si zaslouží stejnou hloubku auditu. Přidejte prioritu podle dopadu a nejistoty: vysoký dopad a nízká jistota jdou na první místo. Tvrzení, která se objeví jen v doprovodném příkladu, mohou mít menší prioritu než věta v nadpisu nebo doporučení.", "Po každém ověření uveďte, co se změnilo: formulace, zdroj, míra jistoty nebo stav mezery. Bez tohoto diffu se evidence map rychle stane archivem bez rozhodovací hodnoty."], bullets: ['dopad', 'nejistota', 'priorita', 'změna po auditu'] },
      { heading: 'Příklad předání výzkumnému týmu', paragraphs: ["Tým dostane mapu s patnácti tvrzeními. Prvních pět má oporu ve dvou zdrojích, další jsou odvozená a tři mají rozpor. Na poradě se neřeší všech patnáct stejně: nejprve se schválí definice a vyberou se tvrzení, která skutečně vstoupí do doporučení.", "Tím se mapa stává pracovním rozhraním mezi rešerší a rozhodnutím, nikoli jen tabulkou, kterou nikdo neotevře."], bullets: ['prioritní tvrzení', 'rozpory', 'rozhodovací použití'] },
      { heading: 'Předání a archiv', paragraphs: ["Uložte mapu s verzí zdrojů a pravidlem, jak přidávat nové tvrzení. Pokud nový dokument pouze opakuje existující oporu, připojte jej k řádku; nevytvářejte duplicitu. Pokud mění závěr, založte revizní poznámku."], bullets: ['verze', 'pravidlo přidání', 'revizní poznámka'] },
    ],
  },
  {
    id: 'g-dlouhy-dokument',
    sections: [
      { heading: 'Kontrola přeskočeného kontextu', paragraphs: ["U dlouhého dokumentu vyberte jeden závěr ze začátku, jeden z prostřední části a jeden ze závěru. U každého otevřete nejen citované místo, ale i definici nebo metodiku, na kterou navazuje. Tím odhalíte, zda systém nepřeskočil výjimku, která byla vysvětlena o desítky stran dříve.", "Pokud dokument obsahuje přílohy, vyznačte, zda jsou v rozsahu. Nechte si vypsat tabulky, které mají největší vliv na závěr, a ověřte je samostatně. Dlouhý dokument může být načtený, ale to neznamená, že každý graf je interpretován správně."], bullets: ['začátek', 'střed', 'závěr', 'příloha', 'nejdůležitější tabulka'] },
      { heading: 'Předání briefu', paragraphs: ["Čtenáři předejte brief, mapu kapitol a tři odkazy na nejdůležitější místa. Uveďte, co nebylo kontrolováno. Krátký, poctivě omezený brief je lepší než souhrn, který předstírá, že dokument zpracoval bez ztráty kontextu."], bullets: ['brief', 'mapa', 'klíčové odkazy', 'omezení'] },
    ],
  },
  {
    id: 'g-vice-dokumentu',
    sections: [
      { heading: 'Rozhodovací tabulka briefu', paragraphs: ["Rozdělte research brief na tvrzení, důkazy, implementační podmínky a rozhodovací otázky. Zdroje, které odpovídají na jinou vrstvu, nemíchejte do jednoho skóre. Například zkušenost školy může ukázat proveditelnost, ale sama o sobě nemusí dokazovat obecný účinek.", "U každého doporučení uveďte, který zdroj jej podpírá, jaká je mezera a co by se stalo při opačném výsledku. Tím brief pomáhá rozhodovat i tehdy, když odpověď není jednoznačné ano nebo ne."], bullets: ['důkaz účinku', 'proveditelnost', 'riziko', 'podmínka rozhodnutí'] },
      { heading: 'Oponentní čtení', paragraphs: ["Požádejte druhého čtenáře, aby hledal zdroj, který se do briefu nehodí, a tvrzení, které je příliš silné. Nepředávejte mu pouze shrnutí; dejte mu citace a původní definice. Oponentura má zvyšovat dohledatelnost, ne vyrábět další dlouhý text."], bullets: ['nepohodlný zdroj', 'příliš silné tvrzení', 'definice', 'citace'] },
      { heading: 'Verze pro rozhodnutí a verze pro archiv', paragraphs: ["Rozhodovací verze může být krátká, ale musí odkazovat na plnou mapu evidence. Archivní verze obsahuje zdroje, změny, vyřazené dokumenty a datum revize. Když se změní jeden zdroj, víte, kterou vrstvu aktualizovat."], bullets: ['krátká verze', 'evidence map', 'change log', 'datum revize'] },
    ],
  },
  {
    id: 'g-overovat-odpovedi',
    sections: [
      { heading: 'Vzorek podle rizika', paragraphs: ["U nízkorizikového výstupu vyberte tvrzení z úvodu, středu a závěru. U vysokorizikového výstupu vyberte všechna tvrzení, která mění rozhodnutí, a ověřte je proti primárnímu zdroji. Do záznamu napište, proč byl vzorek zvolen; jinak může namátková kontrola zakrýt nejdůležitější chybu.", "Kontrolujte také to, co odpověď vynechala. Požádejte o seznam podmínek, výjimek a zdrojů, které nebyly použity. Absence zmínky není důkaz, že podmínka neexistuje."], bullets: ['dopad', 'poloha tvrzení', 'podmínky', 'vynechané zdroje'] },
      { heading: 'Schválení a auditní stopa', paragraphs: ["Předání obsahuje otázku, zdroje, verzi odpovědi, klíčové citace, otevřené nejistoty a jméno schvalovatele. Pokud se výstup používá ve třídě, schvalovatel kontroluje také jazyk a vhodnost. Pokud se používá v práci, doplňte vlastníka aktuálnosti."], bullets: ['verze', 'citace', 'nejistota', 'schvalovatel', 'datum'] },
      { heading: 'Kdy přestat iterovat', paragraphs: ["Další prompt nevyřeší chybějící zdroj, nejasné pravidlo ani rozpornou metodiku. Po dvou neúspěšných kolech změňte podklady, zapojte odborníka nebo výstup odmítněte. Audit není soutěž o nejhladší formulaci."], bullets: ['změnit zdroj', 'zapojit člověka', 'odmítnout tvrzení'] },
    ],
  },
  {
    id: 'g-hallucinace-citace',
    sections: [
      { heading: 'Test rozšíření tvrzení', paragraphs: ["Vezměte jednu větu z odpovědi a postupně odstraňte její přívlastky: kdo, kdy, kde, jak moc a za jakých podmínek. U každé verze zkontrolujte citaci. Často zjistíte, že zdroj podporuje úzkou větu, ale ne její širší, pohodlnější variantu.", "Druhý test je proti výjimce: požádejte o okolnosti, za kterých by tvrzení neplatilo. Pokud odpověď žádné nenajde, neznamená to, že neexistují. Znamená to, že musíte rozšířit kontrolu zdrojů nebo upravit otázku."], bullets: ['kdo', 'kdy', 'kde', 'jak moc', 'za jakých podmínek'] },
      { heading: 'Příklad opravné poznámky', paragraphs: ["Do revize napište: Původní věta byla širší než citace. Opravená věta popisuje pouze sledovanou skupinu. Otevřenou otázkou zůstává přenos na jinou populaci. Takový záznam ukazuje důvod změny."], bullets: ['původní tvrzení', 'přesná chyba', 'opravená verze', 'otevřená otázka'] },
      { heading: 'Předání bezpečné odpovědi', paragraphs: ["Když tvrzení nejde potvrdit, předávejte raději otázku k ověření než sebevědomý závěr. U citlivého tématu uveďte, co má ověřit odborník, a nedoplňujte detail jen proto, aby byl text úplný."], bullets: ['nejistota', 'další ověření', 'odborný kontext'] },
    ],
  },
  {
    id: 'g-copyright',
    sections: [
      { heading: 'Evidence práv v praxi', paragraphs: ["Pro každý zdroj si zvolte stav: vlastní, otevřená licence, interně schválený, použití s omezením nebo nejasný. U licence uveďte, co dovoluje: čtení, úpravu, sdílení, komerční použití nebo pouze interní práci. Nejasný materiál nepublikujte, dokud stav nezměníte.", "Při práci s výňatkem zachovejte původ a kontext. Pokud prompt navrhne shrnutí, zkontrolujte, zda nepřebírá strukturu nebo dlouhé pasáže bez potřeby. U generovaných obrázků a audia evidujte také podklady a nástroj, který výstup vytvořil."], bullets: ['vlastník', 'licence', 'účel', 'příjemci', 'stav'] },
      { heading: 'Veřejný audit jako příjemce', paragraphs: ["Odkaz otevřete mimo účet autora a projděte, co vidí. Zkontrolujte zdroje, poznámky, audio, video, obrázky a exporty. Pokud je viditelná položka nejistá, odeberte ji před sdílením a teprve potom upravte výstup."], bullets: ['anonymní náhled', 'zdroje', 'artefakty', 'exporty'] },
      { heading: 'Předání rozhodnutí', paragraphs: ["Kolegovi předejte nejen soubor, ale i stručné zdůvodnění rozsahu a licence. Při změně příjemce nebo účelu proveďte posouzení znovu. Právní výjimka z jednoho prostředí se automaticky nepřenáší do jiného."], bullets: ['rozsah', 'účel', 'příjemce', 'schválení'] },
    ],
  },
  {
    id: 'g-osobni-udaje',
    sections: [
      { heading: 'Druhá kontrola identifikovatelnosti', paragraphs: ["Po anonymizaci se vraťte k souboru jako člověk z dané školy nebo firmy. Zkontrolujte název, metadata, datum, kombinaci třídy, události a citátu. Pokud by někdo mohl osobu poznat bez jména, nahraďte další detaily nebo použijte syntetický případ.", "U exportu hledejte i údaje, které nebyly v hlavní odpovědi: zdrojové poznámky, názvy příloh, skryté listy a text v obrázcích. Před sdílením zkontrolujte nejhorší možný příjemce, ne jen zamýšleného kolegu."], bullets: ['název souboru', 'metadata', 'kombinace detailů', 'přílohy a export'] },
      { heading: 'Role a schválení', paragraphs: ["Učitel může připravit obecný materiál, ale správce účtu nebo pověřenec rozhoduje o režimu osobních dat. Rozdělte tyto role v pracovním záznamu. Pokud je potřeba individuální rozhodnutí o dítěti, AI návrh je pouze podklad k odborné práci, nikoli její náhrada."], bullets: ['autor návrhu', 'schvalovatel účtu', 'odborný kontext', 'příjemce'] },
      { heading: 'Předání při incidentu', paragraphs: ["Při omylu zaznamenejte fakta bez dalšího kopírování dat: co, kdy, komu a v jakém režimu bylo dostupné. Postupujte podle interního procesu a nepokoušejte se incident vyřešit pouze smazáním lokální kopie."], bullets: ['zastavit', 'omezit přístup', 'dokumentovat', 'eskalovat'] },
    ],
  },
  {
    id: 'g-co-nenahravat',
    sections: [
      { heading: 'Rychlý fallback pro tým', paragraphs: ["Připravte si modelový balíček pro testování promptů: fiktivní jména, syntetická čísla, veřejný dokument a záměrně označené mezery. Tým tak může ověřit workflow bez toho, aby každý nový experiment vyžadoval reálná školní nebo firemní data."], bullets: ['syntetická data', 'veřejný zdroj', 'fiktivní identifikátory', 'schválený účet'] },
      { heading: 'Před sdílením', paragraphs: ["Zkontrolujte nejen nahrané zdroje, ale i uložené notes, exporty, veřejné odkazy a stažené kopie. Pokud nevíte, kdo může soubor vidět, nesdílejte jej a ověřte pravidla organizace."], bullets: ['příjemce', 'kopie', 'odkaz', 'schválení'] },
    ],
  },
  {
    id: 'g-exporty',
    sections: [
      { heading: 'Reprodukce archivované práce', paragraphs: ["Za několik týdnů zkuste podle README najít zdroj, otevřít citaci a vysvětlit klíčový závěr. Pokud se vám to nepodaří, doplňte chybějící metadata: přesný název, datum, URL, verzi souboru nebo vlastníka. Archiv je dobrý až tehdy, když funguje pro někoho jiného než autora.", "U exportu rozlišujte textovou úpravu od změny evidence. Když kolega opraví stylistiku, nemění zdrojový závěr. Když se změní zdroj, vytvořte revizi a znovu zkontrolujte klíčová tvrzení."], bullets: ['najít zdroj', 'otevřít citaci', 'rozlišit text a evidenci', 'vytvořit revizi'] },
      { heading: 'Předání archivu', paragraphs: ["Předejte složku s jasnou strukturou: README, source-log, pracovní výstupy, schválená kopie a change-log. Uveďte, co do archivu nepatří, například nepotřebné citlivé exporty nebo cizí materiál mimo licenci."], bullets: ['README', 'source-log', 'schválený export', 'change-log', 'omezení'] },
    ],
  },
];

import type { GuideDepthExtension } from './depth-extra';

export const depthExtraFinal3: GuideDepthExtension[] = [
  {
    id: 'g-overovat-odpovedi',
    sections: [{ heading: 'Poslední rozhodnutí před publikací', paragraphs: ["Ověřený text ještě posuďte podle účelu. Je srozumitelný pro cílového čtenáře, ale nezjednodušuje podmínky? Je zřejmé, co je ze zdroje a co je vaše syntéza? Má čtenář možnost dohledat originál a ví, kdy má požádat odborníka? Teprve kladné odpovědi tvoří použitelný výstup."], bullets: ['účel', 'srozumitelnost', 'síla tvrzení', 'dohledatelnost', 'eskalace'] }],
  },
  {
    id: 'g-hallucinace-citace',
    sections: [{ heading: 'Jazyk, který nepřidává jistotu', paragraphs: ["V závěru zkontrolujte slovesa a příslovce: vždy, jistě, prokazuje, nejlepší a bez výjimky často rozšiřují význam. Nahraďte je formulací odpovídající podkladu a uveďte, zda jde o popis, odhad nebo návrh. Pokud potřebujete silnější tvrzení, vraťte se k důkazu, ne k tónu."], bullets: ['kalibrované sloveso', 'podmínka', 'typ opory', 'otevřená mezera'] }],
  },
  {
    id: 'g-copyright',
    sections: [{ heading: 'Kontrola po změně účelu', paragraphs: ["Materiál připravený pro interní výuku nemusí být možné použít na veřejném webu, v placeném kurzu nebo v marketingovém videu. Při každé změně příjemce nebo účelu se vraťte k licenci, rozsahu a exportu. Pokud není stav jasný, použijte otevřený náhradní zdroj nebo sdílení zastavte."], bullets: ['nový účel', 'nový příjemce', 'nové oprávnění', 'nový audit'] }],
  },
  {
    id: 'g-osobni-udaje',
    sections: [{ heading: 'Kontrola účelu a přiměřenosti', paragraphs: ["U každého údaje vysvětlete, jaké konkrétní rozhodnutí podporuje. Pokud odpověď zní pouze „mohlo by se hodit“, údaj odstraňte. Toto pravidlo platí pro zdroj, prompt, poznámku, export i veřejný odkaz a pomáhá zabránit postupnému návratu detailů do kopie."], bullets: ['konkrétní účel', 'nezbytnost', 'odstranění', 'kontrola kopií'] }],
  },
  {
    id: 'g-cinematic-short',
    sections: [{ heading: 'Rozšířený test diváckého závěru', paragraphs: ["Nechte tři různé čtenáře napsat po zhlédnutí jednu větu, kterou si odnášejí. Porovnejte ji s povoleným závěrem v briefu. Pokud se objeví jiná příčina, širší populace nebo silnější jistota, video buď upravte, nebo k němu přidejte viditelný kontext. Krátký formát nesmí být výmluvou pro skrytí omezení."], bullets: ['tři čtenáři', 'odnesený závěr', 'porovnání s briefem', 'oprava nebo kontext'] }],
  },
  {
    id: 'g-infografika',
    sections: [{ heading: 'Čitelnost a přístup k datům', paragraphs: ["Před předáním zajistěte, že klíčové číslo není sdělené pouze barvou, velikostí nebo polohou. Přidejte textovou alternativu a odkaz na datovou tabulku. Čtenář tak může tvrzení ověřit i bez vizuálního odhadu a tým může opravit jedno číslo bez nového návrhu celého obrázku."], bullets: ['textová alternativa', 'nejen barva', 'datová tabulka', 'opravitelná verze'] }],
  },
  {
    id: 'g-slide-deck',
    sections: [{ heading: 'Kontrola publika a dalšího kroku', paragraphs: ["Na posledním slidu uveďte, co má publikum udělat: ověřit zdroj, rozhodnout mezi možnostmi, položit otázku nebo pokračovat do detailního dokumentu. Pokud závěr pouze opakuje titul, prezentace neposkytuje rozhodovací hodnotu. Zkontrolujte také, zda citace a zdroje zůstanou čitelné při sdílení obrazovky."], bullets: ['akce publika', 'zdroj', 'čitelnost', 'navazující dokument'] }],
  },
  {
    id: 'g-reports-data-tables',
    sections: [{ heading: 'Data jako podklad, ne automatické rozhodnutí', paragraphs: ["Report může upozornit na trend, ale rozhodnutí vyžaduje znalost kontextu, limitů měření a případných chyb v importu. V závěru proto oddělte pozorování, interpretaci a doporučení. Každou vrstvu opatřete odpovídajícím zdrojem a mírou jistoty."], bullets: ['pozorování', 'interpretace', 'doporučení', 'limit měření'] }],
  },
  {
    id: 'g-porovnat-zdroje',
    sections: [{ heading: 'Co porovnání nedokáže', paragraphs: ["Srovnávací tabulka sama nevyřeší rozdílnou kvalitu dat, skrytý výběr ani společný původ dvou zdrojů. V omezení napište, zda výsledek platí pro vybrané dokumenty, nebo jej lze přenést dál. Při nejistotě ponechte závěr podmíněný a označte potřebný další zdroj."], bullets: ['kvalita dat', 'výběr', 'společný původ', 'přenositelnost'] }],
  },
  {
    id: 'g-rozpory-a-interpretace',
    sections: [{ heading: 'Rozpor v jedné čitelné kartě', paragraphs: ["Pro předání vytvořte kartu: otázka, zdroj A, zdroj B, typ rozdílu, co lze říct bezpečně a co zatím ne. Krátká karta pomůže učiteli, výzkumníkovi nebo kolegovi navázat bez návratu do celého chatu. Nevynechávejte zdrojové místo jen proto, aby se karta vešla na jednu stránku."], bullets: ['otázka', 'dva zdroje', 'typ rozdílu', 'bezpečný závěr', 'otevřená otázka'] }],
  },
  {
    id: 'g-evidence-map',
    sections: [{ heading: 'Minimum pro auditovatelný řádek', paragraphs: ["Řádek bez přesného místa, stavu opory nebo vlastníka není připravený pro rozhodnutí. Raději jej označte jako neověřený a vraťte do rešerše. Při exportu zachovejte stejné ID řádku, aby bylo možné sledovat změnu napříč verzemi."], bullets: ['přesné místo', 'stav opory', 'vlastník', 'stabilní ID'] }],
  },
  {
    id: 'g-vice-dokumentu',
    sections: [{ heading: 'Co má rozhodující čtenář vidět jako první', paragraphs: ["Na začátku briefu uveďte otázku, krátkou odpověď s mírou jistoty a dvě hlavní omezení. Detailní mapu evidence, rozpory a návrh pilotu dejte hned za ni. Tak brief zůstane rychlý, ale nepřeruší cestu k důkazu."], bullets: ['otázka', 'krátká odpověď', 'jistota', 'omezení', 'evidence'] }],
  },
  {
    id: 'g-cizi-jazyk',
    sections: [{ heading: 'Kdy překlad zastavit', paragraphs: ["Překlad zastavte, když termín mění právní nebo odborný význam, zdroj používá slovní hříčku, nebo cílová kultura nemá přímý ekvivalent. Uveďte originál, vysvětlení a otázku pro člověka se znalostí oboru. Plynulá věta není důvodem skrýt nejistotu."], bullets: ['originál', 'vysvětlení', 'oborová revize', 'označená nejistota'] }],
  },
  {
    id: 'g-odborne-predmety',
    sections: [{ heading: 'Kontrolní otázka po postupu', paragraphs: ["Po každém odborném postupu přidejte situaci, ve které se pravidlo nepoužije. Student tak procvičí hranici a učitel pozná, zda rozumí podmínce. Pokud žádná výjimka ve zdroji není, napište, že jde o otázku k odbornému ověření, ne o domyšlený scénář."], bullets: ['běžný případ', 'výjimka', 'hranice', 'odborné ověření'] }],
  },
  {
    id: 'g-exporty',
    sections: [{ heading: 'Předání bez falešné finality', paragraphs: ["Označení „schváleno“ znamená schváleno pro konkrétní účel, příjemce, zdroje a datum. Neznamená trvalou pravdu. V README proto uveďte, kdy se má dokument znovu otevřít, co může revizi spustit a kdo ji vlastní."], bullets: ['konkrétní účel', 'příjemce', 'datum', 'spouštěč revize', 'vlastník'] }],
  },
];

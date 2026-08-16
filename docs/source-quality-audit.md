# Audit kvality Trusted Sources v1

Audit date: 2026-08-15
Scope: 175 records in src/data/sources/

## Decision

Source catalog is READY for publication. Every record has a stable ID, canonical URL candidate, category, source type, notebook suitability, language, region, provenance label, verification date and import tip. The link checker is the final live-network gate because HTTP access can differ by bot protection or institutional network.

| Metric | Result |
| --- | ---: |
| Total sources | 175 |
| CZ-region sources | 118 (67 %) |
| Sources with import tip | 175 (100 %) |
| Featured sources | 10 |
| Categories | 10 |
| Duplicate IDs | 0 |
| Duplicate canonical URLs | 0 |
| Structural errors | 0 |

## Categories

| Category | Sources | Share |
| --- | ---: | ---: |
| education | 22 | 13 % |
| legislation | 15 | 9 % |
| statistics | 22 | 13 % |
| economics | 15 | 9 % |
| science | 25 | 14 % |
| history-archives | 16 | 9 % |
| czech-language | 13 | 7 % |
| eu | 17 | 10 % |
| international | 21 | 12 % |
| journalism-fact-check | 9 | 5 % |

## Source type, access and suitability

- Source types: official=79, academic=23, open-data=29, library=18, archive=8, reference=9, journalism=3, fact-check=6.
- Access: free=173, freemium=1, paid=0, institutional=1.
- Notebook suitability: high=134, medium=37, limited=4.
- Regions: CZ=118, EU=29, GLOBAL=32.
- Featured set: Ministerstvo školství, mládeže a tělovýchovy · Internetová jazyková příručka · Česká národní banka · EUR-Lex · Digitální knihovna Kramerius NK ČR · Světová zdravotnická organizace · Demagog.cz · e-Sbírka · Akademie věd ČR · Český statistický úřad.

## Verification rules

- verifiedAt records the date on which the URL and source purpose were checked.
- sourceType distinguishes primary official, academic, open-data, library, archive, reference, journalism and fact-check sources.
- notebookSuitability describes whether a concrete page, document or dataset is useful as a Gemini Notebook source; it is not a claim about factual truth.
- importTip tells the user what context to preserve when importing the source.
- HTTP results are intentionally kept separate from metadata: BOT_BLOCKED or MANUAL_REVIEW is not treated as a broken URL.

## Full source inventory

| ID | Title | Category | URL | Type | Access | Region | Suitability | Verified | Import tip |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| s-csicr | Česká školní inspekce | education | https://www.csicr.cz/cz/ | official | free | CZ | high | 2026-08-15 | Pro srovnání škol přidejte inspekční zprávu spolu s kritérii hodnocení a sledujte školní rok. |
| s-msmt | Ministerstvo školství, mládeže a tělovýchovy | education | https://msmt.gov.cz/ | official | free | CZ | high | 2026-08-15 | Vyberte konkrétní metodiku nebo strategii a k ní přidejte datum vydání či verzi. |
| s-msmt-stats | Statistický informační systém MŠMT | education | https://statis.msmt.gov.cz/data/ | official | free | CZ | high | 2026-08-15 | Importujte vybranou tabulku spolu s názvem ukazatele, obdobím a vysvětlivkami. |
| s-edudata | EduData MŠMT | education | https://edudata.msmt.gov.cz/ | open-data | free | CZ | high | 2026-08-15 | Zapište do názvu zdroje zvolené filtry, aby později nezmizel kontext výběru. |
| s-msmt-open-data | Otevřená data MŠMT | education | https://lkod.msmt.gov.cz/ | open-data | free | CZ | high | 2026-08-15 | Přidejte popis datové sady i její JSON-LD nebo CSV distribuci. |
| s-edu-cz | Edu.cz | education | https://edu.gov.cz/ | official | free | CZ | high | 2026-08-15 | Pro rešerši si otevřete konkrétní tematickou podstránku místo obecného rozcestníku. |
| s-edu-data | Rozcestník na data o vzdělávání | education | https://edu.gov.cz/data/rozcestniky/rozcestnik-na-data-o-vzdelavani/ | official | free | CZ | medium | 2026-08-15 | Použijte jej jako mapu zdrojů, ale do notebooku importujte až konkrétní tabulku nebo zprávu. |
| s-npi | Národní pedagogický institut ČR | education | https://www.npi.cz/ | official | free | CZ | high | 2026-08-15 | K metodickému materiálu přidejte také cílovou úroveň vzdělávání a datum aktualizace. |
| s-cermat | Centrum pro zjišťování výsledků vzdělávání | education | https://cermat.gov.cz/ | official | free | CZ | high | 2026-08-15 | U zadání vždy přidejte rok, předmět a typ zkoušky, aby se nesmíchaly různé verze. |
| s-infoabsolvent | Infoabsolvent | education | https://www.infoabsolvent.cz/ | official | free | CZ | high | 2026-08-15 | Importujte profil oboru společně s rokem a regionem, kterých se údaje týkají. |
| s-dzs | Dům zahraniční spolupráce | education | https://www.dzs.cz/ | official | free | CZ, EU | high | 2026-08-15 | U výzvy zachovejte termín, cílovou skupinu a verzi dokumentu jako součást názvu. |
| s-dzs-statistiky | Statistiky DZS | education | https://www.dzs.cz/statistiky | official | free | CZ, EU | high | 2026-08-15 | Přidejte celou metodickou poznámku a rozlišujte počet projektů od počtu účastníků. |
| s-portal-csicr | Portál ČŠI | education | https://portal.csicr.cz/ | official | free | CZ | high | 2026-08-15 | Pro školní profil si poznamenejte datum zobrazení a oddělte rejstříkové údaje od komentáře. |
| s-csi-reports | Registr inspekčních zpráv | education | https://www.csicr.cz/cz/Registr-inspekcnich-zprav | official | free | CZ | high | 2026-08-15 | Do notebooku přidejte zprávy ze stejného období a označte školu i typ inspekce. |
| s-rvp | Metodický portál RVP.CZ | education | https://rvp.cz/ | official | free | CZ | high | 2026-08-15 | U metodického textu si uložte také jeho autora, cílovou skupinu a případné vazby na RVP. |
| s-gramotnosti | Gramotnosti pro život | education | https://gramotnosti.pro/ | official | free | CZ | high | 2026-08-15 | Importujte jeden metodický materiál s celým zadáním aktivity a uveďte jeho vzdělávací cíl. |
| s-pedf-cuni | Pedagogická fakulta Univerzity Karlovy | education | https://pedf.cuni.cz/ | academic | free | CZ | medium | 2026-08-15 | U akademického materiálu oddělte výzkumné zjištění od stránky katedry nebo kurzu. |
| s-pedf-muni | Pedagogická fakulta Masarykovy univerzity | education | https://www.ped.muni.cz/ | academic | free | CZ | medium | 2026-08-15 | Při práci s výzkumem přidejte plný text nebo abstrakt spolu s bibliografickými údaji. |
| s-msmt-vysoke-skolstvi | Vysoké školství na MŠMT | education | https://msmt.gov.cz/vzdelavani/vysoke-skolstvi | official | free | CZ | high | 2026-08-15 | U legislativního nebo strategického textu zachovejte datum a navazující dokumenty. |
| s-cuni-education | Univerzita Karlova — informace o studiu | education | https://cuni.cz/UK-1.html?lang=cs | academic | free | CZ | limited | 2026-08-15 | Domovskou stránku používejte jen jako orientaci; pro notebook vyberte konkrétní fakultní dokument. |
| s-cuni-studenti | Studium na Univerzitě Karlově | education | https://cuni.cz/UK-1.html | academic | free | CZ | high | 2026-08-15 | Pro studijní rozhodnutí uveďte akademický rok a konkrétní fakultu nebo program. |
| s-muni-studenti | Studium na Masarykově univerzitě | education | https://www.muni.cz/studenti | academic | free | CZ | high | 2026-08-15 | Zachovejte akademický rok a oddělte obecné informace od podmínek konkrétního programu. |
| s-nkp | Národní knihovna ČR | czech-language | https://www.nkp.cz/ | library | free | CZ | medium | 2026-08-15 | Přidejte konkrétní katalogový záznam nebo digitalizát, ne jen domovskou stránku instituce. |
| s-ujc | Ústav pro jazyk český AV ČR | czech-language | https://ujc.cas.cz/ | official | free | CZ | high | 2026-08-15 | U jazykového doporučení si uložte konkrétní heslo nebo odpověď, ne pouze odkaz na poradnu. |
| s-ijp | Internetová jazyková příručka | czech-language | https://prirucka.ujc.cas.cz/ | reference | free | CZ | high | 2026-08-15 | Pro přesnou odpověď zkopírujte konkrétní heslo včetně příkladů a ověřte jeho kontext. |
| s-cnk | Český národní korpus | czech-language | https://www.korpus.cz/ | academic | free | CZ | medium | 2026-08-15 | U výsledků korpusu zachovejte typ korpusu, dotaz a počet výskytů. |
| s-slovnikcestiny | Akademický slovník současné češtiny | czech-language | https://slovnikcestiny.cz/ | reference | free | CZ | high | 2026-08-15 | Importujte heslo s definicí, gramatickými údaji a příklady, nikoli pouze výsledek hledání. |
| s-czechlit | CzechLit — České literární centrum | czech-language | https://www.czechlit.cz/ | reference | free | CZ | high | 2026-08-15 | U autora oddělte biografické údaje, anotaci díla a redakční hodnocení. |
| s-ujc-electronic | Elektronické zdroje ÚJČ | czech-language | https://ujc.cas.cz/cs/elektronicke-slovniky-a-zdroje/ | reference | free | CZ | medium | 2026-08-15 | Rychle najděte vhodný typ zdroje, ale do notebooku pak vložte konkrétní záznam nebo heslo. |
| s-cnk-wiki | Dokumentace Českého národního korpusu | czech-language | https://wiki.korpus.cz/doku.php/start | academic | free | CZ | high | 2026-08-15 | K výsledku přidejte vysvětlení dotazu a definici použitého korpusu. |
| s-mlp | Městská knihovna v Praze | czech-language | https://www.mlp.cz/ | library | free | CZ | high | 2026-08-15 | U e-knihy ověřte licenci a přidejte bibliografická metadata společně s textem. |
| s-knihovny | Knihovny.cz | czech-language | https://www.knihovny.cz/ | library | free | CZ | medium | 2026-08-15 | Výsledek portálu berte jako bibliografickou stopu a otevřete konkrétní dostupný dokument. |
| s-jib | Jednotná informační brána | czech-language | https://www.jib.cz/ | library | free | CZ | medium | 2026-08-15 | U oborové rešerše si ponechte název databáze a instituci, která ji poskytuje. |
| s-obalkyknih | ObalkyKnih.cz | czech-language | https://www.obalkyknih.cz/ | reference | free | CZ | medium | 2026-08-15 | Metadata použijte pro identifikaci vydání, ale věcný obsah ověřte v samotném díle. |
| s-mlp-catalog | Online služby Městské knihovny v Praze | czech-language | https://www.mlp.cz/cz/ | library | free | CZ | medium | 2026-08-15 | U online titulu ponechte autora, vydání, dostupnost a licenční režim konkrétní služby. |
| s-cnb | Česká národní banka | economics | https://www.cnb.cz/cs/ | official | free | CZ | high | 2026-08-15 | U ekonomických témat si hlídejte období, jednotky, revize a metodické poznámky. |
| s-cnb-stat | Statistika ČNB | economics | https://www.cnb.cz/cs/statistika/ | official | free | CZ | high | 2026-08-15 | K časové řadě přidejte název ukazatele, jednotku a datum poslední aktualizace. |
| s-cnb-arad | ARAD — časové řady ČNB | economics | https://www.cnb.cz/cs/statistika/arad-system-casovych-rad/ | open-data | free | CZ | high | 2026-08-15 | Exportujte jen relevantní řadu a ponechte kód, jednotku, periodicitu i zvolený rozsah. |
| s-cnb-financial-stability | Finanční stabilita ČNB | economics | https://www.cnb.cz/cs/financni-stabilita/ | official | free | CZ | high | 2026-08-15 | U zprávy zachovejte rok vydání a oddělte scénář nebo prognózu od pozorovaných dat. |
| s-cnb-inflation | Inflační cíl ČNB | economics | https://www.cnb.cz/cs/menova-politika/inflacni-cil/ | official | free | CZ | high | 2026-08-15 | Pro analýzu přidejte vedle vysvětlení také aktuální prognózu a datum rozhodnutí. |
| s-mf | Ministerstvo financí ČR | economics | https://mf.gov.cz/ | official | free | CZ | high | 2026-08-15 | U rozpočtového dokumentu uveďte rok, typ dokumentu a zda jde o návrh nebo schválený stav. |
| s-mf-stat | Statistiky státního dluhu | economics | https://mf.gov.cz/cs/rozpoctova-politika/rizeni-statniho-dluhu/statistiky | official | free | CZ | high | 2026-08-15 | Importujte tabulku spolu s definicí ukazatele, rokem a informací, zda jde o stav nebo tok. |
| s-mpsv | Ministerstvo práce a sociálních věcí | economics | https://www.mpsv.cz/ | official | free | CZ | high | 2026-08-15 | U ukazatele trhu práce rozlišujte evidovanou nezaměstnanost, výběrová šetření a období. |
| s-mpsv-stat | Statistiky MPSV | economics | https://mpsv.gov.cz/statistiky-1 | official | free | CZ | high | 2026-08-15 | Ke statistice přidejte popis populace a rozlište předběžný od definitivního údaje. |
| s-uradprace | Úřad práce ČR | economics | https://www.uradprace.cz/ | official | free | CZ | high | 2026-08-15 | U regionálního srovnání ponechte kraj, období a definici ukazatele v názvu zdroje. |
| s-cssz | Česká správa sociálního zabezpečení | economics | https://www.cssz.cz/ | official | free | CZ | high | 2026-08-15 | U pravidel a dávek ověřte datum účinnosti a oddělte právní text od praktického vysvětlení. |
| s-suip | Státní úřad inspekce práce | economics | https://www.suip.cz/ | official | free | CZ | high | 2026-08-15 | K metodice přidejte datum a rozlište obecné pravidlo od příkladu z kontroly. |
| s-idea | IDEA při CERGE-EI | economics | https://idea.cerge-ei.cz/ | academic | free | CZ | high | 2026-08-15 | U policy briefu importujte celý text s metodikou a označte, která tvrzení jsou doporučení. |
| s-vse | Vysoká škola ekonomická v Praze | economics | https://www.vse.cz/ | academic | free | CZ | medium | 2026-08-15 | Z univerzitního webu vybírejte konkrétní studii, working paper nebo metodiku, ne obecný profil. |
| s-ecb-economics | Evropská centrální banka | economics | https://www.ecb.europa.eu/home/html/index.en.html | official | free | EU | high | 2026-08-15 | Při srovnání s ČR oddělte eurozónu, EU a národní data a uveďte referenční období. |
| s-eurlex | EUR-Lex | eu | https://eur-lex.europa.eu/ | official | free | EU | high | 2026-08-15 | U právního textu zachovejte číslo předpisu, datum a jazykové znění, se kterým pracujete. |
| s-europarl | Evropský parlament | eu | https://www.europarl.europa.eu/ | official | free | EU | high | 2026-08-15 | U návrhu rozlišujte zprávu výboru, pozměňovací návrh a přijaté znění. |
| s-commission | Evropská komise | eu | https://commission.europa.eu/ | official | free | EU | high | 2026-08-15 | U strategie nebo návrhu uveďte fázi procesu a datum poslední aktualizace. |
| s-eurostat | Eurostat | eu | https://ec.europa.eu/eurostat/ | open-data | free | EU | high | 2026-08-15 | Při srovnání zemí zachovejte kód ukazatele, jednotku, období a metodiku. |
| s-dataeu | data.europa.eu | eu | https://data.europa.eu/ | open-data | free | EU | high | 2026-08-15 | Před importem ověřte poskytovatele datasetu, licenci a poslední aktualizaci. |
| s-cordis | CORDIS | eu | https://cordis.europa.eu/ | academic | free | EU | high | 2026-08-15 | U projektu spojte abstrakt, financování, období a konkrétní výsledek. |
| s-op-eu | Úřad pro publikace EU | eu | https://op.europa.eu/ | library | free | EU | high | 2026-08-15 | U publikace zachovejte katalogové číslo, vydavatele a rok. |
| s-curia | Soudní dvůr Evropské unie | eu | https://curia.europa.eu/ | official | free | EU | high | 2026-08-15 | U rozsudku ponechte číslo věci, datum, typ rozhodnutí a relevantní právní otázku. |
| s-european-union | Oficiální portál Evropské unie | eu | https://european-union.europa.eu/ | official | free | EU | medium | 2026-08-15 | Obecný přehled používejte pro orientaci a navazující dokument otevřete z původní instituce. |
| s-education-eu | Evropský prostor vzdělávání | eu | https://education.ec.europa.eu/ | official | free | EU | high | 2026-08-15 | U evropského dokumentu uveďte program, cílovou úroveň a období politiky. |
| s-school-education-eu | Školní vzdělávání v EU | eu | https://education.ec.europa.eu/education-levels/school-education | official | free | EU | high | 2026-08-15 | Pro český kontext doplňte český kurikulární nebo statistický zdroj. |
| s-eca | Evropský účetní dvůr | eu | https://www.eca.europa.eu/ | official | free | EU | high | 2026-08-15 | U auditu oddělte zjištění, metodiku a doporučení a zachovejte rok zprávy. |
| s-efsa | Evropský úřad pro bezpečnost potravin | eu | https://www.efsa.europa.eu/en | official | free | EU | high | 2026-08-15 | U hodnocení rizik rozlišujte vědecký závěr, nejistotu a politické rozhodnutí. |
| s-edps | Evropský inspektor ochrany údajů | eu | https://www.edps.europa.eu/ | official | free | EU | high | 2026-08-15 | U stanoviska si poznamenejte oblast, adresáta a datum, protože evropské výklady se vyvíjejí. |
| s-eurofound | Eurofound | eu | https://www.eurofound.europa.eu/ | academic | free | EU | high | 2026-08-15 | U srovnávací zprávy zachovejte populaci, období a definici indikátoru. |
| s-european-data-protection | Evropský sbor pro ochranu údajů | eu | https://www.edpb.europa.eu/ | official | free | EU | high | 2026-08-15 | U pokynu uveďte jeho verzi a rozlište právně závazný text od vysvětlujícího materiálu. |
| s-single-market | Jednotný trh EU | eu | https://single-market-economy.ec.europa.eu/ | official | free | EU | high | 2026-08-15 | U regulatorního tématu zachovejte oblast politiky, datum a fázi legislativního procesu. |
| s-na | Národní archiv | history-archives | https://na.gov.cz/ | archive | free | CZ | high | 2026-08-15 | U archivního materiálu si poznamenejte fond, signaturu, období a omezení přístupu. |
| s-na-digital | Digitální badatelna Národního archivu | history-archives | https://na.gov.cz/verejnost/badatelna/digitalni-badatelna | archive | free | CZ | high | 2026-08-15 | Do notebooku přidejte konkrétní záznam nebo dokument a uveďte, zda je veřejný či omezený. |
| s-kramerius-nkp | Digitální knihovna Kramerius NK ČR | history-archives | https://kramerius.nkp.cz/ | library | free | CZ | high | 2026-08-15 | U historického textu přidejte titulní stránku, rok vydání a označte případný OCR šum. |
| s-kramerius-nacr | Kramerius Národního archivu | history-archives | https://kramerius.nacr.cz/about | archive | free | CZ | high | 2026-08-15 | Při práci s periodikem importujte označené číslo a datum, ne pouze výsledek vyhledávání. |
| s-digitalni-knihovna | Česká digitální knihovna | history-archives | https://digitalniknihovna.cz/ | library | free | CZ | medium | 2026-08-15 | Výsledek použijte jako rozcestník a do notebooku vložte konkrétní dokument z partnerské knihovny. |
| s-manuscriptorium | Manuscriptorium | history-archives | https://www.manuscriptorium.com/ | library | free | CZ, EU | high | 2026-08-15 | U rukopisu ponechte identifikátor, dataci a popis digitalizovaného objektu. |
| s-mza | Moravský zemský archiv | history-archives | https://www.mza.cz/ | archive | free | CZ | medium | 2026-08-15 | Při genealogii nebo lokální historii zachovejte archivní fond, lokalitu a časové období. |
| s-ahmp | Archiv hlavního města Prahy | history-archives | https://www.ahmp.cz/ | archive | free | CZ | medium | 2026-08-15 | U pražského pramene uvádějte archivní signaturu, městskou část a historické období. |
| s-mzk | Moravská zemská knihovna | history-archives | https://www.mzk.cz/ | library | free | CZ | medium | 2026-08-15 | Katalogový záznam doplňte plným textem nebo obsahem a respektujte dostupnost díla. |
| s-nm | Národní muzeum | history-archives | https://www.nm.cz/ | official | free | CZ | medium | 2026-08-15 | U muzejního tématu spojte katalogový záznam s popisem sbírky nebo výstavním textem. |
| s-kramerius-nm | Kramerius Národního muzea | history-archives | https://kramerius.nm.cz/ | library | free | CZ | high | 2026-08-15 | U digitalizátu přidejte bibliografický záznam a upozornění na kvalitu OCR. |
| s-ustr | Ústav pro studium totalitních režimů | history-archives | https://www.ustrcr.cz/ | archive | free | CZ | high | 2026-08-15 | Oddělte primární dokument, odbornou studii a pozdější interpretaci autora. |
| s-npu | Národní památkový ústav | history-archives | https://www.npu.cz/ | official | free | CZ | high | 2026-08-15 | U památky přidejte lokalitu, typ objektu a dataci a rozlište popis od odborného hodnocení. |
| s-vhu | Vojenský historický ústav Praha | history-archives | https://www.vhu.cz/ | archive | free | CZ | high | 2026-08-15 | U historické události přidejte časovou osu a oddělte popis exponátu od interpretace. |
| s-europeana | Europeana | history-archives | https://www.europeana.eu/ | library | free | EU | medium | 2026-08-15 | U položky zkontrolujte instituci, licenci a typ objektu, protože agregovaný záznam není vždy plným textem. |
| s-pamatnik-terezin | Památník Terezín | history-archives | https://www.pamatnik-terezin.cz/ | archive | free | CZ | high | 2026-08-15 | U svědectví a archivního dokumentu zachovejte původ, dataci a případná omezení citace. |
| s-who | Světová zdravotnická organizace | international | https://www.who.int/ | official | free | GLOBAL | high | 2026-08-15 | U zdravotního tématu uveďte datum, typ dokumentu a zda jde o doporučení nebo evidenci. |
| s-who-data | WHO Data | international | https://data.who.int/ | open-data | free | GLOBAL | high | 2026-08-15 | K indikátoru přidejte definici, jednotku, populaci a referenční období. |
| s-unesco | UNESCO | international | https://www.unesco.org/ | official | free | GLOBAL | high | 2026-08-15 | U zprávy UNESCO zachovejte rok, region a oddělte globální doporučení od lokálního příkladu. |
| s-unesco-data | UNESCO Data | international | https://data.unesco.org/ | open-data | free | GLOBAL | high | 2026-08-15 | Při srovnání zemí zachovejte kód ukazatele, jednotku a metodické omezení. |
| s-un | Organizace spojených národů | international | https://www.un.org/ | official | free | GLOBAL | high | 2026-08-15 | U rezoluce nebo zprávy vždy přidejte orgán, číslo dokumentu a datum. |
| s-un-data | UNdata | international | https://data.un.org/ | open-data | free | GLOBAL | high | 2026-08-15 | Do názvu tabulky přidejte zdrojovou agenturu, období a jednotku. |
| s-worldbank | World Bank Open Data | international | https://data.worldbank.org/ | open-data | free | GLOBAL | high | 2026-08-15 | U indikátoru zachovejte kód, jednotku, období a definici populace. |
| s-imf | Mezinárodní měnový fond — data | international | https://www.imf.org/en/Data | open-data | free | GLOBAL | high | 2026-08-15 | Rozlišujte pozorovaná data, odhad a prognózu a ponechte metodiku databáze. |
| s-ilo | International Labour Organization | international | https://www.ilo.org/ | official | free | GLOBAL | high | 2026-08-15 | U pracovního ukazatele zkontrolujte definici, populaci a srovnatelnost mezi zeměmi. |
| s-ilostat | ILOSTAT | international | https://ilostat.ilo.org/ | open-data | free | GLOBAL | high | 2026-08-15 | K časové řadě přidejte zdrojový koncept a věkovou či územní skupinu. |
| s-oecd | OECD | international | https://www.oecd.org/ | official | free | GLOBAL | high | 2026-08-15 | U policy zprávy oddělte data OECD od interpretace a doporučení autorů. |
| s-oecd-data | OECD Data | international | https://data.oecd.org/ | open-data | free | GLOBAL | high | 2026-08-15 | U indikátoru zachovejte jednotku, zemi, období a poznámky k metodice. |
| s-fao | FAOSTAT | international | https://www.fao.org/faostat/ | open-data | free | GLOBAL | high | 2026-08-15 | Při práci s daty ponechte jednotku, klasifikaci komodity a rok. |
| s-unicef | UNICEF Data | international | https://data.unicef.org/ | open-data | free | GLOBAL | high | 2026-08-15 | U ukazatele uvádějte věkovou skupinu, region, období a zdrojový průzkum. |
| s-ipcc | IPCC | international | https://www.ipcc.ch/ | academic | free | GLOBAL | high | 2026-08-15 | U klimatické zprávy rozlišujte pozorování, projekci, scénář a míru jistoty. |
| s-wto | World Trade Organization | international | https://www.wto.org/ | official | free | GLOBAL | high | 2026-08-15 | U obchodního ukazatele zachovejte klasifikaci zboží, rok a způsob výpočtu. |
| s-us-census | U.S. Census Bureau Data | international | https://www.census.gov/data.html | official | free | GLOBAL | high | 2026-08-15 | U amerických dat ponechte geografickou úroveň, rok a definici populace. |
| s-nasa-data | NASA Open Data | international | https://data.nasa.gov/ | open-data | free | GLOBAL | high | 2026-08-15 | K datasetu přidejte popis měření, časový rozsah a omezení použití. |
| s-our-world-in-data | Our World in Data | international | https://ourworldindata.org/ | reference | free | GLOBAL | high | 2026-08-15 | U grafu otevřete původní dataset a metodiku; vizualizace sama není úplným zdrojem. |
| s-unhcr | UNHCR | international | https://www.unhcr.org/ | official | free | GLOBAL | high | 2026-08-15 | U dat o vysídlení zachovejte definici skupiny, datum a územní rozsah. |
| s-undp | UNDP | international | https://www.undp.org/ | official | free | GLOBAL | high | 2026-08-15 | U rozvojového indikátoru přidejte definici, zemi, rok a zdrojovou metodiku. |
| s-ctk | Česká tisková kancelář | journalism-fact-check | https://www.ctk.cz/ | journalism | freemium | CZ | medium | 2026-08-15 | Zprávu používejte jako dobový záznam a u důležitého tvrzení hledejte také primární dokument. |
| s-demagog | Demagog.cz | journalism-fact-check | https://demagog.cz/ | fact-check | free | CZ | high | 2026-08-15 | Importujte celý verdikt s použitými odkazy a ověřte, zda je tvrzení stále aktuální. |
| s-manipulatori | Manipulátoři.cz | journalism-fact-check | https://manipulatori.cz/ | fact-check | free | CZ | high | 2026-08-15 | U analýzy oddělte popis tvrzení, důkazní odkazy a redakční závěr. |
| s-hlidac-statu | Hlídač státu | journalism-fact-check | https://www.hlidacstatu.cz/ | journalism | free | CZ | high | 2026-08-15 | U záznamu zachovejte typ registru, datum, instituci a odkaz na původní dokument. |
| s-irozhlas | iROZHLAS | journalism-fact-check | https://www.irozhlas.cz/ | journalism | free | CZ | medium | 2026-08-15 | U článku si poznamenejte datum a rozlišujte zprávu, komentář a rozhovor. |
| s-afp-factcheck | AFP Fact Check | journalism-fact-check | https://factcheck.afp.com/ | fact-check | free | GLOBAL | high | 2026-08-15 | U fact-checku otevřete také odkazovaný primární materiál a zkontrolujte datum publikace. |
| s-fullfact | Full Fact | journalism-fact-check | https://fullfact.org/ | fact-check | free | GLOBAL | high | 2026-08-15 | Pro další použití si uložte tvrzení, verdikt a jednotlivé důkazní odkazy odděleně. |
| s-euvsdisinfo | EUvsDisinfo | journalism-fact-check | https://euvsdisinfo.eu/ | fact-check | free | EU | high | 2026-08-15 | U narativu si ponechte datum, zemi a odkaz na původní tvrzení; databáze není náhradou primárního zdroje. |
| s-ifcn | International Fact-Checking Network | journalism-fact-check | https://www.poynter.org/ifcn/ | fact-check | free | GLOBAL | medium | 2026-08-15 | Použijte ji pro orientaci v metodách a organizacích, konkrétní tvrzení ověřte v původní redakci. |
| s-psp | Poslanecká sněmovna — dokumenty | legislation | https://www.psp.cz/sqw/hp.sqw | official | free | CZ | high | 2026-08-15 | Pro právní rešerši přidejte číslo tisku, datum a fázi projednávání. |
| s-senat | Senát Parlamentu ČR | legislation | https://www.senat.cz/ | official | free | CZ | high | 2026-08-15 | Importujte konkrétní tisk nebo usnesení a oddělte jej od obecného profilu návrhu. |
| s-esbirka | e-Sbírka | legislation | https://e-sbirka.gov.cz/ | official | free | CZ | high | 2026-08-15 | U zákona vždy zachovejte číslo, datum účinnosti a zda pracujete s aktuálním nebo historickým zněním. |
| s-zakony | Portál veřejné správy — e-Legislativa | legislation | https://zakony.gov.cz/ | official | free | CZ | medium | 2026-08-15 | Použijte portál pro orientaci a vlastní text předpisu importujte z e-Sbírky. |
| s-usoud | Ústavní soud | legislation | https://www.usoud.cz/ | official | free | CZ | high | 2026-08-15 | K rozhodnutí přidejte spisovou značku a oddělte právní větu od celého odůvodnění. |
| s-nsoud | Nejvyšší soud | legislation | https://www.nsoud.cz/ | official | free | CZ | high | 2026-08-15 | Při práci s judikaturou uveďte senát, datum a spisovou značku, ne pouze klíčové slovo. |
| s-nssoud | Nejvyšší správní soud | legislation | https://www.nssoud.cz/ | official | free | CZ | high | 2026-08-15 | Importujte celé rozhodnutí včetně výroku a odůvodnění a poznamenejte si datum právní moci. |
| s-justice | Ministerstvo spravedlnosti | legislation | https://justice.cz/ | official | free | CZ | medium | 2026-08-15 | Z rozcestníku vyberte konkrétní metodiku nebo právní dokument a zachovejte jeho aktualizaci. |
| s-msp | Ministerstvo spravedlnosti — otevřená data | legislation | https://msp.gov.cz/ | official | free | CZ | medium | 2026-08-15 | U resortních dat si poznamenejte definici ukazatele a období sběru. |
| s-ochrance | Veřejný ochránce práv | legislation | https://www.ochrance.cz/ | official | free | CZ | high | 2026-08-15 | U stanoviska uveďte oblast, datum a zda jde o obecné doporučení nebo konkrétní případ. |
| s-uoou | Úřad pro ochranu osobních údajů | legislation | https://uoou.gov.cz/ | official | free | CZ | high | 2026-08-15 | Při právním tématu přidejte konkrétní metodiku a datum, protože výklady se mění. |
| s-uradvlady | Úřad vlády ČR | legislation | https://vlada.gov.cz/ | official | free | CZ | high | 2026-08-15 | U usnesení zachovejte číslo a datum a doplňte související materiál vlády. |
| s-odok | ODok — dokumenty vlády | legislation | https://odok.cz/ | official | free | CZ | high | 2026-08-15 | Pro sledování návrhu importujte verzi materiálu a vyznačte datum jeho zveřejnění. |
| s-cnb-legislativa | Legislativa finančního trhu ČNB | legislation | https://www.cnb.cz/cs/dohled-financni-trh/legislativni-zakladna/index.html | official | free | CZ, EU | high | 2026-08-15 | Rozlišujte český předpis, evropské nařízení a metodické stanovisko ČNB. |
| s-ejustice | Evropský portál e-Justice | legislation | https://e-justice.europa.eu/ | official | free | EU | high | 2026-08-15 | U evropského tématu vyberte konkrétní stát a postup, jinak se smíchají různé právní režimy. |
| s-avcr | Akademie věd ČR | science | https://www.avcr.cz/ | official | free | CZ | high | 2026-08-15 | Oddělte popularizační text od původní studie a porovnejte jejich tvrzení. |
| s-gacr | Grantová agentura ČR | science | https://gacr.cz/ | official | free | CZ | high | 2026-08-15 | U grantové výzvy zachovejte rok, oborovou komisi a všechny přílohy k podmínkám. |
| s-tacr | Technologická agentura ČR | science | https://tacr.gov.cz/ | official | free | CZ | high | 2026-08-15 | Při práci s projektem přidejte cíl programu, období a typ očekávaného výsledku. |
| s-rvvi | Hodnocení výzkumu podle Metodiky M17+ | science | https://m17.rvvi.cz/ | official | free | CZ | high | 2026-08-15 | U hodnocení zachovejte období, modul a úroveň agregace a oddělte metodiku od výsledku. |
| s-nusl | Národní úložiště šedé literatury | science | https://www.nusl.cz/ | library | free | CZ | high | 2026-08-15 | U záznamu šedé literatury zkontrolujte typ dokumentu, instituci a dostupnost plného textu. |
| s-nusl-repository | Digitální repozitář NUŠL | science | https://invenio.nusl.cz/ | library | free | CZ | high | 2026-08-15 | Do notebooku přidejte PDF spolu s bibliografickým záznamem a licencí dokumentu. |
| s-czechelib | CzechELib | science | https://www.czechelib.cz/ | library | institutional | CZ | medium | 2026-08-15 | Rozlišujte katalog zdroje od plného textu, ke kterému může být potřeba institucionální přístup. |
| s-techlib | Národní technická knihovna | science | https://www.techlib.cz/ | library | free | CZ | medium | 2026-08-15 | Katalogový záznam doplňte plným textem nebo abstraktem, pokud je veřejně dostupný. |
| s-cuni | Univerzita Karlova — výzkum | science | https://cuni.cz/ | academic | free | CZ | limited | 2026-08-15 | Domovskou stránku berte jako rozcestník a do notebooku vložte konkrétní publikaci nebo projekt. |
| s-muni | Masarykova univerzita — výzkum | science | https://www.muni.cz/ | academic | free | CZ | limited | 2026-08-15 | Vybraný výzkumný výstup označte fakultou, rokem a typem publikace. |
| s-vut | Vysoké učení technické v Brně | science | https://www.vut.cz/ | academic | free | CZ | medium | 2026-08-15 | Při technickém tématu přidejte celý článek nebo technickou zprávu, ne pouze anotaci. |
| s-upol | Univerzita Palackého v Olomouci | science | https://www.upol.cz/ | academic | free | CZ | medium | 2026-08-15 | U univerzitního zdroje si zaznamenejte autora, pracoviště a rok publikace. |
| s-cesnet | CESNET | science | https://www.cesnet.cz/ | official | free | CZ | medium | 2026-08-15 | U technického dokumentu si ponechte verzi, rozsah služby a předpoklady použití. |
| s-czechglobe | CzechGlobe | science | https://www.czechglobe.cz/ | academic | free | CZ | high | 2026-08-15 | U studie oddělte pozorovaná data, modelový scénář a nejistotu projekce. |
| s-lib-cas | Knihovna AV ČR | science | https://www.lib.cas.cz/ | library | free | CZ | medium | 2026-08-15 | Katalogový záznam doplňte abstraktem nebo plným textem, pokud jej licence dovoluje. |
| s-dml | Česká digitální matematická knihovna | science | https://www.dml.cz/ | library | free | CZ | high | 2026-08-15 | Přidejte článek s bibliografickými údaji a rozlište historickou publikaci od současné interpretace. |
| s-pmc | PubMed Central | science | https://pmc.ncbi.nlm.nih.gov/ | academic | free | GLOBAL | high | 2026-08-15 | Při zdravotních tématech kontrolujte datum, typ studie, populaci a omezení. |
| s-pubmed | PubMed | science | https://pubmed.ncbi.nlm.nih.gov/ | academic | free | GLOBAL | medium | 2026-08-15 | Vyhledávací záznam nahraďte konkrétním článkem nebo abstraktem a uveďte typ studie. |
| s-scholar | Google Scholar | science | https://scholar.google.com/ | reference | free | GLOBAL | limited | 2026-08-15 | Do notebooku importujte konkrétní článek nebo PDF, ne výsledky vyhledávání bez kontextu. |
| s-arxiv | arXiv | science | https://arxiv.org/ | academic | free | GLOBAL | high | 2026-08-15 | U preprintu uveďte verzi a datum; výsledek nemusí být recenzovaný. |
| s-crossref | Crossref | science | https://www.crossref.org/ | reference | free | GLOBAL | medium | 2026-08-15 | Metadata používejte k dohledání článku; pro věcnou práci importujte plný text nebo abstrakt. |
| s-openaire | OpenAIRE | science | https://www.openaire.eu/ | academic | free | EU | high | 2026-08-15 | U záznamu ověřte původní repozitář a licenci plného textu. |
| s-zenodo | Zenodo | science | https://zenodo.org/ | academic | free | GLOBAL | high | 2026-08-15 | U záznamu zachovejte DOI, verzi a licenci a rozlišujte dataset od článku. |
| s-core | CORE | science | https://core.ac.uk/ | academic | free | GLOBAL | medium | 2026-08-15 | Výsledek použijte k nalezení originálního repozitáře a plného textu s licencí. |
| s-doaj | Directory of Open Access Journals | science | https://doaj.org/ | reference | free | GLOBAL | medium | 2026-08-15 | U článku si ověřte časopis, recenzní režim, DOI a licenci konkrétního textu. |
| s-cszu | Český statistický úřad | statistics | https://www.czso.cz/ | official | free | CZ | high | 2026-08-15 | Začněte tematickou stránkou a přidejte jen tabulky relevantní k otázce. |
| s-data-gov | Národní katalog otevřených dat | statistics | https://data.gov.cz/ | open-data | free | CZ | high | 2026-08-15 | Přidejte popis datasetu i konkrétní distribuci, aby Gemini Notebook znal strukturu dat. |
| s-cszu-products | Produkty ČSÚ | statistics | https://www.czso.cz/csu/czso/produkty | official | free | CZ | high | 2026-08-15 | U publikace importujte také metodickou část a poznamenejte si referenční období. |
| s-cszu-vdb | Veřejná databáze ČSÚ | statistics | https://vdb.czso.cz/vdbvo2/ | open-data | free | CZ | high | 2026-08-15 | Exportovanou tabulku vždy ponechte spolu s názvem ukazatele, jednotkou a filtrem. |
| s-cszu-open-data | Otevřená data ČSÚ | statistics | https://csu.gov.cz/otevrena_data | open-data | free | CZ | high | 2026-08-15 | K datové sadě přidejte datový slovník a popis aktualizace, ne jen stažený soubor. |
| s-census | Sčítání lidu, domů a bytů | statistics | https://scitani.gov.cz/ | official | free | CZ | high | 2026-08-15 | U výsledku uveďte rok sčítání a územní úroveň, aby se nesrovnávala různá období. |
| s-cszu-rso | Registr sčítacích obvodů a budov | statistics | https://apl2.czso.cz/irso4/rep2.jsp | open-data | free | CZ | high | 2026-08-15 | U výstupu zachovejte datum platnosti dat a zvolenou územní úroveň. |
| s-opendata-praha | Otevřená data hlavního města Prahy | statistics | https://opendata.praha.eu/ | open-data | free | CZ | high | 2026-08-15 | Před importem si zapište poskytovatele, období a licenci konkrétní datové sady. |
| s-opendata-brno | Otevřená data města Brna | statistics | https://opendata.brno.cz/ | open-data | free | CZ | high | 2026-08-15 | Importujte datový slovník spolu s hodnotami a oddělte aktuální stav od časové řady. |
| s-opendata-ostrava | Otevřená data Ostravy | statistics | https://opendata.ostrava.cz/ | open-data | free | CZ | high | 2026-08-15 | U městského datasetu ponechte datum aktualizace a geografický rozsah. |
| s-opendata-plzen | Otevřená data Plzně | statistics | https://opendata.plzen.eu/ | open-data | free | CZ | high | 2026-08-15 | K datasetu přidejte jeho popis a uveďte, zda jde o okamžitý stav nebo historická data. |
| s-chmi | Český hydrometeorologický ústav | statistics | https://www.chmi.cz/ | official | free | CZ | high | 2026-08-15 | U časové řady zachovejte stanici, jednotku, interval měření a datum stažení. |
| s-cuzk | Český úřad zeměměřický a katastrální | statistics | https://www.cuzk.cz/ | official | free | CZ | medium | 2026-08-15 | U mapových a územních dat popište souřadnicový systém a časovou platnost. |
| s-cuzk-geoportal | Geoportál ČÚZK | statistics | https://geoportal.cuzk.cz/ | open-data | free | CZ | medium | 2026-08-15 | K mapové službě přidejte legendu a popis vrstvy, jinak zůstane samotná URL bez významu. |
| s-inspire-geoportal | INSPIRE Geoportal EU | statistics | https://inspire-geoportal.ec.europa.eu/ | open-data | free | EU | medium | 2026-08-15 | U mapové vrstvy ponechte poskytovatele, metadatový záznam, souřadnicový systém a územní rozsah. |
| s-mf-open-data | Portál otevřených dat Ministerstva financí | statistics | https://data.mf.gov.cz/ | open-data | free | CZ | high | 2026-08-15 | U resortního datasetu zachovejte definici ukazatele, zdrojovou instituci a období. |
| s-data-gov-datasets | Datové sady Národního katalogu | statistics | https://data.gov.cz/datov%C3%A9-sady | open-data | free | CZ | high | 2026-08-15 | Do notebooku kopírujte vybranou stránku datasetu a jeho distribuci, ne celý katalog. |
| s-czechstats-metadata | Statistické proměnné ČSÚ | statistics | https://csu.gov.cz/statisticke-promenne-ukazatele | official | free | CZ | high | 2026-08-15 | Metadatový záznam importujte spolu s tabulkou, na kterou se vztahuje, aby šla čísla správně interpretovat. |
| s-eurostat-cz-data | Eurostat — prohlížeč dat | statistics | https://ec.europa.eu/eurostat/databrowser/ | open-data | free | EU | high | 2026-08-15 | Při srovnání zachovejte kód ukazatele, jednotku a metodiku Eurostatu. |
| s-data-eu | European Data Portal — anglické rozhraní | statistics | https://data.europa.eu/en | open-data | free | EU | high | 2026-08-15 | Před importem ověřte poskytovatele datasetu, licenci a poslední aktualizaci. |
| s-cszu-volby | Volby a volební statistiky ČSÚ | statistics | https://www.czso.cz/csu/czso/volby | official | free | CZ | high | 2026-08-15 | U volebních výsledků zachovejte typ voleb, rok, územní úroveň a počet mandátů. |
| s-cszu-population | Obyvatelstvo ČSÚ | statistics | https://www.czso.cz/csu/czso/obyvatelstvo | official | free | CZ | high | 2026-08-15 | U demografického údaje uveďte období, území a zda jde o stav, tok nebo odhad. |

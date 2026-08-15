export type PromptTarget = 'chat' | 'chat-settings' | 'audio' | 'slides' | 'infographic' | 'video' | 'other';
export type FavoriteType = 'prompt' | 'source' | 'tool' | 'notebook' | 'guide';

export type Audience = 'teacher' | 'student' | 'researcher' | 'general';
export type EducationLevel = 'primary' | 'secondary' | 'vocational' | 'university';

export interface Provenance {
  author?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  retrievedAt?: string;
  license?: string;
  needsReview?: boolean;
}

export interface Prompt extends Provenance {
  id: string;
  slug: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
  tags: string[];
  target: PromptTarget;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
  audience?: Audience[];
  educationLevel?: EducationLevel[];
}

export type SourceAccess = 'free' | 'freemium' | 'paid' | 'institutional';

export interface Source extends Provenance {
  id: string;
  title: string;
  url: string;
  domain: string;
  category: string;
  description: string;
  importTip?: string;
  access: SourceAccess;
  language?: string[];
  region?: string[];
  featured?: boolean;
}

export interface Tool extends Provenance {
  id: string;
  title: string;
  author?: string;
  type: string;
  description: string;
  tags: string[];
  pricing: 'free' | 'freemium' | 'paid' | 'open source';
  url: string;
  github?: string;
  featured?: boolean;
}

export interface PublicNotebook extends Provenance {
  id: string;
  title: string;
  author?: string;
  publisher?: string;
  category: string;
  description: string;
  url: string;
}

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Guide extends Provenance {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingMinutes: number;
  updatedAt?: string;
  tags: string[];
  content: GuideSection[];
  featured?: boolean;
}

export interface PromptCategory {
  id: string;
  label: string;
  eyebrow: string;
  description: string;
  color: string;
}

export const promptCategories: PromptCategory[] = [
  { id: 'deep-analysis', label: 'Hloubková analýza', eyebrow: 'Pochopit', description: 'Porovnávejte zdroje, hledejte rozpory a ověřujte závěry.', color: 'sage' },
  { id: 'setup-accuracy', label: 'Nastavení a přesnost', eyebrow: 'Nastavit', description: 'Dejte chatu jasná pravidla, limity a ověřovací stopu.', color: 'blue' },
  { id: 'study-exam-prep', label: 'Studium a příprava', eyebrow: 'Naučit se', description: 'Proměňte materiály v otázky, kartičky a plán učení.', color: 'amber' },
  { id: 'audio-overviews', label: 'Audio přehledy', eyebrow: 'Poslouchat', description: 'Navrhněte scénář, role hostů i rytmus audio přehledu.', color: 'rose' },
  { id: 'slides-video-infographics', label: 'Prezentace a vizuály', eyebrow: 'Vytvořit', description: 'Získejte srozumitelnou osnovu pro slidy, video nebo infografiku.', color: 'violet' },
  { id: 'writing-content', label: 'Psaní a tvorba obsahu', eyebrow: 'Napsat', description: 'Tvořte texty pevně ukotvené v dodaných zdrojích.', color: 'teal' },
  { id: 'strategy-decisions', label: 'Strategie a rozhodování', eyebrow: 'Rozhodnout', description: 'Oddělte fakta, varianty, rizika a další kroky.', color: 'orange' },
  { id: 'workflows', label: 'Workflow', eyebrow: 'Opakovat', description: 'Sestavte z více kroků spolehlivý pracovní postup.', color: 'slate' },
];

const projectProvenance: Provenance = {
  author: 'Notebook Hub CZ',
  sourceLabel: 'Originální obsah projektu',
  retrievedAt: '2026-08-15',
  license: 'CC BY-NC 4.0 — obsah projektu',
};

export const prompts: Prompt[] = [
  { ...projectProvenance, id: 'p-srovnej-zdroje', slug: 'srovnej-zdroje', title: 'Srovnej zdroje bez zkratek', description: 'Vytáhne shody, rozpory a místa, kde si zdroje odporují.', prompt: 'Pracuj pouze s přiloženými zdroji. Nejprve u každého uveď hlavní tvrzení a jeho oporu. Poté vytvoř tabulku: shoda, rozpor, doplňující detail a chybějící informace. U každého závěru uveď zdroj a jasně označ nejistotu.', category: 'deep-analysis', tags: ['srovnání', 'ověřování', 'výzkum'], target: 'chat', featured: true, audience: ['researcher', 'student'] },
  { ...projectProvenance, id: 'p-argumentacni-audit', slug: 'argumentacni-audit', title: 'Argumentační audit', description: 'Otestuje hlavní závěr proti důkazům a alternativním vysvětlením.', prompt: 'Najdi nejsilnější argument v dodaných materiálech. Rekonstruuj jej v pěti krocích, pojmenuj skryté předpoklady a navrhni tři námitky. U každé námitky napiš, jaký konkrétní důkaz by ji potvrdil nebo oslabil. Nevymýšlej fakta mimo zdroje.', category: 'deep-analysis', tags: ['kritické myšlení', 'argumentace'], target: 'chat', featured: true, audience: ['researcher', 'general'] },
  { ...projectProvenance, id: 'p-ochranne-zabrany', slug: 'ochranne-zabrany-pro-chat', title: 'Ochranné zábrany pro chat', description: 'Připne pravidla pro citace, nejistotu a práci s chybějícími údaji.', prompt: 'Dodržuj tato pravidla: 1) používej jen vybrané zdroje, 2) každé důležité tvrzení opatři odkazem na zdroj, 3) odliš fakt, interpretaci a návrh, 4) pokud odpověď ve zdrojích není, napiš to výslovně, 5) před finální odpovědí uveď krátkou kontrolu limitů.', category: 'setup-accuracy', tags: ['přesnost', 'citace', 'chat settings'], target: 'chat-settings', featured: true, audience: ['general', 'researcher'] },
  { ...projectProvenance, id: 'p-karticky-s-odkazy', slug: 'karticky-s-odkazy-na-strany', title: 'Kartičky s odkazy na strany', description: 'Připraví studijní kartičky a u každé zachová stopu ke zdroji.', prompt: 'Vytvoř 15 oboustranných kartiček z vybraných zdrojů. Na líci polož jednu jasnou otázku, na rubu odpověz stručně a přidej stránku nebo přesný název zdroje. Střídej definice, příčiny a důsledky. Nezahrnuj informace, které nelze doložit.', category: 'study-exam-prep', tags: ['kartičky', 'maturita', 'učení'], target: 'chat', featured: true, audience: ['student'], educationLevel: ['secondary', 'university'] },
  { ...projectProvenance, id: 'p-plan-pripravy', slug: 'plan-pripravy-na-zkousku', title: 'Plán přípravy na zkoušku', description: 'Rozloží látku do realistických bloků podle dostupných materiálů.', prompt: 'Z dodaných materiálů vytvoř čtyřtýdenní plán přípravy. Nejdříve seřaď témata podle návaznosti a obtížnosti, potom navrhni krátké bloky s opakováním a sebekontrolou. U každého bloku uveď, ze kterého zdroje vychází. Nehádej časovou náročnost bez označení odhadu.', category: 'study-exam-prep', tags: ['plán', 'zkouška', 'student'], target: 'chat', audience: ['student', 'teacher'], educationLevel: ['secondary', 'university'] },
  { ...projectProvenance, id: 'p-audio-pro-ucitele', slug: 'audio-prehled-pro-ucitele', title: 'Audio přehled pro učitele', description: 'Navrhne krátký dialogický přehled s důrazem na použitelné závěry.', prompt: 'Navrhni scénář desetiminutového audio přehledu pro učitele. Dva hosté vysvětlí hlavní myšlenky zdrojů, upozorní na rozdíly a zakončí třemi otázkami do výuky. Používej jazyk srozumitelný bez vizuální opory a u každého faktu zachovej odkaz na zdroj.', category: 'audio-overviews', tags: ['audio', 'učitelé', 'výuka'], target: 'audio', featured: true, audience: ['teacher'], educationLevel: ['primary', 'secondary'] },
  { ...projectProvenance, id: 'p-vyukova-infografika', slug: 'vyukova-infografika', title: 'Výuková infografika krok za krokem', description: 'Převádí složité téma do struktury, kterou lze bezpečně zkontrolovat.', prompt: 'Navrhni osnovu jedné výukové infografiky. Uveď cílovou skupinu, hlavní sdělení, pořadí bloků, krátké popisky a návrhy vizuálních metafor. Každý údaj připoj ke zdroji. Pokud je téma příliš široké, nejprve navrhni zúžení.', category: 'slides-video-infographics', tags: ['infografika', 'výuka', 'vizuál'], target: 'infographic', audience: ['teacher', 'student'] },
  { ...projectProvenance, id: 'p-osnova-prezentace', slug: 'osnova-prezentace-z-vyzkumu', title: 'Osnova prezentace z výzkumu', description: 'Připraví čistou osnovu prezentace bez nafukování tvrzení.', prompt: 'Zpracuj zdroje do osnovy prezentace o 8 slidech. Každý slide má jeden titulek, jednu hlavní myšlenku, nejvýše tři podpůrné body a poznámku ke zdroji. Na konci uveď, co z materiálů nelze tvrdit. Nepřidávej dekorativní obsah.', category: 'slides-video-infographics', tags: ['prezentace', 'výzkum', 'slidy'], target: 'slides', audience: ['researcher', 'student'] },
  { ...projectProvenance, id: 'p-osnova-clanku', slug: 'osnova-clanku-se-zdroji', title: 'Osnova článku se zdroji', description: 'Z výzkumných materiálů vytvoří redakční kostru a hlídá nepodložené mezery.', prompt: 'Navrhni osnovu článku pro českého čtenáře. U každé části uveď účel, otázku, kterou zodpovídá, a zdroje, o které se může opřít. Odděl ověřená tvrzení od míst, která vyžadují další rešerši. Nepsat hotový článek.', category: 'writing-content', tags: ['článek', 'rešerše', 'psaní'], target: 'chat', featured: true, audience: ['general', 'researcher'] },
  { ...projectProvenance, id: 'p-rozhodovaci-memo', slug: 'rozhodovaci-memo', title: 'Rozhodovací memo', description: 'Z dokumentů vytáhne varianty, rizika a doporučený další krok.', prompt: 'Připrav jednostránkové rozhodovací memo. Shrň situaci, rozhodnutí, které je třeba udělat, dostupné varianty, důkazy pro a proti, hlavní rizika a neznámé. Na závěr doporuč jeden další krok a uveď, jaký nový důkaz by doporučení změnil.', category: 'strategy-decisions', tags: ['strategie', 'rozhodování', 'memo'], target: 'chat', audience: ['general', 'researcher'] },
  { ...projectProvenance, id: 'p-vyzkumny-workflow', slug: 'vyzkumny-workflow', title: 'Výzkumný workflow od zdroje k výstupu', description: 'Rozdělí opakovatelnou práci na triáž, syntézu, kontrolu a výstup.', prompt: 'Navrhni opakovatelný workflow pro práci s těmito zdroji: 1) inventura a kvalita, 2) otázky a mezery, 3) syntéza s citacemi, 4) red-team kontrola, 5) výstup pro cílové publikum. U každého kroku definuj vstup, výstup a kontrolní otázku.', category: 'workflows', tags: ['workflow', 'rešerše', 'proces'], target: 'chat', audience: ['researcher', 'teacher'] },
  { ...projectProvenance, id: 'p-komunitni-navrh', slug: 'komunitni-navrh-ke-kontrole', title: 'Komunitní návrh ke kontrole', description: 'Příklad z připravovaného katalogu; před publikací vyžaduje ověření licence a původu.', prompt: 'TODO: Tento záznam slouží jen jako kontrolovaný příklad příchozího komunitního návrhu. Před publikací doplň původní text, autora, licenci a ověř, zda je reprodukce povolená.', category: 'workflows', tags: ['komunita', 'review'], target: 'other', needsReview: true, sourceLabel: 'Příchozí návrh — čeká na ověření', audience: ['general'] },
];

export const sources: Source[] = [
  { id: 's-cszu', title: 'Český statistický úřad', url: 'https://www.czso.cz/', domain: 'czso.cz', category: 'Statistiky', description: 'Oficiální statistiky o obyvatelstvu, ekonomice, školství a společnosti.', importTip: 'Začněte tematickou stránkou a přidejte jen tabulky relevantní k otázce.', access: 'free', language: ['cs'], region: ['Česká republika'], featured: true, sourceLabel: 'Oficiální instituce', retrievedAt: '2026-08-15', license: 'Dle podmínek ČSÚ' },
  { id: 's-data-gov', title: 'Národní katalog otevřených dat', url: 'https://data.gov.cz/', domain: 'data.gov.cz', category: 'Otevřená data', description: 'Centrální katalog českých otevřených dat a jejich poskytovatelů.', importTip: 'Přidejte popis datasetu i samotná data, aby NotebookLM znal kontext.', access: 'free', language: ['cs'], region: ['Česká republika'], featured: true, sourceLabel: 'Vláda ČR', retrievedAt: '2026-08-15', license: 'Podle licence konkrétního datasetu' },
  { id: 's-csicr', title: 'Česká školní inspekce', url: 'https://www.csicr.cz/', domain: 'csicr.cz', category: 'Školství', description: 'Inspekční zprávy, tematické zprávy a data o kvalitě vzdělávání.', importTip: 'Pro srovnání školních témat přidejte zprávu a metodiku jako dva samostatné zdroje.', access: 'free', language: ['cs'], region: ['Česká republika'], featured: true, sourceLabel: 'Oficiální instituce', retrievedAt: '2026-08-15', license: 'Dle podmínek ČŠI' },
  { id: 's-psp', title: 'Poslanecká sněmovna — dokumenty', url: 'https://www.psp.cz/', domain: 'psp.cz', category: 'Legislativa', description: 'Návrhy zákonů, stenoprotokoly a další parlamentní dokumenty.', importTip: 'Pro právní rešerši vždy přidejte také datum a typ dokumentu.', access: 'free', language: ['cs'], region: ['Česká republika'], sourceLabel: 'Parlament ČR', retrievedAt: '2026-08-15', license: 'Dle podmínek PSP ČR' },
  { id: 's-cnb', title: 'Česká národní banka', url: 'https://www.cnb.cz/', domain: 'cnb.cz', category: 'Ekonomika', description: 'Statistiky, měnová politika, zprávy a datové řady ČNB.', importTip: 'U ekonomických témat si hlídejte období, jednotky a revize dat.', access: 'free', language: ['cs'], region: ['Česká republika'], sourceLabel: 'Oficiální instituce', retrievedAt: '2026-08-15', license: 'Dle podmínek ČNB' },
  { id: 's-avcr', title: 'Akademie věd ČR', url: 'https://www.avcr.cz/', domain: 'avcr.cz', category: 'Věda', description: 'Výzkumné zprávy, popularizační texty a informace o české vědě.', importTip: 'Oddělte popularizační text od původní studie a porovnejte jejich tvrzení.', access: 'free', language: ['cs'], region: ['Česká republika'], sourceLabel: 'Akademie věd ČR', retrievedAt: '2026-08-15', license: 'Dle podmínek AV ČR' },
  { id: 's-nkp', title: 'Národní knihovna ČR', url: 'https://www.nkp.cz/', domain: 'nkp.cz', category: 'Český jazyk', description: 'Katalogy, digitalizované fondy a autoritní informace pro práci s textem.', importTip: 'Přidejte konkrétní katalogový záznam, ne jen domovskou stránku instituce.', access: 'free', language: ['cs'], region: ['Česká republika'], sourceLabel: 'Národní knihovna ČR', retrievedAt: '2026-08-15', license: 'Dle podmínek NK ČR' },
  { id: 's-scholar', title: 'Google Scholar', url: 'https://scholar.google.com/', domain: 'scholar.google.com', category: 'Výzkum', description: 'Vyhledávač odborné literatury a citací napříč obory.', importTip: 'Do notebooku importujte konkrétní článek nebo PDF, ne výsledky vyhledávání bez kontextu.', access: 'free', language: ['cs', 'en'], region: ['globální'], featured: true, sourceLabel: 'Vyhledávač odborné literatury', retrievedAt: '2026-08-15' },
  { id: 's-arxiv', title: 'arXiv', url: 'https://arxiv.org/', domain: 'arxiv.org', category: 'Výzkum', description: 'Otevřený archiv preprintů z fyziky, matematiky, informatiky a dalších oborů.', importTip: 'U preprintu uveďte verzi a datum; výsledek nemusí být recenzovaný.', access: 'free', language: ['en'], region: ['globální'], sourceLabel: 'Open-access archiv', retrievedAt: '2026-08-15', license: 'Podle konkrétního záznamu' },
  { id: 's-pmc', title: 'PubMed Central', url: 'https://pmc.ncbi.nlm.nih.gov/', domain: 'pmc.ncbi.nlm.nih.gov', category: 'Věda', description: 'Volně dostupný archiv biomedicínské a přírodovědné literatury.', importTip: 'Při zdravotních tématech kontrolujte datum, typ studie a populaci.', access: 'free', language: ['en'], region: ['globální'], sourceLabel: 'Národní lékařská knihovna USA', retrievedAt: '2026-08-15' },
];

export const tools: Tool[] = [
  { id: 't-notebooklm', title: 'NotebookLM', author: 'Google', type: 'Základní nástroj', description: 'Oficiální prostředí pro práci s vlastními zdroji, otázkami a výstupy.', tags: ['workflow', 'zdroje'], pricing: 'freemium', url: 'https://notebooklm.google/', featured: true, sourceLabel: 'Oficiální web', retrievedAt: '2026-08-15' },
  { id: 't-zotero', title: 'Zotero', author: 'Corporation for Digital Scholarship', type: 'Výzkum', description: 'Správa odborných zdrojů, citací a PDF před rešerší v NotebookLM.', tags: ['výzkum', 'citace', 'open source'], pricing: 'open source', url: 'https://www.zotero.org/', featured: true, sourceLabel: 'Oficiální web', retrievedAt: '2026-08-15' },
  { id: 't-takeout', title: 'Google Takeout', author: 'Google', type: 'Export a archivace', description: 'Nástroj pro export vlastních dat a vytvoření offline archivu.', tags: ['export', 'záloha'], pricing: 'free', url: 'https://takeout.google.com/', sourceLabel: 'Oficiální web', retrievedAt: '2026-08-15' },
  { id: 't-markmap', title: 'Markmap', author: 'Markmap contributors', type: 'Vizuální výstup', description: 'Otevřený nástroj pro převod Markdown osnovy na interaktivní myšlenkovou mapu.', tags: ['infografika', 'open source'], pricing: 'open source', url: 'https://markmap.js.org/', github: 'https://github.com/markmap/markmap', sourceLabel: 'Oficiální projekt', retrievedAt: '2026-08-15' },
  { id: 't-scholar', title: 'Google Scholar', author: 'Google', type: 'Výzkum', description: 'Rychlý start pro hledání odborných článků, které potom přidáte jako zdroje.', tags: ['výzkum', 'zdroje'], pricing: 'free', url: 'https://scholar.google.com/', sourceLabel: 'Oficiální web', retrievedAt: '2026-08-15' },
  { id: 't-obsidian', title: 'Obsidian', author: 'Obsidian', type: 'Organizace', description: 'Lokální poznámkový systém pro přípravu otázek, kontextu a následných poznámek.', tags: ['poznámky', 'workflow'], pricing: 'freemium', url: 'https://obsidian.md/', sourceLabel: 'Oficiální web', retrievedAt: '2026-08-15' },
  { id: 't-surf', title: 'SurfSense', author: 'SurfSense contributors', type: 'Výzkum', description: 'Open-source alternativa pro prohledávání vlastních znalostních zdrojů.', tags: ['open source', 'výzkum', 'MCP'], pricing: 'open source', url: 'https://github.com/MODSetter/SurfSense', github: 'https://github.com/MODSetter/SurfSense', sourceLabel: 'GitHub repository', retrievedAt: '2026-08-15' },
  { id: 't-watermark', title: 'Odstranění vodoznaku', author: 'Notebook Hub CZ', type: 'Experimentální nástroj', description: 'Bezpečnostně popsaná připravovaná utilita pro vlastní exporty; zpracování zatím není aktivní.', tags: ['experimentální', 'lokální'], pricing: 'free', url: '/nastroje/odstraneni-vodoznaku', sourceLabel: 'Originální obsah projektu', retrievedAt: '2026-08-15' },
];

export const notebooks: PublicNotebook[] = [
  { id: 'n-otevrena-data', title: 'Jak číst otevřená data', publisher: 'Česká data pro každého', category: 'Otevřená data', description: 'Veřejný notebook s metodikou, slovníkem pojmů a příklady práce s datovými katalogy.', url: 'https://notebooklm.google/', sourceLabel: 'Odkaz na veřejný notebook bude doplněn po ověření', needsReview: true },
  { id: 'n-studium-biologie', title: 'Biologie pro opakování', author: 'OpenStax', category: 'Studium', description: 'Ukázková struktura zdrojů pro opakování biologie, otázky a pojmové mapy.', url: 'https://notebooklm.google/', sourceUrl: 'https://openstax.org/subjects/science', sourceLabel: 'OpenStax', retrievedAt: '2026-08-15' },
  { id: 'n-vyzkumny-projekt', title: 'Výzkumný projekt od otázky k závěru', publisher: 'Notebook Hub CZ', category: 'Výzkum', description: 'Originální demonstrační notebook s ukázkou triáže zdrojů a závěrečného rozhodovacího mema.', url: 'https://notebooklm.google/', sourceLabel: 'Originální obsah projektu', retrievedAt: '2026-08-15' },
  { id: 'n-dejiny-regionu', title: 'Dějiny regionu z primárních pramenů', publisher: 'Notebook Hub CZ', category: 'Historie', description: 'Šablona pro práci s kronikou, mapou a sekundární literaturou bez míchání typů důkazů.', url: 'https://notebooklm.google/', sourceLabel: 'Originální obsah projektu', retrievedAt: '2026-08-15' },
  { id: 'n-ucitelska-porada', title: 'Příprava učitelské porady', publisher: 'Notebook Hub CZ', category: 'Pro učitele', description: 'Praktický notebook pro přípravu porady, shrnutí podkladů a otázky k rozhodnutí.', url: 'https://notebooklm.google/', sourceLabel: 'Originální obsah projektu', retrievedAt: '2026-08-15' },
  { id: 'n-cizojazycne-texty', title: 'Čtení cizojazyčných textů', publisher: 'Notebook Hub CZ', category: 'Jazyky', description: 'Pracovní prostor pro slovník, argumentační mapu a porovnání překladových variant.', url: 'https://notebooklm.google/', sourceLabel: 'Originální obsah projektu', retrievedAt: '2026-08-15' },
];

export const guides: Guide[] = [
  { ...projectProvenance, id: 'g-prvni-notebook', slug: 'prvni-notebook-bez-chaosu', title: 'První notebook bez chaosu: od otázky ke zdroji', excerpt: 'Jednoduchý postup, jak si před importem ujasnit otázku, hranice a očekávaný výstup.', category: 'Jak na to', readingMinutes: 6, updatedAt: '2026-08-15', tags: ['začínáme', 'workflow'], featured: true, content: [
    { heading: 'Začněte otázkou, ne tlačítkem', paragraphs: ['Notebook funguje lépe, když nejprve formulujete, co chcete rozhodnout, vysvětlit nebo vytvořit. Jedna věta s cílem omezí množství slepých odboček.', 'Zapište si také publikum a podobu výstupu. Jinak vypadá odpověď pro maturanta, jinak podklad pro poradu.'] },
    { heading: 'Vyberte zdroje s jasnou rolí', paragraphs: ['Každý importovaný dokument by měl mít důvod. Kombinujte primární materiál s metodikou nebo kontextem, ale nepřidávejte desítky odkazů jen proto, aby notebook vypadal plnější.'], bullets: ['Pojmenujte zdroj tak, aby byl rozpoznatelný.', 'U dlouhého dokumentu si označte relevantní kapitoly.', 'Nechte si vypsat mezery dříve, než začnete psát výstup.'] },
  ] },
  { ...projectProvenance, id: 'g-citace-a-overeni', slug: 'citace-a-overeni-odpovedi', title: 'Jak si pohlídat citace a ověřitelnost odpovědi', excerpt: 'Praktická kontrola, která odděluje citované tvrzení, interpretaci a domněnku.', category: 'Průvodce', readingMinutes: 8, updatedAt: '2026-08-12', tags: ['citace', 'přesnost'], content: [
    { heading: 'Tři vrstvy odpovědi', paragraphs: ['Odpověď si rozdělte na tvrzení přímo doložená zdrojem, interpretaci vzniklou spojením více míst a návrh dalšího kroku. Tyto vrstvy se nemají tvářit stejně jistě.'] },
    { heading: 'Kontrolní prompt', paragraphs: ['Po každém delším výstupu si vyžádejte audit: která tvrzení mají oporu, která jsou odvozená a co ve zdrojích chybí. Kontrola není záruka pravdy, ale odhalí místa pro ruční ověření.'] },
  ] },
  { ...projectProvenance, id: 'g-prace-pro-ucitele', slug: 'notebooklm-pro-ucitele', title: 'NotebookLM jako příprava pro učitele', excerpt: 'Jak z podkladů připravit otázky, příklady a materiály, aniž by se ztratila role učitele.', category: 'Jak na to', readingMinutes: 7, updatedAt: '2026-08-10', tags: ['učitelé', 'výuka'], content: [
    { heading: 'Co si připravit', paragraphs: ['Začněte učebním cílem, nikoli hotovou aktivitou. Do notebooku přidejte kurikulární dokument, vlastní poznámky a jeden kvalitní zdroj pro obsahovou kontrolu.'] },
    { heading: 'Výstup vždy projděte', paragraphs: ['AI může urychlit první návrh, ale nezná konkrétní třídu ani odpovědnost učitele. Ověřte věk, jazyk, přesnost, citlivé příklady a návaznost na hodinu.'] },
  ] },
  { ...projectProvenance, id: 'g-exporty', slug: 'exporty-a-archivace', title: 'Exporty a archivace: jak nepřijít o vlastní práci', excerpt: 'Lehký systém pro pojmenování, export a následné dohledání notebooků.', category: 'Průvodce', readingMinutes: 5, updatedAt: '2026-08-05', tags: ['export', 'záloha'], content: [
    { heading: 'Pojmenování je metadata', paragraphs: ['Do názvu přidejte téma, verzi a datum. U zdrojů si ponechte původní URL a poznámku, proč jste je použili. Tak se k práci vrátíte i po několika měsících.'] },
    { heading: 'Archivujte rozhodnutí', paragraphs: ['Neukládejte pouze finální text. Uchovejte také otázku, seznam zdrojů a prompt, který vedl k výsledku. Při pozdější aktualizaci poznáte, co se změnilo.'] },
  ] },
  { ...projectProvenance, id: 'g-srovnani-pristupu', slug: 'jak-srovnavat-dva-pristupy', title: 'Jak srovnávat dva přístupy bez falešné jistoty', excerpt: 'Šablona pro férové porovnání metod, názorů nebo variant z více dokumentů.', category: 'Srovnání', readingMinutes: 9, updatedAt: '2026-07-30', tags: ['srovnání', 'rozhodování'], content: [
    { heading: 'Srovnávejte stejné jednotky', paragraphs: ['Nejprve pojmenujte, co přesně srovnáváte: výsledek, náklady, důkazní sílu nebo zkušenost. Bez stejné osy může dobře vypadající tabulka míchat nesrovnatelné věci.'] },
    { heading: 'Přiznejte limity', paragraphs: ['U každé varianty uveďte, co dokumenty měří a co ne. Chybějící údaj není důkaz proti variantě; je to důvod k další otázce.'] },
  ] },
];

export const guideCategories = ['Novinky', 'Průvodce', 'Recenze', 'Jak na to', 'Srovnání', 'FAQ'];

export function promptCategory(id: string): PromptCategory {
  return promptCategories.find((category) => category.id === id) ?? promptCategories[0];
}

export function promptBySlug(slug: string): Prompt | undefined {
  return prompts.find((prompt) => prompt.slug === slug);
}

export function guideBySlug(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

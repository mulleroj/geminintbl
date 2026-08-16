import type { Guide } from '../../schemas';
import { projectProvenance } from '../provenance';

export const guides: Guide[] = [
  { ...projectProvenance, id: 'g-prvni-notebook', slug: 'prvni-notebook-bez-chaosu', title: 'První notebook bez chaosu: od otázky ke zdroji', excerpt: 'Jednoduchý postup, jak si před importem ujasnit otázku, hranice a očekávaný výstup.', category: 'jak-na-to', readingMinutes: 6, updatedAt: '2026-08-15', tags: ['začínáme', 'workflow'], featured: true, content: [
    { heading: 'Začněte otázkou, ne tlačítkem', paragraphs: ['Notebook funguje lépe, když nejprve formulujete, co chcete rozhodnout, vysvětlit nebo vytvořit. Jedna věta s cílem omezí množství slepých odboček.', 'Zapište si také publikum a podobu výstupu. Jinak vypadá odpověď pro maturanta, jinak podklad pro poradu.'] },
    { heading: 'Vyberte zdroje s jasnou rolí', paragraphs: ['Každý importovaný dokument by měl mít důvod. Kombinujte primární materiál s metodikou nebo kontextem, ale nepřidávejte desítky odkazů jen proto, aby notebook vypadal plnější.'], bullets: ['Pojmenujte zdroj tak, aby byl rozpoznatelný.', 'U dlouhého dokumentu si označte relevantní kapitoly.', 'Nechte si vypsat mezery dříve, než začnete psát výstup.'] },
  ] },
  { ...projectProvenance, id: 'g-citace-a-overeni', slug: 'citace-a-overeni-odpovedi', title: 'Jak si pohlídat citace a ověřitelnost odpovědi', excerpt: 'Praktická kontrola, která odděluje citované tvrzení, interpretaci a domněnku.', category: 'pruvodce', readingMinutes: 8, updatedAt: '2026-08-12', tags: ['citace', 'přesnost'], content: [
    { heading: 'Tři vrstvy odpovědi', paragraphs: ['Odpověď si rozdělte na tvrzení přímo doložená zdrojem, interpretaci vzniklou spojením více míst a návrh dalšího kroku. Tyto vrstvy se nemají tvářit stejně jistě.'] },
    { heading: 'Kontrolní prompt', paragraphs: ['Po každém delším výstupu si vyžádejte audit: která tvrzení mají oporu, která jsou odvozená a co ve zdrojích chybí. Kontrola není záruka pravdy, ale odhalí místa pro ruční ověření.'] },
  ] },
  { ...projectProvenance, id: 'g-prace-pro-ucitele', slug: 'notebooklm-pro-ucitele', title: 'Gemini Notebook jako příprava pro učitele', excerpt: 'Jak z podkladů připravit otázky, příklady a materiály, aniž by se ztratila role učitele.', category: 'jak-na-to', readingMinutes: 7, updatedAt: '2026-08-10', tags: ['učitelé', 'výuka'], content: [
    { heading: 'Co si připravit', paragraphs: ['Začněte učebním cílem, nikoli hotovou aktivitou. Do notebooku přidejte kurikulární dokument, vlastní poznámky a jeden kvalitní zdroj pro obsahovou kontrolu.'] },
    { heading: 'Výstup vždy projděte', paragraphs: ['AI může urychlit první návrh, ale nezná konkrétní třídu ani odpovědnost učitele. Ověřte věk, jazyk, přesnost, citlivé příklady a návaznost na hodinu.'] },
  ] },
  { ...projectProvenance, id: 'g-exporty', slug: 'exporty-a-archivace', title: 'Exporty a archivace: jak nepřijít o vlastní práci', excerpt: 'Lehký systém pro pojmenování, export a následné dohledání notebooků.', category: 'pruvodce', readingMinutes: 5, updatedAt: '2026-08-05', tags: ['export', 'záloha'], content: [
    { heading: 'Pojmenování je metadata', paragraphs: ['Do názvu přidejte téma, verzi a datum. U zdrojů si ponechte původní URL a poznámku, proč jste je použili. Tak se k práci vrátíte i po několika měsících.'] },
    { heading: 'Archivujte rozhodnutí', paragraphs: ['Neukládejte pouze finální text. Uchovejte také otázku, seznam zdrojů a prompt, který vedl k výsledku. Při pozdější aktualizaci poznáte, co se změnilo.'] },
  ] },
  { ...projectProvenance, id: 'g-srovnani-pristupu', slug: 'jak-srovnavat-dva-pristupy', title: 'Jak srovnávat dva přístupy bez falešné jistoty', excerpt: 'Šablona pro férové porovnání metod, názorů nebo variant z více dokumentů.', category: 'srovnani', readingMinutes: 9, updatedAt: '2026-07-30', tags: ['srovnání', 'rozhodování'], content: [
    { heading: 'Srovnávejte stejné jednotky', paragraphs: ['Nejprve pojmenujte, co přesně srovnáváte: výsledek, náklady, důkazní sílu nebo zkušenost. Bez stejné osy může dobře vypadající tabulka míchat nesrovnatelné věci.'] },
    { heading: 'Přiznejte limity', paragraphs: ['U každé varianty uveďte, co dokumenty měří a co ne. Chybějící údaj není důkaz proti variantě; je to důvod k další otázce.'] },
  ] },
];

# Prompt quality / coverage audit

Version: M-CONTENT-1A2
Audit date: 2026-08-15
Scope: all 95 prompts in `src/data/prompts/`

## Decision

The audit found no prompt that should be removed or merged. The catalog stays within the hard limit and gains only four prompts for a verified differentiation gap. Existing public slugs remain stable.

Action summary: KEEP: 90 · EDIT: 5 · MERGE: 0 · REPLACE: 0 · REMOVE: 0

The four edits clarify real semantic boundaries: response-level validation versus persistent chat rules, teaching visual sequence versus infographic design brief, and controlled metadata terms. The four new differentiation prompts cover level, support, output form and heterogeneous entry paths.

## Coverage heatmap

| Area | Dimension | Status | Evidence / decision |
| --- | --- | --- | --- |
| Research | summarization | ADEQUATE | covered through executive summary, structured notes and source synthesis; no generic summary-only prompt |
| Research | synthesis | STRONG | source comparison, evidence map, research workflow and handoff |
| Research | comparison | STRONG | general source comparison and theory comparison have different outputs |
| Research | contradiction detection | STRONG | comparison plus explicit contradiction handling |
| Research | evidence mapping | STRONG | claim/evidence map and argument audit |
| Research | source quality | ADEQUATE | triage and methodology audit; no standalone source-rating prompt |
| Research | methodology | STRONG | methodology critique |
| Research | research gaps | STRONG | open questions and missing evidence |
| Research | citation validation | STRONG | citation audit and response checks |
| Study | understanding | STRONG | guided reading, concept diagram and layered questions |
| Study | active recall | STRONG | active recall and graduated questions |
| Study | self-testing | STRONG | oral simulation and test with solutions |
| Study | exam preparation | STRONG | exam plan, oral exam, test and weak points |
| Study | mistake analysis | STRONG | explanation of knowledge mistakes and weak-point review |
| Study | study planning | STRONG | four-week study plan |
| Study | flashcards | STRONG | source-linked flashcards |
| Study | concept mapping | STRONG | text concept diagram |
| Content | article | STRONG | article outline and explanatory article |
| Content | brief | STRONG | executive summary and leadership briefing |
| Content | FAQ | STRONG | source-based FAQ |
| Content | presentation | STRONG | slide outline, hierarchy, data slide and speaking notes |
| Content | infographic | STRONG | teaching sequence separated from design brief |
| Content | video/storyboard | STRONG | source-based storyboard |
| Content | executive summary | STRONG | featured executive summary |
| Decision | trade-offs | STRONG | variant comparison |
| Decision | risks | STRONG | risk register and premortem |
| Decision | scenarios | STRONG | three development scenarios |
| Decision | recommendations | STRONG | evidence-based recommendation |
| Decision | assumptions | STRONG | assumption audit |
| Decision | premortem | STRONG | plan premortem |
| Teacher | lesson planning | STRONG | 45-minute and 90-minute planning |
| Teacher | worksheets | STRONG | student/teacher versions and scaffolding |
| Teacher | assessment | STRONG | test, quiz, oral assessment and rubric |
| Teacher | differentiation | STRONG | six distinct tagged prompts after audit |
| Teacher | accessibility/SPU | STRONG | short instructions, smaller steps and visual support |
| Teacher | language teaching | STRONG | vocabulary, reading and listening preparation |
| Teacher | vocational teaching | STRONG | procedure, safety, theory/practice and terminology |
| Teacher | feedback | ADEQUATE | exit ticket, rubric and mistake explanations; no standalone feedback workflow |
| Teacher | student questioning | STRONG | activation, questions and assessment prompts |
| Teacher | source-based activities | STRONG | lesson, activation, worksheets and case work |

Current category distribution: audio-overviews=6, deep-analysis=10, setup-accuracy=8, slides-video-infographics=7, strategy-decisions=8, study-exam-prep=10, teaching=29, workflows=9, writing-content=8.

## Semantic overlap groups

| Group | Decision |
| --- | --- |
| comparison | General source comparison and theory comparison remain distinct: one compares documents and evidence, the other compares models against fixed criteria. |
| source-validation | Persistent chat rules, response-level checks, source boundaries, certainty calibration and citation audit have different scopes. |
| evidence-mapping | Claim/evidence mapping differs from separating facts, interpretations and cautious conclusions. |
| infographic | The teaching sequence produces a learning progression; the design brief is a handoff for visual production. |
| self-testing | Student oral simulation and teacher assessment serve different users and outputs. |
| active-recall | Active recall generates retrieval practice; graduated questions explicitly move from definition to application. |
| differentiation | Six prompts now cover lesson-level differentiation, difficulty levels, support intensity, faster learners, output forms and heterogeneous classes. |
| executive-brief | Executive summary is a short decision-ready synthesis; leadership briefing is a longer management document. |
| risk-analysis | Risk register inventories risks; premortem tests a plan's failure modes. |

## Prompt matrix

Primary job-to-be-done is intentionally stated as the prompt title because titles were audited for a concrete action. Main output is derived from the declared NotebookLM target and reviewed against the prompt body.

| ID | Title | Category | Primary job-to-be-done | Audience | Complexity | Main output | Quality status | Overlap group | Action | Audit note |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| p-audio-pro-ucitele | Audio přehled pro učitele | audio-overviews | Audio přehled pro učitele | teacher | standard | audio osnova / scénář | PASS po editaci | audio-preparation | EDIT | sjednocen tag učitelé na kontrolovaný tag učitel a odstraněno featured |
| p-audio-podklady | Podklady pro audio přehled | audio-overviews | Podklady pro audio přehled | general, researcher | standard | audio osnova / scénář | PASS | audio-preparation | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-audio-otazky-k-diskusi | Otázky pro audio diskusi | audio-overviews | Otázky pro audio diskusi | general, teacher | standard | audio osnova / scénář | PASS | audio-preparation | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-audio-opakovani | Audio přehled pro opakování | audio-overviews | Audio přehled pro opakování | student | quick | audio osnova / scénář | PASS | audio-preparation | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-audio-pripadova-studie | Audio případová studie | audio-overviews | Audio případová studie | student, professional | advanced | audio osnova / scénář | PASS | audio-preparation | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-audio-analyza-vystupu | Analyzuj audio výstup | audio-overviews | Analyzuj audio výstup | researcher, teacher | advanced | strukturovaný text, tabulka nebo otázky | PASS | audio-preparation | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-srovnej-zdroje | Srovnej zdroje bez zkratek | deep-analysis | Srovnej zdroje bez zkratek | researcher, student | standard | strukturovaný text, tabulka nebo otázky | PASS | comparison | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-argumentacni-audit | Argumentační audit | deep-analysis | Argumentační audit | researcher, general | advanced | strukturovaný text, tabulka nebo otázky | PASS | argument-audit | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-tvrzeni-a-dukazy | Mapa tvrzení a důkazů | deep-analysis | Mapa tvrzení a důkazů | researcher, student | advanced | strukturovaný text, tabulka nebo otázky | PASS | evidence-mapping | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-otevrene-otazky | Najdi otevřené otázky | deep-analysis | Najdi otevřené otázky | researcher, student | standard | strukturovaný text, tabulka nebo otázky | PASS | research-gaps | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-priciny-a-mechanismy | Rozbor příčin a mechanismů | deep-analysis | Rozbor příčin a mechanismů | researcher, general | advanced | strukturovaný text, tabulka nebo otázky | PASS | causal-analysis | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-porovnani-teorii | Porovnej teorie podle kritérií | deep-analysis | Porovnej teorie podle kritérií | researcher, student | advanced | strukturovaný text, tabulka nebo otázky | PASS | comparison | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-dopady-zdroju | Analyzuj dopady tvrzení | deep-analysis | Analyzuj dopady tvrzení | general, professional | standard | strukturovaný text, tabulka nebo otázky | PASS | analysis | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-casova-osa-problemu | Sestav časovou osu problému | deep-analysis | Sestav časovou osu problému | researcher, student | standard | strukturovaný text, tabulka nebo otázky | PASS | analysis | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-metodologicka-kritika | Kritika metodologie zdroje | deep-analysis | Kritika metodologie zdroje | researcher | advanced | strukturovaný text, tabulka nebo otázky | PASS | methodology | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-fakta-interpretace-zavery | Odděl fakta, interpretace a závěry | deep-analysis | Odděl fakta, interpretace a závěry | student, researcher | standard | strukturovaný text, tabulka nebo otázky | PASS | evidence-mapping | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ochranne-zabrany | Ochranné zábrany pro chat | setup-accuracy | Ochranné zábrany pro chat | general, researcher | quick | pravidla nebo kontrolní protokol | PASS | answer-validation | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-kontrolni-protokol-odpovedi | Kontrolní protokol odpovědi | setup-accuracy | Kontrolní protokol odpovědi | general, researcher | standard | pravidla nebo kontrolní protokol | PASS po editaci | answer-validation | EDIT | zpřesněn rozdíl mezi kontrolou jedné odpovědi a trvalým nastavením chatu |
| p-hranice-zdroju | Odpovídej s hranicí zdrojů | setup-accuracy | Odpovídej s hranicí zdrojů | general, student | standard | pravidla nebo kontrolní protokol | PASS | source-boundaries | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-audit-citaci | Audituj citace v odpovědi | setup-accuracy | Audituj citace v odpovědi | researcher, student | advanced | strukturovaný text, tabulka nebo otázky | PASS | citation-validation | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-zkrat-odpoved-bez-ztraty | Zkrať odpověď bez ztráty opory | setup-accuracy | Zkrať odpověď bez ztráty opory | general, professional | quick | strukturovaný text, tabulka nebo otázky | PASS | source-validation | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-kalibrace-jistoty | Kalibruj jistotu tvrzení | setup-accuracy | Kalibruj jistotu tvrzení | researcher, general | standard | strukturovaný text, tabulka nebo otázky | PASS | certainty-calibration | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-rozporne-zdroje | Pracuj s rozpornými zdroji | setup-accuracy | Pracuj s rozpornými zdroji | general, researcher | standard | pravidla nebo kontrolní protokol | PASS | contradiction-detection | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-kontrola-terminologie | Zkontroluj terminologii | setup-accuracy | Zkontroluj terminologii | student, professional | standard | strukturovaný text, tabulka nebo otázky | PASS | source-validation | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-vyukova-infografika | Vysvětli téma obrazovým postupem | slides-video-infographics | Vysvětli téma obrazovým postupem | teacher, student | standard | textový scénář / brief vizuálu | PASS po editaci | infographic-teaching-sequence | EDIT | oddělen výukový scénář od designového briefu infografiky |
| p-osnova-prezentace | Osnova prezentace z výzkumu | slides-video-infographics | Osnova prezentace z výzkumu | researcher, student | standard | osnova a obsah slidů | PASS | presentation-content | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-storyboard-videa | Storyboard videa ze zdrojů | slides-video-infographics | Storyboard videa ze zdrojů | teacher, professional | advanced | storyboard nebo scénář videa | PASS | content-production | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-vizualni-hierarchie | Vizuální hierarchie slidů | slides-video-infographics | Vizuální hierarchie slidů | teacher, student | standard | osnova a obsah slidů | PASS | presentation-content | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-brief-infografiky | Brief pro infografiku | slides-video-infographics | Brief pro infografiku | teacher, professional | standard | textový scénář / brief vizuálu | PASS | infographic-design-brief | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-tabulka-na-slide | Převeď tabulku na srozumitelný slide | slides-video-infographics | Převeď tabulku na srozumitelný slide | researcher, professional | standard | osnova a obsah slidů | PASS | content-production | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-mluvni-poznamky | Mluvní poznámky k prezentaci | slides-video-infographics | Mluvní poznámky k prezentaci | student, professional | standard | osnova a obsah slidů | PASS | content-production | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-rozhodovaci-memo | Rozhodovací memo | strategy-decisions | Rozhodovací memo | general, researcher | standard | strukturovaný text, tabulka nebo otázky | PASS | decision-memo | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-varianty-a-tradeoffs | Porovnej varianty a kompromisy | strategy-decisions | Porovnej varianty a kompromisy | professional, general | standard | strukturovaný text, tabulka nebo otázky | PASS | trade-offs | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-registr-rizik | Registr rizik ze zdrojů | strategy-decisions | Registr rizik ze zdrojů | professional, researcher | advanced | strukturovaný text, tabulka nebo otázky | PASS | risk-analysis | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-premortem-planu | Proveď premortem plánu | strategy-decisions | Proveď premortem plánu | professional, general | advanced | strukturovaný text, tabulka nebo otázky | PASS | risk-analysis | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-scenare-vyvoje | Sestav scénáře vývoje | strategy-decisions | Sestav scénáře vývoje | professional, researcher | advanced | strukturovaný text, tabulka nebo otázky | PASS | decision-making | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-audit-predpokladu | Audituj předpoklady rozhodnutí | strategy-decisions | Audituj předpoklady rozhodnutí | researcher, professional | advanced | strukturovaný text, tabulka nebo otázky | PASS | decision-making | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-doporuceni-s-oporou | Doporučení s oporou ve zdrojích | strategy-decisions | Doporučení s oporou ve zdrojích | professional, general | standard | strukturovaný text, tabulka nebo otázky | PASS | recommendation | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-prioritizace-iniciativ | Prioritizuj iniciativy | strategy-decisions | Prioritizuj iniciativy | professional | advanced | strukturovaný text, tabulka nebo otázky | PASS | decision-making | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-karticky-s-odkazy | Kartičky s odkazy na strany | study-exam-prep | Kartičky s odkazy na strany | student | standard | strukturovaný text, tabulka nebo otázky | PASS | exam-prep | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-plan-pripravy | Plán přípravy na zkoušku | study-exam-prep | Plán přípravy na zkoušku | student, teacher | advanced | strukturovaný text, tabulka nebo otázky | PASS po editaci | exam-prep | EDIT | odstraněn audience tag student; audience zůstává v metadatech |
| p-ustni-zkouseni | Připrav mě na ústní zkoušení | study-exam-prep | Připrav mě na ústní zkoušení | student | advanced | strukturovaný text, tabulka nebo otázky | PASS | self-testing | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-vysvetli-chyby | Vysvětli mi chyby ve vědomostech | study-exam-prep | Vysvětli mi chyby ve vědomostech | student | advanced | strukturovaný text, tabulka nebo otázky | PASS | exam-prep | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-aktivni-vybavovani | Aktivní vybavování ze zdrojů | study-exam-prep | Aktivní vybavování ze zdrojů | student, teacher | standard | strukturovaný text, tabulka nebo otázky | PASS | active-recall | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-otazky-podle-obtiznosti | Otázky od základu po aplikaci | study-exam-prep | Otázky od základu po aplikaci | student, teacher | standard | strukturovaný text, tabulka nebo otázky | PASS | active-recall | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-pojmovy-diagram | Pojmový diagram ze zdrojů | study-exam-prep | Pojmový diagram ze zdrojů | student, teacher | standard | strukturovaný text, tabulka nebo otázky | PASS | exam-prep | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-opakovani-slabych-mist | Opakuj slabá místa | study-exam-prep | Opakuj slabá místa | student | advanced | strukturovaný text, tabulka nebo otázky | PASS | exam-prep | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-test-s-klicem | Test se správnými řešeními | study-exam-prep | Test se správnými řešeními | student, teacher | standard | strukturovaný text, tabulka nebo otázky | PASS po editaci | self-testing | EDIT | sjednocen termín klíč/řešení v názvu výstupu a tagu |
| p-cteni-s-otazkami | Vedené čtení náročného textu | study-exam-prep | Vedené čtení náročného textu | student, teacher | standard | strukturovaný text, tabulka nebo otázky | PASS | exam-prep | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-45min-hodina | Vytvoř 45min hodinu ze zdrojů | teaching | Vytvoř 45min hodinu ze zdrojů | teacher | advanced | strukturovaný text, tabulka nebo otázky | PASS | teacher-practice | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-90min-blok | Naplánuj 90min blok | teaching | Naplánuj 90min blok | teacher | advanced | strukturovaný text, tabulka nebo otázky | PASS | teacher-practice | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-aktivizace | Aktivizuj žáky ze zdrojů | teaching | Aktivizuj žáky ze zdrojů | teacher | standard | strukturovaný text, tabulka nebo otázky | PASS | teacher-practice | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-warmup | Warm-up na začátek hodiny | teaching | Warm-up na začátek hodiny | teacher | quick | strukturovaný text, tabulka nebo otázky | PASS | teacher-practice | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-exit-ticket | Exit ticket ze zdrojů | teaching | Exit ticket ze zdrojů | teacher | quick | strukturovaný text, tabulka nebo otázky | PASS | teacher-practice | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-diferenciace-hodiny | Diferencuj jednu hodinu | teaching | Diferencuj jednu hodinu | teacher | advanced | strukturovaný text, tabulka nebo otázky | PASS | differentiation | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-tri-urovne-ukolu | Připrav tři úrovně jednoho úkolu | teaching | Připrav tři úrovně jednoho úkolu | teacher | standard | strukturovaný text, tabulka nebo otázky | PASS | differentiation | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-mira-podpory | Nastav míru podpory úkolu | teaching | Nastav míru podpory úkolu | teacher | advanced | strukturovaný text, tabulka nebo otázky | PASS | differentiation | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-rozlicne-vystupy | Nabídni různé výstupy pro stejný cíl | teaching | Nabídni různé výstupy pro stejný cíl | teacher | standard | strukturovaný text, tabulka nebo otázky | PASS | differentiation | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-heterogenni-trida | Navrhni jednu aktivitu pro heterogenní třídu | teaching | Navrhni jednu aktivitu pro heterogenní třídu | teacher | advanced | strukturovaný text, tabulka nebo otázky | PASS | differentiation | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-pracovni-list-klic | Pracovní list se řešením | teaching | Pracovní list se řešením | teacher | advanced | strukturovaný text, tabulka nebo otázky | PASS | teacher-practice | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-scaffolded-list | Scaffolded pracovní list | teaching | Scaffolded pracovní list | teacher | advanced | strukturovaný text, tabulka nebo otázky | PASS | teacher-practice | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-odborny-list | Pracovní list pro odbornou výuku | teaching | Pracovní list pro odbornou výuku | teacher | advanced | strukturovaný text, tabulka nebo otázky | PASS | teacher-practice | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-vizualni-struktura | Pracovní list s vizuální strukturou | teaching | Pracovní list s vizuální strukturou | teacher | standard | strukturovaný text, tabulka nebo otázky | PASS | teacher-practice | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-test-klic | Test pro žáky a klíč | teaching | Test pro žáky a klíč | teacher | advanced | strukturovaný text, tabulka nebo otázky | PASS | teacher-assessment | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-kviz-obtiznost | Kvíz se stupňovanou obtížností | teaching | Kvíz se stupňovanou obtížností | teacher | standard | strukturovaný text, tabulka nebo otázky | PASS | teacher-assessment | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-ustni-zkouseni | Ústní zkoušení pro žáky | teaching | Ústní zkoušení pro žáky | teacher | advanced | strukturovaný text, tabulka nebo otázky | PASS | teacher-assessment | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-rubrika | Rubrika pro hodnocení výstupu | teaching | Rubrika pro hodnocení výstupu | teacher | advanced | strukturovaný text, tabulka nebo otázky | PASS | teacher-assessment | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-kratke-instrukce | Zkrať instrukce pro srozumitelnost | teaching | Zkrať instrukce pro srozumitelnost | teacher | quick | strukturovaný text, tabulka nebo otázky | PASS | teacher-practice | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-mensi-kroky | Rozlož úkol na menší kroky | teaching | Rozlož úkol na menší kroky | teacher | standard | strukturovaný text, tabulka nebo otázky | PASS | teacher-practice | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-vizualni-opora | Vizuální opora pro výuku | teaching | Vizuální opora pro výuku | teacher | standard | strukturovaný text, tabulka nebo otázky | PASS | teacher-practice | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-rozsireni-pro-nadane | Rozšiřující úkol pro rychlejší žáky | teaching | Rozšiřující úkol pro rychlejší žáky | teacher | advanced | strukturovaný text, tabulka nebo otázky | PASS | differentiation | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-slovni-zasoba | Slovní zásoba ze zdrojů | teaching | Slovní zásoba ze zdrojů | teacher | standard | strukturovaný text, tabulka nebo otázky | PASS | teacher-practice | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-reading-cefr | Reading a otázky podle CEFR | teaching | Reading a otázky podle CEFR | teacher | advanced | strukturovaný text, tabulka nebo otázky | PASS | teacher-practice | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-priprava-na-poslech | Příprava na poslech ze zdroje | teaching | Příprava na poslech ze zdroje | teacher | standard | strukturovaný text, tabulka nebo otázky | PASS | teacher-practice | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-odborny-postup | Vysvětli odborný postup | teaching | Vysvětli odborný postup | teacher | advanced | strukturovaný text, tabulka nebo otázky | PASS | teacher-practice | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-bezpecnostni-checklist | Bezpečnostní checklist pro výuku | teaching | Bezpečnostní checklist pro výuku | teacher | advanced | strukturovaný text, tabulka nebo otázky | PASS | teacher-practice | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-teorie-praxe | Propoj teorii a praxi | teaching | Propoj teorii a praxi | teacher | advanced | strukturovaný text, tabulka nebo otázky | PASS | teacher-practice | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-ucitel-terminologie-oboru | Odborná terminologie v kontextu | teaching | Odborná terminologie v kontextu | teacher | standard | strukturovaný text, tabulka nebo otázky | PASS | teacher-practice | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-vyzkumny-workflow | Výzkumný workflow od zdroje k výstupu | workflows | Výzkumný workflow od zdroje k výstupu | researcher, teacher | advanced | strukturovaný text, tabulka nebo otázky | PASS | research-planning | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-komunitni-navrh | Komunitní návrh ke kontrole | workflows | Komunitní návrh ke kontrole | general, professional | standard | strukturovaný text, tabulka nebo otázky | PASS | research-planning | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-triaz-zdroju | Triáž zdrojů před prací | workflows | Triáž zdrojů před prací | researcher, professional | standard | strukturovaný text, tabulka nebo otázky | PASS | research-planning | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-velky-balík-dokumentu | Workflow pro velký balík dokumentů | workflows | Workflow pro velký balík dokumentů | researcher, professional | advanced | strukturovaný text, tabulka nebo otázky | PASS | research-planning | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-onboarding-tematu | Onboarding do nového tématu | workflows | Onboarding do nového tématu | student, general | advanced | strukturovaný text, tabulka nebo otázky | PASS | research-planning | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-priprava-schuzky | Příprava schůzky ze zdrojů | workflows | Příprava schůzky ze zdrojů | professional, teacher | standard | strukturovaný text, tabulka nebo otázky | PASS | research-planning | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-audit-dokumentace | Audit dokumentace před předáním | workflows | Audit dokumentace před předáním | professional | advanced | strukturovaný text, tabulka nebo otázky | PASS | research-planning | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-postupne-cteni | Postupné čtení zdroje | workflows | Postupné čtení zdroje | student, researcher | standard | strukturovaný text, tabulka nebo otázky | PASS | research-planning | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-predani-vyzkumu | Předání výzkumu kolegovi | workflows | Předání výzkumu kolegovi | researcher, professional | advanced | strukturovaný text, tabulka nebo otázky | PASS | research-planning | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-osnova-clanku | Osnova článku se zdroji | writing-content | Osnova článku se zdroji | general, researcher | standard | strukturovaný text, tabulka nebo otázky | PASS | writing | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-executive-summary | Executive summary ze zdrojů | writing-content | Executive summary ze zdrojů | professional, general | standard | strukturovaný text, tabulka nebo otázky | PASS | executive-brief | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-briefing-pro-vedeni | Briefing pro vedení | writing-content | Briefing pro vedení | professional, general | advanced | strukturovaný text, tabulka nebo otázky | PASS | executive-brief | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-faq-ze-zdroju | FAQ ze zdrojů | writing-content | FAQ ze zdrojů | general, teacher | standard | strukturovaný text, tabulka nebo otázky | PASS | writing | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-vysvetlujici-text | Vysvětlující text pro veřejnost | writing-content | Vysvětlující text pro veřejnost | general, professional | advanced | strukturovaný text, tabulka nebo otázky | PASS | writing | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-newsletter-ze-zdroju | Newsletter ze zdrojů | writing-content | Newsletter ze zdrojů | professional, general | standard | strukturovaný text, tabulka nebo otázky | PASS | writing | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-redakcni-kalendar | Redakční kalendář ze zdrojů | writing-content | Redakční kalendář ze zdrojů | professional | advanced | strukturovaný text, tabulka nebo otázky | PASS | writing | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |
| p-strukturovane-poznamky | Strukturované poznámky ke čtení | writing-content | Strukturované poznámky ke čtení | student, researcher | standard | strukturovaný text, tabulka nebo otázky | PASS | writing | KEEP | odlišný pracovní úkol, výstup nebo audience; bez zásahu |

## Tag audit

Unique tags after audit: 144.

Synonyms/casing merged:

- "učitelé" → "učitel"
- "klíč" → "řešení"
- "vizuál" → "vizualizace"
- audience-only tag "student" removed from the study-plan prompt; audience metadata remains "student"

The controlled vocabulary retains fine-grained topical tags where they change retrieval intent. Rare tags are not automatically errors; they are listed for future vocabulary review.

| Tag | Uses |
| --- | ---: |
| 90 minut | 1 |
| agenda | 1 |
| aktivizace | 2 |
| aktivní vybavování | 1 |
| analýza | 2 |
| argumentace | 1 |
| audio | 6 |
| audit | 5 |
| bezpečnost | 1 |
| blok | 1 |
| brief | 1 |
| briefing | 3 |
| CEFR | 1 |
| citace | 7 |
| časová osa | 1 |
| článek | 1 |
| čtení | 3 |
| další krok | 1 |
| data | 1 |
| diagram | 1 |
| diferenciace | 6 |
| diskuse | 1 |
| dokumentace | 1 |
| dokumenty | 1 |
| dopady | 1 |
| doporučení | 1 |
| důkazy | 3 |
| exit ticket | 1 |
| fakta | 1 |
| FAQ | 1 |
| heterogenní třída | 1 |
| hierarchie | 1 |
| hodina | 1 |
| hodnocení | 5 |
| chyby | 1 |
| infografika | 2 |
| iniciativy | 1 |
| instrukce | 1 |
| interpretace | 1 |
| jazyky | 3 |
| kalendář | 1 |
| kartičky | 1 |
| kompromisy | 1 |
| komunita | 1 |
| kontext | 3 |
| kontrola | 1 |
| kritéria | 1 |
| kritické myšlení | 1 |
| kroky | 1 |
| kvíz | 1 |
| maturita | 1 |
| mechanismus | 1 |
| memo | 1 |
| metodologie | 1 |
| mezery | 1 |
| mluvení | 1 |
| nastavení chatu | 1 |
| nejistota | 2 |
| newsletter | 1 |
| obsah | 2 |
| obtížnost | 3 |
| odborné vzdělávání | 4 |
| omezení | 1 |
| onboarding | 1 |
| opakování | 2 |
| otázky | 4 |
| ověřování | 4 |
| plán | 4 |
| plánování | 2 |
| podpora | 3 |
| pojmy | 1 |
| porozumění | 1 |
| poslech | 1 |
| postup | 1 |
| poučení | 1 |
| poznámky | 2 |
| pracovní list | 4 |
| praxe | 1 |
| premortem | 1 |
| prezentace | 3 |
| priority | 1 |
| proces | 2 |
| předání | 2 |
| předpoklady | 2 |
| přepis | 1 |
| přesnost | 4 |
| příčiny | 1 |
| případová studie | 2 |
| příprava | 1 |
| přístupnost | 2 |
| psaní | 2 |
| reading | 1 |
| rešerše | 3 |
| rizika | 2 |
| rozhodování | 4 |
| rozpory | 1 |
| rozšíření | 1 |
| rubrika | 1 |
| řešení | 2 |
| scaffold | 2 |
| scénář | 1 |
| scénáře | 1 |
| shrnutí | 1 |
| schůzka | 1 |
| slabá místa | 1 |
| slidy | 3 |
| slovní zásoba | 1 |
| slovníček | 1 |
| souvislosti | 1 |
| spolupráce | 1 |
| SPU | 3 |
| srovnání | 2 |
| storyboard | 1 |
| strategie | 3 |
| stručnost | 1 |
| studium | 4 |
| teorie | 1 |
| terminologie | 2 |
| test | 2 |
| text | 1 |
| triáž | 1 |
| tvrzení | 1 |
| učení | 3 |
| učitel | 30 |
| úprava | 1 |
| ústní zkoušení | 1 |
| ústní zkouška | 1 |
| varianty | 1 |
| vedení | 1 |
| veřejnost | 1 |
| video | 1 |
| vizualizace | 2 |
| vizuální struktura | 1 |
| vysvětlení | 2 |
| výuka | 5 |
| výzkum | 6 |
| warm-up | 1 |
| workflow | 5 |
| závěry | 1 |
| zdroje | 8 |
| zkoušení | 1 |
| zkouška | 3 |
| zkreslení | 1 |
| zpětná vazba | 1 |

Rare tags (used once): 90 minut, agenda, aktivní vybavování, argumentace, bezpečnost, blok, brief, CEFR, časová osa, článek, další krok, data, diagram, diskuse, dokumentace, dokumenty, dopady, doporučení, exit ticket, fakta, FAQ, heterogenní třída, hierarchie, hodina, chyby, iniciativy, instrukce, interpretace, kalendář, kartičky, kompromisy, komunita, kontrola, kritéria, kritické myšlení, kroky, kvíz, maturita, mechanismus, memo, metodologie, mezery, mluvení, nastavení chatu, newsletter, omezení, onboarding, pojmy, porozumění, poslech, postup, poučení, praxe, premortem, priority, přepis, příčiny, příprava, reading, rozpory, rozšíření, rubrika, scénář, scénáře, shrnutí, schůzka, slabá místa, slovní zásoba, slovníček, souvislosti, spolupráce, storyboard, stručnost, teorie, text, triáž, tvrzení, úprava, ústní zkoušení, ústní zkouška, varianty, vedení, veřejnost, video, vizuální struktura, warm-up, závěry, zkoušení, zkreslení, zpětná vazba.

## Manual QA sample

Thirty-five prompts were reviewed stratifiably across all categories, complexity levels, teacher coverage, student coverage, researcher/professional use and all six featured prompts.

| ID | Prompt | Category | Specific task | Source discipline | Output format | No fake capability | Copy-ready | Natural Czech |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| p-srovnej-zdroje | Srovnej zdroje bez zkratek | deep-analysis | PASS | PASS | PASS | PASS | PASS | PASS |
| p-argumentacni-audit | Argumentační audit | deep-analysis | PASS | PASS | PASS | PASS | PASS | PASS |
| p-metodologicka-kritika | Kritika metodologie zdroje | deep-analysis | PASS | PASS | PASS | PASS | PASS | PASS |
| p-audit-citaci | Audituj citace v odpovědi | setup-accuracy | PASS | PASS | PASS | PASS | PASS | PASS |
| p-ochranne-zabrany | Ochranné zábrany pro chat | setup-accuracy | PASS | PASS | PASS | PASS | PASS | PASS |
| p-kontrolni-protokol-odpovedi | Kontrolní protokol odpovědi | setup-accuracy | PASS | PASS | PASS | PASS | PASS | PASS |
| p-karticky-s-odkazy | Kartičky s odkazy na strany | study-exam-prep | PASS | PASS | PASS | PASS | PASS | PASS |
| p-ustni-zkouseni | Připrav mě na ústní zkoušení | study-exam-prep | PASS | PASS | PASS | PASS | PASS | PASS |
| p-vysvetli-chyby | Vysvětli mi chyby ve vědomostech | study-exam-prep | PASS | PASS | PASS | PASS | PASS | PASS |
| p-cteni-s-otazkami | Vedené čtení náročného textu | study-exam-prep | PASS | PASS | PASS | PASS | PASS | PASS |
| p-osnova-prezentace | Osnova prezentace z výzkumu | slides-video-infographics | PASS | PASS | PASS | PASS | PASS | PASS |
| p-vyukova-infografika | Vysvětli téma obrazovým postupem | slides-video-infographics | PASS | PASS | PASS | PASS | PASS | PASS |
| p-storyboard-videa | Storyboard videa ze zdrojů | slides-video-infographics | PASS | PASS | PASS | PASS | PASS | PASS |
| p-executive-summary | Executive summary ze zdrojů | writing-content | PASS | PASS | PASS | PASS | PASS | PASS |
| p-briefing-pro-vedeni | Briefing pro vedení | writing-content | PASS | PASS | PASS | PASS | PASS | PASS |
| p-faq-ze-zdroju | FAQ ze zdrojů | writing-content | PASS | PASS | PASS | PASS | PASS | PASS |
| p-registr-rizik | Registr rizik ze zdrojů | strategy-decisions | PASS | PASS | PASS | PASS | PASS | PASS |
| p-premortem-planu | Proveď premortem plánu | strategy-decisions | PASS | PASS | PASS | PASS | PASS | PASS |
| p-doporuceni-s-oporou | Doporučení s oporou ve zdrojích | strategy-decisions | PASS | PASS | PASS | PASS | PASS | PASS |
| p-vyzkumny-workflow | Výzkumný workflow od zdroje k výstupu | workflows | PASS | PASS | PASS | PASS | PASS | PASS |
| p-triaz-zdroju | Triáž zdrojů před prací | workflows | PASS | PASS | PASS | PASS | PASS | PASS |
| p-predani-vyzkumu | Předání výzkumu kolegovi | workflows | PASS | PASS | PASS | PASS | PASS | PASS |
| p-ucitel-45min-hodina | Vytvoř 45min hodinu ze zdrojů | teaching | PASS | PASS | PASS | PASS | PASS | PASS |
| p-ucitel-diferenciace-hodiny | Diferencuj jednu hodinu | teaching | PASS | PASS | PASS | PASS | PASS | PASS |
| p-ucitel-tri-urovne-ukolu | Připrav tři úrovně jednoho úkolu | teaching | PASS | PASS | PASS | PASS | PASS | PASS |
| p-ucitel-mira-podpory | Nastav míru podpory úkolu | teaching | PASS | PASS | PASS | PASS | PASS | PASS |
| p-ucitel-rozlicne-vystupy | Nabídni různé výstupy pro stejný cíl | teaching | PASS | PASS | PASS | PASS | PASS | PASS |
| p-ucitel-heterogenni-trida | Navrhni jednu aktivitu pro heterogenní třídu | teaching | PASS | PASS | PASS | PASS | PASS | PASS |
| p-ucitel-pracovni-list-klic | Pracovní list se řešením | teaching | PASS | PASS | PASS | PASS | PASS | PASS |
| p-ucitel-test-klic | Test pro žáky a klíč | teaching | PASS | PASS | PASS | PASS | PASS | PASS |
| p-ucitel-kratke-instrukce | Zkrať instrukce pro srozumitelnost | teaching | PASS | PASS | PASS | PASS | PASS | PASS |
| p-ucitel-slovni-zasoba | Slovní zásoba ze zdrojů | teaching | PASS | PASS | PASS | PASS | PASS | PASS |
| p-ucitel-odborny-postup | Vysvětli odborný postup | teaching | PASS | PASS | PASS | PASS | PASS | PASS |
| p-ucitel-bezpecnostni-checklist | Bezpečnostní checklist pro výuku | teaching | PASS | PASS | PASS | PASS | PASS | PASS |
| p-plan-pripravy | Plán přípravy na zkoušku | study-exam-prep | PASS | PASS | PASS | PASS | PASS | PASS |

Result: 35 reviewed, 35 PASS, 0 low-quality remaining. All six featured prompts are included in the sample.

## Teacher and student findings

- Teacher category: 29 prompts; all 25 original teacher prompts plus 10 teacher-audience prompts outside the category were reviewed.
- Differentiation: six prompts carry the "diferenciace" tag and have different outputs or support models.
- Student audience: retained as metadata, not a duplicate top-level category. Student jobs cover understanding, weak points, self-testing, study planning, source comparison and presentation preparation.
- No teacher prompt claims diagnosis, PPP assessment or fixed learning styles.

## Provenance finding

Prompt records use project provenance and may correctly omit `sourceUrl`. The only unresolved historical provenance record is notebook `n-otevrena-data`, which keeps `needsReview: true` because the public notebook link has not been verified. It is documented rather than given invented attribution.

## v1 decision

The prompt library is ready for the v1 lock after the final automated and browser gates pass. Future content changes must be evidence-led and must not mass-rewrite this matrix.

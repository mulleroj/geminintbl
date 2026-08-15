# Live source link check

Checked: 2026-08-15T22:19:08.818Z
Scope: 175 source records
Network policy: HEAD first, GET fallback for 400/405/501, follow redirects, 8 second timeout, concurrency 6.

| Status | Count |
| --- | ---: |
| VALID | 122 |
| REDIRECT | 38 |
| BOT_BLOCKED | 11 |
| BROKEN | 0 |
| TIMEOUT | 0 |
| MANUAL_REVIEW | 4 |

BROKEN and TIMEOUT are release-blocking. BOT_BLOCKED and MANUAL_REVIEW remain visible because an access restriction is not proof that the source is gone.

## Non-VALID results

| ID | Status | HTTP | Original URL | Final URL | Note |
| --- | --- | ---: | --- | --- | --- |
| s-pedf-cuni | REDIRECT | 200 | https://pedf.cuni.cz/ | https://pedf.cuni.cz/PEDF-1.html | redirected to final URL |
| s-muni-studenti | REDIRECT | 200 | https://www.muni.cz/studenti | https://www.muni.cz/portal-pro-studujici | redirected to final URL |
| s-ujc | REDIRECT | 200 | https://ujc.cas.cz/ | https://ujc.cas.cz/cs/ | redirected to final URL |
| s-slovnikcestiny | REDIRECT | 200 | https://slovnikcestiny.cz/ | https://www.slovnikcestiny.cz/ | redirected to final URL |
| s-czechlit | REDIRECT | 200 | https://www.czechlit.cz/ | https://www.czechlit.cz/en/ | redirected to final URL |
| s-jib | REDIRECT | 200 | https://www.jib.cz/ | https://www.knihovny.cz/ | redirected to final URL |
| s-mpsv | REDIRECT | 200 | https://www.mpsv.cz/ | https://mpsv.gov.cz/ | redirected to final URL |
| s-uradprace | MANUAL_REVIEW |  | https://www.uradprace.cz/ |  | fetch failed |
| s-cssz | REDIRECT | 200 | https://www.cssz.cz/ | https://www.cssz.gov.cz/ | redirected to final URL |
| s-suip | REDIRECT | 200 | https://www.suip.cz/ | https://suip.gov.cz/ | redirected to final URL |
| s-commission | REDIRECT | 200 | https://commission.europa.eu/ | https://commission.europa.eu/select-language?destination=/node/1 | redirected to final URL |
| s-op-eu | REDIRECT | 200 | https://op.europa.eu/ | https://op.europa.eu/en/home | redirected to final URL |
| s-curia | REDIRECT | 200 | https://curia.europa.eu/ | https://curia.europa.eu/site/ | redirected to final URL |
| s-european-union | REDIRECT | 200 | https://european-union.europa.eu/ | https://european-union.europa.eu/select-language?destination=/node/1 | redirected to final URL |
| s-eca | REDIRECT | 200 | https://www.eca.europa.eu/ | https://www.eca.europa.eu/en | redirected to final URL |
| s-edps | BOT_BLOCKED | 403 | https://www.edps.europa.eu/ | https://www.edps.europa.eu/ |  |
| s-eurofound | BOT_BLOCKED | 429 | https://www.eurofound.europa.eu/ | https://www.eurofound.europa.eu/ |  |
| s-european-data-protection | REDIRECT | 200 | https://www.edpb.europa.eu/ | https://www.edpb.europa.eu/home_en | redirected to final URL |
| s-single-market | REDIRECT | 200 | https://single-market-economy.ec.europa.eu/ | https://single-market-economy.ec.europa.eu/select-language?destination=/node/1 | redirected to final URL |
| s-kramerius-nacr | MANUAL_REVIEW |  | https://kramerius.nacr.cz/about |  | fetch failed |
| s-digitalni-knihovna | REDIRECT | 200 | https://digitalniknihovna.cz/ | https://www.digitalniknihovna.cz/ | redirected to final URL |
| s-npu | REDIRECT | 200 | https://www.npu.cz/ | https://www.npu.cz/cs | redirected to final URL |
| s-europeana | REDIRECT | 200 | https://www.europeana.eu/ | https://www.europeana.eu/en | redirected to final URL |
| s-unesco | BOT_BLOCKED | 403 | https://www.unesco.org/ | https://www.unesco.org/en | redirected to final URL |
| s-unesco-data | REDIRECT | 200 | https://data.unesco.org/ | https://data.unesco.org/pages/home/ | redirected to final URL |
| s-imf | REDIRECT | 200 | https://www.imf.org/en/Data | https://www.imf.org/en/data | redirected to final URL |
| s-ilostat | BOT_BLOCKED | 403 | https://ilostat.ilo.org/ | https://ilostat.ilo.org/ |  |
| s-oecd | BOT_BLOCKED | 403 | https://www.oecd.org/ | https://www.oecd.org/ |  |
| s-oecd-data | BOT_BLOCKED | 403 | https://data.oecd.org/ | https://data.oecd.org/ |  |
| s-unicef | BOT_BLOCKED | 403 | https://data.unicef.org/ | https://data.unicef.org/ |  |
| s-ipcc | BOT_BLOCKED | 403 | https://www.ipcc.ch/ | https://www.ipcc.ch/ |  |
| s-unhcr | BOT_BLOCKED | 403 | https://www.unhcr.org/ | https://www.unhcr.org/ |  |
| s-irozhlas | BOT_BLOCKED | 403 | https://www.irozhlas.cz/ | https://www.irozhlas.cz/ |  |
| s-euvsdisinfo | BOT_BLOCKED | 403 | https://euvsdisinfo.eu/ | https://euvsdisinfo.eu/ |  |
| s-justice | REDIRECT | 200 | https://justice.cz/ | https://msp.gov.cz/ | redirected to final URL |
| s-odok | REDIRECT | 200 | https://odok.cz/ | https://odok.gov.cz/portal/ | redirected to final URL |
| s-ejustice | REDIRECT | 200 | https://e-justice.europa.eu/ | https://e-justice.europa.eu/select-language?destination=/node/2 | redirected to final URL |
| s-avcr | REDIRECT | 200 | https://www.avcr.cz/ | https://www.avcr.cz/cs/ | redirected to final URL |
| s-rvvi | MANUAL_REVIEW |  | https://m17.rvvi.cz/ |  | fetch failed |
| s-nusl | REDIRECT | 200 | https://www.nusl.cz/ | https://invenio.nusl.cz/ | redirected to final URL |
| s-czechelib | REDIRECT | 200 | https://www.czechelib.cz/ | https://www.czechelib.cz/en/ | redirected to final URL |
| s-techlib | REDIRECT | 200 | https://www.techlib.cz/ | https://www.techlib.cz/en/ | redirected to final URL |
| s-czechglobe | REDIRECT | 200 | https://www.czechglobe.cz/ | https://www.czechglobe.cz/cs/ | redirected to final URL |
| s-lib-cas | REDIRECT | 200 | https://www.lib.cas.cz/ | https://lib.cas.cz/ | redirected to final URL |
| s-cszu | REDIRECT | 200 | https://www.czso.cz/ | https://csu.gov.cz/ | redirected to final URL |
| s-cszu-products | REDIRECT | 200 | https://www.czso.cz/csu/czso/produkty | https://csu.gov.cz/produkty/domov | redirected to final URL |
| s-opendata-praha | REDIRECT | 200 | https://opendata.praha.eu/ | https://lkod.cz/catalog/praha | redirected to final URL |
| s-opendata-brno | MANUAL_REVIEW |  | https://opendata.brno.cz/ |  | fetch failed |
| s-cuzk | REDIRECT | 200 | https://www.cuzk.cz/ | https://cuzk.gov.cz/ | redirected to final URL |
| s-cuzk-geoportal | REDIRECT | 200 | https://geoportal.cuzk.cz/ | https://geoportal.cuzk.cz/(S(lcrchbdgttwlpgi2hduypfze))/Default.aspx?head_tab=sekce-00-gp&mode=TextMeta&text=uvod_uvod&menu=01&news=yes&UvodniStrana=yes | redirected to final URL |
| s-inspire-geoportal | REDIRECT | 200 | https://inspire-geoportal.ec.europa.eu/ | https://data.europa.eu/ | redirected to final URL |
| s-cszu-volby | REDIRECT | 200 | https://www.czso.cz/csu/czso/volby | https://csu.gov.cz/volby | redirected to final URL |
| s-cszu-population | REDIRECT | 200 | https://www.czso.cz/csu/czso/obyvatelstvo | https://csu.gov.cz/obyvatelstvo | redirected to final URL |

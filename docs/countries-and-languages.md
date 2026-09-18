# Countries and languages

How the YEF website is organised by country and language, and how the interface
translations are produced. Generated from the site's own source data.

- **71 country sites**, plus the international site
- **48 languages**
- **102 country/language pairs** — each country serves only its own languages, so this is
  not 71 x 48
- **1067 interface strings** per language

## How the addresses work

Every public page lives at `/{country}/{language}/…` — for example
`/kr/ko/who-we-are/history` is the Korean reading of the History page on the Korea site.
The headquarters site uses `int` (`/int/en/…`).

Each country opens in its own default language: the first one listed for it below. A visitor
can switch to any other language that country serves.

## The languages

"Coverage" is how many of the 1067 interface strings that language has a translation
for. Anything missing falls back to English rather than breaking, so a gap shows up as an
English sentence in an otherwise translated page.

| Code | Language | Native name | Countries | Coverage |
| --- | --- | --- | --- | --- |
| `en` | English | English | 21 | 1067/1067 (100%) |
| `es` | Spanish | Español | 9 | 946/1067 (89%) |
| `fr` | French | Français | 11 | 946/1067 (89%) |
| `de` | German | Deutsch | 4 | 946/1067 (89%) |
| `pt` | Portuguese | Português | 4 | 946/1067 (89%) |
| `ko` | Korean | 한국어 | 1 | 946/1067 (89%) |
| `ja` | Japanese | 日本語 | 1 | 946/1067 (89%) |
| `zh` | Chinese (Mandarin) | 中文 | 2 | 946/1067 (89%) |
| `it` | Italian | Italiano | 2 | 946/1067 (89%) |
| `ru` | Russian | Русский | 2 | 946/1067 (89%) |
| `tr` | Turkish | Türkçe | 1 | 946/1067 (89%) |
| `id` | Indonesian | Bahasa Indonesia | 1 | 946/1067 (89%) |
| `nl` | Dutch | Nederlands | 2 | 946/1067 (89%) |
| `pl` | Polish | Polski | 1 | 946/1067 (89%) |
| `uk` | Ukrainian | Українська | 1 | 946/1067 (89%) |
| `cs` | Czech | Čeština | 1 | 946/1067 (89%) |
| `sk` | Slovak | Slovenčina | 1 | 946/1067 (89%) |
| `el` | Greek | Ελληνικά | 1 | 946/1067 (89%) |
| `hu` | Hungarian | Magyar | 1 | 946/1067 (89%) |
| `ro` | Romanian | Română | 1 | 946/1067 (89%) |
| `sv` | Swedish | Svenska | 1 | 946/1067 (89%) |
| `ar` | Arabic | العربية *(RTL)* | 3 | 946/1067 (89%) |
| `he` | Hebrew | עברית *(RTL)* | 1 | 946/1067 (89%) |
| `ur` | Urdu | اردو *(RTL)* | 1 | 946/1067 (89%) |
| `hi` | Hindi | हिन्दी | 1 | 946/1067 (89%) |
| `bn` | Bengali | বাংলা | 1 | 946/1067 (89%) |
| `ta` | Tamil | தமிழ் | 2 | 946/1067 (89%) |
| `ne` | Nepali | नेपाली | 1 | 946/1067 (89%) |
| `si` | Sinhala | සිංහල | 1 | 946/1067 (89%) |
| `my` | Burmese | မြန်မာ | 1 | 946/1067 (89%) |
| `th` | Thai | ไทย | 1 | 946/1067 (89%) |
| `vi` | Vietnamese | Tiếng Việt | 1 | 946/1067 (89%) |
| `fil` | Filipino | Filipino | 1 | 946/1067 (89%) |
| `ms` | Malay | Bahasa Melayu | 2 | 946/1067 (89%) |
| `mn` | Mongolian | Монгол | 1 | 946/1067 (89%) |
| `kk` | Kazakh | Қазақша | 1 | 946/1067 (89%) |
| `sw` | Swahili | Kiswahili | 2 | 946/1067 (89%) |
| `am` | Amharic | አማርኛ | 1 | 946/1067 (89%) |
| `af` | Afrikaans | Afrikaans | 1 | 946/1067 (89%) |
| `zu` | Zulu | isiZulu | 1 | 946/1067 (89%) |
| `xh` | Xhosa | isiXhosa | 1 | 946/1067 (89%) |
| `rw` | Kinyarwanda | Ikinyarwanda | 2 | 946/1067 (89%) |
| `rn` | Kirundi | Ikirundi | 1 | 946/1067 (89%) |
| `mg` | Malagasy | Malagasy | 1 | 946/1067 (89%) |
| `ht` | Haitian Creole | Kreyòl Ayisyen | 1 | 946/1067 (89%) |
| `fj` | Fijian | Na Vosa Vakaviti | 1 | 946/1067 (89%) |
| `hif` | Fiji Hindi | Fiji Hindi | 1 | 946/1067 (89%) |
| `rm` | Romansh | Rumantsch | 1 | 946/1067 (89%) |

## The countries

### North America

| Country | URL | Languages served |
| --- | --- | --- |
| Canada | `/ca` | English (`en`), French (`fr`) |
| Mexico | `/mx` | Spanish (`es`) |
| United States | `/us` | English (`en`) |

### Central America & Caribbean

| Country | URL | Languages served |
| --- | --- | --- |
| Dominican Republic | `/do` | Spanish (`es`) |
| Guatemala | `/gt` | Spanish (`es`) |
| Haiti | `/ht` | French (`fr`), Haitian Creole (`ht`) |
| Honduras | `/hn` | Spanish (`es`) |

### South America

| Country | URL | Languages served |
| --- | --- | --- |
| Argentina | `/ar` | Spanish (`es`) |
| Brazil | `/br` | Portuguese (`pt`) |
| Chile | `/cl` | Spanish (`es`) |
| Colombia | `/co` | Spanish (`es`) <br>*also serves: ve, ec, pa* |
| Peru | `/pe` | Spanish (`es`) |

### Europe

| Country | URL | Languages served |
| --- | --- | --- |
| Austria | `/at` | German (`de`) |
| Belgium | `/be` | Dutch (`nl`), French (`fr`), German (`de`) |
| Czechia | `/cz` | Czech (`cs`) |
| France | `/fr` | French (`fr`) |
| Germany | `/de` | German (`de`) |
| Greece | `/gr` | Greek (`el`) |
| Hungary | `/hu` | Hungarian (`hu`) |
| Italy | `/it` | Italian (`it`) |
| Netherlands | `/nl` | Dutch (`nl`) |
| Poland | `/pl` | Polish (`pl`) |
| Portugal | `/pt` | Portuguese (`pt`) |
| Romania | `/ro` | Romanian (`ro`) |
| Russia | `/ru` | Russian (`ru`) |
| Slovakia | `/sk` | Slovak (`sk`) |
| Spain | `/es` | Spanish (`es`) |
| Sweden | `/se` | Swedish (`sv`) |
| Switzerland | `/ch` | German (`de`), French (`fr`), Italian (`it`), Romansh (`rm`) |
| Türkiye | `/tr` | Turkish (`tr`) |
| Ukraine | `/ua` | Ukrainian (`uk`) |
| United Kingdom | `/gb` | English (`en`) |

### Commonwealth of Independent States

| Country | URL | Languages served |
| --- | --- | --- |
| Kazakhstan | `/kz` | Kazakh (`kk`), Russian (`ru`) |

### Middle East & North Africa

| Country | URL | Languages served |
| --- | --- | --- |
| Egypt | `/eg` | Arabic (`ar`) |
| Israel | `/il` | Hebrew (`he`), Arabic (`ar`) |
| United Arab Emirates | `/ae` | Arabic (`ar`) |

### Africa

| Country | URL | Languages served |
| --- | --- | --- |
| Angola | `/ao` | Portuguese (`pt`) |
| Cameroon | `/cm` | French (`fr`), English (`en`) |
| Côte d’Ivoire | `/ci` | French (`fr`) |
| Democratic Republic of the Congo | `/cd` | French (`fr`) |
| East Africa Federation | `/ke` | English (`en`), Swahili (`sw`), French (`fr`), Kinyarwanda (`rw`), Kirundi (`rn`) <br>*also serves: tz, ug, rw, bi, ss* |
| Ethiopia | `/et` | Amharic (`am`), English (`en`) |
| Ghana | `/gh` | English (`en`) |
| Madagascar | `/mg` | Malagasy (`mg`), French (`fr`) |
| Mozambique | `/mz` | Portuguese (`pt`) |
| Nigeria | `/ng` | English (`en`) |
| Rwanda | `/rw` | Kinyarwanda (`rw`), English (`en`), French (`fr`), Swahili (`sw`) |
| South Africa | `/za` | English (`en`), Afrikaans (`af`), Zulu (`zu`), Xhosa (`xh`) |
| Zambia | `/zm` | English (`en`) |

### South Asia

| Country | URL | Languages served |
| --- | --- | --- |
| Bangladesh | `/bd` | Bengali (`bn`) |
| India | `/in` | Hindi (`hi`), English (`en`) |
| Nepal | `/np` | Nepali (`ne`) |
| Pakistan | `/pk` | Urdu (`ur`), English (`en`) |
| Sri Lanka | `/lk` | Sinhala (`si`), Tamil (`ta`) |

### Southeast Asia

| Country | URL | Languages served |
| --- | --- | --- |
| Indonesia | `/id` | Indonesian (`id`) |
| Malaysia | `/my` | Malay (`ms`) |
| Myanmar | `/mm` | Burmese (`my`) |
| Philippines | `/ph` | Filipino (`fil`), English (`en`) |
| Singapore | `/sg` | English (`en`), Malay (`ms`), Chinese (Mandarin) (`zh`), Tamil (`ta`) |
| Thailand | `/th` | Thai (`th`) |
| Vietnam | `/vn` | Vietnamese (`vi`) |

### Asia-Pacific

| Country | URL | Languages served |
| --- | --- | --- |
| Japan | `/jp` | Japanese (`ja`) |
| Mongolia | `/mn` | Mongolian (`mn`) |
| South Korea | `/kr` | Korean (`ko`) |
| Taiwan | `/tw` | Chinese (Mandarin) (`zh`) |

### Oceania

| Country | URL | Languages served |
| --- | --- | --- |
| Australia | `/au` | English (`en`) |
| Fiji | `/fj` | English (`en`), Fijian (`fj`), Fiji Hindi (`hif`) |
| New Zealand | `/nz` | English (`en`) |
| Samoa | `/ws` | English (`en`) |
| Solomon Islands | `/sb` | English (`en`) |
| Tonga | `/to` | English (`en`) |

## How the translations were produced

There is **no translation service or API** connected to this site. The process is:

1. Every English sentence in the site is collected automatically into one list
   (`src/messages/en.json`). The English sentence itself is the lookup key.
2. An AI model translated that list, language by language, in batches.
3. Scripts merged each batch into that language's file, with a checker that flags a file
   whose entries have drifted out of line with the English list.

At page render, each English sentence is looked up in the reader's language file. **A missing
entry falls back to the English**, which is why an incomplete language still produces a working
page.

## What to know before relying on this

**The translations have not been reviewed by speakers.** They are unreviewed machine output
across 47 non-English languages, including several — Fijian, Fiji Hindi, Romansh, Kirundi,
Malagasy — where a mistake is unlikely to be spotted by the team. They are fine for reach;
they are not proofread copy.

**One language has already been found misaligned.** An early batch was merged by position
rather than by key, and a dropped value shifted every later translation onto the wrong English
sentence, so Romansh showed labels under the wrong headings. That was found and repaired, and
merges are now keyed by the English sentence. The other languages have not been re-audited for
the same fault.

**No language is currently complete.** Every non-English language sits at 946 of the 1067
strings. Of the 121 with no translation, about 70 are country names; the rest are interface
labels and short page copy, and some of those are visible calls to action — "Find a Chapter",
"Become a Member", "Join YEF", "Have a Story to Share?". All of them render in English on
every country site.

**Text typed into the admin is not translated at all.** The translation system covers the
site's built-in wording only. Content entered through the CMS is passed through the same
lookup, so it is translated only when the exact English sentence already exists in the list —
which is true of the wording the site ships with, and stops being true the moment someone edits
it. An edited paragraph renders in English on every country site.

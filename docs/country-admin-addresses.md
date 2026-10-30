# The country sign-in addresses

The addresses `/api/provision-country-admins` creates, one per country. Written
down so the list can be read, checked and circulated before any account exists —
and so that whoever hands the credentials out has something to tick off.

Passwords are not here and cannot be: they are generated when the endpoint runs
and returned once. See `country-admin-accounts.md` for how to run it.

This list is derived from `src/lib/i18n/countries.ts`, so it is exactly what the
endpoint will produce today and will drift as countries are added. Re-read it from the dry run
(`GET /api/provision-country-admins`), which reports the same thing against the
live database.

## 71 country sites

The headquarters site (`int`) is deliberately absent — an account
holding it is a super admin's.

| Country | Code | Sign-in |
| --- | --- | --- |
| Angola | `ao` | `angola@yefi.org` |
| Argentina | `ar` | `argentina@yefi.org` |
| Australia | `au` | `australia@yefi.org` |
| Austria | `at` | `austria@yefi.org` |
| Bangladesh | `bd` | `bangladesh@yefi.org` |
| Belgium | `be` | `belgium@yefi.org` |
| Brazil | `br` | `brazil@yefi.org` |
| Cameroon | `cm` | `cameroon@yefi.org` |
| Canada | `ca` | `canada@yefi.org` |
| Chile | `cl` | `chile@yefi.org` |
| Colombia | `co` | `colombia@yefi.org` |
| Côte d’Ivoire | `ci` | `cote-d-ivoire@yefi.org` |
| Czechia | `cz` | `czechia@yefi.org` |
| Democratic Republic of the Congo | `cd` | `democratic-republic-of-the-congo@yefi.org` |
| Dominican Republic | `do` | `dominican-republic@yefi.org` |
| East Africa Federation | `ke` | `east-africa-federation@yefi.org` |
| Egypt | `eg` | `egypt@yefi.org` |
| Ethiopia | `et` | `ethiopia@yefi.org` |
| Fiji | `fj` | `fiji@yefi.org` |
| France | `fr` | `france@yefi.org` |
| Germany | `de` | `germany@yefi.org` |
| Ghana | `gh` | `ghana@yefi.org` |
| Greece | `gr` | `greece@yefi.org` |
| Guatemala | `gt` | `guatemala@yefi.org` |
| Haiti | `ht` | `haiti@yefi.org` |
| Honduras | `hn` | `honduras@yefi.org` |
| Hungary | `hu` | `hungary@yefi.org` |
| India | `in` | `india@yefi.org` |
| Indonesia | `id` | `indonesia@yefi.org` |
| Israel | `il` | `israel@yefi.org` |
| Italy | `it` | `italy@yefi.org` |
| Japan | `jp` | `japan@yefi.org` |
| Kazakhstan | `kz` | `kazakhstan@yefi.org` |
| Madagascar | `mg` | `madagascar@yefi.org` |
| Malaysia | `my` | `malaysia@yefi.org` |
| Mexico | `mx` | `mexico@yefi.org` |
| Mongolia | `mn` | `mongolia@yefi.org` |
| Mozambique | `mz` | `mozambique@yefi.org` |
| Myanmar | `mm` | `myanmar@yefi.org` |
| Nepal | `np` | `nepal@yefi.org` |
| Netherlands | `nl` | `netherlands@yefi.org` |
| New Zealand | `nz` | `new-zealand@yefi.org` |
| Nigeria | `ng` | `nigeria@yefi.org` |
| Pakistan | `pk` | `pakistan@yefi.org` |
| Peru | `pe` | `peru@yefi.org` |
| Philippines | `ph` | `philippines@yefi.org` |
| Poland | `pl` | `poland@yefi.org` |
| Portugal | `pt` | `portugal@yefi.org` |
| Romania | `ro` | `romania@yefi.org` |
| Russia | `ru` | `russia@yefi.org` |
| Rwanda | `rw` | `rwanda@yefi.org` |
| Samoa | `ws` | `samoa@yefi.org` |
| Singapore | `sg` | `singapore@yefi.org` |
| Slovakia | `sk` | `slovakia@yefi.org` |
| Solomon Islands | `sb` | `solomon-islands@yefi.org` |
| South Africa | `za` | `south-africa@yefi.org` |
| South Korea | `kr` | `south-korea@yefi.org` |
| Spain | `es` | `spain@yefi.org` |
| Sri Lanka | `lk` | `sri-lanka@yefi.org` |
| Sweden | `se` | `sweden@yefi.org` |
| Switzerland | `ch` | `switzerland@yefi.org` |
| Taiwan | `tw` | `taiwan@yefi.org` |
| Thailand | `th` | `thailand@yefi.org` |
| Tonga | `to` | `tonga@yefi.org` |
| Türkiye | `tr` | `turkiye@yefi.org` |
| Ukraine | `ua` | `ukraine@yefi.org` |
| United Arab Emirates | `ae` | `united-arab-emirates@yefi.org` |
| United Kingdom | `gb` | `united-kingdom@yefi.org` |
| United States | `us` | `united-states@yefi.org` |
| Vietnam | `vn` | `vietnam@yefi.org` |
| Zambia | `zm` | `zambia@yefi.org` |

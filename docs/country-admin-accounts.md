# One sign-in per country

Every country site can have its own account in `/admin`, holding that country
and nothing else. This page is how to create them, what they can and cannot
reach, and the two things to settle before handing them out.

## Creating them

The accounts are created by an endpoint, not by hand — 71 accounts typed into
the Users screen is 71 chances to mis-set a country.

1. Sign in to `/admin` as a **super admin**. Nobody else can run this; the
   endpoint answers 403.
2. Visit `/api/provision-country-admins`. This is the dry run: it lists the
   addresses it would create and writes nothing.
3. To create them, open the browser console on that same tab and run:

   ```js
   fetch('/api/provision-country-admins', { method: 'POST' })
     .then((r) => r.json())
     .then((d) => {
       const a = document.createElement('a');
       a.href = URL.createObjectURL(new Blob([d.csv], { type: 'text/csv' }));
       a.download = 'yef-country-admins.csv';
       a.click();
     });
   ```

   That downloads `country,code,email,password` for every account created.

**The passwords exist in readable form once.** Payload stores a hash, so that
CSV is the only copy; losing it means resetting a password, not recovering
one. Keep it somewhere a password manager would be kept, and delete it from
the Downloads folder once the credentials are handed over.

Re-running is safe. Any address that already has an account is skipped rather
than reissued — a second run must not lock someone out of their own site. So
after adding a country to `src/lib/i18n/countries.ts`, run it again and only
the new country is created.

### Addresses

`country-admin-addresses.md` lists every address this will create, so the
list can be checked before anything exists.

The default is the country's name at `yefi.org` — `germany@yefi.org`,
`south-korea@yefi.org`. Two overrides:

- `?naming=code` uses the country code instead: `de@yefi.org`.
- `?domain=example.org` puts them on another domain.

Pass them on the dry run first, so the list can be read before anything is
created.

## What these accounts can reach

The role is `country-admin`, which the access rules in
`src/payload/access.ts` were written around. Every collection that matters
goes through `countryScoped`, which answers with `{ country: { in: scope } }` —
so the list views hold that country's records, and an update aimed at another
country's document is refused rather than merely hidden.

Sections are deliberately not set on these accounts. `hasSection` grants every
section to a region or country admin by design: they are held back by which
countries they reach, not by which pages. Setting a list would read as a
restriction that does not exist.

They **cannot**:

- read, edit or delete another country's pages, posts, events, people or
  members;
- edit anything on the headquarters site (`int`), which is where the shared
  ground lives;
- create, edit or delete any account, including their own permissions — that
  stays with super admins, and the role, country, region and section fields
  are locked at the field level regardless of who owns the record;
- edit headquarters' resources. A resource with no country set is
  headquarters' own, which is every entry that existed before countries could
  own one.

They **can** see, but not change:

- headquarters' library on the Resources hub — the policies and training
  materials are the point of it;
- their own account in the People list, and any other account covering their
  country. Since each of these accounts holds one country, in practice that is
  themselves. Editing the role, country, region and section fields is refused
  silently at the field level even on their own record: a PATCH asking for
  `role: super` returns 200 and changes nothing.

## Two things to settle first

**These are login identities, not mailboxes.** Creating
`germany@yefi.org` here does not create an inbox at that address. Until one
exists, "Forgot password" sends mail nowhere, so the credentials have to be
handed over directly and a reset means a super admin setting a new password in
`/admin`. Creating the mailboxes in the mail provider — or using addresses the
country teams already have — fixes that.

**CMS text is not translated.** A country admin editing a paragraph in the
admin writes English, and it renders in English on their site unless that
exact sentence already exists as a key in `src/messages/<locale>.json`. See
the Languages section of `CLAUDE.md`.

import { randomBytes } from "crypto";
import config from "@payload-config";
import { getPayload } from "payload";
import { NextRequest, NextResponse } from "next/server";
import { isSuper, type AdminUser } from "@/payload/access";
import { countries } from "@/lib/i18n/countries";

/**
 * Gives every country site its own sign-in, holding only that country.
 *
 * One `country-admin` per country, carrying that country and nothing else.
 * The role is the one the access rules were written around: every collection
 * that matters goes through `countryScoped`, which answers with
 * `{ country: { in: scope } }`, so the account's list views hold its own
 * country's records and an update aimed at another country's document is
 * refused rather than hidden.
 *
 * Sections are not set, and that is not an oversight: `hasSection` grants
 * every section to a region or country admin by design — they are "held back
 * by which countries they reach rather than which pages". Writing a list here
 * would read as a restriction that does not exist.
 *
 * GET lists what it would create and creates nothing. POST creates, and is the
 * only time the passwords exist in readable form: Payload stores a hash, so
 * losing the response means resetting a password rather than recovering it.
 *
 * The headquarters site is deliberately absent — `int` is every country's
 * shared ground, and an account holding it is a super admin's job.
 */

function addressFor(name: string, code: string, domain: string, byCode: boolean) {
  const local = byCode
    ? code.toLowerCase()
    : name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
  return `${local}@${domain}`;
}

/**
 * Readable, and still 72 bits of entropy.
 *
 * Someone is going to carry this to a colleague in another country by hand, so
 * the alphabet drops the characters that are read wrongly when they do —
 * O/0, I/l/1 — rather than being pure base64 and arriving mistyped.
 */
function password() {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  const bytes = randomBytes(14);
  return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
}

async function run(request: NextRequest, dryRun: boolean) {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: request.headers });
  if (!user || !isSuper(user as AdminUser)) {
    return NextResponse.json(
      { ok: false, message: "Only a super admin can provision accounts." },
      { status: user ? 403 : 401 },
    );
  }

  const params = new URL(request.url).searchParams;
  const domain = params.get("domain") || "yefi.org";
  const byCode = params.get("naming") === "code";

  const created: { country: string; code: string; email: string; password: string }[] = [];
  const skipped: { country: string; email: string; why: string }[] = [];

  for (const country of [...countries].sort((a, b) => a.name.localeCompare(b.name))) {
    const email = addressFor(country.name, country.code, domain, byCode);

    const existing = await payload.find({
      collection: "users",
      where: { email: { equals: email } },
      limit: 1,
      depth: 0,
    });
    if (existing.docs.length > 0) {
      // Never re-issue a password for an account someone is already using:
      // a second run would lock them out of their own site.
      skipped.push({ country: country.name, email, why: "already exists" });
      continue;
    }

    if (dryRun) {
      created.push({
        country: country.name,
        code: country.code,
        email,
        password: "(generated on POST)",
      });
      continue;
    }

    const secret = password();
    await payload.create({
      collection: "users",
      data: {
        email,
        password: secret,
        name: `YEF ${country.name}`,
        role: "country-admin",
        countries: [country.code],
      } as never,
    });
    created.push({ country: country.name, code: country.code, email, password: secret });
  }

  return NextResponse.json({
    ok: true,
    dryRun,
    domain,
    message: dryRun
      ? `Would create ${created.length} account(s); ${skipped.length} already exist.`
      : `Created ${created.length} account(s); ${skipped.length} already existed.`,
    created,
    skipped,
    csv: [
      "country,code,email,password",
      ...created.map((r) => `${JSON.stringify(r.country)},${r.code},${r.email},${r.password}`),
    ].join("\n"),
  });
}

export async function GET(request: NextRequest) {
  return run(request, true);
}

export async function POST(request: NextRequest) {
  return run(request, false);
}

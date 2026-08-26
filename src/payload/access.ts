import type { Access, FieldAccess, Where } from "payload";
import {
  countries,
  countriesInRegions,
  regions,
  regionsOfCountries,
} from "@/lib/i18n/countries";
import { INTERNATIONAL } from "@/lib/i18n/constants";

/**
 * Who an editor is, and what they may touch.
 *
 * The platform is one Payload instance serving 68 country sites, so almost
 * every rule here is "which countries is this person responsible for". A
 * super admin is responsible for all of them; everyone else carries an
 * explicit list and can neither read nor write outside it.
 */
export type Role = "super" | "region-admin" | "country-admin" | "editor";

export type AdminUser = {
  id: string | number;
  role?: Role | null;
  countries?: string[] | null;
  regions?: string[] | null;
  sections?: string[] | null;
};

/** Every country site, plus the headquarters site, as select options. */
export const countryOptions = [
  { label: "International (headquarters)", value: INTERNATIONAL },
  ...countries
    .map((c) => ({ label: c.name, value: c.code }))
    .sort((a, b) => a.label.localeCompare(b.label)),
];

/**
 * The parts of a site an editor can be given. These are page groups rather
 * than individual routes so the list stays readable as pages are added.
 */
export const sectionOptions = [
  { label: "Home page", value: "home" },
  { label: "Who We Are", value: "who-we-are" },
  { label: "Get Involved", value: "get-involved" },
  { label: "News & Events", value: "news" },
  { label: "Network & chapters", value: "network" },
  { label: "Resources", value: "resources" },
  { label: "Donate", value: "donate" },
  { label: "Media library", value: "media" },
];

export const isSuper = (user?: AdminUser | null): boolean =>
  user?.role === "super";

/** The regions a user may act across, as select options. */
export const regionOptions = regions.map((r) => ({ label: r, value: r }));

/**
 * The countries a user may act in.
 *
 * A region admin names regions rather than countries, so their scope is every
 * country in them. A country admin may hold both, and gets the union.
 */
export function scopeOf(user?: AdminUser | null): string[] {
  const named = user?.countries ?? [];
  const fromRegions = countriesInRegions(user?.regions ?? []);
  return [...new Set([...named, ...fromRegions])];
}

/**
 * The countries a user may distribute content to — their continental sphere.
 *
 * A country's team can push a story to the rest of its own continent, but not
 * onto the whole network; that stays with headquarters. A region admin's
 * sphere is already their region, so this returns the same set.
 */
export function reachOf(user?: AdminUser | null): string[] {
  if (isSuper(user)) return countries.map((c) => c.code);
  const scope = scopeOf(user);
  return [...new Set([...scope, ...countriesInRegions(regionsOfCountries(scope))])];
}

/**
 * A user may edit a section when they are a super admin, or an admin of a
 * region or a country — those two carry every section within their scope, and
 * are held back by which countries they reach rather than which pages. Only
 * an editor is narrowed section by section.
 */
export function hasSection(user: AdminUser | null | undefined, section: string) {
  if (isSuper(user)) return true;
  if (user?.role === "region-admin" || user?.role === "country-admin") {
    return true;
  }
  return Boolean(user?.sections?.includes(section));
}

/**
 * Restricts a collection to the signed-in user's countries.
 *
 * Payload treats a returned query as a filter rather than a flat yes/no, so
 * this both hides other countries' documents from the list view and blocks
 * an update aimed at one directly.
 */
export function countryScoped(section?: string): Access {
  return ({ req: { user } }) => {
    const u = user as AdminUser | null;
    if (!u) return false;
    if (isSuper(u)) return true;
    if (section && !hasSection(u, section)) return false;
    const scope = scopeOf(u);
    if (scope.length === 0) return false;
    return { country: { in: scope } };
  };
}

/** Creation cannot be filtered by a query, so it is a flat check. */
export function canCreateIn(section?: string): Access {
  return ({ req: { user } }) => {
    const u = user as AdminUser | null;
    if (!u) return false;
    if (isSuper(u)) return true;
    if (section && !hasSection(u, section)) return false;
    return scopeOf(u).length > 0;
  };
}

/**
 * What a signed-in editor sees in the admin list.
 *
 * The public site reads with the local API, which bypasses access control and
 * scopes itself by country, so this only governs signed-in people: they see
 * what they own plus what other countries have distributed to them, rather
 * than the whole network's posts.
 */
export function distributedRead(): Access {
  return ({ req: { user } }) => {
    const u = user as AdminUser | null;
    if (!u) return true;
    if (isSuper(u)) return true;
    const scope = scopeOf(u);
    if (scope.length === 0) return false;
    const visible: Where = {
      or: [
        { country: { in: scope } },
        { audience: { equals: "all" } },
        {
          and: [
            { audience: { equals: "some" } },
            { distributeTo: { in: scope } },
          ],
        },
      ],
    };
    return visible;
  };
}

/** Only super admins manage accounts; everyone else sees just their own. */
export const usersAccess: Access = ({ req: { user } }) => {
  const u = user as AdminUser | null;
  if (!u) return false;
  if (isSuper(u)) return true;
  return { id: { equals: u.id } };
};

/** Role, country and section fields are set by super admins only. */
export const superOnlyField: FieldAccess = ({ req: { user } }) =>
  isSuper(user as AdminUser | null);

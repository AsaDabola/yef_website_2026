import type { Access, FieldAccess } from "payload";
import { countries } from "@/lib/i18n/countries";
import { INTERNATIONAL } from "@/lib/i18n/constants";

/**
 * Who an editor is, and what they may touch.
 *
 * The platform is one Payload instance serving 68 country sites, so almost
 * every rule here is "which countries is this person responsible for". A
 * super admin is responsible for all of them; everyone else carries an
 * explicit list and can neither read nor write outside it.
 */
export type Role = "super" | "country-admin" | "editor";

export type AdminUser = {
  id: string | number;
  role?: Role | null;
  countries?: string[] | null;
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

/** The countries a user may act in; empty for a signed-out visitor. */
export const scopeOf = (user?: AdminUser | null): string[] =>
  user?.countries ?? [];

/** A user may edit a section when they are a super admin or it is listed. */
export function hasSection(user: AdminUser | null | undefined, section: string) {
  if (isSuper(user)) return true;
  if (user?.role === "country-admin") return true;
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

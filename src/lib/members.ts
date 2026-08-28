import { headers } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";
import { cmsConfigured } from "@/lib/posts";

/**
 * Who is signed in on the incoming request, for the Resources hub's gate.
 *
 * `payload.auth` reads the shared `payload-token` cookie and resolves it
 * against whichever collection it was issued for — a CMS `users` admin or a
 * `members` account. `null` covers both "not signed in" and "no database
 * configured", so callers can redirect either way without a special case.
 */
export async function currentViewer() {
  if (!cmsConfigured) return null;
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: await headers() });
  if (!user) return null;
  return user as { id: string | number; collection: "users" | "members" };
}

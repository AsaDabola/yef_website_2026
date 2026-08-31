import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

/**
 * Pages render statically and are cached indefinitely (there are ~3,000
 * country/language/route combinations — see the note in
 * `src/lib/i18n/request.ts` — so nothing re-reads cookies/headers that would
 * force per-request rendering). Without this, a save in the CMS updates the
 * database but the already-cached page keeps serving its old content until
 * the next full deployment, which reads as "my change didn't save."
 *
 * Revalidating the whole site on every save is the simplest correct fix: a
 * Pages/Resources edit is a low-frequency, admin-driven action on a
 * modest-traffic site, so the cost (the next visitor to each page re-renders
 * it from the database instead of hitting the cache) is negligible next to
 * the cost of a stale-looking site.
 */
async function revalidateSite() {
  const { revalidatePath } = await import("next/cache");
  revalidatePath("/", "layout");
}

/** A draft save shouldn't invalidate the live cache — only a real publish,
 *  or a collection with no draft/publish workflow at all, should. */
function isLive(doc: unknown): boolean {
  const status = (doc as { _status?: string } | null)?._status;
  return status === undefined || status === "published";
}

export const revalidateAfterChange: CollectionAfterChangeHook = async ({ doc }) => {
  if (isLive(doc)) await revalidateSite();
  return doc;
};

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  await revalidateSite();
  return doc;
};

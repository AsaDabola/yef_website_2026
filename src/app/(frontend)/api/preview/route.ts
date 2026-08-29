import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { defaultLocaleFor, getCountry } from "@/lib/i18n/countries";
import { localePath } from "@/lib/i18n/paths";
import { cmsConfigured } from "@/lib/posts";
import { INTERNATIONAL } from "@/lib/i18n/constants";

/**
 * Opens the site in draft mode for the admin's live preview frame.
 *
 * The editor's session is checked before draft mode is turned on: without
 * that, anyone who guessed this URL could read every country's unpublished
 * work. Payload sends the admin cookie along with the frame's request, so
 * `payload.auth` sees the signed-in editor.
 */
export async function GET(request: Request): Promise<Response> {
  // Without a database there is nothing to preview, and getPayload would
  // throw rather than answer.
  if (!cmsConfigured) return new Response("Not found", { status: 404 });

  const url = new URL(request.url);
  const country = url.searchParams.get("country") ?? INTERNATIONAL;
  const route = url.searchParams.get("route") ?? "home";

  const payload = await getPayload({ config });
  const { user } = await payload.auth({
    headers: request.headers,
  });
  if (!user) {
    return new Response("Unauthorised", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  const locale =
    country === INTERNATIONAL ? "en" : defaultLocaleFor(country);
  const known = country === INTERNATIONAL || Boolean(getCountry(country));
  const path = route === "home" ? "/" : `/${route}`;
  redirect(localePath(path, known ? country : INTERNATIONAL, locale));
}

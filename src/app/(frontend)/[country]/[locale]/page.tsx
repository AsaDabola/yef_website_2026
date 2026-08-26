import { draftMode } from "next/headers";
import RenderBlocks from "@/components/home-v2/RenderBlocks";
import Footer from "@/components/Footer";
import { getLayout } from "@/lib/pages";
import { applyRequestLocale, type LocaleParams } from "@/lib/i18n/request";

export default async function Home({ params }: { params: LocaleParams }) {
  await applyRequestLocale(params);
  // Draft mode is only ever on inside the admin's live preview frame, so the
  // public page stays statically rendered.
  const { isEnabled: draft } = await draftMode();
  const layout = await getLayout("home", draft);

  return (
    <>
      <main>
        <RenderBlocks layout={layout} />
      </main>
      <Footer />
    </>
  );
}

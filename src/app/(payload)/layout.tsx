/* Payload's admin UI ships its own document shell, so this route group opts out
   of the site layout entirely. */
import type { ServerFunctionClient } from "payload";
import { Inter } from "next/font/google";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import config from "@payload-config";
import "@payloadcms/next/css";
import "./admin-theme.css";
import { importMap } from "./admin/importMap";

// Not the frontend site's Inter loader — the admin is a separate document
// shell (see the note below) with no access to that layout's CSS variable,
// so it gets its own copy under a distinct variable name.
const inter = Inter({ variable: "--font-admin-inter", subsets: ["latin"] });

type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};

export default function Layout({ children }: Args) {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={serverFunction}
      htmlProps={{ className: inter.variable }}
    >
      {children}
    </RootLayout>
  );
}

import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Media } from "@/payload/collections/Media";
import { Members } from "@/payload/collections/Members";
import { Pages } from "@/payload/collections/Pages";
import { PhotoEvents } from "@/payload/collections/PhotoEvents";
import { Posts } from "@/payload/collections/Posts";
import { Resources } from "@/payload/collections/Resources";
import { Users } from "@/payload/collections/Users";

const dirname = path.dirname(fileURLToPath(import.meta.url));

// On Vercel the filesystem is read-only, so uploads have to go to Blob. Locally
// there is no token and Payload falls back to writing into public/media.
const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

export default buildConfig({
  admin: {
    user: Users.slug,
    // Payload's default account avatar is a Gravatar request; keep the admin
    // free of third-party calls.
    avatar: "default",
    meta: {
      titleSuffix: " — YEF",
    },
    // Live preview renders the real site beside the editor, through a route
    // that turns on Payload's draft mode so unpublished work shows.
    livePreview: {
      breakpoints: [
        { label: "Phone", name: "phone", width: 390, height: 844 },
        { label: "Tablet", name: "tablet", width: 834, height: 1112 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  collections: [Pages, Posts, PhotoEvents, Media, Users, Members, Resources],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || "" },
  }),
  sharp,
  upload: {
    limits: { fileSize: 10_000_000 },
  },
  plugins: blobToken
    ? [
        vercelBlobStorage({
          collections: { [Media.slug]: true, [Resources.slug]: true },
          token: blobToken,
        }),
      ]
    : [],
});

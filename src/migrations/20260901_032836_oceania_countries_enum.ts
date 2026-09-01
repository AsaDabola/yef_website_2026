import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TYPE "public"."enum_pages_country" ADD VALUE 'to';
  ALTER TYPE "public"."enum_pages_country" ADD VALUE 'ws';
  ALTER TYPE "public"."enum_pages_country" ADD VALUE 'sb';
  ALTER TYPE "public"."enum__pages_v_version_country" ADD VALUE 'to';
  ALTER TYPE "public"."enum__pages_v_version_country" ADD VALUE 'ws';
  ALTER TYPE "public"."enum__pages_v_version_country" ADD VALUE 'sb';
  ALTER TYPE "public"."enum_posts_country" ADD VALUE 'to';
  ALTER TYPE "public"."enum_posts_country" ADD VALUE 'ws';
  ALTER TYPE "public"."enum_posts_country" ADD VALUE 'sb';
  ALTER TYPE "public"."enum__posts_v_version_country" ADD VALUE 'to';
  ALTER TYPE "public"."enum__posts_v_version_country" ADD VALUE 'ws';
  ALTER TYPE "public"."enum__posts_v_version_country" ADD VALUE 'sb';
  ALTER TYPE "public"."enum_media_country" ADD VALUE 'to';
  ALTER TYPE "public"."enum_media_country" ADD VALUE 'ws';
  ALTER TYPE "public"."enum_media_country" ADD VALUE 'sb';
  ALTER TYPE "public"."enum_photo_events_country" ADD VALUE 'to';
  ALTER TYPE "public"."enum_photo_events_country" ADD VALUE 'ws';
  ALTER TYPE "public"."enum_photo_events_country" ADD VALUE 'sb';
  ALTER TYPE "public"."enum_users_countries" ADD VALUE 'to';
  ALTER TYPE "public"."enum_users_countries" ADD VALUE 'ws';
  ALTER TYPE "public"."enum_users_countries" ADD VALUE 'sb';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "pages" ALTER COLUMN "country" SET DATA TYPE text;
  DROP TYPE "public"."enum_pages_country";
  CREATE TYPE "public"."enum_pages_country" AS ENUM('int', 'ao', 'ar', 'au', 'at', 'bd', 'be', 'br', 'cm', 'ca', 'cl', 'co', 'ci', 'cz', 'cd', 'do', 'ke', 'eg', 'et', 'fj', 'fr', 'de', 'gh', 'gr', 'gt', 'ht', 'hn', 'hu', 'in', 'id', 'il', 'it', 'jp', 'kz', 'mg', 'my', 'mx', 'mn', 'mz', 'mm', 'np', 'nl', 'nz', 'ng', 'pk', 'pe', 'ph', 'pl', 'pt', 'ro', 'ru', 'rw', 'sg', 'sk', 'za', 'kr', 'es', 'lk', 'se', 'ch', 'tw', 'th', 'tr', 'ua', 'ae', 'gb', 'us', 'vn', 'zm');
  ALTER TABLE "pages" ALTER COLUMN "country" SET DATA TYPE "public"."enum_pages_country" USING "country"::"public"."enum_pages_country";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_country" SET DATA TYPE text;
  DROP TYPE "public"."enum__pages_v_version_country";
  CREATE TYPE "public"."enum__pages_v_version_country" AS ENUM('int', 'ao', 'ar', 'au', 'at', 'bd', 'be', 'br', 'cm', 'ca', 'cl', 'co', 'ci', 'cz', 'cd', 'do', 'ke', 'eg', 'et', 'fj', 'fr', 'de', 'gh', 'gr', 'gt', 'ht', 'hn', 'hu', 'in', 'id', 'il', 'it', 'jp', 'kz', 'mg', 'my', 'mx', 'mn', 'mz', 'mm', 'np', 'nl', 'nz', 'ng', 'pk', 'pe', 'ph', 'pl', 'pt', 'ro', 'ru', 'rw', 'sg', 'sk', 'za', 'kr', 'es', 'lk', 'se', 'ch', 'tw', 'th', 'tr', 'ua', 'ae', 'gb', 'us', 'vn', 'zm');
  ALTER TABLE "_pages_v" ALTER COLUMN "version_country" SET DATA TYPE "public"."enum__pages_v_version_country" USING "version_country"::"public"."enum__pages_v_version_country";
  ALTER TABLE "posts" ALTER COLUMN "country" SET DATA TYPE text;
  DROP TYPE "public"."enum_posts_country";
  CREATE TYPE "public"."enum_posts_country" AS ENUM('int', 'ao', 'ar', 'au', 'at', 'bd', 'be', 'br', 'cm', 'ca', 'cl', 'co', 'ci', 'cz', 'cd', 'do', 'ke', 'eg', 'et', 'fj', 'fr', 'de', 'gh', 'gr', 'gt', 'ht', 'hn', 'hu', 'in', 'id', 'il', 'it', 'jp', 'kz', 'mg', 'my', 'mx', 'mn', 'mz', 'mm', 'np', 'nl', 'nz', 'ng', 'pk', 'pe', 'ph', 'pl', 'pt', 'ro', 'ru', 'rw', 'sg', 'sk', 'za', 'kr', 'es', 'lk', 'se', 'ch', 'tw', 'th', 'tr', 'ua', 'ae', 'gb', 'us', 'vn', 'zm');
  ALTER TABLE "posts" ALTER COLUMN "country" SET DATA TYPE "public"."enum_posts_country" USING "country"::"public"."enum_posts_country";
  ALTER TABLE "_posts_v" ALTER COLUMN "version_country" SET DATA TYPE text;
  DROP TYPE "public"."enum__posts_v_version_country";
  CREATE TYPE "public"."enum__posts_v_version_country" AS ENUM('int', 'ao', 'ar', 'au', 'at', 'bd', 'be', 'br', 'cm', 'ca', 'cl', 'co', 'ci', 'cz', 'cd', 'do', 'ke', 'eg', 'et', 'fj', 'fr', 'de', 'gh', 'gr', 'gt', 'ht', 'hn', 'hu', 'in', 'id', 'il', 'it', 'jp', 'kz', 'mg', 'my', 'mx', 'mn', 'mz', 'mm', 'np', 'nl', 'nz', 'ng', 'pk', 'pe', 'ph', 'pl', 'pt', 'ro', 'ru', 'rw', 'sg', 'sk', 'za', 'kr', 'es', 'lk', 'se', 'ch', 'tw', 'th', 'tr', 'ua', 'ae', 'gb', 'us', 'vn', 'zm');
  ALTER TABLE "_posts_v" ALTER COLUMN "version_country" SET DATA TYPE "public"."enum__posts_v_version_country" USING "version_country"::"public"."enum__posts_v_version_country";
  ALTER TABLE "media" ALTER COLUMN "country" SET DATA TYPE text;
  DROP TYPE "public"."enum_media_country";
  CREATE TYPE "public"."enum_media_country" AS ENUM('int', 'ao', 'ar', 'au', 'at', 'bd', 'be', 'br', 'cm', 'ca', 'cl', 'co', 'ci', 'cz', 'cd', 'do', 'ke', 'eg', 'et', 'fj', 'fr', 'de', 'gh', 'gr', 'gt', 'ht', 'hn', 'hu', 'in', 'id', 'il', 'it', 'jp', 'kz', 'mg', 'my', 'mx', 'mn', 'mz', 'mm', 'np', 'nl', 'nz', 'ng', 'pk', 'pe', 'ph', 'pl', 'pt', 'ro', 'ru', 'rw', 'sg', 'sk', 'za', 'kr', 'es', 'lk', 'se', 'ch', 'tw', 'th', 'tr', 'ua', 'ae', 'gb', 'us', 'vn', 'zm');
  ALTER TABLE "media" ALTER COLUMN "country" SET DATA TYPE "public"."enum_media_country" USING "country"::"public"."enum_media_country";
  ALTER TABLE "photo_events" ALTER COLUMN "country" SET DATA TYPE text;
  DROP TYPE "public"."enum_photo_events_country";
  CREATE TYPE "public"."enum_photo_events_country" AS ENUM('int', 'ao', 'ar', 'au', 'at', 'bd', 'be', 'br', 'cm', 'ca', 'cl', 'co', 'ci', 'cz', 'cd', 'do', 'ke', 'eg', 'et', 'fj', 'fr', 'de', 'gh', 'gr', 'gt', 'ht', 'hn', 'hu', 'in', 'id', 'il', 'it', 'jp', 'kz', 'mg', 'my', 'mx', 'mn', 'mz', 'mm', 'np', 'nl', 'nz', 'ng', 'pk', 'pe', 'ph', 'pl', 'pt', 'ro', 'ru', 'rw', 'sg', 'sk', 'za', 'kr', 'es', 'lk', 'se', 'ch', 'tw', 'th', 'tr', 'ua', 'ae', 'gb', 'us', 'vn', 'zm');
  ALTER TABLE "photo_events" ALTER COLUMN "country" SET DATA TYPE "public"."enum_photo_events_country" USING "country"::"public"."enum_photo_events_country";
  ALTER TABLE "users_countries" ALTER COLUMN "value" SET DATA TYPE text;
  DROP TYPE "public"."enum_users_countries";
  CREATE TYPE "public"."enum_users_countries" AS ENUM('int', 'ao', 'ar', 'au', 'at', 'bd', 'be', 'br', 'cm', 'ca', 'cl', 'co', 'ci', 'cz', 'cd', 'do', 'ke', 'eg', 'et', 'fj', 'fr', 'de', 'gh', 'gr', 'gt', 'ht', 'hn', 'hu', 'in', 'id', 'il', 'it', 'jp', 'kz', 'mg', 'my', 'mx', 'mn', 'mz', 'mm', 'np', 'nl', 'nz', 'ng', 'pk', 'pe', 'ph', 'pl', 'pt', 'ro', 'ru', 'rw', 'sg', 'sk', 'za', 'kr', 'es', 'lk', 'se', 'ch', 'tw', 'th', 'tr', 'ua', 'ae', 'gb', 'us', 'vn', 'zm');
  ALTER TABLE "users_countries" ALTER COLUMN "value" SET DATA TYPE "public"."enum_users_countries" USING "value"::"public"."enum_users_countries";`)
}

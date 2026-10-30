import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

/**
 * Gives a resource a country, so the library can be scoped the way the rest
 * of the CMS already is.
 *
 * Until now `resources` had no country at all and its write access was
 * "anyone with a CMS account", which meant a country admin could edit, replace
 * or delete headquarters' policies and every other country's materials. With
 * one sign-in per country about to exist, that is the one collection that
 * would have reached the whole network.
 *
 * The column is nullable and every existing row keeps a NULL, which reads as
 * "headquarters' own" — so the public hub shows exactly what it showed before
 * and only a super admin can touch those entries.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TYPE "public"."enum_resources_country" AS ENUM('int', 'ao', 'ar', 'au', 'at', 'bd', 'be', 'br', 'cm', 'ca', 'cl', 'co', 'ci', 'cz', 'cd', 'do', 'ke', 'eg', 'et', 'fj', 'fr', 'de', 'gh', 'gr', 'gt', 'ht', 'hn', 'hu', 'in', 'id', 'il', 'it', 'jp', 'kz', 'mg', 'my', 'mx', 'mn', 'mz', 'mm', 'np', 'nl', 'nz', 'ng', 'pk', 'pe', 'ph', 'pl', 'pt', 'ro', 'ru', 'rw', 'ws', 'sg', 'sk', 'sb', 'za', 'kr', 'es', 'lk', 'se', 'ch', 'tw', 'th', 'to', 'tr', 'ua', 'ae', 'gb', 'us', 'vn', 'zm');
  ALTER TABLE "resources" ADD COLUMN "country" "enum_resources_country";
  CREATE INDEX "resources_country_idx" ON "resources" USING btree ("country");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP INDEX "resources_country_idx";
  ALTER TABLE "resources" DROP COLUMN "country";
  DROP TYPE "public"."enum_resources_country";`);
}

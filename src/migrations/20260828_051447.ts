import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_photo_events_distribute_to" AS ENUM('int', 'ao', 'ar', 'au', 'at', 'bd', 'be', 'br', 'cm', 'ca', 'cl', 'co', 'ci', 'cz', 'cd', 'do', 'ke', 'eg', 'et', 'fj', 'fr', 'de', 'gh', 'gr', 'gt', 'ht', 'hn', 'hu', 'in', 'id', 'il', 'it', 'jp', 'kz', 'mg', 'my', 'mx', 'mn', 'mz', 'mm', 'np', 'nl', 'nz', 'ng', 'pk', 'pe', 'ph', 'pl', 'pt', 'ro', 'ru', 'rw', 'sg', 'sk', 'za', 'kr', 'es', 'lk', 'se', 'ch', 'tw', 'th', 'tr', 'ua', 'ae', 'gb', 'us', 'vn', 'zm');
  CREATE TYPE "public"."enum_photo_events_audience" AS ENUM('own', 'some', 'all');
  CREATE TABLE "photo_events_distribute_to" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_photo_events_distribute_to",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  ALTER TABLE "photo_events" ADD COLUMN "audience" "enum_photo_events_audience" DEFAULT 'own' NOT NULL;
  ALTER TABLE "photo_events_distribute_to" ADD CONSTRAINT "photo_events_distribute_to_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."photo_events"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "photo_events_distribute_to_order_idx" ON "photo_events_distribute_to" USING btree ("order");
  CREATE INDEX "photo_events_distribute_to_parent_idx" ON "photo_events_distribute_to" USING btree ("parent_id");
  CREATE INDEX "photo_events_distribute_to_value_idx" ON "photo_events_distribute_to" USING btree ("value");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "photo_events_distribute_to" CASCADE;
  ALTER TABLE "photo_events" DROP COLUMN "audience";
  DROP TYPE "public"."enum_photo_events_distribute_to";
  DROP TYPE "public"."enum_photo_events_audience";`)
}

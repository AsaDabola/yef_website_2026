import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_photo_events_country" AS ENUM('int', 'ao', 'ar', 'au', 'at', 'bd', 'be', 'br', 'cm', 'ca', 'cl', 'co', 'ci', 'cz', 'cd', 'do', 'ke', 'eg', 'et', 'fj', 'fr', 'de', 'gh', 'gr', 'gt', 'ht', 'hn', 'hu', 'in', 'id', 'il', 'it', 'jp', 'kz', 'mg', 'my', 'mx', 'mn', 'mz', 'mm', 'np', 'nl', 'nz', 'ng', 'pk', 'pe', 'ph', 'pl', 'pt', 'ro', 'ru', 'rw', 'sg', 'sk', 'za', 'kr', 'es', 'lk', 'se', 'ch', 'tw', 'th', 'tr', 'ua', 'ae', 'gb', 'us', 'vn', 'zm');
  CREATE TABLE "photo_events_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "photo_events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"country" "enum_photo_events_country" NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"published_at" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "photo_events_id" integer;
  ALTER TABLE "photo_events_photos" ADD CONSTRAINT "photo_events_photos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "photo_events_photos" ADD CONSTRAINT "photo_events_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."photo_events"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "photo_events_photos_order_idx" ON "photo_events_photos" USING btree ("_order");
  CREATE INDEX "photo_events_photos_parent_id_idx" ON "photo_events_photos" USING btree ("_parent_id");
  CREATE INDEX "photo_events_photos_image_idx" ON "photo_events_photos" USING btree ("image_id");
  CREATE INDEX "photo_events_country_idx" ON "photo_events" USING btree ("country");
  CREATE UNIQUE INDEX "photo_events_slug_idx" ON "photo_events" USING btree ("slug");
  CREATE INDEX "photo_events_updated_at_idx" ON "photo_events" USING btree ("updated_at");
  CREATE INDEX "photo_events_created_at_idx" ON "photo_events" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_photo_events_fk" FOREIGN KEY ("photo_events_id") REFERENCES "public"."photo_events"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_photo_events_id_idx" ON "payload_locked_documents_rels" USING btree ("photo_events_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "photo_events_photos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "photo_events" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "photo_events_photos" CASCADE;
  DROP TABLE "photo_events" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_photo_events_fk";
  
  DROP INDEX "payload_locked_documents_rels_photo_events_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "photo_events_id";
  DROP TYPE "public"."enum_photo_events_country";`)
}

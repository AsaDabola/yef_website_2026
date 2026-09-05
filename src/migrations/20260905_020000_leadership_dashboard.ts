import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

/**
 * Adds leadership-tracking fields to `members` (country, training stage,
 * advancing-to-next-stage, raised-up date) and a new `leadership-positions`
 * collection, so the admin dashboard's leadership overview
 * (LeadershipDashboard.tsx) has real data to count.
 */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TYPE "public"."enum_members_country" AS ENUM('int', 'ao', 'ar', 'au', 'at', 'bd', 'be', 'br', 'cm', 'ca', 'cl', 'co', 'ci', 'cz', 'cd', 'do', 'ke', 'eg', 'et', 'fj', 'fr', 'de', 'gh', 'gr', 'gt', 'ht', 'hn', 'hu', 'in', 'id', 'il', 'it', 'jp', 'kz', 'mg', 'my', 'mx', 'mn', 'mz', 'mm', 'np', 'nl', 'nz', 'ng', 'pk', 'pe', 'ph', 'pl', 'pt', 'ro', 'ru', 'rw', 'sg', 'sk', 'za', 'kr', 'es', 'lk', 'se', 'ch', 'tw', 'th', 'tr', 'ua', 'ae', 'gb', 'us', 'vn', 'zm');
  CREATE TYPE "public"."enum_members_training_stage" AS ENUM('join', 'grow', 'reach', 'train', 'serve');
  ALTER TABLE "members" ADD COLUMN "country" "enum_members_country";
  ALTER TABLE "members" ADD COLUMN "training_stage" "enum_members_training_stage";
  ALTER TABLE "members" ADD COLUMN "advancing_to_next_stage" boolean DEFAULT false;
  ALTER TABLE "members" ADD COLUMN "raised_up_at" timestamp(3) with time zone;
  CREATE INDEX "members_country_idx" ON "members" USING btree ("country");
  CREATE INDEX "members_training_stage_idx" ON "members" USING btree ("training_stage");

  CREATE TYPE "public"."enum_leadership_positions_country" AS ENUM('int', 'ao', 'ar', 'au', 'at', 'bd', 'be', 'br', 'cm', 'ca', 'cl', 'co', 'ci', 'cz', 'cd', 'do', 'ke', 'eg', 'et', 'fj', 'fr', 'de', 'gh', 'gr', 'gt', 'ht', 'hn', 'hu', 'in', 'id', 'il', 'it', 'jp', 'kz', 'mg', 'my', 'mx', 'mn', 'mz', 'mm', 'np', 'nl', 'nz', 'ng', 'pk', 'pe', 'ph', 'pl', 'pt', 'ro', 'ru', 'rw', 'sg', 'sk', 'za', 'kr', 'es', 'lk', 'se', 'ch', 'tw', 'th', 'tr', 'ua', 'ae', 'gb', 'us', 'vn', 'zm');
  CREATE TABLE "leadership_positions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"position_title" varchar NOT NULL,
  	"country" "enum_leadership_positions_country" NOT NULL,
  	"filled" boolean DEFAULT false,
  	"filled_by_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  ALTER TABLE "leadership_positions" ADD CONSTRAINT "leadership_positions_filled_by_id_members_id_fk" FOREIGN KEY ("filled_by_id") REFERENCES "public"."members"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "leadership_positions_country_idx" ON "leadership_positions" USING btree ("country");
  CREATE INDEX "leadership_positions_filled_idx" ON "leadership_positions" USING btree ("filled");
  CREATE INDEX "leadership_positions_filled_by_idx" ON "leadership_positions" USING btree ("filled_by_id");
  CREATE INDEX "leadership_positions_updated_at_idx" ON "leadership_positions" USING btree ("updated_at");
  CREATE INDEX "leadership_positions_created_at_idx" ON "leadership_positions" USING btree ("created_at");

  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "leadership_positions_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leadership_positions_fk" FOREIGN KEY ("leadership_positions_id") REFERENCES "public"."leadership_positions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_leadership_positions_id_idx" ON "payload_locked_documents_rels" USING btree ("leadership_positions_id");`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_leadership_positions_fk";
  DROP INDEX "payload_locked_documents_rels_leadership_positions_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "leadership_positions_id";

  ALTER TABLE "leadership_positions" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "leadership_positions" CASCADE;
  DROP TYPE "public"."enum_leadership_positions_country";

  DROP INDEX "members_country_idx";
  DROP INDEX "members_training_stage_idx";
  ALTER TABLE "members" DROP COLUMN "country";
  ALTER TABLE "members" DROP COLUMN "training_stage";
  ALTER TABLE "members" DROP COLUMN "advancing_to_next_stage";
  ALTER TABLE "members" DROP COLUMN "raised_up_at";
  DROP TYPE "public"."enum_members_country";
  DROP TYPE "public"."enum_members_training_stage";`);
}

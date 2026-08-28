import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ADD COLUMN "header_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "header_heading" varchar;
  ALTER TABLE "pages" ADD COLUMN "header_intro" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_header_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_header_heading" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_header_intro" varchar;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_header_image_id_media_id_fk" FOREIGN KEY ("header_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_header_image_id_media_id_fk" FOREIGN KEY ("version_header_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_header_header_image_idx" ON "pages" USING btree ("header_image_id");
  CREATE INDEX "_pages_v_version_header_version_header_image_idx" ON "_pages_v" USING btree ("version_header_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP CONSTRAINT "pages_header_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_header_image_id_media_id_fk";
  
  DROP INDEX "pages_header_header_image_idx";
  DROP INDEX "_pages_v_version_header_version_header_image_idx";
  ALTER TABLE "pages" DROP COLUMN "header_image_id";
  ALTER TABLE "pages" DROP COLUMN "header_heading";
  ALTER TABLE "pages" DROP COLUMN "header_intro";
  ALTER TABLE "_pages_v" DROP COLUMN "version_header_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_header_heading";
  ALTER TABLE "_pages_v" DROP COLUMN "version_header_intro";`)
}

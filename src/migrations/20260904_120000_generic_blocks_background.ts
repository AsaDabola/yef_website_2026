import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TYPE "public"."enum_pages_blocks_generic_text_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  CREATE TYPE "public"."enum__pages_v_blocks_generic_text_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  ALTER TABLE "pages_blocks_generic_text" ADD COLUMN "background" "enum_pages_blocks_generic_text_background" DEFAULT 'white';
  ALTER TABLE "_pages_v_blocks_generic_text" ADD COLUMN "background" "enum__pages_v_blocks_generic_text_background" DEFAULT 'white';
  CREATE TYPE "public"."enum_pages_blocks_generic_cards_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  CREATE TYPE "public"."enum__pages_v_blocks_generic_cards_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  ALTER TABLE "pages_blocks_generic_cards" ADD COLUMN "background" "enum_pages_blocks_generic_cards_background" DEFAULT 'white';
  ALTER TABLE "_pages_v_blocks_generic_cards" ADD COLUMN "background" "enum__pages_v_blocks_generic_cards_background" DEFAULT 'white';
  CREATE TYPE "public"."enum_pages_blocks_generic_image_text_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  CREATE TYPE "public"."enum__pages_v_blocks_generic_image_text_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  ALTER TABLE "pages_blocks_generic_image_text" ADD COLUMN "background" "enum_pages_blocks_generic_image_text_background" DEFAULT 'white';
  ALTER TABLE "_pages_v_blocks_generic_image_text" ADD COLUMN "background" "enum__pages_v_blocks_generic_image_text_background" DEFAULT 'white';
  CREATE TYPE "public"."enum_pages_blocks_generic_gallery_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  CREATE TYPE "public"."enum__pages_v_blocks_generic_gallery_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  ALTER TABLE "pages_blocks_generic_gallery" ADD COLUMN "background" "enum_pages_blocks_generic_gallery_background" DEFAULT 'white';
  ALTER TABLE "_pages_v_blocks_generic_gallery" ADD COLUMN "background" "enum__pages_v_blocks_generic_gallery_background" DEFAULT 'white';
  CREATE TYPE "public"."enum_pages_blocks_generic_stats_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  CREATE TYPE "public"."enum__pages_v_blocks_generic_stats_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  ALTER TABLE "pages_blocks_generic_stats" ADD COLUMN "background" "enum_pages_blocks_generic_stats_background" DEFAULT 'white';
  ALTER TABLE "_pages_v_blocks_generic_stats" ADD COLUMN "background" "enum__pages_v_blocks_generic_stats_background" DEFAULT 'white';
  CREATE TYPE "public"."enum_pages_blocks_generic_timeline_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  CREATE TYPE "public"."enum__pages_v_blocks_generic_timeline_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  ALTER TABLE "pages_blocks_generic_timeline" ADD COLUMN "background" "enum_pages_blocks_generic_timeline_background" DEFAULT 'white';
  ALTER TABLE "_pages_v_blocks_generic_timeline" ADD COLUMN "background" "enum__pages_v_blocks_generic_timeline_background" DEFAULT 'white';
  CREATE TYPE "public"."enum_pages_blocks_generic_cta_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  CREATE TYPE "public"."enum__pages_v_blocks_generic_cta_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  ALTER TABLE "pages_blocks_generic_cta" ADD COLUMN "background" "enum_pages_blocks_generic_cta_background" DEFAULT 'white';
  ALTER TABLE "_pages_v_blocks_generic_cta" ADD COLUMN "background" "enum__pages_v_blocks_generic_cta_background" DEFAULT 'white';
  CREATE TYPE "public"."enum_pages_blocks_generic_quote_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  CREATE TYPE "public"."enum__pages_v_blocks_generic_quote_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  ALTER TABLE "pages_blocks_generic_quote" ADD COLUMN "background" "enum_pages_blocks_generic_quote_background" DEFAULT 'white';
  ALTER TABLE "_pages_v_blocks_generic_quote" ADD COLUMN "background" "enum__pages_v_blocks_generic_quote_background" DEFAULT 'white';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "pages_blocks_generic_text" DROP COLUMN "background";
  ALTER TABLE "_pages_v_blocks_generic_text" DROP COLUMN "background";
  DROP TYPE "public"."enum_pages_blocks_generic_text_background";
  DROP TYPE "public"."enum__pages_v_blocks_generic_text_background";
  ALTER TABLE "pages_blocks_generic_cards" DROP COLUMN "background";
  ALTER TABLE "_pages_v_blocks_generic_cards" DROP COLUMN "background";
  DROP TYPE "public"."enum_pages_blocks_generic_cards_background";
  DROP TYPE "public"."enum__pages_v_blocks_generic_cards_background";
  ALTER TABLE "pages_blocks_generic_image_text" DROP COLUMN "background";
  ALTER TABLE "_pages_v_blocks_generic_image_text" DROP COLUMN "background";
  DROP TYPE "public"."enum_pages_blocks_generic_image_text_background";
  DROP TYPE "public"."enum__pages_v_blocks_generic_image_text_background";
  ALTER TABLE "pages_blocks_generic_gallery" DROP COLUMN "background";
  ALTER TABLE "_pages_v_blocks_generic_gallery" DROP COLUMN "background";
  DROP TYPE "public"."enum_pages_blocks_generic_gallery_background";
  DROP TYPE "public"."enum__pages_v_blocks_generic_gallery_background";
  ALTER TABLE "pages_blocks_generic_stats" DROP COLUMN "background";
  ALTER TABLE "_pages_v_blocks_generic_stats" DROP COLUMN "background";
  DROP TYPE "public"."enum_pages_blocks_generic_stats_background";
  DROP TYPE "public"."enum__pages_v_blocks_generic_stats_background";
  ALTER TABLE "pages_blocks_generic_timeline" DROP COLUMN "background";
  ALTER TABLE "_pages_v_blocks_generic_timeline" DROP COLUMN "background";
  DROP TYPE "public"."enum_pages_blocks_generic_timeline_background";
  DROP TYPE "public"."enum__pages_v_blocks_generic_timeline_background";
  ALTER TABLE "pages_blocks_generic_cta" DROP COLUMN "background";
  ALTER TABLE "_pages_v_blocks_generic_cta" DROP COLUMN "background";
  DROP TYPE "public"."enum_pages_blocks_generic_cta_background";
  DROP TYPE "public"."enum__pages_v_blocks_generic_cta_background";
  ALTER TABLE "pages_blocks_generic_quote" DROP COLUMN "background";
  ALTER TABLE "_pages_v_blocks_generic_quote" DROP COLUMN "background";
  DROP TYPE "public"."enum_pages_blocks_generic_quote_background";
  DROP TYPE "public"."enum__pages_v_blocks_generic_quote_background";`)
}

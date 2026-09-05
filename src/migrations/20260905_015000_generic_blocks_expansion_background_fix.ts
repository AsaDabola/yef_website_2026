import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

/**
 * Hotfix: the previous migration (20260904_140000_generic_blocks_expansion)
 * created the 6 new generic block tables without a `background` column,
 * even though the Payload schema gives every generic block one (via the
 * shared `backgroundField` in src/payload/blocks/generic.ts). Since Payload
 * joins every block table into a single query per page, the missing column
 * broke that query — and therefore every page on the site, not just pages
 * using one of the 6 new blocks.
 */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE TYPE "public"."enum_pages_blocks_generic_list_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  CREATE TYPE "public"."enum__pages_v_blocks_generic_list_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  ALTER TABLE "pages_blocks_generic_list" ADD COLUMN "background" "enum_pages_blocks_generic_list_background" DEFAULT 'white';
  ALTER TABLE "_pages_v_blocks_generic_list" ADD COLUMN "background" "enum__pages_v_blocks_generic_list_background" DEFAULT 'white';
  CREATE TYPE "public"."enum_pages_blocks_generic_feature_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  CREATE TYPE "public"."enum__pages_v_blocks_generic_feature_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  ALTER TABLE "pages_blocks_generic_feature" ADD COLUMN "background" "enum_pages_blocks_generic_feature_background" DEFAULT 'white';
  ALTER TABLE "_pages_v_blocks_generic_feature" ADD COLUMN "background" "enum__pages_v_blocks_generic_feature_background" DEFAULT 'white';
  CREATE TYPE "public"."enum_pages_blocks_generic_icon_cards_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  CREATE TYPE "public"."enum__pages_v_blocks_generic_icon_cards_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  ALTER TABLE "pages_blocks_generic_icon_cards" ADD COLUMN "background" "enum_pages_blocks_generic_icon_cards_background" DEFAULT 'white';
  ALTER TABLE "_pages_v_blocks_generic_icon_cards" ADD COLUMN "background" "enum__pages_v_blocks_generic_icon_cards_background" DEFAULT 'white';
  CREATE TYPE "public"."enum_pages_blocks_generic_link_cards_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  CREATE TYPE "public"."enum__pages_v_blocks_generic_link_cards_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  ALTER TABLE "pages_blocks_generic_link_cards" ADD COLUMN "background" "enum_pages_blocks_generic_link_cards_background" DEFAULT 'white';
  ALTER TABLE "_pages_v_blocks_generic_link_cards" ADD COLUMN "background" "enum__pages_v_blocks_generic_link_cards_background" DEFAULT 'white';
  CREATE TYPE "public"."enum_pages_blocks_generic_journey_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  CREATE TYPE "public"."enum__pages_v_blocks_generic_journey_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  ALTER TABLE "pages_blocks_generic_journey" ADD COLUMN "background" "enum_pages_blocks_generic_journey_background" DEFAULT 'white';
  ALTER TABLE "_pages_v_blocks_generic_journey" ADD COLUMN "background" "enum__pages_v_blocks_generic_journey_background" DEFAULT 'white';
  CREATE TYPE "public"."enum_pages_blocks_generic_photo_grid_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  CREATE TYPE "public"."enum__pages_v_blocks_generic_photo_grid_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
  ALTER TABLE "pages_blocks_generic_photo_grid" ADD COLUMN "background" "enum_pages_blocks_generic_photo_grid_background" DEFAULT 'white';
  ALTER TABLE "_pages_v_blocks_generic_photo_grid" ADD COLUMN "background" "enum__pages_v_blocks_generic_photo_grid_background" DEFAULT 'white';`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "pages_blocks_generic_list" DROP COLUMN "background";
  ALTER TABLE "_pages_v_blocks_generic_list" DROP COLUMN "background";
  DROP TYPE "public"."enum_pages_blocks_generic_list_background";
  DROP TYPE "public"."enum__pages_v_blocks_generic_list_background";
  ALTER TABLE "pages_blocks_generic_feature" DROP COLUMN "background";
  ALTER TABLE "_pages_v_blocks_generic_feature" DROP COLUMN "background";
  DROP TYPE "public"."enum_pages_blocks_generic_feature_background";
  DROP TYPE "public"."enum__pages_v_blocks_generic_feature_background";
  ALTER TABLE "pages_blocks_generic_icon_cards" DROP COLUMN "background";
  ALTER TABLE "_pages_v_blocks_generic_icon_cards" DROP COLUMN "background";
  DROP TYPE "public"."enum_pages_blocks_generic_icon_cards_background";
  DROP TYPE "public"."enum__pages_v_blocks_generic_icon_cards_background";
  ALTER TABLE "pages_blocks_generic_link_cards" DROP COLUMN "background";
  ALTER TABLE "_pages_v_blocks_generic_link_cards" DROP COLUMN "background";
  DROP TYPE "public"."enum_pages_blocks_generic_link_cards_background";
  DROP TYPE "public"."enum__pages_v_blocks_generic_link_cards_background";
  ALTER TABLE "pages_blocks_generic_journey" DROP COLUMN "background";
  ALTER TABLE "_pages_v_blocks_generic_journey" DROP COLUMN "background";
  DROP TYPE "public"."enum_pages_blocks_generic_journey_background";
  DROP TYPE "public"."enum__pages_v_blocks_generic_journey_background";
  ALTER TABLE "pages_blocks_generic_photo_grid" DROP COLUMN "background";
  ALTER TABLE "_pages_v_blocks_generic_photo_grid" DROP COLUMN "background";
  DROP TYPE "public"."enum_pages_blocks_generic_photo_grid_background";
  DROP TYPE "public"."enum__pages_v_blocks_generic_photo_grid_background";`);
}

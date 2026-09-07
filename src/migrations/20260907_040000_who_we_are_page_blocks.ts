import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

/**
 * The three Who We Are page-shape blocks: genericLead, genericFeatureCard and
 * genericSplitColumns. Every block table carries its own `background` column
 * from the start — leaving it out of 20260904_140000 is what took the whole
 * admin down, because Payload selects every block table in one query and
 * Postgres rejects the lot when one column is missing.
 */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
CREATE TYPE "public"."enum_pages_blocks_generic_lead_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
CREATE TYPE "public"."enum_pages_blocks_generic_lead_size" AS ENUM('large', 'medium');
CREATE TABLE "pages_blocks_generic_lead" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"background" "enum_pages_blocks_generic_lead_background" DEFAULT 'white',
	"size" "enum_pages_blocks_generic_lead_size" DEFAULT 'large',
	"highlight" varchar,
	"body" varchar,
	"block_name" varchar
);
ALTER TABLE "pages_blocks_generic_lead" ADD CONSTRAINT "pages_blocks_generic_lead_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
CREATE INDEX "pages_blocks_generic_lead_order_idx" ON "pages_blocks_generic_lead" USING btree ("_order");
CREATE INDEX "pages_blocks_generic_lead_parent_id_idx" ON "pages_blocks_generic_lead" USING btree ("_parent_id");
CREATE INDEX "pages_blocks_generic_lead_path_idx" ON "pages_blocks_generic_lead" USING btree ("_path");
CREATE TYPE "public"."enum__pages_v_blocks_generic_lead_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
CREATE TYPE "public"."enum__pages_v_blocks_generic_lead_size" AS ENUM('large', 'medium');
CREATE TABLE "_pages_v_blocks_generic_lead" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"background" "enum__pages_v_blocks_generic_lead_background" DEFAULT 'white',
	"size" "enum__pages_v_blocks_generic_lead_size" DEFAULT 'large',
	"highlight" varchar,
	"body" varchar,
	"_uuid" varchar,
	"block_name" varchar
);
ALTER TABLE "_pages_v_blocks_generic_lead" ADD CONSTRAINT "_pages_v_blocks_generic_lead_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
CREATE INDEX "_pages_v_blocks_generic_lead_order_idx" ON "_pages_v_blocks_generic_lead" USING btree ("_order");
CREATE INDEX "_pages_v_blocks_generic_lead_parent_id_idx" ON "_pages_v_blocks_generic_lead" USING btree ("_parent_id");
CREATE INDEX "_pages_v_blocks_generic_lead_path_idx" ON "_pages_v_blocks_generic_lead" USING btree ("_path");
CREATE TYPE "public"."enum_pages_blocks_generic_feature_card_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
CREATE TYPE "public"."enum_pages_blocks_generic_feature_card_card_side" AS ENUM('right', 'left');
CREATE TABLE "pages_blocks_generic_feature_card" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"background" "enum_pages_blocks_generic_feature_card_background" DEFAULT 'white',
	"card_side" "enum_pages_blocks_generic_feature_card_card_side" DEFAULT 'right',
	"image_id" integer,
	"image_alt" varchar,
	"card_eyebrow" varchar,
	"card_eyebrow_line2" varchar,
	"card_title" varchar,
	"block_name" varchar
);
ALTER TABLE "pages_blocks_generic_feature_card" ADD CONSTRAINT "pages_blocks_generic_feature_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
CREATE INDEX "pages_blocks_generic_feature_card_order_idx" ON "pages_blocks_generic_feature_card" USING btree ("_order");
CREATE INDEX "pages_blocks_generic_feature_card_parent_id_idx" ON "pages_blocks_generic_feature_card" USING btree ("_parent_id");
CREATE INDEX "pages_blocks_generic_feature_card_path_idx" ON "pages_blocks_generic_feature_card" USING btree ("_path");
ALTER TABLE "pages_blocks_generic_feature_card" ADD CONSTRAINT "pages_blocks_generic_feature_card_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
CREATE INDEX "pages_blocks_generic_feature_card_image_idx" ON "pages_blocks_generic_feature_card" USING btree ("image_id");
CREATE TABLE "pages_blocks_generic_feature_card_paragraphs" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"body" varchar
);
ALTER TABLE "pages_blocks_generic_feature_card_paragraphs" ADD CONSTRAINT "pages_blocks_generic_feature_card_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_generic_feature_card"("id") ON DELETE cascade ON UPDATE no action;
CREATE INDEX "pages_blocks_generic_feature_card_paragraphs_order_idx" ON "pages_blocks_generic_feature_card_paragraphs" USING btree ("_order");
CREATE INDEX "pages_blocks_generic_feature_card_paragraphs_parent_id_idx" ON "pages_blocks_generic_feature_card_paragraphs" USING btree ("_parent_id");
CREATE TYPE "public"."enum__pages_v_blocks_generic_feature_card_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
CREATE TYPE "public"."enum__pages_v_blocks_generic_feature_card_card_side" AS ENUM('right', 'left');
CREATE TABLE "_pages_v_blocks_generic_feature_card" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"background" "enum__pages_v_blocks_generic_feature_card_background" DEFAULT 'white',
	"card_side" "enum__pages_v_blocks_generic_feature_card_card_side" DEFAULT 'right',
	"image_id" integer,
	"image_alt" varchar,
	"card_eyebrow" varchar,
	"card_eyebrow_line2" varchar,
	"card_title" varchar,
	"_uuid" varchar,
	"block_name" varchar
);
ALTER TABLE "_pages_v_blocks_generic_feature_card" ADD CONSTRAINT "_pages_v_blocks_generic_feature_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
CREATE INDEX "_pages_v_blocks_generic_feature_card_order_idx" ON "_pages_v_blocks_generic_feature_card" USING btree ("_order");
CREATE INDEX "_pages_v_blocks_generic_feature_card_parent_id_idx" ON "_pages_v_blocks_generic_feature_card" USING btree ("_parent_id");
CREATE INDEX "_pages_v_blocks_generic_feature_card_path_idx" ON "_pages_v_blocks_generic_feature_card" USING btree ("_path");
ALTER TABLE "_pages_v_blocks_generic_feature_card" ADD CONSTRAINT "_pages_v_blocks_generic_feature_card_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
CREATE INDEX "_pages_v_blocks_generic_feature_card_image_idx" ON "_pages_v_blocks_generic_feature_card" USING btree ("image_id");
CREATE TABLE "_pages_v_blocks_generic_feature_card_paragraphs" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"body" varchar,
	"_uuid" varchar
);
ALTER TABLE "_pages_v_blocks_generic_feature_card_paragraphs" ADD CONSTRAINT "_pages_v_blocks_generic_feature_card_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_generic_feature_card"("id") ON DELETE cascade ON UPDATE no action;
CREATE INDEX "_pages_v_blocks_generic_feature_card_paragraphs_order_idx" ON "_pages_v_blocks_generic_feature_card_paragraphs" USING btree ("_order");
CREATE INDEX "_pages_v_blocks_generic_feature_card_paragraphs_parent_id_idx" ON "_pages_v_blocks_generic_feature_card_paragraphs" USING btree ("_parent_id");
CREATE TYPE "public"."enum_pages_blocks_generic_split_columns_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
CREATE TABLE "pages_blocks_generic_split_columns" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"background" "enum_pages_blocks_generic_split_columns_background" DEFAULT 'white',
	"heading" varchar,
	"quote" varchar,
	"intro_bold" varchar,
	"block_name" varchar
);
ALTER TABLE "pages_blocks_generic_split_columns" ADD CONSTRAINT "pages_blocks_generic_split_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
CREATE INDEX "pages_blocks_generic_split_columns_order_idx" ON "pages_blocks_generic_split_columns" USING btree ("_order");
CREATE INDEX "pages_blocks_generic_split_columns_parent_id_idx" ON "pages_blocks_generic_split_columns" USING btree ("_parent_id");
CREATE INDEX "pages_blocks_generic_split_columns_path_idx" ON "pages_blocks_generic_split_columns" USING btree ("_path");
CREATE TABLE "pages_blocks_generic_split_columns_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"body" varchar
);
ALTER TABLE "pages_blocks_generic_split_columns_items" ADD CONSTRAINT "pages_blocks_generic_split_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_generic_split_columns"("id") ON DELETE cascade ON UPDATE no action;
CREATE INDEX "pages_blocks_generic_split_columns_items_order_idx" ON "pages_blocks_generic_split_columns_items" USING btree ("_order");
CREATE INDEX "pages_blocks_generic_split_columns_items_parent_id_idx" ON "pages_blocks_generic_split_columns_items" USING btree ("_parent_id");
CREATE TABLE "pages_blocks_generic_split_columns_paragraphs" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"body" varchar,
	"bold_suffix" varchar
);
ALTER TABLE "pages_blocks_generic_split_columns_paragraphs" ADD CONSTRAINT "pages_blocks_generic_split_columns_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_generic_split_columns"("id") ON DELETE cascade ON UPDATE no action;
CREATE INDEX "pages_blocks_generic_split_columns_paragraphs_order_idx" ON "pages_blocks_generic_split_columns_paragraphs" USING btree ("_order");
CREATE INDEX "pages_blocks_generic_split_columns_paragraphs_parent_id_idx" ON "pages_blocks_generic_split_columns_paragraphs" USING btree ("_parent_id");
CREATE TYPE "public"."enum__pages_v_blocks_generic_split_columns_background" AS ENUM('white', 'light', 'navy', 'blue', 'gradient-navy-blue', 'gradient-blue-accent');
CREATE TABLE "_pages_v_blocks_generic_split_columns" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"_path" text NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"background" "enum__pages_v_blocks_generic_split_columns_background" DEFAULT 'white',
	"heading" varchar,
	"quote" varchar,
	"intro_bold" varchar,
	"_uuid" varchar,
	"block_name" varchar
);
ALTER TABLE "_pages_v_blocks_generic_split_columns" ADD CONSTRAINT "_pages_v_blocks_generic_split_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
CREATE INDEX "_pages_v_blocks_generic_split_columns_order_idx" ON "_pages_v_blocks_generic_split_columns" USING btree ("_order");
CREATE INDEX "_pages_v_blocks_generic_split_columns_parent_id_idx" ON "_pages_v_blocks_generic_split_columns" USING btree ("_parent_id");
CREATE INDEX "_pages_v_blocks_generic_split_columns_path_idx" ON "_pages_v_blocks_generic_split_columns" USING btree ("_path");
CREATE TABLE "_pages_v_blocks_generic_split_columns_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"body" varchar,
	"_uuid" varchar
);
ALTER TABLE "_pages_v_blocks_generic_split_columns_items" ADD CONSTRAINT "_pages_v_blocks_generic_split_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_generic_split_columns"("id") ON DELETE cascade ON UPDATE no action;
CREATE INDEX "_pages_v_blocks_generic_split_columns_items_order_idx" ON "_pages_v_blocks_generic_split_columns_items" USING btree ("_order");
CREATE INDEX "_pages_v_blocks_generic_split_columns_items_parent_id_idx" ON "_pages_v_blocks_generic_split_columns_items" USING btree ("_parent_id");
CREATE TABLE "_pages_v_blocks_generic_split_columns_paragraphs" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"body" varchar,
	"bold_suffix" varchar,
	"_uuid" varchar
);
ALTER TABLE "_pages_v_blocks_generic_split_columns_paragraphs" ADD CONSTRAINT "_pages_v_blocks_generic_split_columns_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_generic_split_columns"("id") ON DELETE cascade ON UPDATE no action;
CREATE INDEX "_pages_v_blocks_generic_split_columns_paragraphs_order_idx" ON "_pages_v_blocks_generic_split_columns_paragraphs" USING btree ("_order");
CREATE INDEX "_pages_v_blocks_generic_split_columns_paragraphs_parent_id_idx" ON "_pages_v_blocks_generic_split_columns_paragraphs" USING btree ("_parent_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
DROP TYPE "public"."enum_pages_blocks_generic_lead_background";
DROP TYPE "public"."enum_pages_blocks_generic_lead_size";
DROP TABLE "pages_blocks_generic_lead" CASCADE;
DROP TYPE "public"."enum__pages_v_blocks_generic_lead_background";
DROP TYPE "public"."enum__pages_v_blocks_generic_lead_size";
DROP TABLE "_pages_v_blocks_generic_lead" CASCADE;
DROP TYPE "public"."enum_pages_blocks_generic_feature_card_background";
DROP TYPE "public"."enum_pages_blocks_generic_feature_card_card_side";
DROP TABLE "pages_blocks_generic_feature_card" CASCADE;
DROP TABLE "pages_blocks_generic_feature_card_paragraphs" CASCADE;
DROP TYPE "public"."enum__pages_v_blocks_generic_feature_card_background";
DROP TYPE "public"."enum__pages_v_blocks_generic_feature_card_card_side";
DROP TABLE "_pages_v_blocks_generic_feature_card" CASCADE;
DROP TABLE "_pages_v_blocks_generic_feature_card_paragraphs" CASCADE;
DROP TYPE "public"."enum_pages_blocks_generic_split_columns_background";
DROP TABLE "pages_blocks_generic_split_columns" CASCADE;
DROP TABLE "pages_blocks_generic_split_columns_items" CASCADE;
DROP TABLE "pages_blocks_generic_split_columns_paragraphs" CASCADE;
DROP TYPE "public"."enum__pages_v_blocks_generic_split_columns_background";
DROP TABLE "_pages_v_blocks_generic_split_columns" CASCADE;
DROP TABLE "_pages_v_blocks_generic_split_columns_items" CASCADE;
DROP TABLE "_pages_v_blocks_generic_split_columns_paragraphs" CASCADE;`);
}

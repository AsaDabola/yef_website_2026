import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_generic_image_text_image_side" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_generic_image_text_image_side" AS ENUM('left', 'right');
  CREATE TABLE "pages_blocks_generic_text_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_generic_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_generic_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"quote" varchar
  );
  
  CREATE TABLE "pages_blocks_generic_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_generic_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_alt" varchar,
  	"image_side" "enum_pages_blocks_generic_image_text_image_side" DEFAULT 'left',
  	"heading" varchar,
  	"body" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_generic_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar
  );
  
  CREATE TABLE "pages_blocks_generic_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_generic_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_generic_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_generic_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_generic_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_generic_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_generic_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"reference" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_generic_text_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_generic_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_generic_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"quote" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_generic_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_generic_image_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_alt" varchar,
  	"image_side" "enum__pages_v_blocks_generic_image_text_image_side" DEFAULT 'left',
  	"heading" varchar,
  	"body" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_generic_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_generic_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_generic_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_generic_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_generic_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_generic_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_generic_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_generic_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"reference" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_generic_text_paragraphs" ADD CONSTRAINT "pages_blocks_generic_text_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_generic_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_generic_text" ADD CONSTRAINT "pages_blocks_generic_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_generic_cards_cards" ADD CONSTRAINT "pages_blocks_generic_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_generic_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_generic_cards" ADD CONSTRAINT "pages_blocks_generic_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_generic_image_text" ADD CONSTRAINT "pages_blocks_generic_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_generic_image_text" ADD CONSTRAINT "pages_blocks_generic_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_generic_gallery_images" ADD CONSTRAINT "pages_blocks_generic_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_generic_gallery_images" ADD CONSTRAINT "pages_blocks_generic_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_generic_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_generic_gallery" ADD CONSTRAINT "pages_blocks_generic_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_generic_stats_stats" ADD CONSTRAINT "pages_blocks_generic_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_generic_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_generic_stats" ADD CONSTRAINT "pages_blocks_generic_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_generic_timeline_items" ADD CONSTRAINT "pages_blocks_generic_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_generic_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_generic_timeline" ADD CONSTRAINT "pages_blocks_generic_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_generic_cta" ADD CONSTRAINT "pages_blocks_generic_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_generic_quote" ADD CONSTRAINT "pages_blocks_generic_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_text_paragraphs" ADD CONSTRAINT "_pages_v_blocks_generic_text_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_generic_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_text" ADD CONSTRAINT "_pages_v_blocks_generic_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_cards_cards" ADD CONSTRAINT "_pages_v_blocks_generic_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_generic_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_cards" ADD CONSTRAINT "_pages_v_blocks_generic_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_image_text" ADD CONSTRAINT "_pages_v_blocks_generic_image_text_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_image_text" ADD CONSTRAINT "_pages_v_blocks_generic_image_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_gallery_images" ADD CONSTRAINT "_pages_v_blocks_generic_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_gallery_images" ADD CONSTRAINT "_pages_v_blocks_generic_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_generic_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_gallery" ADD CONSTRAINT "_pages_v_blocks_generic_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_stats_stats" ADD CONSTRAINT "_pages_v_blocks_generic_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_generic_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_stats" ADD CONSTRAINT "_pages_v_blocks_generic_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_timeline_items" ADD CONSTRAINT "_pages_v_blocks_generic_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_generic_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_timeline" ADD CONSTRAINT "_pages_v_blocks_generic_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_cta" ADD CONSTRAINT "_pages_v_blocks_generic_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_quote" ADD CONSTRAINT "_pages_v_blocks_generic_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_generic_text_paragraphs_order_idx" ON "pages_blocks_generic_text_paragraphs" USING btree ("_order");
  CREATE INDEX "pages_blocks_generic_text_paragraphs_parent_id_idx" ON "pages_blocks_generic_text_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_generic_text_order_idx" ON "pages_blocks_generic_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_generic_text_parent_id_idx" ON "pages_blocks_generic_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_generic_text_path_idx" ON "pages_blocks_generic_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_generic_cards_cards_order_idx" ON "pages_blocks_generic_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_generic_cards_cards_parent_id_idx" ON "pages_blocks_generic_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_generic_cards_order_idx" ON "pages_blocks_generic_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_generic_cards_parent_id_idx" ON "pages_blocks_generic_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_generic_cards_path_idx" ON "pages_blocks_generic_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_generic_image_text_order_idx" ON "pages_blocks_generic_image_text" USING btree ("_order");
  CREATE INDEX "pages_blocks_generic_image_text_parent_id_idx" ON "pages_blocks_generic_image_text" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_generic_image_text_path_idx" ON "pages_blocks_generic_image_text" USING btree ("_path");
  CREATE INDEX "pages_blocks_generic_image_text_image_idx" ON "pages_blocks_generic_image_text" USING btree ("image_id");
  CREATE INDEX "pages_blocks_generic_gallery_images_order_idx" ON "pages_blocks_generic_gallery_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_generic_gallery_images_parent_id_idx" ON "pages_blocks_generic_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_generic_gallery_images_image_idx" ON "pages_blocks_generic_gallery_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_generic_gallery_order_idx" ON "pages_blocks_generic_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_generic_gallery_parent_id_idx" ON "pages_blocks_generic_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_generic_gallery_path_idx" ON "pages_blocks_generic_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_generic_stats_stats_order_idx" ON "pages_blocks_generic_stats_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_generic_stats_stats_parent_id_idx" ON "pages_blocks_generic_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_generic_stats_order_idx" ON "pages_blocks_generic_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_generic_stats_parent_id_idx" ON "pages_blocks_generic_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_generic_stats_path_idx" ON "pages_blocks_generic_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_generic_timeline_items_order_idx" ON "pages_blocks_generic_timeline_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_generic_timeline_items_parent_id_idx" ON "pages_blocks_generic_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_generic_timeline_order_idx" ON "pages_blocks_generic_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_generic_timeline_parent_id_idx" ON "pages_blocks_generic_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_generic_timeline_path_idx" ON "pages_blocks_generic_timeline" USING btree ("_path");
  CREATE INDEX "pages_blocks_generic_cta_order_idx" ON "pages_blocks_generic_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_generic_cta_parent_id_idx" ON "pages_blocks_generic_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_generic_cta_path_idx" ON "pages_blocks_generic_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_generic_quote_order_idx" ON "pages_blocks_generic_quote" USING btree ("_order");
  CREATE INDEX "pages_blocks_generic_quote_parent_id_idx" ON "pages_blocks_generic_quote" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_generic_quote_path_idx" ON "pages_blocks_generic_quote" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_generic_text_paragraphs_order_idx" ON "_pages_v_blocks_generic_text_paragraphs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_generic_text_paragraphs_parent_id_idx" ON "_pages_v_blocks_generic_text_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_generic_text_order_idx" ON "_pages_v_blocks_generic_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_generic_text_parent_id_idx" ON "_pages_v_blocks_generic_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_generic_text_path_idx" ON "_pages_v_blocks_generic_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_generic_cards_cards_order_idx" ON "_pages_v_blocks_generic_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_generic_cards_cards_parent_id_idx" ON "_pages_v_blocks_generic_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_generic_cards_order_idx" ON "_pages_v_blocks_generic_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_generic_cards_parent_id_idx" ON "_pages_v_blocks_generic_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_generic_cards_path_idx" ON "_pages_v_blocks_generic_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_generic_image_text_order_idx" ON "_pages_v_blocks_generic_image_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_generic_image_text_parent_id_idx" ON "_pages_v_blocks_generic_image_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_generic_image_text_path_idx" ON "_pages_v_blocks_generic_image_text" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_generic_image_text_image_idx" ON "_pages_v_blocks_generic_image_text" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_generic_gallery_images_order_idx" ON "_pages_v_blocks_generic_gallery_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_generic_gallery_images_parent_id_idx" ON "_pages_v_blocks_generic_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_generic_gallery_images_image_idx" ON "_pages_v_blocks_generic_gallery_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_generic_gallery_order_idx" ON "_pages_v_blocks_generic_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_generic_gallery_parent_id_idx" ON "_pages_v_blocks_generic_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_generic_gallery_path_idx" ON "_pages_v_blocks_generic_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_generic_stats_stats_order_idx" ON "_pages_v_blocks_generic_stats_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_generic_stats_stats_parent_id_idx" ON "_pages_v_blocks_generic_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_generic_stats_order_idx" ON "_pages_v_blocks_generic_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_generic_stats_parent_id_idx" ON "_pages_v_blocks_generic_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_generic_stats_path_idx" ON "_pages_v_blocks_generic_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_generic_timeline_items_order_idx" ON "_pages_v_blocks_generic_timeline_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_generic_timeline_items_parent_id_idx" ON "_pages_v_blocks_generic_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_generic_timeline_order_idx" ON "_pages_v_blocks_generic_timeline" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_generic_timeline_parent_id_idx" ON "_pages_v_blocks_generic_timeline" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_generic_timeline_path_idx" ON "_pages_v_blocks_generic_timeline" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_generic_cta_order_idx" ON "_pages_v_blocks_generic_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_generic_cta_parent_id_idx" ON "_pages_v_blocks_generic_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_generic_cta_path_idx" ON "_pages_v_blocks_generic_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_generic_quote_order_idx" ON "_pages_v_blocks_generic_quote" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_generic_quote_parent_id_idx" ON "_pages_v_blocks_generic_quote" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_generic_quote_path_idx" ON "_pages_v_blocks_generic_quote" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_generic_text_paragraphs" CASCADE;
  DROP TABLE "pages_blocks_generic_text" CASCADE;
  DROP TABLE "pages_blocks_generic_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_generic_cards" CASCADE;
  DROP TABLE "pages_blocks_generic_image_text" CASCADE;
  DROP TABLE "pages_blocks_generic_gallery_images" CASCADE;
  DROP TABLE "pages_blocks_generic_gallery" CASCADE;
  DROP TABLE "pages_blocks_generic_stats_stats" CASCADE;
  DROP TABLE "pages_blocks_generic_stats" CASCADE;
  DROP TABLE "pages_blocks_generic_timeline_items" CASCADE;
  DROP TABLE "pages_blocks_generic_timeline" CASCADE;
  DROP TABLE "pages_blocks_generic_cta" CASCADE;
  DROP TABLE "pages_blocks_generic_quote" CASCADE;
  DROP TABLE "_pages_v_blocks_generic_text_paragraphs" CASCADE;
  DROP TABLE "_pages_v_blocks_generic_text" CASCADE;
  DROP TABLE "_pages_v_blocks_generic_cards_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_generic_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_generic_image_text" CASCADE;
  DROP TABLE "_pages_v_blocks_generic_gallery_images" CASCADE;
  DROP TABLE "_pages_v_blocks_generic_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_generic_stats_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_generic_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_generic_timeline_items" CASCADE;
  DROP TABLE "_pages_v_blocks_generic_timeline" CASCADE;
  DROP TABLE "_pages_v_blocks_generic_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_generic_quote" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_generic_image_text_image_side";
  DROP TYPE "public"."enum__pages_v_blocks_generic_image_text_image_side";`)
}

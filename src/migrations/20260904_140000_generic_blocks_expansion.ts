import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "pages_blocks_generic_image_text" ADD COLUMN "button_label2" varchar;
  ALTER TABLE "pages_blocks_generic_image_text" ADD COLUMN "button_href2" varchar;
  ALTER TABLE "_pages_v_blocks_generic_image_text" ADD COLUMN "button_label2" varchar;
  ALTER TABLE "_pages_v_blocks_generic_image_text" ADD COLUMN "button_href2" varchar;
  CREATE TABLE "pages_blocks_generic_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  CREATE TABLE "_pages_v_blocks_generic_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  ALTER TABLE "pages_blocks_generic_list" ADD CONSTRAINT "pages_blocks_generic_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_list" ADD CONSTRAINT "_pages_v_blocks_generic_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_generic_list_order_idx" ON "pages_blocks_generic_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_generic_list_parent_id_idx" ON "pages_blocks_generic_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_generic_list_path_idx" ON "pages_blocks_generic_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_generic_list_order_idx" ON "_pages_v_blocks_generic_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_generic_list_parent_id_idx" ON "_pages_v_blocks_generic_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_generic_list_path_idx" ON "_pages_v_blocks_generic_list" USING btree ("_path");
  CREATE TABLE "pages_blocks_generic_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" varchar
  );
  CREATE TABLE "_pages_v_blocks_generic_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"body" varchar,
  	"_uuid" varchar
  );
  ALTER TABLE "pages_blocks_generic_list_items" ADD CONSTRAINT "pages_blocks_generic_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_generic_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_list_items" ADD CONSTRAINT "_pages_v_blocks_generic_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_generic_list"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_generic_list_items_order_idx" ON "pages_blocks_generic_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_generic_list_items_parent_id_idx" ON "pages_blocks_generic_list_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_generic_list_items_order_idx" ON "_pages_v_blocks_generic_list_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_generic_list_items_parent_id_idx" ON "_pages_v_blocks_generic_list_items" USING btree ("_parent_id");
  CREATE TABLE "pages_blocks_generic_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"intro" varchar,
  	"image_id" integer,
  	"image_alt" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"block_name" varchar
  );
  CREATE TABLE "_pages_v_blocks_generic_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"intro" varchar,
  	"image_id" integer,
  	"image_alt" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  ALTER TABLE "pages_blocks_generic_feature" ADD CONSTRAINT "pages_blocks_generic_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_feature" ADD CONSTRAINT "_pages_v_blocks_generic_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_generic_feature" ADD CONSTRAINT "pages_blocks_generic_feature_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_feature" ADD CONSTRAINT "_pages_v_blocks_generic_feature_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_generic_feature_order_idx" ON "pages_blocks_generic_feature" USING btree ("_order");
  CREATE INDEX "pages_blocks_generic_feature_parent_id_idx" ON "pages_blocks_generic_feature" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_generic_feature_path_idx" ON "pages_blocks_generic_feature" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_generic_feature_order_idx" ON "_pages_v_blocks_generic_feature" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_generic_feature_parent_id_idx" ON "_pages_v_blocks_generic_feature" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_generic_feature_path_idx" ON "_pages_v_blocks_generic_feature" USING btree ("_path");
  CREATE INDEX "pages_blocks_generic_feature_image_idx" ON "pages_blocks_generic_feature" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_generic_feature_image_idx" ON "_pages_v_blocks_generic_feature" USING btree ("image_id");
  CREATE TABLE "pages_blocks_generic_feature_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"body" varchar
  );
  CREATE TABLE "_pages_v_blocks_generic_feature_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  ALTER TABLE "pages_blocks_generic_feature_items" ADD CONSTRAINT "pages_blocks_generic_feature_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_generic_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_feature_items" ADD CONSTRAINT "_pages_v_blocks_generic_feature_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_generic_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_generic_feature_items" ADD CONSTRAINT "pages_blocks_generic_feature_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_feature_items" ADD CONSTRAINT "_pages_v_blocks_generic_feature_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_generic_feature_items_order_idx" ON "pages_blocks_generic_feature_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_generic_feature_items_parent_id_idx" ON "pages_blocks_generic_feature_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_generic_feature_items_order_idx" ON "_pages_v_blocks_generic_feature_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_generic_feature_items_parent_id_idx" ON "_pages_v_blocks_generic_feature_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_generic_feature_items_icon_idx" ON "pages_blocks_generic_feature_items" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_generic_feature_items_icon_idx" ON "_pages_v_blocks_generic_feature_items" USING btree ("icon_id");
  CREATE TABLE "pages_blocks_generic_icon_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  CREATE TABLE "_pages_v_blocks_generic_icon_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  ALTER TABLE "pages_blocks_generic_icon_cards" ADD CONSTRAINT "pages_blocks_generic_icon_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_icon_cards" ADD CONSTRAINT "_pages_v_blocks_generic_icon_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_generic_icon_cards_order_idx" ON "pages_blocks_generic_icon_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_generic_icon_cards_parent_id_idx" ON "pages_blocks_generic_icon_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_generic_icon_cards_path_idx" ON "pages_blocks_generic_icon_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_generic_icon_cards_order_idx" ON "_pages_v_blocks_generic_icon_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_generic_icon_cards_parent_id_idx" ON "_pages_v_blocks_generic_icon_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_generic_icon_cards_path_idx" ON "_pages_v_blocks_generic_icon_cards" USING btree ("_path");
  CREATE TABLE "pages_blocks_generic_icon_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"body" varchar
  );
  CREATE TABLE "_pages_v_blocks_generic_icon_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  ALTER TABLE "pages_blocks_generic_icon_cards_cards" ADD CONSTRAINT "pages_blocks_generic_icon_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_generic_icon_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_icon_cards_cards" ADD CONSTRAINT "_pages_v_blocks_generic_icon_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_generic_icon_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_generic_icon_cards_cards" ADD CONSTRAINT "pages_blocks_generic_icon_cards_cards_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_icon_cards_cards" ADD CONSTRAINT "_pages_v_blocks_generic_icon_cards_cards_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_generic_icon_cards_cards_order_idx" ON "pages_blocks_generic_icon_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_generic_icon_cards_cards_parent_id_idx" ON "pages_blocks_generic_icon_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_generic_icon_cards_cards_order_idx" ON "_pages_v_blocks_generic_icon_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_generic_icon_cards_cards_parent_id_idx" ON "_pages_v_blocks_generic_icon_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_generic_icon_cards_cards_icon_idx" ON "pages_blocks_generic_icon_cards_cards" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_generic_icon_cards_cards_icon_idx" ON "_pages_v_blocks_generic_icon_cards_cards" USING btree ("icon_id");
  CREATE TABLE "pages_blocks_generic_link_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  CREATE TABLE "_pages_v_blocks_generic_link_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  ALTER TABLE "pages_blocks_generic_link_cards" ADD CONSTRAINT "pages_blocks_generic_link_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_link_cards" ADD CONSTRAINT "_pages_v_blocks_generic_link_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_generic_link_cards_order_idx" ON "pages_blocks_generic_link_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_generic_link_cards_parent_id_idx" ON "pages_blocks_generic_link_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_generic_link_cards_path_idx" ON "pages_blocks_generic_link_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_generic_link_cards_order_idx" ON "_pages_v_blocks_generic_link_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_generic_link_cards_parent_id_idx" ON "_pages_v_blocks_generic_link_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_generic_link_cards_path_idx" ON "_pages_v_blocks_generic_link_cards" USING btree ("_path");
  CREATE TABLE "pages_blocks_generic_link_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_alt" varchar,
  	"title" varchar,
  	"body" varchar,
  	"href" varchar
  );
  CREATE TABLE "_pages_v_blocks_generic_link_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_alt" varchar,
  	"title" varchar,
  	"body" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  ALTER TABLE "pages_blocks_generic_link_cards_cards" ADD CONSTRAINT "pages_blocks_generic_link_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_generic_link_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_link_cards_cards" ADD CONSTRAINT "_pages_v_blocks_generic_link_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_generic_link_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_generic_link_cards_cards" ADD CONSTRAINT "pages_blocks_generic_link_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_link_cards_cards" ADD CONSTRAINT "_pages_v_blocks_generic_link_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_generic_link_cards_cards_order_idx" ON "pages_blocks_generic_link_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_generic_link_cards_cards_parent_id_idx" ON "pages_blocks_generic_link_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_generic_link_cards_cards_order_idx" ON "_pages_v_blocks_generic_link_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_generic_link_cards_cards_parent_id_idx" ON "_pages_v_blocks_generic_link_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_generic_link_cards_cards_image_idx" ON "pages_blocks_generic_link_cards_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_generic_link_cards_cards_image_idx" ON "_pages_v_blocks_generic_link_cards_cards" USING btree ("image_id");
  CREATE TYPE "public"."enum_pages_blocks_generic_journey_stages_color" AS ENUM('#3D9BE9', '#0066CF', '#2F5FA8', '#5B4B8A', '#B4823C');
  CREATE TYPE "public"."enum__pages_v_blocks_generic_journey_stages_color" AS ENUM('#3D9BE9', '#0066CF', '#2F5FA8', '#5B4B8A', '#B4823C');
  CREATE TABLE "pages_blocks_generic_journey" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  CREATE TABLE "_pages_v_blocks_generic_journey" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  ALTER TABLE "pages_blocks_generic_journey" ADD CONSTRAINT "pages_blocks_generic_journey_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_journey" ADD CONSTRAINT "_pages_v_blocks_generic_journey_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_generic_journey_order_idx" ON "pages_blocks_generic_journey" USING btree ("_order");
  CREATE INDEX "pages_blocks_generic_journey_parent_id_idx" ON "pages_blocks_generic_journey" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_generic_journey_path_idx" ON "pages_blocks_generic_journey" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_generic_journey_order_idx" ON "_pages_v_blocks_generic_journey" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_generic_journey_parent_id_idx" ON "_pages_v_blocks_generic_journey" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_generic_journey_path_idx" ON "_pages_v_blocks_generic_journey" USING btree ("_path");
  CREATE TABLE "pages_blocks_generic_journey_stages" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"color" "enum_pages_blocks_generic_journey_stages_color" DEFAULT '#3D9BE9',
  	"title" varchar,
  	"body" varchar,
  	"href" varchar
  );
  CREATE TABLE "_pages_v_blocks_generic_journey_stages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"color" "enum__pages_v_blocks_generic_journey_stages_color" DEFAULT '#3D9BE9',
  	"title" varchar,
  	"body" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  ALTER TABLE "pages_blocks_generic_journey_stages" ADD CONSTRAINT "pages_blocks_generic_journey_stages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_generic_journey"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_journey_stages" ADD CONSTRAINT "_pages_v_blocks_generic_journey_stages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_generic_journey"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_generic_journey_stages_order_idx" ON "pages_blocks_generic_journey_stages" USING btree ("_order");
  CREATE INDEX "pages_blocks_generic_journey_stages_parent_id_idx" ON "pages_blocks_generic_journey_stages" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_generic_journey_stages_order_idx" ON "_pages_v_blocks_generic_journey_stages" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_generic_journey_stages_parent_id_idx" ON "_pages_v_blocks_generic_journey_stages" USING btree ("_parent_id");
  CREATE TABLE "pages_blocks_generic_photo_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  CREATE TABLE "_pages_v_blocks_generic_photo_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  ALTER TABLE "pages_blocks_generic_photo_grid" ADD CONSTRAINT "pages_blocks_generic_photo_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_photo_grid" ADD CONSTRAINT "_pages_v_blocks_generic_photo_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_generic_photo_grid_order_idx" ON "pages_blocks_generic_photo_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_generic_photo_grid_parent_id_idx" ON "pages_blocks_generic_photo_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_generic_photo_grid_path_idx" ON "pages_blocks_generic_photo_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_generic_photo_grid_order_idx" ON "_pages_v_blocks_generic_photo_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_generic_photo_grid_parent_id_idx" ON "_pages_v_blocks_generic_photo_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_generic_photo_grid_path_idx" ON "_pages_v_blocks_generic_photo_grid" USING btree ("_path");
  CREATE TABLE "pages_blocks_generic_photo_grid_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"name" varchar,
  	"title" varchar
  );
  CREATE TABLE "_pages_v_blocks_generic_photo_grid_people" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"name" varchar,
  	"title" varchar,
  	"_uuid" varchar
  );
  ALTER TABLE "pages_blocks_generic_photo_grid_people" ADD CONSTRAINT "pages_blocks_generic_photo_grid_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_generic_photo_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_photo_grid_people" ADD CONSTRAINT "_pages_v_blocks_generic_photo_grid_people_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_generic_photo_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_generic_photo_grid_people" ADD CONSTRAINT "pages_blocks_generic_photo_grid_people_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_generic_photo_grid_people" ADD CONSTRAINT "_pages_v_blocks_generic_photo_grid_people_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_generic_photo_grid_people_order_idx" ON "pages_blocks_generic_photo_grid_people" USING btree ("_order");
  CREATE INDEX "pages_blocks_generic_photo_grid_people_parent_id_idx" ON "pages_blocks_generic_photo_grid_people" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_generic_photo_grid_people_order_idx" ON "_pages_v_blocks_generic_photo_grid_people" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_generic_photo_grid_people_parent_id_idx" ON "_pages_v_blocks_generic_photo_grid_people" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_generic_photo_grid_people_image_idx" ON "pages_blocks_generic_photo_grid_people" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_generic_photo_grid_people_image_idx" ON "_pages_v_blocks_generic_photo_grid_people" USING btree ("image_id");`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  DROP TABLE "_pages_v_blocks_generic_photo_grid_people" CASCADE;
  DROP TABLE "pages_blocks_generic_photo_grid_people" CASCADE;
  DROP TABLE "_pages_v_blocks_generic_photo_grid" CASCADE;
  DROP TABLE "pages_blocks_generic_photo_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_generic_journey_stages" CASCADE;
  DROP TABLE "pages_blocks_generic_journey_stages" CASCADE;
  DROP TABLE "_pages_v_blocks_generic_journey" CASCADE;
  DROP TABLE "pages_blocks_generic_journey" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_generic_journey_stages_color";
  DROP TYPE "public"."enum__pages_v_blocks_generic_journey_stages_color";
  DROP TABLE "_pages_v_blocks_generic_link_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_generic_link_cards_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_generic_link_cards" CASCADE;
  DROP TABLE "pages_blocks_generic_link_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_generic_icon_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_generic_icon_cards_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_generic_icon_cards" CASCADE;
  DROP TABLE "pages_blocks_generic_icon_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_generic_feature_items" CASCADE;
  DROP TABLE "pages_blocks_generic_feature_items" CASCADE;
  DROP TABLE "_pages_v_blocks_generic_feature" CASCADE;
  DROP TABLE "pages_blocks_generic_feature" CASCADE;
  DROP TABLE "_pages_v_blocks_generic_list_items" CASCADE;
  DROP TABLE "pages_blocks_generic_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_generic_list" CASCADE;
  DROP TABLE "pages_blocks_generic_list" CASCADE;
  ALTER TABLE "pages_blocks_generic_image_text" DROP COLUMN "button_label2";
  ALTER TABLE "pages_blocks_generic_image_text" DROP COLUMN "button_href2";
  ALTER TABLE "_pages_v_blocks_generic_image_text" DROP COLUMN "button_label2";
  ALTER TABLE "_pages_v_blocks_generic_image_text" DROP COLUMN "button_href2";`);
}

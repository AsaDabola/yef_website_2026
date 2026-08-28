import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_route" ADD VALUE 'who-we-are';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'who-we-are';
  CREATE TABLE "pages_blocks_who_we_are_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"heading" varchar,
  	"body" varchar,
  	"mission_body" varchar,
  	"portrait_id" integer,
  	"quote" varchar,
  	"signature" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_intro_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"eyebrow" varchar,
  	"title" varchar,
  	"cta" varchar
  );
  
  CREATE TABLE "pages_blocks_intro_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_vision_mission_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_vision_mission" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stories_news" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_mission_school_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_who_we_are_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"heading" varchar,
  	"body" varchar,
  	"mission_body" varchar,
  	"portrait_id" integer,
  	"quote" varchar,
  	"signature" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_intro_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"eyebrow" varchar,
  	"title" varchar,
  	"cta" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_intro_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_vision_mission_pillars" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_vision_mission" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stories_news" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_mission_school_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_who_we_are_hero" ADD CONSTRAINT "pages_blocks_who_we_are_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_who_we_are_hero" ADD CONSTRAINT "pages_blocks_who_we_are_hero_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_who_we_are_hero" ADD CONSTRAINT "pages_blocks_who_we_are_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_intro_cards_cards" ADD CONSTRAINT "pages_blocks_intro_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_intro_cards_cards" ADD CONSTRAINT "pages_blocks_intro_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_intro_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_intro_cards" ADD CONSTRAINT "pages_blocks_intro_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vision_mission_pillars" ADD CONSTRAINT "pages_blocks_vision_mission_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_vision_mission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vision_mission" ADD CONSTRAINT "pages_blocks_vision_mission_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_vision_mission" ADD CONSTRAINT "pages_blocks_vision_mission_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stories_news" ADD CONSTRAINT "pages_blocks_stories_news_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_mission_school_cta" ADD CONSTRAINT "pages_blocks_mission_school_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_who_we_are_hero" ADD CONSTRAINT "_pages_v_blocks_who_we_are_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_who_we_are_hero" ADD CONSTRAINT "_pages_v_blocks_who_we_are_hero_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_who_we_are_hero" ADD CONSTRAINT "_pages_v_blocks_who_we_are_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_intro_cards_cards" ADD CONSTRAINT "_pages_v_blocks_intro_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_intro_cards_cards" ADD CONSTRAINT "_pages_v_blocks_intro_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_intro_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_intro_cards" ADD CONSTRAINT "_pages_v_blocks_intro_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_vision_mission_pillars" ADD CONSTRAINT "_pages_v_blocks_vision_mission_pillars_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_vision_mission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_vision_mission" ADD CONSTRAINT "_pages_v_blocks_vision_mission_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_vision_mission" ADD CONSTRAINT "_pages_v_blocks_vision_mission_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stories_news" ADD CONSTRAINT "_pages_v_blocks_stories_news_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_mission_school_cta" ADD CONSTRAINT "_pages_v_blocks_mission_school_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_who_we_are_hero_order_idx" ON "pages_blocks_who_we_are_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_who_we_are_hero_parent_id_idx" ON "pages_blocks_who_we_are_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_who_we_are_hero_path_idx" ON "pages_blocks_who_we_are_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_who_we_are_hero_image_idx" ON "pages_blocks_who_we_are_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_who_we_are_hero_portrait_idx" ON "pages_blocks_who_we_are_hero" USING btree ("portrait_id");
  CREATE INDEX "pages_blocks_intro_cards_cards_order_idx" ON "pages_blocks_intro_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_intro_cards_cards_parent_id_idx" ON "pages_blocks_intro_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_intro_cards_cards_image_idx" ON "pages_blocks_intro_cards_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_intro_cards_order_idx" ON "pages_blocks_intro_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_intro_cards_parent_id_idx" ON "pages_blocks_intro_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_intro_cards_path_idx" ON "pages_blocks_intro_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_vision_mission_pillars_order_idx" ON "pages_blocks_vision_mission_pillars" USING btree ("_order");
  CREATE INDEX "pages_blocks_vision_mission_pillars_parent_id_idx" ON "pages_blocks_vision_mission_pillars" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_vision_mission_order_idx" ON "pages_blocks_vision_mission" USING btree ("_order");
  CREATE INDEX "pages_blocks_vision_mission_parent_id_idx" ON "pages_blocks_vision_mission" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_vision_mission_path_idx" ON "pages_blocks_vision_mission" USING btree ("_path");
  CREATE INDEX "pages_blocks_vision_mission_image_idx" ON "pages_blocks_vision_mission" USING btree ("image_id");
  CREATE INDEX "pages_blocks_stories_news_order_idx" ON "pages_blocks_stories_news" USING btree ("_order");
  CREATE INDEX "pages_blocks_stories_news_parent_id_idx" ON "pages_blocks_stories_news" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stories_news_path_idx" ON "pages_blocks_stories_news" USING btree ("_path");
  CREATE INDEX "pages_blocks_mission_school_cta_order_idx" ON "pages_blocks_mission_school_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_mission_school_cta_parent_id_idx" ON "pages_blocks_mission_school_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_mission_school_cta_path_idx" ON "pages_blocks_mission_school_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_who_we_are_hero_order_idx" ON "_pages_v_blocks_who_we_are_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_who_we_are_hero_parent_id_idx" ON "_pages_v_blocks_who_we_are_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_who_we_are_hero_path_idx" ON "_pages_v_blocks_who_we_are_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_who_we_are_hero_image_idx" ON "_pages_v_blocks_who_we_are_hero" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_who_we_are_hero_portrait_idx" ON "_pages_v_blocks_who_we_are_hero" USING btree ("portrait_id");
  CREATE INDEX "_pages_v_blocks_intro_cards_cards_order_idx" ON "_pages_v_blocks_intro_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_intro_cards_cards_parent_id_idx" ON "_pages_v_blocks_intro_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_intro_cards_cards_image_idx" ON "_pages_v_blocks_intro_cards_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_intro_cards_order_idx" ON "_pages_v_blocks_intro_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_intro_cards_parent_id_idx" ON "_pages_v_blocks_intro_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_intro_cards_path_idx" ON "_pages_v_blocks_intro_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_vision_mission_pillars_order_idx" ON "_pages_v_blocks_vision_mission_pillars" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_vision_mission_pillars_parent_id_idx" ON "_pages_v_blocks_vision_mission_pillars" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_vision_mission_order_idx" ON "_pages_v_blocks_vision_mission" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_vision_mission_parent_id_idx" ON "_pages_v_blocks_vision_mission" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_vision_mission_path_idx" ON "_pages_v_blocks_vision_mission" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_vision_mission_image_idx" ON "_pages_v_blocks_vision_mission" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_stories_news_order_idx" ON "_pages_v_blocks_stories_news" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stories_news_parent_id_idx" ON "_pages_v_blocks_stories_news" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stories_news_path_idx" ON "_pages_v_blocks_stories_news" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_mission_school_cta_order_idx" ON "_pages_v_blocks_mission_school_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_mission_school_cta_parent_id_idx" ON "_pages_v_blocks_mission_school_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_mission_school_cta_path_idx" ON "_pages_v_blocks_mission_school_cta" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_who_we_are_hero" CASCADE;
  DROP TABLE "pages_blocks_intro_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_intro_cards" CASCADE;
  DROP TABLE "pages_blocks_vision_mission_pillars" CASCADE;
  DROP TABLE "pages_blocks_vision_mission" CASCADE;
  DROP TABLE "pages_blocks_stories_news" CASCADE;
  DROP TABLE "pages_blocks_mission_school_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_who_we_are_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_intro_cards_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_intro_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_vision_mission_pillars" CASCADE;
  DROP TABLE "_pages_v_blocks_vision_mission" CASCADE;
  DROP TABLE "_pages_v_blocks_stories_news" CASCADE;
  DROP TABLE "_pages_v_blocks_mission_school_cta" CASCADE;
  ALTER TABLE "pages" ALTER COLUMN "route" SET DATA TYPE text;
  ALTER TABLE "pages" ALTER COLUMN "route" SET DEFAULT 'home'::text;
  DROP TYPE "public"."enum_pages_route";
  CREATE TYPE "public"."enum_pages_route" AS ENUM('home');
  ALTER TABLE "pages" ALTER COLUMN "route" SET DEFAULT 'home'::"public"."enum_pages_route";
  ALTER TABLE "pages" ALTER COLUMN "route" SET DATA TYPE "public"."enum_pages_route" USING "route"::"public"."enum_pages_route";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_route" SET DATA TYPE text;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_route" SET DEFAULT 'home'::text;
  DROP TYPE "public"."enum__pages_v_version_route";
  CREATE TYPE "public"."enum__pages_v_version_route" AS ENUM('home');
  ALTER TABLE "_pages_v" ALTER COLUMN "version_route" SET DEFAULT 'home'::"public"."enum__pages_v_version_route";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_route" SET DATA TYPE "public"."enum__pages_v_version_route" USING "version_route"::"public"."enum__pages_v_version_route";`)
}

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_route" AS ENUM('home');
  CREATE TYPE "public"."enum_pages_country" AS ENUM('int', 'ao', 'ar', 'au', 'at', 'bd', 'be', 'br', 'cm', 'ca', 'cl', 'co', 'ci', 'cz', 'cd', 'do', 'ke', 'eg', 'et', 'fj', 'fr', 'de', 'gh', 'gr', 'gt', 'ht', 'hn', 'hu', 'in', 'id', 'il', 'it', 'jp', 'kz', 'mg', 'my', 'mx', 'mn', 'mz', 'mm', 'np', 'nl', 'nz', 'ng', 'pk', 'pe', 'ph', 'pl', 'pt', 'ro', 'ru', 'rw', 'sg', 'sk', 'za', 'kr', 'es', 'lk', 'se', 'ch', 'tw', 'th', 'tr', 'ua', 'ae', 'gb', 'us', 'vn', 'zm');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_route" AS ENUM('home');
  CREATE TYPE "public"."enum__pages_v_version_country" AS ENUM('int', 'ao', 'ar', 'au', 'at', 'bd', 'be', 'br', 'cm', 'ca', 'cl', 'co', 'ci', 'cz', 'cd', 'do', 'ke', 'eg', 'et', 'fj', 'fr', 'de', 'gh', 'gr', 'gt', 'ht', 'hn', 'hu', 'in', 'id', 'il', 'it', 'jp', 'kz', 'mg', 'my', 'mx', 'mn', 'mz', 'mm', 'np', 'nl', 'nz', 'ng', 'pk', 'pe', 'ph', 'pl', 'pt', 'ro', 'ru', 'rw', 'sg', 'sk', 'za', 'kr', 'es', 'lk', 'se', 'ch', 'tw', 'th', 'tr', 'ua', 'ae', 'gb', 'us', 'vn', 'zm');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_distribute_to" AS ENUM('int', 'ao', 'ar', 'au', 'at', 'bd', 'be', 'br', 'cm', 'ca', 'cl', 'co', 'ci', 'cz', 'cd', 'do', 'ke', 'eg', 'et', 'fj', 'fr', 'de', 'gh', 'gr', 'gt', 'ht', 'hn', 'hu', 'in', 'id', 'il', 'it', 'jp', 'kz', 'mg', 'my', 'mx', 'mn', 'mz', 'mm', 'np', 'nl', 'nz', 'ng', 'pk', 'pe', 'ph', 'pl', 'pt', 'ro', 'ru', 'rw', 'sg', 'sk', 'za', 'kr', 'es', 'lk', 'se', 'ch', 'tw', 'th', 'tr', 'ua', 'ae', 'gb', 'us', 'vn', 'zm');
  CREATE TYPE "public"."enum_posts_country" AS ENUM('int', 'ao', 'ar', 'au', 'at', 'bd', 'be', 'br', 'cm', 'ca', 'cl', 'co', 'ci', 'cz', 'cd', 'do', 'ke', 'eg', 'et', 'fj', 'fr', 'de', 'gh', 'gr', 'gt', 'ht', 'hn', 'hu', 'in', 'id', 'il', 'it', 'jp', 'kz', 'mg', 'my', 'mx', 'mn', 'mz', 'mm', 'np', 'nl', 'nz', 'ng', 'pk', 'pe', 'ph', 'pl', 'pt', 'ro', 'ru', 'rw', 'sg', 'sk', 'za', 'kr', 'es', 'lk', 'se', 'ch', 'tw', 'th', 'tr', 'ua', 'ae', 'gb', 'us', 'vn', 'zm');
  CREATE TYPE "public"."enum_posts_audience" AS ENUM('own', 'some', 'all');
  CREATE TYPE "public"."enum__posts_v_version_distribute_to" AS ENUM('int', 'ao', 'ar', 'au', 'at', 'bd', 'be', 'br', 'cm', 'ca', 'cl', 'co', 'ci', 'cz', 'cd', 'do', 'ke', 'eg', 'et', 'fj', 'fr', 'de', 'gh', 'gr', 'gt', 'ht', 'hn', 'hu', 'in', 'id', 'il', 'it', 'jp', 'kz', 'mg', 'my', 'mx', 'mn', 'mz', 'mm', 'np', 'nl', 'nz', 'ng', 'pk', 'pe', 'ph', 'pl', 'pt', 'ro', 'ru', 'rw', 'sg', 'sk', 'za', 'kr', 'es', 'lk', 'se', 'ch', 'tw', 'th', 'tr', 'ua', 'ae', 'gb', 'us', 'vn', 'zm');
  CREATE TYPE "public"."enum__posts_v_version_country" AS ENUM('int', 'ao', 'ar', 'au', 'at', 'bd', 'be', 'br', 'cm', 'ca', 'cl', 'co', 'ci', 'cz', 'cd', 'do', 'ke', 'eg', 'et', 'fj', 'fr', 'de', 'gh', 'gr', 'gt', 'ht', 'hn', 'hu', 'in', 'id', 'il', 'it', 'jp', 'kz', 'mg', 'my', 'mx', 'mn', 'mz', 'mm', 'np', 'nl', 'nz', 'ng', 'pk', 'pe', 'ph', 'pl', 'pt', 'ro', 'ru', 'rw', 'sg', 'sk', 'za', 'kr', 'es', 'lk', 'se', 'ch', 'tw', 'th', 'tr', 'ua', 'ae', 'gb', 'us', 'vn', 'zm');
  CREATE TYPE "public"."enum__posts_v_version_audience" AS ENUM('own', 'some', 'all');
  CREATE TYPE "public"."enum_media_country" AS ENUM('int', 'ao', 'ar', 'au', 'at', 'bd', 'be', 'br', 'cm', 'ca', 'cl', 'co', 'ci', 'cz', 'cd', 'do', 'ke', 'eg', 'et', 'fj', 'fr', 'de', 'gh', 'gr', 'gt', 'ht', 'hn', 'hu', 'in', 'id', 'il', 'it', 'jp', 'kz', 'mg', 'my', 'mx', 'mn', 'mz', 'mm', 'np', 'nl', 'nz', 'ng', 'pk', 'pe', 'ph', 'pl', 'pt', 'ro', 'ru', 'rw', 'sg', 'sk', 'za', 'kr', 'es', 'lk', 'se', 'ch', 'tw', 'th', 'tr', 'ua', 'ae', 'gb', 'us', 'vn', 'zm');
  CREATE TYPE "public"."enum_users_regions" AS ENUM('South America', 'North America', 'Europe', 'South Asia', 'Southeast Asia', 'Asia-Pacific', 'Africa', 'Oceania', 'Central America & Caribbean', 'Commonwealth of Independent States', 'Middle East & North Africa');
  CREATE TYPE "public"."enum_users_countries" AS ENUM('int', 'ao', 'ar', 'au', 'at', 'bd', 'be', 'br', 'cm', 'ca', 'cl', 'co', 'ci', 'cz', 'cd', 'do', 'ke', 'eg', 'et', 'fj', 'fr', 'de', 'gh', 'gr', 'gt', 'ht', 'hn', 'hu', 'in', 'id', 'il', 'it', 'jp', 'kz', 'mg', 'my', 'mx', 'mn', 'mz', 'mm', 'np', 'nl', 'nz', 'ng', 'pk', 'pe', 'ph', 'pl', 'pt', 'ro', 'ru', 'rw', 'sg', 'sk', 'za', 'kr', 'es', 'lk', 'se', 'ch', 'tw', 'th', 'tr', 'ua', 'ae', 'gb', 'us', 'vn', 'zm');
  CREATE TYPE "public"."enum_users_sections" AS ENUM('home', 'who-we-are', 'get-involved', 'news', 'network', 'resources', 'donate', 'media');
  CREATE TYPE "public"."enum_users_role" AS ENUM('super', 'region-admin', 'country-admin', 'editor');
  CREATE TABLE "pages_blocks_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"heading" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_about_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"lead" varchar,
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_mission_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_mission" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"verse" varchar,
  	"verse_accent" varchar,
  	"reference" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_proof_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"name" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_proof" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_signup" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"button_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_campus_finder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_get_involved" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_giving" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_movement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"route" "enum_pages_route" DEFAULT 'home',
  	"country" "enum_pages_country",
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v_blocks_hero_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"heading" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"lead" varchar,
  	"body" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_mission_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_mission" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"verse" varchar,
  	"verse_accent" varchar,
  	"reference" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_proof_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"name" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_proof" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_signup" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"button_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_campus_finder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_get_involved" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_giving" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_movement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_route" "enum__pages_v_version_route" DEFAULT 'home',
  	"version_country" "enum__pages_v_version_country",
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "posts_distribute_to" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_posts_distribute_to",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_posts_v_version_distribute_to" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__posts_v_version_distribute_to",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_regions" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_regions",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_countries" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_countries",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_sections" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_sections",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  ALTER TABLE "posts" ADD COLUMN "country" "enum_posts_country";
  ALTER TABLE "posts" ADD COLUMN "audience" "enum_posts_audience" DEFAULT 'own';
  ALTER TABLE "_posts_v" ADD COLUMN "version_country" "enum__posts_v_version_country";
  ALTER TABLE "_posts_v" ADD COLUMN "version_audience" "enum__posts_v_version_audience" DEFAULT 'own';
  ALTER TABLE "media" ADD COLUMN "country" "enum_media_country" NOT NULL;
  ALTER TABLE "users" ADD COLUMN "role" "enum_users_role" DEFAULT 'editor' NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "pages_blocks_hero_slides" ADD CONSTRAINT "pages_blocks_hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_slides" ADD CONSTRAINT "pages_blocks_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_stats" ADD CONSTRAINT "pages_blocks_about_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_about" ADD CONSTRAINT "pages_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_mission_columns" ADD CONSTRAINT "pages_blocks_mission_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_mission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_mission" ADD CONSTRAINT "pages_blocks_mission_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_proof_items" ADD CONSTRAINT "pages_blocks_proof_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_proof"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_proof" ADD CONSTRAINT "pages_blocks_proof_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_signup" ADD CONSTRAINT "pages_blocks_signup_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_campus_finder" ADD CONSTRAINT "pages_blocks_campus_finder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_get_involved" ADD CONSTRAINT "pages_blocks_get_involved_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_giving" ADD CONSTRAINT "pages_blocks_giving_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_movement" ADD CONSTRAINT "pages_blocks_movement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_slides" ADD CONSTRAINT "_pages_v_blocks_hero_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_slides" ADD CONSTRAINT "_pages_v_blocks_hero_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_stats" ADD CONSTRAINT "_pages_v_blocks_about_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about" ADD CONSTRAINT "_pages_v_blocks_about_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about" ADD CONSTRAINT "_pages_v_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_mission_columns" ADD CONSTRAINT "_pages_v_blocks_mission_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_mission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_mission" ADD CONSTRAINT "_pages_v_blocks_mission_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_proof_items" ADD CONSTRAINT "_pages_v_blocks_proof_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_proof"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_proof" ADD CONSTRAINT "_pages_v_blocks_proof_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_signup" ADD CONSTRAINT "_pages_v_blocks_signup_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_campus_finder" ADD CONSTRAINT "_pages_v_blocks_campus_finder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_get_involved" ADD CONSTRAINT "_pages_v_blocks_get_involved_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_giving" ADD CONSTRAINT "_pages_v_blocks_giving_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_movement" ADD CONSTRAINT "_pages_v_blocks_movement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_distribute_to" ADD CONSTRAINT "posts_distribute_to_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_distribute_to" ADD CONSTRAINT "_posts_v_version_distribute_to_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_regions" ADD CONSTRAINT "users_regions_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_countries" ADD CONSTRAINT "users_countries_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sections" ADD CONSTRAINT "users_sections_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_slides_order_idx" ON "pages_blocks_hero_slides" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_slides_parent_id_idx" ON "pages_blocks_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_slides_image_idx" ON "pages_blocks_hero_slides" USING btree ("image_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_stats_order_idx" ON "pages_blocks_about_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_stats_parent_id_idx" ON "pages_blocks_about_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_order_idx" ON "pages_blocks_about" USING btree ("_order");
  CREATE INDEX "pages_blocks_about_parent_id_idx" ON "pages_blocks_about" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_about_path_idx" ON "pages_blocks_about" USING btree ("_path");
  CREATE INDEX "pages_blocks_about_image_idx" ON "pages_blocks_about" USING btree ("image_id");
  CREATE INDEX "pages_blocks_mission_columns_order_idx" ON "pages_blocks_mission_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_mission_columns_parent_id_idx" ON "pages_blocks_mission_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_mission_order_idx" ON "pages_blocks_mission" USING btree ("_order");
  CREATE INDEX "pages_blocks_mission_parent_id_idx" ON "pages_blocks_mission" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_mission_path_idx" ON "pages_blocks_mission" USING btree ("_path");
  CREATE INDEX "pages_blocks_proof_items_order_idx" ON "pages_blocks_proof_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_proof_items_parent_id_idx" ON "pages_blocks_proof_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_proof_order_idx" ON "pages_blocks_proof" USING btree ("_order");
  CREATE INDEX "pages_blocks_proof_parent_id_idx" ON "pages_blocks_proof" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_proof_path_idx" ON "pages_blocks_proof" USING btree ("_path");
  CREATE INDEX "pages_blocks_signup_order_idx" ON "pages_blocks_signup" USING btree ("_order");
  CREATE INDEX "pages_blocks_signup_parent_id_idx" ON "pages_blocks_signup" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_signup_path_idx" ON "pages_blocks_signup" USING btree ("_path");
  CREATE INDEX "pages_blocks_campus_finder_order_idx" ON "pages_blocks_campus_finder" USING btree ("_order");
  CREATE INDEX "pages_blocks_campus_finder_parent_id_idx" ON "pages_blocks_campus_finder" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_campus_finder_path_idx" ON "pages_blocks_campus_finder" USING btree ("_path");
  CREATE INDEX "pages_blocks_get_involved_order_idx" ON "pages_blocks_get_involved" USING btree ("_order");
  CREATE INDEX "pages_blocks_get_involved_parent_id_idx" ON "pages_blocks_get_involved" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_get_involved_path_idx" ON "pages_blocks_get_involved" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_giving_order_idx" ON "pages_blocks_giving" USING btree ("_order");
  CREATE INDEX "pages_blocks_giving_parent_id_idx" ON "pages_blocks_giving" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_giving_path_idx" ON "pages_blocks_giving" USING btree ("_path");
  CREATE INDEX "pages_blocks_movement_order_idx" ON "pages_blocks_movement" USING btree ("_order");
  CREATE INDEX "pages_blocks_movement_parent_id_idx" ON "pages_blocks_movement" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_movement_path_idx" ON "pages_blocks_movement" USING btree ("_path");
  CREATE INDEX "pages_route_idx" ON "pages" USING btree ("route");
  CREATE INDEX "pages_country_idx" ON "pages" USING btree ("country");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_blocks_hero_slides_order_idx" ON "_pages_v_blocks_hero_slides" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_slides_parent_id_idx" ON "_pages_v_blocks_hero_slides" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_slides_image_idx" ON "_pages_v_blocks_hero_slides" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_stats_order_idx" ON "_pages_v_blocks_about_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_stats_parent_id_idx" ON "_pages_v_blocks_about_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_order_idx" ON "_pages_v_blocks_about" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_about_parent_id_idx" ON "_pages_v_blocks_about" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_about_path_idx" ON "_pages_v_blocks_about" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_about_image_idx" ON "_pages_v_blocks_about" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_mission_columns_order_idx" ON "_pages_v_blocks_mission_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_mission_columns_parent_id_idx" ON "_pages_v_blocks_mission_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_mission_order_idx" ON "_pages_v_blocks_mission" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_mission_parent_id_idx" ON "_pages_v_blocks_mission" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_mission_path_idx" ON "_pages_v_blocks_mission" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_proof_items_order_idx" ON "_pages_v_blocks_proof_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_proof_items_parent_id_idx" ON "_pages_v_blocks_proof_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_proof_order_idx" ON "_pages_v_blocks_proof" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_proof_parent_id_idx" ON "_pages_v_blocks_proof" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_proof_path_idx" ON "_pages_v_blocks_proof" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_signup_order_idx" ON "_pages_v_blocks_signup" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_signup_parent_id_idx" ON "_pages_v_blocks_signup" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_signup_path_idx" ON "_pages_v_blocks_signup" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_campus_finder_order_idx" ON "_pages_v_blocks_campus_finder" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_campus_finder_parent_id_idx" ON "_pages_v_blocks_campus_finder" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_campus_finder_path_idx" ON "_pages_v_blocks_campus_finder" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_get_involved_order_idx" ON "_pages_v_blocks_get_involved" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_get_involved_parent_id_idx" ON "_pages_v_blocks_get_involved" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_get_involved_path_idx" ON "_pages_v_blocks_get_involved" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_giving_order_idx" ON "_pages_v_blocks_giving" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_giving_parent_id_idx" ON "_pages_v_blocks_giving" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_giving_path_idx" ON "_pages_v_blocks_giving" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_movement_order_idx" ON "_pages_v_blocks_movement" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_movement_parent_id_idx" ON "_pages_v_blocks_movement" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_movement_path_idx" ON "_pages_v_blocks_movement" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_route_idx" ON "_pages_v" USING btree ("version_route");
  CREATE INDEX "_pages_v_version_version_country_idx" ON "_pages_v" USING btree ("version_country");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "posts_distribute_to_order_idx" ON "posts_distribute_to" USING btree ("order");
  CREATE INDEX "posts_distribute_to_parent_idx" ON "posts_distribute_to" USING btree ("parent_id");
  CREATE INDEX "posts_distribute_to_value_idx" ON "posts_distribute_to" USING btree ("value");
  CREATE INDEX "_posts_v_version_distribute_to_order_idx" ON "_posts_v_version_distribute_to" USING btree ("order");
  CREATE INDEX "_posts_v_version_distribute_to_parent_idx" ON "_posts_v_version_distribute_to" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_distribute_to_value_idx" ON "_posts_v_version_distribute_to" USING btree ("value");
  CREATE INDEX "users_regions_order_idx" ON "users_regions" USING btree ("order");
  CREATE INDEX "users_regions_parent_idx" ON "users_regions" USING btree ("parent_id");
  CREATE INDEX "users_countries_order_idx" ON "users_countries" USING btree ("order");
  CREATE INDEX "users_countries_parent_idx" ON "users_countries" USING btree ("parent_id");
  CREATE INDEX "users_sections_order_idx" ON "users_sections" USING btree ("order");
  CREATE INDEX "users_sections_parent_idx" ON "users_sections" USING btree ("parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_country_idx" ON "posts" USING btree ("country");
  CREATE INDEX "_posts_v_version_version_country_idx" ON "_posts_v" USING btree ("version_country");
  CREATE INDEX "media_country_idx" ON "media" USING btree ("country");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_mission_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_mission" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_proof_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_proof" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_signup" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_campus_finder" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_get_involved" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_giving" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_movement" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_about_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_about" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_mission_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_mission" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_proof_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_proof" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_signup" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_campus_finder" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_get_involved" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_giving" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_movement" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_distribute_to" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_distribute_to" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "users_regions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "users_countries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "users_sections" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_slides" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_about_stats" CASCADE;
  DROP TABLE "pages_blocks_about" CASCADE;
  DROP TABLE "pages_blocks_mission_columns" CASCADE;
  DROP TABLE "pages_blocks_mission" CASCADE;
  DROP TABLE "pages_blocks_proof_items" CASCADE;
  DROP TABLE "pages_blocks_proof" CASCADE;
  DROP TABLE "pages_blocks_signup" CASCADE;
  DROP TABLE "pages_blocks_campus_finder" CASCADE;
  DROP TABLE "pages_blocks_get_involved" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_giving" CASCADE;
  DROP TABLE "pages_blocks_movement" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_slides" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_about_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_about" CASCADE;
  DROP TABLE "_pages_v_blocks_mission_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_mission" CASCADE;
  DROP TABLE "_pages_v_blocks_proof_items" CASCADE;
  DROP TABLE "_pages_v_blocks_proof" CASCADE;
  DROP TABLE "_pages_v_blocks_signup" CASCADE;
  DROP TABLE "_pages_v_blocks_campus_finder" CASCADE;
  DROP TABLE "_pages_v_blocks_get_involved" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_giving" CASCADE;
  DROP TABLE "_pages_v_blocks_movement" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "posts_distribute_to" CASCADE;
  DROP TABLE "_posts_v_version_distribute_to" CASCADE;
  DROP TABLE "users_regions" CASCADE;
  DROP TABLE "users_countries" CASCADE;
  DROP TABLE "users_sections" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  DROP INDEX "posts_country_idx";
  DROP INDEX "_posts_v_version_version_country_idx";
  DROP INDEX "media_country_idx";
  DROP INDEX "payload_locked_documents_rels_pages_id_idx";
  ALTER TABLE "posts" DROP COLUMN "country";
  ALTER TABLE "posts" DROP COLUMN "audience";
  ALTER TABLE "_posts_v" DROP COLUMN "version_country";
  ALTER TABLE "_posts_v" DROP COLUMN "version_audience";
  ALTER TABLE "media" DROP COLUMN "country";
  ALTER TABLE "users" DROP COLUMN "role";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_id";
  DROP TYPE "public"."enum_pages_route";
  DROP TYPE "public"."enum_pages_country";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_route";
  DROP TYPE "public"."enum__pages_v_version_country";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_posts_distribute_to";
  DROP TYPE "public"."enum_posts_country";
  DROP TYPE "public"."enum_posts_audience";
  DROP TYPE "public"."enum__posts_v_version_distribute_to";
  DROP TYPE "public"."enum__posts_v_version_country";
  DROP TYPE "public"."enum__posts_v_version_audience";
  DROP TYPE "public"."enum_media_country";
  DROP TYPE "public"."enum_users_regions";
  DROP TYPE "public"."enum_users_countries";
  DROP TYPE "public"."enum_users_sections";
  DROP TYPE "public"."enum_users_role";`)
}

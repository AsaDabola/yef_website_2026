import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_route" ADD VALUE 'get-involved/bible-studies' BEFORE 'get-involved/leadership-retreats';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'get-involved/discipleship' BEFORE 'get-involved/leadership-retreats';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'get-involved/short-term-mission' BEFORE 'get-involved/volunteer';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'get-involved/summer-training' BEFORE 'get-involved/volunteer';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'get-involved/volunteering' BEFORE 'get-involved/volunteer';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'get-involved/bible-studies' BEFORE 'get-involved/leadership-retreats';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'get-involved/discipleship' BEFORE 'get-involved/leadership-retreats';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'get-involved/short-term-mission' BEFORE 'get-involved/volunteer';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'get-involved/summer-training' BEFORE 'get-involved/volunteer';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'get-involved/volunteering' BEFORE 'get-involved/volunteer';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ALTER COLUMN "route" SET DATA TYPE text;
  ALTER TABLE "pages" ALTER COLUMN "route" SET DEFAULT 'home'::text;
  DROP TYPE "public"."enum_pages_route";
  CREATE TYPE "public"."enum_pages_route" AS ENUM('home', 'who-we-are', 'who-we-are/welcome', 'who-we-are/mission', 'who-we-are/statement-of-faith', 'who-we-are/history', 'who-we-are/membership', 'who-we-are/staff-executive-committee', 'get-involved', 'get-involved/apply', 'get-involved/campus-evangelism', 'get-involved/campus-evangelism/apply', 'get-involved/chapter-affiliation', 'get-involved/leadership-retreats', 'get-involved/volunteer', 'news', 'network', 'donate', 'contact', 'join', 'login', 'reaching-the-campus', 'resources', 'sharing-the-gospel', 'submit-your-story', 'what-is-evangelical', 'yef-mission-school', 'yef-mission-school/apply');
  ALTER TABLE "pages" ALTER COLUMN "route" SET DEFAULT 'home'::"public"."enum_pages_route";
  ALTER TABLE "pages" ALTER COLUMN "route" SET DATA TYPE "public"."enum_pages_route" USING "route"::"public"."enum_pages_route";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_route" SET DATA TYPE text;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_route" SET DEFAULT 'home'::text;
  DROP TYPE "public"."enum__pages_v_version_route";
  CREATE TYPE "public"."enum__pages_v_version_route" AS ENUM('home', 'who-we-are', 'who-we-are/welcome', 'who-we-are/mission', 'who-we-are/statement-of-faith', 'who-we-are/history', 'who-we-are/membership', 'who-we-are/staff-executive-committee', 'get-involved', 'get-involved/apply', 'get-involved/campus-evangelism', 'get-involved/campus-evangelism/apply', 'get-involved/chapter-affiliation', 'get-involved/leadership-retreats', 'get-involved/volunteer', 'news', 'network', 'donate', 'contact', 'join', 'login', 'reaching-the-campus', 'resources', 'sharing-the-gospel', 'submit-your-story', 'what-is-evangelical', 'yef-mission-school', 'yef-mission-school/apply');
  ALTER TABLE "_pages_v" ALTER COLUMN "version_route" SET DEFAULT 'home'::"public"."enum__pages_v_version_route";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_route" SET DATA TYPE "public"."enum__pages_v_version_route" USING "version_route"::"public"."enum__pages_v_version_route";`)
}

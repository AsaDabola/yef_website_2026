import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_route" ADD VALUE 'who-we-are/welcome';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'who-we-are/mission';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'who-we-are/statement-of-faith';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'who-we-are/history';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'who-we-are/membership';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'who-we-are/staff-executive-committee';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'get-involved';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'get-involved/apply';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'get-involved/campus-evangelism';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'get-involved/campus-evangelism/apply';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'get-involved/chapter-affiliation';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'get-involved/leadership-retreats';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'get-involved/volunteer';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'news';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'network';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'donate';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'contact';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'join';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'login';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'reaching-the-campus';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'resources';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'sharing-the-gospel';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'submit-your-story';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'what-is-evangelical';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'yef-mission-school';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE 'yef-mission-school/apply';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'who-we-are/welcome';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'who-we-are/mission';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'who-we-are/statement-of-faith';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'who-we-are/history';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'who-we-are/membership';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'who-we-are/staff-executive-committee';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'get-involved';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'get-involved/apply';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'get-involved/campus-evangelism';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'get-involved/campus-evangelism/apply';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'get-involved/chapter-affiliation';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'get-involved/leadership-retreats';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'get-involved/volunteer';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'news';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'network';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'donate';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'contact';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'join';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'login';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'reaching-the-campus';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'resources';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'sharing-the-gospel';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'submit-your-story';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'what-is-evangelical';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'yef-mission-school';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE 'yef-mission-school/apply';
  ALTER TABLE "pages" ADD COLUMN "built_in" boolean DEFAULT false;
  ALTER TABLE "_pages_v" ADD COLUMN "version_built_in" boolean DEFAULT false;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ALTER COLUMN "route" SET DATA TYPE text;
  ALTER TABLE "pages" ALTER COLUMN "route" SET DEFAULT 'home'::text;
  DROP TYPE "public"."enum_pages_route";
  CREATE TYPE "public"."enum_pages_route" AS ENUM('home', 'who-we-are');
  ALTER TABLE "pages" ALTER COLUMN "route" SET DEFAULT 'home'::"public"."enum_pages_route";
  ALTER TABLE "pages" ALTER COLUMN "route" SET DATA TYPE "public"."enum_pages_route" USING "route"::"public"."enum_pages_route";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_route" SET DATA TYPE text;
  ALTER TABLE "_pages_v" ALTER COLUMN "version_route" SET DEFAULT 'home'::text;
  DROP TYPE "public"."enum__pages_v_version_route";
  CREATE TYPE "public"."enum__pages_v_version_route" AS ENUM('home', 'who-we-are');
  ALTER TABLE "_pages_v" ALTER COLUMN "version_route" SET DEFAULT 'home'::"public"."enum__pages_v_version_route";
  ALTER TABLE "_pages_v" ALTER COLUMN "version_route" SET DATA TYPE "public"."enum__pages_v_version_route" USING "version_route"::"public"."enum__pages_v_version_route";
  ALTER TABLE "pages" DROP COLUMN "built_in";
  ALTER TABLE "_pages_v" DROP COLUMN "version_built_in";`)
}

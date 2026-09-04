import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Adds the route enum values needed to convert the remaining Get Involved
 * subpages to the block editor, and fixes a pre-existing mismatch: the
 * "get-involved/leadership-training" route (used by the Pages collection
 * and seed.ts) was never actually added to the database enum — only
 * "get-involved/leadership-retreats" was, from an earlier rename that
 * missed this value. Postgres enum values can't be dropped without
 * recreating the type, so `down` is a no-op; the added values simply go
 * unused if this migration is rolled back.
 */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TYPE "public"."enum_pages_route" ADD VALUE IF NOT EXISTS 'get-involved/leadership-training/apply';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE IF NOT EXISTS 'get-involved/volunteering';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE IF NOT EXISTS 'get-involved/bible-studies';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE IF NOT EXISTS 'get-involved/discipleship';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE IF NOT EXISTS 'get-involved/short-term-mission';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE IF NOT EXISTS 'get-involved/short-term-mission/apply';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE IF NOT EXISTS 'get-involved/summer-training';
  ALTER TYPE "public"."enum_pages_route" ADD VALUE IF NOT EXISTS 'get-involved/leadership-training';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE IF NOT EXISTS 'get-involved/leadership-training/apply';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE IF NOT EXISTS 'get-involved/volunteering';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE IF NOT EXISTS 'get-involved/bible-studies';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE IF NOT EXISTS 'get-involved/discipleship';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE IF NOT EXISTS 'get-involved/short-term-mission';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE IF NOT EXISTS 'get-involved/short-term-mission/apply';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE IF NOT EXISTS 'get-involved/summer-training';
  ALTER TYPE "public"."enum__pages_v_version_route" ADD VALUE IF NOT EXISTS 'get-involved/leadership-training';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // No-op — see note above.
}

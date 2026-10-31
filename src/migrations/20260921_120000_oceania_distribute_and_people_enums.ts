import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Finishes the job 20260901_032836_oceania_countries_enum started.
 *
 * That migration added Tonga, Samoa and the Solomon Islands to the seven
 * enums behind a *single* country field — `posts.country`, `media.country`
 * and so on — and missed every enum behind a country field that holds more
 * than one value, plus the two collections added after it.
 *
 * The visible symptom was an editor choosing Tonga and Samoa under "Distribute
 * To" on a post and getting "Something went wrong." on publish: the admin
 * offers every country because the options come from countryOptions in code,
 * Postgres rejects the three it has never been told about, and the failure
 * surfaces as a generic 500. Save Draft failed the same way, through the
 * versions table.
 *
 * Five enums, all of which list the other sixty-nine countries already:
 *
 *   posts.distributeTo             and its versions table
 *   photo_events.distributeTo
 *   members.country                } created by the leadership dashboard
 *   leadership_positions.country   } migration from a stale country list
 *
 * IF NOT EXISTS rather than a bare ADD VALUE: a half-applied run should be
 * completable by running it again, which is not true of the migration this
 * one is repairing.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TYPE "public"."enum_posts_distribute_to" ADD VALUE IF NOT EXISTS 'to';
  ALTER TYPE "public"."enum_posts_distribute_to" ADD VALUE IF NOT EXISTS 'ws';
  ALTER TYPE "public"."enum_posts_distribute_to" ADD VALUE IF NOT EXISTS 'sb';
  ALTER TYPE "public"."enum__posts_v_version_distribute_to" ADD VALUE IF NOT EXISTS 'to';
  ALTER TYPE "public"."enum__posts_v_version_distribute_to" ADD VALUE IF NOT EXISTS 'ws';
  ALTER TYPE "public"."enum__posts_v_version_distribute_to" ADD VALUE IF NOT EXISTS 'sb';
  ALTER TYPE "public"."enum_photo_events_distribute_to" ADD VALUE IF NOT EXISTS 'to';
  ALTER TYPE "public"."enum_photo_events_distribute_to" ADD VALUE IF NOT EXISTS 'ws';
  ALTER TYPE "public"."enum_photo_events_distribute_to" ADD VALUE IF NOT EXISTS 'sb';
  ALTER TYPE "public"."enum_members_country" ADD VALUE IF NOT EXISTS 'to';
  ALTER TYPE "public"."enum_members_country" ADD VALUE IF NOT EXISTS 'ws';
  ALTER TYPE "public"."enum_members_country" ADD VALUE IF NOT EXISTS 'sb';
  ALTER TYPE "public"."enum_leadership_positions_country" ADD VALUE IF NOT EXISTS 'to';
  ALTER TYPE "public"."enum_leadership_positions_country" ADD VALUE IF NOT EXISTS 'ws';
  ALTER TYPE "public"."enum_leadership_positions_country" ADD VALUE IF NOT EXISTS 'sb';`)
}

/**
 * Deliberately empty.
 *
 * Taking a value back out of an enum means dropping and recreating the type,
 * which fails — or silently strands data — once a row is using it. A post
 * distributed to Tonga is exactly the row this migration exists to allow, so
 * the honest reverse of "let Tonga be chosen" is to leave it chosen. Rolling
 * the code back does not require rolling this back: an enum carrying a value
 * nothing selects costs nothing.
 */
export async function down({}: MigrateDownArgs): Promise<void> {}

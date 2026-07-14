import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

/**
 * Adds MSME header top-strip + footer badge fields to site_settings.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(
    sql`ALTER TABLE \`site_settings\` ADD \`brand_top_strip_enabled\` integer DEFAULT true;`,
  )
  await db.run(
    sql`ALTER TABLE \`site_settings\` ADD \`brand_top_strip_label\` text DEFAULT 'Registered with MSME';`,
  )
  await db.run(
    sql`ALTER TABLE \`site_settings\` ADD \`footer_show_msme_logo\` integer DEFAULT true;`,
  )
  await db.run(
    sql`ALTER TABLE \`site_settings\` ADD \`footer_msme_badge_label\` text DEFAULT 'Registered with MSME';`,
  )
  await db.run(
    sql`UPDATE \`site_settings\` SET \`footer_crafted_text\` = 'MSME-registered institute · Udyam No. UDYAM-TS-02-0353884' WHERE \`footer_crafted_text\` IS NULL OR \`footer_crafted_text\` = 'Crafted with care for future SAP consultants.';`,
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(
    sql`ALTER TABLE \`site_settings\` DROP COLUMN \`footer_msme_badge_label\`;`,
  )
  await db.run(
    sql`ALTER TABLE \`site_settings\` DROP COLUMN \`footer_show_msme_logo\`;`,
  )
  await db.run(
    sql`ALTER TABLE \`site_settings\` DROP COLUMN \`brand_top_strip_label\`;`,
  )
  await db.run(
    sql`ALTER TABLE \`site_settings\` DROP COLUMN \`brand_top_strip_enabled\`;`,
  )
}

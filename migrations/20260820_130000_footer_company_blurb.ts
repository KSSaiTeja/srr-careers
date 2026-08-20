import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

const COMPANY_BLURB =
  'A dedicated finishing school for SAP S/4 HANA FICO consultants. Live mentors, real client scenarios, lifetime career support.'

/**
 * Footer brand column should show company information, not a street address.
 * Addresses live under Contact → Offices. Restore the company tagline wherever
 * it was overwritten with the Hyderabad office address.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`
    UPDATE \`site_settings\`
    SET \`brand_footer_description\` = ${COMPANY_BLURB}
    WHERE \`brand_footer_description\` IS NULL
       OR \`brand_footer_description\` = ''
       OR \`brand_footer_description\` LIKE '%Swarga Nivas%'
       OR \`brand_footer_description\` LIKE '%Ameerpet%'
       OR \`brand_footer_description\` LIKE '%Srinivasa Nagar%';
  `)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // No-op: previous address-as-tagline was incorrect content.
}

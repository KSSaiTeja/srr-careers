import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

/**
 * Adds early-lead capture + billing address to enrollments:
 *   - lead_token: stable id from step 1 (sheet upsert key)
 *   - address_line1/2, city, state, pincode: step 2 + invoice "Bill to"
 * Status `lead` = personal details captured, payment not started yet.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`enrollments\` ADD \`lead_token\` text;`)
  await db.run(sql`ALTER TABLE \`enrollments\` ADD \`address_line1\` text;`)
  await db.run(sql`ALTER TABLE \`enrollments\` ADD \`address_line2\` text;`)
  await db.run(sql`ALTER TABLE \`enrollments\` ADD \`city\` text;`)
  await db.run(sql`ALTER TABLE \`enrollments\` ADD \`state\` text;`)
  await db.run(sql`ALTER TABLE \`enrollments\` ADD \`pincode\` text;`)
  await db.run(sql`CREATE UNIQUE INDEX \`enrollments_lead_token_idx\` ON \`enrollments\` (\`lead_token\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX \`enrollments_lead_token_idx\`;`)
  await db.run(sql`ALTER TABLE \`enrollments\` DROP COLUMN \`pincode\`;`)
  await db.run(sql`ALTER TABLE \`enrollments\` DROP COLUMN \`state\`;`)
  await db.run(sql`ALTER TABLE \`enrollments\` DROP COLUMN \`city\`;`)
  await db.run(sql`ALTER TABLE \`enrollments\` DROP COLUMN \`address_line2\`;`)
  await db.run(sql`ALTER TABLE \`enrollments\` DROP COLUMN \`address_line1\`;`)
  await db.run(sql`ALTER TABLE \`enrollments\` DROP COLUMN \`lead_token\`;`)
}

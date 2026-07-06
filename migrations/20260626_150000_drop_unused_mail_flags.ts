import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

/**
 * Drops the mail flags that are no longer used: the pending-nudge and
 * installment-reminder features were removed (the success email already carries
 * the balance + next installment date). Only `mailed_success` / `mailed_failed`
 * remain as idempotency guards.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`enrollments\` DROP COLUMN \`reminder_on_date_sent\`;`)
  await db.run(sql`ALTER TABLE \`enrollments\` DROP COLUMN \`reminder_before_sent\`;`)
  await db.run(sql`ALTER TABLE \`enrollments\` DROP COLUMN \`mailed_pending\`;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`enrollments\` ADD \`mailed_pending\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`enrollments\` ADD \`reminder_before_sent\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`enrollments\` ADD \`reminder_on_date_sent\` integer DEFAULT false;`)
}

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

/**
 * Adds idempotency flags to `enrollments` so each transactional email is sent
 * at most once (status mails wired into updateEnrollmentStatus; pending +
 * installment reminders driven by the reconcile cron):
 *   - mailed_pending        pending-reminder email sent
 *   - mailed_success        success + invoice email sent
 *   - mailed_failed         failure email sent
 *   - reminder_before_sent  installment reminder 2 days before due date sent
 *   - reminder_on_date_sent installment reminder on the due date sent
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`enrollments\` ADD \`mailed_pending\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`enrollments\` ADD \`mailed_success\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`enrollments\` ADD \`mailed_failed\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`enrollments\` ADD \`reminder_before_sent\` integer DEFAULT false;`)
  await db.run(sql`ALTER TABLE \`enrollments\` ADD \`reminder_on_date_sent\` integer DEFAULT false;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`enrollments\` DROP COLUMN \`reminder_on_date_sent\`;`)
  await db.run(sql`ALTER TABLE \`enrollments\` DROP COLUMN \`reminder_before_sent\`;`)
  await db.run(sql`ALTER TABLE \`enrollments\` DROP COLUMN \`mailed_failed\`;`)
  await db.run(sql`ALTER TABLE \`enrollments\` DROP COLUMN \`mailed_success\`;`)
  await db.run(sql`ALTER TABLE \`enrollments\` DROP COLUMN \`mailed_pending\`;`)
}

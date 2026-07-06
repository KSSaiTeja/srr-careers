import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

/**
 * Adds installment/invoice tracking to `enrollments`:
 *   - course_price: full course price snapshot (to derive the balance)
 *   - payment_date: when the (first) payment succeeded
 *   - next_installment_date: one month after payment, for installment plans
 *     that still have a balance (drives reminder mails + the invoice section)
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`enrollments\` ADD \`course_price\` numeric;`)
  await db.run(sql`ALTER TABLE \`enrollments\` ADD \`payment_date\` text;`)
  await db.run(sql`ALTER TABLE \`enrollments\` ADD \`next_installment_date\` text;`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`enrollments\` DROP COLUMN \`next_installment_date\`;`)
  await db.run(sql`ALTER TABLE \`enrollments\` DROP COLUMN \`payment_date\`;`)
  await db.run(sql`ALTER TABLE \`enrollments\` DROP COLUMN \`course_price\`;`)
}

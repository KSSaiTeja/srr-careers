import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(
    sql`ALTER TABLE \`course_details\` ADD \`syllabus_notice_enabled\` integer DEFAULT true;`,
  )
  await db.run(
    sql`ALTER TABLE \`course_details\` ADD \`syllabus_notice_text\` text;`,
  )
  await db.run(
    sql`ALTER TABLE \`course_details\` ADD \`syllabus_notice_highlight\` text;`,
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(
    sql`ALTER TABLE \`course_details\` DROP COLUMN \`syllabus_notice_highlight\`;`,
  )
  await db.run(
    sql`ALTER TABLE \`course_details\` DROP COLUMN \`syllabus_notice_text\`;`,
  )
  await db.run(
    sql`ALTER TABLE \`course_details\` DROP COLUMN \`syllabus_notice_enabled\`;`,
  )
}

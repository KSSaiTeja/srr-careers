import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Clean up any leftover temp table from a previously failed run.
  await db.run(sql`DROP TABLE IF EXISTS \`__new_course_details\`;`)

  await db.run(sql`ALTER TABLE \`course_details\` ADD \`overview_price\` numeric;`)
  await db.run(
    sql`ALTER TABLE \`course_details\` ADD \`overview_original_price\` numeric;`,
  )
  await db.run(sql`ALTER TABLE \`courses_page_offerings_courses\` ADD \`price\` numeric;`)
  await db.run(
    sql`ALTER TABLE \`courses_page_offerings_courses\` ADD \`original_price\` numeric;`,
  )
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`course_details\` DROP COLUMN \`overview_price\`;`)
  await db.run(
    sql`ALTER TABLE \`course_details\` DROP COLUMN \`overview_original_price\`;`,
  )
  await db.run(sql`ALTER TABLE \`courses_page_offerings_courses\` DROP COLUMN \`price\`;`)
  await db.run(
    sql`ALTER TABLE \`courses_page_offerings_courses\` DROP COLUMN \`original_price\`;`,
  )
}

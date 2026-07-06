import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

const OLD_ANCHOR = '#pre-footer'
const NEW_ANCHOR = '#demo-class'

/**
 * Renames the demo-class section anchor across every stored link value.
 * The `#pre-footer` hash was renamed to `#demo-class`, but CMS-managed CTA
 * hrefs already live in the database, so this migration rewrites any column
 * holding the old anchor. It walks all tables/columns so array sub-tables
 * (nav links, footer links, etc.) are covered without hardcoding names.
 */
async function rewriteAnchor(
  db: MigrateUpArgs['db'] | MigrateDownArgs['db'],
  from: string,
  to: string,
): Promise<void> {
  const tables = (await db.all(
    sql`SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%';`,
  )) as Array<{ name: string }>

  for (const { name: table } of tables) {
    const columns = (await db.all(
      sql.raw(`PRAGMA table_info("${table}");`),
    )) as Array<{ name: string }>

    for (const { name: column } of columns) {
      await db.run(
        sql.raw(
          `UPDATE "${table}" SET "${column}" = '${to}' WHERE "${column}" = '${from}';`,
        ),
      )
    }
  }
}

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await rewriteAnchor(db, OLD_ANCHOR, NEW_ANCHOR)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await rewriteAnchor(db, NEW_ANCHOR, OLD_ANCHOR)
}

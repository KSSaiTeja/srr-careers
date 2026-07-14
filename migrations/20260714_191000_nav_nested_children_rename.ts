import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

/**
 * Rename nested nav children table to match field `nestedChildren`
 * (Payload/Drizzle cannot have two relations both named "children").
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`DROP TABLE IF EXISTS \`site_settings_navigation_items_children_children\`;`)

  await db.run(sql`CREATE TABLE \`site_settings_navigation_items_children_nested_children\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings_navigation_items_children\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_navigation_items_children_nested_children_order_idx\` ON \`site_settings_navigation_items_children_nested_children\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_navigation_items_children_nested_children_parent_id_idx\` ON \`site_settings_navigation_items_children_nested_children\` (\`_parent_id\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE IF EXISTS \`site_settings_navigation_items_children_nested_children\`;`)

  await db.run(sql`CREATE TABLE \`site_settings_navigation_items_children_children\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings_navigation_items_children\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_navigation_items_children_children_order_idx\` ON \`site_settings_navigation_items_children_children\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_navigation_items_children_children_parent_id_idx\` ON \`site_settings_navigation_items_children_children\` (\`_parent_id\`);`)
}

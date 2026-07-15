import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

/**
 * Adds workshop catalogue cards array to Workshops Listing global
 * (mirrors courses_listing_programs on Courses Listing).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`workshops_page_workshops\` (
	\`_order\` integer NOT NULL,
	\`_parent_id\` integer NOT NULL,
	\`id\` text PRIMARY KEY NOT NULL,
	\`slug\` text NOT NULL,
	\`sort_order\` numeric DEFAULT 0,
	\`published\` integer DEFAULT true,
	\`nav_label\` text,
	\`eyebrow\` text DEFAULT 'Workshop' NOT NULL,
	\`title\` text NOT NULL,
	\`href\` text NOT NULL,
	\`summary\` text NOT NULL,
	\`duration_label\` text DEFAULT 'Customisable',
	\`price_label\` text DEFAULT 'Customisable',
	\`duration_baseline\` text,
	FOREIGN KEY (\`_parent_id\`) REFERENCES \`workshops_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
);
`)
  await db.run(sql`CREATE INDEX \`workshops_page_workshops_order_idx\` ON \`workshops_page_workshops\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`workshops_page_workshops_parent_id_idx\` ON \`workshops_page_workshops\` (\`_parent_id\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`workshops_page_workshops\`;`)
}

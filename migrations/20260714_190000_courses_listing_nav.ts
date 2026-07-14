import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

/**
 * Courses catalogue global (/courses) + nested nav children support on Site Settings.
 * SAP FICO dual-track page moves to /courses/sap-fico; listing cards live here.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`courses_listing\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`meta_title\` text DEFAULT 'Courses | SRR Careers',
  	\`meta_description\` text DEFAULT 'Explore SRR Careers programmes — SAP FICO S/4HANA tracks and Advanced Excel. Live mentor-led cohorts for finance and accounts professionals.',
  	\`intro_page_title\` text DEFAULT 'Courses',
  	\`intro_headline\` text DEFAULT 'Programmes built for finance careers',
  	\`intro_subtext\` text DEFAULT 'From SAP FICO certification tracks to Advanced Excel — pick a programme and start with a live mentor-led cohort.',
  	\`cards_duration_prefix\` text DEFAULT 'Duration:',
  	\`cards_price_prefix\` text DEFAULT 'Price:',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)

  await db.run(sql`CREATE TABLE \`courses_listing_programs\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`slug\` text NOT NULL,
  	\`sort_order\` numeric DEFAULT 0,
  	\`published\` integer DEFAULT true,
  	\`nav_label\` text,
  	\`eyebrow\` text DEFAULT 'Programme' NOT NULL,
  	\`title\` text NOT NULL,
  	\`href\` text NOT NULL,
  	\`summary\` text NOT NULL,
  	\`duration_label\` text,
  	\`price_label\` text,
  	\`is_nav_group\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`courses_listing\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`courses_listing_programs_order_idx\` ON \`courses_listing_programs\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`courses_listing_programs_parent_id_idx\` ON \`courses_listing_programs\` (\`_parent_id\`);`)

  await db.run(sql`CREATE TABLE \`courses_listing_programs_nav_children\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`courses_listing_programs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`courses_listing_programs_nav_children_order_idx\` ON \`courses_listing_programs_nav_children\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`courses_listing_programs_nav_children_parent_id_idx\` ON \`courses_listing_programs_nav_children\` (\`_parent_id\`);`)

  await db.run(sql`ALTER TABLE \`site_settings_navigation_items_children\` ADD \`is_group\` integer DEFAULT false;`)

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
  await db.run(sql`DROP TABLE \`courses_listing_programs_nav_children\`;`)
  await db.run(sql`DROP TABLE \`courses_listing_programs\`;`)
  await db.run(sql`DROP TABLE \`courses_listing\`;`)
  // SQLite cannot DROP COLUMN reliably across versions — leave is_group in place on down.
}

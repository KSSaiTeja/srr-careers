import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`site_settings_navigation_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	\`badge\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_navigation_items_order_idx\` ON \`site_settings_navigation_items\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_navigation_items_parent_id_idx\` ON \`site_settings_navigation_items\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_social_group_social\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text DEFAULT 'linkedin' NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_social_group_social_order_idx\` ON \`site_settings_social_group_social\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_social_group_social_parent_id_idx\` ON \`site_settings_social_group_social\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_footer_explore_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_footer_explore_links_order_idx\` ON \`site_settings_footer_explore_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_footer_explore_links_parent_id_idx\` ON \`site_settings_footer_explore_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_footer_course_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`href\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_footer_course_links_order_idx\` ON \`site_settings_footer_course_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_footer_course_links_parent_id_idx\` ON \`site_settings_footer_course_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`brand_site_name\` text DEFAULT 'SRR Careers',
  	\`brand_footer_description\` text DEFAULT 'A dedicated finishing school for SAP S/4 HANA FICO consultants. Live mentors, real client scenarios, lifetime career support.',
  	\`brand_header_cta_label\` text DEFAULT 'Book a Demo',
  	\`brand_header_cta_href\` text DEFAULT '#pre-footer',
  	\`contact_phone\` text,
  	\`contact_phone_href\` text,
  	\`contact_email\` text,
  	\`contact_email_href\` text,
  	\`contact_whatsapp_number\` text DEFAULT '918091345674',
  	\`contact_whatsapp_label\` text DEFAULT 'WhatsApp us',
  	\`contact_whatsapp_prefill_message\` text,
  	\`footer_explore_title\` text DEFAULT 'Explore',
  	\`footer_course_title\` text DEFAULT 'Course',
  	\`footer_contact_title\` text DEFAULT 'Contact',
  	\`footer_copyright\` text DEFAULT '© 2026 SRR Careers. All rights reserved.',
  	\`footer_crafted_text\` text DEFAULT 'Crafted with care for future SAP consultants.',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`site_settings_navigation_items\`;`)
  await db.run(sql`DROP TABLE \`site_settings_social_group_social\`;`)
  await db.run(sql`DROP TABLE \`site_settings_footer_explore_links\`;`)
  await db.run(sql`DROP TABLE \`site_settings_footer_course_links\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
}

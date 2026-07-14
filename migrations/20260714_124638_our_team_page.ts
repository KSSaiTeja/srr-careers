import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

/**
 * Adds Our Team Page global — intro copy + faculty profiles (photo, bio, workshops).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`our_team_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`intro_page_title\` text DEFAULT 'Our Team',
  	\`intro_headline\` text DEFAULT 'Mentors you''d love to work with',
  	\`intro_subtext\` text DEFAULT 'Meet the facilitators behind SRR Careers — experienced educators and practitioners who bring real-world finance and SAP expertise into every cohort. Select a profile to learn more.',
  	\`members_section_view_profile_label\` text DEFAULT 'View profile →',
  	\`members_section_workshops_heading\` text DEFAULT 'Workshops',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)

  await db.run(sql`CREATE TABLE \`our_team_page_members_section_members\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`slug\` text NOT NULL,
  	\`name\` text NOT NULL,
  	\`credential\` text NOT NULL,
  	\`photo_id\` integer,
  	\`fallback_image_path\` text,
  	\`placeholder_gradient\` text DEFAULT 'from-brand-lavender via-brand-purple-light to-brand-purple' NOT NULL,
  	FOREIGN KEY (\`photo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`our_team_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`our_team_page_members_section_members_order_idx\` ON \`our_team_page_members_section_members\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`our_team_page_members_section_members_parent_id_idx\` ON \`our_team_page_members_section_members\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`our_team_page_members_section_members_photo_idx\` ON \`our_team_page_members_section_members\` (\`photo_id\`);`)

  await db.run(sql`CREATE TABLE \`our_team_page_members_section_members_bio\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`text\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`our_team_page_members_section_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`our_team_page_members_section_members_bio_order_idx\` ON \`our_team_page_members_section_members_bio\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`our_team_page_members_section_members_bio_parent_id_idx\` ON \`our_team_page_members_section_members_bio\` (\`_parent_id\`);`)

  await db.run(sql`CREATE TABLE \`our_team_page_members_section_members_workshops\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`our_team_page_members_section_members\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`our_team_page_members_section_members_workshops_order_idx\` ON \`our_team_page_members_section_members_workshops\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`our_team_page_members_section_members_workshops_parent_id_idx\` ON \`our_team_page_members_section_members_workshops\` (\`_parent_id\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`our_team_page_members_section_members_bio\`;`)
  await db.run(sql`DROP TABLE \`our_team_page_members_section_members_workshops\`;`)
  await db.run(sql`DROP TABLE \`our_team_page_members_section_members\`;`)
  await db.run(sql`DROP TABLE \`our_team_page\`;`)
}
